'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Zap, Mail, Shield, CheckCircle2, ArrowRight, ExternalLink, Server, Cloud, MousePointer2, RefreshCw, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import Image from 'next/image';
import hostingerImg from '@/images/hostinger_img.png';
import hostingerImg1 from '@/images/hostinger_img_1.png';
import hostingerImg2 from '@/images/hostinger_img_2.png';
import hostingerImg3 from '@/images/hostinger_img_3.png';

export default function DomainHostingPage() {
  const [domain, setDomain] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const REFERRAL_CODE = 'SARFARAZ3570';

  const popularTLDs = ['.com', '.in', '.net', '.org', '.io', '.co', '.app'];

  const handleSearchRedirect = (e?: React.FormEvent, customDomain?: string) => {
    e?.preventDefault();

    const targetDomain = customDomain || domain.trim();

    if (!targetDomain) {
      toast.error('Please enter a domain name');
      return;
    }

    let searchDomain = targetDomain.toLowerCase();
    if (!searchDomain.includes('.')) {
      searchDomain = `${searchDomain}.com`;
    }

    const domainRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]\.[a-z]{2,}$/i;
    if (!domainRegex.test(searchDomain)) {
      toast.error('Please enter a valid domain name');
      return;
    }

    const hostingerUrl = `https://www.hostinger.in/domain-name-search?query=${encodeURIComponent(searchDomain)}&REFERRALCODE=${REFERRAL_CODE}&referral_type=domain_search`;

    window.open(hostingerUrl, '_blank');
    toast.success(`Redirecting to Hostinger for ${searchDomain}...`);
  };

  const handleTLDClick = (tld: string) => {
    const baseDomain = domain.split('.')[0] || 'mysite';
    const fullDomain = baseDomain + tld;
    setDomain(fullDomain);
    handleSearchRedirect(undefined, fullDomain);
  };

  const hostingPlans = [
    {
      name: 'Premium Web Hosting',
      subtext: 'Everything you need to create your website',
      price: '₹ 219.00',
      period: '/mo',
      features: [
        '3 websites',
        '~25 000 visits monthly',
        '20 GB SSD storage',
        '400 000 files and directories (Inodes)'
      ],
      cartUrl: `https://www.hostinger.com/in/cart?product=hosting%3Ahostinger_premium&period=12&REFERRALCODE=${REFERRAL_CODE}`,
      recommended: false
    },
    {
      name: 'Business Web Hosting',
      subtext: 'Level-up with more power and enhanced features',
      price: '₹ 379.00',
      period: '/mo',
      features: [
        '50 websites',
        '~100 000 visits monthly',
        '50 GB NVMe storage',
        '600 000 files and directories (Inodes)'
      ],
      cartUrl: `https://www.hostinger.com/in/cart?product=hosting%3Ahostinger_business&period=12&REFERRALCODE=${REFERRAL_CODE}`,
      recommended: true
    },
    {
      name: 'Cloud Startup',
      subtext: 'Optimized for business and eCommerce websites',
      price: '₹ 799.00',
      period: '/mo',
      features: [
        '100 websites',
        '~200 000 visits monthly',
        '100 GB NVMe storage',
        '2 000 000 files and directories (Inodes)'
      ],
      cartUrl: `https://www.hostinger.com/in/cart?product=hosting%3Acloud_economy&period=12&REFERRALCODE=${REFERRAL_CODE}`,
      recommended: false
    }
  ];

  const knowledgeItems = [
    {
      title: 'What is a Domain Name?',
      description:
        "A domain name is your website's unique address on the internet, like yourbusiness.com. It makes it easy for people to find your website instead of remembering a complex IP address.",
      imageUrl: hostingerImg1
    },
    {
      title: 'How Do I Transfer My Domain?',
      description:
        'Already own a domain? Transfer it to Hostinger in a few simple steps and manage your domain, hosting, and email from one convenient dashboard.',
      imageUrl: hostingerImg2,
    },
    {
      title: 'Domain and Hosting Explained',
      description:
        "Your domain is your website's address, while hosting stores your website files and makes them accessible online. Together, they are the foundation of every website.",
      imageUrl: hostingerImg3,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Official Partner Banner */}
      <section className="py-24 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[40px] overflow-hidden p-8 lg:p-20 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
                  #1 WordPress <br />
                  <span className="text-blue-400">Hosting</span>
                </h2>
                <p className="text-xl text-slate-400 mb-10 font-medium leading-relaxed">
                  Fast, secure, and affordable hosting. Get 20% off your purchase with our exclusive referral code applied at checkout.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  {['Free Domain', 'Free SSL', '24/7 Support'].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{feat}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://www.hostinger.com/in?REFERRALCODE=${REFERRAL_CODE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-blue-500/20"
                >
                  Get Started
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10" >
                <Image
                  src={hostingerImg}
                  alt="Hostinger Premium Hosting"
                  fill
                  className="object-cover" style={{ padding: 40, objectFit: 'contain' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Search Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-virtavio-glow opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-7xl font-black tracking-tight text-slate-900 mb-6"
            >
              Find Your Perfect <span className="text-blue-600">Domain</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 font-medium"
            >
              Instantly check availability and secure your name on Hostinger.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className={`relative group p-2 bg-white rounded-2xl shadow-2xl shadow-blue-900/10 border-2 transition-all duration-300 ${isFocused ? 'border-blue-500' : 'border-slate-100'}`}>
              <form onSubmit={handleSearchRedirect} className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="flex-1 relative flex items-center">
                  <Search className={`absolute left-4 w-5 h-5 transition-colors ${isFocused ? 'text-blue-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter your domain name..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-xl font-bold text-slate-900 placeholder:text-slate-300 outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-lg transition-all"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {popularTLDs.map((tld) => (
                <button
                  key={tld}
                  onClick={() => handleTLDClick(tld)}
                  className="px-5 py-2 bg-white border border-slate-100 rounded-xl text-sm font-black text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                >
                  {tld}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Hosting Cards */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {hostingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-8 bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${plan.recommended ? 'border-[#8B5CF6] ring-1 ring-[#8B5CF6]' : 'border-slate-100'
                  }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#8B5CF6] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-purple-200">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-10 min-h-[40px] leading-relaxed">
                  {plan.subtext}
                </p>

                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 font-medium text-lg">{plan.period}</span>
                </div>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={plan.cartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-base transition-all ${plan.recommended
                    ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg shadow-purple-100'
                    : 'bg-slate-900 text-white hover:bg-black'
                    }`}
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lost? Section */}
      <section className="py-32 px-6 lg:px-8 bg-[#0F172A] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Lost? Here’s what you need to know about domains
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {knowledgeItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-3xl mb-8 overflow-hidden border border-white/10">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                </div>
                <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-6">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  );
}