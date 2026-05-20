'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

const ADMIN_EMAILS = ['aryansaha7914@gmail.com', 'aryasaha7914@gmail.com'];

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Don't decide until auth is resolved.
    if (loading) return;

    const email = user?.email ?? '';
    const role = profile?.role ?? null;
    const isEmailAdmin = ADMIN_EMAILS.includes(email);
    const isAdmin = role === 'admin' || isEmailAdmin;
    const isVendor = role === 'vendor';
    
    // Both admins and vendors can access the management dashboard
    const hasAccess = isAdmin || isVendor;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (hasAccess) {
      setAuthorized(true);
    } else {
      console.warn('[AdminGuard] Unauthorized access attempt:', { email, role });
      router.replace('/');
    }

    setChecked(true);
  }, [loading, user, profile, router]);

  if (loading || !checked || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Verifying access permissions...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
