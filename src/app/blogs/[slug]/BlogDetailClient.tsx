'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, Share2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  author?: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
  content: string;
  excerpt: string | null;
}

interface BlogDetailClientProps {
  blog: BlogPost;
  htmlContent: string;
  relatedPosts: RelatedPost[];
  readingTime: string;
}

export default function BlogDetailClient({ blog, htmlContent, relatedPosts, readingTime }: BlogDetailClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: blog.title,
        text: blog.excerpt || blog.title,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
        <motion.div
          className="h-full bg-[image:var(--background-image-virtavio-gradient)] origin-left"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Back Navigation */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-28 pb-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 text-sm font-semibold text-slate-400 hover:text-primary transition-colors group"
          >
            <div className="p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to all articles</span>
          </Link>
        </motion.div>
      </div>

      {/* Hero Image */}
      {blog.image_url && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-6 lg:px-8 mb-16"
        >
          <div className="relative aspect-[21/9] w-full  overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      )}

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto px-6 lg:px-8 mb-12"
      >
        {/* Category Badge */}
        {blog.category && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/5 px-4 py-2 rounded-full uppercase tracking-[0.2em] border border-primary/10">
              <Tag className="w-3 h-3" />
              {blog.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0F172A] leading-[1.1] mb-8 tracking-tight">
          {blog.title}
        </h1>

        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-200/60">
          <div className="flex items-center gap-8">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[image:var(--background-image-virtavio-gradient)] flex items-center justify-center text-white overflow-hidden shadow-md">
                {blog.author?.avatar_url ? (
                  <Image src={blog.author.avatar_url} alt={blog.author.full_name || 'Author'} width={44} height={44} unoptimized />
                ) : (
                  <span className="text-sm font-bold">
                    {(blog.author?.full_name || 'V')[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">{blog.author?.full_name || 'Virtavio Team'}</p>
                <p className="text-[11px] font-medium text-slate-400">Author</p>
              </div>
            </div>

            {/* Date */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4 text-primary/50" />
              <span className="font-medium">
                {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </span>
            </div>

            {/* Read Time */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4 text-primary/50" />
              <span className="font-medium">{readingTime}</span>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-3xl mx-auto px-6 lg:px-8 pb-16"
      >
        <div
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0F172A] prose-headings:tracking-tight
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-slate-600 prose-p:leading-[1.85] prose-p:font-medium prose-p:text-[17px]
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
            prose-strong:text-[#0F172A] prose-strong:font-bold
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/[0.03] prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-slate-700 prose-blockquote:font-medium
            prose-code:bg-slate-100 prose-code:text-primary prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0F172A] prose-pre:text-green-400 prose-pre:rounded-2xl prose-pre:shadow-xl prose-pre:my-8
            prose-hr:border-slate-200
            prose-li:text-slate-600 prose-li:font-medium
            prose-ul:my-6 prose-ol:my-6"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </motion.article>



      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Continue Reading</p>
                <h2 className="text-3xl font-display font-bold text-[#0F172A] tracking-tight">Related Articles</h2>
              </div>
              <Link href="/blogs" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blogs/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-5 shadow-sm">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        {post.category && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-primary">{post.category}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-display font-bold text-[#0F172A] leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed">
                        {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
