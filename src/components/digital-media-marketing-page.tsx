
'use client';

import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
    {
        title: 'Search Engine Optimization (SEO)',
        description: 'We help your website rank higher on Google and other search engines with result-driven SEO strategies. Our SEO services include:',
        features: [
            'Keyword research and analysis',
            'On-page and technical SEO',
            'Quality backlink building',
            'Content optimization for better rankings',
        ],
        conclusion: 'With SEO, your website becomes easier to find, resulting in more organic traffic and leads.',
    },
    {
        title: 'Google My Business SEO (GMB SEO)',
        description: 'Local visibility is crucial for businesses targeting a specific area. Our GMB SEO services focus on:',
        features: [
            'Optimizing your Google Business Profile',
            'Managing reviews and local citations',
            'Posting regular updates and offers',
            'Boosting your local search ranking',
        ],
        conclusion: 'With proper GMB optimization, you will appear in Google’s local map pack, attracting nearby customers.',
    },
    {
        title: 'Social Media Marketing (SMM)',
        description: 'We build a strong social presence for your brand. Our SMM services include:',
        features: [
            'Social media strategy and content creation',
            'Running targeted campaigns on Facebook, Instagram, LinkedIn, and more',
            'Increasing engagement, followers, and brand awareness',
            'Monitoring analytics and improving results',
        ],
        conclusion: 'A strong social media presence builds trust and helps your audience connect with your brand.',
    },
    {
        title: 'Search Engine Marketing (SEM)',
        description: 'Our SEM services help you reach your target audience instantly through paid advertising. We manage:',
        features: [
            'Google Ads',
            'Continuous monitoring and optimization',
        ],
        conclusion: 'With SEM, you get quick results, better visibility, and a high return on investment.',
    },
];

const whyChooseUs = {
    title: 'Why Choose Our Digital Marketing Services?',
    points: [
        { title: 'Customized Strategies', description: 'We create tailored plans to suit your business goals.' },
        { title: 'Expertise in Multiple Channels', description: 'From SEO to SEM, we cover it all.' },
        { title: 'Transparent Reporting', description: 'Track progress with detailed monthly reports.' },
        { title: 'Result-Oriented Approach', description: 'Our focus is on delivering measurable growth.' },
    ],
};

export function DigitalMediaMarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="p-6 border-b">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-left">
                    <h1 className="text-xl md:text-3xl font-bold">Digital Media Marketing</h1>
                    <p className="text-xs md:text-sm text-muted-foreground">Our key services to grow your online presence.</p>
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
                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Key Digital Marketing Services</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {services.map((service) => (
                            <Card key={service.title}>
                                <CardHeader>
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">{service.description}</p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                                        {service.features.map(feature => <li key={feature}>{feature}</li>)}
                                    </ul>
                                    <p className="text-foreground font-medium">{service.conclusion}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <Card className="bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl md:text-3xl">{whyChooseUs.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {whyChooseUs.points.map(point => (
                                    <div key={point.title} className="text-center">
                                        <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                                        <p className="text-muted-foreground">{point.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Growing Your Business Today!</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
                        Take your business to the next level with our professional Digital Marketing Services. Whether you need SEO, GMB SEO, SMM, or SEM, we are here to help you attract more traffic, generate leads, and increase sales.
                    </p>
                    <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                        Contact us today to get a free consultation and discover how we can grow your online presence!
                    </p>
                    <a href="https://wa.me/17633272191?text=I%27m%20interested%20in%20your%20digital%20marketing%20services" target="_blank" rel="noopener noreferrer">
                        <Button>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contact Us on WhatsApp
                        </Button>
                    </a>
                </section>
            </div>
        </main>
        
        <footer className="p-6 text-sm text-center border-t text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
        </footer>
    </div>
  );
}
