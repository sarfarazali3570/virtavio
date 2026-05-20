import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Solutions',
  description: 'Scalable AI-powered solutions designed for modern enterprises. From custom neural architectures to autonomous agents.',
  openGraph: {
    title: 'Virtavio Solutions | Enterprise AI & Automation',
    description: 'Transform your business with our cutting-edge AI and software solutions.',
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
