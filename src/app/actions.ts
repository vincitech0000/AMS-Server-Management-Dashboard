
'use server';

import { generateHtml } from '@/ai/flows/generate-html-from-prompt';
import { z } from 'zod';
import fetch from 'node-fetch';
import https from 'https';
import dns from 'dns/promises';

const promptSchema = z.string().min(1, 'Prompt cannot be empty.');

export async function generateHtmlAction(prompt: string) {
  try {
    const validatedPrompt = promptSchema.safeParse(prompt);
    if (!validatedPrompt.success) {
      return { error: 'Invalid prompt.', details: validatedPrompt.error.format() };
    }

    const result = await generateHtml({ prompt: validatedPrompt.data });
    return { html: result.html };
  } catch (error) {
    console.error('Error generating HTML:', error);
    return { error: 'Failed to generate HTML. Please try again.' };
  }
}

const serverListSchema = z.array(z.object({
  name: z.string(),
  ip: z.string(),
}));

type Server = z.infer<typeof serverListSchema>[0];
export type ServerStatus = 'Online' | 'Offline' | 'Error';
export type ServerWithStatus = Server & { status: ServerStatus; resolvedIp?: string };

// This agent will ignore SSL certificate errors, common in dev environments
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function checkServerStatus(server: Server): Promise<ServerWithStatus> {
  const protocols = ['https', 'http'];
  let resolvedIp: string | undefined;
  const isIpAddress = /^\d{1,3}(\.\d{1,3}){3}$/.test(server.ip);

  try {
    if (!isIpAddress) {
      const result = await dns.lookup(server.ip);
      resolvedIp = result.address;
    } else {
      resolvedIp = server.ip;
    }
  } catch (error) {
    return { ...server, status: 'Error', resolvedIp: 'DNS Error' };
  }
  
  for (const protocol of protocols) {
    try {
      // Use the original hostname for the fetch URL if it's not an IP
      // This helps with servers that require the correct Host header (e.g. virtual hosts)
      const targetHost = isIpAddress ? resolvedIp : server.ip;
      const url = `${protocol}://${targetHost}`;

      // We send the request to the resolved IP but tell the server which host we're looking for
      const agent = (parsedUrl: URL) => {
        if (parsedUrl.protocol === 'https:') {
            return httpsAgent;
        }
        return undefined;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        timeout: 5000,
        agent: agent(new URL(url)),
      });

      // Any response from the server is considered Online
      if (response) {
        return { ...server, status: 'Online', resolvedIp };
      }
    } catch (error) {
      // Ignore errors (like connection refused) and try the next protocol
    }
  }

  // If all attempts fail
  return { ...server, status: 'Offline', resolvedIp };
}

export async function pingAllServers(servers: Server[]): Promise<ServerWithStatus[]> {
  try {
    const validatedServers = serverListSchema.safeParse(servers);
    if (!validatedServers.success) {
      throw new Error('Invalid server list format.');
    }
    
    const statusPromises = validatedServers.data.map(checkServerStatus);
    const results = await Promise.all(statusPromises);
    
    return results;

  } catch (error) {
    console.error('Error pinging servers:', error);
    return servers.map(s => ({ ...s, status: 'Error', resolvedIp: 'N/A' }));
  }
}
