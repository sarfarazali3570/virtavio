'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Clock, FileText, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const calculateReadingTime = (content: string) => {
  const words = content?.trim().split(/\s+/).length || 0;
  const time = Math.ceil(words / 200);
  return `${time} min read`;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 1024 ? 6 : 9;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [blogs, searchQuery]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="pt-32 min-h-screen bg-white">
      {/* Premium Minimal Hero */}
      <section className="relative px-6 lg:px-8 mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <h2 className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4">
                The Virtavio Journal
              </h2>
              <h1 className="text-4xl md:text-7xl font-display font-medium text-slate-900 tracking-tight leading-[1.1]">
                Insights on the <span className="text-slate-400 font-light italic">Future</span> of AI.
              </h1>
            </motion.div>

            {/* Clean Minimal Search */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-full md:w-80 group"
            >
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-7 pr-4 py-2 border-b border-slate-200 focus:border-slate-900 bg-transparent outline-none transition-all text-sm font-medium placeholder:text-slate-400 placeholder:font-normal"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-32">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-[4/5] md:aspect-video bg-slate-100 rounded-2xl" />
                <div className="h-4 w-1/2 bg-slate-100 rounded" />
                <div className="h-6 w-full bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-20">
              <AnimatePresence mode="popLayout">
                {currentBlogs.map((blog, i) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Link href={`/blogs/${blog.slug}`} className="group block">
                      <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-100 mb-6">
                        {blog.image_url ? (
                          <Image
                            src={blog.image_url}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <FileText className="w-12 h-12" />
                          </div>
                        )}
                        {blog.category && (
                          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur shadow-sm px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-slate-900">
                            {blog.category}
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{calculateReadingTime(blog.content)}</span>
                        </div>
                        <h2 className="text-lg md:text-2xl font-display font-medium text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="hidden md:line-clamp-2 text-slate-500 text-sm font-medium leading-relaxed">
                          {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                        </p>
                        <div className="pt-2 flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 group-hover:text-primary transition-colors">
                          Read Article <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Premium Pagination */}
            {totalPages > 1 && (
              <div className="mt-24 pt-12 border-t border-slate-100 flex items-center justify-between">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 disabled:opacity-30 transition-all hover:-translate-x-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <div className="flex gap-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`text-xs font-bold w-8 h-8 rounded-full transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 disabled:opacity-30 transition-all hover:translate-x-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}