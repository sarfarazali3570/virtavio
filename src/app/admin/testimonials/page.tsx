'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Edit3, Trash2, Quote, MessageSquare, Loader2, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/FormElements';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'sonner';
import Link from 'next/link';

const supabase = createClient();

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  status: 'published' | 'draft';
  created_at: string;
}

export default function AdminTestimonialsPage() {
  const { user: currentUser } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    status: 'published' as 'published' | 'draft'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) fetchTestimonials();
  }, [currentUser]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          console.warn('Testimonials table does not exist yet.');
          setTestimonials([]);
          toast.error('Testimonials table missing. Please run the setup SQL script.');
        } else {
          throw error;
        }
      } else {
        setTestimonials(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching testimonials:', err);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', role: '', company: '', content: '', rating: 5, status: 'published' });
    setIsModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setIsEditing(true);
    setCurrentId(t.id);
    setFormData({ 
      name: t.name, 
      role: t.role || '', 
      company: t.company || '', 
      content: t.content, 
      rating: t.rating, 
      status: t.status 
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', role: '', company: '', content: '', rating: 5, status: 'published' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        role: formData.role || null,
        company: formData.company || null,
        content: formData.content,
        rating: formData.rating,
        status: formData.status
      };

      if (isEditing && currentId) {
        const { error } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', currentId);
          
        if (error) throw error;
        toast.success('Testimonial updated successfully');
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([payload]);
          
        if (error) throw error;
        toast.success('Testimonial added successfully');
      }
      
      closeModal();
      fetchTestimonials();
    } catch (err: any) {
      console.error('Submission error:', err);
      toast.error(err.message || 'Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error('Failed to delete testimonial');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/admin" className="flex items-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors mb-4 group">
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Social Proof</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-[#0F172A]">Testimonials</h1>
          <p className="mt-2 text-[#475569] font-medium">Manage client reviews and success stories.</p>
        </motion.div>
        
        <motion.button 
          onClick={openAddModal}
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="btn-primary flex items-center justify-center gap-2 py-3 px-6 shadow-[0_10px_30px_rgba(106,0,255,0.2)] hover:shadow-[0_15px_40px_rgba(106,0,255,0.3)]"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </motion.button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm text-center max-w-2xl mx-auto mt-12">
          <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-pink-400">
            <MessageSquare className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Testimonials Found</h3>
          <p className="text-slate-500 mb-8 font-medium">Add some client testimonials to build trust and show social proof on your website.</p>
          <button 
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-pink-300 hover:text-pink-600 rounded-xl text-sm font-bold text-slate-600 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create First Testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-8 flex flex-col hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-110" />
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`w-4 h-4 ${idx < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <Badge variant={t.status === 'published' ? 'success' : 'warning'}>
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </Badge>
              </div>
              
              <Quote className="absolute top-16 right-8 w-16 h-16 text-primary/5 -z-0 transition-transform duration-500 group-hover:-rotate-12" />
              
              <p className="text-base text-slate-600 font-medium leading-relaxed mb-8 flex-1 relative z-10">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-virtavio-gradient flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {t.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{t.name}</p>
                    <p className="text-xs font-semibold text-slate-400">{t.role}{t.role && t.company ? ', ' : ''}{t.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEditModal(t)}
                    className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors shadow-sm border border-slate-100" 
                    title="Edit"
                  >
                    <Edit3 className="w-4.5 h-4.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="p-2.5 rounded-xl bg-red-50/50 text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors shadow-sm border border-red-100" 
                    title="Delete"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={closeModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
                    {isEditing ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {isEditing ? 'Edit Testimonial' : 'New Testimonial'}
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">Client Name</label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="e.g. Sarah Chen"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">Status</label>
                      <select 
                        value={formData.status}
                        onChange={e => setFormData({...formData, status: e.target.value as 'published' | 'draft'})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">Role / Title</label>
                      <input 
                        type="text"
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="e.g. CTO"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">Company</label>
                      <input 
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="e.g. Novalink AI"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className={`p-2 rounded-lg transition-colors ${formData.rating >= star ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-300 hover:text-amber-300'}`}
                        >
                          <Star className={`w-6 h-6 ${formData.rating >= star ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">Review Content</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                      placeholder="Client's testimony..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-4 px-4 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 px-4 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 shadow-[0_10px_30px_rgba(106,0,255,0.2)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isEditing ? 'Save Changes' : 'Publish Testimonial'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
