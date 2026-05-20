'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Finlily Technology',
    subtitle: 'Financial Software Solutions',
    link: 'https://finlilytechnology.com/',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'The Saje',
    subtitle: 'Creative Brand Portfolio',
    link: 'https://www.thesaje.com/',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Parrish Bail Bonds',
    subtitle: 'Legal Services Platform',
    link: 'https://parrishbailbonds.com/',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',

  },
  {
    id: 4,
    title: 'ChingPay',
    subtitle: 'Crypto Payments & Web3 Finance Platform',
    link: 'https://chingpay.razeprotocol.dev/',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'QAction Cafe',
    subtitle: 'Modern Restaurant & Cafe Website',
    link: 'https://qaction-cafe.vercel.app/',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Kamrun Trading',
    subtitle: 'Global Import & Export Business Website',
    link: 'https://www.kamruntrading.com/',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function FinestWorkSection() {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="max-w-2xl">
            <h2
              className="font-display font-bold text-[#0F172A] mb-4"
              style={{ fontSize: '35px' }}
            >
              Some of our <span className="text-[#ad0693]">Finest Work</span>
            </h2>
            <p
              className="text-[#475569] leading-relaxed"
              style={{ fontSize: '16px' }}
            >
              Discover how we help businesses transform their digital presence through innovative technology and strategic design.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden border border-[rgba(59,130,246,0.12)] shadow-[0_10px_30px_rgba(59,130,246,0.08)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-slate-900 p-4 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-[#0F172A] text-[20px] mb-1 group-hover:text-[#ad0693] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#64748B] mb-4">{project.subtitle}</p>

                <div className="mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#ad0693] transition-colors"
                  >
                    Visit Our Work
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}