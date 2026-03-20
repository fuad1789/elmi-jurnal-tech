import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ArticleList } from '@/components/home/ArticleList';
import { Sidebar } from '@/components/layout/Sidebar';
import { getArticles } from '@/app/actions/articles';
import { getIssues } from '@/actions/issue.actions';
import { getSiteSettings } from '@/app/actions/siteSettings';

export default async function HomePage() {
  const [articles, issuesData, settings] = await Promise.all([
    getArticles(),
    getIssues(),
    getSiteSettings(),
  ]);
  const published = articles.filter((a: any) => a.status === 'published');
  const currentIssue = issuesData.success
    ? issuesData.issues.find((i: any) => i.isCurrent)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection
        currentIssueCover={currentIssue?.coverUrl ?? null}
        issnPrint={settings?.issnPrint ?? null}
        issnOnline={settings?.issnOnline ?? null}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArticleList
              articles={published}
              showViewAll={true}
              viewAllHref="/archives"
            />
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
