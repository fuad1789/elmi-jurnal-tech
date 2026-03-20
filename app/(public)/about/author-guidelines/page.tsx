'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, BookOpen, PenTool, Upload, CheckCircle, ArrowRight } from 'lucide-react';

export default function AuthorGuidelinesPage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav.authorGuidelines}</h1>
              <p className="text-blue-200 mt-1">Instructions for preparing and submitting manuscripts</p>
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
                {isEn ? 'General Information' : 'Ümumi Məlumat'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'The Journal of Sumqait State University welcomes submissions of original research articles, review papers, and short communications in Mathematics and Computer Science. All manuscripts must be prepared according to the following guidelines.'
                  : 'Sumqayıt Dövlət Universitetinin Jurnalı Riyaziyyat və Kompüter Elmləri sahəsində orijinal tədqiqat məqalələrinin, icmal məqalələrinin və qısa kommunikasiyaların təqdim olunmasını alqışlayır. Bütün əlyazmalar aşağıdakı təlimatlara uyğun hazırlanmalıdır.'}
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>{isEn ? 'Submission Email:' : 'Təqdimat E-poçtu:'}</strong> journal@sdu.edu.az
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>{isEn ? 'Processing Time:' : 'Emal Müddəti:'}</strong> {isEn ? '4-6 weeks for initial review' : 'İlkin rəy üçün 4-6 həftə'}
                </p>
              </div>
            </section>

            {/* Manuscript Preparation */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Manuscript Preparation' : 'Əlyazmanın Hazırlanması'}
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* File Format */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-academic-blue text-white rounded-full flex items-center justify-center text-sm">1</span>
                    {isEn ? 'File Format' : 'Fayl Formatı'}
                  </h3>
                  <p className="text-gray-700 ml-8">
                    {isEn
                      ? 'Manuscripts should be submitted in Microsoft Word (.doc or .docx) or LaTeX format. For LaTeX submissions, please provide both the .tex file and the compiled PDF.'
                      : 'Əlyazmalar Microsoft Word (.doc və ya .docx) və ya LaTeX formatında təqdim olunmalıdır. LaTeX təqdimatları üçün zəhmət olmasa həm .tex faylını, həm də kompilyasiya olunmuş PDF-i təqdim edin.'}
                  </p>
                </div>

                {/* Language */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-academic-blue text-white rounded-full flex items-center justify-center text-sm">2</span>
                    {isEn ? 'Language' : 'Dil'}
                  </h3>
                  <p className="text-gray-700 ml-8">
                    {isEn
                      ? 'All manuscripts must be written in English. Authors whose native language is not English are encouraged to have their manuscripts proofread by a native English speaker before submission.'
                      : 'Bütün əlyazmalar ingilis dilində yazılmalıdır. Ana dili ingilis dili olmayan müəlliflərə təqdimatdan əvvəl əlyazmalarını ana dili ingilis dili olan biri tərəfindən yoxlatdırmaları tövsiyə olunur.'}
                  </p>
                </div>

                {/* Structure */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-academic-blue text-white rounded-full flex items-center justify-center text-sm">3</span>
                    {isEn ? 'Manuscript Structure' : 'Əlyazma Strukturu'}
                  </h3>
                  <p className="text-gray-700 ml-8 mb-3">
                    {isEn ? 'Manuscripts should include the following sections in order:' : 'Əlyazmalar aşağıdakı bölmələri ardıcıllıqla ehtiva etməlidir:'}
                  </p>
                  <ul className="ml-12 space-y-2">
                    {[
                      { en: 'Title (concise and informative)', az: 'Başlıq (qısa və məlumatverici)' },
                      { en: 'Author names and affiliations', az: 'Müəllif adları və aidiyyətləri' },
                      { en: 'Abstract (150-250 words)', az: 'Abstrakt (150-250 söz)' },
                      { en: 'Keywords (4-6 terms)', az: 'Açar sözlər (4-6 termin)' },
                      { en: 'Introduction', az: 'Giriş' },
                      { en: 'Materials and Methods / Methodology', az: 'Materiallar və Metodlar / Metodologiya' },
                      { en: 'Results', az: 'Nəticələr' },
                      { en: 'Discussion', az: 'Müzakirə' },
                      { en: 'Conclusion', az: 'Nəticə' },
                      { en: 'Acknowledgements (optional)', az: 'Təşəkkürlər (istəyə bağlı)' },
                      { en: 'References', az: 'İstinadlar' },
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {isEn ? item.en : item.az}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Formatting */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-academic-blue text-white rounded-full flex items-center justify-center text-sm">4</span>
                    {isEn ? 'Formatting Guidelines' : 'Formatlaşdırma Təlimatları'}
                  </h3>
                  <ul className="ml-8 space-y-2 text-gray-700">
                    <li>• {isEn ? 'Page size: A4' : 'Səhifə ölçüsü: A4'}</li>
                    <li>• {isEn ? 'Margins: 2.54 cm (1 inch) on all sides' : 'Haşiyələr: hər tərəfdən 2.54 sm (1 düym)'}</li>
                    <li>• {isEn ? 'Font: Times New Roman, 12 pt' : 'Şrift: Times New Roman, 12 pt'}</li>
                    <li>• {isEn ? 'Line spacing: 1.5' : 'Sətir aralığı: 1.5'}</li>
                    <li>• {isEn ? 'Page numbers: bottom center' : 'Səhifə nömrələri: aşağı mərkəz'}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Figures and Tables */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PenTool className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Figures and Tables' : 'Fiqurlar və Cədvəllər'}
                  </h2>
                </div>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  {isEn
                    ? 'All figures and tables should be numbered consecutively and cited in the text. Each figure and table should have a descriptive caption.'
                    : 'Bütün fiqurlar və cədvəllər ardıcıl olaraq nömrələnməli və mətndə istinad edilməlidir. Hər fiqur və cədvəl təsviredici başlığa malik olmalıdır.'}
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• {isEn ? 'Figures: Minimum 300 DPI resolution, TIFF or EPS format' : 'Fiqurlar: Minimum 300 DPI ayırdetmə, TIFF və ya EPS formatı'}</li>
                  <li>• {isEn ? 'Tables: Use simple borders, avoid vertical lines' : 'Cədvəllər: Sadə sərhədlərdən istifadə edin, şaquli xətlərdən çəkinin'}</li>
                </ul>
              </div>
            </section>

            {/* References */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'References' : 'İstinadlar'}
                  </h2>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                {isEn
                  ? 'References should follow the APA (American Psychological Association) 7th edition style. Examples:'
                  : 'İstinadlar APA (Amerika Psixologiya Assosiasiyası) 7-ci nəşr üslubuna uyğun olmalıdır. Nümunələr:'}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{isEn ? 'Journal Article:' : 'Jurnal Məqaləsi:'}</p>
                  <p className="text-gray-700 font-mono">
                    Smith, J., & Johnson, A. (2024). Title of the article. Journal Name, 15(2), 123-145. https://doi.org/xx.xxx/yyyy
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{isEn ? 'Book:' : 'Kitab:'}</p>
                  <p className="text-gray-700 font-mono">
                    Author, A. (2023). Title of the book. Publisher Name.
                  </p>
                </div>
              </div>
            </section>

            {/* Submission Process */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Submission Process' : 'Təqdimat Prosesi'}
                  </h2>
                </div>
              </div>
              <ol className="space-y-4">
                {[
                  { en: 'Prepare your manuscript according to the guidelines above', az: 'Əlyazmanızı yuxarıdakı təlimatlara uyğun hazırlayın' },
                  { en: 'Send your manuscript to journal@sdu.edu.az with the subject line "Manuscript Submission"', az: 'Əlyazmanızı "Manuscript Submission" mövzu xətti ilə journal@sdu.edu.az ünvanına göndərin' },
                  { en: 'Include a cover letter with author details and conflict of interest statement', az: 'Müəllif məlumatları və maraqlar toqquşması bəyanatı ilə müşayiət məktubu əlavə edin' },
                  { en: 'Wait for acknowledgment of receipt (within 3 business days)', az: 'Qəbul təsdiqini gözləyin (3 iş günü ərzində)' },
                  { en: 'Peer review process (4-6 weeks)', az: 'Ekspert rəyi prosesi (4-6 həftə)' },
                  { en: 'Editorial decision and notification', az: 'Redaksiya qərarı və bildiriş' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-academic-blue text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-0.5">{isEn ? item.en : item.az}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-academic-blue to-blue-600 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                {isEn ? 'Ready to Submit?' : 'Təqdim Etməyə Hazırsınız?'}
              </h2>
              <p className="mb-4 opacity-90">
                {isEn
                  ? 'Before submitting, please ensure your manuscript follows all the guidelines mentioned above.'
                  : 'Təqdim etməzdən əvvəl, zəhmət olmasa əlyazmanızın yuxarıda qeyd olunan bütün təlimatlara uyğun olduğundan əmin olun.'}
              </p>
              <Link
                href="mailto:journal@sdu.edu.az"
                className="inline-flex items-center gap-2 bg-white text-academic-blue px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Submit Your Manuscript' : 'Əlyazmanızı Təqdim Edin'}
                <ArrowRight className="h-5 w-5" />
              </Link>
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