'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Article, ArticleCard } from './ArticleCard';
import { useLanguage } from '@/context/LanguageContext';

interface ArticleListProps {
  articles: Article[];
  title?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

export function ArticleList({
  articles,
  title,
  showViewAll = true,
  viewAllHref = '/archives',
}: ArticleListProps) {
  const { t } = useLanguage();

  const heading = title ?? t.home.latestArticles;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
        {showViewAll && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-academic-blue hover:text-blue-700 transition-colors"
          >
            {t.home.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Hal-hazırda məqalə yoxdur.</p>
        </div>
      )}
    </section>
  );
}
