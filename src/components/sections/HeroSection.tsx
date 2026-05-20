'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Search, Megaphone, Share2, PenTool, ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';

import cs1 from "@/images/cs_1.png"
import cs2 from "@/images/cs_2.png";
import cs3 from "@/images/cs_3.png";
import cs4 from "@/images/cs_4.png";


const clientImages = [cs1, cs2, cs3, cs4];

const slides = [
  {
    id: 1,
    title: "Web Development",
    description: "We build fast, secure, and user-friendly websites that turn visitors into loyal customers. From e-commerce to custom applications, we bring your vision to life.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
    stats: "150+ websites delivered",
  },
  {
    id: 2,
    title: "SEO Services",
    description: "Get found by the right people. Our data-driven SEO strategies help you dominate search results and drive organic traffic that converts.",
    icon: Search,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1400&auto=format&fit=crop",
    stats: "95% client retention",
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Full-funnel marketing solutions designed to grow your brand and maximize your ROI. We turn clicks into loyal customers.",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    stats: "300% avg ROI increase",
  },
  {
    id: 4,
    title: "Social Media",
    description: "We create scroll-stopping content that builds community and amplifies your brand voice across every platform.",
    icon: Share2,
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1400&auto=format&fit=crop",
    stats: "2M+ engagements",
  },
  {
    id: 5,
    title: "Content Strategy",
    description: "Storytelling with a purpose. We craft compelling copy that speaks directly to your audience and drives action.",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1455390582262-044c277deadb?q=80&w=1400&auto=format&fit=crop",
    stats: "500+ articles published",
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  return (
    <section className="relative pt-24 overflow-hidden bg-slate-950">
      {/* Full Width, No Border Radius, Fit to Screen */}
      <div className="relative h-[calc(100svh-96px)] min-h-[600px] w-full overflow-hidden">

        {/* Slideshow Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={currentSlide === 0 ? false : { scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              priority={currentSlide === 0}
              {...(currentSlide === 0 ? { fetchPriority: "high" } as any : {})}
              className="w-full h-full object-cover"
              sizes="100vw"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
            <div className="absolute inset-y-0 left-0 w-full md:w-2/3 lg:w-3/5 bg-gradient-to-r from-black/95 via-black/70 to-transparent md:from-black/90 md:via-black/60" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative h-full flex items-center z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-3xl">

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-white leading-[1.1] tracking-tight mb-6"
                style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
              >
                Building{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 blur-xl opacity-50" />
                  <span className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    Smarter
                  </span>
                </span>{' '}
                Digital Experiences
              </motion.h1>

              {/* Dynamic Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >

                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-5 leading-tight">
                    {slides[currentSlide].title}
                  </h2>

                  <p className="text-sm md:text-lg text-white/90 mb-8 max-w-xl leading-relaxed" style={{ "color": 'white' }}>
                    {slides[currentSlide].description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Link
                      href="/get-quote"
                      className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-black text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95 flex items-center justify-center gap-2"
                    >
                      Start Your Project
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/services"
                      className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-base transition-all duration-300 hover:bg-white/20 hover:border-white/40 flex items-center justify-center"
                    >
                      Explore Services
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 flex flex-wrap items-center gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 bg-slate-800 overflow-hidden relative">
                        <Image
                          src={clientImages[i % clientImages.length]}
                          alt={`Client ${i + 1}`}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-bold" style={{ color: 'white' }}>200+ Happy Clients</p>
                    <p className="text-slate-400 text-[10px] md:text-xs font-medium uppercase tracking-wider" style={{ color: 'white' }}>Industry Leaders</p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-white/10" />

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white text-xs md:text-sm font-bold">4.9/5 Rating</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 hidden sm:flex gap-3 z-20">
          <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-purple-600 transition-all flex items-center justify-center group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-purple-600 transition-all flex items-center justify-center group">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentSlide(idx); setIsPlaying(false); setTimeout(() => setIsPlaying(true), 5000); }}
              className={`transition-all duration-500 rounded-full h-1.5 ${currentSlide === idx ? 'w-8 md:w-12 bg-purple-500' : 'w-1.5 md:w-2 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-purple-600 transition-all flex items-center justify-center z-20"
        >
          {isPlaying ? (
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
          ) : (
            <Play className="w-4 h-4 ml-0.5 fill-white" />
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}