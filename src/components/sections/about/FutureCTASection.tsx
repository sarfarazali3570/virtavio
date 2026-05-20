'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FutureCTASection() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] bg-[#F8FAFC] border border-[rgba(59,130,246,0.15)] p-12 md:p-20 overflow-hidden text-center shadow-[0_30px_80px_rgba(59,130,246,0.1)]">
          {/* Background UI Mockup Faded */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
             <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-64 bg-blue-500 rounded-3xl" />
                ))}
             </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0F172A] mb-6 tracking-tight">
              Ready to build the future?
            </h2>
            <p className="text-[#475569] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Join the hundreds of enterprises scaling their future on Virtavio AI stack. Experience the difference of premium intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/get-quote" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full font-bold shadow-[0_12px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all">
                Schedule a Demo
              </Link>
              <Link href="/contact" className="bg-white text-[#475569] border border-[rgba(59,130,246,0.15)] px-10 py-4 rounded-full font-bold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
