
'use server';

import { generateHtml } from '@/ai/flows/generate-html-from-prompt';
import { z } from 'zod';
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


export type ServerStatus = 'Online' | 'Offline' | 'Error';
export type ServerInfo = { name: string; ip: string; };
export type ServerWithStatus = ServerInfo & { status: ServerStatus; resolvedIp?: string };


async function checkServer(server: ServerInfo): Promise<ServerWithStatus> {
    try {
        const { address } = await dns.lookup(server.ip);
        // We'll consider a successful DNS lookup as 'Online' for this check.
        return {
            ...server,
            resolvedIp: address,
            status: 'Online',
        };
    } catch (error: any) {
        let status: ServerStatus = 'Offline';
        if (error.code !== 'ENOTFOUND') {
           status = 'Error';
        }
        return {
            ...server,
            resolvedIp: 'N/A',
            status: status,
        };
    }
}

export async function pingAllServers(servers: ServerInfo[]): Promise<ServerWithStatus[]> {
    const results = await Promise.all(servers.map(checkServer));
    return results;
}
