'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Sidebar } from '@/components/layout/Sidebar';
import Link from 'next/link';
import { Newspaper, Calendar, ImageIcon } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: { en: string; az: string };
  content: { en: string; az: string };
  imageUrl?: string;
  createdAt: string;
}

export function NewsListView({ news }: { news: NewsItem[] }) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{isEn ? 'News' : 'Xəbərlər'}</h1>
              <p className="text-blue-200 mt-1">
                {isEn ? 'Latest news and announcements' : 'Son xəbərlər və elanlar'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {news.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-100 text-gray-400">
                <Newspaper className="h-10 w-10 mx-auto mb-3" />
                <p>{isEn ? 'No news available.' : 'Xəbər tapılmadı.'}</p>
              </div>
            ) : (
              <div className="space-y-5">
                {news.map((item) => (
                  <Link
                    key={item._id}
                    href={`/news/${item._id}`}
                    className="flex gap-4 bg-white rounded-lg border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow group"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-gray-900 group-hover:text-academic-blue transition-colors line-clamp-2 leading-snug">
                        {isEn ? item.title.en || item.title.az : item.title.az}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {isEn ? item.content.en || item.content.az : item.content.az}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(item.createdAt).toLocaleDateString(isEn ? 'en-US' : 'az-AZ', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

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
