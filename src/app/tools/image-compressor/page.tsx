'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Trash2, Settings, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

type CompressionLevel = 'low' | 'medium' | 'high';
type OutputFormat = 'auto' | 'jpeg' | 'webp';

interface ProcessedFile {
  id: string;
  original: File;
  preview: string;
  compressedUrl?: string;
  compressedSize?: number;
  status: 'idle' | 'compressing' | 'done';
}

const faqs = [
  {
    q: "Is this image compressor tool free to use?",
    a: "Yes, this image compressor tool is completely free to use and does not require any signup or installation. You can simply upload your images, select the compression level, and download the optimized images instantly. Unlike many paid tools, this compressor works online without any limitations, making it the best choice for quick and hassle-free image optimization."
  },
  {
    q: "Will compressing images reduce their quality?",
    a: "Our smart compression algorithms are designed to reduce file size significantly while maintaining excellent visual clarity. While technically there is a minor quality reduction, it is usually indistinguishable to the human eye, especially on web pages and mobile devices."
  },
  {
    q: "Which image formats are supported in this tool?",
    a: "Currently, our tool supports all major web image formats including JPG (JPEG), PNG, WebP, and GIF. PNGs with transparency can also be auto-converted to WebP to maintain their transparent backgrounds."
  },
  {
    q: "Can I use this tool on mobile devices?",
    a: "Absolutely! Our image compressor is fully responsive and works directly in your mobile browser without the need for any app installation. It's fast and utilizes your device's native processing power."
  },
  {
    q: "Why should I compress images before uploading them on websites?",
    a: "Large images slow down page load times, which frustrates users and hurts your Google SEO rankings. Compressing images ensures faster load speeds, better Core Web Vitals, and lower bandwidth costs for your hosting."
  }
];

