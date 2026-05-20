'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar, Users, ShieldCheck, Download, Loader2, MessageSquare, Building2, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'sonner';

const supabase = createClient();

type LeadStatus = 'new' | 'contacted' | 'closed';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  service_type: string | null;
  budget: string | null;
  status: LeadStatus;
  created_at: string;
  vendor_id: string | null;
}

export default function AdminLeadsPage() {
  const { user, profile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const isAdmin = profile?.role === 'admin';
  const isVendor = profile?.role === 'vendor';

  useEffect(() => {
    if (user) fetchLeads();
  }, [user, profile]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

      // Multi-Vendor Filtering
      if (isVendor && !isAdmin) {
        query = query.eq('vendor_id', user?.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      toast.error('Failed to synchronize lead data.');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      toast.success(`Lead marked as ${newStatus}`);
    } catch (err: any) {
      toast.error('Failed to update status');
    }
  };

  const servicesList = useMemo(() => {
    const services = new Set(leads.map(l => l.service_type).filter(Boolean));
    return Array.from(services) as string[];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesService = serviceFilter === 'all' || lead.service_type === serviceFilter;
      
      return matchesSearch && matchesStatus && matchesService;
    });
  }, [leads, searchQuery, statusFilter, serviceFilter]);

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Company', 'Service', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(l => [
        l.full_name,
        l.email,
        l.company || 'N/A',
        l.service_type || 'N/A',
        l.status,
        new Date(l.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `virtavio_leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('Leads exported successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/admin" className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors mb-4 group">
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Back to Overview
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
                {isAdmin ? 'Global Pipeline' : 'Vendor Leads'}
              </span>
            </div>
          <h1 className="text-4xl font-display font-bold text-[#0F172A]">Inquiry Management</h1>
          <p className="mt-2 text-slate-500 font-medium">Manage and convert incoming opportunities from the Virtavio ecosystem.</p>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleExport}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm group"
          >
            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            Export CSV
          </motion.button>
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
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-primary/50 outline-none transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
              className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer uppercase tracking-wider"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer uppercase tracking-wider max-w-[140px]"
            >
              <option value="all">All Services</option>
              {servicesList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Leads Grid/Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing Pipeline...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[500px] text-center px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
              <MessageSquare className="w-10 h-10 text-slate-200" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">No matching inquiries</h2>
            <p className="text-slate-500 mt-2 max-w-xs font-medium">We couldn't find any leads matching your current criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Interest</th>
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="text-left p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-200">
                          {lead.full_name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{lead.full_name}</p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] font-medium text-slate-400">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
                            {lead.company && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.company}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-slate-700 mb-1">{lead.service_type || 'General Inquiry'}</p>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px] font-medium">{lead.message}</p>
                    </td>
                    <td className="p-6">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className={`text-[10px] font-bold px-4 py-1.5 rounded-full border outline-none cursor-pointer uppercase tracking-widest transition-all ${
                          lead.status === 'new' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          lead.status === 'contacted' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Calendar className="w-4 h-4 text-slate-300" />
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm group-hover:opacity-100 lg:opacity-0"
                      >
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

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                  {selectedLead.full_name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedLead.full_name}</h2>
                  <p className="text-sm font-medium text-slate-500">{selectedLead.company || 'Individual Client'}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 border border-slate-100 shadow-sm transition-colors">
                <ShieldCheck className="w-5 h-5 hidden" /> {/* Just to keep import used */}
                <span className="font-bold text-lg leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Info</p>
                    <p className="text-sm font-medium text-slate-800 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {selectedLead.email}</p>
                    {selectedLead.phone && <p className="text-sm font-medium text-slate-800 flex items-center gap-2 mt-2"><Phone className="w-4 h-4 text-slate-400" /> {selectedLead.phone}</p>}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                          selectedLead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                          selectedLead.status === 'contacted' ? 'bg-amber-50 text-amber-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project Requirements</p>
                    <p className="text-sm font-bold text-slate-800">{selectedLead.service_type || 'General Inquiry'}</p>
                    {selectedLead.budget && <p className="text-sm font-medium text-slate-600 mt-1">Budget: {selectedLead.budget}</p>}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Received</p>
                    <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(selectedLead.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Message / Project Brief</p>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedLead.message}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
