'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, ChevronRight, FileText } from 'lucide-react';
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
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
};

export default function RecentBlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentBlogs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error('Error fetching recent blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-12 w-64 bg-slate-100 rounded-lg animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-slate-50 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Hide section if no blogs exist
  if (blogs.length === 0) return null;

  return (
    <section className="relative py-24 overflow-hidden bg-[#fafafa]">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Knowledge Hub</span>
            <h2 className="font-display font-bold text-slate-900 tracking-tight mb-4">
              Insights & <span className="text-gradient">Perspectives</span>
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Explore our latest thoughts on AI, enterprise software, and the future of digital interaction.
            </p>
          </motion.div>

          <Link href="/blogs" className="group flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm">
            View all insights
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-12 md:pb-0 scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="min-w-[85%] md:min-w-0 snap-center"
            >
              <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                <article className="relative h-full rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-500 flex flex-col overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-primary/20
                  after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:shadow-[0_4px_12px_rgba(59,130,246,0.6)] after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500">

                  <div className="relative h-52 overflow-hidden bg-slate-50">
                    {blog.image_url ? (
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                        <FileText className="w-12 h-12 text-slate-200" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60" />
                    {blog.category && (
                      <div className="absolute top-4 left-4">
                        <span className="backdrop-blur-md bg-white/20 text-white text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border border-white/20 shadow-sm">
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5 text-indigo-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {calculateReadingTime(blog.content)}
                      </div>
                    </div>

                    <h3 className="text-[24px] font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-4">
                      {blog.title}
                    </h3>

                    <p className="text-slate-500 line-clamp-2 text-[16px] leading-relaxed mb-8 flex-grow font-medium">
                      {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                    </p>

                    <div className="flex items-center text-sm font-bold text-primary">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}