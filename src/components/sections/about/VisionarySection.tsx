'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const team = [
  {
    name: 'Dr. Elena Vance',
    role: 'CHIEF EXECUTIVE OFFICER',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
  },
  {
    name: 'Marcus Thorne',
    role: 'CHIEF TECHNOLOGY OFFICER',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Sarah Chen',
    role: 'HEAD OF PRODUCT AI',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
  },
  {
    name: 'David Okoro',
    role: 'DIRECTOR OF ENGINEERING',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
  },
];

export default function VisionarySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Meet the visionaries</h2>
            <p className="text-gray-500">The minds pushing the boundaries of what's possible.</p>
          </div>
          <Link href="/careers" className="hidden md:flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-pink-500 transition-colors">
            View All Careers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-4 rounded-[3rem] border border-[rgba(59,130,246,0.12)] shadow-[0_10px_30px_rgba(59,130,246,0.06)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 bg-slate-50 border border-[rgba(59,130,246,0.05)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="px-2 pb-2 text-center">
                <h3 className="text-xl font-display font-bold text-[#0F172A] mb-1">{member.name}</h3>
                <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
