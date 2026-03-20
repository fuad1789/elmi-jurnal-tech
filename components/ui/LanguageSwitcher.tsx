'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-academic-blue transition-colors duration-200 border border-gray-300 rounded-md hover:border-academic-blue hover:bg-gray-50"
      aria-label="Toggle language"
    >
      <span className={language === 'en' ? 'font-bold text-academic-blue' : ''}>EN</span>
      <span className="text-gray-400">/</span>
      <span className={language === 'az' ? 'font-bold text-academic-blue' : ''}>AZ</span>
    </button>
  );
}