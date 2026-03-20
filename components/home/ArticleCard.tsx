'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Calendar, Users, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface Article {
  id: number;
  title: { en: string; az: string };
  authors: { en: string[]; az: string[] };
  abstract: { en: string; az: string };
  publishedDate: string;
  doi: string;
  pdfUrl?: string;
  keywords: { en: string[]; az: string[] };
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { t, language } = useLanguage();

  const isEn = language === 'en';
  const title = isEn ? article.title.en : article.title.az;
  const authors = isEn ? article.authors.en : article.authors.az;
  const abstract = isEn ? article.abstract.en : article.abstract.az;

  return (
    <article className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Article Type Icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-academic-blue" />
        </div>
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-academic-blue transition-colors">
            <Link href={`/article/${article.id}`}>{title}</Link>
          </h3>

          {/* Authors */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{t.article.authors}:</span>
            <span>{authors.join(', ')}</span>
          </div>

          {/* Abstract Preview */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {abstract}
          </p>

          {/* Metadata */}
          <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {t.article.published}:{' '}
                {new Date(article.publishedDate).toLocaleDateString(isEn ? 'en-US' : 'az-AZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{t.article.doi}:</span>
              <span className="font-mono">{article.doi}</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(isEn ? article.keywords.en : article.keywords.az).slice(0, 4).map((keyword, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-blue-50 text-academic-blue text-xs font-medium rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/article/${article.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-academic-blue text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
            >
              {t.home.readMore}
            </Link>
            {article.pdfUrl && (
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                PDF
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}