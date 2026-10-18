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
export type ServerWithStatus = ServerInfo & { status: ServerStatus; resolvedIp?: string; latency?: number };


async function checkServer(server: ServerInfo): Promise<ServerWithStatus> {
    const start = Date.now();
    try {
        // Sanitize host string to extract just the hostname/IP for DNS lookup
        let hostname = server.ip;
        if (hostname.includes('://')) {
            try {
                hostname = new URL(hostname).hostname;
            } catch {
                // fallback if URL constructor fails
                hostname = hostname.split('://')[1].split('/')[0].split(':')[0];
            }
        } else {
            // Remove port and path manually if it's just a string like host:port/path
            hostname = hostname.split('/')[0].split(':')[0];
        }

        const { address } = await dns.lookup(hostname);
        const latency = Date.now() - start;
        return {
            ...server,
            resolvedIp: address,
            status: 'Online',
            latency,
        };
    } catch (error: any) {
        let status: ServerStatus = 'Offline';
        if (error.code !== 'ENOTFOUND' && error.code !== 'EAI_AGAIN') {
           status = 'Error';
        }
        return {
            ...server,
            resolvedIp: 'N/A',
            status: status,
            latency: undefined,
        };
    }
}

export async function pingAllServers(servers: ServerInfo[]): Promise<ServerWithStatus[]> {
    const results = await Promise.all(servers.map(checkServer));
    return results;
}
