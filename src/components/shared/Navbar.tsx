'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthProvider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About Us', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];

const toolLinks = [
  { label: 'AI Prompt Generator', href: '/tools/ai-prompts' },
  { label: 'Image Compressor', href: '/tools/image-compressor' },
  { label: 'Domain & Hosting', href: '/tools/domain-hosting' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, profile, signOut } = useAuth();

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] border-b border-slate-100 py-3'
          : 'bg-white py-5 shadow-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:rotate-6">
              <span className="bg-gradient-to-r from-purple-500 to-[#ff00d7] bg-clip-text text-transparent font-display font-bold text-2xl">V</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              <span className="text-black">VIRTAVIO</span>
              {/* <span className="text-[#0F172A]">avio</span> */}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 bg-white/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/50 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                  pathname === link.href
                    ? 'text-primary bg-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/50'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button
                className={cn(
                  'flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                  pathname.startsWith('/tools')
                    ? 'text-primary bg-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/50'
                )}
              >
                Tools
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', toolsOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-[rgba(59,130,246,0.12)] rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.12)] p-2 overflow-hidden"
                  >
                    {toolLinks.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#475569] hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary" />
                        {tool.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Auth + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/get-quote"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full text-sm font-bold shadow-lg shadow-slate-900/10 transition-all active:scale-95 hover:-translate-y-0.5"
            >
              Get Quote
            </Link>
            {user ? (
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <div className="group relative">
                    <button
                      className="flex items-center gap-1 p-1 pr-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200/50 group"
                    >
                      <div className="w-9 h-9 rounded-full bg-virtavio-gradient flex items-center justify-center text-white font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                        {profile?.full_name
                          ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                          : user?.email?.[0].toUpperCase()}
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform" />
                    </button>

                    <div className="absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-2xl border border-[rgba(59,130,246,0.12)] rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.12)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-slate-700 truncate">{user.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}

                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                      >
                        <User className="w-4 h-4" />
                        Account Settings
                      </Link>

                      <div className="h-px bg-slate-50 my-1" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                {/* <Link href="/login" className="text-sm font-bold text-[#475569] hover:text-[#0F172A] transition-colors px-4">
                  Log In
                </Link>
                <Link href="/signup" className="btn-primary text-sm px-6 py-2.5">
                  Sign Up
                </Link> */}
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-white/50 border border-white/50 hover:bg-white transition-all shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-[#0F172A]" /> : <Menu className="w-6 h-6 text-[#0F172A]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)]"
          >
            <div className="px-6 py-8 space-y-2 pb-20"> {/* pb-20 ensures the bottom content isn't clipped */}
              {user && (
                <div className="flex items-center gap-4 px-5 py-4 mb-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-virtavio-gradient flex items-center justify-center text-white font-bold text-lg">
                    {profile?.full_name
                      ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                      : user?.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A]">{profile?.full_name || user?.email?.split('@')[0] || 'Virtavio User'}</p>
                    <p className="text-xs font-medium text-slate-500">{user.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block px-5 py-4 rounded-2xl text-base font-bold transition-all',
                    pathname === link.href
                      ? 'text-primary bg-primary/5 border border-primary/10'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-slate-100">
                <p className="px-5 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Tools</p>
                {toolLinks.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-5 py-4 rounded-2xl text-base font-semibold transition-all",
                      pathname === tool.href
                        ? "text-primary bg-primary/5"
                        : "text-[#475569] hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>

              <div className="pt-6 grid grid-cols-1 gap-3">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/settings"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-5 h-5 text-slate-400" />
                      Account Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-bold text-rose-600 hover:bg-rose-50 transition-all text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {/* <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center font-bold text-[#475569] bg-slate-50 rounded-2xl py-4"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center btn-primary py-4 rounded-2xl"
                    >
                      Sign Up
                    </Link> */}
                  </div>
                )}
              </div>

              <Link
                href="/get-quote"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center w-full py-4 bg-[#0F172A] text-white rounded-2xl text-base font-bold shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}