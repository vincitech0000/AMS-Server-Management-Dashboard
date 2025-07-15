
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Phone, Database, MessageSquare, ArrowUpRight, ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, MessageCircle, Wifi } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

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

const usDidFeatures = (
    <>
        <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Low-cost local numbers</li>
            <li>Wide coverage across the US</li>
            <li>All DIDs and TFNs will be routed to FusionPBX</li>
            <li>Separate domain login & access to control your DID/TFN</li>
        </ul>
        <p className="text-sm font-semibold text-foreground/90 mt-4 mb-2">Pricing:</p>
        <div className="text-sm text-muted-foreground space-y-2">
            <div>
                <p className="font-semibold">Low Risk DID:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>$65/DID (for a single DID)</li>
                    <li>$35/DID (for orders of 10+)</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold">Low Risk TFN:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>$85/TFN (for a single TFN)</li>
                    <li>$55/TFN (for orders of 10+)</li>
                </ul>
            </div>
        </div>
    </>
);

const usTollFreeFeatures = (
    <>
        <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>1-800 series numbers (888, 877, etc.)</li>
            <li>Nationwide reach with a single number</li>
            <li>All DIDs and TFNs will be routed to FusionPBX</li>
            <li>Separate domain login & access to control your DID/TFN</li>
        </ul>
        <p className="text-sm font-semibold text-foreground/90 mt-4 mb-2">Pricing:</p>
        <div className="text-sm text-muted-foreground space-y-2">
            <div>
                <p className="font-semibold">HIGH Risk DID:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>$225/DID (Includes 10 Channels)</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold">HIGH Risk TFN:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>$275/TFN (Includes 10 channels)</li>
                </ul>
            </div>
        </div>
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
    icon: <Server className="w-8 h-8" />,
    accessPoints: [],
    description: astppFeatures,
  },
  {
    name: 'Magnus Billing',
    type: 'Billing',
    icon: <Server className="w-8 h-8" />,
    accessPoints: [],
    description: magnusBillingFeatures,
  },
  {
    name: 'Low Risk DID/ TFN',
    type: 'US DIDs & US TFNs',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Connect', url: 'http://wa.me/19208156022?text=I%27m%20interested%20in%20Low%20Risk%20DID/%20TFN' },
    ],
    description: usDidFeatures,
  },
  {
    name: 'High Risk US Toll-free',
    type: 'DIDs & TFN available',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [
      { name: 'Connect', url: 'http://wa.me/19208156022?text=I%27m%20interested%20in%20High%20Risk%20US%20Toll-free' },
    ],
    description: usTollFreeFeatures,
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

const astppCapacities = [
    { value: '1000', label: 'Up to 1000 CC', price: '100$/month' },
    { value: '5000', label: 'Up to 5000 CC', price: '145$/month' },
];

const magnusBillingCapacities = [
    { value: '1000', label: 'Up to 1000 CC', price: '100$/month' },
    { value: '5000', label: 'Up to 5000 CC', price: '145$/month' },
];

const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
};


