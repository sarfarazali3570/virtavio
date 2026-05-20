'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Bot, Code, Layout, Search,
    Share2, BarChart3, PenTool, Camera,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        title: "AI Integration",
        subtitle: "Intelligent Automation",
        icon: <Bot className="w-6 h-6" />,
        description: "Building autonomous AI employees and custom LLM workflows to automate business growth.",
        color: "from-purple-500 to-[#ad0693]"
    },
    {
        title: "Web Dev.",
        subtitle: "Digital Storefronts",
        icon: <Layout className="w-6 h-6" />,
        description: "High-performance, SEO-ready websites built with Next.js and Webflow for maximum conversion.",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "Modern SEO",
        subtitle: "Search Ecosystem",
        icon: <Search className="w-6 h-6" />,
        description: "Dominating Perplexity, SearchGPT, and Google through technical site architecture and authority.",
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "Social Media",
        subtitle: "Brand Community",
        icon: <Share2 className="w-6 h-6" />,
        description: "Short-form video production and multi-platform management for viral cultural relevance.",
        color: "from-orange-500 to-rose-600"
    },
    {
        title: "Paid Media",
        subtitle: "Performance Marketing",
        icon: <BarChart3 className="w-6 h-6" />,
        description: "Data-driven advertising on Google and Meta designed for scalable, instant ROI.",
        color: "from-[#ad0693] to-pink-600"
    },
    {
        title: "Software",
        subtitle: "SaaS Engineering",
        icon: <Code className="w-6 h-6" />,
        description: "Custom enterprise ERP/CRM and mobile app development for complex business problems.",
        color: "from-slate-700 to-slate-900"
    },
    {
        title: "Content",
        subtitle: "Authority Strategy",
        icon: <PenTool className="w-6 h-6" />,
        description: "Thought-leadership articles and automated email sequences to increase customer lifetime value.",
        color: "from-amber-500 to-orange-600"
    },
    {
        title: "Photo + Video",
        subtitle: "Visual Storytelling",
        icon: <Camera className="w-6 h-6" />,
        description: "High-energy editing and scripting for Reels and TikToks that build authentic brand advocacy.",
        color: "from-cyan-500 to-blue-500"
    }
];

// Helper to open WhatsApp with service-specific pre-filled text
function openWhatsApp(serviceTitle: string) {
    const phoneNumber = "918910364760"; // India country code +91
    const message = `Hi, I'm interested in ${serviceTitle}. I want to discuss more on this.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

export default function ServicesSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header - Editorial Style */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 border-b border-slate-100 pb-12">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#ad0693] font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                        >
                            Seven Pillars of Expertise
                        </motion.span>
                        <h2 className="font-display font-bold text-[#0F172A] leading-tight" style={{ fontSize: '35px' }}>
                            Everything Your Business Needs <br className="hidden md:block" />
                            To <span className="text-[#ad0693]">Dominate</span> Digital
                        </h2>
                    </div>
                    <p className="text-[#475569] max-w-sm text-right hidden lg:block" style={{ fontSize: '16px' }}>
                        From AI-powered automation to performance marketing, we engineer growth at every touchpoint.
                    </p>
                </div>

                {/* Services Grid: 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => openWhatsApp(service.title)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openWhatsApp(service.title);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            className="group relative bg-[#F8FAFC] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-transparent hover:border-slate-100 transition-all duration-500 cursor-pointer"
                        >
                            {/* Icon & Mini-Arrow */}
                            <div className="flex justify-between items-start mb-6 md:mb-10">
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    {service.icon}
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#ad0693] transition-colors" />
                            </div>

                            {/* Text Content */}
                            <div>
                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#ad0693] mb-1">
                                    {service.subtitle}
                                </h4>
                                <h3 className="font-bold text-[#0F172A] mb-3 text-sm md:text-xl">
                                    {service.title}
                                </h3>
                                <p className="text-[#64748B] leading-relaxed hidden md:block" style={{ fontSize: '14px' }}>
                                    {service.description}
                                </p>
                            </div>

                            {/* Subtle Bottom Line Decor */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#ad0693] group-hover:w-1/3 transition-all duration-500 rounded-t-full" />
                        </motion.div>
                    ))}
                </div>

                {/* Human Contact Footer */}
                <div className="mt-20 relative overflow-hidden rounded-3xl group">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                            alt="Dynamic team working on digital strategy"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Modern gradient overlay for text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-[#ad0693]/20"></div>
                    </div>

                    {/* Content */}
                    <div
                        className="relative z-10 flex flex-col items-center text-center py-16 md:py-24 px-6 md:px-8"
                        style={{ color: 'white' }}
                    >
                        <p
                            className="mb-10 text-[18px] md:text-[22px] leading-relaxed max-w-2xl font-medium antialiased drop-shadow-lg"
                            style={{ color: 'white', backgroundColor: 'transparent' }}
                        >
                            Ready to <span className="font-bold" style={{ color: '#ad0693' }}>transform</span> your digital presence and scale your business with modern web, SEO, and marketing solutions?
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                href="/get-quote"
                                className="px-10 py-4 bg-[#ad0693] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-[#ad0693]/50 hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                Start Your Project
                            </Link>

                            <Link
                                href="/get-quote"
                                className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-[#ad0693] transition-all duration-300 hover:border-white shadow-lg"
                            >
                                Schedule a Call
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}