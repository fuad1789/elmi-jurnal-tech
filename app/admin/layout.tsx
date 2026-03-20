import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Archive,
  Users,
  Settings,
  Newspaper,
  Mail,
} from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Elmi Jurnal SDU',
  description: 'Admin Panel for Managing Journal Content',
};

const navLinks = [
  { name: 'İdarə Paneli', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Məqalələr', href: '/admin/articles', icon: FileText },
  { name: 'Nömrələr və Arxiv', href: '/admin/issues', icon: Archive },
  { name: 'Xəbərlər', href: '/admin/news', icon: Newspaper },
  { name: 'Redaksiya Heyəti', href: '/admin/editorial-board', icon: Users },
  { name: 'Əlaqə Mesajları', href: '/admin/contact', icon: Mail },
  { name: 'Parametrlər', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50/50">
      {/* Sidebar - Persistent left navigation */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-sm md:flex hidden">
        <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            {/* You can replace this with a real Logo later */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <span className="font-bold">EJ</span>
            </div>
            <span className="text-lg tracking-tight text-slate-900">Admin Panel</span>

          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 group"
                >
                  <Icon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-600">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <div className="flex flex-col">
              <span className="font-medium text-slate-900">Admin User</span>
              <span className="text-xs text-slate-500">admin@sdu.edu.az</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-72 w-full">
        {/* Mobile Header (visible only on small screens) */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 md:hidden">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <span className="font-bold text-xs">EJ</span>
            </div>
            <span>Admin Panel</span>
          </div>
          {/* A mobile menu toggle would go here */}
        </header>

        <main className="flex-1">
          <div className="h-full p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
