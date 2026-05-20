import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import TrustBar from '@/components/sections/TrustBar';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ourservices';
import BusinessTransformationSection from '@/components/sections/about/Card-content';

const FinestWorkSection = dynamic(() => import('@/components/sections/FinestWorkSection'));
const PartnerSection = dynamic(() => import('@/components/sections/PartnerSection'));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'));
const TechBarSection = dynamic(() => import('@/components/sections/TechBarSection'));
const RecentBlogsSection = dynamic(() => import('@/components/sections/RecentBlogsSection'));
const PhilosophySection = dynamic(() => import('@/components/sections/faqsection'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProcessSection />
      <ServicesSection />
      <BusinessTransformationSection />
      <FinestWorkSection />
      <PartnerSection />
      <TestimonialsSection />
      <TechBarSection />
      <RecentBlogsSection />
      <PhilosophySection />
      <CTASection />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://virtavio.in/#organization",

            name: "Virtavio",
            legalName: "Virtavio",
            alternateName: "Virtavio Solutions",

            url: "https://virtavio.in",
            logo: "https://virtavio.in/logo.png",
            image: "https://virtavio.in/og-image.jpg",

            description:
              "Virtavio is a leading AI, web development, SEO, and digital transformation agency helping businesses scale through intelligent automation, custom software development, high-performance websites, cloud solutions, and performance marketing.",

            slogan:
              "Building Smarter Digital Experiences",

            foundingDate: "2026",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: "400+"
            },

            telephone: "+91-8910364760",
            email: "support@virtavio.in",

            address: {
              "@type": "PostalAddress",
              addressCountry: "IN"
            },

            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-8910364760",
                email: "support@virtavio.in",
                contactType: "sales",
                areaServed: "Worldwide",
                availableLanguage: ["English", "Hindi", "Bengali"]
              },
              {
                "@type": "ContactPoint",
                telephone: "+91-8910364760",
                email: "support@virtavio.in",
                contactType: "customer support",
                areaServed: "Worldwide",
                availableLanguage: ["English", "Hindi", "Bengali"]
              }
            ],

            sameAs: [
              "https://twitter.com/virtavio",
              "https://www.linkedin.com/company/virtavio",
              "https://www.instagram.com/virtavio"
            ],

            knowsAbout: [
              "Artificial Intelligence",
              "AI Automation",
              "Custom Software Development",
              "Web Development",
              "Next.js Development",
              "Shopify Development",
              "SEO",
              "Search Engine Optimization",
              "SearchGPT Optimization",
              "Perplexity Optimization",
              "Content Marketing",
              "Performance Marketing",
              "Google Ads",
              "Meta Ads",
              "Cloud Computing",
              "AWS",
              "Google Cloud",
              "Microsoft Azure",
              "UI/UX Design",
              "Brand Strategy",
              "Mobile App Development",
              "ERP Development",
              "CRM Development"
            ],

            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "AI Integration & Automation"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Web Development"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "SEO & Search Optimization"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Performance Marketing"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Content Strategy"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Custom Software Development"
                }
              }
            ],

            award: [
              "50+ Industry Awards"
            ],

            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "200"
            }
          }),
        }}
      />
    </>
  );
}
