'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-purple-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h1 className="text-5xl md:text-7xl font-display font-bold text-[#0F172A] mb-8 tracking-tight">
            About <span className="text-gradient">Virtavio</span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              At Virtavio, our mission is to democratize high-intelligence infrastructure. We are building the foundational layers for the next decade of AI-powered commerce, providing scalable solutions that bridge the gap between complex neural computation and seamless human experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
