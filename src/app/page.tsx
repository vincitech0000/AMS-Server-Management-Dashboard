import { ServerDashboard } from '@/components/server-dashboard';
import { JsonLd } from '@/components/json-ld';

export default function Home() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AMS Infrastructure',
    url: 'https://amsserver.com',
    logo: 'https://amsserver.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-763-327-2191',
      contactType: 'customer service',
    },
    sameAs: [
      'https://t.me/AMSserver',
    ],
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AMS Portal',
    url: 'https://amsserver.com',
  };

  return (
    <>
      <JsonLd data={organizationData} />
      <JsonLd data={websiteData} />
      <ServerDashboard />
    </>
  );
}
