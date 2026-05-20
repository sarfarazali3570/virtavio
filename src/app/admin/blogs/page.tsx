'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit3, Trash2, Eye, Calendar, FileText,
  Save, ImageIcon, Loader2, Upload,
  ChevronLeft, Layout, Globe, Search
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

// Dynamic import for Tiptap editor (no SSR)
const RichTextEditor = dynamic(() => import('@/components/editor/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-slate-200 rounded-3xl bg-white p-10 flex items-center justify-center h-[400px]">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  ),
});

const supabase = createClient();

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

type BlogFormData = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string;
  published: boolean;
  meta_title: string;
  meta_description: string;
};

const emptyForm: BlogFormData = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  category: '',
  image_url: '',
  published: false,
  meta_title: '',
  meta_description: '',
};

export default function AdminBlogsPage() {
  const { user, profile } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  // Image upload
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = profile?.role === 'admin';
  const isVendor = profile?.role === 'vendor';

  // ── Fetch ────────────────────────────────────────────────────
  useEffect(() => {
    if (user) fetchBlogs();
  }, [user, profile]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      let query = supabase.from('blogs').select('*').order('created_at', { ascending: false });

      // Vendor filtering: only show own blogs
      if (isVendor && !isAdmin) {
        query = query.eq('author_id', user?.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBlogs(data ?? []);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Slug helper ──────────────────────────────────────────────
  const toSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  // ── Modal open/close ─────────────────────────────────────────
  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setActiveTab('write');
    setIsModalOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt ?? '',
      category: blog.category ?? '',
      image_url: blog.image_url ?? '',
      published: blog.published,
      meta_title: blog.meta_title ?? '',
      meta_description: blog.meta_description ?? '',
    });
    setActiveTab('write');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // ── Image upload ─────────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      setForm(prev => ({ ...prev, image_url: urlData.publicUrl }));
      toast.success('Image uploaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // ── Save ─────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) {
      toast.error('Title, Slug, and Content are required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt || null,
        category: form.category || null,
        image_url: form.image_url || null,
        published: form.published,
        published_at: form.published ? new Date().toISOString() : null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        author_id: user?.id,
      };

      let error;
      if (editingId) {
        ({ error } = await supabase.from('blogs').update(payload).eq('id', editingId));
      } else {
        ({ error } = await supabase.from('blogs').insert([payload]));
      }

      if (error) throw error;
      toast.success(editingId ? 'Post updated' : 'Post created');
      fetchBlogs();
      closeModal();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this post?')) return;
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      toast.success('Deleted successfully');
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              {isAdmin ? 'Global Content Control' : 'My Contributions'}
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold text-[#0F172A]">Blog Repository</h1>
          <p className="mt-2 text-slate-500 font-medium">
            Manage your high-performance articles and editorial content.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-medium"
            />
          </div>
          <button
            onClick={openCreate}
            className="btn-primary flex items-center justify-center gap-2 py-3 px-8 shadow-xl shadow-primary/20 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 glass-card bg-white/50">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Accessing Database...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="glass-card p-20 text-center border-dashed border-2">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-slate-200" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">No posts found</h2>
            <p className="text-slate-500 mt-2 font-medium">Time to share some knowledge with the world.</p>
          </div>
        ) : (
          filteredBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
            >
              <div className="relative w-full md:w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                {blog.image_url ? (
                  <Image src={blog.image_url} alt={blog.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200"><ImageIcon className="w-8 h-8" /></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[#0F172A] truncate group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    blog.published ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{new Date(blog.created_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2"><Layout className="w-3.5 h-3.5" />{blog.category || 'Uncategorized'}</span>
                  <span className="flex items-center gap-2 text-primary/60"><Globe className="w-3.5 h-3.5" />/{blog.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/blogs/${blog.slug}`} className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                  <Eye className="w-5 h-5" />
                </Link>
                <button onClick={() => openEdit(blog)} className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(blog.id)} className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">

              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-6">
                  <button onClick={closeModal} className="p-3 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400"><ChevronLeft className="w-6 h-6" /></button>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-[#0F172A]">{editingId ? 'Modify Article' : 'New Publication'}</h2>
                    <p className="text-sm text-slate-500 font-medium">{editingId ? 'Updating existing entry' : 'Crafting a new insight'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
                  <button
                    onClick={() => setActiveTab('write')}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'write' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    ✏️ Write
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    👁️ Preview
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-10">
                {activeTab === 'write' ? (
                  <form id="blog-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                      {/* Title */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Headline</label>
                        <input
                          required type="text" value={form.title} placeholder="A compelling title..."
                          onChange={e => setForm(prev => ({ ...prev, title: e.target.value, slug: editingId ? prev.slug : toSlug(e.target.value) }))}
                          className="w-full text-3xl font-display font-bold text-[#0F172A] border-none focus:ring-0 placeholder:text-slate-200 outline-none bg-transparent"
                        />
                      </div>

                      {/* Excerpt */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Excerpt</label>
                        <textarea
                          value={form.excerpt}
                          placeholder="A short summary for previews..."
                          onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                          rows={2}
                          className="w-full text-base text-slate-600 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-primary/10 focus:border-primary placeholder:text-slate-300 outline-none resize-none font-medium"
                        />
                      </div>

                      {/* Rich Text Editor */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Article Body</label>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">Rich Text Editor</span>
                        </div>
                        <RichTextEditor
                          content={form.content}
                          onChange={(html) => setForm(prev => ({ ...prev, content: html }))}
                          placeholder="Start writing your story..."
                        />
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8 lg:border-l lg:border-slate-100 lg:pl-12">
                      {/* Metadata */}
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Metadata</label>
                        <div className="space-y-6">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 mb-2">URL SLUG</p>
                            <input
                              type="text" value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: toSlug(e.target.value) }))}
                              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary transition-all text-xs font-mono"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 mb-2">CATEGORY</p>
                            <input
                              type="text" value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary transition-all text-xs font-bold"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 mb-2">SEO TITLE</p>
                            <input
                              type="text" value={form.meta_title} onChange={e => setForm(prev => ({ ...prev, meta_title: e.target.value }))}
                              placeholder="Custom SEO title (optional)"
                              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary transition-all text-xs font-medium placeholder:text-slate-300"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 mb-2">SEO DESCRIPTION</p>
                            <textarea
                              value={form.meta_description} onChange={e => setForm(prev => ({ ...prev, meta_description: e.target.value }))}
                              placeholder="Custom meta description (optional)"
                              rows={3}
                              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary transition-all text-xs font-medium placeholder:text-slate-300 resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cover Media */}
                      <div className="space-y-4 pt-6 border-t border-slate-100">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cover Media</label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="relative h-48 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all group overflow-hidden"
                        >
                          {form.image_url ? (
                            <Image src={form.image_url} alt="Cover" fill className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-slate-300 mb-2 group-hover:text-primary transition-colors" />
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Artwork</p>
                            </>
                          )}
                          {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
                        </div>
                        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </div>

                      {/* Publication Status */}
                      <div className="pt-6 border-t border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Publication Status</label>
                          <div
                            onClick={() => setForm(prev => ({ ...prev, published: !prev.published }))}
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${form.published ? 'bg-primary' : 'bg-slate-200'}`}
                          >
                            <motion.div animate={{ x: form.published ? 24 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-sm" />
                          </div>
                        </div>
                        <p className="text-[10px] font-medium text-slate-400 italic">Visible to public immediately upon saving if enabled.</p>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Preview Tab */
                  <div className="max-w-4xl mx-auto">
                    {form.image_url && (
                      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-10 shadow-xl">
                        <Image src={form.image_url} alt="Preview" fill className="object-cover" unoptimized />
                      </div>
                    )}
                    <h1 className="text-4xl font-display font-bold text-[#0F172A] mb-4">{form.title || 'Untitled Article'}</h1>
                    {form.excerpt && <p className="text-lg text-slate-500 font-medium mb-8 italic">{form.excerpt}</p>}
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-slate-600 prose-p:font-medium prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-2xl">
                      <div dangerouslySetInnerHTML={{ __html: form.content || '<p><em>No content yet</em></p>' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-4">
                <button onClick={closeModal} className="px-8 py-3 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest text-[10px]">Discard Changes</button>
                <button
                  form="blog-form" type="submit" disabled={saving || uploading}
                  className="btn-primary flex items-center gap-3 py-3 px-10 shadow-2xl shadow-primary/20 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {editingId ? 'Update Publication' : 'Release Content'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
