'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, FileCheck, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function PublicationEthicsPage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav.publicationEthics}</h1>
              <p className="text-blue-200 mt-1">Ensuring integrity in academic publishing</p>
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
                {isEn ? 'Commitment to Ethics' : 'Etikaya Sadiqlik'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isEn
                  ? 'The Journal of Sumqait State University is committed to maintaining the highest standards of publication ethics. All parties involved in the publication process—authors, editors, reviewers, and the publisher—must adhere to these ethical guidelines to ensure the integrity of the scholarly record.'
                  : 'Sumqayıt Dövlət Universitetinin Jurnalı nəşr etikasının ən yüksək standartlarını qorumağa sadiqlir. Nəşr prosesində iştirak edən bütün tərəflər—müəlliflər, redaktorlar, rəyçilər və nəşriyyat—elmi qeydlərin bütövlüyünü təmin etmək üçün bu etik təlimatlara əməl etməlidirlər.'}
              </p>
            </section>

            {/* Authors Duties */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Duties of Authors' : 'Müəlliflərin Vəzifələri'}
                  </h2>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { en: 'Originality and Plagiarism', az: 'Orijinallıq və Plagiatlıq' },
                  { en: 'Multiple, Redundant or Concurrent Publication', az: 'Çoxlu, Təkrar və ya Eşzamanlı Nəşr' },
                  { en: 'Acknowledgement of Sources', az: 'Mənbələrin Tanınması' },
                  { en: 'Authorship of the Paper', az: 'Məqalənin Müəllifliyi' },
                  { en: 'Disclosure and Conflicts of Interest', az: 'Açıqlama və Maraqlar Toqquşması' },
                  { en: 'Fundamental Errors in Published Works', az: 'Dərc Olunmuş Əsərlərdə Əsas Səhvlər' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{isEn ? item.en : item.az}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviewers Duties */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Duties of Reviewers' : 'Rəyçilərin Vəzifələri'}
                  </h2>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { en: 'Contribution to Editorial Decisions', az: 'Redaksiya Qərarlarına Töhfə' },
                  { en: 'Promptness', az: 'Operativlik' },
                  { en: 'Objectivity', az: 'Objektivlik' },
                  { en: 'Confidentiality', az: 'Məxfilik' },
                  { en: 'Acknowledgement of Sources', az: 'Mənbələrin Tanınması' },
                  { en: 'Disclosure and Conflicts of Interest', az: 'Açıqlama və Maraqlar Toqquşması' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{isEn ? item.en : item.az}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Editors Duties */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Duties of Editors' : 'Redaktorların Vəzifələri'}
                  </h2>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { en: 'Publication Decisions', az: 'Nəşr Qərarları' },
                  { en: 'Fair Play and Equal Treatment', az: 'Ədalətli Oyun və Bərabər Davranış' },
                  { en: 'Confidentiality', az: 'Məxfilik' },
                  { en: 'Disclosure and Conflicts of Interest', az: 'Açıqlama və Maraqlar Toqquşması' },
                  { en: 'Involvement in Investigations', az: 'Tədqiqatlarda İştirak' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{isEn ? item.en : item.az}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Misconduct */}
            <section className="bg-red-50 rounded-lg border border-red-100 p-6">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                <h2 className="text-xl font-bold text-gray-900">
                  {isEn ? 'Research and Publication Misconduct' : 'Tədqiqat və Nəşr Pozuntuları'}
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'The journal takes all allegations of research and publication misconduct seriously. This includes but is not limited to: plagiarism, data fabrication, data falsification, duplicate publication, and unethical research practices. All allegations will be investigated according to COPE (Committee on Publication Ethics) guidelines.'
                  : 'Jurnal tədqiqat və nəşr pozuntuları ilə bağlı bütün iddialara ciddi yanaşır. Buraya plagiatsızlıq, verilənlərin saxtalaşdırılması, təkrar nəşr və qeyri-etik tədqiqat praktikaları daxildir, lakin bunlarla məhdudlaşmır. Bütün iddialar COPE (Nəşr Etikasına dair Komitə) təlimatlarına uyğun olaraq araşdırılacaq.'}
              </p>
            </section>

            {/* COPE Statement */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {isEn ? 'COPE Membership' : 'COPE Üzvülüyü'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isEn
                  ? 'Our journal follows the guidelines and best practices recommended by the Committee on Publication Ethics (COPE). We are committed to upholding the principles of transparency, accountability, and integrity in scholarly publishing.'
                  : 'Jurnalımız Nəşr Etikasına dair Komitənin (COPE) tövsiyə etdiyi təlimat və ən yaxşı praktikaları izləyir. Biz elmi nəşrdə şəffaflıq, məsuliyyət və bütövlük prinsiplərini qorumağa sadiqik.'}
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