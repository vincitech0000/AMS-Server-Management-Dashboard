
'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, RefreshCw, Server, Wifi, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type ServerStatus = 'Online' | 'Offline' | 'Checking';

const initialServers = [
  { name: 'FusionPBX Server', ip: '173.208.249.122', status: 'Online' as ServerStatus },
  { name: 'VOS3000 Server', ip: 'voip.amsserver.com', status: 'Online' as ServerStatus },
  { name: 'Bulk SMS Server', ip: 'bulksms.amsserver.com', status: 'Offline' as ServerStatus },
  { name: 'VICIBOX124', ip: '107.150.36.124', status: 'Online' as ServerStatus },
  { name: 'VICIBOX123', ip: 'box123.amsserver.com', status: 'Online' as ServerStatus },
  { name: 'VICIBOX126', ip: 'box126.amsserver.com', status: 'Checking' as ServerStatus },
  { name: 'VICIBOX75', ip: 'box75.amsserver.com', status: 'Online' as ServerStatus },
  { name: 'VICIBOX78', ip: 'box78.amsserver.com', status: 'Offline' as ServerStatus },
];

export function ServerStatusPage() {
  const [servers, setServers] = useState(initialServers);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleRefreshAll = () => {
    startTransition(() => {
      setServers(servers.map(s => ({ ...s, status: 'Checking' })));
      
      toast({
        title: 'Refreshing Statuses...',
        description: 'Pinging all servers. This may take a moment.',
      });

      // Simulate network delay and random status updates
      setTimeout(() => {
        const updatedServers = servers.map(server => {
          const randomStatus = Math.random();
          if (randomStatus < 0.7) return { ...server, status: 'Online' as ServerStatus };
          if (randomStatus < 0.9) return { ...server, status: 'Offline' as ServerStatus };
          return { ...server, status: 'Checking' as ServerStatus };
        });
        setServers(updatedServers);
        toast({
            title: 'Statuses Refreshed',
            description: 'All server statuses have been updated.',
        });
      }, 2000);
    });
  };

  const getStatusComponent = (status: ServerStatus) => {
    switch (status) {
      case 'Online':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-500/90"><CheckCircle className="mr-1 h-3 w-3" />Online</Badge>;
      case 'Offline':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Offline</Badge>;
      case 'Checking':
        return <Badge variant="secondary"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Checking</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <div className="container mx-auto flex items-center justify-between">
            <div className="text-left">
                <h1 className="text-xl md:text-3xl font-bold">Server Status</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Monitor the health of all your servers.</p>
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={handleRefreshAll} disabled={isPending}>
                    {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                    Refresh All
                </Button>
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
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wifi />
                        Live Server Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Icon</TableHead>
                                <TableHead>Server Name</TableHead>
                                <TableHead>IP Address / Domain</TableHead>
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
  );
}
