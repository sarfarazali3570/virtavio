'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea, Select } from '@/components/ui/FormElements';
import toast from 'react-hot-toast';

const categories = [
  { value: 'coding', label: 'Coding & Development' },
  { value: 'marketing', label: 'Marketing Copy' },
  { value: 'creative', label: 'Creative Writing' },
  { value: 'business', label: 'Business Strategy' },
];

const styles = [
  { value: 'professional', label: 'Professional' },
  { value: 'creative', label: 'Creative' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'detailed', label: 'Detailed' },
];

export default function AIPromptGenerator() {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input) {
      toast.error('Please enter a topic or base prompt');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call for now
    setTimeout(() => {
      const generatedPrompt = `Act as a ${category || 'highly skilled assistant'} in a ${style || 'professional'} manner. Your task is to: ${input}. 

Please ensure the output is:
- High-fidelity and accurate
- Structured logically
- Optimized for performance and readability
- Free of any placeholders`;
      
      setResult(generatedPrompt);
      setIsGenerating(false);
      toast.success('Prompt generated!');
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-virtavio-glow opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">AI Tools</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-bold tracking-tight">
              AI Prompt <span className="text-gradient">Generator</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
              Transform your ideas into high-quality AI prompts designed for GPT-4, Claude, and Gemini.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="glass-card p-8 space-y-6 h-fit">
            <Textarea
              label="Topic or Base Idea"
              placeholder="e.g., A marketing strategy for a premium coffee brand..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categories}
              />
              <Select
                label="Style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                options={styles}
              />
            </div>
            <Button
              className="w-full"
              variant="primary"
              onClick={handleGenerate}
              isLoading={isGenerating}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Prompt
            </Button>
          </div>

          {/* Result */}
          <div className="glass-card p-8 bg-gray-950 text-white min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg">Result</h3>
              {result && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setResult('')}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors"
                    title="Clear"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
            
            {result ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono"
              >
                {result}
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                <Sparkles className="w-12 h-12 mb-4 opacity-10" />
                <p className="text-sm">Generated prompt will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
