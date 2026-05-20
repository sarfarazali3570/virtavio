'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Brain, Code2, Palette, Search, Share2, Target, BarChart3,
  ArrowRight, ChevronDown, Check, Sparkles, Bot, Cpu, Globe,
  Smartphone, Cloud, Link2, ShoppingCart, Layout, Shield,
  Mic, Eye, Video, Users, MessageCircle, UserCheck, Store,
  MonitorPlay, Megaphone, RotateCcw, ShoppingBag, FileText,
  Mail, LineChart, FlaskConical, Zap
} from 'lucide-react';

const services = [
  {
    id: 'ai-integration',
    icon: Brain,
    title: 'AI Integration & Intelligent Automation',
    tagline: 'The "Brain" of modern business infrastructure.',
    gradient: 'from-violet-600 to-indigo-700',
    accentColor: 'violet',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    subServices: [
      { icon: Bot, title: 'Custom AI Agent Development', desc: 'Building autonomous AI "employees" for 24/7 customer support, lead qualification, and internal task automation.' },
      { icon: Sparkles, title: 'Generative AI Workflows', desc: 'Integrating LLMs (Gemini/GPT-4) into business processes for automated content, coding, and data analysis.' },
      { icon: Search, title: 'Generative Engine Optimization (GEO)', desc: 'The next evolution of SEO—optimizing brand content to ensure AI search engines recommend your business.' },
      { icon: LineChart, title: 'Predictive Business Analytics', desc: 'Implementing machine learning models to forecast sales, churn, and market trends.' },
      { icon: MessageCircle, title: 'Enterprise Chatbot Ecosystems', desc: 'Advanced conversational AI for WhatsApp, Telegram, and Web with full CRM integration.' },
    ],
  },
  {
    id: 'software-development',
    icon: Code2,
    title: 'Software & Application Development',
    tagline: 'Engineering robust solutions for complex problems.',
    gradient: 'from-blue-600 to-cyan-600',
    accentColor: 'blue',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    subServices: [
      { icon: Globe, title: 'SaaS Product Engineering', desc: 'End-to-end development of subscription-based software platforms.' },
      { icon: Cpu, title: 'Custom Enterprise ERP/CRM', desc: 'Building internal tools tailored to specific business operations.' },
      { icon: Smartphone, title: 'Mobile App Development', desc: 'High-performance iOS and Android applications using Flutter, React Native, or Native Swift/Kotlin.' },
      { icon: Cloud, title: 'Cloud Infrastructure (DevOps)', desc: 'Managing AWS, Azure, or Google Cloud scaling, security, and server-side optimization.' },
      { icon: Link2, title: 'API Design & System Integration', desc: 'Connecting disjointed software systems to work as a unified ecosystem.' },
    ],
  },
  {
    id: 'web-development',
    icon: Palette,
    title: 'Web Development & UI/UX Design',
    tagline: 'The digital storefront and conversion engine.',
    gradient: 'from-pink-600 to-rose-600',
    accentColor: 'pink',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    subServices: [
      { icon: ShoppingCart, title: 'High-Conversion E-commerce', desc: 'Custom builds on Shopify, WooCommerce, or Headless Commerce for maximum speed and sales.' },
      { icon: Layout, title: 'Corporate & Portfolio Websites', desc: 'Professional, SEO-ready websites built with WordPress, Webflow, or Next.js.' },
      { icon: Palette, title: 'UI/UX Modernization', desc: 'Auditing and redesigning user interfaces to improve retention and lower bounce rates.' },
      { icon: Target, title: 'Landing Page Optimization', desc: 'Designing high-stakes pages specifically for paid ad traffic.' },
      { icon: Shield, title: 'Security & Maintenance', desc: 'Real-time monitoring, speed optimization (Core Web Vitals), and daily backups.' },
    ],
  },
  {
    id: 'modern-seo',
    icon: Search,
    title: 'Search Engine Ecosystem (Modern SEO)',
    tagline: "Dominating the world's largest discovery platforms.",
    gradient: 'from-emerald-600 to-teal-600',
    accentColor: 'emerald',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    subServices: [
      { icon: Code2, title: 'Technical SEO & Site Architecture', desc: 'Deep-level optimization for crawlability, indexing, and 2026 speed standards.' },
      { icon: Brain, title: 'Topic Authority & Entity SEO', desc: 'Building a "knowledge graph" for brands rather than just tracking keywords.' },
      { icon: Globe, title: 'Local SEO & Map Domination', desc: 'Ensuring physical businesses rank #1 for "near me" searches.' },
      { icon: Share2, title: 'Social Search SEO', desc: 'Optimizing brand content for Facebook, Instagram, and YouTube search algorithms.' },
      { icon: Mic, title: 'Voice & Visual Search', desc: 'Optimizing for Alexa/Siri queries and Google Lens visual recognition.' },
    ],
  },
  {
    id: 'social-media',
    icon: Share2,
    title: 'Social Media Marketing & Brand Growth',
    tagline: 'Building communities and cultural relevance.',
    gradient: 'from-orange-500 to-amber-600',
    accentColor: 'orange',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    subServices: [
      { icon: Video, title: 'Short-Form Video Production', desc: 'Full-cycle scripting, filming, and high-energy editing for Reels, TikToks, and YouTube Shorts.' },
      { icon: Layout, title: 'Multi-Platform Content Management', desc: 'Daily posting, aesthetic curation, and strategy for LinkedIn, Meta, X, and Instagram.' },
      { icon: Users, title: 'Community Management', desc: 'Moderating and growing private Discord, Slack, or WhatsApp groups for brand loyalists.' },
      { icon: UserCheck, title: 'Influencer & Creator Partnerships', desc: 'Data-driven vetting and management of niche influencers for authentic brand advocacy.' },
      { icon: Store, title: 'Social Commerce Setup', desc: 'Integrating "Shop" features directly into social profiles for seamless buying.' },
    ],
  },
  {
    id: 'performance-marketing',
    icon: Target,
    title: 'Performance Marketing (Paid Media)',
    tagline: 'Scalable, data-driven advertising for instant ROI.',
    gradient: 'from-red-600 to-pink-600',
    accentColor: 'red',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    subServices: [
      { icon: MonitorPlay, title: 'Search Engine Marketing (SEM)', desc: 'Expert management of Google Ads and Bing Ads.' },
      { icon: Megaphone, title: 'Social Advertising', desc: 'High-intent ad campaigns on Meta, LinkedIn, TikTok, and X.' },
      { icon: Globe, title: 'Programmatic & Display Ads', desc: 'Automated ad buying across millions of websites and apps.' },
      { icon: RotateCcw, title: 'Advanced Retargeting', desc: 'Following warm leads across the web to bring them back for the final purchase.' },
      { icon: ShoppingBag, title: 'Marketplace Advertising', desc: 'Dominating Amazon, Walmart, or Flipkart sponsored listings.' },
    ],
  },
  {
    id: 'content-analytics',
    icon: BarChart3,
    title: 'Content Strategy & Performance Analytics',
    tagline: 'The fuel and the measurement of success.',
    gradient: 'from-purple-600 to-fuchsia-600',
    accentColor: 'purple',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
    subServices: [
      { icon: FileText, title: 'Authority Content Marketing', desc: 'Writing whitepapers, case studies, and thought-leadership articles.' },
      { icon: Mail, title: 'Email & SMS Lifecycle Marketing', desc: 'Building automated "drip" sequences to increase Customer Lifetime Value (CLV).' },
      { icon: LineChart, title: 'GA4 & Server-Side Tracking', desc: 'Implementing privacy-compliant (DPDP Act) analytics for the cookieless era.' },
      { icon: FlaskConical, title: 'Conversion Rate Optimization (CRO)', desc: 'Constant A/B testing of headlines, buttons, and layouts to increase profit.' },
    ],
  },
];

