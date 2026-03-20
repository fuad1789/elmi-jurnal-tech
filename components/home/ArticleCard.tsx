'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Calendar, Users, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface Article {
  _id: string;
  title: string;
  authors: Array<{ name: string; affiliation?: string }> | string[];
  abstract: string;
  publishedAt?: string;
  createdAt?: string;
  doi?: string;
  pdfUrl?: string;
  tags?: string[];
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { t } = useLanguage();

  const authorNames = Array.isArray(article.authors)
    ? article.authors
        .map((a) => (typeof a === 'string' ? a : a.name))
        .join(', ')
    : '';

  const publishedDate = article.publishedAt || article.createdAt;

  return (
    <article className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-academic-blue" />
        </div>
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-academic-blue transition-colors">
            <Link href={`/article/${article._id}`}>{article.title}</Link>
          </h3>

          {/* Authors */}
          {authorNames && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{t.article.authors}:</span>
              <span>{authorNames}</span>
            </div>
          )}

          {/* Abstract */}
          {article.abstract && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {article.abstract}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 mb-4">
            {publishedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {t.article.published}:{' '}
                  {new Date(publishedDate).toLocaleDateString('az-AZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            {article.doi && (
              <div className="flex items-center gap-1">
                <span className="font-medium">{t.article.doi}:</span>
                <span className="font-mono">{article.doi}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-blue-50 text-academic-blue text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/article/${article._id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-academic-blue text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
            >
              {t.home.readMore}
            </Link>
            {article.pdfUrl && article.pdfUrl !== 'dummy-url.pdf' && (
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
