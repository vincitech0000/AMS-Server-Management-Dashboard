
'use client';

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, RefreshCw, Server, Wifi, XCircle, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { ServerStatus, ServerWithStatus } from '@/app/actions';
import { pingAllServers } from '@/app/actions';

type ServerWithChecking = ServerWithStatus | { status: 'Checking'; name: string; ip: string; resolvedIp?: string };

const initialServers: ServerWithChecking[] = [
  { name: 'FusionPBX Server', ip: '173.208.249.122', status: 'Checking' },
  { name: 'Bulk SMS Server (bulksms.amsserver.com)', ip: '142.54.188.154', status: 'Checking' },
  { name: 'VICIBOX124', ip: '107.150.36.124', status: 'Checking' },
  { name: 'VICIBOX123', ip: 'box123.amsserver.com', status: 'Checking' },
  { name: 'VICIBOX126', ip: 'box126.amsserver.com', status: 'Checking' },
  { name: 'VICIBOX75', ip: 'box75.amsserver.com', status: 'Checking' },
  { name: 'VICIBOX78', ip: 'box78.amsserver.com', status: 'Checking' },
];

export function ServerStatusPage() {
  const [servers, setServers] = useState<ServerWithChecking[]>(initialServers);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const handleRefreshAll = () => {
    // Prevent multiple refreshes from running at the same time
    if (isPending) return;

    startTransition(async () => {
      setServers(currentServers => currentServers.map(s => ({ ...s, status: 'Checking', resolvedIp: s.resolvedIp || '...' })));
      
      const serversToPing = servers.map(({name, ip}) => ({name, ip}));
      const results = await pingAllServers(serversToPing);

      setServers(results);
    });
  };

  useEffect(() => {
    // Perform an initial check when the component mounts
    handleRefreshAll();
    
    // Set up an interval to refresh every 3 seconds
    const intervalId = setInterval(() => {
      handleRefreshAll();
    }, 3000); // 3000ms = 3 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusComponent = (status: ServerStatus | 'Checking') => {
    switch (status) {
      case 'Online':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-500/90"><CheckCircle className="mr-1 h-3 w-3" />Online</Badge>;
      case 'Offline':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Offline</Badge>;
      case 'Checking':
        return <Badge variant="secondary"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Checking</Badge>;
      case 'Error':
        return <Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" />Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const handleManualRefresh = () => {
    toast({
      title: 'Refreshing Statuses...',
      description: 'Pinging all servers. This may take a moment.',
    });
    handleRefreshAll();
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="p-6 border-b">
          <div className="container mx-auto flex items-center justify-between">
              <div className="text-left">
                  <h1 className="text-xl md:text-3xl font-bold">Server Status</h1>
                  <p className="text-xs md:text-sm text-muted-foreground">Monitor the health of all your servers.</p>
              </div>
              <div className="flex items-center gap-2">
                  <Button asChild variant="outline">
                      <Link href="/">
                          <ArrowLeft className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">Back to Dashboard</span>
                      </Link>
                  </Button>
              </div>
          </div>
        </header>
        <main className="flex-grow p-4 md:p-8">
          <div className="container mx-auto">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                          <Wifi />
                          Live Server Status
                      </CardTitle>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={handleManualRefresh} disabled={isPending}>
                                  {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                                  <span className="sr-only">Refresh Status</span>
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Refresh All</p>
                          </TooltipContent>
                      </Tooltip>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead className="w-[100px]">Icon</TableHead>
                                  <TableHead>Server Name</TableHead>
                                  <TableHead>Domain / IP</TableHead>
                                  <TableHead>Resolved IP</TableHead>
                                  <TableHead className="text-right">Status</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {servers.map((server, index) => (
                                  <TableRow key={index}>
                                      <TableCell className="text-primary">
                                          <Server className="w-6 h-6" />
                                      </TableCell>
                                      <TableCell className="font-medium">{server.name}</TableCell>
                                      <TableCell>{server.ip}</TableCell>
                                      <TableCell>
                                        {server.status === 'Checking' && !server.resolvedIp ? '...' : server.resolvedIp}
                                      </TableCell>
                                      <TableCell className="text-right">
                                          {getStatusComponent(server.status)}
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </div>
        </main>
        <footer className="p-6 text-sm text-center border-t text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </TooltipProvider>
  );
}