export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="pt-20">
      {/* ── Hero Section ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-virtavio-glow opacity-40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
              Everything Your Business Needs <br className="hidden sm:block" />
              <span className="text-gradient">To Dominate Digital</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-[#475569] max-w-3xl mx-auto leading-relaxed">
              Seven pillars of expertise. One integrated partner. From AI-powered automation
              to performance marketing, we engineer growth at every touchpoint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Nav ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {services.map((s, i) => (
            <motion.a
              key={s.id}
              href={`#${s.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group glass-card p-4 text-center hover:border-primary/30 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-bold text-[#334155] leading-tight">{s.title.split('&')[0].split('(')[0].trim()}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── Service Sections ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28 space-y-16">
        {services.map((service, index) => {
          const isExpanded = expandedId === service.id;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-28"
            >
              <div className="glass-card overflow-hidden hover:shadow-[0_24px_70px_rgba(106,0,255,0.10)] transition-all duration-500">
                <div className={`grid grid-cols-1 lg:grid-cols-5 gap-0 ${isEven ? '' : 'lg:flex-row-reverse flex flex-col'}`}>

                  {/* Image Panel - FIXED FOR MOBILE */}
                  <div className="lg:col-span-2 relative h-[400px] lg:h-auto min-h-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    {/* Responsive Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 hidden lg:block`} />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 text-white" style={{ direction: 'ltr' }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                          0{index + 1} / 07
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-display font-bold leading-tight mb-2">
                        {service.title}
                      </h2>
                      <p className="text-white/80 text-sm font-medium">{service.tagline}</p>
                    </div>
                  </div>

                  {/* Sub-services Bento Grid */}
                  <div className="lg:col-span-3 p-6 lg:p-8" style={{ direction: 'ltr' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.subServices.slice(0, isExpanded ? undefined : 4).map((sub, si) => (
                        <div key={sub.title} className="group/sub p-5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(106,0,255,0.08)] transition-all duration-300">
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 shadow-sm group-hover/sub:scale-110 transition-transform text-white`}>
                              <sub.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-[17px] font-extrabold text-[#0F172A] mb-2 tracking-tight">
                                {sub.title}
                              </h4>
                              <p className="text-[13px] text-[#64748B] leading-relaxed font-medium">
                                {sub.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {service.subServices.length > 4 && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : service.id)}
                        className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group/btn"
                      >
                        {isExpanded ? 'Show Less' : `+${service.subServices.length - 4} More Services`}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-24 bg-[#0F172A] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/15 rounded-full blur-[150px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to Transform Your <span className="text-gradient">Digital Presence?</span>
          </h2>
          <p className="text-lg text-white mb-10" style={{ "color": "white" }}>
            We're your single partner for end-to-end digital excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-quote" className="btn-primary inline-flex items-center gap-2 group text-lg px-10 py-4">
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}