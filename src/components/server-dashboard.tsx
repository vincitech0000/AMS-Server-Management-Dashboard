
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Server, Phone, Database, MessageSquare, ArrowUpRight, 
    ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, 
    MessageCircle, Download, Users, AppWindow, Route, TrendingUp,
    Shield, Zap, Globe, Cpu, LayoutGrid, Info, Star, Headphones,
    Wifi, Calculator, Activity, Clock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
import placeholderImages from '@/app/lib/placeholder-images.json';

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
        logo: placeholderImages.viciboxLogo,
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
      logo: placeholderImages.vos3000Logo,
      accessPoints: [{ name: 'CDR Login', url: 'http://88.99.103.106:4886' }],
      description: 'Carrier-grade routing and billing for wholesale traffic.',
      features: ['Wholesale Billing', 'LCR Routing', 'Real-time Monitor']
    },
    {
      name: 'FusionPBX Server',
      category: 'Dialer & PBX',
      type: 'Multi-tenant',
      icon: <Server className="w-6 h-6" />,
      logo: placeholderImages.fusionpbxLogo,
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
      logo: placeholderImages.astppLogo,
      description: 'Open-source smart VoIP billing and management platform.',
      features: ['Calling Cards', 'DID Management', 'Auto Provisioning']
    },
    {
      name: 'Magnus Billing',
      category: 'Billing',
      type: 'Management',
      icon: <Database className="w-6 h-6" />,
      logo: placeholderImages.magnusLogo,
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
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-2xl">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="bg-primary p-2.5 rounded-xl text-primary-foreground shadow-xl shadow-primary/20 transition-all group-hover:rotate-6 group-hover:scale-110">
                <Server className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black font-headline tracking-tighter leading-none">AMS Portal</span>
              <span className="hidden sm:inline-block text-[8px] text-muted-foreground uppercase tracking-[0.2em] font-black mt-1 opacity-60">Global Cloud</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 md:gap-4 shrink-0 overflow-x-auto no-scrollbar py-2">
              <Button asChild variant="secondary" size="sm" className="hidden sm:flex rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 font-black h-10 px-4 transition-all">
                  <a href="https://88.99.103.106:8443" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Database className="w-3.5 h-3.5 mr-2" />
                    <span className="text-[10px] md:text-xs">Retail CDR</span>
                  </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="hidden lg:flex rounded-xl font-black h-10 px-4 hover:bg-muted/50 transition-all">
                  <Link href="/server-status" className="flex items-center">
                    <Wifi className="w-3.5 h-3.5 mr-2 text-accent animate-pulse" />
                    <span className="text-[10px] md:text-xs">Status</span>
                  </Link>
              </Button>
              <Button onClick={() => setOrderDialogOpen(true)} size="sm" className="rounded-xl h-10 px-6 md:px-8 font-black shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all active:scale-95 bg-primary text-primary-foreground shimmer">
                <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                <span className="text-xs md:text-sm">Provision</span>
              </Button>
          </div>
        </div>
      </header>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4">
          <a href="http://t.me/AMSserver" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all active:scale-90 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
          </a>
          <a href="https://wa.me/17633272191" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all active:scale-90 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
          </a>
      </div>

      <main className="flex-grow">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40 hero-gradient border-b">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <Shield className="w-3.5 h-3.5" />
                    Enterprise Tier-4 Datacenters
                </div>
                <h1 className="text-5xl md:text-8xl font-black mb-8 font-headline tracking-tighter text-foreground leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    Infrastructure <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">Beyond Limits.</span>
                </h1>
                <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-tight font-bold opacity-70 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Carrier-grade hosting for VOS3000, VICIBOX, and FusionPBX. 
                    Built for extreme concurrency and zero-latency routing.
                </p>
                <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-2xl px-10 h-16 text-lg font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all bg-primary text-primary-foreground shimmer">
                        Launch Instance
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setVoipDialogOpen(true)} className="rounded-2xl px-10 h-16 text-lg font-black bg-background/50 backdrop-blur-xl border-2 hover:bg-background/80 transition-all hover:border-primary/40 active:scale-95">
                        Global Rate Deck
                    </Button>
                </div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 animate-pulse delay-700" />
        </section>

        <div className="container mx-auto px-4 -mt-16 mb-24 relative z-20">
          {/* Dashboard Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Activity className="w-5 h-5" />
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-none font-black text-[9px]">REAL-TIME</Badge>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Global Uptime</h4>
                <div className="text-3xl font-black font-headline">99.99<span className="text-primary">%</span></div>
            </div>
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-accent/10 p-2.5 rounded-xl text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                        <Server className="w-5 h-5" />
                    </div>
                    <Badge className="bg-accent/10 text-accent font-black text-[9px]">ACTIVE</Badge>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Instances</h4>
                <div className="text-3xl font-black font-headline">20<span className="text-accent">+</span></div>
            </div>
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Clock className="w-5 h-5" />
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-500 font-black text-[9px]">AVG SPEED</Badge>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Support Response</h4>
                <div className="text-3xl font-black font-headline">12<span className="text-blue-500">m</span></div>
            </div>
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <Zap className="w-5 h-5" />
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-500 font-black text-[9px]">SLA</Badge>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Reliability Tier</h4>
                <div className="text-3xl font-black font-headline">Tier 4</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="glass-card rounded-[2rem] p-6 flex items-center justify-between group hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                        <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                        <h4 className="font-black text-xl tracking-tight">Partner Reviews</h4>
                        <p className="text-[10px] text-muted-foreground font-bold opacity-60">Feedback from operators</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setReadCommentDialogOpen(true)} className="rounded-xl font-black h-10 px-6 border-2 transition-all active:scale-95">Read</Button>
                    <Button variant="default" size="sm" onClick={() => setPostCommentDialogOpen(true)} className="rounded-xl font-black h-10 px-6 shadow-xl shadow-primary/10 transition-all active:scale-95">Post</Button>
                </div>
            </Card>
            <Card className="glass-card rounded-[2rem] p-6 flex items-center justify-between group hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        <Headphones className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-black text-xl tracking-tight">24/7 Support</h4>
                        <p className="text-[10px] text-muted-foreground font-bold opacity-60">Direct line to NOC</p>
                    </div>
                </div>
                <Button variant="secondary" size="sm" asChild className="rounded-xl h-10 px-8 font-black bg-muted/50 hover:bg-primary/10 hover:text-primary border-2 border-transparent transition-all active:scale-95">
                    <a href="https://wa.me/17633272191">Live NOC</a>
                </Button>
            </Card>
          </div>

          <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                  <div className="bg-primary p-2.5 rounded-xl text-primary-foreground shadow-lg">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-black font-headline tracking-tighter uppercase italic text-foreground">Stack</h3>
              </div>
              <Separator className="flex-grow mx-6 bg-primary/10" />
              <Badge variant="outline" className="rounded-full border-2 px-4 py-1.5 font-black uppercase tracking-widest text-[9px]">Modules</Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servers.map((server, index) => (
              <Card key={index} className="group relative flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl border-muted/50 hover:border-primary/30 rounded-[2rem] bg-card/60 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-10" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    {server.logo ? (
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Image 
                          src={server.logo.src} 
                          alt={server.logo.alt} 
                          width={server.logo.width} 
                          height={server.logo.height}
                          className="object-cover"
                          data-ai-hint={server.logo.hint}
                        />
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-muted/50 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-sm">
                          {server.icon}
                      </div>
                    )}
                    <Badge variant="outline" className="text-[9px] uppercase tracking-[0.15em] font-black bg-primary/5 border-primary/20 text-primary px-3 py-1 rounded-full">
                        {server.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black font-headline mb-2 tracking-tighter group-hover:text-primary transition-colors">{server.name}</CardTitle>
                  <CardDescription className="text-xs font-bold text-muted-foreground/70 leading-relaxed min-h-[2.5rem]">{server.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-8 pb-8 pt-0">
                    <div className="space-y-3 mb-6">
                        {server.features.map((f, i) => (
                            <div key={i} className="flex items-center text-[11px] font-black text-foreground/60 group-hover:text-foreground transition-colors">
                                <CheckCircle className="w-3.5 h-3.5 mr-3 text-accent" />
                                {f}
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="px-8 py-6 bg-muted/20 border-t border-muted/50">
                  {server.isSpecial ? (
                       <Button asChild className="w-full rounded-2xl h-12 font-black shadow-lg hover:shadow-primary/20 transition-all group-hover:-translate-y-1 active:scale-95 bg-primary text-primary-foreground">
                          <Link href={server.href!}>
                              Manage
                              <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                          </Link>
                      </Button>
                  ) : (
                      <div className="flex gap-3 w-full">
                          {server.accessPoints ? server.accessPoints.map((ap, i) => (
                              <Button key={i} asChild variant="outline" size="sm" className="flex-1 rounded-xl font-black h-12 border-2 bg-background hover:bg-primary/10 transition-all active:scale-95">
                                  <a href={ap.url} target="_blank" rel="noopener noreferrer">
                                      {ap.name}
                                  </a>
                              </Button>
                          )) : (
                              <Button variant="ghost" size="sm" disabled className="w-full text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                                  Provisioning...
                              </Button>
                          )}
                      </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <Dialog open={isOrderDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setOrderDialogOpen(open); }}>
          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-3xl bg-white/95 backdrop-blur-3xl">
              {orderStep === 'form' ? (
                  <div className="p-8 md:p-10">
                      <DialogHeader className="mb-8">
                          <DialogTitle className="text-4xl font-black font-headline tracking-tighter uppercase italic text-primary">Deploy</DialogTitle>
                          <DialogDescription className="font-bold text-muted-foreground mt-1">Scale infrastructure on-demand.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                          <div className="space-y-3">
                              <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] opacity-60 ml-1">Infrastructure Module</Label>
                              <Select value={selectedServer} onValueChange={setSelectedServer}>
                                  <SelectTrigger className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/30 font-bold transition-all"><SelectValue placeholder="Select Module" /></SelectTrigger>
                                  <SelectContent className="rounded-xl border-none shadow-3xl">{serverTypes.map(t => <SelectItem key={t} value={t} className="rounded-lg font-bold p-2.5">{t}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          {selectedServer === 'FusionPBX' && (
                              <div className="space-y-3 animate-in slide-in-from-top-4 duration-500">
                                  <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] opacity-60 ml-1">Concurrency Package</Label>
                                  <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                      <SelectTrigger className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/30 font-bold transition-all"><SelectValue placeholder="Capacity Limit" /></SelectTrigger>
                                      <SelectContent className="rounded-xl border-none shadow-3xl">{fusionPbxCapacities.map(c => <SelectItem key={c.value} value={c.value} className="rounded-lg font-bold p-2.5">{c.label} — {c.price}</SelectItem>)}</SelectContent>
                                  </Select>
                              </div>
                          )}
                          <div className="space-y-3">
                              <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] opacity-60 ml-1">Human Validation</Label>
                              <div className="flex gap-3">
                                  <div className="flex-grow flex items-center justify-center bg-primary/10 border-2 border-primary/10 rounded-2xl h-14 font-code text-2xl tracking-[0.5em] font-black text-primary italic select-none line-through opacity-80">{captchaText}</div>
                                  <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-2xl h-14 w-14 border-2 bg-muted/40 hover:bg-muted transition-all"><RefreshCw className="w-5 h-5" /></Button>
                              </div>
                              <Input placeholder="Enter Security Code" className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/30 font-black text-center text-lg transition-all" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                          </div>
                      </div>
                      <DialogFooter className="mt-10">
                          <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full rounded-[1.5rem] h-16 text-xl font-black shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 bg-primary text-primary-foreground">
                              {isSubmitting ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Zap className="w-6 h-6 mr-3" />}
                              Confirm Deployment
                          </Button>
                      </DialogFooter>
                  </div>
              ) : (
                  <div className="text-center p-12 space-y-10 bg-gradient-to-b from-primary/10 to-background">
                      <div className="mx-auto w-28 h-28 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-pulse shadow-inner border-4 border-accent/10"><CheckCircle className="w-12 h-12" /></div>
                      <div>
                          <h3 className="text-4xl font-black font-headline mb-4 tracking-tighter">Request Logged</h3>
                          <p className="text-muted-foreground font-bold px-4 leading-relaxed opacity-80">Verified. Connecting to specialist via WhatsApp.</p>
                      </div>
                      <Button asChild size="lg" className="w-full rounded-[1.5rem] h-20 bg-accent hover:bg-accent/90 text-2xl font-black shadow-xl shadow-accent/30 transition-all hover:scale-105 active:scale-95">
                          <a href={`https://wa.me/17633272191?text=${getOrderDetails()}`} target="_blank" className="flex items-center justify-center">
                            <MessageCircle className="w-7 h-7 mr-4" /> Finalize Transaction
                          </a>
                      </Button>
                      <Button variant="ghost" className="w-full text-[9px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all" onClick={() => setOrderDialogOpen(false)}>Return to Control Panel</Button>
                  </div>
              )}
          </DialogContent>
      </Dialog>

      <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
          <DialogContent className="max-w-3xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh] border-none shadow-3xl bg-white/95 backdrop-blur-3xl">
              <DialogHeader>
                  <DialogTitle className="text-4xl font-black font-headline tracking-tighter uppercase italic text-primary">Global Rates</DialogTitle>
                  <DialogDescription className="font-bold text-muted-foreground mt-1">Wholesale termination deck.</DialogDescription>
              </DialogHeader>
              
              <Card className="mt-8 bg-primary/5 border-2 border-primary/10 shadow-none rounded-3xl overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-sm font-black flex items-center gap-3">
                          <Calculator className="w-5 h-5 text-primary" />
                          Cost Projection
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <Label className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.3em] opacity-60 ml-1">Route</Label>
                              <Select value={calcRoute} onValueChange={setCalcRoute}>
                                  <SelectTrigger className="h-12 rounded-xl bg-background border-2 border-primary/10 font-black"><SelectValue /></SelectTrigger>
                                  <SelectContent className="rounded-xl border-none shadow-3xl">{voipRoutes.map(r => <SelectItem key={r.name} value={r.name} className="rounded-lg font-bold p-2.5">{r.name}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          <div className="space-y-2">
                              <Label className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.3em] opacity-60 ml-1">Monthly Mins</Label>
                              <Input type="number" value={calcMins} onChange={e => setCalcMins(e.target.value)} className="h-12 rounded-xl bg-background border-2 border-primary/10 font-black text-center text-lg" />
                          </div>
                      </div>
                      <div className="bg-primary p-6 rounded-2xl flex justify-between items-center shadow-lg shadow-primary/20">
                          <span className="text-[10px] font-black text-primary-foreground uppercase tracking-widest">Est. Cost:</span>
                          <span className="text-3xl font-black text-primary-foreground tracking-tighter">${estimatedCost}</span>
                      </div>
                  </CardContent>
              </Card>

              <div className="border-2 border-muted rounded-3xl overflow-hidden mt-8 bg-card/30 backdrop-blur-xl">
                  <Table>
                      <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent border-none">
                              <TableHead className="font-black text-primary uppercase text-[10px] tracking-[0.3em] px-6 h-12">Route</TableHead>
                              <TableHead className="font-black text-primary uppercase text-[10px] tracking-[0.3em] text-center h-12">Rate</TableHead>
                              <TableHead className="font-black text-primary uppercase text-[10px] tracking-[0.3em] text-right px-6 h-12">Pulse</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {voipRoutes.map(r => (
                              <TableRow key={r.name} className="hover:bg-primary/5 border-muted transition-colors">
                                  <TableCell className="font-black text-sm px-6 py-4">{r.name}</TableCell>
                                  <TableCell className="text-center font-code text-accent font-black text-lg">{r.rate.toFixed(3)}</TableCell>
                                  <TableCell className="text-right text-muted-foreground text-[10px] font-black px-6 uppercase tracking-widest">{r.pulse}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isReadCommentDialogOpen} onOpenChange={setReadCommentDialogOpen}>
          <DialogContent className="sm:max-w-xl rounded-[2.5rem] p-10 border-none shadow-3xl bg-white/95 backdrop-blur-3xl overflow-y-auto max-h-[80vh]">
              <DialogHeader className="mb-8"><DialogTitle className="text-4xl font-black font-headline tracking-tighter uppercase italic text-primary">Reviews</DialogTitle></DialogHeader>
              <div className="space-y-6">
                  {[
                      { text: "Migration was flawless. Latency dropped immediately.", user: "carrier_pro" },
                      { text: "Zero downtime during our 500-channel peak.", user: "voip_ops" },
                      { text: "Accurate billing and top-tier security.", user: "retail_net" }
                  ].map((review, i) => (
                    <Card key={i} className="bg-muted/30 border-none shadow-none rounded-2xl animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 150}ms` }}>
                        <CardContent className="p-8">
                            <p className="text-base italic font-bold text-foreground/80 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center justify-between mt-6">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full">Verified</Badge>
                                <span className="text-xs font-black text-primary/60 tracking-tight">@{review.user}</span>
                            </div>
                        </CardContent>
                    </Card>
                  ))}
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isPostCommentDialogOpen} onOpenChange={setPostCommentDialogOpen}>
          <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-10 border-none shadow-3xl bg-white/95 backdrop-blur-3xl">
              <DialogHeader className="mb-8"><DialogTitle className="text-3xl font-black font-headline tracking-tighter uppercase italic text-primary">Insight</DialogTitle></DialogHeader>
              <div className="space-y-6">
                  <div className="space-y-3">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] opacity-60 ml-1">Feedback</Label>
                      <Textarea placeholder="Experience with our network..." value={newComment} onChange={e => setNewComment(e.target.value)} rows={4} className="rounded-2xl bg-muted/40 border-2 border-transparent focus:border-primary/30 font-bold p-6 transition-all" />
                  </div>
                  <div className="space-y-3">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] opacity-60 ml-1">Validation</Label>
                      <div className="flex gap-3">
                          <div className="flex-grow flex items-center justify-center bg-primary/10 rounded-2xl font-code text-2xl font-black text-primary/60 line-through h-14 opacity-80">{captchaText}</div>
                          <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-2xl h-14 w-14 border-2 bg-muted/40 hover:bg-muted transition-all"><RefreshCw className="w-5 h-5" /></Button>
                      </div>
                      <Input placeholder="Enter Sequence" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} className="rounded-2xl h-14 bg-muted/40 border-2 border-transparent focus:border-primary/30 text-center font-black text-lg transition-all" />
                  </div>
              </div>
              <DialogFooter className="mt-8">
                <Button onClick={async () => {
                    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) { toast({ title: 'Invalid Security Code', variant: 'destructive' }); return; }
                    setSubmitting(true); await new Promise(r => setTimeout(r, 1000)); setSubmitting(false);
                    toast({ title: 'Experience Recorded', description: 'Feedback influences our roadmap.' });
                    setPostCommentDialogOpen(false); setNewComment(''); setCaptchaInput('');
                }} disabled={isSubmitting} className="w-full rounded-2xl h-16 font-black shadow-xl shadow-primary/30 text-xl transition-all hover:scale-[1.02] active:scale-95 bg-primary text-primary-foreground">
                    Broadcast Feedback
                </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-20 border-t bg-muted/10">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-wrap justify-center gap-12 mb-12 text-muted-foreground/30">
                    <Shield className="w-10 h-10" />
                    <Globe className="w-10 h-10" />
                    <Cpu className="w-10 h-10" />
                </div>
                <p className="text-sm font-bold text-muted-foreground max-w-xl mx-auto leading-tight mb-8 opacity-60">
                    AMS Portal: Specialized high-performance telecommunications 
                    infrastructure.
                </p>
                <p className="text-[9px] text-muted-foreground/30 font-black uppercase tracking-[0.4em]">
                    &copy; {new Date().getFullYear()} AMS Server Management Group.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
