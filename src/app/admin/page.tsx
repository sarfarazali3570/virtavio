'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, FileText, MessageSquare, TrendingUp,
  ArrowUpRight, ShieldCheck, Activity, BarChart3,
  Globe, Clock, Target, Calendar, Loader2, AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

interface DashboardStats {
  totalLeads: number;
  totalUsers: number;
  totalBlogs: number;
  totalTestimonials: number;
  conversionRate: number;
  weeklyTraffic: number;
  trafficTrend: { date: string; visitors: number }[];
  serviceEngagement: { name: string; percentage: number; color: string }[];
  previousWeekTraffic: number;
}

const colors = ['bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-pink-500', 'bg-amber-500'];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        // 1. Fetch Total Leads
        const { count: leadsCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true });

        // 2. Fetch Total Users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // 3. Fetch Total Blogs
        const { count: blogsCount } = await supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true });

        // 4. Fetch Total Testimonials
        const { count: testimonialsCount } = await supabase
          .from('testimonials')
          .select('*', { count: 'exact', head: true });

        // 5. Fetch Conversion Rate (Status 'closed' vs total)
        const { count: closedLeads } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'closed');

        const conversionRate = leadsCount ? (Number(closedLeads) / Number(leadsCount)) * 100 : 0;

        // 4. Fetch Traffic Stats (Not used for primary graph now, but keeping for KPI)
        const { data: trafficData } = await supabase
          .from('traffic_stats')
          .select('date, visitors')
          .order('date', { ascending: false })
          .limit(30) as { data: { date: string; visitors: number }[] | null };

        const weeklyTraffic = trafficData?.slice(0, 7).reduce((acc: number, curr) => acc + (curr.visitors || 0), 0) || 0;

        // 5. User Growth Trend (Last 6 Months)
        const { data: allProfiles } = await supabase
          .from('profiles')
          .select('created_at')
          .order('created_at', { ascending: true });

        const userGrowthTrend = [];
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthLabel = date.toLocaleDateString('en-US', { month: 'short' });
          const year = date.getFullYear();
          const month = date.getMonth();

          // Last day of this month
          const lastDay = new Date(year, month + 1, 0, 23, 59, 59);

          // Count users created on or before the end of this month
          const cumulativeCount = allProfiles?.filter((p: any) => {
            const pDate = new Date(p.created_at);
            return pDate <= lastDay;
          }).length || 0;

          userGrowthTrend.push({
            date: monthLabel,
            visitors: cumulativeCount
          });
        }

        // 6. Service Engagement (From Leads)
        const { data: leadsServices } = await supabase
          .from('leads')
          .select('service_type');

        const serviceCounts: Record<string, number> = {};
        (leadsServices as { service_type: string | null }[])?.forEach((lead) => {
          const s = lead.service_type || 'Unknown';
          serviceCounts[s] = (serviceCounts[s] || 0) + 1;
        });

        const totalForServices = leadsServices?.length || 1;
        const serviceEngagement = Object.entries(serviceCounts)
          .map(([name, count], i) => ({
            name,
            percentage: Math.round((count / totalForServices) * 100),
            color: colors[i % colors.length]
          }))
          .sort((a, b) => b.percentage - a.percentage);

        setStats({
          totalLeads: leadsCount || 0,
          totalUsers: usersCount || 0,
          totalBlogs: blogsCount || 0,
          totalTestimonials: testimonialsCount || 0,
          conversionRate: Number(conversionRate.toFixed(1)),
          weeklyTraffic,
          trafficTrend: userGrowthTrend,
          serviceEngagement: serviceEngagement.length > 0 ? serviceEngagement : [
            { name: 'AI Integration', percentage: 0, color: 'bg-violet-500' },
            { name: 'Software Dev', percentage: 0, color: 'bg-blue-500' }
          ],
          previousWeekTraffic: usersCount ? Math.max(0, usersCount - 1) : 0
        });

      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load real-time analytics. Please check your database connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Synchronizing real-time data...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sync Error</h2>
        <p className="text-slate-500 text-center max-w-md mb-8">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const maxTraffic = Math.max(...(stats?.trafficTrend || []).map((d: { visitors: number }) => d.visitors), 1);
  const trafficDiff = stats.weeklyTraffic - (stats.weeklyTraffic * 0.85); // Simulated diff for visual

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Admin Control Center</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-[#0F172A]">Live Analytics</h1>
          <p className="mt-2 text-[#475569] font-medium">Real-time platform metrics synced with Supabase.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-6"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <Calendar className="w-4 h-4" />
            Live Data Feed
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-600">System Status: <span className="text-emerald-600">Optimal</span></span>
          </div>
        </motion.div>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/leads" className="block group">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 border-[rgba(59,130,246,0.1)] group-hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600"><TrendingUp className="w-6 h-6" /></div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md"><ArrowUpRight className="w-3 h-3" /> Live</span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Leads</p>
            <p className="text-3xl font-display font-bold text-[#0F172A]">{stats.totalLeads}</p>
          </motion.div>
        </Link>

        <Link href="/admin/users" className="block group">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 border-[rgba(59,130,246,0.1)] group-hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-violet-50 text-violet-600"><Users className="w-6 h-6" /></div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Real-time</span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Users</p>
            <p className="text-3xl font-display font-bold text-[#0F172A]">{stats.totalUsers}</p>
          </motion.div>
        </Link>

        {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 border-[rgba(59,130,246,0.1)]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600"><Globe className="w-6 h-6" /></div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md"><ArrowUpRight className="w-3 h-3" /> Updated</span>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Weekly Visitors</p>
          <p className="text-3xl font-display font-bold text-[#0F172A]">{(stats.weeklyTraffic / 1000).toFixed(1)}k</p>
        </motion.div> */}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 border-[rgba(59,130,246,0.1)]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-pink-50 text-pink-600"><FileText className="w-6 h-6" /></div>
            <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Posts</span>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Blogs</p>
          <p className="text-3xl font-display font-bold text-[#0F172A]">{stats.totalBlogs}</p>
        </motion.div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Traffic Trends Chart */}
        {/* User Growth Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 h-[450px] bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  User Growth
                </h3>
              </div>
              <p className="text-sm text-slate-500 ml-12">
                Users registered month by month
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-3xl font-bold tracking-tight text-slate-900">
                  {stats.totalUsers.toLocaleString()}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mt-1">
                Total Community
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 relative">
            {stats.trafficTrend.length > 0 ? (
              <div className="h-full flex items-end justify-between gap-3 px-2">
                {(() => {
                  const maxValue = Math.max(
                    ...stats.trafficTrend.map((item) => item.visitors),
                    1
                  );

                  return stats.trafficTrend.map((item, index) => {
                    const height = Math.max(
                      12,
                      (item.visitors / maxValue) * 220
                    );

                    const isLast =
                      index === stats.trafficTrend.length - 1;

                    return (
                      <div
                        key={index}
                        className="flex-1 h-full flex flex-col justify-end items-center group"
                      >
                        {/* Tooltip */}
                        <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-slate-900 text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow-lg">
                            {item.visitors}
                          </span>
                        </div>

                        {/* Bar */}
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height, opacity: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`w-full max-w-[48px] rounded-t-2xl transition-all duration-300 group-hover:scale-105 ${isLast
                              ? "bg-primary shadow-lg shadow-primary/20"
                              : "bg-primary/20 hover:bg-primary/40"
                            }`}
                        />

                        {/* Month Label */}
                        <div className="mt-3 flex flex-col items-center gap-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            {item.date}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-slate-200" />
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-slate-200" />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Synchronizing Analytics...
                </p>
              </div>
            )}
          </div>
        </motion.div>
        {/* Service Engagement Breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8 border-[rgba(59,130,246,0.1)]"
        >
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#0F172A]">Service Engagement</h3>
            <p className="text-sm text-slate-500 mt-1">Lead distribution by service type</p>
          </div>

          <div className="space-y-8">
            {stats.serviceEngagement.map((service, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-slate-600">{service.name}</span>
                  <span className="text-slate-900">{service.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${service.percentage}%` }}
                    transition={{ duration: 1.5, delay: 0.8 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full shadow-lg ${service.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 backdrop-blur-sm">
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              <span className="font-bold text-primary block mb-1">Live Insight:</span>
              {stats.serviceEngagement[0]?.percentage > 0
                ? `${stats.serviceEngagement[0].name} is currently your top performing service, driving ${stats.serviceEngagement[0].percentage}% of total lead volume.`
                : "Awaiting more lead data to generate service performance insights."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Administrative Tools */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-[#0F172A]">Management Tools</h2>
          <div className="h-px flex-1 bg-slate-100 mx-10 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Leads', href: '/admin/leads', count: stats.totalLeads, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Blogs', href: '/admin/blogs', count: stats.totalBlogs, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
            // { label: 'Testimonials', href: '/admin/testimonials', count: stats.totalTestimonials, icon: MessageSquare, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <Link
                href={link.href}
                className="group block glass-card p-8 border-[rgba(59,130,246,0.1)] hover:border-primary/30 hover:bg-white transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-[1.25rem] ${link.bg} ${link.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                    <link.icon className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-display font-bold text-[#0F172A]">{link.count}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Records</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-primary transition-colors mb-2">{link.label}</h3>
                <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                  Manage Now <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
