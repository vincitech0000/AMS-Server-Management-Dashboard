'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Server, Phone, Database, MessageSquare, ArrowUpRight, 
    ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, 
    MessageCircle, Download, Users, AppWindow, Route, TrendingUp,
    Shield, Zap, Globe, Cpu, LayoutGrid, Info, Star, Headphones,
    Wifi, Calculator
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
    { name: 'USA Press1 with Dialer', rate: 0.095, pulse: '6/6' },
    { name: 'USA Outbound Clean', rate: 0.011, pulse: '6/6' },
    { name: 'USA Outbound (TECH)', rate: 0.015, pulse: '6/6' },
    { name: 'USA CLI (ALL PASS)', rate: 0.175, pulse: '6/6' },
    { name: 'Canada IVR', rate: 0.01, pulse: '6/6' },
    { name: 'Canada CLI (ALL Pass)', rate: 0.025, pulse: '60/60' },
    { name: 'Puerto Rico', rate: 0.02, pulse: '6/6' },
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
  
  // Calculator state
  const [calcRoute, setCalcRoute] = useState(voipRoutes[0].name);
  const [calcMins, setCalcMins] = useState('1000');

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
        description: 'Advanced predictive dialing suite for high-volume campaigns.',
        features: ['Predictive Dialer', 'Press One', 'Inbound Support']
    },
    {
      name: 'VOS3000',
      category: 'Switches',
      type: 'Softswitch',
      icon: <Globe className="w-6 h-6" />,
      accessPoints: [{ name: 'CDR Login', url: 'https://51.161.43.30:8443' }],
      description: 'Carrier-grade routing and billing for wholesale traffic.',
      features: ['Wholesale Billing', 'LCR Routing', 'Real-time Monitor']
    },
    {
      name: 'FusionPBX Server',
      category: 'Dialer & PBX',
      type: 'Multi-tenant',
      icon: <Server className="w-6 h-6" />,
      description: 'Multi-tenant PBX infrastructure based on FreeSWITCH.',
      features: ['Multi-tenant', 'Call Recording', 'Ring Groups']
    },
    {
      name: 'Bulk SMS Server',
      category: 'Messaging',
      type: 'SMS Gateway',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Messaging gateway with robust API and reseller tools.',
      features: ['Unlimited Resellers', 'Campaign Tool', 'API Integration']
    },
    {
      name: 'ASTPP',
      category: 'Billing',
      type: 'Class 4/5',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Open-source smart VoIP billing and management platform.',
      features: ['Calling Cards', 'DID Management', 'Auto Provisioning']
    },
    {
      name: 'Magnus Billing',
      category: 'Billing',
      type: 'Management',
      icon: <Database className="w-6 h-6" />,
      description: 'Full-featured billing solution for retail VoIP operations.',
      features: ['CDR Analysis', 'Rate Management', 'Agent Portal']
    },
    {
        name: 'Digital Marketing',
        category: 'Marketing',
        type: 'SEO & Growth',
        icon: <TrendingUp className="w-6 h-6" />,
        isSpecial: true,
        href: '/digital-media-marketing',
        description: 'Strategic online growth via SEO, SMM, and Google Ads.',
        features: ['SEO Audit', 'GMB SEO', 'SMM Campaigns']
    },
    {
        name: 'Reseller Program',
        category: 'Partner',
        type: 'Wholesale',
        icon: <Users className="w-6 h-6" />,
        isSpecial: true,
        href: '/reseller-program',
        description: 'Start your own white-label VoIP service with our panel.',
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

  const estimatedCost = useMemo(() => {
    const route = voipRoutes.find(r => r.name === calcRoute);
    const mins = parseFloat(calcMins) || 0;
    return route ? (route.rate * mins).toFixed(2) : '0.00';
  }, [calcRoute, calcMins]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-2xl text-primary-foreground shadow-lg shadow-primary/20 transition-all group-hover:rotate-6 group-hover:scale-105">
                <Server className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-headline tracking-tight leading-none">AMS Portal</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Enterprise Infrastructure</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
              <Button asChild variant="secondary" size="sm" className="hidden md:flex rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/10 font-bold transition-all hover:-translate-y-0.5">
                  <a href="https://88.99.103.106:8443" target="_blank" rel="noopener noreferrer">
                    <Database className="w-4 h-4 mr-2" />
                    Retail CDR Login
                  </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="hidden lg:flex rounded-xl font-bold hover:bg-muted">
                  <Link href="/server-status">
                    <Wifi className="w-4 h-4 mr-2 text-accent" />
                    Network Status
                  </Link>
              </Button>
              <Button onClick={() => setOrderDialogOpen(true)} size="sm" className="rounded-xl px-6 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all shimmer">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Provision
              </Button>
          </div>
        </div>
      </header>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
          <a href="http://t.me/AMSserver" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all">
              <MessageSquare className="w-6 h-6" />
          </a>
          <a href="https://wa.me/17633272191" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all">
              <MessageCircle className="w-6 h-6" />
          </a>
      </div>

      <main className="flex-grow">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40 hero-gradient border-b">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <Shield className="w-3.5 h-3.5" />
                    ISO 27001 Certified Infrastructure
                </div>
                <h1 className="text-5xl md:text-8xl font-black mb-8 font-headline tracking-tighter text-foreground leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    Deploy Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">Next-Gen VoIP</span>
                </h1>
                <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium opacity-80 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    Professional hosting for VOS3000, VICIBOX, and FusionPBX. 
                    Scalable, secure, and ready for high-concurrency traffic.
                </p>
                <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-2xl px-12 h-16 text-lg font-black shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setVoipDialogOpen(true)} className="rounded-2xl px-12 h-16 text-lg font-black bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 transition-all">
                        Wholesale Rates
                    </Button>
                </div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </section>

        <div className="container mx-auto px-4 -mt-16 mb-24 relative z-20">
          {/* Quick Feedback Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="glass-card rounded-3xl p-6 flex items-center justify-between group">
                <div className="flex items-center gap-5">
                    <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                        <Star className="w-7 h-7 fill-current" />
                    </div>
                    <div>
                        <h4 className="font-black text-lg">Partner Reviews</h4>
                        <p className="text-sm text-muted-foreground font-medium">Read global feedback</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" onClick={() => setReadCommentDialogOpen(true)} className="rounded-xl font-black px-5 border-2">Read</Button>
                    <Button variant="default" size="sm" onClick={() => setPostCommentDialogOpen(true)} className="rounded-xl font-black px-5 shadow-lg shadow-primary/20">Post</Button>
                </div>
            </Card>
            <Card className="glass-card rounded-3xl p-6 flex items-center justify-between group">
                <div className="flex items-center gap-5">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Headphones className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="font-black text-lg">NOC Support</h4>
                        <p className="text-sm text-muted-foreground font-medium">Expert assistance 24/7</p>
                    </div>
                </div>
                <Button variant="secondary" size="sm" asChild className="rounded-xl font-black px-6 bg-muted hover:bg-primary/10 hover:text-primary border-2 border-transparent transition-all">
                    <a href="https://wa.me/17633272191">Live NOC</a>
                </Button>
            </Card>
          </div>

          <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                  <div className="bg-primary p-2 rounded-xl text-primary-foreground">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-black font-headline tracking-tighter uppercase italic">Services</h3>
              </div>
              <Separator className="flex-grow mx-8 bg-muted-foreground/10" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servers.map((server, index) => (
              <Card key={index} className="group relative flex flex-col overflow-hidden transition-all duration-500 hover:shadow-3xl border-muted hover:border-primary/20 rounded-3xl bg-card/50 backdrop-blur-sm card-glow">
                <CardHeader className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-muted text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-sm">
                        {server.icon}
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-black bg-muted/50 border-primary/20 text-primary px-3 py-1">
                        {server.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black font-headline mb-3 tracking-tight">{server.name}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-muted-foreground/80 leading-relaxed">{server.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-8 pb-8 pt-0">
                    <div className="space-y-3 mb-8">
                        {server.features.map((f, i) => (
                            <div key={i} className="flex items-center text-xs font-bold text-foreground/70">
                                <CheckCircle className="w-4 h-4 mr-3 text-accent" />
                                {f}
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="px-8 py-6 bg-muted/20 border-t border-muted">
                  {server.isSpecial ? (
                       <Button asChild className="w-full rounded-2xl h-12 font-black shadow-xl hover:shadow-2xl transition-all group-hover:-translate-y-1">
                          <Link href={server.href!}>
                              View Details
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Link>
                      </Button>
                  ) : (
                      <div className="flex gap-3 w-full">
                          {server.accessPoints ? server.accessPoints.map((ap, i) => (
                              <Button key={i} asChild variant="outline" size="sm" className="flex-1 rounded-2xl font-black h-11 border-2 bg-background hover:bg-primary/5 transition-all">
                                  <a href={ap.url} target="_blank" rel="noopener noreferrer">
                                      {ap.name}
                                  </a>
                              </Button>
                          )) : (
                              <Button variant="ghost" size="sm" disabled className="w-full text-[11px] font-black uppercase opacity-40">
                                  Credentials Pending
                              </Button>
                          )}
                      </div>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10 shadow-inner rounded-3xl">
                <CardHeader className="p-8">
                    <div className="p-4 w-fit rounded-2xl bg-primary text-primary-foreground mb-6 shadow-xl shadow-primary/20">
                        <Zap className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-2xl font-black font-headline tracking-tight">Utility Hub</CardTitle>
                    <CardDescription className="text-sm font-semibold">Resources for operators</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8">
                    <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-4 tracking-widest flex items-center">
                            <Download className="w-3 h-3 mr-2" />
                            Softphone Downloads
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <Button size="sm" variant="outline" asChild className="h-11 rounded-2xl text-[11px] font-black bg-background/50 border-2">
                                <a href="https://www.portsip.com/downloads/pbx/v22/portsip-pbx-22.2.15.438.exe">PortSIP</a>
                            </Button>
                            <Button size="sm" variant="outline" asChild className="h-11 rounded-2xl text-[11px] font-black bg-background/50 border-2">
                                <a href="https://www.zoiper.com/en/voip-softphone/download/zoiper5/for/windows">Zoiper</a>
                            </Button>
                        </div>
                    </div>
                    <Separator className="bg-primary/10" />
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Connect with Us</p>
                        <Button variant="secondary" asChild className="h-12 rounded-2xl text-xs font-black bg-accent/10 hover:bg-accent/20 text-accent border-2 border-accent/20 transition-all">
                            <a href="https://wa.me/17633272191" className="flex items-center justify-center w-full">
                                <MessageCircle className="w-4 h-4 mr-3" /> WhatsApp
                            </a>
                        </Button>
                        <Button variant="secondary" asChild className="h-12 rounded-2xl text-xs font-black bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-2 border-blue-500/20 transition-all">
                            <a href="http://t.me/AMSserver" className="flex items-center justify-center w-full">
                                <MessageSquare className="w-4 h-4 mr-3" /> Telegram
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <Dialog open={isOrderDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setOrderDialogOpen(open); }}>
          <DialogContent className="sm:max-w-[480px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-3xl">
              {orderStep === 'form' ? (
                  <div className="p-10">
                      <DialogHeader className="mb-8">
                          <DialogTitle className="text-4xl font-black font-headline tracking-tighter uppercase italic text-primary">Deploy</DialogTitle>
                          <DialogDescription className="font-bold text-muted-foreground">Select your infrastructure specifications.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                          <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Service Module</Label>
                              <Select value={selectedServer} onValueChange={setSelectedServer}>
                                  <SelectTrigger className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/20"><SelectValue placeholder="Choose a service" /></SelectTrigger>
                                  <SelectContent className="rounded-2xl">{serverTypes.map(t => <SelectItem key={t} value={t} className="rounded-xl font-bold">{t}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          {selectedServer === 'FusionPBX' && (
                              <div className="space-y-3 animate-in slide-in-from-top-4 duration-500">
                                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Concurrency Tier</Label>
                                  <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                      <SelectTrigger className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/20"><SelectValue placeholder="Select capacity" /></SelectTrigger>
                                      <SelectContent className="rounded-2xl">{fusionPbxCapacities.map(c => <SelectItem key={c.value} value={c.value} className="rounded-xl font-bold">{c.label} — {c.price}</SelectItem>)}</SelectContent>
                                  </Select>
                              </div>
                          )}
                          <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Notes & Logic</Label>
                              <Textarea placeholder="Additional configuration details..." className="rounded-2xl bg-muted/40 border-2 border-transparent focus:border-primary/20 resize-none min-h-[120px] font-medium" value={requirements} onChange={e => setRequirements(e.target.value)} />
                          </div>
                          <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">System Validation</Label>
                              <div className="flex gap-3">
                                  <div className="flex-grow flex items-center justify-center bg-primary/10 border-2 border-primary/5 rounded-2xl h-14 font-code text-2xl tracking-[0.5em] font-black text-primary italic select-none line-through">{captchaText}</div>
                                  <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-2xl h-14 w-14 border-2 bg-muted/40"><RefreshCw className="w-6 h-6" /></Button>
                              </div>
                              <Input placeholder="Enter code" className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/20 font-black text-center text-lg" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                          </div>
                      </div>
                      <DialogFooter className="mt-10">
                          <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full rounded-[1.5rem] h-16 text-xl font-black shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02]">
                              {isSubmitting ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Zap className="w-6 h-6 mr-3" />}
                              Confirm Provisioning
                          </Button>
                      </DialogFooter>
                  </div>
              ) : (
                  <div className="text-center p-12 space-y-10 bg-gradient-to-b from-primary/5 to-background">
                      <div className="mx-auto w-28 h-28 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-pulse shadow-inner"><CheckCircle className="w-14 h-14" /></div>
                      <div>
                          <h3 className="text-4xl font-black font-headline mb-4 tracking-tighter">Verified</h3>
                          <p className="text-muted-foreground font-bold px-4">Your infrastructure request is logged. Redirecting to billing...</p>
                      </div>
                      <Button asChild size="lg" className="w-full rounded-[1.5rem] h-20 bg-accent hover:bg-accent/90 text-2xl font-black shadow-2xl shadow-accent/30 transition-all hover:scale-105">
                          <a href={`https://wa.me/17633272191?text=${getOrderDetails()}`} target="_blank" className="flex items-center justify-center">
                            <MessageCircle className="w-7 h-7 mr-4" /> Finalize on WhatsApp
                          </a>
                      </Button>
                      <Button variant="ghost" className="w-full text-[11px] font-black uppercase tracking-widest opacity-40 hover:opacity-100" onClick={() => setOrderDialogOpen(false)}>Return to Portal</Button>
                  </div>
              )}
          </DialogContent>
      </Dialog>

      <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
          <DialogContent className="max-w-2xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh] border-none shadow-3xl">
              <DialogHeader>
                  <DialogTitle className="text-4xl font-black font-headline tracking-tighter uppercase italic text-primary">Rate Deck</DialogTitle>
                  <DialogDescription className="font-bold">Real-time termination costs for global routes.</DialogDescription>
              </DialogHeader>
              
              <Card className="mt-8 bg-primary/5 border-2 border-primary/10 shadow-none rounded-3xl overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-base font-black flex items-center gap-3">
                          <Calculator className="w-5 h-5 text-primary" />
                          Cost Projection
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Destination</Label>
                              <Select value={calcRoute} onValueChange={setCalcRoute}>
                                  <SelectTrigger className="h-12 rounded-2xl bg-background border-2 border-primary/10 font-bold"><SelectValue /></SelectTrigger>
                                  <SelectContent className="rounded-2xl">{voipRoutes.map(r => <SelectItem key={r.name} value={r.name} className="rounded-xl font-bold">{r.name}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Monthly Mins</Label>
                              <Input type="number" value={calcMins} onChange={e => setCalcMins(e.target.value)} className="h-12 rounded-2xl bg-background border-2 border-primary/10 font-bold text-center" />
                          </div>
                      </div>
                      <div className="bg-primary p-5 rounded-2xl flex justify-between items-center shadow-xl shadow-primary/20">
                          <span className="text-sm font-black text-primary-foreground uppercase">Estimated Total:</span>
                          <span className="text-3xl font-black text-primary-foreground">${estimatedCost}</span>
                      </div>
                  </CardContent>
              </Card>

              <div className="border-2 border-muted rounded-3xl overflow-hidden mt-8 bg-card/30">
                  <Table>
                      <TableHeader className="bg-muted">
                          <TableRow className="hover:bg-transparent border-none">
                              <TableHead className="font-black text-primary uppercase text-[11px] tracking-widest px-6 h-14">Destination</TableHead>
                              <TableHead className="font-black text-primary uppercase text-[11px] tracking-widest text-center h-14">Rate ($)</TableHead>
                              <TableHead className="font-black text-primary uppercase text-[11px] tracking-widest text-right px-6 h-14">Pulse</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {voipRoutes.map(r => (
                              <TableRow key={r.name} className="hover:bg-primary/5 border-muted transition-colors">
                                  <TableCell className="font-black text-sm px-6">{r.name}</TableCell>
                                  <TableCell className="text-center font-code text-accent font-black text-lg">{r.rate.toFixed(3)}</TableCell>
                                  <TableCell className="text-right text-muted-foreground text-xs font-black px-6">{r.pulse}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
              <div className="flex items-center justify-center gap-3 mt-8 p-5 rounded-2xl bg-amber-500/5 text-amber-600 border-2 border-amber-500/10">
                <Info className="w-5 h-5 flex-shrink-0" />
                <p className="text-[11px] font-black uppercase tracking-widest leading-relaxed">Global rates fluctuate based on carrier load and LCR dynamics.</p>
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isReadCommentDialogOpen} onOpenChange={setReadCommentDialogOpen}>
          <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-10 border-none shadow-3xl">
              <DialogHeader className="mb-8"><DialogTitle className="text-4xl font-black font-headline tracking-tighter uppercase italic text-primary">Testimonials</DialogTitle></DialogHeader>
              <div className="space-y-6">
                  {[
                      { text: "Migration was flawless. Latency dropped by 40% immediately upon moving our VOS3000 instances.", user: "carrier_pro_intl" },
                      { text: "The FusionPBX clustering capability here is unmatched. Zero downtime during our 500-channel peak.", user: "voip_ops_head" },
                      { text: "Accurate billing and top-tier security. Our clients notice the difference in audio quality.", user: "retail_networks" }
                  ].map((review, i) => (
                    <Card key={i} className="bg-muted/40 border-none shadow-none rounded-[1.5rem] group hover:bg-primary/5 transition-all">
                        <CardContent className="p-8">
                            <p className="text-base italic font-bold text-foreground/80 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center justify-between mt-6">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[9px] font-black tracking-widest uppercase px-3">Verified User</Badge>
                                <span className="text-xs font-black text-primary/60">— @{review.user}</span>
                            </div>
                        </CardContent>
                    </Card>
                  ))}
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isPostCommentDialogOpen} onOpenChange={setPostCommentDialogOpen}>
          <DialogContent className="sm:max-w-md rounded-[2.5rem] p-10 border-none shadow-3xl">
              <DialogHeader className="mb-8"><DialogTitle className="text-3xl font-black font-headline tracking-tighter uppercase italic text-primary">Feedback</DialogTitle></DialogHeader>
              <div className="space-y-8">
                  <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Performance Review</Label>
                      <Textarea placeholder="How is our network performing for your use case?" value={newComment} onChange={e => setNewComment(e.target.value)} rows={5} className="rounded-2xl bg-muted/40 border-2 border-transparent focus:border-primary/20 resize-none font-bold" />
                  </div>
                  <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Verification</Label>
                      <div className="flex gap-3">
                          <div className="flex-grow flex items-center justify-center bg-primary/10 rounded-2xl font-code text-2xl font-black text-primary/60 line-through h-14">{captchaText}</div>
                          <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-2xl h-14 w-14 border-2 bg-muted/40"><RefreshCw className="w-6 h-6" /></Button>
                      </div>
                      <Input placeholder="Enter code" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/20 text-center font-black text-lg" />
                  </div>
              </div>
              <DialogFooter className="mt-10">
                <Button onClick={async () => {
                    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) { toast({ title: 'Invalid CAPTCHA', variant: 'destructive' }); return; }
                    setSubmitting(true); await new Promise(r => setTimeout(r, 1000)); setSubmitting(false);
                    toast({ title: 'Feedback Recorded', description: 'Your insight helps us maintain infrastructure excellence.' });
                    setPostCommentDialogOpen(false); setNewComment(''); setCaptchaInput('');
                }} disabled={isSubmitting} className="w-full rounded-[1.5rem] h-16 font-black shadow-2xl shadow-primary/30 text-lg transition-all hover:scale-[1.02]">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Experience'}
                </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-32 border-t bg-muted/30">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-16 text-muted-foreground/30">
                    <div className="flex flex-col items-center gap-4 group">
                        <Shield className="w-10 h-10 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Encrypted</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 group">
                        <Globe className="w-10 h-10 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Multi-Region</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 group">
                        <Cpu className="w-10 h-10 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">HPC Ready</span>
                    </div>
                </div>
                <Separator className="max-w-md mx-auto mb-12 opacity-10" />
                <p className="text-base font-bold text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12">
                    AMS Portal: High-availability telecommunications infrastructure for 
                    next-generation carriers and enterprise dialer environments.
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                    <Link href="/server-status" className="text-xs font-black text-primary hover:text-accent transition-colors uppercase tracking-widest">System Health</Link>
                    <a href="https://wa.me/17633272191" className="text-xs font-black text-primary hover:text-accent transition-colors uppercase tracking-widest">Infrastructure SLA</a>
                    <a href="https://wa.me/17633272191" className="text-xs font-black text-primary hover:text-accent transition-colors uppercase tracking-widest">Compliance</a>
                </div>
                <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-[0.4em] mt-20">
                    &copy; {new Date().getFullYear()} AMS Server Management Group. Global Operations.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
