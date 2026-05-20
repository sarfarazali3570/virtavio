'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: '01',
    label: 'Info Gathering',
    desc: 'Understanding your vision, requirements, and business objectives.',
    icon: FileText,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: '02',
    label: 'Planning',
    desc: 'Strategizing the project roadmap, architecture, and milestones.',
    icon: MessageSquare,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: '03',
    label: 'Design',
    desc: 'Crafting intuitive and aesthetically pleasing user experiences.',
    icon: PenTool,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: '04',
    label: 'Development',
    desc: 'Building scalable, secure, and high-performance solutions.',
    icon: Code2,
    color: 'from-indigo-600 to-blue-500'
  },
  {
    id: '05',
    label: 'Testing & Launch',
    desc: 'Rigorous quality assurance and seamless deployment to production.',
    icon: Rocket,
    color: 'from-blue-600 to-indigo-600'
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAFF] relative overflow-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold tracking-tight text-slate-900 mb-6">
              Our <span className="text-gradient">Workflow</span>
            </h2>
            <div className="w-20 h-1.5 bg-[image:var(--background-image-virtavio-gradient)] mx-auto rounded-full mb-8" />
            <p className="text-slate-600 leading-relaxed">
              A meticulously crafted journey from initial concept to high-performance reality.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-0.5 bg-slate-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10 items-stretch">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative group flex flex-col h-full"
                >
                  {/* Icon Sphere Wrapper */}
                  <div className="flex flex-col items-center mb-8 relative">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full`} />
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} p-[1px] shadow-2xl z-10`}>
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center transition-colors duration-500 group-hover:bg-transparent">
                          <Icon className={`w-8 h-8 transition-colors duration-500 group-hover:text-white ${index % 2 === 0 ? 'text-blue-600' : 'text-indigo-600'}`} />
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border-4 border-white shadow-lg z-20">
                        {step.id}
                      </div>
                    </div>

                    {/* Desktop Connecting Arrows */}
                    {index !== steps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-slate-300"
                        >
                          <ArrowRight className="w-6 h-6" strokeWidth={1} />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Content Card - Forced equal height with flex-1 */}
                  <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-white group-hover:border-blue-200/50 transition-all duration-500 text-center flex flex-col items-center">
                    <h3 className="font-bold text-slate-900 text-[24px] mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                      {step.label}
                    </h3>
                    <p className="text-slate-500 text-[16px] leading-relaxed flex-1">
                      {step.desc}
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-6 pt-4 border-t border-slate-50 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className={`text-[10px] font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${step.color}`}>
                        Phase {step.id}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}