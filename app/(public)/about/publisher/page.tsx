'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, BookOpen, Users, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function PublisherPage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav.publisher}</h1>
              <p className="text-blue-200 mt-1">About Sumqait State University</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* University Info */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Sumqait State University' : 'Sumqayıt Dövlət Universiteti'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEn ? 'Founded in 2016' : '2016-cı ildə təsis edilib'}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'Sumqait State University (SDU) is a modern higher education institution located in Sumqait, Azerbaijan. The university was established with the aim of training highly qualified specialists in various fields of science and technology, contributing to the development of the country\'s economy and society.'
                  : 'Sumqayıt Dövlət Universiteti (SDU) Azərbaycanın Sumqayıt şəhərində yerləşən müasir ali təhsil müəssisəsidir. Universitet ölkənin iqtisadiyyatı və cəmiyyətinin inkişafına töhfə verən müxtəlif elm və texnologiya sahələrində yüksək ixtisaslı mütəxəssislər hazırlamaq məqsədi ilə təsis edilmişdir.'}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {isEn
                  ? 'The university offers undergraduate, graduate, and doctoral programs across multiple faculties including Natural Sciences and Mathematics, Engineering and Technology, Economics and Management, and Humanities. SDU is committed to providing quality education, conducting cutting-edge research, and fostering innovation.'
                  : 'Universitet Təbiət Elmləri və Riyaziyyat, Mühəndislik və Texnologiya, İqtisadiyyat və İdarəetmə, və Humanitar Elmlər daxil olmaqla bir çox fakültələrdə bakalavr, magistr və doktorantura proqramları təklif edir. SDU keyfiyyətli təhsil verməyə, qabaqcıl tədqiqatlar aparmağa və innovasiyaları təşviq etməyə sadiqdir.'}
              </p>
            </section>

            {/* Mission and Vision */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-academic-blue" />
                    {isEn ? 'Mission' : 'Missiya'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {isEn
                      ? 'To provide high-quality education and conduct innovative research that contributes to the sustainable development of Azerbaijan and the global community.'
                      : 'Azərbaycanın və qlobal icmanın davamlı inkişafına töhfə verən yüksək keyfiyyətli təhsil vermək və innovativ tədqiqatlar aparmaq.'}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-academic-blue" />
                    {isEn ? 'Vision' : 'Vizyon'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {isEn
                      ? 'To become a leading research university in the Caucasus region, recognized for academic excellence and innovation.'
                      : 'Qafqaz regionunda aparıcı tədqiqat universitetinə çevrilmək, akademik mükəmməllik və innovasiya ilə tanınmaq.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Faculties */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isEn ? 'Faculties' : 'Fakültələr'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { en: 'Natural Sciences and Mathematics', az: 'Təbiət Elmləri və Riyaziyyat' },
                  { en: 'Engineering and Technology', az: 'Mühəndislik və Texnologiya' },
                  { en: 'Economics and Management', az: 'İqtisadiyyat və İdarəetmə' },
                  { en: 'Humanities and Social Sciences', az: 'Humanitar və Sosial Elmlər' },
                  { en: 'Computer Science and Information Technologies', az: 'Kompüter Elmləri və İnformasiya Texnologiyaları' },
                  { en: 'Energy and Electrical Engineering', az: 'Energetika və Elektrik Mühəndisliyi' },
                ].map((faculty, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-academic-blue hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-academic-blue rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{isEn ? faculty.en : faculty.az}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Journal Publishing */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Journal Publishing' : 'Jurnal Nəşri'}
                  </h2>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'Sumqait State University publishes the "Journal of Sumqait State University" in multiple series, including Mathematics and Computer Science, Natural Sciences, Economics, and Humanities. All journals are peer-reviewed and follow international publishing standards.'
                  : 'Sumqayıt Dövlət Universiteti "Sumqayıt Dövlət Universitetinin Jurnalı"nı Riyaziyyat və Kompüter Elmləri, Təbiət Elmləri, İqtisadiyyat və Humanitar Elmlər daxil olmaqla bir çox seriyalarda nəşr edir. Bütün jurnallar ekspert rəyindən keçir və beynəlxalq nəşr standartlarına uyğundur.'}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {isEn
                  ? 'The university is committed to open access publishing, ensuring that research outputs are freely available to the global academic community. All journals are indexed in major international databases.'
                  : 'Universitet açıq giriş nəşriyyatına sadiqdir, tədqiqat nəticələrinin qlobal akademik icmaya pulsuz təqdim olunmasını təmin edir. Bütün jurnallar əsas beynəlxalq bazalarda indeksləşdirilir.'}
              </p>
            </section>

            {/* Contact Info */}
            <section className="bg-gradient-to-r from-academic-blue to-blue-600 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">
                {isEn ? 'Contact Information' : 'Əlaqə Məlumatları'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{isEn ? 'Address' : 'Ünvan'}</p>
                      <p className="text-sm opacity-90">Sumqayıt, H. Zərdabi küç. 54, AZ5008</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{isEn ? 'Phone' : 'Telefon'}</p>
                      <p className="text-sm opacity-90">+994 18 242 00 18</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{isEn ? 'Email' : 'E-poçt'}</p>
                      <p className="text-sm opacity-90">info@sdu.edu.az</p>
                      <p className="text-sm opacity-90">journal@sdu.edu.az</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{isEn ? 'Website' : 'Veb-sayt'}</p>
                      <p className="text-sm opacity-90">www.sdu.edu.az</p>
                    </div>
                  </div>
                </div>
              </div>
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