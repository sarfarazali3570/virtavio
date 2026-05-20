'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { signupSchema } from '@/lib/validation/schemas';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirm_password: formData.get('confirm_password') as string,
    };

    const result = signupSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        data: {
          full_name: result.data.full_name,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    toast.success('Account created successfully! Welcome to Virtavio.');
    router.push('/');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg z-10"
      >
        {/* Card */}
        <div className="glass-card p-10 md:p-14 border-[rgba(59,130,246,0.15)] shadow-[0_30px_80px_rgba(59,130,246,0.12)] bg-white/90 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block group mb-6">
              <div className="w-16 h-16 rounded-2xl bg-virtavio-gradient flex items-center justify-center mx-auto shadow-xl shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-display font-bold text-3xl">V</span>
              </div>
            </Link>
            <h1 className="text-3xl font-display font-bold text-[#0F172A] tracking-tight">Create Account</h1>
            <p className="mt-3 text-[#475569] font-medium">Join the next generation of solutions</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="full_name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              error={errors.full_name}
              required
              className="bg-white/50 border-[rgba(59,130,246,0.15)] focus:border-primary"
            />

            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              error={errors.email}
              required
              className="bg-white/50 border-[rgba(59,130,246,0.15)] focus:border-primary"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="••••••••"
                  error={errors.password}
                  required
                  className="bg-white/50 border-[rgba(59,130,246,0.15)] focus:border-primary"
                />
              </div>
              <div className="relative">
                <Input
                  name="confirm_password"
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="••••••••"
                  error={errors.confirm_password}
                  required
                  className="bg-white/50 border-[rgba(59,130,246,0.15)] focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Hide Passwords
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Show Passwords
                  </>
                )}
              </button>
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full py-4 text-lg">
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center">
            <p className="text-[#475569] font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-bold inline-flex items-center gap-1 group">
                Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
