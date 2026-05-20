'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Cpu, Globe, BarChart3, Shield } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'Full-stack web & mobile applications built with modern tech stacks and scalable architecture.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Pixel-perfect interfaces crafted with user-centric research and design-system thinking.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    description: 'Intelligent automation, NLP pipelines, and ML-powered features for your products.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Globe,
    title: 'SaaS Platforms',
    description: 'End-to-end SaaS solutions with multi-tenant architecture and billing systems.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: BarChart3,
    title: 'Analytics & BI',
    description: 'Real-time dashboards and data visualization tools that turn data into decisions.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Shield,
    title: 'Cloud & Security',
    description: 'Infrastructure setup, DevOps automation, and enterprise-grade security audits.',
    gradient: 'from-cyan-500 to-sky-600',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-virtavio-glow opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Services</span>
          <h2 className="mt-3 font-display font-bold tracking-tight text-[#0F172A]">
            Solutions That{' '}
            <span className="text-gradient">Drive Growth</span>
          </h2>
          <p className="mt-5 text-[#475569] leading-relaxed">
            From concept to deployment, we deliver end-to-end digital solutions
            that transform businesses and create lasting value.
          </p>
        </motion.div>

        {/* Service Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative bg-white p-8 rounded-2xl border border-[rgba(59,130,246,0.12)] shadow-[0_8px_30px_rgba(59,130,246,0.08)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.16)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg mb-6`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-[24px] font-display font-semibold text-[#0F172A] mb-3">
                {service.title}
              </h3>
              <p className="text-[#475569] text-[16px] leading-relaxed">
                {service.description}
              </p>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
