'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { leadSchema } from '@/lib/validation/schemas';
import toast from 'react-hot-toast';

// Budget options removed in favor of direct input

const serviceOptions = [
  { value: 'custom-dev', label: 'Website Development' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'ai', label: 'AI Integration' },
  { value: 'saas', label: 'SaaS Platform' },
  { value: 'cloud', label: 'Cloud & Security' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  { value: 'others', label: 'Others' },
];

export default function GetQuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      company: fd.get('company') as string,
      service: fd.get('service') as string,
      budget: fd.get('budget') as string,
      message: fd.get('message') as string
    };
    const result = leadSchema.safeParse(data);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((i) => { fe[i.path[0] as string] = i.message; });
      setErrors(fe);
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result.data) });
      if (!res.ok) throw new Error();
      toast.success('Quote request submitted!');
      (e.target as HTMLFormElement).reset();
    } catch { toast.error('Something went wrong.'); }
    finally { setIsSubmitting(false); }
  }

  return (
    <div className="pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-virtavio-glow opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Get a Quote</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-bold tracking-tight">Tell Us About Your <span className="text-gradient">Project</span></h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">Share your requirements and we&apos;ll get back with a detailed proposal.</p>
          </motion.div>
        </div>
      </section>
      <section className="pb-28 max-w-2xl mx-auto px-6 lg:px-8">
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input name="name" label="Full Name" placeholder="John Doe" error={errors.name} required />
            <Input name="email" label="Email" type="email" placeholder="john@company.com" error={errors.email} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input name="phone" label="Phone" placeholder="+1 234 567 890" />
            <Input name="company" label="Company" placeholder="Acme Inc." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select name="service" label="Service" options={serviceOptions} />
            <Input name="budget" label="Budget" placeholder="e.g. $10,000" />
          </div>
          <Textarea name="message" label="Project Details" placeholder="Describe your project..." rows={5} error={errors.message} required />
          <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
            <Send className="w-4 h-4 mr-2" /> Request a Quote
          </Button>
        </motion.form>
      </section>
    </div>
  );
}
