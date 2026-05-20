'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Arjun Mehta',
    content: `"Virtavio helped us modernize our digital infrastructure with exceptional precision. Their team delivered scalable solutions that significantly improved our operational efficiency."`,
  },

  {
    name: 'Priya Sharma',
    content: `"From strategy to execution, the Virtavio team was incredibly professional and responsive. Their AI automation solutions transformed the way we engage with customers."`,
  },

  {
    name: 'Rahul Verma',
    content: `"Working with Virtavio felt like partnering with a future-ready technology company. Their expertise in cloud and digital transformation exceeded our expectations."`,
  }
];

export default function TestimonialsSection() {
  const [activeReview, setActiveReview] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 3000); // Autoslide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50/30 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-[#0F172A] leading-tight mb-6">
              Our Client’s Reviews
            </h2>
            <p className="text-[#475569] text-lg font-medium leading-relaxed max-w-lg">
              At Virtavio, we value our clients and their feedback. Our goal is to deliver exceptional service that drives measurable business growth.
            </p>
          </div>
          <div className="bg-[#0F172A] rounded-[2rem] p-8 md:p-10 grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-nowrap gap-8 md:gap-12 shadow-[0_20px_50px_rgba(15,23,42,0.3)] border border-white/5 w-full lg:w-auto justify-center">
            {[
              { value: "400+", label: "GLOBAL EMPLOYEES" },
              { value: "50+", label: "AWARDS WON" },
              { value: "200%", label: "AVG ROI" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start">
                <p
                  className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"
                  style={{ color: '#ffffff' }}
                >
                  {item.value}
                </p>
                <p
                  className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center sm:text-left"
                  style={{ color: '#ffffff' }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS GRID / CAROUSEL */}
        <div className="relative overflow-hidden md:overflow-visible">
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-10 flex flex-col group h-full min-h-[320px]"
            >
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-bold text-[#0F172A]">
                  {reviews[activeReview].name}
                </h4>
                <div className="w-11 h-11 rounded-full bg-[#E0E7FF] flex items-center justify-center border-4 border-white shadow-sm">
                  <div className="w-4 h-4 bg-[#6366F1] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </div>
              </div>

              <div className="flex gap-1.5 mb-8">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]"
                  />
                ))}
              </div>

              <p className="text-[#475569] text-base leading-relaxed font-medium flex-1 italic">
                {reviews[activeReview].content}
              </p>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReview(i)}
                  className={`w-2 h-2 rounded-full transition-all ${activeReview === i ? 'w-6 bg-[#6366F1]' : 'bg-slate-200'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 flex flex-col group h-full"
              >
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-lg font-bold text-[#0F172A]">
                    {review.name}
                  </h4>
                  <div className="w-11 h-11 rounded-full bg-[#E0E7FF] flex items-center justify-center border-4 border-white shadow-sm">
                    <div className="w-4 h-4 bg-[#6366F1] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  </div>
                </div>

                <div className="flex gap-1.5 mb-8">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]"
                    />
                  ))}
                </div>

                <p className="text-[#475569] text-base leading-relaxed font-medium flex-1 italic group-hover:text-[#0F172A] transition-colors">
                  {review.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}