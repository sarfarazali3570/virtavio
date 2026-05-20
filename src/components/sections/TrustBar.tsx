'use client';

import React from 'react';
import { motion } from 'framer-motion';

const techPartners = [
  'Google Cloud', 'Microsoft', 'OpenAI',
  'Anthropic', 'Meta AI', 'NVIDIA',
  'AWS', 'Hugging Face'
];

export default function TrustBar() {
  return (
    <section className="py-16 bg-white border-y border-slate-50 overflow-hidden relative">
      {/* Background Subtle Detail */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ad0693]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Human-centric subheader */}
        <div className="flex flex-col items-center mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ad0693] mb-2"
          >
            Our Technology Ecosystem
          </motion.p>

        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center overflow-hidden h-12">
          {/* Fading Edge Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Infinite Scroll Wrapper */}
          <motion.div
            className="flex gap-16 md:gap-24 whitespace-nowrap items-center"
            animate={{ x: [0, -1035] }} // Adjust value based on logo count/width
            transition={{
              repeat: Infinity,
              duration: 50,
              ease: "linear"
            }}
          >
            {[...techPartners, ...techPartners, ...techPartners].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="group cursor-default"
              >
                <span className="text-xl md:text-2xl font-bold text-slate-300 transition-colors duration-500 group-hover:text-[#ad0693] font-display tracking-tight">
                  {logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}