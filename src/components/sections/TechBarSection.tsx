'use client';

import React from 'react';

const techStackTop = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
  { name: 'WordPress', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
  { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Vercel', logo: 'https://cdn.worldvectorlogo.com/logos/vercel.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Sass', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Redux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
];

const techStackBottom = [
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'REST API', logo: 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Magento', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/magento/magento-original.svg' },
  { name: 'Prisma', logo: 'https://cdn.worldvectorlogo.com/logos/prisma-2.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
];

export default function TechBarSection() {
  const renderCarouselRow = (techArray: any, isReverse = false) => (
    <div className="relative flex overflow-hidden py-4">
      {/* The scrolling track */}
      <div
        className={`flex gap-6 min-w-max items-center hover:[animation-play-state:paused] ${isReverse ? 'animate-scroll-reverse' : 'animate-scroll'
          }`}
      >
        {/* We triple the array to ensure the loop is completely seamless with no white gaps */}
        {[...techArray, ...techArray, ...techArray].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="group flex flex-col items-center justify-center shrink-0 w-32 md:w-44"
          >
            {/* Reduced Card Size */}
            <div className="w-[60px] h-[70px] md:w-[105px] md:h-[105px] rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center hover:-translate-y-1">
              <img
                src={tech.logo}
                alt={tech.name}
                loading="lazy"
                className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="mt-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#ad0693] transition-colors duration-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Our Tech Stack
          </h2>
          <p className="mt-4 text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            We utilize 30+ industry-leading technologies to build high-performance digital solutions.
          </p>
        </div>

        {/* Carousel Row 1 (Moving Left) */}
        {renderCarouselRow(techStackTop, false)}

        {/* Carousel Row 2 (Moving Right) */}
        {renderCarouselRow(techStackBottom, false)}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes scroll-reverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll-reverse {
          animation: scroll-reverse 40s linear infinite;
        }

        /* Adjust speed for mobile for better UX */
        @media (max-width: 768px) {
          .animate-scroll, .animate-scroll-reverse {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}