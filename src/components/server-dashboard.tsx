'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Server, Phone, Database, MessageSquare, ArrowUpRight, 
    ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, 
    MessageCircle, Download, Users, AppWindow, Route, TrendingUp,
    Shield, Zap, Globe, Cpu, LayoutGrid, Info
} from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
    { name: 'USA Press1 with Dialer', rate: '0.095', pulse: '6/6' },
    { name: 'USA Outbound Clean', rate: '0.011', pulse: '6/6' },
    { name: 'USA Outbound (TECH)', rate: '0.015', pulse: '6/6' },
    { name: 'USA CLI (ALL PASS)', rate: '0.175$', pulse: '6/6' },
    { name: 'Canada IVR', rate: '0.01', pulse: '6/6' },
    { name: 'Canada CLI (ALL Pass)', rate: '0.025', pulse: '60/60' },
    { name: 'Puerto Rico', rate: '0.02', pulse: '6/6' },
];


export function ServerDashboard() {
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [isVoipDialogOpen, setVoipDialogOpen] = useState(false);
  const [isReadCommentDialogOpen, setReadCommentDialogOpen] = useState(false);
  const [isPostCommentDialogOpen, setPostCommentDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState('');
  const [selectedFusionCapacity, setSelectedFusionCapacity] = useState('');
  const [selectedVosCapacity, setSelectedVosCapacity] = useState('');
  const [selectedViciboxTier, setSelectedViciboxTier] = useState('');
  const [selectedAstppCapacity, setSelectedAstppCapacity] = useState('');
  const [selectedMagnusCapacity, setSelectedMagnusCapacity] = useState('');
  const [requirements, setRequirements] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [orderStep, setOrderStep] = useState('form'); // 'form', 'payment'
  
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  
  useEffect(() => {
    if ((isOrderDialogOpen && orderStep === 'form') || isPostCommentDialogOpen) {
      setCaptchaText(generateCaptcha());
    }
  }, [isOrderDialogOpen, orderStep, isPostCommentDialogOpen]);

  const servers = [
    {
        name: 'VICIBOX Dialers',
        category: 'Dialer & PBX',
        type: '1 Server',
        icon: <Phone className="w-6 h-6" />,
        isSpecial: true,
        href: '/vicibox',
        description: 'Comprehensive contact center suite for inbound/outbound handling.',
        features: ['Predictive Dialer', 'Press One Campaigns', 'Inbound Support']
    },
    {
      name: 'VOS3000',
      category: 'Wholesale & Switches',
      type: 'VoIP Softswitch',
      icon: <Globe className="w-6 h-6" />,
      accessPoints: [{ name: 'CDR Login', url: 'https://51.161.43.30:8443' }],
      description: 'Carrier-grade softswitch for managing large volumes of VoIP traffic.',
      features: ['Wholesale Billing', 'LCR Routing', 'Real-time Monitor']
    },
    {
      name: 'FusionPBX Server',
      category: 'Dialer & PBX',
      type: 'Multi-tenant PBX',
      icon: <Server className="w-6 h-6" />,
      description: 'Robust multi-tenant PBX platform built on FreeSWITCH.',
      features: ['Multi-tenant', 'Call Recording', 'Ring Groups']
    },
    {
      name: 'Bulk SMS Server',
      category: 'Messaging',
      type: 'SMS Gateway',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Complete Bulk SMS Gateway solution with full technical support.',
      features: ['API Integration', 'Campaign Tool', 'Unlimited Resellers']
    },
    {
      name: 'ASTPP',
      category: 'Billing & Softswitches',
      type: 'Class 4/5 Billing',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Open-source billing for wholesale & retail VoIP business.',
      features: ['Calling Cards', 'DID Management', 'Auto Provisioning']
    },
    {
      name: 'Magnus Billing',
      category: 'Billing & Softswitches',
      type: 'Prepaid/Postpaid',
      icon: <Database className="w-6 h-6" />,
      description: 'Advanced billing solution for VoIP providers and retailers.',
      features: ['CDR Analysis', 'Rate Management', 'Agent Portal']
    },
    {
      name: 'US DIDs & Toll-free',
      category: 'Connectivity',
      type: 'High/Low Risk DIDs',
      icon: <Route className="w-6 h-6" />,
      description: 'Nationwide US numbers and Toll-free numbers for all use cases.',
      features: ['1-800 Series', 'Local DIDs', 'Multi-domain Login']
    },
    {
        name: 'Web Applications',
        category: 'Utilities',
        type: 'Custom Dev',
        icon: <AppWindow className="w-6 h-6" />,
        description: 'Modern full-stack web applications tailored for your business.',
        features: ['React/Next.js', 'Firebase/Node.js', 'Scalable Arch']
    },
    {
        name: 'Digital Marketing',
        category: 'Marketing',
        type: 'SEO & Growth',
        icon: <TrendingUp className="w-6 h-6" />,
        isSpecial: true,
        href: '/digital-media-marketing',
        description: 'Expertise in SEO, GMB, SMM, and SEM to deliver measurable growth.',
        features: ['SEO Audit', 'GMB Optimization', 'Ad Campaigns']
    },
    {
        name: 'Reseller Program',
        category: 'Partner',
        type: 'Wholesale Partner',
        icon: <Users className="w-6 h-6" />,
        isSpecial: true,
        href: '/reseller-program',
        description: 'Launch your own VoIP service with our VOS3000 Reseller Panel.',
        features: ['Control Pricing', '24/7 Support', 'White-label Ready']
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
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) resetForm();
    setOrderDialogOpen(open);
  }

  const resetCommentForm = () => {
      setNewComment('');
      setCaptchaInput('');
  }

  const getOrderDetails = () => {
    let details = `Order Details:\n- Server Type: ${selectedServer}`;
    // ... simplified mapping for WhatsApp text
    return encodeURIComponent(details);
  };

  const handleSubmitOrder = async () => {
    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
        toast({ title: 'Invalid CAPTCHA', variant: 'destructive' });
        setCaptchaText(generateCaptcha());
        return;
    }
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setOrderStep('payment');
  };

  const handleSubmitComment = async () => {
    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
        toast({ title: 'Invalid CAPTCHA', variant: 'destructive' });
        return;
    }
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitting(false);
    toast({ title: 'Comment Submitted!' });
    setPostCommentDialogOpen(false);
    resetCommentForm();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground">
                <Server className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-headline hidden sm:block">AMS Portal</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Cloud VoIP Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                  <Link href="/server-status">Status</Link>
              </Button>
              <Button onClick={() => setOrderDialogOpen(true)} size="sm" className="rounded-full px-6 shadow-md shadow-primary/20">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Service
              </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pb-12">
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 border-b mb-12">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/20 bg-primary/5 text-primary">
                    Reliable Infrastructure for VoIP
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 font-headline tracking-tight text-foreground">
                    Next-Generation <span className="text-primary">Server Solutions</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Deploy, manage, and scale your VoIP operations with high-performance switches, 
                    dedicated dialers, and robust messaging platforms.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-full px-8">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setVoipDialogOpen(true)} className="rounded-full px-8">
                        View Rates
                    </Button>
                </div>
            </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-bold font-headline">Available Services</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setReadCommentDialogOpen(true)} className="rounded-full">
                    Reviews
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPostCommentDialogOpen(true)} className="rounded-full">
                    Post Feedback
                </Button>
              </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servers.map((server, index) => (
              <Card key={index} className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 border-primary/5 hover:border-primary/20">
                <CardHeader className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        {server.icon}
                    </div>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-bold">
                        {server.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold font-headline mt-2">{server.name}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{server.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-5 pb-5">
                    <ul className="space-y-1.5">
                        {server.features.map((f, i) => (
                            <li key={i} className="text-xs flex items-center text-muted-foreground">
                                <CheckCircle className="w-3 h-3 mr-2 text-accent" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="px-5 py-4 bg-muted/20 border-t border-muted">
                  {server.isSpecial ? (
                       <Button asChild size="sm" className="w-full rounded-full">
                          <Link href={server.href!}>
                              Explore Details
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Link>
                      </Button>
                  ) : (
                      <div className="flex gap-2 w-full">
                          {server.accessPoints ? server.accessPoints.map((ap, i) => (
                              <Button key={i} asChild variant="outline" size="sm" className="flex-1 rounded-full">
                                  <a href={ap.url} target="_blank" rel="noopener noreferrer">
                                      {ap.name}
                                  </a>
                              </Button>
                          )) : (
                              <Button variant="ghost" size="sm" disabled className="w-full text-[10px]">
                                  Contact for Private Access
                              </Button>
                          )}
                      </div>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            {/* Softphone & Support Card */}
            <Card className="flex flex-col overflow-hidden bg-primary/5 border-primary/20 shadow-inner">
                <CardHeader className="p-5">
                    <div className="p-2.5 w-fit rounded-xl bg-primary text-primary-foreground mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg font-bold font-headline">Quick Tools</CardTitle>
                    <CardDescription>Softphones & Direct Support</CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-4">
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2 tracking-widest">Downloads</p>
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" asChild className="h-8 rounded-full text-xs">
                                <a href="https://www.portsip.com/downloads/pbx/v22/portsip-pbx-22.2.15.438.exe" target="_blank"><Download className="w-3 h-3 mr-1" /> Portsip</a>
                            </Button>
                            <Button size="sm" variant="outline" asChild className="h-8 rounded-full text-xs">
                                <a href="https://www.zoiper.com/en/voip-softphone/download/zoiper5/for/windows" target="_blank"><Download className="w-3 h-3 mr-1" /> Zoiper</a>
                            </Button>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2 tracking-widest">Connect</p>
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="secondary" asChild className="h-8 rounded-full text-xs bg-accent/10 hover:bg-accent/20 text-accent border-accent/20">
                                <a href="https://wa.me/17633272191"><MessageCircle className="w-3 h-3 mr-1" /> WhatsApp</a>
                            </Button>
                            <Button size="sm" variant="secondary" asChild className="h-8 rounded-full text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/20">
                                <a href="http://t.me/AMSserver"><MessageSquare className="w-3 h-3 mr-1" /> Telegram</a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Reusable Dialogs - Order, VoIP, Comments */}
      <Dialog open={isOrderDialogOpen} onOpenChange={handleDialogChange}>
          <DialogContent className="sm:max-w-[425px]">
              {orderStep === 'form' ? (
                  <>
                      <DialogHeader>
                          <DialogTitle className="text-2xl font-bold font-headline">Service Inquiry</DialogTitle>
                          <DialogDescription>Select a product to receive a customized quote.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                          <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase text-muted-foreground">Product Type</Label>
                              <Select value={selectedServer} onValueChange={handleServerTypeChange}>
                                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Choose your service" /></SelectTrigger>
                                  <SelectContent>{serverTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          {selectedServer === 'FusionPBX' && (
                              <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-muted-foreground">Channel Capacity</Label>
                                  <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Choose capacity" /></SelectTrigger>
                                      <SelectContent>{fusionPbxCapacities.map(c => <SelectItem key={c.value} value={c.value}>{c.label} ({c.price})</SelectItem>)}</SelectContent>
                                  </Select>
                              </div>
                          )}
                          <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase text-muted-foreground">Additional Requirements</Label>
                              <Textarea placeholder="Software config, users, etc." className="rounded-xl resize-none" value={requirements} onChange={e => setRequirements(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase text-muted-foreground">Verification</Label>
                              <div className="flex gap-2 mb-2">
                                  <div className="flex-grow flex items-center justify-center bg-muted rounded-xl text-lg font-mono tracking-widest line-through select-none">{captchaText}</div>
                                  <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-xl"><RefreshCw className="w-4 h-4" /></Button>
                              </div>
                              <Input placeholder="Enter code" className="rounded-xl" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                          </div>
                      </div>
                      <DialogFooter>
                          <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full rounded-xl h-11">
                              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ShoppingCart className="w-4 h-4 mr-2" />}
                              Proceed to Order
                          </Button>
                      </DialogFooter>
                  </>
              ) : (
                  <div className="text-center py-6 space-y-6">
                      <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent"><CheckCircle className="w-8 h-8" /></div>
                      <div>
                          <h3 className="text-xl font-bold font-headline mb-2">Request Ready!</h3>
                          <p className="text-sm text-muted-foreground">Click below to send these details directly to our WhatsApp support team.</p>
                      </div>
                      <Button asChild size="lg" className="w-full rounded-xl bg-accent hover:bg-accent/90">
                          <a href={`https://wa.me/17633272191?text=${getOrderDetails()}`} target="_blank"><MessageCircle className="w-4 h-4 mr-2" /> Finish on WhatsApp</a>
                      </Button>
                      <Button variant="ghost" className="w-full text-xs" onClick={() => handleDialogChange(false)}>Close Window</Button>
                  </div>
              )}
          </DialogContent>
      </Dialog>

      <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
          <DialogContent className="max-w-xl">
              <DialogHeader>
                  <DialogTitle className="text-2xl font-bold font-headline">Live VoIP Rates</DialogTitle>
                  <DialogDescription>Real-time competitive pricing for global routes.</DialogDescription>
              </DialogHeader>
              <div className="border rounded-xl overflow-hidden mt-4">
                  <Table>
                      <TableHeader className="bg-muted/50">
                          <TableRow>
                              <TableHead className="font-bold">Destination Route</TableHead>
                              <TableHead className="font-bold text-center">Rate ($)</TableHead>
                              <TableHead className="font-bold text-right">Pulse</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {voipRoutes.map(r => (
                              <TableRow key={r.name} className="hover:bg-primary/5 transition-colors">
                                  <TableCell className="font-medium text-xs sm:text-sm">{r.name}</TableCell>
                                  <TableCell className="text-center font-mono text-accent font-bold">{r.rate}</TableCell>
                                  <TableCell className="text-right text-muted-foreground text-xs">{r.pulse}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-4">Rates are subject to market changes. Contact for volume pricing.</p>
          </DialogContent>
      </Dialog>

      <Dialog open={isReadCommentDialogOpen} onOpenChange={setReadCommentDialogOpen}>
          <DialogContent className="sm:max-w-md">
              <DialogHeader><DialogTitle className="text-xl font-bold font-headline">Customer Experiences</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                  <Card className="bg-muted/30 border-none shadow-none"><CardContent className="p-4"><p className="text-sm italic text-muted-foreground">"Great service! The server setup was quick and the support team is very responsive."</p><p className="text-xs text-right font-bold mt-2 text-primary">— verified_customer_01</p></CardContent></Card>
                  <Card className="bg-muted/30 border-none shadow-none"><CardContent className="p-4"><p className="text-sm italic text-muted-foreground">"The VoIP routes have excellent quality. Highly recommended for wholesale operations."</p><p className="text-xs text-right font-bold mt-2 text-primary">— global_telecom_inc</p></CardContent></Card>
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isPostCommentDialogOpen} onOpenChange={setPostCommentDialogOpen}>
          <DialogContent className="sm:max-w-md">
              <DialogHeader><DialogTitle className="text-xl font-bold font-headline">Share Feedback</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                  <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">Your Message</Label>
                      <Textarea placeholder="How was your experience?" value={newComment} onChange={e => setNewComment(e.target.value)} rows={3} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">Verification</Label>
                      <div className="flex gap-2 mb-2">
                          <div className="flex-grow flex items-center justify-center bg-muted rounded-xl font-mono text-lg line-through select-none">{captchaText}</div>
                          <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-xl"><RefreshCw className="w-4 h-4" /></Button>
                      </div>
                      <Input placeholder="Enter code" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} className="rounded-xl" />
                  </div>
              </div>
              <DialogFooter><Button onClick={handleSubmitComment} disabled={isSubmitting} className="w-full rounded-xl">{isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Comment'}</Button></DialogFooter>
          </DialogContent>
      </Dialog>

      <footer className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 mb-8 text-muted-foreground">
                <Shield className="w-5 h-5 opacity-50" />
                <Globe className="w-5 h-5 opacity-50" />
                <Cpu className="w-5 h-5 opacity-50" />
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AMS Server Management Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}