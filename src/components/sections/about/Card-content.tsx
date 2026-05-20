'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BusinessTransformationSection() {
    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Changed to grid-cols-1 for mobile to prevent right-shift.
                   The 3-column layout only triggers on Large (lg) screens.
                */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1px_0.9fr] gap-12 lg:gap-16 items-start">

                    {/* Left Side: Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 md:space-y-8"
                    >
                        <h2
                            className="font-display font-bold text-slate-900 leading-tight tracking-tight text-[28px] md:text-[35px]"
                        >
                            Transforming businesses through <br className="hidden md:block" />
                            <span className="text-[#ad0693]">AI, cloud, and digital innovation</span>.
                        </h2>

                        <p
                            className="text-slate-500 leading-relaxed max-w-xl text-[16px]"
                        >
                            Virtavio combines strategic thinking with modern technology to help businesses scale. From AI-powered automation to custom cloud infrastructure, we build solutions tailored for long-term growth and efficiency.
                        </p>

                        <div className="pt-2">
                            <Link
                                href="/get-quote"
                                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-[#ad0693] hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>

                    {/* Vertical Divider - Hidden on mobile to save space */}
                    <div className="hidden lg:block w-full h-full min-h-[300px] bg-[#FF5A1F]/20" />

                    {/* Right Side: Quote & Subtext */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-between h-full space-y-8 lg:space-y-0"
                    >
                        <div className="space-y-6">
                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
                                    alt="Digital Innovation"
                                    className="w-full h-[320px] object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-6">
                                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-[0.15em] uppercase border border-white/20">
                                        Virtavio Solutions
                                    </span>

                                    <h3 className="mt-4 text-2xl font-bold text-white leading-tight">
                                        Building scalable digital experiences for modern businesses
                                    </h3>
                                </div>
                            </div>
                        </div>


                    </motion.div>

                </div>
            </div>
        </section>
    );
}