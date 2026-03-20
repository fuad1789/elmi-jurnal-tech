'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Placeholder for search functionality
      console.log('Searching for:', query);
    }
  };

  if (isOpen) {
    return (
      <div className="flex items-center gap-2">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-48 md:w-64 px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-academic-blue focus:border-transparent"
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setQuery('');
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="p-2 text-gray-700 hover:text-academic-blue hover:bg-gray-100 rounded-md transition-colors duration-200"
      aria-label="Open search"
    >
      <Search className="h-5 w-5" />
    </button>
  );
}