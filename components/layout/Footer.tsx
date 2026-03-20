'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Subscribing:', email);
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Journal Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-academic-blue font-bold text-lg">SDU</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sumqait State University</p>
                <p className="text-xs text-gray-400">Scientific Journal</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Peer-reviewed academic journal publishing high-quality research in Mathematics and Computer Science.
            </p>
            <p className="text-xs text-gray-500">
              © {currentYear} {t.footer.allRightsReserved}.
            </p>
          </div>

          {/* Journal Info Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.journalInfo}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/editorial-board" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {t.footer.editorialBoard}
                </Link>
              </li>
              <li>
                <Link href="/aims-scope" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {t.footer.aimsScope}
                </Link>
              </li>
              <li>
                <Link href="/abstracting-indexing" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {t.footer.abstractingIndexing}
                </Link>
              </li>
              <li>
                <Link href="/archives" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {t.nav.archives}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Authors Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.forAuthors}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about/author-guidelines" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {t.nav.authorGuidelines}
                </Link>
              </li>
              <li>
                <Link href="/about/publication-ethics" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {t.nav.publicationEthics}
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.newsletter}</h3>
            <p className="text-sm text-gray-400 mb-4">{t.footer.newsletterDesc}</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-academic-blue focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-academic-blue text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                {t.footer.join}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              Journal of Sumqait State University - Mathematics and Computer Science
            </p>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Admin Panel
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/about/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {t.nav.contact}
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/about/author-guidelines" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {t.nav.authorGuidelines}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}