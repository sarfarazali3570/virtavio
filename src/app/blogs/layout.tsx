import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Deep dives into AI, software engineering, and the future of digital transformation from the Virtavio team.',
  openGraph: {
    title: 'Virtavio Blog | AI & Engineering Insights',
    description: 'Expert perspectives on modern tech stacks and AI implementation.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
