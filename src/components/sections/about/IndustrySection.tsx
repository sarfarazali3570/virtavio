'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Maximize, Headphones, Cpu, Globe } from 'lucide-react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard = ({ children, className = "", delay = 0 }: BentoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white p-8 transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(59,130,246,0.15)] hover:border-blue-200/50 ${className}`}
  >
    {children}
  </motion.div>
);

export default function IndustrySection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#fafbfc] overflow-hidden" aria-labelledby="why-choose-us">
      {/* SEO Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/40 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          {/* <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 rounded-full border border-blue-100"
          >
            The Gold Standard
          </motion.span> */}
          <h2 id="why-choose-us" className="text-4xl md:text-6xl font-display font-bold text-slate-900 tracking-tight mb-6">
            Why the industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">chooses us</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Enterprise-grade infrastructure backed by deep technical research and a
            global support network designed for the next generation of AI.
          </p>
        </header>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* Main Feature - Large */}
          <BentoCard className="md:col-span-6 lg:col-span-8 flex flex-col justify-between min-h-[400px]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu className="w-48 h-48 text-blue-600" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-200">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Deep Technical Expertise</h3>
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl font-medium">
                Our team holds over 40 patents in machine learning and distributed systems.
                We don't just use AI; we pioneer the architectures that the world uses tomorrow.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2 mt-8">
              {['PyTorch', 'TensorFlow', 'Rust', 'Kubernetes'].map((tag) => (
                <span key={tag} className="px-5 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-500 transition-colors group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600">
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Highlight Feature - Vertical */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-2xl shadow-blue-200 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-8 border border-white/20 shadow-lg">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Hyper-Fast Delivery</h3>
              <p className="text-white  leading-relaxed font-medium" style={{ color: "white" }}>
                Go from concept to production-ready API in weeks. Our pre-trained base models
                accelerate your R&D cycle exponentially.
              </p>
            </div>
            <div className="relative z-10 mt-8 flex items-center gap-2 font-bold text-sm">
              <span className="w-8 h-[2px] bg-white/30" />
              ACCELERATE DEVELOPMENT
            </div>
          </motion.div>

          {/* 24/7 Support - Horizontal */}
          <BentoCard className="md:col-span-6 lg:col-span-7 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                <Headphones className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">24/7 Elite Support</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium max-w-md">
                Every Enterprise partner gets a dedicated solution architect. No ticket queues,
                just direct access to experts.
              </p>
            </div>
          </BentoCard>

          {/* Scalable - Small */}
          <BentoCard className="md:col-span-3 lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Maximize className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900">Global Scale</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Native auto-scaling infrastructure ensures 99.99% uptime whether you have 10
              users or 10 million.
            </p>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}