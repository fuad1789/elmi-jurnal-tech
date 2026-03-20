import { getArticles } from "@/app/actions/articles";
import { getIssues } from "@/actions/issue.actions";
import { getEditorialMembers } from "@/app/actions/editorialMember";
import { getContactMessages } from "@/app/actions/contactMessages";
import { getSiteSettings } from "@/app/actions/siteSettings";
import Link from "next/link";
import {
  FileText,
  Archive,
  Users,
  Mail,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "İdarə Paneli | Admin",
};

export default async function DashboardPage() {
  const [articles, issuesData, members, messages, settings] = await Promise.all([
    getArticles(),
    getIssues(),
    getEditorialMembers(),
    getContactMessages(),
    getSiteSettings(),
  ]);

  const issues = issuesData.success ? issuesData.issues : [];
  const currentIssue = issues.find((i: any) => i.isCurrent);
  const publishedArticles = articles.filter((a: any) => a.status === "published");
  const draftArticles = articles.filter((a: any) => a.status === "draft");
  const unreadMessages = messages.filter((m: any) => !m.isRead);
  const recentMessages = messages.slice(0, 5);
  const recentArticles = articles.slice(0, 5);

  const stats = [
    {
      label: "Ümumi Məqalələr",
      value: articles.length,
      sub: `${publishedArticles.length} dərc edilmiş`,
      icon: FileText,
      href: "/admin/articles",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Nömrələr",
      value: issues.length,
      sub: currentIssue ? `Cari: C.${currentIssue.volume} №${currentIssue.number}` : "Cari nömrə yoxdur",
      icon: Archive,
      href: "/admin/issues",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Redaksiya Heyəti",
      value: members.length,
      sub: `${members.filter((m: any) => m.role === "Chief").length} baş redaktor`,
      icon: Users,
      href: "/admin/editorial-board",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Mesajlar",
      value: messages.length,
      sub: unreadMessages.length > 0 ? `${unreadMessages.length} oxunmamış` : "Hamısı oxunub",
      icon: Mail,
      href: "/admin/contact",
      color: "text-orange-600",
      bg: "bg-orange-50",
      alert: unreadMessages.length > 0,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">İdarə Paneli</h1>
        <p className="text-sm text-slate-500 mt-1">Jurnalınızın ümumi vəziyyətinə baxış.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">{stat.label}</span>
                <div className={`h-9 w-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${stat.alert ? "text-orange-500 font-medium" : "text-slate-400"}`}>
                  {stat.alert && <AlertCircle className="h-3 w-3" />}
                  {stat.sub}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Issue */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-academic-blue" />
              Cari Nömrə
            </h2>
            <Link href="/admin/issues" className="text-xs text-academic-blue hover:underline">Hamısına bax</Link>
          </div>
          <div className="p-5">
            {currentIssue ? (
              <div className="flex gap-4 items-start">
                {currentIssue.coverUrl && currentIssue.coverUrl !== "dummy-url.png" ? (
                  <img
                    src={currentIssue.coverUrl}
                    alt="cover"
                    className="w-16 h-22 object-cover rounded-md border border-slate-200 shadow-sm flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-22 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">SDU</span>
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <p className="font-semibold text-slate-900 text-sm leading-snug">{currentIssue.title}</p>
                  <p className="text-xs text-slate-500">
                    Cild {currentIssue.volume}, №{currentIssue.number} · {currentIssue.year}
                  </p>
                  {currentIssue.editor && (
                    <p className="text-xs text-slate-500">Redaktor: {currentIssue.editor}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full w-fit mt-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Cari
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-6">Cari nömrə təyin edilməyib.</p>
            )}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-academic-blue" />
              Son Məqalələr
            </h2>
            <Link href="/admin/articles" className="text-xs text-academic-blue hover:underline">Hamısına bax</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentArticles.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">Məqalə yoxdur.</p>
            ) : (
              recentArticles.map((article: any) => (
                <div key={article._id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {typeof article.title === "object" ? article.title.en || article.title.az : article.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {Array.isArray(article.authors)
                        ? article.authors.map((a: any) => a.name || a).join(", ")
                        : article.authors}
                    </p>
                  </div>
                  <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                    article.status === "published"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {article.status === "published" ? "Dərc" : "Qaralama"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="h-4 w-4 text-academic-blue" />
              Son Mesajlar
              {unreadMessages.length > 0 && (
                <span className="text-xs font-semibold bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
                  {unreadMessages.length}
                </span>
              )}
            </h2>
            <Link href="/admin/contact" className="text-xs text-academic-blue hover:underline">Hamısına bax</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">Mesaj yoxdur.</p>
            ) : (
              recentMessages.map((msg: any) => (
                <div key={msg._id} className="px-5 py-3 flex items-start gap-3">
                  <div className={`h-2 w-2 rounded-full flex-shrink-0 mt-1.5 ${!msg.isRead ? "bg-orange-400" : "bg-slate-200"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{msg.name}</p>
                    <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(msg.createdAt).toLocaleDateString("az-AZ", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Site Settings Summary */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Sayt Parametrləri</h2>
          <Link href="/admin/settings" className="text-xs text-academic-blue hover:underline">Redaktə et</Link>
        </div>
        <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "E-poçt", value: settings?.contactEmail },
            { label: "Telefon", value: settings?.contactPhone },
            { label: "Ünvan", value: settings?.address },
            { label: "ISSN (Çap)", value: settings?.issnPrint },
            { label: "ISSN (Onlayn)", value: settings?.issnOnline },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">
                {item.value || <span className="text-slate-300 italic">Təyin edilməyib</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
