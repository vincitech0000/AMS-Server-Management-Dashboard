
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Phone, Database, MessageSquare, ArrowUpRight, ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, MessageCircle, Download, Users, AppWindow } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

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

const astppFeatures = (
    <>
      <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        <li>Multi-level Reseller Management</li>
        <li>Calling Cards</li>
        <li>Wholesale & Retail VoIP Billing</li>
        <li>Class 4 & 5 Softswitch Features</li>
        <li>IVR (Interactive Voice Response)</li>
        <li>Auto Provisioning</li>
        <li>DID Management</li>
        <li>Payment Gateway Integration</li>
      </ul>
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
        <li>Agent Management</li>
        <li>Invoicing and Payments</li>
        <li>LCR (Least Cost Routing)</li>
        <li>Advanced Reporting</li>
      </ul>
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

const webAppFeatures = (
    <>
        <p className="text-sm text-muted-foreground">
            Our web applications are built with a modern stack for a robust and scalable experience.
        </p>
        <div className="mt-4 space-y-3">
            <div>
                <p className="text-sm font-semibold text-foreground/90 mb-1">Technology Stack:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><span className="font-semibold">Frontend:</span> Next.js, React, Tailwind CSS</li>
                    <li><span className="font-semibold">Backend:</span> Next.js, Genkit (for AI)</li>
                    <li><span className="font-semibold">Database:</span> None required (stateless architecture)</li>
                </ul>
            </div>
            <div>
                <p className="text-sm font-semibold text-foreground/90 mb-1">Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>AI-powered code generation</li>
                    <li>Real-time HTML preview</li>
                    <li>Code formatting and download</li>
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
    accessPoints: [],
    description: usDidFeatures,
  },
  {
    name: 'High Risk US Toll-free',
    type: 'DIDs & TFN available',
    icon: <Phone className="w-8 h-8" />,
    accessPoints: [],
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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2DD4BF" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <path
                d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80 M 50 22 a 28 28 0 0 1 0 56 a 28 28 0 0 1 0 -56 M 50 34 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle cx="50" cy="50" r="6" fill="url(#logoGradient)" />
            </svg>
            <div className="text-left">
              <h1 className="text-xl md:text-3xl font-bold">AMS Server Management</h1>
              <p className="text-xs md:text-sm text-muted-foreground">One-click access to all your servers.</p>
            </div>
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

          <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <AppWindow className="w-8 h-8" />
                </div>
                <div>
                    <CardTitle className="text-lg">Web Apps</CardTitle>
                    <CardDescription>Tools & Utilities</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
                {webAppFeatures}
            </CardContent>
            <CardFooter className="flex flex-row gap-2 p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">Contact us for custom web app development.</p>
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
                {server.accessPoints.length > 0 ? server.accessPoints.map((accessPoint, i) => (
                  <a key={i} href={accessPoint.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm">
                      {accessPoint.icon}
                      {accessPoint.name}
                      {accessPoint.name !== 'Whatsapp' && accessPoint.name !== 'Teams ID' && <ArrowUpRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </a>
                )) :  <p className="text-sm text-muted-foreground">Contact us for access.</p>}
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
                        <CardDescription>Request a server or download tools.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                    <p className="text-sm text-muted-foreground">Need a new server? Place an order here. You can also download useful softphones or contact us for support.</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-4 bg-muted/50">
                    <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" onClick={() => setOrderDialogOpen(true)}>
                            Place Order
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                    </DialogTrigger>
                    <Separator />
                    <div className="w-full">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">SOFTPHONE DOWNLOADS</p>
                        <div className="flex flex-wrap gap-2">
                            <a href="https://www.portsip.com/downloads/pbx/v22/portsip-pbx-22.2.15.438.exe" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Portsip
                                </Button>
                            </a>
                            <a href="https://www.zoiper.com/en/voip-softphone/download/zoiper5/for/windows" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Zoiper
                                </Button>
                            </a>
                        </div>
                    </div>
                     <Separator />
                    <div className="w-full">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">GET SUPPORT</p>
                        <div className="flex flex-wrap gap-2">
                            <a href="http://wa.me/19208156022?text=I%27m%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Whatsapp
                                </Button>
                            </a>
                            <a href="https://teams.live.com/l/invite/FEA2XRY-PelOorENgc" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <Users className="w-4 h-4 mr-2" />
                                    Teams ID
                                </Button>
                            </a>
                        </div>
                    </div>
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
