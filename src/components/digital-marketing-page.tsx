
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight, Check, DollarSign, Search, Users } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Search Engine Optimization (SEO)',
    icon: <Search className="w-8 h-8" />,
    description: 'Improve your website\'s visibility on search engines and attract more organic traffic.',
    features: [
      'Keyword Research & Strategy',
      'On-Page & Off-Page SEO',
      'Technical SEO Audits',
      'Link Building',
      'Local SEO',
    ],
    pricing: 'Starts from $500/month',
  },
  {
    title: 'Social Media Marketing',
    icon: <Users className="w-8 h-8" />,
    description: 'Engage with your audience and build your brand on social media platforms.',
    features: [
      'Social Media Strategy',
      'Content Creation & Curation',
      'Community Management',
      'Paid Social Advertising',
      'Analytics & Reporting',
    ],
    pricing: 'Starts from $400/month',
  },
  {
    title: 'Pay-Per-Click (PPC) Advertising',
    icon: <DollarSign className="w-8 h-8" />,
    description: 'Drive targeted traffic to your website with effective PPC campaigns.',
    features: [
      'Campaign Setup & Management',
      'Ad Copywriting & Design',
      'Keyword Management',
      'A/B Testing & Optimization',
      'Performance Tracking',
    ],
    pricing: 'Starts from $300/month + Ad Spend',
  },
];

export function DigitalMarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <div className="container mx-auto flex items-center justify-between">
            <div className="text-left">
                <h1 className="text-xl md:text-3xl font-bold">Digital Marketing Services</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Comprehensive solutions to grow your business online.</p>
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
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {service.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 p-6 bg-muted/50">
                <p className="font-semibold text-md">{service.pricing}</p>
                <Button>
                  Get Started
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="p-6 text-sm text-center border-t text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

    