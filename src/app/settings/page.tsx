'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Save, Bell, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthProvider';

export default function SettingsPage() {
  const { user, profile, loading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');

  // Sync local form state when profile arrives from context.
  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-[#0F172A] mb-2">Account Settings</h1>
          <p className="text-[#475569]">Manage your profile and account preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-primary/10 text-primary font-semibold shadow-sm">
              <User className="w-5 h-5" />
              General
            </button>
            {/* <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-white transition-all">
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-white transition-all">
              <Lock className="w-5 h-5" />
              Security
            </button> */}
          </div>

          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 bg-white border-white shadow-sm"
            >
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-virtavio-gradient flex items-center justify-center text-white text-2xl font-bold">
                      {fullName ? fullName[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                    </div>
                    <Button variant="outline" size="sm" type="button">Change Photo</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={profile?.role || 'user'}
                        disabled
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed outline-none capitalize"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <Button type="submit" disabled={saving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-rose-50/50 border border-rose-100"
            >
              <h3 className="text-lg font-bold text-rose-900 mb-2">Danger Zone</h3>
              <p className="text-rose-700/80 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50">
                Delete Account
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
