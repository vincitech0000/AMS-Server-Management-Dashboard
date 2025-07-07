'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Phone, Database, MessageSquare, ArrowUpRight } from 'lucide-react';

const servers = [
  { name: 'VICIBOX Server 1', type: 'VICIBOX', url: '#', icon: <Phone className="w-8 h-8" /> },
  { name: 'VICIBOX Server 2', type: 'VICIBOX', url: '#', icon: <Phone className="w-8 h-8" /> },
  { name: 'VICIBOX Server 3', type: 'VICIBOX', url: '#', icon: <Phone className="w-8 h-8" /> },
  { name: 'VICIBOX Server 4', type: 'VICIBOX', url: '#', icon: <Phone className="w-8 h-8" /> },
  { name: 'VICIBOX Server 5', type: 'VICIBOX', url: '#', icon: <Phone className="w-8 h-8" /> },
  { name: 'FusionPBX Server', type: 'FusionPBX', url: '#', icon: <Server className="w-8 h-8" /> },
  { name: 'VOS3000 Server', type: 'VOS3000', url: '#', icon: <Database className="w-8 h-8" /> },
  { name: 'Bulk SMS Server', type: 'Bulk SMS', url: '#', icon: <MessageSquare className="w-8 h-8" /> },
];

export function ServerDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold text-center">Server Management Dashboard</h1>
        <p className="text-center text-muted-foreground">One-click access to all your servers.</p>
      </header>
      <main className="flex-grow p-4 md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {servers.map((server, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {server.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{server.name}</CardTitle>
                  <CardDescription>{server.type}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <p className="text-sm text-muted-foreground">Click the button below to open the server's admin interface. You can update the URL in the code.</p>
              </CardContent>
              <CardFooter className="p-4 bg-muted/50">
                <a href={server.url} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full">
                    Access Server
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="p-6 text-sm text-center border-t text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
