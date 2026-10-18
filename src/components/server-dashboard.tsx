
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Server, Phone, Database, MessageSquare, 
    Loader2, DollarSign, CheckCircle, RefreshCw, 
    MessageCircle, Users, TrendingUp,
    Shield, Zap, Globe, Cpu, LayoutGrid, Activity, 
    ChevronRight, ArrowRight, ShoppingCart, Network
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import placeholderImages from '@/app/lib/placeholder-images.json';

const serverTypes = ['FusionPBX', 'VOS3000', 'VICIBOX', 'Bulk SMS', 'ASTPP', 'Magnus Billing', 'Other'];

const fusionPbxCapacities = [
    { value: '50', label: 'Up to 50 channels', price: '50$/month' },
    { value: '100', label: 'Up to 100 channels', price: '80$/month' },
    { value: '500', label: 'Up to 500 channels', price: '125$/month' },
];

const voipRoutes = [
    { name: 'USA CLI', rate: 0.175, pulse: '6/6' },
    { name: 'USA CLI (ALL PASS)', rate: 0.23, pulse: '6/6' },
    { name: 'Canada IVR (Unlimited Available)', rate: 0, pulse: 'Flat Fee' },
    { name: 'USA IVR (Unlimited Available)', rate: 0, pulse: 'Flat Fee' },
    { name: 'Puerto Rico', rate: 0.03, pulse: '6/6' },
];

const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
};

