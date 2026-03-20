'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroData {
  title: { en: string; az: string };
  subtitle: { en: string; az: string };
  issn: { print: string; electronic: string };
  buttonText: { en: string; az: string };
  buttonLink: string;
  coverImage?: string;
}

export function HeroSection() {
  const { t } = useLanguage();
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => {
        if (data) setHero(data);
      })
      .catch(console.error);
  }, []);

  const title = hero?.title ?? { en: t.hero.title, az: t.hero.title };
  const subtitle = hero?.subtitle ?? { en: t.hero.subtitle, az: t.hero.subtitle };
  const issn = hero?.issn ?? { print: '2989-3453', electronic: 'E-3012-4567' };
  const buttonText = hero?.buttonText ?? { en: 'Submit an Article', az: 'Məqalə Təqdim Et' };
  const buttonLink = hero?.buttonLink ?? '/about/author-guidelines';
  const coverImage = hero?.coverImage ?? '';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-academic-blue via-academic-purple to-blue-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      {/* Angled Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform skew-y-2 origin-bottom-right"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-2 text-white">
            {/* Journal Icon */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Peer-Reviewed Journal</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {title.en}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-200 font-light mb-6">
              {subtitle.en}
            </p>

            {/* ISSN */}
            <p className="text-base md:text-lg text-blue-300 mb-8 font-mono">
              ISSN: {issn.print} print | {issn.electronic}
            </p>

            {/* CTA Button */}
            <Link
              href={buttonLink}
              className="inline-flex items-center gap-2 bg-white text-academic-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {buttonText.en}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Right Content - Journal Cover Placeholder */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative">
              {coverImage ? (
                <div className="w-48 h-64 rounded-lg shadow-2xl overflow-hidden border-4 border-white/20">
                  <img src={coverImage} alt="Journal Cover" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-48 h-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-2xl overflow-hidden border-4 border-white/20">
                  <div className="h-full p-4 flex flex-col items-center justify-center text-white text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-lg">SDU</span>
                    </div>
                    <p className="text-xs font-semibold mb-1">Journal of</p>
                    <p className="text-sm font-bold mb-2">Sumqait State University</p>
                    <div className="w-8 h-px bg-white/50 mb-2"></div>
                    <p className="text-xs">Mathematics and</p>
                    <p className="text-xs font-semibold">Computer Science</p>
                    <p className="text-xs mt-4 text-blue-200">Vol. 5, No. 1</p>
                    <p className="text-xs text-blue-200">2026</p>
                  </div>
                </div>
              )}
              {/* Shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}