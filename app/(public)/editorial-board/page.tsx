'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { Users, Mail } from 'lucide-react';

interface BoardMember {
  name: { en: string; az: string };
  affiliation: { en: string; az: string };
  role?: { en: string; az: string };
}

const editorsInChief: BoardMember[] = [
  {
    name: { en: 'Prof. Dr. Hamza Orucov', az: 'Prof. Dr. Həmza Orucov' },
    affiliation: { en: 'Sumqait State University, Azerbaijan', az: 'Sumqayıt Dövlət Universiteti, Azərbaycan' },
  },
  {
    name: { en: 'Prof. Dr. Agasi Melikov', az: 'Prof. Dr. Ağasi Melikov' },
    affiliation: { en: 'Sumqait State University, Azerbaijan', az: 'Sumqayıt Dövlət Universiteti, Azərbaycan' },
  },
];

const editors: BoardMember[] = [
  {
    name: { en: 'Prof. Dr. Rakib Efendiyev', az: 'Prof. Dr. Rakib Əfəndiyev' },
    affiliation: { en: 'Sumqait State University, Azerbaijan', az: 'Sumqayıt Dövlət Universiteti, Azərbaycan' },
  },
  {
    name: { en: 'Prof. Dr. Vagif Gasimov', az: 'Prof. Dr. Vaqif Qasımov' },
    affiliation: { en: 'Sumqait State University, Azerbaijan', az: 'Sumqayıt Dövlət Universiteti, Azərbaycan' },
  },
];

const editorialBoard: BoardMember[] = [
  { name: { en: 'Abdeljalil Nachaoui', az: 'Abdeljalil Nachaoui' }, affiliation: { en: 'Nantes University, France', az: 'Nant Universiteti, Fransa' } },
  { name: { en: 'Achyutha Krishnamoorthy', az: 'Achyutha Krishnamoorthy' }, affiliation: { en: 'CMS College Kottayam, India', az: 'CMS Kolleci Kottayam, Hindistan' } },
  { name: { en: 'Agamirza Bashirov', az: 'Ağamirzə Bəşirov' }, affiliation: { en: 'Eastern Mediterranean University, Turkey', az: 'Şərqi Aralıq dənizi Universiteti, Türkiyə' } },
  { name: { en: 'Agil Khanmamedov', az: 'Aqil Xanməmmədov' }, affiliation: { en: 'Baku State University, Azerbaijan', az: 'Bakı Dövlət Universiteti, Azərbaycan' } },
  { name: { en: 'Kamil Aida-zade', az: 'Kamil Aydə-zadə' }, affiliation: { en: 'Institute of Mathematics, Azerbaijan', az: 'Riyaziyyat İnstitutu, Azərbaycan' } },
  { name: { en: 'Alexander Dudin', az: 'Aleksandr Dudin' }, affiliation: { en: 'Belarus State University, Belarus', az: 'Belarus Dövlət Universiteti, Belarus' } },
  { name: { en: 'Nazim Ibragimov', az: 'Nazim İbrahimov' }, affiliation: { en: 'Sumqait State University, Azerbaijan', az: 'Sumqayıt Dövlət Universiteti, Azərbaycan' } },
  { name: { en: 'Yusif Shabanov', az: 'Yusif Şabanov' }, affiliation: { en: 'Sumqait State University, Azerbaijan', az: 'Sumqayıt Dövlət Universiteti, Azərbaycan' } },
];

export default function EditorialBoardPage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav.editorialBoard}</h1>
              <p className="text-blue-200 mt-1">Meet our distinguished editorial team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Editors-in-Chief */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
                {isEn ? 'Editors-in-Chief' : 'Baş Redaktorlar'}
              </h2>
              <div className="space-y-4">
                {editorsInChief.map((member, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">{isEn ? member.name.en : member.name.az}</p>
                    <p className="text-sm text-gray-600 mt-1">{isEn ? member.affiliation.en : member.affiliation.az}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Editors */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
                {isEn ? 'Editors' : 'Redaktorlar'}
              </h2>
              <div className="space-y-4">
                {editors.map((member, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">{isEn ? member.name.en : member.name.az}</p>
                    <p className="text-sm text-gray-600 mt-1">{isEn ? member.affiliation.en : member.affiliation.az}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Editorial Board */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
                {isEn ? 'Editorial Board' : 'Redaksiya Heyəti'}
              </h2>
              <div className="space-y-3">
                {editorialBoard.map((member, index) => (
                  <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{isEn ? member.name.en : member.name.az}</p>
                      <p className="text-sm text-gray-600 mt-1">{isEn ? member.affiliation.en : member.affiliation.az}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-blue-50 rounded-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-academic-blue" />
                {isEn ? 'Contact the Editorial Office' : 'Redaksiya İdarəsi ilə Əlaqə'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Email:</strong> journal@sdu.edu.az</p>
                <p><strong>Phone:</strong> +994 18 123 45 67</p>
                <p><strong>Address:</strong> Sumqait State University, Sumqait, Azerbaijan</p>
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