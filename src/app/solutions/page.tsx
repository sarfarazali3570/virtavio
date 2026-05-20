'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cloud, LayoutGrid, Zap, ArrowRight, Sparkles, Users, Globe } from 'lucide-react';
import Link from 'next/link';

const solutionCategories = [
  {
    id: 'cloud',
    title: "Cloud Solutions",
    description: "Elastic infrastructure that grows with your ambition.",
    icon: Cloud,
    gradient: "from-blue-500/20 to-indigo-600/20",
    accent: "text-blue-600",
    items: ["Hybrid Cloud", "Private Cloud", "Managed Services", "Cloud Consulting", "AWS/Azure Mastery"]
  },
  {
    id: 'erp',
    title: "ERP Systems",
    description: "The nervous system of your digital enterprise.",
    icon: LayoutGrid,
    gradient: "from-violet-500/20 to-purple-600/20",
    accent: "text-purple-600",
    items: ["HR & Payroll", "Manufacturing", "Modern CRM", "Supply Chain", "Automated Finance"]
  },
  {
    id: 'business',
    title: "Enablement",
    description: "Connecting you to your customers, everywhere.",
    icon: Zap,
    gradient: "from-pink-500/20 to-rose-600/20",
    accent: "text-pink-600",
    items: ["WhatsApp AI Bots", "Omnichannel SMS", "Secure Voice", "Digital Signing", "DNS Management"]
  }
];

export default function SolutionsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Fixed: Added the missing toggleCategory function
  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="pt-20 bg-[#fafafa] min-h-screen font-sans selection:bg-violet-100 selection:text-violet-900">

      {/* Hero Section */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Global network and digital connectivity"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/80" />

          {/* Subtle Radial Glow to keep the 'human' center soft */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-50 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Adjusted text colors for dark background: white and light slate */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              Engineering for the <br />
              <span className="italic font-serif text-slate-300">Human Experience</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Interactive Solutions Section */}
      <section className="py-12 pb-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {solutionCategories.map((category, i) => {
            const Icon = category.icon;
            const isOpen = activeCategory === category.id;
            const isAnyOpen = activeCategory !== null;

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isAnyOpen && !isOpen ? 0.6 : 1,
                  scale: isAnyOpen && !isOpen ? 0.98 : 1,
                  y: 0
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                  delay: i * 0.1
                }}
                className={`group relative rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden
                  ${isOpen ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 hover:border-violet-200 hover:shadow-xl shadow-sm'}
                `}
                onClick={() => toggleCategory(category.id)}
              >
                <div className="p-10">
                  <motion.div
                    layout="position"
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white mb-8 shadow-lg transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  <motion.div layout="position" className="flex items-center justify-between">
                    <h3 className={`text-2xl font-display font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-900'}`}>
                      {category.title}
                    </h3>
                    <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-180 text-white' : 'text-slate-400 group-hover:text-violet-500'}`} />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-10 space-y-5">
                          {category.items.map((item, idx) => (
                            <motion.div
                              key={item}
                              initial={{ x: -15, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: idx * 0.07, ease: "easeOut" }}
                              className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group/item"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 shrink-0 shadow-[0_0_10px_rgba(236,72,153,0.3)]" />
                              <span className="text-base font-medium tracking-wide">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* New Section: The Human Edge (Image + Text) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-violet-100/50 rounded-[3rem] -rotate-2" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                alt="Our collaborative process"
                className="relative rounded-[2.5rem] object-cover h-[500px] w-full shadow-2xl"
              />
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[200px]">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">Our Philosophy</p>
                <p className="text-sm text-slate-900 font-medium italic">"Technology is most powerful when it becomes invisible."</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Beyond the code, we build <span className="text-violet-600">partnerships.</span>
              </h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                Many firms can build an app; few can architect a legacy. We work as an extension of your team, ensuring that every cloud migration or ERP deployment aligns with your human culture and business objectives.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900">User-Centric</h4>
                  <p className="text-sm text-slate-500">We design for the people who actually use the tools.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900">Scalability</h4>
                  <p className="text-sm text-slate-500">Infrastructure that breathes and expands with you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Impact Stats (Clean & Minimal) */}
      <section className="py-20 border-y border-slate-100 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Deployments", val: "500+" },
              { label: "Uptime SLA", val: "99.9%" },
              { label: "Countries", val: "12+" },
              { label: "Security Audits", val: "Weekly" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.val}</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refined CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-slate-950 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Let's start a conversation <br />
                <span className="text-slate-400 font-light">about your future.</span>
              </h2>
              <Link href="/contact" className="group relative inline-flex items-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-10 py-5 bg-white text-slate-950 rounded-full font-bold transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center gap-3">
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}