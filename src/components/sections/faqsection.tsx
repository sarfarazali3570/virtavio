'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Mail, Phone, Globe } from 'lucide-react';

const faqs = [
    {
        question: "What does Virtavio actually do?",
        answer: "Virtavio designs and builds high-performance websites, brand identities, and digital experiences for growing businesses. We focus on creating a digital presence that is easy to manage and built to last."
    },
    {
        question: "How do projects typically start?",
        answer: "Every engagement begins with a discovery session where we learn about your business goals. We then provide a strategic roadmap and a clear project timeline."
    },
    {
        question: "What industries do you work with?",
        answer: "We partner with ambitious brands across E-commerce, Technology, Real Estate, and Professional Services who are looking to scale through better digital experiences."
    },
    {
        question: "Do you provide ongoing support after launch?",
        answer: "Yes. We offer continuous optimization, security updates, and performance monitoring to ensure your website remains a growth engine long after go-live."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Contact Card */}
                    <div className="lg:col-span-5">
                        <h2 className="font-bold text-[#0F172A] mb-4" style={{ fontSize: '35px' }}>
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#475569] mb-12" style={{ fontSize: '18px' }}>
                            Clear answers on how we work, what we build, and how engagements typically start.
                        </p>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-slate-100">
                            <h3 className="font-bold text-[#0F172A] mb-6 text-xl">Still have a question?</h3>
                            <p className="text-[#64748B] mb-8 text-sm">If you have a specific question not covered here, feel free to reach out — our team is here to help.</p>

                            <div className="space-y-5">
                                <a href="tel:8910364760" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-[#ad0693]/10 flex items-center justify-center text-[#ad0693]">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-700">8910364760</span>
                                </a>

                                <a href="mailto:support@virtavio.in" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">support@virtavio.in</span>
                                </a>

                                {/* <p className="text-xs text-center text-slate-400 mt-4 italic">General: info@virtavio.in</p> */}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-7 space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`border rounded-3xl transition-all duration-300 ${openIndex === index ? 'bg-white border-[#ad0693]/30 shadow-lg' : 'bg-transparent border-slate-200'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    className="w-full flex items-center justify-between p-7 text-left group"
                                >
                                    <span className={`font-bold transition-colors ${openIndex === index ? 'text-[#ad0693]' : 'text-[#0F172A]'}`} style={{ fontSize: '20px' }}>
                                        {faq.question}
                                    </span>
                                    <div className={`p-1.5 rounded-full transition-colors ${openIndex === index ? 'bg-[#ad0693] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-7 pb-7 text-[#475569] leading-relaxed border-t border-slate-50 pt-4" style={{ fontSize: '16px' }}>
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}