export function ServerDashboard() {
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [isVoipDialogOpen, setVoipDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState('');
  const [selectedFusionCapacity, setSelectedFusionCapacity] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [orderStep, setOrderStep] = useState('form');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  
  const [calcRoute, setCalcRoute] = useState(voipRoutes[0].name);
  const [calcMins, setCalcMins] = useState('1000');

  useEffect(() => {
    if ((isOrderDialogOpen && orderStep === 'form')) {
      setCaptchaText(generateCaptcha());
    }
  }, [isOrderDialogOpen, orderStep]);

  const servers = [
    {
        name: 'VICIBOX Dialers',
        category: 'Dialer',
        type: 'Call Center',
        icon: <Phone className="w-6 h-6" />,
        logo: placeholderImages.viciboxLogo,
        isSpecial: true,
        href: '/vicibox',
        description: 'Elite predictive dialing for high-concurrency campaigns.',
        features: ['Predictive Dialer', 'Press One', 'Real-time Stats']
    },
    {
      name: 'VOS3000',
      category: 'Switch',
      type: 'Wholesale',
      icon: <Globe className="w-6 h-6" />,
      logo: placeholderImages.vos3000Logo,
      accessPoints: [{ name: 'CDR LOGIN', url: 'http://173.208.201.150:7948' }],
      description: 'Carrier-grade routing switch for enterprise wholesale.',
      features: ['LCR Engine', 'Wholesale Billing', 'SIP Control']
    },
    {
      name: 'FusionPBX',
      category: 'PBX',
      type: 'Multi-tenant',
      icon: <Server className="w-6 h-6" />,
      logo: placeholderImages.fusionpbxLogo,
      description: 'Industrial FreeSWITCH-based multi-tenant PBX.',
      features: ['Multi-tenant', 'Call Recording', 'DID Manager']
    },
    {
      name: 'Pharma Portal',
      category: 'MedTech',
      type: 'Global Supply',
      icon: <ShoppingCart className="w-6 h-6" />,
      isSpecial: true,
      href: '/pharma',
      description: 'Discreet pharmaceutical distribution hub via USDT.',
      features: ['Secure Order', 'USDT Payment', 'USA to USA Shipping']
    },
    {
      name: 'Bulk SMS',
      category: 'Messaging',
      type: 'Gateway',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Scalable SMS gateway with white-label reseller tools.',
      features: ['API Access', 'Bulk Campaign', 'White-label']
    },
    {
      name: 'ASTPP',
      category: 'Billing',
      type: 'Smart Billing',
      icon: <DollarSign className="w-6 h-6" />,
      logo: placeholderImages.astppLogo,
      description: 'Open-source carrier billing for class 4/5 operations.',
      features: ['Calling Cards', 'DID Mapping', 'Provisioning']
    },
    {
      name: 'Magnus Billing',
      category: 'Billing',
      type: 'Retail',
      icon: <Database className="w-6 h-6" />,
      logo: placeholderImages.magnusLogo,
      accessPoints: [{ name: 'Login', url: 'http://192.187.123.195/mbilling/' }],
      description: 'Comprehensive management solution for retail VoIP.',
      features: ['CDR Analysis', 'Rate Deck', 'Agent Panel']
    },
    {
        name: 'Marketing Pro',
        category: 'Growth',
        type: 'SEO & Ads',
        icon: <TrendingUp className="w-6 h-6" />,
        isSpecial: true,
        href: '/digital-media-marketing',
        description: 'Full-spectrum growth via SEO, GMB, and Google Ads.',
        features: ['GMB SEO', 'Lead Gen', 'Social Growth']
    },
    {
        name: 'Reseller',
        category: 'Business',
        type: 'White-label',
        icon: <Users className="w-6 h-6" />,
        isSpecial: true,
        href: '/reseller-program',
        description: 'Launch your VoIP brand with zero infrastructure cost.',
        features: ['Price Control', 'NOC Support', 'Admin Panel']
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
    if (captchaInput.toUpperCase() !== captchaText.toUpperCase()) {
        toast({ title: 'Invalid Verification Code', variant: 'destructive' });
        setCaptchaText(generateCaptcha());
        return;
    }
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setOrderStep('payment');
  };

  const getOrderDetails = () => {
    return encodeURIComponent(`Infrastructure Request:\nModule: ${selectedServer}\nRequirements: ${requirements}`);
  };

  const estimatedCost = useMemo(() => {
    const route = voipRoutes.find(r => r.name === calcRoute);
    const mins = parseFloat(calcMins) || 0;
    if (route && route.rate === 0) return 'Contact us for Pricing';
    return route ? `$${(route.rate * mins).toFixed(2)}` : '$0.00';
  }, [calcRoute, calcMins]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
      <div className="fixed inset-0 bg-grid z-0 opacity-40 pointer-events-none"></div>
      
      <header className="sticky top-0 z-[100] w-full border-b bg-background/70 backdrop-blur-3xl">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative bg-primary/10 p-2.5 rounded-2xl text-primary border border-primary/20 group-hover:scale-110 transition-all overflow-hidden flex items-center justify-center">
                <Network className="w-7 h-7" />
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse [animation-delay:0.2s] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:0.4s] shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-headline tracking-tighter leading-none">AMS CLOUD</span>
              <span className="text-[10px] text-primary/70 uppercase tracking-[0.4em] font-bold mt-1.5">Infrastructure</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="hidden lg:flex rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all px-6">
                  <a href="http://173.208.201.150:7948" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Wholesale CDR
                  </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all px-6">
                  <Link href="/server-status" className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    NOC Monitor
                  </Link>
              </Button>
              <Separator orientation="vertical" className="h-8 hidden sm:block bg-black/10 mx-2" />
              <Button onClick={() => setOrderDialogOpen(true)} className="rounded-full px-8 h-11 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all bg-primary text-primary-foreground shimmer">
                <Zap className="w-4 h-4 mr-2" />
                Provision
              </Button>
          </div>
        </div>
      </header>

      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
          <a href="http://t.me/AMSserver" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-white/50 backdrop-blur-xl">
              <MessageSquare className="w-6 h-6" />
          </a>
          <a href="https://wa.me/17633272191" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-white/50 backdrop-blur-xl">
              <MessageCircle className="w-6 h-6" />
          </a>
      </div>

      <main className="flex-grow relative z-10">
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
            <div className="absolute inset-0 z-0">
              <Image 
                src={placeholderImages.heroCluster.src}
                alt={placeholderImages.heroCluster.alt}
                fill
                className="object-cover opacity-[0.08] mix-blend-overlay grayscale"
                priority
                data-ai-hint={placeholderImages.heroCluster.hint}
              />
              <div className="absolute inset-0 hero-overlay"></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Shield className="w-3.5 h-3.5" />
                    Tier-4 Enterprise Nodes
                </div>
                <h1 className="text-5xl md:text-8xl font-black mb-8 font-headline tracking-tighter text-foreground leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    Next-Gen <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-cyan-500">Infrastructure.</span>
                </h1>
                <p className="text-sm md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-semibold opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Mission-critical solutions for high-performance VoIP operations. 
                    Unmatched scalability for VOS3000, VICIBOX, and FusionPBX clusters.
                </p>
                <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-full px-12 h-14 text-xs font-black uppercase tracking-widest shadow-[0_20px_50px_-12px_rgba(var(--primary),0.3)] hover:translate-y-[-4px] transition-all bg-primary text-primary-foreground shimmer">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setVoipDialogOpen(true)} className="rounded-full px-12 h-14 text-xs font-black uppercase tracking-widest bg-white/5 backdrop-blur-3xl border-black/10 hover:bg-black/5 hover:border-primary/40 transition-all">
                        Rate Desk
                    </Button>
                </div>
            </div>
        </section>

        <div className="container mx-auto px-4 -mt-24 mb-32 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            <div className="stats-card group">
                <Activity className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Carrier Uptime</div>
                <div className="text-3xl font-black font-headline tracking-tighter">99.999%</div>
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield className="w-12 h-12" />
                </div>
            </div>
            <div className="stats-card group">
                <Server className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Edge Nodes</div>
                <div className="text-3xl font-black font-headline tracking-tighter">40+ Global</div>
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe className="w-12 h-12" />
                </div>
            </div>
            <div className="stats-card group">
                <Activity className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">NOC Latency</div>
                <div className="text-3xl font-black font-headline tracking-tighter">~8ms Peak</div>
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Cpu className="w-12 h-12" />
                </div>
            </div>
            <div className="stats-card group">
                <Zap className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Activation</div>
                <div className="text-3xl font-black font-headline tracking-tighter">Instant</div>
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap className="w-12 h-12" />
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary border border-primary/20">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black font-headline tracking-tighter uppercase">Enterprise Portfolio</h3>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-primary/20 to-transparent ml-8 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servers.map((server, index) => (
              <Card key={index} className="group glass-card card-hover rounded-[2rem] flex flex-col overflow-hidden">
                <CardHeader className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    {server.logo ? (
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white/40 p-2.5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                        <Image 
                          src={server.logo.src} 
                          alt={server.logo.alt} 
                          width={server.logo.width} 
                          height={server.logo.height}
                          className="object-contain w-full h-full"
                          data-ai-hint={server.logo.hint}
                        />
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                          {server.icon}
                      </div>
                    )}
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-[0.2em] border-primary/20 text-primary bg-primary/5 px-3 py-1">
                        {server.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black font-headline tracking-tighter group-hover:text-primary transition-colors leading-none">{server.name}</CardTitle>
                  <CardTitle className="text-xs font-semibold text-muted-foreground/80 mt-3 leading-relaxed">{server.description}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow px-8 pb-8 space-y-2.5">
                    {server.features.map((f, i) => (
                        <div key={i} className="flex items-center text-[10px] font-bold text-foreground/70">
                            <div className="w-2 h-2 rounded-full bg-primary/30 mr-3 border border-primary/20" />
                            {f}
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="px-8 py-6 bg-black/[0.03] border-t border-black/5">
                  {server.isSpecial ? (
                       <Button asChild variant="outline" className="w-full rounded-2xl h-12 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:scale-[1.02] shadow-sm">
                          <Link href={server.href!}>
                              Deploy Solution
                              <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                      </Button>
                  ) : (
                      <div className="flex gap-3 w-full">
                          {server.accessPoints ? server.accessPoints.map((ap, i) => (
                              <Button key={i} asChild variant="outline" className="flex-1 rounded-2xl text-[10px] font-black uppercase tracking-tighter h-12 border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                                  <a href={ap.url} target="_blank" rel="noopener noreferrer">
                                      {ap.name}
                                  </a>
                              </Button>
                          )) : (
                              <Button variant="ghost" size="sm" disabled className="w-full text-[9px] font-black uppercase tracking-widest opacity-20">
                                  Enterprise Only
                              </Button>
                          )}
                      </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <section className="container mx-auto px-4 py-24 mb-24 relative overflow-hidden rounded-[4rem] bg-white border border-primary/10 shadow-2xl">
           <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
              <Network className="w-full h-full -rotate-12 translate-x-1/4" />
           </div>
           <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase leading-none">
                  Global Scaling <br /><span className="text-primary">Starts Here.</span>
                </h2>
                <p className="text-lg text-muted-foreground font-semibold max-w-2xl mx-auto">
                  Our clusters are engineered for high-concurrency VoIP operations. 
                  Experience the power of Tier-4 infrastructure today.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group">
                    <Shield className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black uppercase tracking-widest text-xs mb-3">DDoS Protection</h4>
                    <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">Enterprise-grade filtering with real-time threat mitigation.</p>
                 </div>
                 <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group">
                    <Globe className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black uppercase tracking-widest text-xs mb-3">Anycast DNS</h4>
                    <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">Proprietary routing network ensuring lowest global latency.</p>
                 </div>
                 <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group">
                    <Cpu className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black uppercase tracking-widest text-xs mb-3">NVMe Storage</h4>
                    <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">High-performance drive arrays for ultra-fast CDR processing.</p>
                 </div>
              </div>
              <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-full px-16 h-16 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 bg-primary text-primary-foreground shimmer">
                  Join the Network
              </Button>
           </div>
        </section>
      </main>

      <Dialog open={isOrderDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setOrderDialogOpen(open); }}>
          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-0 overflow-hidden border-none bg-white shadow-2xl shadow-black/20">
              {orderStep === 'form' ? (
                  <div className="p-10">
                      <DialogHeader className="mb-10 text-center">
                          <div className="mx-auto bg-primary/10 p-4 rounded-3xl text-primary mb-6 w-fit border border-primary/20">
                              <Zap className="w-8 h-8" />
                          </div>
                          <DialogTitle className="text-3xl font-black font-headline tracking-tighter uppercase">Infrastructure Node</DialogTitle>
                          <DialogDescription className="font-black text-[10px] text-muted-foreground uppercase tracking-widest">Select deployment specifications</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                          <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.2em] ml-2">System Module</Label>
                              <Select value={selectedServer} onValueChange={setSelectedServer}>
                                  <SelectTrigger className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6 focus:ring-primary focus:border-primary"><SelectValue placeholder="Select Module" /></SelectTrigger>
                                  <SelectContent className="rounded-2xl border-slate-100 bg-white shadow-2xl p-2">{serverTypes.map(t => <SelectItem key={t} value={t} className="rounded-xl font-bold p-3 focus:bg-primary/5">{t}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          {selectedServer === 'FusionPBX' && (
                              <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                                  <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.2em] ml-2">Call Capacity</Label>
                                  <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                      <SelectTrigger className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6 focus:ring-primary focus:border-primary"><SelectValue placeholder="Channels" /></SelectTrigger>
                                      <SelectContent className="rounded-2xl border-slate-100 bg-white shadow-2xl p-2">{fusionPbxCapacities.map(c => <SelectItem key={c.value} value={c.value} className="rounded-xl font-bold p-3 focus:bg-primary/5">{c.label} — {c.price}</SelectItem>)}</SelectContent>
                                  </Select>
                              </div>
                          )}
                          <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.2em] ml-2">Identity Verification</Label>
                              <div className="flex gap-3">
                                  <div className="flex-grow flex items-center justify-center bg-primary/5 border border-primary/20 rounded-2xl h-14 font-code text-2xl font-black text-primary tracking-[0.4em] italic select-none line-through shadow-inner">{captchaText}</div>
                                  <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-2xl h-14 w-14 bg-slate-50 border-slate-100 hover:bg-primary/5 transition-colors"><RefreshCw className="w-5 h-5 text-primary" /></Button>
                              </div>
                              <Input placeholder="Enter Captcha" className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-black text-center text-xl tracking-[0.2em] focus:ring-primary focus:border-primary" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                          </div>
                      </div>
                      <DialogFooter className="mt-10">
                          <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full rounded-[1.5rem] h-16 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 shimmer">
                              {isSubmitting ? <Loader2 className="w-6 h-6 mr-2 animate-spin" /> : <Zap className="w-5 h-5 mr-2" />}
                              Deploy to Cloud
                          </Button>
                      </DialogFooter>
                  </div>
              ) : (
                  <div className="text-center p-14 space-y-8">
                      <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20 shadow-lg shadow-green-500/10 animate-in zoom-in duration-500"><CheckCircle className="w-10 h-10" /></div>
                      <div className="space-y-4">
                          <h3 className="text-3xl font-black font-headline tracking-tighter uppercase leading-none">Slot Reserved</h3>
                          <p className="text-sm text-muted-foreground font-semibold leading-relaxed">Infrastructure block allocated. Connect with a systems engineer to finalize the handshake.</p>
                      </div>
                      <Button asChild className="w-full rounded-[1.5rem] h-16 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black uppercase tracking-widest shadow-2xl shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                          <a href={`https://wa.me/17633272191?text=${getOrderDetails()}`} target="_blank" className="flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 mr-3" /> Secure Handshake
                          </a>
                      </Button>
                  </div>
              )}
          </DialogContent>
      </Dialog>

      <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
          <DialogContent className="max-w-3xl rounded-[3rem] p-10 border-none bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
              <DialogHeader className="mb-8">
                  <DialogTitle className="text-3xl font-black font-headline tracking-tighter uppercase text-black">Wholesale Rate Desk</DialogTitle>
                  <DialogDescription className="font-black text-[10px] text-gray-400 uppercase tracking-widest mt-2">Enterprise-grade termination routes</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                      <Label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Select Route</Label>
                      <Select value={calcRoute} onValueChange={setCalcRoute}>
                          <SelectTrigger className="h-14 mt-3 rounded-2xl bg-white border-gray-100 font-bold text-black px-6 focus:ring-primary"><SelectValue /></SelectTrigger>
                          <SelectContent className="rounded-2xl border-gray-100 bg-white p-2">{voipRoutes.map(r => <SelectItem key={r.name} value={r.name} className="rounded-xl font-bold p-3 focus:bg-primary/5">{r.name}</SelectItem>)}</SelectContent>
                      </Select>
                  </div>
                  <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                      <Label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Monthly Traffic (Mins)</Label>
                      <Input type="number" value={calcMins} onChange={e => setCalcMins(e.target.value)} className="h-14 mt-3 rounded-2xl bg-white border-gray-100 font-black text-center text-xl text-black focus:ring-primary" />
                  </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/80">Projected Monthly Expenditure</span>
                  <span className="text-4xl font-black text-primary tracking-tighter">{estimatedCost}</span>
              </div>

              <div className="border border-gray-100 rounded-3xl overflow-hidden mt-8 shadow-sm">
                  <Table>
                      <TableHeader className="bg-gray-50">
                          <TableRow className="border-gray-100 hover:bg-transparent">
                              <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 h-14 pl-8">Destination</TableHead>
                              <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 text-center h-14">Rate (USD)</TableHead>
                              <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 text-right h-14 pr-8">Pulse</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {voipRoutes.map(r => (
                              <TableRow key={r.name} className="border-gray-100 hover:bg-gray-50 transition-colors">
                                  <TableCell className="font-black text-sm text-black pl-8 py-5">{r.name}</TableCell>
                                  <TableCell className="text-center font-code text-primary font-black text-sm">
                                      {r.rate === 0 ? 'Enterprise Inquiry' : r.rate.toFixed(4)}
                                  </TableCell>
                                  <TableCell className="text-right text-[10px] font-black text-gray-400 pr-8">{r.pulse}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
              
              <div className="mt-12">
                  <Button asChild className="w-full rounded-[1.5rem] h-16 bg-primary text-primary-foreground font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all shimmer">
                      <a href="https://wa.me/17633272191?text=I%20would%20like%20to%20inquire%20about%20the%20Global%20Rate%20Desk%20termination%20services." target="_blank">
                          Request Account Access
                          <ArrowRight className="w-5 h-5 ml-3" />
                      </a>
                  </Button>
              </div>
          </DialogContent>
      </Dialog>

      <footer className="py-24 border-t border-black/5 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center gap-12 mb-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <Shield className="w-8 h-8" />
                <Globe className="w-8 h-8" />
                <Cpu className="w-8 h-8" />
            </div>
            <div className="space-y-4">
              <p className="text-[11px] font-black text-muted-foreground/60 max-w-lg mx-auto leading-relaxed uppercase tracking-[0.4em]">
                  AMS CLOUD • Enterprise Network Solutions
              </p>
              <p className="text-[10px] text-muted-foreground/30 font-black uppercase tracking-[0.8em] mt-8">
                  &copy; {new Date().getFullYear()} AMS PORTAL. MISSION CRITICAL.
              </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
