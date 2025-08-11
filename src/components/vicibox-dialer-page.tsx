
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, ArrowUpRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const viciboxFeatures = (
    <>
      <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        <li>Predictive dialing</li>
        <li>Inbound/outbound calling</li>
        <li>Call recording & scripting</li>
        <li>Outbound Campaign</li>
        <li>Inbound Campaign</li>
        <li>Press One Campaign</li>
        <li>Avatar Campaign</li>
        <li>Call Menu Campaign</li>
        <li>Broadcast Campaign</li>
      </ul>
    </>
  );

const viciboxServers = [
  {
    name: 'VICIBOX124',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'http://107.150.36.124:7887/valid8.php' },
      { name: 'Login', url: 'http://107.150.36.124/vicidial/welcome.php' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICIBOX123',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box123.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box123.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICIBOX126',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box126.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box126.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICIBOX75',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box75.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box75.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICIBOX78',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box78.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box78.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICIBOX51',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box51.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box51.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICIBOX52',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://box52.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://box52.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICI123',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://vici123.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://vici123.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
  {
    name: 'VICI125',
    type: 'VICIBOX',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Firewall', url: 'https://vici125.amsserver.com:446/valid8.php' },
      { name: 'Login', url: 'https://vici125.amsserver.com/' },
    ],
    description: viciboxFeatures,
  },
];

export function ViciboxDialerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <div className="container mx-auto flex items-center justify-between">
            <div className="text-left">
                <h1 className="text-xl md:text-3xl font-bold">VICIBOX Dialers</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Access all your VICIBOX servers.</p>
            </div>
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Back to Dashboard</span>
                </Link>
            </Button>
        </div>
      </header>
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {viciboxServers.map((server, index) => (
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
