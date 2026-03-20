'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Newspaper, Calendar, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface NewsItem {
  _id: string;
  title: { en: string; az: string };
  createdAt: string;
}

interface CurrentIssueData {
  volume: string;
  number: string;
  year: string;
  publishedDate: string;
}

export function Sidebar() {
  const { t, language } = useLanguage();
  const [currentIssue, setCurrentIssue] = useState<CurrentIssueData | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Fetch current issue
    fetch('/api/current-issue')
      .then((res) => res.json())
      .then((data) => {
        if (data) setCurrentIssue(data);
      })
      .catch(console.error);

    // Fetch news
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data) setNewsItems(data.slice(0, 3));
      })
      .catch(console.error);
  }, []);

  return (
    <aside className="space-y-6">
      {/* Current Issue Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-academic-blue to-blue-600 px-4 py-3">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t.sidebar.currentIssue}
          </h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {currentIssue ? (
              <Link
                href="/archives/current"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-blue-50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-academic-blue">
                    Vol. {currentIssue.volume}, No. {currentIssue.number} ({currentIssue.year})
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Published: {currentIssue.publishedDate}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-academic-blue" />
              </Link>
            ) : (
              <Link
                href="/archives"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-blue-50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-academic-blue">
                    {t.nav.archives}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Browse all issues</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-academic-blue" />
              </Link>
            )}
            <Link
              href="/archives"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-blue-50 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-academic-blue">
                  {t.nav.archives}
                </p>
                <p className="text-xs text-gray-500 mt-1">Browse all issues</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-academic-blue" />
            </Link>
          </div>
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
                  {language === 'en' ? news.title.en : news.title.az}
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
            <div className="p-4 text-sm text-gray-500">No news available</div>
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