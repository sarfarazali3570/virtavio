'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PromptArchitectSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-[#0F172A] mb-4">
            Try Our <span className="text-gradient">Prompt Architect</span>
          </h2>
          <p className="text-[#475569]">Experience the quality of our prompt tuning.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0B1021] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(11,16,33,0.4)] border border-gray-800"
        >
          {/* Mac window header */}
          <div className="bg-[#151B2E] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-xs text-gray-400 font-mono">
              virtavio_prompt_architect.sh
            </div>
          </div>

          <div className="grid md:grid-cols-2 p-6 gap-6">
            <div className="bg-white rounded-2xl p-6 relative shadow-[0_4px_16px_rgba(59,130,246,0.08)]">
              <p className="text-xs font-semibold text-[#64748B] mb-2 uppercase">Input Parameters</p>
              <textarea 
                className="w-full h-40 bg-transparent resize-none outline-none text-[#334155] text-sm placeholder:text-[#CBD5E1]"
                placeholder="Describe the desired output format and objective..."
                readOnly
              />
              <div className="absolute bottom-6 left-6 flex gap-3">
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-[0_6px_16px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_24px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 transition-all">
                  Generate
                </button>
                <button className="bg-blue-50 text-blue-600 text-xs font-semibold px-5 py-2.5 rounded-full border border-[rgba(59,130,246,0.15)] hover:bg-blue-100 transition-all">
                  Clear
                </button>
              </div>
            </div>

            <div className="bg-[#151B2E] rounded-2xl p-6 border border-gray-800 relative font-mono text-sm">
              <p className="text-pink-400 mb-4">ALPHA_PROMPT</p>
              <p className="text-gray-300 leading-relaxed mb-4">
                <span className="text-purple-400"># System:</span> You are an expert data modeller in AI tools. Create a structured JSON schema for a real-time IoT pipeline...
              </p>
              <p className="text-gray-500">
                // Previewing latest output...<br/>
                _
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