export function ServerDashboard() {
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState('');
  const [selectedFusionCapacity, setSelectedFusionCapacity] = useState('');
  const [selectedVosCapacity, setSelectedVosCapacity] = useState('');
  const [selectedViciboxTier, setSelectedViciboxTier] = useState('');
  const [selectedAstppCapacity, setSelectedAstppCapacity] = useState('');
  const [selectedMagnusCapacity, setSelectedMagnusCapacity] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [orderStep, setOrderStep] = useState('form'); // 'form', 'payment'
  
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  useEffect(() => {
    if (isOrderDialogOpen && orderStep === 'form') {
      setCaptchaText(generateCaptcha());
    }
  }, [isOrderDialogOpen, orderStep]);

  const resetForm = () => {
    setSelectedServer('');
    setSelectedFusionCapacity('');
    setSelectedVosCapacity('');
    setSelectedViciboxTier('');
    setSelectedAstppCapacity('');
    setSelectedMagnusCapacity('');
    setRequirements('');
    setOrderStep('form');
    setCaptchaInput('');
    setCaptchaText(generateCaptcha());
  }

  const handleServerTypeChange = (value: string) => {
    setSelectedServer(value);
    setSelectedFusionCapacity('');
    setSelectedVosCapacity('');
    setSelectedViciboxTier('');
    setSelectedAstppCapacity('');
    setSelectedMagnusCapacity('');
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setOrderDialogOpen(open);
  }

  const getOrderDetails = () => {
    let details = `Order Details:\n- Server Type: ${selectedServer}`;
    if (selectedServer === 'FusionPBX') {
        const capacityDetails = fusionPbxCapacities.find(c => c.value === selectedFusionCapacity);
        details += `\n- Capacity: ${capacityDetails?.label} (${capacityDetails?.price})`;
    } else if (selectedServer === 'VOS3000') {
        const capacityDetails = vos3000Capacities.find(c => c.value === selectedVosCapacity);
        details += `\n- Capacity: ${capacityDetails?.label} (${capacityDetails?.price})`;
    } else if (selectedServer === 'VICIBOX') {
        const tierDetails = viciboxUserTiers.find(t => t.value === selectedViciboxTier);
        details += `\n- Users: ${tierDetails?.label} (${tierDetails?.price})`;
    } else if (selectedServer === 'Bulk SMS') {
        details += `\n- Setup: $499 (One Time)\n- Monthly: $199/month`;
    } else if (selectedServer === 'ASTPP') {
        const capacityDetails = astppCapacities.find(c => c.value === selectedAstppCapacity);
        details += `\n- Capacity: ${capacityDetails?.label} (${capacityDetails?.price})`;
        details += `\n- Setup: $50 (One Time)`;
    } else if (selectedServer === 'Magnus Billing') {
        const capacityDetails = magnusBillingCapacities.find(c => c.value === selectedMagnusCapacity);
        details += `\n- Capacity: ${capacityDetails?.label} (${capacityDetails?.price})`;
        details += `\n- Setup: $50 (One Time)`;
    }
    if (requirements) {
        details += `\n- Requirements: ${requirements}`;
    }
    return encodeURIComponent(details);
  };

  const handleSubmitOrder = async () => {
    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
        toast({
            title: 'Invalid CAPTCHA',
            description: 'Please try again.',
            variant: 'destructive',
        });
        setCaptchaText(generateCaptcha());
        setCaptchaInput('');
        return;
    }
  
    if (!selectedServer) {
        toast({
            title: 'Incomplete Order',
            description: 'Please select a server type.',
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
    
    if (selectedServer === 'ASTPP' && !selectedAstppCapacity) {
        toast({ title: 'Incomplete Order', description: 'Please select a capacity for the ASTPP server.', variant: 'destructive'});
        return;
    }

    if (selectedServer === 'Magnus Billing' && !selectedMagnusCapacity) {
        toast({ title: 'Incomplete Order', description: 'Please select a capacity for the Magnus Billing server.', variant: 'destructive'});
        return;
    }

    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);

    toast({
        title: 'Order Details Confirmed!',
        description: 'Please contact us on WhatsApp to finalize your order.',
    });
    
    setOrderStep('payment');
  };

  const handleServerStatusClick = () => {
    // We will add server pinging logic here in the future
    toast({
      title: 'Checking Servers...',
      description: 'This feature is coming soon!',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-12 h-12 text-primary"
              fill="currentColor"
            >
              <path d="M144,32a16,16,0,0,0-16-16H88A16,16,0,0,0,72,32V72H32a16,16,0,0,0-16,16V224a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V88a16,16,0,0,0-16-16H176V32A16,16,0,0,0,160,16H112a16,16,0,0,0-16,16v8a8,8,0,0,0,16,0V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V72h24a8,8,0,0,1,8,8v40a8,8,0,0,0,16,0V88a8,8,0,0,1,8,8V224a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8H72v24a8,8,0,0,0,16,0V80a8,8,0,0,0-8-8H40a8,8,0,0,1-8-8V80a8,8,0,0,0,0-16Zm16-8a8,8,0,0,1-8,8H112a8,8,0,0,1-8-8V32a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8Z" opacity="0.2"/>
              <path d="M232,80H176V40a24,24,0,0,0-24-24H112A24,24,0,0,0,88,40V80H32A24,24,0,0,0,8,104V224a24,24,0,0,0,24,24H224a24,24,0,0,0,24-24V104A24,24,0,0,0,232,80ZM104,40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V80H104ZM224,232H32a8,8,0,0,1-8-8V104a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V224A8,8,0,0,1,224,232Z"/>
              <path d="M128,128a12,12,0,1,0,12,12A12,12,0,0,0,128,128Zm0,16a4,4,0,1,1,4-4A4,4,0,0,1,128,144Z"/>
              <path d="M128,168a44,44,0,0,0,39.3-24.9,8,8,0,1,0-14-6.2,28,28,0,0,1-50.6,0,8,8,0,0,0-14,6.2A44,44,0,0,0,128,168Z"/>
              <path d="M128,208a72,72,0,0,0,65-38.3,8,8,0,1,0-13.8-7.4,56,56,0,0,1-102.4,0,8,8,0,0,0-13.8,7.4A72,72,0,0,0,128,208Z"/>
            </svg>
            <div className="text-left">
              <h1 className="text-xl md:text-3xl font-bold">AMS Server Management</h1>
              <p className="text-xs md:text-sm text-muted-foreground">One-click access to all your servers.</p>
            </div>
          </div>
          <div>
            <Button variant="outline" onClick={handleServerStatusClick}>
              <Wifi className="mr-2 h-4 w-4" />
              Server Status
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      {accessPoint.name !== 'Connect' && <ArrowUpRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </a>
                ))}
              </CardFooter>
            </Card>
          ))}
          
          <Dialog open={isOrderDialogOpen} onOpenChange={handleDialogChange}>
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
                        <Button size="sm" variant="secondary" onClick={() => setOrderDialogOpen(true)}>
                            Place Order
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                    </DialogTrigger>
                </CardFooter>
            </Card>
            <DialogContent className="sm:max-w-[425px]">
                {orderStep === 'form' && (
                    <>
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
                            
                            {selectedServer === 'ASTPP' && (
                                <>
                                    <div className="grid items-center grid-cols-4 gap-4">
                                        <Label htmlFor="astpp-capacity" className="text-right">
                                            Capacity
                                        </Label>
                                        <Select value={selectedAstppCapacity} onValueChange={setSelectedAstppCapacity}>
                                            <SelectTrigger id="astpp-capacity" className="col-span-3">
                                                <SelectValue placeholder="Select capacity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {astppCapacities.map(capacity => (
                                                    <SelectItem key={capacity.value} value={capacity.value}>
                                                        {capacity.label} ({capacity.price})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                        <Label className="text-right pt-2">
                                            Setup Fee
                                        </Label>
                                        <div className="col-span-3 text-sm pt-2">
                                            <p className="text-foreground">$50 (One Time Only)</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedServer === 'Magnus Billing' && (
                                <>
                                    <div className="grid items-center grid-cols-4 gap-4">
                                        <Label htmlFor="magnus-capacity" className="text-right">
                                            Capacity
                                        </Label>
                                        <Select value={selectedMagnusCapacity} onValueChange={setSelectedMagnusCapacity}>
                                            <SelectTrigger id="magnus-capacity" className="col-span-3">
                                                <SelectValue placeholder="Select capacity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {magnusBillingCapacities.map(capacity => (
                                                    <SelectItem key={capacity.value} value={capacity.value}>
                                                        {capacity.label} ({capacity.price})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                        <Label className="text-right pt-2">
                                            Setup Fee
                                        </Label>
                                        <div className="col-span-3 text-sm pt-2">
                                            <p className="text-foreground">$50 (One Time Only)</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            <div className="grid items-start grid-cols-4 gap-4">
                                <Label htmlFor="requirements" className="text-right pt-2">
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                 <Label htmlFor="captcha" className="text-right">
                                    Verify
                                </Label>
                                <div className="col-span-3 flex items-center gap-2">
                                    <div className="px-4 py-2 rounded-md bg-muted text-lg font-bold tracking-widest select-none font-mono" style={{ textDecoration: 'line-through' }}>
                                        {captchaText}
                                    </div>
                                    <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())}>
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="captcha-input" className="text-right">
                                    Enter Code
                                </Label>
                                <Input
                                    id="captcha-input"
                                    className="col-span-3"
                                    placeholder="Enter the code above"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSubmitOrder} disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Submit Order
                            </Button>
                        </DialogFooter>
                    </>
                )}
                {orderStep === 'payment' && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Finalize Your Order</DialogTitle>
                            <DialogDescription>
                                Please contact us on WhatsApp to arrange payment and finalize your server setup.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-center gap-4 mt-4">
                                <a 
                                  href={`http://wa.me/19208156022?text=${getOrderDetails()}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                    <Button>
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Pay Later & Contact on WhatsApp
                                    </Button>
                                </a>
                                <p className="text-xs text-center text-muted-foreground">Click the button to send your order details to our team.</p>
                            </div>
                        </div>
                        <DialogFooter>
                             <Button variant="secondary" onClick={() => handleDialogChange(false)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Done
                            </Button>
                        </DialogFooter>
                    </>
                )}
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

    