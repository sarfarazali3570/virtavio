'use client';

import React from 'react';
import { Bot, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerSection() {
  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-display font-bold text-[#0F172A] mb-4"
            style={{ fontSize: '35px' }}
          >
            Why Partner with <span className="text-[#ad0693]">Virtavio</span>
          </h2>
          <div className="h-1 w-24 bg-[#ad0693] mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI Expertise Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full bg-white border border-[rgba(59,130,246,0.12)] shadow-[0_10px_30px_rgba(59,130,246,0.08)] rounded-3xl p-6 md:p-8 flex items-start gap-4 md:gap-6 hover:shadow-[0_20px_50px_rgba(59,130,246,0.16)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(244,63,94,0.25)]">
              <Bot className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h3 className="text-[20px] md:text-[24px] font-bold text-[#0F172A] mb-2">AI Expertise</h3>
              <p
                className="text-[#475569] leading-relaxed"
                style={{
                  fontSize: '16px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  marginLeft: '2px',
                  marginRight: '2px'
                }}
              >
                Our team consists of PhD researchers and senior engineers from top-tier tech hubs, ensuring every solution is at the bleeding edge.
              </p>
            </div>
          </motion.div>

          {/* Cost Efficiency Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full bg-white border border-[rgba(59,130,246,0.12)] shadow-[0_10px_30px_rgba(59,130,246,0.08)] rounded-3xl p-6 md:p-8 flex items-start gap-4 md:gap-6 hover:shadow-[0_20px_50px_rgba(59,130,246,0.16)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(79,70,229,0.25)]">
              <LineChart className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h3 className="text-[20px] md:text-[24px] font-bold text-[#0F172A] mb-2">Cost Efficiency</h3>
              <p
                className="text-[#475569] leading-relaxed"
                style={{
                  fontSize: '16px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  marginLeft: '2px',
                  marginRight: '2px'
                }}
              >
                We optimize model selection and cloud usage to ensure high-performance AI doesn't come with a high-performance price tag.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}