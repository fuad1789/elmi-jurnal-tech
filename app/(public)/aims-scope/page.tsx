'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Target, Lightbulb, Users, FileText, CheckCircle } from 'lucide-react';

export default function AimsScopePage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const topics = [
    { en: 'Pure Mathematics', az: 'Saf Riyaziyyat' },
    { en: 'Applied Mathematics', az: 'Tətbiqi Riyaziyyat' },
    { en: 'Computer Science', az: 'Kompüter Elmləri' },
    { en: 'Artificial Intelligence', az: 'Süni İntellekt' },
    { en: 'Data Science', az: 'Verilənlər Elmi' },
    { en: 'Mathematical Modeling', az: 'Riyazi Modelləşdirmə' },
    { en: 'Numerical Analysis', az: 'Ədədi Təhlil' },
    { en: 'Statistics', az: 'Statistika' },
    { en: 'Optimization', az: 'Optimallaşdırma' },
    { en: 'Cryptography', az: 'Kriptoqrafiya' },
    { en: 'Network Theory', az: 'Şəbəkə Nəzəriyyəsi' },
    { en: 'Machine Learning', az: 'Maşın Öyrənməsi' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav.aimsScope}</h1>
              <p className="text-blue-200 mt-1">Understanding our journal's focus and mission</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Aims Section */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Aims' : 'Məqsədlər'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    {isEn
                      ? 'The Journal of Sumqait State University aims to publish high-quality, peer-reviewed research articles in Mathematics and Computer Science. Our goal is to contribute to the advancement of knowledge in these fields by providing a platform for researchers to share their findings with the global academic community.'
                      : 'Sumqayıt Dövlət Universitetinin Jurnalı Riyaziyyat və Kompüter Elmləri sahəsində yüksək keyfiyyətli, ekspert rəyindən keçmiş tədqiqat məqalələrini dərc etməyi hədəfləyir. Məqsədimiz tədqiqatçılara tapıntılarını qlobal akademik icma ilə paylaşmaq üçün platforma təmin edərək bu sahələrdə biliklərin irəliləməsinə töhfə verməkdir.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-academic-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {isEn
                      ? 'Disseminate original research contributions'
                      : 'Orijinal tədqiqat töhfələrini yaymaq'}
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-academic-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {isEn
                      ? 'Foster innovation and scientific discovery'
                      : 'İnnovasiya və elmi kəşfləri təşviq etmək'}
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-academic-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {isEn
                      ? 'Support the academic community'
                      : 'Akademik icmanı dəstəkləmək'}
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-academic-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {isEn
                      ? 'Maintain rigorous peer-review standards'
                      : 'Sərt ekspert rəyi standartlarını qorumaq'}
                  </p>
                </div>
              </div>
            </section>

            {/* Scope Section */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Scope' : 'Əhatə'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    {isEn
                      ? 'The journal covers a wide range of topics in Mathematics and Computer Science, including but not limited to:'
                      : 'Jurnal Riyaziyyat və Kompüter Elmləri sahəsində geniş mövzuları əhatə edir, o cümlədən, lakin bunlarla məhdudlaşmır:'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 text-academic-blue flex-shrink-0" />
                    <span className="text-sm text-gray-800 font-medium">
                      {isEn ? topic.en : topic.az}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Article Types */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isEn ? 'Article Types' : 'Məqalə Növləri'}
              </h2>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isEn ? 'Research Articles' : 'Tədqiqat Məqalələri'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isEn
                      ? 'Original research presenting significant findings and contributions to the field.'
                      : 'Sahəyə əhəmiyyətli tapıntılar və töhfələr təqdim edən orijinal tədqiqatlar.'}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isEn ? 'Review Articles' : 'İcmal Məqalələri'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isEn
                      ? 'Comprehensive reviews of current research topics, providing critical analysis and future directions.'
                      : 'Kritik təhlil və gələcək istiqamətlər təqdim edən cari tədqiqat mövzularının hərtərəfli icmalları.'}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isEn ? 'Short Communications' : 'Qısa Kommunikasiyalar'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isEn
                      ? 'Brief reports of significant research findings that warrant rapid publication.'
                      : 'Təcili dərc olunmasını tələb edən əhəmiyyətli tədqiqat tapıntılarının qısa hesabatları.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Open Access */}
            <section className="bg-gradient-to-r from-academic-blue to-blue-600 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                {isEn ? 'Open Access Journal' : 'Açıq Giriş Jurnalı'}
              </h2>
              <p className="leading-relaxed opacity-90">
                {isEn
                  ? 'All articles published in the Journal of Sumqait State University are freely available to readers worldwide without any subscription fees. This open access model ensures maximum visibility and impact of published research.'
                  : 'Sumqayıt Dövlət Universitetinin Jurnalında dərc olunan bütün məqalələr heç bir abunə haqqı olmadan dünya oxucularına pulsuz təqdim olunur. Bu açıq giriş modeli dərc olunmuş tədqiqatların maksimum görünürlüyünü və təsirini təmin edir.'}
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