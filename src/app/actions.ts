
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
  // Special check for VICIBOX124
  if (server.name === 'VICIBOX124') {
      try {
          const response = await fetch('http://107.150.36.124:7887/valid8.php', {
              method: 'GET',
              timeout: 5000,
          });
          if (response) {
              return { ...server, status: 'Online', resolvedIp: server.ip };
          }
      } catch (error) {
          // Fall through to offline if the specific check fails
      }
      return { ...server, status: 'Offline', resolvedIp: server.ip };
  }

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
    console.error(`DNS Error for ${server.ip}:`, error);
    return { ...server, status: 'Error', resolvedIp: 'DNS Error' };
  }
  
  const protocols = ['https', 'http'];

  for (const protocol of protocols) {
    try {
      const url = `${protocol}://${resolvedIp}`;
      
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        timeout: 5000,
        agent: (new URL(url).protocol === 'https:') ? httpsAgent : undefined,
      });
      
      if (response) {
        return { ...server, status: 'Online', resolvedIp };
      }
    } catch (error) {
      // Ignore errors (like connection refused, cert errors) and try the next protocol
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
