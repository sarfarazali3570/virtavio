"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Bell,
  Mail,
  ArrowRight
} from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Introduction', icon: <FileText size={18} /> },
  { id: 'collection', title: 'Information Collection', icon: <Eye size={18} /> },
  { id: 'usage', title: 'Data Usage', icon: <Shield size={18} /> },
  { id: 'security', title: 'Security', icon: <Lock size={18} /> },
  { id: 'rights', title: 'Your Rights', icon: <Shield size={18} /> },
  // { id: 'changes', title: 'Policy Changes', icon: <Bell size={18} /> },
  { id: 'contact', title: 'Contact', icon: <Mail size={18} /> },
];

export default function PrivacyPolicy() {
  return (
    <div className="relative overflow-hidden bg-white min-h-screen pt-28 pb-24">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-pink-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Hero */}
        <div className="text-center mb-24">

          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-gradient-to-r from-pink-50 to-violet-50 px-5 py-2 text-sm text-pink-600 font-semibold mb-8"
          >
            🔒 Privacy & Security First
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-slate-900"
          >
            Privacy{' '}
            <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
              Policy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            We are committed to protecting your privacy, securing your data,
            and maintaining transparency in how your information is collected and used.
          </motion.p>

          <div className="mt-8 inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-500 shadow-sm">
            Last updated: May 04, 2026
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-12">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[32px] border border-slate-200 bg-white/80 backdrop-blur-xl p-5 shadow-xl">

              <div className="mb-5 px-3">
                <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400 font-semibold">
                  Quick Navigation
                </h3>
              </div>

              <nav className="space-y-2">
                {sections.map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.id}`}
                    className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-violet-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-pink-500">
                        {item.icon}
                      </div>

                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                        {item.title}
                      </span>
                    </div>

                    <ArrowRight
                      size={16}
                      className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-violet-500"
                    />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-10">

            {/* Intro */}
            <section
              id="intro"
              className="relative overflow-hidden rounded-[36px] border border-pink-100 bg-white p-10 md:p-14 shadow-[0_10px_60px_rgba(236,72,153,0.08)]"
            >

              <div className="absolute top-0 right-0 w-60 h-60 bg-pink-500/10 blur-3xl rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg">
                    <FileText size={26} />
                  </div>

                  <div>
                    <p className="text-pink-500 text-sm font-semibold uppercase tracking-[0.2em]">
                      Section 01
                    </p>

                    <h2 className="text-3xl font-black text-slate-900">
                      Introduction
                    </h2>
                  </div>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed">
                  Welcome to Virtavio. Your privacy and digital security matter deeply to us.
                  This policy explains how we collect, process, store, and protect your information.
                </p>
              </div>
            </section>

            {/* Collection */}
            <section
              id="collection"
              className="rounded-[36px] border border-violet-100 bg-gradient-to-br from-pink-50 to-violet-50 p-10 md:p-14 shadow-lg"
            >

              <div className="flex items-center gap-4 mb-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-pink-500 shadow-md">
                  <Eye size={26} />
                </div>

                <div>
                  <p className="text-pink-500 text-sm font-semibold uppercase tracking-[0.2em]">
                    Section 02
                  </p>

                  <h2 className="text-3xl font-black text-slate-900">
                    Information We Collect
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {[
                  'Inquiry & Quote Requests',
                  'Newsletter Subscriptions',
                  'Analytics & Performance Data',
                  'Customer Support Interactions'
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-white bg-white/80 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-pink-400 to-violet-500" />

                      <p className="text-slate-700 font-medium">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Usage */}
            <section
              id="usage"
              className="rounded-[36px] border border-pink-100 bg-white p-10 md:p-14 shadow-[0_10px_60px_rgba(168,85,247,0.08)]"
            >

              <div className="flex items-center gap-4 mb-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg">
                  <Shield size={26} />
                </div>

                <div>
                  <p className="text-violet-500 text-sm font-semibold uppercase tracking-[0.2em]">
                    Section 03
                  </p>

                  <h2 className="text-3xl font-black text-slate-900">
                    How We Use Data
                  </h2>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  'Improve platform experience',
                  'Optimize performance & analytics',
                  'Enhance customer support',
                  'Maintain platform security'
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 px-6 py-5"
                  >
                    <span className="text-slate-800 font-medium">
                      {item}
                    </span>

                    <span className="rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white font-bold">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-8">

              <section
                id="security"
                className="rounded-[36px] border border-pink-100 bg-white p-10 shadow-lg"
              >
                <Lock className="text-pink-500 mb-6" size={34} />

                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  Data Security
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  We use modern encryption and secure infrastructure
                  to protect your information and ensure platform safety.
                </p>
              </section>

              <section
                id="rights"
                className="rounded-[36px] border border-violet-100 bg-gradient-to-br from-pink-50 to-violet-50 p-10 shadow-lg"
              >
                <Shield className="text-violet-500 mb-6" size={34} />

                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  Your Rights
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  You have full control over your personal data,
                  including access, updates, deletion, and portability rights.
                </p>
              </section>
            </div>

            {/* CTA */}
            <section
              id="contact"
              className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 p-14 md:p-20 text-center shadow-[0_20px_80px_rgba(168,85,247,0.25)]"
            >

              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">

                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/10">
                  <Mail size={34} className="text-white" />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Have Questions?
                </h2>

                <p className="max-w-2xl mx-auto text-white/80 text-lg leading-relaxed mb-10">
                  Our privacy and compliance team is available to help you with any questions regarding your data.
                </p>

                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:hello@virtavio.com"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-violet-600 shadow-2xl transition-all duration-300"
                >
                  <Mail size={20} />
                  hello@virtavio.com
                </motion.a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}