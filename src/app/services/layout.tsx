import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our comprehensive range of premium SaaS development services.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
