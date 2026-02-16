
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Phone, Database, MessageSquare, ArrowUpRight, ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, MessageCircle, Download, Users, AppWindow, Route, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

const voipRoutes = [
    { name: 'USA Press One', rate: '0.08', pulse: '6/6' },
    { name: 'USA Outbound Clean', rate: '0.011', pulse: '6/6' },
    { name: 'USA Outbound (TECH)', rate: '0.0135', pulse: '6/6' },
    { name: 'USA CLI (ALL PASS)', rate: '0.26$', pulse: '60/60' },
    { name: 'UK (OB) FIX/MOB', rate: '0.012 / 0.022', pulse: '1/1' },
    { name: 'UK (IVR) FIX/MOB', rate: '0.015 / 0.032', pulse: '1/1' },
    { name: 'AUSI (OB) FIX/MOB', rate: '0.011 / 0.026', pulse: '1/1' },
    { name: 'AUSI (IVR) FIX/MOB', rate: '0.015 / 0.035', pulse: '1/1' },
    { name: 'Canada IVR', rate: '0.015', pulse: '6/6' },
    { name: 'Canada CLI (ALL Pass)', rate: '0.018', pulse: '60/60' },
];


export function ServerDashboard() {
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [isVoipDialogOpen, setVoipDialogOpen] = useState(false);
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

  const servers = [
    {
        name: 'VICIBOX Dialers',
        type: '5 Servers',
        icon: <Phone className="w-8 h-8" />,
        isSpecial: true,
        href: '/vicibox',
        description: (
            <>
                <p className="text-sm text-muted-foreground mb-4">
                    VICIBOX is a comprehensive, contact center suite. It offers a wide range of features for both inbound and outbound call handling, making it a powerful tool for call centers of all sizes.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Outbound Campaing</li>
                    <li>Inbound Campaign</li>
                    <li>Press One Campaing</li>
                    <li>Avator Campaing</li>
                    <li>Call Menu Campaing</li>
                    <li>Broadcast Campaing</li>
                </ul>
            </>
        ),
    },
    {
      name: 'VOS3000',
      type: 'VoIP Softswitch',
      icon: <Server className="w-8 h-8" />,
      accessPoints: [
          { name: 'CDR Login', url: 'https://51.161.43.30:8443' },
      ],
      description: (
          <>
              <p className="text-sm text-muted-foreground mb-4">
                  VOS3000 is a carrier-grade softswitch designed for wholesale VoIP operations. It provides a stable and efficient platform for managing large volumes of VoIP traffic.
              </p>
              <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Wholesale VoIP Billing</li>
                  <li>Rate and Routing Management</li>
                  <li>Real-time Call Monitoring</li>
                  <li>Least Cost Routing (LCR)</li>
                  <li>SIP/H.323 Protocol Support</li>
              </ul>
          </>
      ),
    },
    {
      name: 'FusionPBX Server',
      type: 'FusionPBX',
      icon: <Server className="w-8 h-8" />,
      accessPoints: [],
      description: (
        <>
          <p className="text-sm text-muted-foreground mb-4">
              FusionPBX is a powerful, open-source multi-tenant PBX platform built on FreeSWITCH. It provides a robust and scalable solution for businesses of all sizes, offering a rich feature set for VoIP communications.
          </p>
          <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Multi-tenant</li>
            <li>Voicemail-to-email</li>
            <li>Call recording</li>
            <li>Ring groups</li>
            <li>etc</li>
          </ul>
        </>
      ),
    },
    {
      name: 'Bulk SMS Server',
      type: 'Bulk SMS',
      icon: <MessageSquare className="w-8 h-8" />,
      accessPoints: [],
      description: (
        <>
            <p className="text-sm font-semibold text-foreground/90 mb-2">Features:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>High-volume messaging</li>
                <li>API integration</li>
                <li>Message scheduling</li>
                <li>Reporting & analytics</li>
            </ul>
        </>
      ),
    },
    {
      name: 'ASTPP',
      type: 'Billing',
      icon: <Server className="w-8 h-8" />,
      accessPoints: [],
      description: (
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
      ),
    },
    {
      name: 'Magnus Billing',
      type: 'Billing',
      icon: <Server className="w-8 h-8" />,
      accessPoints: [],
      description: (
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
      ),
    },
    {
      name: 'High Risk US Toll-free',
      type: 'DIDs & TFN available',
      icon: <Phone className="w-8 h-8" />,
      accessPoints: [],
      description: (
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
      ),
    },
    {
      name: 'Low Risk DID/ TFN',
      type: 'US DIDs & US TFNs',
      icon: <Phone className="w-8 h-8" />,
      accessPoints: [],
      description: (
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
                      <li>$125/number</li>
                      <li>2 Channels Included (Extra channel cost $50 each)</li>
                      <li>Unlimited Incoming Minutes</li>
                      <li>In case of a blocked number, a replacement number will cost $30 each.</li>
                  </ul>
              </div>
          </div>
      </>
      ),
    },
    {
        name: 'Web Apps',
        type: 'Tools & Utilities',
        icon: <AppWindow className="w-8 h-8" />,
        accessPoints: [],
        description: (
            <>
                <p className="text-sm text-muted-foreground">
                    Our web applications are built with a modern stack for a robust and scalable experience.
                </p>
                <div className="mt-4 space-y-3">
                    <div>
                        <p className="text-sm font-semibold text-foreground/90 mb-1">Technology Stack:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li><span className="font-semibold">Frontend:</span> Next.js, React, Tailwind CSS</li>
                            <li><span className="font-semibold">Backend:</span> Next.js, Express.js</li>
                            <li><span className="font-semibold">Database:</span> MYsql , Mango DB, Firebase</li>
                        </ul>
                    </div>
                </div>
            </>
        )
    },
    {
        name: 'Digital Media Marketing',
        type: 'SEO, GMB, SMM, SEM',
        icon: <TrendingUp className="w-8 h-8" />,
        isSpecial: true,
        href: '/digital-media-marketing',
        description: (
            <>
                <p className="text-sm text-muted-foreground mb-4">
                    Our expertise covers SEO, GMB SEO, SMM, and SEM. We create tailored plans to suit your business goals and deliver measurable growth.
                </p>
                <p className="text-sm text-muted-foreground">
                    Contact us today for a free consultation!
                </p>
            </>
        ),
    },
  ];

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
      <header className="p-6 border-b bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
              <text x="10" y="7" fill="currentColor" fontSize="3" fontWeight="bold" fontFamily="monospace">AMS</text>
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
                {server.isSpecial ? (
                     <Button asChild size="sm">
                        <Link href={server.href!}>
                            View All
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                ) : server.accessPoints && server.accessPoints.length > 0 ? server.accessPoints.map((accessPoint, i) => (
                  <a key={i} href={accessPoint.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm">
                      {accessPoint.name}
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )) :  <p className="text-sm text-muted-foreground">Contact us for access.</p>}
              </CardFooter>
            </Card>
          ))}

          <Dialog open={isOrderDialogOpen} onOpenChange={handleDialogChange}>
            <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <div className="p-3 rounded-full bg-accent/10 text-accent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-accent"
                        >
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                          <line x1="6" y1="6" x2="6.01" y2="6"></line>
                          <line x1="6" y1="18" x2="6.01" y2="18"></line>
                          <text x="10" y="7" fill="currentColor" fontSize="3" fontWeight="bold" fontFamily="monospace">AMS</text>
                        </svg>
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
                            <a href="https://wa.me/17633272191?text=I%27m%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Whatsapp
                                </Button>
                            </a>
                            <a href="https://signal.me/#eu/PqnF0l4lduSifjrHV0JYAtLlhasADwOJg7WT_D1tubp-FhjdEi9CU7jh1G-3b4o3" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Signal
                                </Button>
                            </a>
                             <a href="http://t.me/AMSserver" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Telegram
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
                                  href={`https://wa.me/17633272191?text=${getOrderDetails()}`} 
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

          <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
              <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center gap-4 p-4">
                      <div className="p-3 rounded-full bg-accent/10 text-accent">
                          <DollarSign className="w-8 h-8" />
                      </div>
                      <div>
                          <CardTitle className="text-lg">VoIP Routes</CardTitle>
                          <CardDescription>Offering VOIP Rates</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                      <p className="text-sm text-muted-foreground">Check our competitive pricing for a variety of high-quality VoIP routes to find the best option for your business.</p>
                  </CardContent>
                  <CardFooter className="flex flex-row gap-2 p-4 bg-muted/50">
                      <DialogTrigger asChild>
                          <Button size="sm">
                              View Rates
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Button>
                      </DialogTrigger>
                  </CardFooter>
              </Card>
              <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                      <DialogTitle>VoIP Routes & Rates</DialogTitle>
                      <DialogDescription>
                          Here are the current rates for our VoIP routes.
                      </DialogDescription>
                  </DialogHeader>
                  <Card>
                      <CardContent className="p-0">
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Route</TableHead>
                                      <TableHead>Rate</TableHead>
                                      <TableHead className="text-right">Pulse</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {voipRoutes.map(route => (
                                      <TableRow key={route.name}>
                                          <TableCell className="font-medium">{route.name}</TableCell>
                                          <TableCell>{route.rate}</TableCell>
                                          <TableCell className="text-right">{route.pulse}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </CardContent>
                  </Card>
                  <DialogFooter>
                      <Button variant="outline" onClick={() => setVoipDialogOpen(false)}>Close</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>

        </div>
      </main>
      <footer className="p-6 text-sm text-center border-t text-muted-foreground bg-card">
        <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
