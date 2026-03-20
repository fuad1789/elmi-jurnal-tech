'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { Database, Globe, FileCheck, Award, ExternalLink } from 'lucide-react';

interface IndexingService {
  name: { en: string; az: string };
  description: { en: string; az: string };
  icon: React.ReactNode;
  url?: string;
}

export default function AbstractingIndexingPage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const indexingServices: IndexingService[] = [
    {
      name: { en: 'Google Scholar', az: 'Google Scholar' },
      description: {
        en: 'Freely accessible web search engine that indexes the full text or metadata of scholarly literature across an array of publishing formats and disciplines.',
        az: 'Nəşr formatları və intizamları üzrə elmi ədəbiyyatın tam mətnini və ya metadatalarını indeksləşdirən pulsuz veb axtarış sistemi.',
      },
      icon: <Globe className="h-8 w-8" />,
      url: 'https://scholar.google.com',
    },
    {
      name: { en: 'Crossref', az: 'Crossref' },
      description: {
        en: 'Official DOI registration agency providing persistent identifiers and infrastructure for scholarly content.',
        az: 'Elmi məzmun üçün davamlı identifikatorlar və infrastruktur təmin edən rəsmi DOI qeydiyyat agentliyi.',
      },
      icon: <FileCheck className="h-8 w-8" />,
      url: 'https://www.crossref.org',
    },
    {
      name: { en: 'BASE (Bielefeld Academic Search Engine)', az: 'BASE (Bielefeld Akademik Axtarış Sistemi)' },
      description: {
        en: 'One of the world\'s most voluminous search engines especially for academic web resources.',
        az: 'Xüsusilə akademik veb resursları üçün dünyanın ən həcmli axtarış sistemlərindən biri.',
      },
      icon: <Database className="h-8 w-8" />,
      url: 'https://www.base-search.net',
    },
    {
      name: { en: 'Dimensions', az: 'Dimensions' },
      description: {
        en: 'Next-generation research information system linking grants, publications, datasets, clinical trials, and policy documents.',
        az: 'Qrantları, nəşrləri, verilənlər bazalarını, klinik sınaqları və siyasət sənədlərini birləşdirən nəsil tədqiqat informasiya sistemi.',
      },
      icon: <Award className="h-8 w-8" />,
      url: 'https://www.dimensions.ai',
    },
    {
      name: { en: 'EuroPub', az: 'EuroPub' },
      description: {
        en: 'European reference database for scientific journals and articles.',
        az: 'Elmi jurnallar və məqalələr üçün Avropa istinad bazası.',
      },
      icon: <Globe className="h-8 w-8" />,
      url: 'https://www.europub.co.uk',
    },
    {
      name: { en: 'Academia.edu', az: 'Academia.edu' },
      description: {
        en: 'Platform for academics to share research papers and monitor impact.',
        az: 'Akademiklərin tədqiqat məqalələrini paylaşması və təsiri izləməsi üçün platforma.',
      },
      icon: <Globe className="h-8 w-8" />,
      url: 'https://www.academia.edu',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav.abstractingIndexing}</h1>
              <p className="text-blue-200 mt-1">Our journal is indexed in major databases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {isEn ? 'About Our Indexing' : 'İndeksləşdirməmiz Haqqında'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isEn
                  ? 'The Journal of Sumqait State University is committed to maximizing the visibility and accessibility of published research. We are indexed in numerous international databases and indexing services, ensuring that our articles reach a global audience of researchers, academics, and practitioners.'
                  : 'Sumqayıt Dövlət Universitetinin Jurnalı dərc olunmuş tədqiqatların görünürlüyünü və əlçatanlığını maksimum artırmağa sadiqlir. Məqalələrimizin tədqiqatçılar, akademiklər və praktiklər qlobal auditoriyasına çatmasını təmin edən çoxsaylı beynəlxalq bazalarda və indeksləşdirmə xidmətlərində indeksləşdirilirik.'}
              </p>
            </section>

            {/* Indexing Services List */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isEn ? 'Indexing Services' : 'İndeksləşdirmə Xidmətləri'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {indexingServices.map((service, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-academic-blue hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-academic-blue flex-shrink-0">{service.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{isEn ? service.name.en : service.name.az}</h3>
                          {service.url && (
                            <a
                              href={service.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-academic-blue"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                          {isEn ? service.description.en : service.description.az}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DOI Information */}
            <section className="bg-blue-50 rounded-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-academic-blue" />
                {isEn ? 'Digital Object Identifier (DOI)' : 'Rəqəmsal Obyekt İdentifikatoru (DOI)'}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'All articles published in our journal are assigned a unique DOI, ensuring permanent identification and easy citation. DOIs provide a persistent link to the article\'s location on the internet, even if the URL changes.'
                  : 'Jurnalımızda dərc olunan bütün məqalələrə unikal DOI təyin olunur, bu da daimi identifikasiyanı və asan istinadı təmin edir. DOI-lər URL dəyişsə belə, məqalənin internetdəki yerinə davamlı keçid təmin edir.'}
              </p>
              <p className="text-sm text-gray-600">
                {isEn ? 'Our DOI prefix: 10.1234/sdu' : 'Bizim DOI prefiksi: 10.1234/sdu'}
              </p>
            </section>

            {/* Open Access Statement */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isEn ? 'Open Access Policy' : 'Açıq Giriş Siyasəti'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {isEn
                  ? 'This journal provides immediate open access to its content on the principle that making research freely available to the public supports a greater global exchange of knowledge. All articles are published under the Creative Commons Attribution License (CC BY 4.0).'
                  : 'Bu jurnal öz məzmununa dərhal açıq giriş təmin edir, bu prinsipə əsaslanır ki, tədqiqatları ictimaiyyətə pulsuz təqdim etmək biliklərin daha böyük qlobal mübadiləsini dəstəkləyir. Bütün məqalələr Creative Commons Attribution Lisenziyası (CC BY 4.0) altında dərc olunur.'}
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