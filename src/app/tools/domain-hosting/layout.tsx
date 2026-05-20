import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domain Availability Checker & Hosting Solutions',
  description: 'Find your perfect domain name and explore the best hosting plans for your project. Secure your online presence with Virtavio.',
  keywords: ['domain checker', 'buy domain', 'hosting solutions', 'web hosting', 'domain search'],
};

export default function DomainHostingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
