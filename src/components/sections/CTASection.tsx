'use client';

import { motion } from 'framer-motion';
import { Check, ChevronDown, Sparkles, Clock, ShieldCheck, UserCheck } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Premium Ambient Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ad0693]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* LEFT CONTENT: The Human Connection */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-6"
            >
            </motion.div>

            <h2
              id="cta-heading"
              className="font-bold text-[#0F172A] leading-[1.1] mb-8"
              style={{ fontSize: '35px' }}
            >
              Ready to Transform Your <br />
              <span className="text-[#ad0693]">Digital Presence?</span>
            </h2>

            <p className="text-[#475569] mb-10 leading-relaxed max-w-md" style={{ fontSize: '18px' }}>
              Whether you need AI automation, a stunning website, or a full-funnel marketing strategy, we're your single partner for end-to-end excellence.
            </p>

            {/* Feature Cards for Trust */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-10">
              {[
                {
                  icon: <Clock className="w-4 h-4" />,
                  text: "24h Response Time",
                },
                {
                  icon: <ShieldCheck className="w-4 h-4" />,
                  text: "Full Security Audit",
                },
                {
                  icon: <UserCheck className="w-4 h-4" />,
                  text: "Direct Lead Access",
                },
                {
                  icon: <Sparkles className="w-4 h-4" />,
                  text: "Tailored Roadmap",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-[#ad0693]/20 hover:shadow-md transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#ad0693] shrink-0">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <span className="text-[11px] sm:text-sm font-semibold text-slate-700 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Support Details for Human Touch */}
            <div className="pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Direct Support</p>
              <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-600">
                <a href="tel:8910364760" className="hover:text-[#ad0693] transition-colors">8910364760</a>
                <a href="mailto:support@virtavio.in" className="hover:text-[#ad0693] transition-colors">support@virtavio.in</a>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: Premium Glassmorphism Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative Element */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-[#ad0693] to-pink-400 rounded-3xl rotate-12 blur-3xl opacity-20" />

            <form className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#0F172A]">Start Your Project</h3>
                <p className="text-sm text-slate-500 mt-1">Fill in the details for a senior consultation.</p>
              </div>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full text-sm px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-[#ad0693]/30 focus:ring-4 focus:ring-[#ad0693]/5 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full text-sm px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-[#ad0693]/30 focus:ring-4 focus:ring-[#ad0693]/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Service Required</label>
                  <div className="relative">
                    <select className="w-full text-sm px-5 py-4 rounded-2xl bg-slate-50 border-transparent appearance-none focus:bg-white focus:border-[#ad0693]/30 outline-none cursor-pointer">
                      <option>AI Integration & Automation</option>
                      <option>Web Development & UI/UX</option>
                      <option>Search Engine Ecosystem (SEO)</option>
                      <option>Performance Marketing</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Brief</label>
                  <textarea
                    placeholder="Tell us about your goals..."
                    className="w-full text-sm px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-[#ad0693]/30 focus:ring-4 focus:ring-[#ad0693]/5 transition-all outline-none h-32 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 rounded-2xl text-sm font-black uppercase tracking-[0.15em] text-white bg-[#ad0693] shadow-[0_15px_30px_rgba(173,6,147,0.25)] hover:shadow-[0_20px_40px_rgba(173,6,147,0.35)] hover:-translate-y-1 transition-all active:scale-[0.98]"
                >
                  Request Consultation
                </button>

                <p className="text-[10px] text-center text-slate-400 italic">
                  By submitting, you agree to our 2026 data privacy standards.
                </p>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}