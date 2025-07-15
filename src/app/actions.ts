
'use server';

import { generateHtml } from '@/ai/flows/generate-html-from-prompt';
import { z } from 'zod';
import fetch from 'node-fetch';
import https from 'https';

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
export type ServerWithStatus = Server & { status: ServerStatus };

// This agent will ignore SSL certificate errors, common in dev environments
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function checkServerStatus(server: Server): Promise<ServerWithStatus> {
  const protocols = ['https', 'http'];
  for (const protocol of protocols) {
    try {
      const response = await fetch(`${protocol}://${server.ip}`, {
        method: 'GET',
        redirect: 'follow',
        timeout: 5000, // 5-second timeout
        agent: protocol === 'https' ? httpsAgent : undefined,
      });

      // Any response (even errors) means the server is reachable
      if (response) {
        return { ...server, status: 'Online' };
      }
    } catch (error) {
      // Errors like timeouts or connection refused will be caught here
      // We continue to the next protocol
    }
  }

  // If all attempts fail
  return { ...server, status: 'Offline' };
}

export async function pingAllServers(servers: Server[]): Promise<ServerWithStatus[]> {
  try {
    const validatedServers = serverListSchema.safeParse(servers);
    if (!validatedServers.success) {
      // This is a developer error, should not happen in production
      throw new Error('Invalid server list format.');
    }
    
    const statusPromises = validatedServers.data.map(checkServerStatus);
    const results = await Promise.all(statusPromises);
    
    return results;

  } catch (error) {
    console.error('Error pinging servers:', error);
    // Return all as Error status if the whole process fails
    return servers.map(s => ({ ...s, status: 'Error' }));
  }
}
