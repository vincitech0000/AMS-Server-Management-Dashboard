'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Server, Phone, Database, MessageSquare, ArrowUpRight, 
    ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, 
    MessageCircle, Download, Users, AppWindow, Route, TrendingUp,
    Shield, Zap, Globe, Cpu, LayoutGrid, Info, Star, Headphones,
    Wifi
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

const voipRoutes = [
    { name: 'USA Press1 with Dialer', rate: '0.095', pulse: '6/6' },
    { name: 'USA Outbound Clean', rate: '0.011', pulse: '6/6' },
    { name: 'USA Outbound (TECH)', rate: '0.015', pulse: '6/6' },
    { name: 'USA CLI (ALL PASS)', rate: '0.175$', pulse: '6/6' },
    { name: 'Canada IVR', rate: '0.01', pulse: '6/6' },
    { name: 'Canada CLI (ALL Pass)', rate: '0.025', pulse: '60/60' },
    { name: 'Puerto Rico', rate: '0.02', pulse: '6/6' },
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
  const [isVoipDialogOpen, setVoipDialogOpen] = useState(false);
  const [isReadCommentDialogOpen, setReadCommentDialogOpen] = useState(false);
  const [isPostCommentDialogOpen, setPostCommentDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState('');
  const [selectedFusionCapacity, setSelectedFusionCapacity] = useState('');
  const [requirements, setRequirements] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [orderStep, setOrderStep] = useState('form');
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
        type: 'Call Center',
        icon: <Phone className="w-6 h-6" />,
        isSpecial: true,
        href: '/vicibox',
        description: 'Predictive dialer suite for large outbound campaigns.',
        features: ['Predictive Dialer', 'Press One', 'Inbound Support']
    },
    {
      name: 'VOS3000',
      category: 'Switches',
      type: 'Softswitch',
      icon: <Globe className="w-6 h-6" />,
      accessPoints: [{ name: 'CDR Login', url: 'https://51.161.43.30:8443' }],
      description: 'Carrier-grade softswitch for wholesale VoIP traffic management.',
      features: ['Wholesale Billing', 'LCR Routing', 'Real-time Monitor']
    },
    {
      name: 'FusionPBX Server',
      category: 'Dialer & PBX',
      type: 'Multi-tenant',
      icon: <Server className="w-6 h-6" />,
      description: 'High-performance multi-tenant PBX based on FreeSWITCH.',
      features: ['Multi-tenant', 'Call Recording', 'Ring Groups']
    },
    {
      name: 'Bulk SMS Server',
      category: 'Messaging',
      type: 'SMS Gateway',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Robust SMS gateway with API and multi-language support.',
      features: ['Unlimited Resellers', 'Campaign Tool', 'API Integration']
    },
    {
      name: 'ASTPP',
      category: 'Billing',
      type: 'Class 4/5',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Open-source VoIP billing and management solution.',
      features: ['Calling Cards', 'DID Management', 'Auto Provisioning']
    },
    {
      name: 'Magnus Billing',
      category: 'Billing',
      type: 'Management',
      icon: <Database className="w-6 h-6" />,
      description: 'Comprehensive billing solution for VoIP retail operations.',
      features: ['CDR Analysis', 'Rate Management', 'Agent Portal']
    },
    {
        name: 'Digital Marketing',
        category: 'Marketing',
        type: 'SEO & Growth',
        icon: <TrendingUp className="w-6 h-6" />,
        isSpecial: true,
        href: '/digital-media-marketing',
        description: 'Strategic growth through SEO, SMM, and Google Ads.',
        features: ['SEO Audit', 'GMB SEO', 'SMM Campaigns']
    },
    {
        name: 'Reseller Program',
        category: 'Partner',
        type: 'Wholesale',
        icon: <Users className="w-6 h-6" />,
        isSpecial: true,
        href: '/reseller-program',
        description: 'Start your VoIP business with our VOS3000 Reseller Panels.',
        features: ['Pricing Control', '24/7 Support', 'Dedicated Panels']
    },
  ];

  const resetForm = () => {
    setSelectedServer('');
    setSelectedFusionCapacity('');
    setRequirements('');
    setOrderStep('form');
    setCaptchaInput('');
    setCaptchaText(generateCaptcha());
  }

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

  const getOrderDetails = () => {
    return encodeURIComponent(`Service Inquiry:\nServer: ${selectedServer}\nRequirements: ${requirements}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <Server className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-headline leading-none">AMS Portal</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Cloud Infrastructure</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="hidden md:flex rounded-full">
                  <Link href="/server-status">
                    <Wifi className="w-4 h-4 mr-2" />
                    Network Status
                  </Link>
              </Button>
              <Button onClick={() => setOrderDialogOpen(true)} size="sm" className="rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Get Started
              </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 hero-gradient border-b">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-fade-in">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <span>Trusted by 500+ Enterprise Clients</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-headline tracking-tight text-foreground leading-[1.1]">
                    Powering Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">VoIP Infrastructure</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                    Deploy carrier-grade softswitches, automated dialers, and 
                    messaging gateways in minutes on our high-performance cloud.
                </p>
                <div className="flex flex-wrap justify-center gap-5">
                    <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-full px-10 h-14 text-lg font-bold">
                        Provision Server
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setVoipDialogOpen(true)} className="rounded-full px-10 h-14 text-lg font-bold bg-background/50 backdrop-blur-sm">
                        View VoIP Rates
                    </Button>
                </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        <div className="container mx-auto px-4 -mt-12 mb-20 relative z-20">
          {/* Quick Stats / Feedback Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <Card className="glass-card rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-xl text-accent">
                        <Star className="w-6 h-6 fill-accent" />
                    </div>
                    <div>
                        <h4 className="font-bold">Customer Reviews</h4>
                        <p className="text-xs text-muted-foreground">What our partners say about us</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setReadCommentDialogOpen(true)} className="rounded-full font-bold">Read</Button>
                    <Button variant="default" size="sm" onClick={() => setPostCommentDialogOpen(true)} className="rounded-full font-bold">Post Feedback</Button>
                </div>
            </Card>
            <Card className="glass-card rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                        <Headphones className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold">Expert Support</h4>
                        <p className="text-xs text-muted-foreground">Need help with configuration?</p>
                    </div>
                </div>
                <Button variant="secondary" size="sm" asChild className="rounded-full font-bold">
                    <a href="https://wa.me/17633272191">Live Chat</a>
                </Button>
            </Card>
          </div>

          <div className="flex items-center gap-3 mb-8">
              <LayoutGrid className="w-6 h-6 text-primary" />
              <h3 className="text-3xl font-bold font-headline">Enterprise Services</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servers.map((server, index) => (
              <Card key={index} className="group relative flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl border-primary/10 hover:border-primary/30 rounded-2xl">
                <CardHeader className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-inner">
                        {server.icon}
                    </div>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-tighter font-black bg-muted/50 border-primary/20 text-primary">
                        {server.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold font-headline mb-2">{server.name}</CardTitle>
                  <CardDescription className="text-xs font-medium leading-relaxed">{server.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-6 pb-6 pt-0">
                    <div className="space-y-2 mb-6">
                        {server.features.map((f, i) => (
                            <div key={i} className="flex items-center text-xs font-medium text-muted-foreground">
                                <CheckCircle className="w-3.5 h-3.5 mr-2 text-accent" />
                                {f}
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="px-6 py-5 bg-muted/30 border-t border-muted">
                  {server.isSpecial ? (
                       <Button asChild className="w-full rounded-xl h-10 font-bold shadow-md hover:shadow-lg transition-all">
                          <Link href={server.href!}>
                              Explore Details
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Link>
                      </Button>
                  ) : (
                      <div className="flex gap-2 w-full">
                          {server.accessPoints ? server.accessPoints.map((ap, i) => (
                              <Button key={i} asChild variant="outline" size="sm" className="flex-1 rounded-xl font-bold bg-background">
                                  <a href={ap.url} target="_blank" rel="noopener noreferrer">
                                      {ap.name}
                                  </a>
                              </Button>
                          )) : (
                              <Button variant="ghost" size="sm" disabled className="w-full text-[10px] font-bold">
                                  Request Credentials
                              </Button>
                          )}
                      </div>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            {/* Quick Access Card */}
            <Card className="flex flex-col overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-inner rounded-2xl">
                <CardHeader className="p-6">
                    <div className="p-3 w-fit rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/20">
                        <Zap className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold font-headline">Operator Tools</CardTitle>
                    <CardDescription className="text-xs">Quick downloads and support</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-3 tracking-widest">Softphone Clients</p>
                        <div className="grid grid-cols-2 gap-2">
                            <Button size="sm" variant="outline" asChild className="h-9 rounded-xl text-xs bg-background/50">
                                <a href="https://www.portsip.com/downloads/pbx/v22/portsip-pbx-22.2.15.438.exe"><Download className="w-3 h-3 mr-1.5" /> Portsip</a>
                            </Button>
                            <Button size="sm" variant="outline" asChild className="h-9 rounded-xl text-xs bg-background/50">
                                <a href="https://www.zoiper.com/en/voip-softphone/download/zoiper5/for/windows"><Download className="w-3 h-3 mr-1.5" /> Zoiper</a>
                            </Button>
                        </div>
                    </div>
                    <Separator className="bg-primary/10" />
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-3 tracking-widest">Infrastructure Support</p>
                        <div className="flex flex-col gap-2">
                            <Button variant="secondary" asChild className="h-10 rounded-xl text-xs font-bold bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20">
                                <a href="https://wa.me/17633272191" className="flex items-center justify-center w-full">
                                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Support
                                </a>
                            </Button>
                            <Button variant="secondary" asChild className="h-10 rounded-xl text-xs font-bold bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20">
                                <a href="http://t.me/AMSserver" className="flex items-center justify-center w-full">
                                    <MessageSquare className="w-4 h-4 mr-2" /> Telegram Group
                                </a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <Dialog open={isOrderDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setOrderDialogOpen(open); }}>
          <DialogContent className="sm:max-w-[450px] rounded-3xl p-0 overflow-hidden">
              {orderStep === 'form' ? (
                  <div className="p-6">
                      <DialogHeader className="mb-6">
                          <DialogTitle className="text-3xl font-bold font-headline">Provision Service</DialogTitle>
                          <DialogDescription className="font-medium">Configure your deployment parameters.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-5 py-2">
                          <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Select Product</Label>
                              <Select value={selectedServer} onValueChange={setSelectedServer}>
                                  <SelectTrigger className="rounded-xl h-12 bg-muted/30 border-none"><SelectValue placeholder="Choose a service" /></SelectTrigger>
                                  <SelectContent className="rounded-xl">{serverTypes.map(t => <SelectItem key={t} value={t} className="rounded-lg">{t}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          {selectedServer === 'FusionPBX' && (
                              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Capacity Tier</Label>
                                  <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                      <SelectTrigger className="rounded-xl h-12 bg-muted/30 border-none"><SelectValue placeholder="Choose capacity" /></SelectTrigger>
                                      <SelectContent className="rounded-xl">{fusionPbxCapacities.map(c => <SelectItem key={c.value} value={c.value} className="rounded-lg">{c.label} ({c.price})</SelectItem>)}</SelectContent>
                                  </Select>
                              </div>
                          )}
                          <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Technical Requirements</Label>
                              <Textarea placeholder="Describe users, specific codecs, or required integrations..." className="rounded-xl bg-muted/30 border-none resize-none min-h-[100px]" value={requirements} onChange={e => setRequirements(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Anti-Bot Verification</Label>
                              <div className="flex gap-2">
                                  <div className="flex-grow flex items-center justify-center bg-primary/5 border border-primary/10 rounded-xl h-12 font-mono text-xl tracking-[0.5em] font-bold text-primary italic select-none line-through opacity-80">{captchaText}</div>
                                  <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-xl h-12 w-12 border-none bg-muted/30"><RefreshCw className="w-5 h-5" /></Button>
                              </div>
                              <Input placeholder="Enter verification code" className="rounded-xl h-12 bg-muted/30 border-none" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                          </div>
                      </div>
                      <DialogFooter className="mt-8">
                          <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full rounded-2xl h-14 text-lg font-bold shadow-xl shadow-primary/20">
                              {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ShoppingCart className="w-5 h-5 mr-2" />}
                              Deploy Service
                          </Button>
                      </DialogFooter>
                  </div>
              ) : (
                  <div className="text-center p-10 space-y-8 bg-gradient-to-b from-primary/5 to-background">
                      <div className="mx-auto w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-bounce"><CheckCircle className="w-12 h-12" /></div>
                      <div>
                          <h3 className="text-3xl font-bold font-headline mb-3 text-foreground">Request Verified</h3>
                          <p className="text-muted-foreground font-medium">Redirecting to our NOC for final configuration and billing.</p>
                      </div>
                      <Button asChild size="lg" className="w-full rounded-2xl h-16 bg-accent hover:bg-accent/90 text-xl font-black shadow-xl shadow-accent/20">
                          <a href={`https://wa.me/17633272191?text=${getOrderDetails()}`} target="_blank" className="flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 mr-3" /> Connect to WhatsApp
                          </a>
                      </Button>
                      <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest opacity-50" onClick={() => setOrderDialogOpen(false)}>Close Interface</Button>
                  </div>
              )}
          </DialogContent>
      </Dialog>

      <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
          <DialogContent className="max-w-xl rounded-3xl p-6">
              <DialogHeader>
                  <DialogTitle className="text-3xl font-bold font-headline">Wholesale Rate Deck</DialogTitle>
                  <DialogDescription className="font-medium">Global termination rates with 1:1 pulse accuracy.</DialogDescription>
              </DialogHeader>
              <div className="border border-primary/10 rounded-2xl overflow-hidden mt-6 bg-muted/10 shadow-inner">
                  <Table>
                      <TableHeader className="bg-primary/5">
                          <TableRow className="hover:bg-transparent">
                              <TableHead className="font-bold text-primary uppercase text-[10px] tracking-widest">Route</TableHead>
                              <TableHead className="font-bold text-primary uppercase text-[10px] tracking-widest text-center">Rate ($)</TableHead>
                              <TableHead className="font-bold text-primary uppercase text-[10px] tracking-widest text-right">Pulse</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {voipRoutes.map(r => (
                              <TableRow key={r.name} className="hover:bg-primary/5 border-primary/5 transition-colors">
                                  <TableCell className="font-bold text-xs">{r.name}</TableCell>
                                  <TableCell className="text-center font-mono text-accent font-black text-sm">{r.rate}</TableCell>
                                  <TableCell className="text-right text-muted-foreground text-[10px] font-bold">{r.pulse}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6 p-4 rounded-xl bg-amber-500/5 text-amber-600">
                <Info className="w-4 h-4" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Rates subject to daily market adjustments</p>
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isReadCommentDialogOpen} onOpenChange={setReadCommentDialogOpen}>
          <DialogContent className="sm:max-w-md rounded-3xl p-6">
              <DialogHeader className="mb-6"><DialogTitle className="text-2xl font-bold font-headline">Partner Testimonials</DialogTitle></DialogHeader>
              <div className="space-y-4">
                  {[
                      { text: "Seamless transition from local servers to AMS cloud. Uptime has been 100% since deployment.", user: "cloud_ops_lead" },
                      { text: "The FusionPBX cluster handles our 400 concurrent calls with zero jitter. Impressive support.", user: "voip_manager_eu" },
                      { text: "Best VOS3000 hosting I've used. The billing system is accurate and latency is extremely low.", user: "wholesale_carrier_inc" }
                  ].map((review, i) => (
                    <Card key={i} className="bg-muted/30 border-none shadow-none rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-sm italic font-medium text-foreground/80 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center justify-end gap-2 mt-4">
                                <Badge variant="secondary" className="bg-accent/10 text-accent border-none text-[9px] font-black tracking-widest uppercase">Verified Deployment</Badge>
                                <span className="text-[10px] font-bold text-primary">— @{review.user}</span>
                            </div>
                        </CardContent>
                    </Card>
                  ))}
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isPostCommentDialogOpen} onOpenChange={setPostCommentDialogOpen}>
          <DialogContent className="sm:max-w-md rounded-3xl p-6">
              <DialogHeader className="mb-6"><DialogTitle className="text-2xl font-bold font-headline">Share Experience</DialogTitle></DialogHeader>
              <div className="space-y-6">
                  <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Your Feedback</Label>
                      <Textarea placeholder="How would you rate our infrastructure performance?" value={newComment} onChange={e => setNewComment(e.target.value)} rows={4} className="rounded-2xl bg-muted/30 border-none resize-none" />
                  </div>
                  <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Human Verification</Label>
                      <div className="flex gap-2">
                          <div className="flex-grow flex items-center justify-center bg-primary/5 rounded-xl font-mono text-xl font-bold text-primary/60 line-through select-none h-12">{captchaText}</div>
                          <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-xl h-12 w-12 border-none bg-muted/30"><RefreshCw className="w-5 h-5" /></Button>
                      </div>
                      <Input placeholder="Verification code" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} className="rounded-xl h-12 bg-muted/30 border-none" />
                  </div>
              </div>
              <DialogFooter className="mt-8">
                <Button onClick={async () => {
                    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) { toast({ title: 'Invalid CAPTCHA', variant: 'destructive' }); return; }
                    setSubmitting(true); await new Promise(r => setTimeout(r, 1000)); setSubmitting(false);
                    toast({ title: 'Feedback Recorded', description: 'Thank you for helping us improve our cloud services.' });
                    setPostCommentDialogOpen(false); setNewComment(''); setCaptchaInput('');
                }} disabled={isSubmitting} className="w-full rounded-2xl h-12 font-bold shadow-lg shadow-primary/20">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Broadcast Feedback'}
                </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Enhanced Footer */}
      <footer className="py-20 border-t bg-muted/20">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
                <div className="flex justify-center gap-10 mb-10 text-muted-foreground/40">
                    <div className="flex flex-col items-center gap-2">
                        <Shield className="w-8 h-8" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">SECURE DATA</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Globe className="w-8 h-8" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">GLOBAL POP</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Cpu className="w-8 h-8" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">FAST COMPUTE</span>
                    </div>
                </div>
                <Separator className="max-w-xs mx-auto mb-8 opacity-20" />
                <p className="text-sm font-medium text-muted-foreground max-w-md mx-auto leading-relaxed">
                    AMS Portal provides high-availability infrastructure for modern telecommunication carriers and service providers worldwide.
                </p>
                <div className="flex gap-6 mt-8">
                    <Link href="/server-status" className="text-xs font-bold text-primary hover:underline">System Status</Link>
                    <span className="text-muted-foreground/30">|</span>
                    <a href="https://wa.me/17633272191" className="text-xs font-bold text-primary hover:underline">Legal & Privacy</a>
                </div>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-12 opacity-40">
                    &copy; {new Date().getFullYear()} AMS Server Management Portal. All rights reserved.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
