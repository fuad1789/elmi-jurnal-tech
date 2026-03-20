'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, ExternalLink, FileDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface NewsItem {
  _id: string;
  title: { en: string; az: string } | string;
  createdAt: string;
}

interface RecentIssue {
  _id: string;
  volume: number;
  number: number;
  year: number;
  title: string;
  coverUrl: string;
  pdfUrl: string;
}

export function Sidebar() {
  const { t, language } = useLanguage();
  const [recentIssues, setRecentIssues] = useState<RecentIssue[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('/api/issues/recent', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setRecentIssues(data); })
      .catch(console.error);

    fetch('/api/news', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => { if (data) setNewsItems(data.slice(0, 3)); })
      .catch(console.error);
  }, []);

  function getNewsTitle(news: NewsItem): string {
    if (typeof news.title === 'string') return news.title;
    return language === 'en' ? news.title.en : news.title.az;
  }

  return (
    <aside className="space-y-6">
      {/* Current Issues Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-academic-blue to-blue-600 px-4 py-3 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t.sidebar.currentIssue}
          </h3>
          <Link href="/archives" className="text-xs text-white/80 hover:text-white underline">
            {t.sidebar.viewAll}
          </Link>
        </div>

        <div className="p-4">
          {recentIssues.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              {language === 'en' ? 'No issues available.' : 'Nömrə tapılmadı.'}
            </p>
          ) : (
            <div className="space-y-3">
              {recentIssues.map((issue) => (
                <div key={issue._id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                  {/* Small Cover Image */}
                  <div className="w-12 h-16 flex-shrink-0 rounded overflow-hidden border border-gray-200 shadow-sm">
                    {issue.coverUrl && issue.coverUrl !== 'dummy-url.png' ? (
                      <img
                        src={issue.coverUrl}
                        alt={`Vol.${issue.volume} No.${issue.number} cover`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white text-center p-1">
                        <span className="text-[9px] font-bold">SDU</span>
                        <span className="text-[9px]">Vol.{issue.volume}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{issue.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Vol.{issue.volume} No.{issue.number} · {issue.year}
                    </p>
                  </div>

                  {/* PDF Button */}
                  {issue.pdfUrl && issue.pdfUrl !== 'dummy-url.pdf' ? (
                    <a
                      href={issue.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 bg-academic-blue text-white text-[11px] font-medium rounded hover:bg-blue-800 transition-colors"
                    >
                      <FileDown className="h-3 w-3" />
                      PDF
                    </a>
                  ) : (
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-400 text-[11px] font-medium rounded cursor-not-allowed">
                      <FileDown className="h-3 w-3" />
                      PDF
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* News Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-academic-blue to-blue-600 px-4 py-3 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            {t.sidebar.news}
          </h3>
          <Link href="/news" className="text-xs text-white/80 hover:text-white underline">
            {t.sidebar.viewAll}
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {newsItems.length > 0 ? (
            newsItems.map((news) => (
              <Link
                key={news._id}
                href={`/news/${news._id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-900 font-medium line-clamp-2">
                  {getNewsTitle(news)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(news.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'az-AZ', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </Link>
            ))
          ) : (
            <div className="p-4 text-sm text-gray-500">
              {language === 'en' ? 'No news available.' : 'Xəbər tapılmadı.'}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-academic-blue to-blue-600 px-4 py-3">
          <h3 className="text-white font-semibold">{t.sidebar.quickLinks}</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <Link
            href="/about/author-guidelines"
            className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group"
          >
            <span className="text-sm text-gray-700 group-hover:text-academic-blue">
              {t.nav.authorGuidelines}
            </span>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-academic-blue" />
          </Link>
          <Link
            href="/editorial-board"
            className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group"
          >
            <span className="text-sm text-gray-700 group-hover:text-academic-blue">
              {t.nav.editorialBoard}
            </span>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-academic-blue" />
          </Link>
          <Link
            href="/about/contact"
            className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group"
          >
            <span className="text-sm text-gray-700 group-hover:text-academic-blue">
              {t.nav.contact}
            </span>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-academic-blue" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
