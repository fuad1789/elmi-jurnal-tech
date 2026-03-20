'use client';

import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ArticleList } from '@/components/home/ArticleList';
import { Article } from '@/components/home/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';

// Placeholder data for articles
const latestArticles: Article[] = [
  {
    id: 1,
    title: {
      en: 'A Novel Approach to Machine Learning Algorithms in Data Analysis',
      az: 'Verilənlər Təhlilində Maşın Öyrənməsi Alqoritmlərinə Yeni Yanaşma',
    },
    authors: {
      en: ['Ahmadov R.', 'Aliyeva S.', 'Huseynov F.'],
      az: ['Əhmədov R.', 'Əliyeva S.', 'Hüseynov F.'],
    },
    abstract: {
      en: 'This paper presents a novel approach to optimizing machine learning algorithms for large-scale data analysis. We propose a hybrid method combining deep learning techniques with traditional statistical methods to improve accuracy and computational efficiency.',
      az: 'Bu məqalədə böyük həcmli verilənlərin təhlili üçün maşın öyrənməsi alqoritmlərinin optimallaşdırılmasına yeni yanaşma təqdim olunur. Dərin öyrənmə texnikalarını ənənəvi statistik metodlarla birləşdirən hibrid metod təklif edirik.',
    },
    publishedDate: '2026-03-05',
    doi: '10.1234/sdu.2026.001',
    pdfUrl: '#',
    keywords: {
      en: ['Machine Learning', 'Data Analysis', 'Deep Learning', 'Optimization'],
      az: ['Maşın Öyrənməsi', 'Verilənlər Təhlili', 'Dərin Öyrənmə', 'Optimallaşdırma'],
    },
  },
  {
    id: 2,
    title: {
      en: 'Quantum Computing Applications in Cryptography',
      az: 'Kvant Kompüterlərinin Kriptoqrafiyada Tətbiqləri',
    },
    authors: {
      en: ['Kerimova L.', 'Nazarov M.'],
      az: ['Kərimova L.', 'Nəzərov M.'],
    },
    abstract: {
      en: 'We explore the potential applications of quantum computing in modern cryptographic systems. Our research demonstrates both the threats posed by quantum computers to current encryption methods and the opportunities for quantum-resistant cryptography.',
      az: 'Müasir kriptoqrafik sistemlərdə kvant kompüterlərinin potensial tətbiqlərini araşdırırıq. Tədqiqatımız kvant kompüterlərinin cari şifrələmə metodlarına təhdidlərini və kvant davamlı kriptoqrafiya üçün imkanları nümayiş etdirir.',
    },
    publishedDate: '2026-03-01',
    doi: '10.1234/sdu.2026.002',
    pdfUrl: '#',
    keywords: {
      en: ['Quantum Computing', 'Cryptography', 'Security', 'Encryption'],
      az: ['Kvant Kompüterləri', 'Kriptoqrafiya', 'Təhlükəsizlik', 'Şifrələmə'],
    },
  },
  {
    id: 3,
    title: {
      en: 'Graph Theory Applications in Network Optimization',
      az: 'Qraf Nəzəriyyəsinin Şəbəkə Optimallaşdırılmasında Tətbiqləri',
    },
    authors: {
      en: ['Ibrahimov K.', 'Mammadov A.', 'Aliyev V.'],
      az: ['İbrahimov K.', 'Məmmədov A.', 'Əliyev V.'],
    },
    abstract: {
      en: 'This study investigates the application of graph theory algorithms in optimizing complex network structures. We present new algorithms for shortest path problems and network flow optimization with practical applications in telecommunications.',
      az: 'Bu tədqiqat mürəkkəb şəbəkə strukturlarının optimallaşdırılmasında qraf nəzəriyyəsi alqoritmlərinin tətbiqini araşdırır. Telekommunikasiyada praktik tətbiqləri olan ən qısa yol məsələləri və şəbəkə axını optimallaşdırması üçün yeni alqoritmlər təqdim edirik.',
    },
    publishedDate: '2026-02-28',
    doi: '10.1234/sdu.2026.003',
    pdfUrl: '#',
    keywords: {
      en: ['Graph Theory', 'Network Optimization', 'Algorithms', 'Telecommunications'],
      az: ['Qraf Nəzəriyyəsi', 'Şəbəkə Optimallaşdırması', 'Alqoritmlər', 'Telekommunikasiya'],
    },
  },
  {
    id: 4,
    title: {
      en: 'Statistical Analysis of Climate Data Using R',
      az: 'R Proqramında İqlim Verilənlərinin Statistik Təhlili',
    },
    authors: {
      en: ['Rzayeva N.', 'Qasimov T.'],
      az: ['Rzayeva N.', 'Qasımov T.'],
    },
    abstract: {
      en: 'We present a comprehensive statistical analysis of climate data from the Caucasus region using R programming language. Our analysis includes time series modeling, trend detection, and predictive modeling for future climate scenarios.',
      az: 'R proqramlaşdırma dilindən istifadə edərək Qafqaz regionunun iqlim verilənlərinin hərtərəfli statistik təhlilini təqdim edirik. Təhlilimiz zaman sıraları modelləşdirməsini, trend aşkarlanmasını və gələcək iqlim ssenariləri üçün proqnoz modelləşdirməsini əhatə edir.',
    },
    publishedDate: '2026-02-25',
    doi: '10.1234/sdu.2026.004',
    pdfUrl: '#',
    keywords: {
      en: ['Statistics', 'Climate Data', 'R Programming', 'Time Series'],
      az: ['Statistika', 'İqlim Verilənləri', 'R Proqramlaşdırması', 'Zaman Sıraları'],
    },
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content (70%) */}
          <div className="lg:col-span-2">
            <ArticleList
              articles={latestArticles}
              title={t.home.latestArticles}
              showViewAll={true}
              viewAllHref="/archives"
            />
          </div>

          {/* Right Column - Sidebar (30%) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}