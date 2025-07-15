
'use server';

import { generateHtml } from '@/ai/flows/generate-html-from-prompt';
import { z } from 'zod';

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

async function checkServerStatus(server: Server): Promise<ServerWithStatus> {
  // Try HTTPS first, then fall back to HTTP
  const protocols = ['https', 'http'];
  for (const protocol of protocols) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout
      
      const response = await fetch(`${protocol}://${server.ip}`, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow'
      });
      
      clearTimeout(timeoutId);

      // Any 2xx or 3xx status code is considered 'Online'
      if (response.ok || (response.status >= 300 && response.status < 400)) {
        return { ...server, status: 'Online' };
      }
    } catch (error: any) {
        if (error.name === 'AbortError') {
            // This was a timeout
            continue; // Try next protocol or fail
        }
        // Other errors, continue to next protocol
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
