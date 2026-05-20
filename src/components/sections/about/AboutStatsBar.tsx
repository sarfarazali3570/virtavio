'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.001
  });
  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { numericValue: 12, suffix: 'k+', label: 'Projects Launched' },
  { numericValue: 250, suffix: '+', label: 'Enterprise Clients' },
  { numericValue: 3.5, suffix: 's', label: 'Avg Response Time', isFloat: true },
  { numericValue: 15, suffix: '+', label: 'Years Expertise' },
];

export default function AboutStatsBar() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Minimal Premium Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-sm font-bold tracking-[0.3em] text-blue-600 uppercase mb-4"
          >
            Our Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-medium text-slate-900 leading-[1.1] tracking-tight"
          >
            Measured by the success of our global partners.
          </motion.p>
        </div>

        {/* Grid: grid-cols-2 for mobile (2 rows), lg:grid-cols-4 for desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "circOut" }}
              className="group relative"
            >
              <div className="p-6 md:p-10 rounded-2xl bg-white border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-slate-200 h-full flex flex-col justify-center">

                {/* Subtle Accent Line */}
                <div className="w-6 md:w-8 h-[2px] bg-blue-600 mb-6 md:mb-8 transition-all duration-500 group-hover:w-12 md:group-hover:w-16" />

                <h3 className="text-2xl md:text-5xl font-display font-semibold text-slate-900 mb-2 md:mb-3 tracking-tighter">
                  {stat.isFloat ? (
                    <span className="flex items-baseline">
                      <CountUp value={stat.numericValue} />
                      <span className="text-lg md:text-2xl ml-0.5">{stat.suffix}</span>
                    </span>
                  ) : (
                    <CountUp value={stat.numericValue} suffix={stat.suffix} />
                  )}
                </h3>

                <p className="text-[9px] md:text-[12px] font-semibold text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.2em] transition-colors duration-300 group-hover:text-slate-600 leading-tight">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}