
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Phone, Database, MessageSquare, ArrowUpRight, ShoppingCart, Loader2, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const defaultDescription = <p className="text-sm text-muted-foreground">Select an access point below. You can update the URLs in the code.</p>;

const smsFeatures = (
    <>
      <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        <li>High-volume messaging</li>
        <li>API integration</li>
        <li>Message scheduling</li>
        <li>Reporting & analytics</li>
      </ul>
    </>
);

const vos3000Features = (
    <>
      <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        <li>Wholesale VoIP</li>
        <li>Call routing</li>
        <li>Billing & rating</li>
        <li>Reporting</li>
      </ul>
    </>
);

const hardwareRequirements = (
  <Accordion type="single" collapsible className="w-full mt-4">
      <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm font-semibold text-foreground/90 py-2 hover:no-underline">Hardware Estimates (1k-5k CC)</AccordionTrigger>
          <AccordionContent>
              <div className="text-xs text-muted-foreground space-y-2 pt-2">
                  <p className="font-bold">For ~1000 Concurrent Calls:</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                      <li><span className="font-semibold">CPU:</span> 16+ Cores (e.g., Intel Xeon Silver/Gold)</li>
                      <li><span className="font-semibold">RAM:</span> 64GB - 128GB DDR4 ECC</li>
                      <li><span className="font-semibold">Storage:</span> High-speed NVMe SSDs (RAID)</li>
                  </ul>
                   <p className="font-bold mt-2">For 1k-5k+ Concurrent Calls (Distributed):</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                      <li><span className="font-semibold">Voice Switch:</span> Multiple servers, 32+ core CPU, 64-128GB RAM each</li>
                      <li><span className="font-semibold">App Server:</span> 8-16 core CPU, 32-64GB RAM</li>
                      <li><span className="font-semibold">Database Server:</span> 16+ core CPU, 128GB+ RAM, High-perf NVMe SSDs</li>
                  </ul>
                  <p className="text-xs italic mt-2">Note: These are estimates. For production, consult a certified expert.</p>
              </div>
          </AccordionContent>
      </AccordionItem>
  </Accordion>
);


const astppFeatures = (
    <>
      <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        <li>Multi-level Reseller Management</li>
        <li>Calling Cards</li>
        <li>Wholesale & Retail VoIP Billing</li>
        <li>Class 4 & 5 Softswitch Features</li>
      </ul>
      {hardwareRequirements}
    </>
);

const magnusBillingFeatures = (
    <>
      <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        <li>Prepaid & Postpaid Billing</li>
        <li>Call Detail Records (CDR) Analysis</li>
        <li>Rate Management</li>
        <li>Customer Portal</li>
      </ul>
      {hardwareRequirements}
    </>
);

const servers = [
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
    description: vos3000Features,
  },
  {
    name: 'Bulk SMS Server',
    type: 'Bulk SMS',
    icon: <MessageSquare className="w-8 h-8" />,
    accessPoints: [
        { name: 'LOGIN', url: 'https://bulksms.amsserver.com/login' },
        { name: 'Signup', url: 'https://bulksms.amsserver.com/register' },
    ],
    description: smsFeatures,
  },
  {
    name: 'ASTPP',
    type: 'Billing',
    icon: <DollarSign className="w-8 h-8" />,
    accessPoints: [],
    description: astppFeatures,
  },
  {
    name: 'Magnus Billing',
    type: 'Billing',
    icon: <DollarSign className="w-8 h-8" />,
    accessPoints: [],
    description: magnusBillingFeatures,
  },
];

const serverTypes = ['FusionPBX', 'VOS3000', 'VICIBOX', 'Bulk SMS', 'ASTPP', 'Magnus Billing', 'Other'];

const fusionPbxCapacities = [
    { value: '50', label: 'Up to 50 channels', price: '50$/month' },
    { value: '100', label: 'Up to 100 channels', price: '80$/month' },
    { value: '500', label: 'Up to 500 channels', price: '125$/month' },
];

const vos3000Capacities = [
    { value: '500', label: 'Up to 500 channels', price: '100$/month' },
    { value: '1000', label: 'Up to 1000 channels', price: '125$/month' },
    { value: '5000', label: 'Up to 5000 channels', price: '145$/month' },
];

const viciboxUserTiers = [
    { value: '5', label: 'Up to 5 agents', price: '50$/month' },
    { value: '10', label: 'Up to 10 agents', price: '100$/month' },
    { value: '15', label: 'Up to 15 agents', price: '145$/month' },
    { value: '20', label: 'Up to 20 agents', price: '185$/month' },
    { value: '25', label: 'Up to 25 agents', price: '225$/month' },
    { value: 'cluster', label: 'Cluster Server', price: 'Contact for Pricing' },
];


