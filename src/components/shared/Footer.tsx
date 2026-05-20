'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Globe, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const footerLinks = {
  services: [
    { label: 'AI Development', href: '/services' },
    { label: 'SEO Services', href: '/services' },
    { label: 'Website Development', href: '/services' },
    { label: 'Digital Marketing', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    // { label: 'Case Studies', href: '/cases' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

// Custom SVG Brand Icons to avoid lucide-react brand icon removal issues
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: 'Newsletter Subscriber',
          message: 'Subscribed to newsletters',
        }),
      });

      if (response.ok) {
        toast.success('Thank you for subscribing to our newsletters!');
        setEmail('');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#020617] text-gray-400 py-20" style={{ color: "#ffffff80" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold text-white tracking-tight">Virtavio</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs " style={{ color: "#ffffff80" }}>
              Building the intelligent age for modern enterprises. Delivering excellence through innovation and AI-powered scalability.
            </p>
            <div className="space-y-2 mt-6">
              <p className="text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Kolkata, West Bengal
              </p>
              <p className="text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                8910364760
              </p>
              <div className="text-sm flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />

                <div className="flex flex-col">
                  <span>support@virtavio.in</span>
                  <span>info@virtavio.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div style={{ color: "#ffffff80" }}>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm mb-6" style={{ color: "#ffffff80" }}>Get updated with our latest news and offers.</p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                disabled={loading}
                className="w-full bg-[#0F172A] border border-blue-500/20 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1 top-1 bottom-1 px-3 bg-[image:var(--background-image-virtavio-gradient)] rounded-md text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center min-w-[40px]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} VIRTAVIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-xs hover:text-white transition-colors uppercase tracking-widest">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
