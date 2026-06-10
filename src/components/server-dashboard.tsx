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
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-2xl">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-2xl shadow-primary/30 transition-all group-hover:rotate-12 group-hover:scale-110">
                <Server className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-headline tracking-tighter leading-none">AMS Portal</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black mt-1.5 opacity-60">Global Cloud Infrastructure</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
              <Button asChild variant="secondary" size="sm" className="hidden md:flex rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 font-black h-11 px-6 transition-all hover:-translate-y-1">
                  <a href="https://88.99.103.106:8443" target="_blank" rel="noopener noreferrer">
                    <Database className="w-4 h-4 mr-2.5" />
                    Retail CDR Login
                  </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="hidden lg:flex rounded-2xl font-black h-11 px-6 hover:bg-muted/50 transition-all">
                  <Link href="/server-status">
                    <Wifi className="w-4 h-4 mr-2.5 text-accent animate-pulse" />
                    System Status
                  </Link>
              </Button>
              <Button onClick={() => setOrderDialogOpen(true)} size="sm" className="rounded-2xl h-11 px-8 font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all shimmer active:scale-95">
                <ShoppingCart className="w-4 h-4 mr-2.5" />
                Provision
              </Button>
          </div>
        </div>
      </header>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-5">
          <a href="http://t.me/AMSserver" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white p-5 rounded-[1.5rem] shadow-3xl hover:scale-110 hover:-translate-y-2 transition-all active:scale-90 flex items-center justify-center">
              <MessageSquare className="w-7 h-7" />
          </a>
          <a href="https://wa.me/17633272191" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-5 rounded-[1.5rem] shadow-3xl hover:scale-110 hover:-translate-y-2 transition-all active:scale-90 flex items-center justify-center">
              <MessageCircle className="w-7 h-7" />
          </a>
      </div>

      <main className="flex-grow">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-40 md:pb-52 hero-gradient border-b">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-widest mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <Shield className="w-4 h-4" />
                    Enterprise Tier-4 Datacenters
                </div>
                <h1 className="text-6xl md:text-9xl font-black mb-10 font-headline tracking-tighter text-foreground leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    Infrastructure <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">Beyond Limits.</span>
                </h1>
                <p className="text-xl md:text-3xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-tight font-bold opacity-70 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Carrier-grade hosting for VOS3000, VICIBOX, and FusionPBX. 
                    Built for extreme concurrency and zero-latency routing.
                </p>
                <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-3xl px-14 h-20 text-xl font-black shadow-3xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
                        Launch Instance
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setVoipDialogOpen(true)} className="rounded-3xl px-14 h-20 text-xl font-black bg-background/50 backdrop-blur-xl border-4 hover:bg-background/80 transition-all hover:border-primary/40 active:scale-95">
                        Global Rate Deck
                    </Button>
                </div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse delay-700" />
        </section>

        <div className="container mx-auto px-4 -mt-24 mb-32 relative z-20">
          {/* Dashboard Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-primary/10 p-3.5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Activity className="w-6 h-6" />
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-none font-black text-[10px]">REAL-TIME</Badge>
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Global Uptime</h4>
                <div className="text-4xl font-black font-headline">99.99<span className="text-primary">%</span></div>
            </div>
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-accent/10 p-3.5 rounded-2xl text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                        <Server className="w-6 h-6" />
                    </div>
                    <Badge className="bg-accent/10 text-accent font-black text-[10px]">ACTIVE</Badge>
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Total Instances</h4>
                <div className="text-4xl font-black font-headline">20<span className="text-accent">+</span></div>
            </div>
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-blue-500/10 p-3.5 rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Clock className="w-6 h-6" />
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-500 font-black text-[10px]">AVG SPEED</Badge>
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Support Response</h4>
                <div className="text-4xl font-black font-headline">12<span className="text-blue-500">m</span></div>
            </div>
            <div className="stats-card group">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-amber-500/10 p-3.5 rounded-2xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <Zap className="w-6 h-6" />
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-500 font-black text-[10px]">SLA</Badge>
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Reliability Tier</h4>
                <div className="text-4xl font-black font-headline">Tier 4</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="glass-card rounded-[2.5rem] p-8 flex items-center justify-between group hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-6">
                    <div className="bg-accent/10 p-5 rounded-[1.5rem] text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                        <Star className="w-8 h-8 fill-current" />
                    </div>
                    <div>
                        <h4 className="font-black text-2xl tracking-tight">Partner Reviews</h4>
                        <p className="text-sm text-muted-foreground font-bold opacity-60">Feedback from global operators</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="sm" onClick={() => setReadCommentDialogOpen(true)} className="rounded-2xl font-black h-12 px-8 border-4 transition-all active:scale-95">Read</Button>
                    <Button variant="default" size="sm" onClick={() => setPostCommentDialogOpen(true)} className="rounded-2xl font-black h-12 px-8 shadow-2xl shadow-primary/20 transition-all active:scale-95">Post</Button>
                </div>
            </Card>
            <Card className="glass-card rounded-[2.5rem] p-8 flex items-center justify-between group hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-6">
                    <div className="bg-primary/10 p-5 rounded-[1.5rem] text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        <Headphones className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="font-black text-2xl tracking-tight">24/7 Support</h4>
                        <p className="text-sm text-muted-foreground font-bold opacity-60">Direct line to NOC engineers</p>
                    </div>
                </div>
                <Button variant="secondary" size="sm" asChild className="rounded-2xl h-12 px-10 font-black bg-muted/50 hover:bg-primary/10 hover:text-primary border-4 border-transparent transition-all active:scale-95">
                    <a href="https://wa.me/17633272191">Live NOC</a>
                </Button>
            </Card>
          </div>

          <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-5">
                  <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-xl">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <h3 className="text-4xl font-black font-headline tracking-tighter uppercase italic text-foreground">Infrastructure Stack</h3>
              </div>
              <Separator className="flex-grow mx-10 bg-primary/10" />
              <Badge variant="outline" className="rounded-full border-2 px-6 py-2 font-black uppercase tracking-widest text-[10px]">Cloud Modules</Badge>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servers.map((server, index) => (
              <Card key={index} className="group relative flex flex-col overflow-hidden transition-all duration-700 hover:shadow-3xl border-muted/50 hover:border-primary/30 rounded-[2.5rem] bg-card/60 backdrop-blur-xl card-glow animate-in fade-in slide-in-from-bottom-10" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-5 rounded-[1.5rem] bg-muted/50 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                        {server.icon}
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-[0.2em] font-black bg-primary/5 border-primary/20 text-primary px-4 py-1.5 rounded-full">
                        {server.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-black font-headline mb-4 tracking-tighter group-hover:text-primary transition-colors">{server.name}</CardTitle>
                  <CardDescription className="text-sm font-bold text-muted-foreground/70 leading-relaxed min-h-[3rem]">{server.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-10 pb-10 pt-0">
                    <div className="space-y-4 mb-10">
                        {server.features.map((f, i) => (
                            <div key={i} className="flex items-center text-xs font-black text-foreground/60 group-hover:text-foreground transition-colors">
                                <CheckCircle className="w-4 h-4 mr-4 text-accent" />
                                {f}
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="px-10 py-8 bg-muted/20 border-t border-muted/50">
                  {server.isSpecial ? (
                       <Button asChild className="w-full rounded-[1.25rem] h-14 font-black shadow-2xl hover:shadow-primary/30 transition-all group-hover:-translate-y-2 active:scale-95">
                          <Link href={server.href!}>
                              Manage Assets
                              <ArrowUpRight className="w-4 h-4 ml-3" />
                          </Link>
                      </Button>
                  ) : (
                      <div className="flex gap-4 w-full">
                          {server.accessPoints ? server.accessPoints.map((ap, i) => (
                              <Button key={i} asChild variant="outline" size="sm" className="flex-1 rounded-[1.25rem] font-black h-14 border-4 bg-background hover:bg-primary/10 transition-all active:scale-95">
                                  <a href={ap.url} target="_blank" rel="noopener noreferrer">
                                      {ap.name}
                                  </a>
                              </Button>
                          )) : (
                              <Button variant="ghost" size="sm" disabled className="w-full text-[11px] font-black uppercase tracking-[0.3em] opacity-30">
                                  Provisioning...
                              </Button>
                          )}
                      </div>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-inner rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-10" style={{ animationDelay: '800ms' }}>
                <CardHeader className="p-10">
                    <div className="p-5 w-fit rounded-[1.5rem] bg-primary text-primary-foreground mb-8 shadow-3xl shadow-primary/40">
                        <Zap className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-3xl font-black font-headline tracking-tighter">Tools Hub</CardTitle>
                    <CardDescription className="text-sm font-bold text-muted-foreground/80">Infrastructure maintenance</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-10">
                    <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-5 tracking-[0.4em] flex items-center opacity-60">
                            <Download className="w-3.5 h-3.5 mr-3" />
                            Softphone Assets
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <Button size="sm" variant="outline" asChild className="h-14 rounded-[1.25rem] text-[11px] font-black bg-background/50 border-4 hover:border-primary/40 active:scale-95 transition-all">
                                <a href="https://www.portsip.com/downloads/pbx/v22/portsip-pbx-22.2.15.438.exe">PortSIP</a>
                            </Button>
                            <Button size="sm" variant="outline" asChild className="h-14 rounded-[1.25rem] text-[11px] font-black bg-background/50 border-4 hover:border-primary/40 active:scale-95 transition-all">
                                <a href="https://www.zoiper.com/en/voip-softphone/download/zoiper5/for/windows">Zoiper</a>
                            </Button>
                        </div>
                    </div>
                    <Separator className="bg-primary/20" />
                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] opacity-60">Help Center</p>
                        <Button variant="secondary" asChild className="h-14 rounded-[1.25rem] text-xs font-black bg-accent/10 hover:bg-accent/20 text-accent border-4 border-accent/20 transition-all active:scale-95">
                            <a href="https://wa.me/17633272191" className="flex items-center justify-center w-full">
                                <MessageCircle className="w-5 h-5 mr-4" /> WhatsApp Support
                            </a>
                        </Button>
                        <Button variant="secondary" asChild className="h-14 rounded-[1.25rem] text-xs font-black bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-4 border-blue-500/20 transition-all active:scale-95">
                            <a href="http://t.me/AMSserver" className="flex items-center justify-center w-full">
                                <MessageSquare className="w-5 h-5 mr-4" /> Telegram News
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
          <DialogContent className="sm:max-w-[540px] rounded-[3.5rem] p-0 overflow-hidden border-none shadow-3xl bg-white/95 backdrop-blur-3xl">
              {orderStep === 'form' ? (
                  <div className="p-12">
                      <DialogHeader className="mb-10">
                          <DialogTitle className="text-5xl font-black font-headline tracking-tighter uppercase italic text-primary">Deploy</DialogTitle>
                          <DialogDescription className="font-bold text-muted-foreground mt-2">Scale your infrastructure on-demand.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-8">
                          <div className="space-y-4">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Infrastructure Module</Label>
                              <Select value={selectedServer} onValueChange={setSelectedServer}>
                                  <SelectTrigger className="rounded-[1.5rem] h-16 bg-muted/40 border-4 border-transparent focus:border-primary/30 font-bold transition-all"><SelectValue placeholder="Select Module" /></SelectTrigger>
                                  <SelectContent className="rounded-2xl border-none shadow-3xl">{serverTypes.map(t => <SelectItem key={t} value={t} className="rounded-xl font-bold p-3">{t}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          {selectedServer === 'FusionPBX' && (
                              <div className="space-y-4 animate-in slide-in-from-top-6 duration-700">
                                  <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Concurrency Package</Label>
                                  <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                      <SelectTrigger className="rounded-[1.5rem] h-16 bg-muted/40 border-4 border-transparent focus:border-primary/30 font-bold transition-all"><SelectValue placeholder="Capacity Limit" /></SelectTrigger>
                                      <SelectContent className="rounded-2xl border-none shadow-3xl">{fusionPbxCapacities.map(c => <SelectItem key={c.value} value={c.value} className="rounded-xl font-bold p-3">{c.label} — {c.price}</SelectItem>)}</SelectContent>
                                  </Select>
                              </div>
                          )}
                          <div className="space-y-4">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Custom Logic / Requirements</Label>
                              <Textarea placeholder="Specific routing rules or custom requirements..." className="rounded-[1.5rem] bg-muted/40 border-4 border-transparent focus:border-primary/30 resize-none min-h-[140px] font-bold p-6 transition-all" value={requirements} onChange={e => setRequirements(e.target.value)} />
                          </div>
                          <div className="space-y-4">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Human Validation</Label>
                              <div className="flex gap-4">
                                  <div className="flex-grow flex items-center justify-center bg-primary/10 border-4 border-primary/10 rounded-[1.5rem] h-16 font-code text-3xl tracking-[0.6em] font-black text-primary italic select-none line-through opacity-80">{captchaText}</div>
                                  <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-[1.5rem] h-16 w-16 border-4 bg-muted/40 hover:bg-muted transition-all"><RefreshCw className="w-7 h-7" /></Button>
                              </div>
                              <Input placeholder="Enter Security Code" className="rounded-[1.5rem] h-16 bg-muted/40 border-4 border-transparent focus:border-primary/30 font-black text-center text-xl transition-all" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                          </div>
                      </div>
                      <DialogFooter className="mt-14">
                          <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full rounded-[2rem] h-20 text-2xl font-black shadow-3xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95">
                              {isSubmitting ? <Loader2 className="w-8 h-8 mr-4 animate-spin" /> : <Zap className="w-8 h-8 mr-4" />}
                              Confirm Deployment
                          </Button>
                      </DialogFooter>
                  </div>
              ) : (
                  <div className="text-center p-16 space-y-12 bg-gradient-to-b from-primary/10 to-background">
                      <div className="mx-auto w-36 h-36 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-pulse shadow-inner border-8 border-accent/10"><CheckCircle className="w-16 h-16" /></div>
                      <div>
                          <h3 className="text-5xl font-black font-headline mb-6 tracking-tighter">Request Logged</h3>
                          <p className="text-muted-foreground font-bold px-8 leading-relaxed opacity-80">Infrastructure request verified. Connecting to billing specialist via WhatsApp.</p>
                      </div>
                      <Button asChild size="lg" className="w-full rounded-[2rem] h-24 bg-accent hover:bg-accent/90 text-3xl font-black shadow-3xl shadow-accent/40 transition-all hover:scale-105 active:scale-95">
                          <a href={`https://wa.me/17633272191?text=${getOrderDetails()}`} target="_blank" className="flex items-center justify-center">
                            <MessageCircle className="w-9 h-9 mr-5" /> Finalize Transaction
                          </a>
                      </Button>
                      <Button variant="ghost" className="w-full text-[11px] font-black uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-all" onClick={() => setOrderDialogOpen(false)}>Return to Control Panel</Button>
                  </div>
              )}
          </DialogContent>
      </Dialog>

      <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
          <DialogContent className="max-w-3xl rounded-[3.5rem] p-12 overflow-y-auto max-h-[90vh] border-none shadow-3xl bg-white/95 backdrop-blur-3xl">
              <DialogHeader>
                  <DialogTitle className="text-5xl font-black font-headline tracking-tighter uppercase italic text-primary">Global Rates</DialogTitle>
                  <DialogDescription className="font-bold text-muted-foreground mt-2">Wholesale termination deck — Tier 1 direct.</DialogDescription>
              </DialogHeader>
              
              <Card className="mt-12 bg-primary/5 border-4 border-primary/10 shadow-none rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                      <CardTitle className="text-lg font-black flex items-center gap-4">
                          <Calculator className="w-6 h-6 text-primary" />
                          Monthly Cost Projection
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Route Destination</Label>
                              <Select value={calcRoute} onValueChange={setCalcRoute}>
                                  <SelectTrigger className="h-14 rounded-[1.25rem] bg-background border-4 border-primary/10 font-black"><SelectValue /></SelectTrigger>
                                  <SelectContent className="rounded-2xl border-none shadow-3xl">{voipRoutes.map(r => <SelectItem key={r.name} value={r.name} className="rounded-xl font-bold p-3">{r.name}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          <div className="space-y-3">
                              <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Total Monthly Minutes</Label>
                              <Input type="number" value={calcMins} onChange={e => setCalcMins(e.target.value)} className="h-14 rounded-[1.25rem] bg-background border-4 border-primary/10 font-black text-center text-lg" />
                          </div>
                      </div>
                      <div className="bg-primary p-7 rounded-[1.5rem] flex justify-between items-center shadow-3xl shadow-primary/30">
                          <span className="text-sm font-black text-primary-foreground uppercase tracking-widest">Est. Monthly Cost:</span>
                          <span className="text-5xl font-black text-primary-foreground tracking-tighter">${estimatedCost}</span>
                      </div>
                  </CardContent>
              </Card>

              <div className="border-4 border-muted rounded-[2.5rem] overflow-hidden mt-12 bg-card/30 backdrop-blur-xl">
                  <Table>
                      <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent border-none">
                              <TableHead className="font-black text-primary uppercase text-[11px] tracking-[0.4em] px-8 h-16">Route</TableHead>
                              <TableHead className="font-black text-primary uppercase text-[11px] tracking-[0.4em] text-center h-16">Rate ($)</TableHead>
                              <TableHead className="font-black text-primary uppercase text-[11px] tracking-[0.4em] text-right px-8 h-16">Pulse</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {voipRoutes.map(r => (
                              <TableRow key={r.name} className="hover:bg-primary/5 border-muted transition-colors">
                                  <TableCell className="font-black text-base px-8 py-5">{r.name}</TableCell>
                                  <TableCell className="text-center font-code text-accent font-black text-xl">{r.rate.toFixed(3)}</TableCell>
                                  <TableCell className="text-right text-muted-foreground text-xs font-black px-8 uppercase tracking-widest">{r.pulse}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
              <div className="flex items-center justify-center gap-4 mt-10 p-6 rounded-[1.5rem] bg-amber-500/10 text-amber-700 border-4 border-amber-500/10">
                <Info className="w-6 h-6 flex-shrink-0" />
                <p className="text-[11px] font-black uppercase tracking-[0.3em] leading-relaxed opacity-80">Rates are dynamic. Contact NOC for customized volume-based pricing discounts.</p>
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isReadCommentDialogOpen} onOpenChange={setReadCommentDialogOpen}>
          <DialogContent className="sm:max-w-xl rounded-[3.5rem] p-12 border-none shadow-3xl bg-white/95 backdrop-blur-3xl overflow-y-auto max-h-[80vh]">
              <DialogHeader className="mb-10"><DialogTitle className="text-5xl font-black font-headline tracking-tighter uppercase italic text-primary">Reviews</DialogTitle></DialogHeader>
              <div className="space-y-8">
                  {[
                      { text: "Migration was flawless. Latency dropped by 40% immediately upon moving our VOS3000 instances.", user: "carrier_pro_intl" },
                      { text: "The FusionPBX clustering capability here is unmatched. Zero downtime during our 500-channel peak.", user: "voip_ops_head" },
                      { text: "Accurate billing and top-tier security. Our clients notice the difference in audio quality.", user: "retail_networks" }
                  ].map((review, i) => (
                    <Card key={i} className="bg-muted/30 border-none shadow-none rounded-[2rem] group hover:bg-primary/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 150}ms` }}>
                        <CardContent className="p-10">
                            <p className="text-lg italic font-bold text-foreground/80 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center justify-between mt-8">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[9px] font-black tracking-[0.4em] uppercase px-4 py-1.5 rounded-full">Identity Verified</Badge>
                                <span className="text-sm font-black text-primary/60 tracking-tight">— @{review.user}</span>
                            </div>
                        </CardContent>
                    </Card>
                  ))}
              </div>
          </DialogContent>
      </Dialog>

      <Dialog open={isPostCommentDialogOpen} onOpenChange={setPostCommentDialogOpen}>
          <DialogContent className="sm:max-w-lg rounded-[3.5rem] p-12 border-none shadow-3xl bg-white/95 backdrop-blur-3xl">
              <DialogHeader className="mb-10"><DialogTitle className="text-4xl font-black font-headline tracking-tighter uppercase italic text-primary">Insight</DialogTitle></DialogHeader>
              <div className="space-y-10">
                  <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Platform Feedback</Label>
                      <Textarea placeholder="Share your experience with our network performance..." value={newComment} onChange={e => setNewComment(e.target.value)} rows={6} className="rounded-[1.5rem] bg-muted/40 border-4 border-transparent focus:border-primary/30 resize-none font-bold p-8 transition-all" />
                  </div>
                  <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] opacity-60 ml-1">Security Challenge</Label>
                      <div className="flex gap-4">
                          <div className="flex-grow flex items-center justify-center bg-primary/10 rounded-[1.5rem] font-code text-3xl font-black text-primary/60 line-through h-16 opacity-80">{captchaText}</div>
                          <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-[1.5rem] h-16 w-16 border-4 bg-muted/40 hover:bg-muted transition-all"><RefreshCw className="w-7 h-7" /></Button>
                      </div>
                      <Input placeholder="Enter Sequence" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} className="rounded-[1.5rem] h-16 bg-muted/40 border-4 border-transparent focus:border-primary/30 text-center font-black text-xl transition-all" />
                  </div>
              </div>
              <DialogFooter className="mt-14">
                <Button onClick={async () => {
                    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) { toast({ title: 'Invalid Security Code', variant: 'destructive' }); return; }
                    setSubmitting(true); await new Promise(r => setTimeout(r, 1000)); setSubmitting(false);
                    toast({ title: 'Experience Recorded', description: 'Your feedback directly influences our infrastructure roadmap.' });
                    setPostCommentDialogOpen(false); setNewComment(''); setCaptchaInput('');
                }} disabled={isSubmitting} className="w-full rounded-[2rem] h-20 font-black shadow-3xl shadow-primary/40 text-2xl transition-all hover:scale-[1.02] active:scale-95">
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Broadcast Feedback'}
                </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-40 border-t bg-muted/10">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-wrap justify-center gap-16 md:gap-32 mb-20 text-muted-foreground/30">
                    <div className="flex flex-col items-center gap-6 group">
                        <Shield className="w-12 h-12 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">256-Bit SSL</span>
                    </div>
                    <div className="flex flex-col items-center gap-6 group">
                        <Globe className="w-12 h-12 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Anycast IP</span>
                    </div>
                    <div className="flex flex-col items-center gap-6 group">
                        <Cpu className="w-12 h-12 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Bare Metal</span>
                    </div>
                </div>
                <Separator className="max-w-xl mx-auto mb-16 opacity-10" />
                <p className="text-xl font-bold text-muted-foreground max-w-2xl mx-auto leading-tight mb-16 opacity-60">
                    AMS Portal: Specialized high-performance telecommunications 
                    infrastructure for the world's most demanding carrier environments.
                </p>
                <div className="flex flex-wrap justify-center gap-10">
                    <Link href="/server-status" className="text-[11px] font-black text-primary hover:text-accent transition-all uppercase tracking-[0.3em]">System Health Monitoring</Link>
                    <a href="https://wa.me/17633272191" className="text-[11px] font-black text-primary hover:text-accent transition-all uppercase tracking-[0.3em]">Infrastructure SLA</a>
                    <a href="https://wa.me/17633272191" className="text-[11px] font-black text-primary hover:text-accent transition-all uppercase tracking-[0.3em]">Global Compliance</a>
                </div>
                <p className="text-[10px] text-muted-foreground/30 font-black uppercase tracking-[0.5em] mt-32">
                    &copy; {new Date().getFullYear()} AMS Server Management Group. All rights reserved.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}