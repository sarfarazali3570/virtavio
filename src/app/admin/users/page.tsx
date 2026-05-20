'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, Filter, MoreHorizontal, Mail, Calendar, 
  Users, ShieldCheck, Loader2, UserPlus, 
  ArrowUpRight, UserCheck, UserX, Crown, ArrowLeft
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'sonner';

const supabase = createClient();

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
  avatar_url?: string | null;
}

export default function AdminUsersPage() {
  const { user: currentUser, profile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    if (currentUser) fetchUsers();
  }, [currentUser, profile]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Fetch from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      toast.error('Failed to synchronize user records.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = (user.full_name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const emailMatch = (user.email || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = nameMatch || emailMatch;
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const updateRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`User role updated to ${newRole}`);
    } catch (err: any) {
      toast.error('Failed to update user role');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/admin" className="flex items-center gap-2 text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors mb-4 group">
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-[0.2em]">
              User Management
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold text-[#0F172A]">Directory</h1>
          <p className="mt-2 text-slate-500 font-medium">Oversee and manage roles for all registered users on the platform.</p>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0F172A]">{users.length}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Registered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white p-4 mb-8 flex flex-col lg:flex-row items-center justify-between gap-4 border border-slate-100 rounded-[2rem] shadow-sm"
      >
        <div className="relative w-full lg:w-[450px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-primary/50 outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer uppercase tracking-wider"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Users List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing User Base...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[500px] text-center px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
              <UserX className="w-10 h-10 text-slate-200" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">No users found</h2>
            <p className="text-slate-500 mt-2 max-w-xs font-medium">We couldn't find any users matching your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Identity</th>
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Access Level</th>
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Joined</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-virtavio-gradient flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">
                          {u.full_name ? u.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : (u.email?.[0] || 'U').toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.full_name || 'Incomplete Profile'}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                              u.role === 'admin' ? 'bg-amber-100 text-amber-700' :
                              u.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {u.role || 'user'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Mail className="w-4 h-4 text-slate-300" />
                        {u.email || 'No Email Record'}
                      </div>
                    </td>
                    <td className="p-6">
                      <select 
                        value={u.role || 'user'}
                        onChange={(e) => updateRole(u.id, e.target.value)}
                        className={`text-[10px] font-bold px-4 py-1.5 rounded-full border outline-none cursor-pointer uppercase tracking-widest transition-all ${
                          u.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          u.role === 'vendor' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-slate-50 text-slate-500 border-slate-100'
                        }`}
                      >
                        <option value="user">Standard User</option>
                        <option value="vendor">Vendor Agent</option>
                        <option value="admin">System Admin</option>
                      </select>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Calendar className="w-4 h-4 text-slate-300" />
                        {new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
