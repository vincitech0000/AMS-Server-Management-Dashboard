'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Server, Phone, Database, MessageSquare, ArrowUpRight, 
    ShoppingCart, Loader2, DollarSign, CheckCircle, RefreshCw, 
    MessageCircle, Download, Users, AppWindow, Route, TrendingUp,
    Shield, Zap, Globe, Cpu, LayoutGrid, Info, Star, Headphones,
    Wifi, Calculator, Activity, Clock, Terminal, ChevronRight, ArrowRight
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
  
  // Calculator state
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
      accessPoints: [{ name: 'Retail CDR', url: 'https://88.99.103.106:8443' }],
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
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="fixed inset-0 bg-grid z-0 opacity-20 pointer-events-none"></div>
      
      <header className="sticky top-0 z-[100] w-full border-b bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-lg text-primary border border-primary/30 group-hover:rotate-6 transition-all">
                <Terminal className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black font-headline tracking-tighter leading-none">AMS Infrastructure Group</span>
              <span className="text-[9px] text-primary/60 uppercase tracking-[0.3em] font-bold mt-1">Global Carrier Solutions</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm" className="hidden lg:flex rounded-full text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all">
                  <a href="https://88.99.103.106:8443" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Retail CDR
                  </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex rounded-full text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all">
                  <Link href="/server-status" className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Live Status
                  </Link>
              </Button>
              <Separator orientation="vertical" className="h-6 hidden sm:block bg-black/10" />
              <Button onClick={() => setOrderDialogOpen(true)} size="sm" className="rounded-full px-6 font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all bg-primary text-primary-foreground shimmer">
                <Zap className="w-4 h-4 mr-2" />
                Provision
              </Button>
          </div>
        </div>
      </header>

      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
          <a href="http://t.me/AMSserver" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc]/90 backdrop-blur-md text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all border border-white/20">
              <MessageSquare className="w-5 h-5" />
          </a>
          <a href="https://wa.me/17633272191" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/90 backdrop-blur-md text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all border border-white/20">
              <MessageCircle className="w-5 h-5" />
          </a>
      </div>

      <main className="flex-grow relative z-10">
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32">
            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                    <Shield className="w-3 h-3" />
                    Enterprise Tier-4 Infrastructure
                </div>
                <h1 className="text-4xl md:text-7xl font-black mb-6 font-headline tracking-tighter text-foreground leading-tight">
                    Powering Global <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-cyan-600">VoIP Communication.</span>
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-medium opacity-80">
                    Industry-leading solutions for VOS3000, VICIBOX, and FusionPBX. 
                    Unmatched performance with 99.999% uptime and zero-latency global routing.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" onClick={() => setOrderDialogOpen(true)} className="rounded-full px-8 h-12 text-sm font-bold shadow-2xl shadow-primary/20 hover:translate-y-[-2px] transition-all bg-primary text-primary-foreground">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setVoipDialogOpen(true)} className="rounded-full px-8 h-12 text-sm font-bold bg-white/5 backdrop-blur-xl border-black/10 hover:bg-black/5 transition-all">
                        Global Rate Desk
                    </Button>
                </div>
            </div>
        </section>

        <div className="container mx-auto px-4 -mt-10 mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="stats-card">
                <Activity className="w-4 h-4 text-primary mb-3" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Carrier Uptime</div>
                <div className="text-2xl font-black font-headline tracking-tight">99.999%</div>
            </div>
            <div className="stats-card">
                <Server className="w-4 h-4 text-primary mb-3" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Global Nodes</div>
                <div className="text-2xl font-black font-headline tracking-tight">40+</div>
            </div>
            <div className="stats-card">
                <Activity className="w-4 h-4 text-primary mb-3" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">NOC Latency</div>
                <div className="text-2xl font-black font-headline tracking-tight">~8ms</div>
            </div>
            <div className="stats-card">
                <Zap className="w-4 h-4 text-primary mb-3" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Provisioning</div>
                <div className="text-2xl font-black font-headline tracking-tight">Instant</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black font-headline tracking-tight uppercase">Our Solutions Portfolio</h3>
              </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servers.map((server, index) => (
              <Card key={index} className="group glass-card border-black/5 hover:border-primary/40 transition-all duration-500 rounded-2xl flex flex-col overflow-hidden">
                <CardHeader className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    {server.logo ? (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 p-2 transition-transform duration-500 group-hover:scale-110">
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
                      <div className="p-3 rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                          {server.icon}
                      </div>
                    )}
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-black/10 text-muted-foreground">
                        {server.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{server.name}</CardTitle>
                  <CardTitle className="text-xs font-medium text-muted-foreground/70 mt-1">{server.description}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow px-6 pb-6 space-y-2">
                    {server.features.map((f, i) => (
                        <div key={i} className="flex items-center text-[10px] font-bold text-foreground/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2" />
                            {f}
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="px-6 py-4 bg-black/[0.02] border-t border-black/5">
                  {server.isSpecial ? (
                       <Button asChild variant="outline" className="w-full rounded-xl h-10 text-xs font-bold border-black/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group-hover:translate-y-[-2px]">
                          <Link href={server.href!}>
                              View Solution
                              <ChevronRight className="w-3 h-3 ml-2" />
                          </Link>
                      </Button>
                  ) : (
                      <div className="flex gap-2 w-full">
                          {server.accessPoints ? server.accessPoints.map((ap, i) => (
                              <Button key={i} asChild variant="outline" className="flex-1 rounded-xl text-[10px] font-bold h-10 border-black/10 hover:bg-primary hover:text-primary-foreground transition-all">
                                  <a href={ap.url} target="_blank" rel="noopener noreferrer">
                                      {ap.name}
                                  </a>
                              </Button>
                          )) : (
                              <Button variant="ghost" size="sm" disabled className="w-full text-[9px] font-black uppercase tracking-widest opacity-20">
                                  Request Demo
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

      <Dialog open={isOrderDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setOrderDialogOpen(open); }}>
          <DialogContent className="sm:max-w-[450px] rounded-2xl p-0 overflow-hidden border border-black/10 bg-white">
              {orderStep === 'form' ? (
                  <div className="p-8">
                      <DialogHeader className="mb-6">
                          <DialogTitle className="text-2xl font-black font-headline tracking-tight">Infrastructure Provisioning</DialogTitle>
                          <DialogDescription className="font-medium text-muted-foreground">Select your target system for deployment.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-5">
                          <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">Target Module</Label>
                              <Select value={selectedServer} onValueChange={setSelectedServer}>
                                  <SelectTrigger className="rounded-xl h-12 bg-black/5 border-black/10 font-bold"><SelectValue placeholder="Select Module" /></SelectTrigger>
                                  <SelectContent className="rounded-xl border-black/10 bg-white shadow-2xl">{serverTypes.map(t => <SelectItem key={t} value={t} className="rounded-lg font-bold">{t}</SelectItem>)}</SelectContent>
                              </Select>
                          </div>
                          {selectedServer === 'FusionPBX' && (
                              <div className="space-y-2 animate-in slide-in-from-top-4 duration-300">
                                  <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">Call Capacity</Label>
                                  <Select value={selectedFusionCapacity} onValueChange={setSelectedFusionCapacity}>
                                      <SelectTrigger className="rounded-xl h-12 bg-black/5 border-black/10 font-bold"><SelectValue placeholder="Channels" /></SelectTrigger>
                                      <SelectContent className="rounded-xl border-black/10 bg-white shadow-2xl">{fusionPbxCapacities.map(c => <SelectItem key={c.value} value={c.value} className="rounded-lg font-bold">{c.label} — {c.price}</SelectItem>)}</SelectContent>
                                  </Select>
                              </div>
                          )}
                          <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">Security Check</Label>
                              <div className="flex gap-2">
                                  <div className="flex-grow flex items-center justify-center bg-primary/10 border border-primary/20 rounded-xl h-12 font-code text-xl font-black text-primary tracking-[0.3em] italic select-none line-through">{captchaText}</div>
                                  <Button variant="outline" size="icon" onClick={() => setCaptchaText(generateCaptcha())} className="rounded-xl h-12 w-12 bg-black/5 border-black/10"><RefreshCw className="w-4 h-4" /></Button>
                              </div>
                              <Input placeholder="Enter Captcha" className="rounded-xl h-12 bg-black/5 border-black/10 font-black text-center text-lg" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                          </div>
                      </div>
                      <DialogFooter className="mt-8">
                          <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="w-full rounded-xl h-12 text-sm font-bold shadow-xl shadow-primary/20 transition-all bg-primary text-primary-foreground">
                              {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                              Initiate Deployment
                          </Button>
                      </DialogFooter>
                  </div>
              ) : (
                  <div className="text-center p-10 space-y-6">
                      <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20"><CheckCircle className="w-8 h-8" /></div>
                      <div>
                          <h3 className="text-xl font-black font-headline tracking-tight">Provisioning Reserved</h3>
                          <p className="text-sm text-muted-foreground mt-2 font-medium">Your request has been prioritized. Contact our NOC to finalize.</p>
                      </div>
                      <Button asChild className="w-full rounded-xl h-14 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold shadow-xl shadow-green-500/20">
                          <a href={`https://wa.me/17633272191?text=${getOrderDetails()}`} target="_blank" className="flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 mr-2" /> Chat with Engineer
                          </a>
                      </Button>
                  </div>
              )}
          </DialogContent>
      </Dialog>

      <Dialog open={isVoipDialogOpen} onOpenChange={setVoipDialogOpen}>
          <DialogContent className="max-w-2xl rounded-2xl p-8 border border-black/10 bg-white overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                  <DialogTitle className="text-2xl font-black font-headline tracking-tight uppercase text-black">Global Rate Desk</DialogTitle>
                  <DialogDescription className="font-medium text-gray-500">Dialer With VOIP is free including support</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <Label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Select Route</Label>
                      <Select value={calcRoute} onValueChange={setCalcRoute}>
                          <SelectTrigger className="h-10 mt-1 rounded-lg bg-white border-gray-200 font-bold text-black"><SelectValue /></SelectTrigger>
                          <SelectContent className="rounded-lg border-gray-200 bg-white">{voipRoutes.map(r => <SelectItem key={r.name} value={r.name} className="rounded-lg font-bold">{r.name}</SelectItem>)}</SelectContent>
                      </Select>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <Label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Monthly Volume (Mins)</Label>
                      <Input type="number" value={calcMins} onChange={e => setCalcMins(e.target.value)} className="h-10 mt-1 rounded-lg bg-white border-gray-200 font-bold text-center text-black" />
                  </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl flex justify-between items-center mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Estimated Monthly Expenditure:</span>
                  <span className="text-2xl font-black text-primary tracking-tight">{estimatedCost}</span>
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden mt-6">
                  <Table>
                      <TableHeader className="bg-gray-50">
                          <TableRow className="border-gray-100 hover:bg-transparent">
                              <TableHead className="font-bold text-[10px] uppercase tracking-widest text-gray-500 h-10">Route Destination</TableHead>
                              <TableHead className="font-bold text-[10px] uppercase tracking-widest text-gray-500 text-center h-10">Rate (USD)</TableHead>
                              <TableHead className="font-bold text-[10px] uppercase tracking-widest text-gray-500 text-right h-10 pr-6">Pulse</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {voipRoutes.map(r => (
                              <TableRow key={r.name} className="border-gray-100 hover:bg-gray-50 transition-colors">
                                  <TableCell className="font-bold text-xs text-black">{r.name}</TableCell>
                                  <TableCell className="text-center font-code text-primary font-bold">
                                      {r.rate === 0 ? 'Contact us for Pricing' : r.rate.toFixed(3)}
                                  </TableCell>
                                  <TableCell className="text-right text-[10px] font-bold text-gray-400 pr-6">{r.pulse}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
              
              <div className="mt-8">
                  <Button asChild className="w-full rounded-xl h-12 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
                      <a href="https://wa.me/17633272191?text=I%20would%20like%20to%20inquire%20about%20the%20Global%20Rate%20Desk%20termination%20services." target="_blank">
                          Request Dedicated Wholesale Account
                          <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                  </Button>
              </div>
          </DialogContent>
      </Dialog>

      <footer className="py-12 border-t border-black/5 bg-black/[0.01]">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-8 mb-8 opacity-20">
                <Shield className="w-6 h-6" />
                <Globe className="w-6 h-6" />
                <Cpu className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-muted-foreground max-w-lg mx-auto leading-relaxed opacity-40 uppercase tracking-widest">
                AMS Infrastructure Group • Global Carrier Backbone
            </p>
            <p className="text-[9px] text-muted-foreground/20 font-black uppercase tracking-[0.5em] mt-6">
                &copy; {new Date().getFullYear()} AMS INFRASTRUCTURE GROUP. ALL RIGHTS RESERVED.
            </p>
        </div>
      </footer>
    </div>
  );
}