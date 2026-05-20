import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Image Compressor | Reduce Size Without Losing Quality',
  description: 'The best free tool to compress JPG, PNG, WebP, and GIF images online. Reduce file size for faster website loading and better SEO without visible quality loss.',
  keywords: ['image compressor', 'online image compression', 'reduce image size', 'compress png', 'compress jpeg', 'webp optimizer'],
  openGraph: {
    title: 'Virtavio Image Compressor | Free Online Tool',
    description: 'Instantly reduce image file size with our high-performance compression engine.',
    type: 'website',
  },
};

export default function ImageCompressorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
