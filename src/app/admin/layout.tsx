import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

import AdminGuard from '@/components/auth/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="pt-24 min-h-screen bg-slate-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/80 to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        {children}
      </div>
    </AdminGuard>
  );
}
