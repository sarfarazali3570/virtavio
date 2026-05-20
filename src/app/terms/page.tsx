import React from 'react';

export default function TermsOfService() {
  return (
    <div className="pt-20 bg-white">
      <section className="relative overflow-hidden py-24">

        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_30%)]" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            {/* <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-50 to-violet-50 border border-pink-100 text-pink-600 text-sm font-semibold mb-6">
              📄 Legal Information
            </div> */}

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Terms of{' '}
              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              Please read these terms carefully before using Virtavio’s services and platform.
            </p>

            <div className="mt-6 inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-500 shadow-sm">
              Last updated: May 04, 2026
            </div>
          </div>

          {/* Content Card */}
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(168,85,247,0.08)]">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 sm:p-12 lg:p-14 space-y-12">

              {[
                {
                  title: '1. Agreement to Terms',
                  content:
                    "By accessing or using Virtavio's website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our website or services.",
                },
                {
                  title: '2. Intellectual Property Rights',
                  content:
                    "Unless otherwise indicated, all content, software, branding, visuals, text, graphics, and functionality on Virtavio are protected by intellectual property laws and remain the property of Virtavio and its licensors.",
                },
                {
                  title: '3. Use License',
                  content:
                    "Permission is granted to temporarily access the materials on Virtavio’s website for personal, non-commercial viewing only. Under this license, you may not:",
                  list: [
                    'Modify or copy the materials.',
                    'Use materials for commercial purposes.',
                    'Attempt to reverse engineer any software.',
                    'Remove copyright or proprietary notices.',
                  ],
                },
                {
                  title: '4. Disclaimer',
                  content:
                    "All materials and services are provided on an 'as is' basis without warranties of any kind. Virtavio disclaims all implied warranties including merchantability and fitness for a particular purpose.",
                },
                {
                  title: '5. Limitation of Liability',
                  content:
                    "Virtavio shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services or platform.",
                },
                {
                  title: '6. Governing Law',
                  content:
                    'These terms are governed by and interpreted in accordance with applicable laws and regulations.',
                },
                {
                  title: '7. Changes to Terms',
                  content:
                    'We reserve the right to update or modify these Terms of Service at any time. Continued use of our services after changes means you accept the revised terms.',
                },
                {
                  title: '8. Contact Us',
                  content:
                    'If you have questions regarding these Terms of Service, please contact our team at hello@virtavio.com.',
                },
              ].map((section, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl border border-slate-100 bg-gradient-to-r from-white to-pink-50/30 p-8 shadow-sm"
                >

                  {/* Number Badge */}
                  <div className="absolute -top-5 left-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm font-bold shadow-lg">
                      {i + 1}
                    </div>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-5 pt-3">
                    {section.title}
                  </h2>

                  <p className="text-slate-600 leading-relaxed text-[16px]">
                    {section.content}
                  </p>

                  {section.list && (
                    <div className="mt-6 grid gap-4">
                      {section.list.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 rounded-2xl border border-pink-100 bg-white px-5 py-4"
                        >
                          <div className="mt-1 h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex-shrink-0" />

                          <p className="text-slate-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}