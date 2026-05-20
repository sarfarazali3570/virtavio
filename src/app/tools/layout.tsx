import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Utility Tools',
  description: 'Boost your productivity with our suite of free online tools: Image Compressor, AI Prompt Generator, and more.',
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
