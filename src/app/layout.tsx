import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: 'AMS Portal | Enterprise VoIP Infrastructure',
    template: '%s | AMS Portal',
  },
  description: 'Management portal for VOS3000, VICIBOX, FusionPBX and high-performance VoIP infrastructure. Secure pharma supply and digital marketing solutions.',
  keywords: ['VoIP', 'VOS3000', 'VICIBOX', 'FusionPBX', 'Server Management', 'Pharma Supply', 'Digital Marketing'],
  authors: [{ name: 'AMS Infrastructure Team' }],
  creator: 'AMS Infrastructure',
  publisher: 'AMS Infrastructure',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://amsserver.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AMS Portal | Enterprise VoIP Infrastructure',
    description: 'Mission-critical solutions for high-performance VoIP operations.',
    url: 'https://amsserver.com',
    siteName: 'AMS Portal',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS Portal | Enterprise VoIP Infrastructure',
    description: 'Mission-critical solutions for high-performance VoIP operations.',
    creator: '@amsserver',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
