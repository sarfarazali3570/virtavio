import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import BlogDetailClient from './BlogDetailClient';

// Reading time calculation
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!blog) return { title: 'Post Not Found' };

  const description = blog.meta_description || blog.excerpt || blog.content.replace(/<[^>]*>/g, '').slice(0, 160);

  return {
    title: `${blog.meta_title || blog.title} | Virtavio Blog`,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: blog.image_url ? [blog.image_url] : [],
      type: 'article',
      publishedTime: blog.published_at || blog.created_at,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*, author:profiles(*)')
    .eq('slug', slug)
    .single();

  if (error || !blog) notFound();

  // Parse content - support both HTML (from Tiptap) and Markdown (legacy)
  let htmlContent: string;
  const isHtml = blog.content.trim().startsWith('<');
  if (isHtml) {
    htmlContent = sanitizeHtml(blog.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe', 'span', 'mark', 'h1', 'h2', 'h3', 'pre', 'code', 'hr']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'style', 'id'],
        img: ['src', 'alt', 'width', 'height', 'class'],
        a: ['href', 'target', 'rel', 'class'],
      },
    });
  } else {
    const rawHtml = await marked.parse(blog.content);
    htmlContent = sanitizeHtml(rawHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe', 'span', 'mark', 'h1', 'h2', 'h3', 'pre', 'code', 'hr']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'style', 'id'],
        img: ['src', 'alt', 'width', 'height', 'class'],
        a: ['href', 'target', 'rel', 'class'],
      },
    });
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from('blogs')
    .select('id, title, slug, image_url, category, published_at, created_at, content, excerpt')
    .eq('published', true)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3);

  const readingTime = calculateReadingTime(blog.content);

  return (
    <BlogDetailClient
      blog={blog}
      htmlContent={htmlContent}
      relatedPosts={relatedPosts || []}
      readingTime={readingTime}
    />
  );
}