export function ServerDashboard() {
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState('');
  const [selectedFusionCapacity, setSelectedFusionCapacity] = useState('');
  const [selectedVosCapacity, setSelectedVosCapacity] = useState('');
  const [selectedViciboxTier, setSelectedViciboxTier] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleServerTypeChange = (value: string) => {
    setSelectedServer(value);
    setSelectedFusionCapacity('');
    setSelectedVosCapacity('');
    setSelectedViciboxTier('');
  };

  const handleSubmitOrder = async () => {
    if (!selectedServer || !requirements) {
        toast({
            title: 'Incomplete Order',
            description: 'Please select a server and fill out your requirements.',
            variant: 'destructive',
        });
        return;
    }
    
    if (selectedServer === 'FusionPBX' && !selectedFusionCapacity) {
        toast({ title: 'Incomplete Order', description: 'Please select a capacity for the FusionPBX server.', variant: 'destructive'});
        return;
    }

    if (selectedServer === 'VOS3000' && !selectedVosCapacity) {
        toast({ title: 'Incomplete Order', description: 'Please select a capacity for the VOS3000 server.', variant: 'destructive'});
        return;
    }

    if (selectedServer === 'VICIBOX' && !selectedViciboxTier) {
        toast({ title: 'Incomplete Order', description: 'Please select a user tier for the VICIBOX server.', variant: 'destructive'});
        return;
    }

    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);

    let toastDescription = `Your order for a ${selectedServer} server has been received.`;
    if (selectedServer === 'FusionPBX') {
        const capacityDetails = fusionPbxCapacities.find(c => c.value === selectedFusionCapacity);
        toastDescription = `Your order for a ${selectedServer} server with ${capacityDetails?.label} has been received.`;
    } else if (selectedServer === 'VOS3000') {
        const capacityDetails = vos3000Capacities.find(c => c.value === selectedVosCapacity);
        toastDescription = `Your order for a ${selectedServer} server with ${capacityDetails?.label} has been received.`;
    } else if (selectedServer === 'VICIBOX') {
        const tierDetails = viciboxUserTiers.find(t => t.value === selectedViciboxTier);
        toastDescription = `Your order for a ${selectedServer} server for ${tierDetails?.label} has been received.`;
    } else if (selectedServer === 'Bulk SMS') {
        toastDescription = `Your order for a Bulk SMS server has been received. We will contact you regarding payment.`;
    }

    toast({
        title: 'Order Placed!',
        description: toastDescription,
    });

    setSelectedServer('');
    setSelectedFusionCapacity('');
    setSelectedVosCapacity('');
    setSelectedViciboxTier('');
    setRequirements('');
    setOrderDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold text-center">AMS Server Management Dashboard</h1>
        <p className="text-center text-muted-foreground">One-click access to all your servers.</p>
      </header>
      <main className="flex-grow p-4 md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-lg">VICIBOX Dialers</CardTitle>
                <CardDescription>5 Servers</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
                <p className="text-sm text-muted-foreground">Access all VICIBOX dialing servers from a dedicated page.</p>
            </CardContent>
            <CardFooter className="flex flex-row gap-2 p-4 bg-muted/50">
                <Button asChild size="sm">
                    <Link href="/vicibox">
                        View All
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </CardFooter>
          </Card>

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
          
          <Dialog open={isOrderDialogOpen} onOpenChange={setOrderDialogOpen}>
            <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <div className="p-3 rounded-full bg-accent/10 text-accent-foreground">
                        <ShoppingCart className="w-8 h-8" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">Place New Order</CardTitle>
                        <CardDescription>Request a new server setup.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                    <p className="text-sm text-muted-foreground">Need a new server? Place your order here and we'll get it set up for you.</p>
                </CardContent>
                <CardFooter className="p-4 bg-muted/50">
                    <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">
                            Place Order
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                    </DialogTrigger>
                </CardFooter>
            </Card>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Place a New Server Order</DialogTitle>
                    <DialogDescription>
                        Select your desired server type and specify your requirements below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="server-type" className="text-right">
                            Server Type
                        </Label>
                        <Select value={selectedServer} onValueChange={handleServerTypeChange}>
                            <SelectTrigger id="server-type" className="col-span-3">
                                <SelectValue placeholder="Select a server" />
                            </SelectTrigger>
                            <SelectContent>
                                {serverTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedServer === 'FusionPBX' && (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="fusion-capacity" className="text-right">
                                Capacity
                            </Label>
                            <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                <SelectTrigger id="fusion-capacity" className="col-span-3">
                                    <SelectValue placeholder="Select capacity" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fusionPbxCapacities.map(capacity => (
                                        <SelectItem key={capacity.value} value={capacity.value}>
                                            {capacity.label} ({capacity.price})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {selectedServer === 'VOS3000' && (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="vos-capacity" className="text-right">
                                Capacity
                            </Label>
                            <Select value={selectedVosCapacity} onValueChange={setSelectedVosCapacity}>
                                <SelectTrigger id="vos-capacity" className="col-span-3">
                                    <SelectValue placeholder="Select capacity" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vos3000Capacities.map(capacity => (
                                        <SelectItem key={capacity.value} value={capacity.value}>
                                            {capacity.label} ({capacity.price})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    
                    {selectedServer === 'VICIBOX' && (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="vicibox-tier" className="text-right">
                                Users
                            </Label>
                            <Select value={selectedViciboxTier} onValueChange={setSelectedViciboxTier}>
                                <SelectTrigger id="vicibox-tier" className="col-span-3">
                                    <SelectValue placeholder="Select agents tier" />
                                </SelectTrigger>
                                <SelectContent>
                                    {viciboxUserTiers.map(tier => (
                                        <SelectItem key={tier.value} value={tier.value}>
                                            {tier.label} ({tier.price})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {selectedServer === 'Bulk SMS' && (
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Pricing
                            </Label>
                            <div className="col-span-3 text-sm">
                                <p className="text-foreground"><span className="font-semibold">Setup Fee:</span> $499 (One Time)</p>
                                <p className="text-foreground"><span className="font-semibold">Monthly Fee:</span> $199/month</p>
                            </div>
                        </div>
                    )}

                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="requirements" className="text-right">
                            Requirements
                        </Label>
                        <Textarea
                            id="requirements"
                            className="col-span-3"
                            placeholder="e.g., specific software, configuration, user accounts..."
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmitOrder} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Submit Order
                    </Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </main>
      <footer className="p-6 text-sm text-center border-t text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
