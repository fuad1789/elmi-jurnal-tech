'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Sidebar } from '@/components/layout/Sidebar';
import Link from 'next/link';
import { Calendar, ArrowLeft, ImageIcon } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: { en: string; az: string };
  content: { en: string; az: string };
  imageUrl?: string;
  createdAt: string;
}

export function NewsDetailView({ news }: { news: NewsItem }) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const title = isEn ? news.title.en || news.title.az : news.title.az;
  const content = isEn ? news.content.en || news.content.az : news.content.az;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEn ? 'Back to News' : 'Xəbərlərə qayıt'}
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">{title}</h1>
          <div className="flex items-center gap-2 text-blue-200 text-sm mt-3">
            <Calendar className="h-4 w-4" />
            {new Date(news.createdAt).toLocaleDateString(isEn ? 'en-US' : 'az-AZ', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
              {/* Cover image */}
              {news.imageUrl ? (
                <img
                  src={news.imageUrl}
                  alt={title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-300" />
                </div>
              )}

              <div className="p-6 md:p-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                  {content}
                </p>
              </div>
            </div>
          </article>

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
