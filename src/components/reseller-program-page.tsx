
'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Zap, Shield, BarChart, LifeBuoy, Server, Route, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const programFeatures = [
    {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: 'White-Label Platform',
        description: 'Offer our services under your own brand. We provide a fully customizable platform that you can present as your own.',
    },
    {
        icon: <Shield className="w-8 h-8 text-primary" />,
        title: 'Your Own Domain',
        description: 'Operate under your own domain name for a professional and seamless customer experience.',
    },
    {
        icon: <BarChart className="w-8 h-8 text-primary" />,
        title: 'Control Your Pricing',
        description: 'You have complete freedom to set your own pricing and packages, giving you full control over your profit margins.',
    },
    {
        icon: <LifeBuoy className="w-8 h-8 text-primary" />,
        title: '24/7 Technical Support',
        description: 'Our expert support team is available around the clock to assist you and your customers with any technical issues.',
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: 'Customer Management Panel',
        description: 'We provide a reseller panel for your customers to manage their users.',
    },
    {
        icon: <Server className="w-8 h-8 text-primary" />,
        title: 'Scalable Dialer Solutions',
        description: 'We provide dialers (single or cluster server) for low or high use cases.',
    },
    {
        icon: <Route className="w-8 h-8 text-primary" />,
        title: 'Multi-Tenant DID with FusionPBX',
        description: 'We provide DIDs with multi-tenant FusionPBX servers.',
    },
    {
        icon: <MessageSquare className="w-8 h-8 text-primary" />,
        title: 'Bulk SMS Services',
        description: 'We provide Bulk SMS services, including dedicated Bulk SMS servers.',
    },
];

const gettingStartedSteps = [
    { title: 'Contact Us', description: 'Reach out to our team to express your interest in the reseller program.' },
    { title: 'Choose Your Plan', description: 'We offer flexible plans to suit your business needs and scale.' },
    { title: 'Platform Setup', description: 'We\'ll help you set up your white-label platform with your branding and domain.' },
    { title: 'Start Selling', description: 'Begin offering VoIP services to your customers and start earning.' },
];

export function ResellerProgramPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 text-foreground">
        <header className="p-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-left">
                    <h1 className="text-xl md:text-3xl font-bold text-primary">Reseller Program</h1>
                    <p className="text-xs md:text-sm text-muted-foreground">Start Your Own VoIP Business Today</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Back to Dashboard</span>
                    </Link>
                </Button>
            </div>
        </header>

        <main className="flex-grow p-4 md:p-8">
            <div className="container mx-auto">
                <section className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Become a VoIP Reseller</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Partner with us to launch your own VoIP business without the hassle of managing complex infrastructure. Our reseller program provides everything you need to get started.
                    </p>
                </section>

                <section className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Program Features</h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {programFeatures.map((feature) => (
                            <Card key={feature.title} className="bg-white/60 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <CardHeader className="items-center">
                                    {feature.icon}
                                    <CardTitle className="text-primary mt-4">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">How to Get Started</h3>
                     <div className="relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200" aria-hidden="true"></div>
                        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
                            {gettingStartedSteps.map((step, index) => (
                                <div key={step.title} className="flex flex-col items-center text-center">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold border-4 border-background z-10">
                                        {index + 1}
                                    </div>
                                    <h4 className="mt-4 text-lg font-semibold text-gray-800">{step.title}</h4>
                                    <p className="mt-1 text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border-primary/20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Ready to Join?</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                        Contact us today to learn more about our reseller program and take the first step towards launching your own successful VoIP business.
                    </p>
                    <a href="https://wa.me/+916307828356?text=I%27m%20interested%20in%20your%20reseller%20program" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Users className="w-5 h-5 mr-2" />
                            Contact Us to Get Started
                        </Button>
                    </a>
                </section>
            </div>
        </main>
        
        <footer className="p-6 text-sm text-center border-t text-muted-foreground bg-white/80 backdrop-blur-sm">
            <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
        </footer>
    </div>
  );
}
