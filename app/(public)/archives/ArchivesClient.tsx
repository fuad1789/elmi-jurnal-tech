'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { Archive, Calendar, FileText, ChevronRight } from 'lucide-react';

interface SerializedIssue {
  _id: string;
  volume: number;
  number: number;
  year: number;
  isCurrent: boolean;
  pdfUrl: string;
  coverUrl: string;
}

export default function ArchivesClient({ issues }: { issues: SerializedIssue[] }) {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const currentIssue = issues.find(i => i.isCurrent) || issues[0];
  const allIssues = issues;

  // Group issues by year
  const issuesByYear = allIssues.reduce((acc, issue) => {
    if (!acc[issue.year]) {
      acc[issue.year] = [];
    }
    acc[issue.year].push(issue);
    return acc;
  }, {} as Record<number, SerializedIssue[]>);

  // Helper to determine string like "June" / "December"
  const getIssueMonth = (num: number) => {
    if (num === 1) return isEn ? 'June' : 'İyun';
    if (num === 2) return isEn ? 'December' : 'Dekabr';
    return '';
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Archive className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav?.archives || 'Archives'}</h1>
              <p className="text-blue-200 mt-1">
                {isEn ? 'Browse all published issues' : 'Nəşr olunmuş bütün nömrələrə baxın'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Issue Highlight */}
            {currentIssue && (
              <section className="bg-gradient-to-r from-academic-blue to-blue-600 text-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {isEn ? 'Current Issue' : 'Cari Nömrə'}
                    </h2>
                    <p className="text-blue-100 mb-4">
                      Vol. {currentIssue.volume}, No. {currentIssue.number} ({getIssueMonth(currentIssue.number)} {currentIssue.year})
                    </p>
                    {currentIssue.pdfUrl ? (
                      <a
                        href={currentIssue.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-academic-blue px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                      >
                        {isEn ? 'View PDF' : 'PDF-ə Bax'}
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => alert(isEn ? 'PDF is not available for this older issue.' : 'Bu köhnə nömrə üçün PDF mövcud deyil. Zəhmət olmasa Admin paneldən yükləyin.')}
                        className="inline-flex items-center gap-2 bg-white/80 text-academic-blue/80 px-4 py-2 rounded-md font-medium cursor-not-allowed"
                      >
                        {isEn ? 'PDF Unavailable' : 'PDF Yoxdur'}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-20 h-20 bg-white/20 rounded-lg">
                    <FileText className="h-10 w-10" />
                  </div>
                </div>
              </section>
            )}

            {/* Archives List */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isEn ? 'All Issues' : 'Bütün Nömrələr'}
              </h2>

              <div className="space-y-8">
                {Object.keys(issuesByYear).length === 0 && (
                  <p className="text-gray-500">
                    {isEn ? 'No issues have been published yet.' : 'Hələ heç bir nömrə nəşr olunmayıb.'}
                  </p>
                )}
                {Object.entries(issuesByYear)
                  .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                  .map(([year, yearIssues]) => (
                    <div key={year}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-academic-blue" />
                        {year}
                      </h3>
                      <div className="space-y-3">
                        {yearIssues.map((issue) => (
                          <a
                            key={issue._id}
                            href={issue.pdfUrl || '#'}
                            target={issue.pdfUrl ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!issue.pdfUrl) {
                                e.preventDefault();
                                alert(isEn ? 'PDF is not available for this older issue.' : 'Bu köhnə nömrə üçün PDF mövcud deyil. Zəhmət olmasa Admin paneldən yükləyin.');
                              }
                            }}
                            className="block p-4 border border-gray-200 rounded-lg hover:border-academic-blue hover:bg-blue-50 transition-all duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FileText className="h-5 w-5 text-academic-blue" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {isEn
                                      ? `Vol. ${issue.volume}, No. ${issue.number}`
                                      : `Cild ${issue.volume}, № ${issue.number}`}
                                    {issue.isCurrent && (
                                      <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                        {isEn ? 'Current' : 'Cari'}
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {getIssueMonth(issue.number)} {issue.year}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Journal Info */}
            <section className="bg-blue-50 rounded-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isEn ? 'About the Archives' : 'Arxiv Haqqında'}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'The Journal of Sumqait State University has been publishing research in Mathematics and Computer Science since 2022. All articles are freely available under open access.'
                  : 'Sumqayıt Dövlət Universitetinin Jurnalı 2022-ci ildən Riyaziyyat və Kompüter Elmləri sahəsində tədqiqatlar dərc edir. Bütün məqalələr açıq giriş altında pulsuz mövcuddur.'}
              </p>
              <p className="text-sm text-gray-600">
                {isEn
                  ? 'For citation purposes, please use the DOI provided with each article.'
                  : 'Sitat məqsədləri üçün hər məqalə ilə təqdim olunan DOI-dən istifadə edin.'}
              </p>
            </section>
          </div>

          {/* Right Column - Sidebar */}
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
