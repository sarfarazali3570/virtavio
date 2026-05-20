'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { loginSchema } from '@/lib/validation/schemas';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
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
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single();

    toast.success('Welcome back!');

    if (profile?.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }

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
        className="relative w-full max-w-md z-10"
      >
        {/* Card */}
        <div className="glass-card p-10 md:p-14 border-[rgba(59,130,246,0.15)] shadow-[0_30px_80px_rgba(59,130,246,0.12)] bg-white/90 backdrop-blur-xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block group mb-6">
              <div className="w-16 h-16 rounded-2xl bg-virtavio-gradient flex items-center justify-center mx-auto shadow-xl shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-display font-bold text-3xl">V</span>
              </div>
            </Link>
            <h1 className="text-3xl font-display font-bold text-[#0F172A] tracking-tight">Welcome Back</h1>
            <p className="mt-3 text-[#475569] font-medium">Sign in to manage your workspace</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="admin@virtavio.com"
              error={errors.email}
              required
              className="bg-white/50 border-[rgba(59,130,246,0.15)] focus:border-primary"
            />
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <Link href="#" className="text-primary font-bold hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full py-4 text-lg">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center">
            <p className="text-[#475569] font-medium">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline font-bold inline-flex items-center gap-1 group">
                Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
