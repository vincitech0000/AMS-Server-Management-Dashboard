
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Phone, Database, MessageSquare, ArrowUpRight } from 'lucide-react';

const defaultDescription = <p className="text-sm text-muted-foreground">Select an access point below. You can update the URLs in the code.</p>;

const servers = [
  {
    name: 'VICIBOX124',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'http://107.150.36.124:7887/valid8.php' },
      { name: 'Login', url: 'http://107.150.36.124/vicidial/welcome.php' },
    ],
    description: defaultDescription,
  },
  {
    name: 'VICIBOX123',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box123.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box123.amsserver.com/' },
    ],
    description: defaultDescription,
  },
  {
    name: 'VICIBOX126',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box126.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box126.amsserver.com/' },
    ],
    description: defaultDescription,
  },
  {
    name: 'VICIBOX75',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box75.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box75.amsserver.com/' },
    ],
    description: defaultDescription,
  },
  {
    name: 'VICIBOX78',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box78.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box78.amsserver.com/' },
    ],
    description: defaultDescription,
  },
  {
    name: 'FusionPBX Server',
    type: 'FusionPBX',
    icon: <Server className="w-8 h-8" />,
    accessPoints: [{ name: 'Login', url: 'https://173.208.249.122/' }],
    description: (
      <>
        <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Multi-tenant</li>
          <li>Voicemail-to-email</li>
          <li>Call recording</li>
          <li>Ring groups</li>
        </ul>
      </>
    ),
  },
  {
    name: 'VOS3000 Server',
    type: 'VOS3000',
    icon: <Database className="w-8 h-8" />,
    accessPoints: [{ name: 'CDR Login', url: 'https://voip.amsserver.com:8443/' }],
    description: defaultDescription,
  },
  {
    name: 'Bulk SMS Server',
    type: 'Bulk SMS',
    icon: <MessageSquare className="w-8 h-8" />,
    accessPoints: [{ name: 'Access Server', url: '#' }],
    description: defaultDescription,
  },
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
                {server.description}
              </CardContent>
              <CardFooter className="flex flex-row gap-2 p-4 bg-muted/50">
                {server.accessPoints.map((accessPoint, i) => (
                  <a key={i} href={accessPoint.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm">
                      {accessPoint.name}
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                ))}
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
