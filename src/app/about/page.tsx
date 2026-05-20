import React from 'react';
import AboutHero from '@/components/sections/about/AboutHero';
import WhoWeAreSection from '@/components/sections/about/WhoWeAreSection';
import AboutStatsBar from '@/components/sections/about/AboutStatsBar';
import IndustrySection from '@/components/sections/about/IndustrySection';
import VisionarySection from '@/components/sections/about/VisionarySection';
import FutureCTASection from '@/components/sections/about/FutureCTASection';

export const metadata = {
  title: 'About Virtavio | Our Mission & Team',
  description: 'Learn about Virtavio, our mission to democratize high-intelligence infrastructure, and the visionary team behind our AI-powered SaaS solutions.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHero />
      <WhoWeAreSection />
      <AboutStatsBar />
      <IndustrySection />
      {/* <VisionarySection /> */}
      <FutureCTASection />

      {/* JSON-LD Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Virtavio",
              "description": "Premium AI-driven SaaS solutions for enterprises.",
              "foundingDate": "2021",
            }
          }),
        }}
      />
    </div>
  );
}