export default function ImageCompressor() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [level, setLevel] = useState<CompressionLevel>('medium');
  const [format, setFormat] = useState<OutputFormat>('auto');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      files.forEach(f => {
        URL.revokeObjectURL(f.preview);
        if (f.compressedUrl) URL.revokeObjectURL(f.compressedUrl);
      });
    };
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(f => f.type.startsWith('image/'));

    if (validFiles.length !== selectedFiles.length) {
      toast.error('Some files were skipped. Only images are allowed.');
    }

    const newFiles = validFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      original: file,
      preview: URL.createObjectURL(file),
      status: 'idle' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;

    // Quality mapping based on level
    const qualityMap = { low: 0.4, medium: 0.7, high: 0.9 };
    const q = qualityMap[level];

    setFiles(prev => prev.map(f => f.status === 'done' ? f : { ...f, status: 'compressing' }));

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'done') continue;

      try {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.src = files[i].preview;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);

            // Determine actual output format
            let mimeType = 'image/jpeg';
            if (format === 'webp' || (format === 'auto' && files[i].original.type === 'image/png')) {
              mimeType = 'image/webp';
            } else if (format === 'auto') {
              mimeType = files[i].original.type;
            }

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  setFiles(prev => {
                    const newFiles = [...prev];
                    newFiles[i] = {
                      ...newFiles[i],
                      compressedUrl: URL.createObjectURL(blob),
                      compressedSize: blob.size,
                      status: 'done'
                    };
                    return newFiles;
                  });
                }
                resolve();
              },
              mimeType,
              q
            );
          };
        });
      } catch (err) {
        console.error('Compression failed for', files[i].original.name);
      }
    }
    toast.success('Compression complete!');
  };

  const clearAll = () => {
    files.forEach(f => {
      URL.revokeObjectURL(f.preview);
      if (f.compressedUrl) URL.revokeObjectURL(f.compressedUrl);
    });
    setFiles([]);
  };

  const formatSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return '0 MB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalOriginal = files.reduce((acc, f) => acc + f.original.size, 0);
  const totalCompressed = files.reduce((acc, f) => acc + (f.compressedSize || f.original.size), 0);
  const totalSavedPercent = files.length > 0 && totalOriginal > 0
    ? Math.round((1 - totalCompressed / totalOriginal) * 100)
    : 0;

  const downloadAll = () => {
    // Basic approach: trigger individual downloads
    files.filter(f => f.status === 'done').forEach((f, idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = f.compressedUrl!;
        a.download = `compressed-${f.original.name}`;
        a.click();
      }, idx * 200);
    });
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero & Tool Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-virtavio-glow opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900">
              Free Online Image <span className="text-gradient">Compressor Tool</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Reduce Image Size Without Losing Quality. Compress PNG, JPG, WebP easily.
            </p>
          </div>

          {/* Main Tool UI */}
          <div className="bg-white/90 backdrop-blur-xl border border-blue-100 rounded-[2rem] shadow-xl shadow-blue-900/5 p-6 lg:p-10 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Free Image Compressor</h2>
                <p className="text-sm text-slate-500 font-medium">Compress PNG/JPG/WebP images in your browser. Choose compression level and download.</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Dropzone */}
              <div
                onClick={() => files.length === 0 && fileInputRef.current?.click()}
                className={`flex-1 relative rounded-2xl border-2 border-dashed transition-all ${files.length === 0
                  ? 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 cursor-pointer p-12 flex flex-col items-center justify-center text-center min-h-[300px]'
                  : 'border-slate-100 bg-slate-50/50 p-4 max-h-[400px] overflow-y-auto'
                  }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  multiple
                  className="hidden"
                />

                {files.length === 0 ? (
                  <>
                    <Upload className="w-10 h-10 text-blue-500 mb-4" />
                    <p className="text-lg font-bold text-slate-900">Drop images or click to Select Images</p>
                    <p className="text-sm font-medium text-slate-500 mt-2">PNG • JPG • WebP (max ~80 MB each)</p>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-bold text-slate-700">{files.length} image(s) selected</p>
                      <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:text-blue-700">
                        + Add More
                      </button>
                    </div>
                    {files.map((f, i) => (
                      <div key={f.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-4 shadow-sm">
                        <img src={f.preview} alt="preview" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{f.original.name}</p>
                          <div className="flex gap-3 text-xs font-medium text-slate-500 mt-0.5">
                            <span>Original: {formatSize(f.original.size)}</span>
                            {f.compressedSize && (
                              <span className="text-emerald-600 font-bold">
                                Compressed: {formatSize(f.compressedSize)} (-{Math.round((1 - f.compressedSize / f.original.size) * 100)}%)
                              </span>
                            )}
                          </div>
                        </div>
                        {f.status === 'done' && (
                          <a
                            href={f.compressedUrl}
                            download={`compressed-${f.original.name}`}
                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => setFiles(prev => prev.filter(item => item.id !== f.id))}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Controls */}
              <div className="w-full lg:w-[350px] space-y-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Compression Level</p>
                  <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                    {(['low', 'medium', 'high'] as CompressionLevel[]).map(l => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold capitalize transition-all ${level === l
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        {l} {l === 'medium' && <span className="hidden sm:inline text-[10px] font-medium opacity-70">(Rec)</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Output Format</p>
                  <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                    {(['auto', 'jpeg', 'webp'] as OutputFormat[]).map(f => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold uppercase transition-all ${format === f
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                          : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        {f === 'auto' ? 'Auto' : f}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Tip: PNGs with transparency auto-convert to WebP to keep transparent background when Auto is selected.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-base"
                  onClick={handleCompress}
                  disabled={files.length === 0 || files.every(f => f.status === 'done')}
                >
                  {files.some(f => f.status === 'compressing') ? 'Compressing...' : 'Compress Images'}
                </Button>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Original Size</p>
                  <p className="text-lg font-bold text-slate-900">{formatSize(totalOriginal)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Compressed</p>
                  <p className="text-lg font-bold text-slate-900">{formatSize(totalCompressed)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Saved</p>
                  <p className="text-lg font-bold text-emerald-600">{totalSavedPercent}%</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {files.length > 0 && (
                  <button onClick={clearAll} className="text-sm font-bold text-slate-400 hover:text-slate-600">
                    Clear all
                  </button>
                )}
                {files.some(f => f.status === 'done') && (
                  <Button variant="primary" onClick={downloadAll} className="bg-emerald-500 hover:bg-emerald-600 border-none shadow-emerald-500/20">
                    Download All
                  </Button>
                )}
              </div>
            </div>

            <p className="text-center text-xs font-medium text-slate-400 mt-8">
              All processing happens in your browser. No images are uploaded to any server.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">

          {/* How It Works */}
          <div className="relative overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-[0_10px_60px_rgba(236,72,153,0.08)] p-8 lg:p-10">

            <div className="absolute top-0 right-0 w-56 h-56 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">

              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 to-violet-50 border border-pink-100 text-sm font-semibold text-pink-600 mb-6">
                ⚡ Quick & Easy
              </div> */}

              <h3 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                How to Compress Images Online?
              </h3>

              <p className="text-slate-600 leading-relaxed mb-8">
                Compress images instantly with a premium optimization workflow designed for speed and simplicity.
              </p>

              <div className="space-y-5">
                {[
                  "Upload your image or drag & drop it into the upload area.",
                  "Choose your preferred compression level.",
                  "Click the Compress Images button.",
                  "Download optimized images instantly."
                ].map((step, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-5 rounded-2xl border border-slate-100 bg-gradient-to-r from-white to-pink-50/40 p-5 transition-all duration-300 hover:border-pink-200 hover:shadow-lg"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-lg flex-shrink-0">
                      {i + 1}
                    </div>

                    <p className="text-slate-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#111827] via-[#1f1b2e] to-[#2b124c] text-white shadow-[0_20px_80px_rgba(168,85,247,0.25)] p-8 lg:p-10">

            <div className="absolute top-0 right-0 w-56 h-56 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">

              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-pink-200 text-sm font-semibold backdrop-blur-xl mb-6">
                🚀 Performance Boost
              </div> */}

              <h3 className="text-3xl font-black tracking-tight mb-4">
                Benefits for Website Owners & Marketers
              </h3>

              <p className="text-slate-300 leading-relaxed mb-8">
                Faster-loading images improve SEO rankings, user experience, and website performance across all devices.
              </p>

              <div className="space-y-4">
                {[
                  "Increase website loading speed",
                  "Improve Google Core Web Vitals",
                  "Enhance mobile browsing experience",
                  "Reduce hosting bandwidth usage",
                  "Boost social media sharing performance"
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
                  >

                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-pink-400 to-violet-500 flex-shrink-0" />

                    <p className="text-slate-200">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-blue-200 shadow-md shadow-blue-900/5' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-slate-600 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
