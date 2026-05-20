'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message received. Our team will reach out shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@virtavio.in',
      desc: 'Typical response: 2 hours',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8910364760',
      desc: 'Mon-Fri, 9am - 6pm IST',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: 'Kolkata, WB',
      desc: 'Innovation Hub, Sector V',
    }
  ];

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      {/* Premium Header Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4">
              Contact Us
            </h2>
            <h1 className="text-4xl md:text-7xl font-display font-medium text-slate-900 tracking-tight leading-[1.1]">
              Let's build something <span className="text-slate-400 font-light italic">extraordinary</span>.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-sm md:text-base max-w-xs leading-relaxed font-medium"
          >
            We combine human intuition with AI precision to solve your most complex digital challenges.
          </motion.p>
        </div>
      </section>

      {/* Info & Form Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Left Side: Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-8 rounded-3xl border border-slate-100 bg-white transition-all duration-500 hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-5 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                      <info.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 group-hover:text-blue-600 transition-colors">
                      {info.label}
                    </span>
                  </div>
                  <p className="text-xl font-display font-semibold text-slate-900 mb-1">{info.value}</p>
                  <p className="text-sm text-slate-500 font-medium">{info.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* <div className="hidden lg:block p-8 rounded-[2rem] bg-slate-900 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-xl font-display font-medium mb-2">Global Vision?</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Our AI experts are available for international consulting and long-term partnerships.</p>
                <div className="flex items-center text-xs font-bold tracking-widest uppercase text-blue-400">
                  View Case Studies <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[80px] rounded-full" />
            </div> */}
          </div>

          {/* Right Side: Modern Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white p-1 md:p-2"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g. Julianne Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-300 placeholder:font-normal"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="hello@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-300 placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-300 placeholder:font-normal"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project or vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-300 placeholder:font-normal resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="group w-full md:w-auto px-12 py-6 bg-slate-900 text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/10"
              >
                {isSubmitting ? 'Syncing...' : (
                  <span className="flex items-center gap-3">
                    Send Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

        </div>
      </section>
    </main>
  );
}