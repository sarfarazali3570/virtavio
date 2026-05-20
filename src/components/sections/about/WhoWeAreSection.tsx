'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Database, Code2 } from 'lucide-react';

const steps = [
  {
    id: 'gathering',
    label: 'Gathering',
    icon: Database,
    number: '01',
    title: 'Data Intelligence',
    color: 'from-blue-400 to-blue-600',
    shift: '-70%' // Increased left movement
  },
  {
    id: 'design',
    label: 'Design',
    icon: PenTool,
    number: '02',
    title: 'Design-First AI',
    color: 'from-blue-600 via-indigo-600 to-purple-600',
    shift: '0%' // Center
  },
  {
    id: 'develop',
    label: 'Develop',
    icon: Code2,
    number: '03',
    title: 'Rapid Deployment',
    color: 'from-purple-600 to-pink-600',
    shift: '70%' // Increased right movement
  }
];

export default function WhoWeAreSection() {
  const [activeTab, setActiveTab] = useState('design');

  const activeData = steps.find((s) => s.id === activeTab) || steps[1];
  const Icon = activeData.icon;

  return (
    <section className="py-24 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">Who we are</h2>
              <p className="text-gray-500 leading-relaxed">
                Founded in 2021 by a collective of researchers and cloud architects, Virtavio was born out of a simple observation: the tools of the future were too difficult to use today. We set out to create a platform that doesn't just process data, but understands intent.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-[rgba(59,130,246,0.15)] bg-white shadow-[0_10px_30px_rgba(59,130,246,0.06)] relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                <h3 className="font-bold text-[#0F172A] mb-3">Our Vision</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  To become the cognitive heartbeat of every digital interaction globally.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-[rgba(59,130,246,0.15)] bg-white shadow-[0_10px_30px_rgba(59,130,246,0.06)] relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
                <h3 className="font-bold text-[#0F172A] mb-3">Our Mission</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Empowering organizations with frictionless intelligence through ethical AI innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Engine */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.15)] p-4 sm:p-10 flex flex-col items-center justify-center min-h-[480px] overflow-hidden"
            >
              <h4 className="text-2xl font-display font-bold text-[#0F172A] mb-12 text-center">Our Core Engine</h4>

              <div className="relative flex flex-col items-center w-full transform scale-75 sm:scale-100 transition-transform duration-500">

                {/* Moving Container */}
                <motion.div
                  animate={{ x: activeData.shift }}
                  transition={{ type: "spring", stiffness: 80, damping: 18 }} // Smoother transition for long travel
                  className="relative flex flex-col items-center z-10"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                      className={`w-28 h-28 bg-gradient-to-br ${activeData.color} rounded-full flex items-center justify-center text-white shadow-[0_20px_40px_rgba(59,130,246,0.3)] relative`}
                    >
                      <Icon className="w-12 h-12" />
                      <div className="absolute -top-2 -right-2 bg-white text-blue-600 text-[12px] font-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-[rgba(59,130,246,0.15)]">
                        {activeData.number}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <motion.p
                    layout
                    className="mt-8 font-bold text-[#0F172A] text-xl whitespace-nowrap"
                  >
                    {activeData.title}
                  </motion.p>
                </motion.div>

                {/* Widened Static Background Path */}
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 -z-0 opacity-20"
                  viewBox="0 0 500 100"
                  preserveAspectRatio="none"
                >
                  <path d="M 0,50 Q 125,100 250,50 T 500,50" fill="none" stroke="url(#grad2)" strokeWidth="4" strokeDasharray="12 12" />
                  <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Interactive Navigation */}
              <div className="mt-16 flex gap-4 sm:gap-8">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveTab(step.id)}
                    className="relative px-2 py-1 group focus:outline-none"
                  >
                    <span className={`relative z-10 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === step.id ? 'text-blue-600' : 'text-[#64748B] hover:text-slate-900'
                      }`}>
                      {step.label}
                    </span>
                    {activeTab === step.id && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}