'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { Users, Mail } from 'lucide-react';

interface Member {
  _id: string;
  name: string;
  role: 'Chief' | 'Editor' | 'Board';
  affiliation?: string;
  orderIndex?: number;
}

interface Settings {
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

interface Props {
  members: Member[];
  settings: Settings | null;
}

const ROLE_LABELS: Record<string, { en: string; az: string }> = {
  Chief: { en: 'Editors-in-Chief', az: 'Baş Redaktorlar' },
  Editor: { en: 'Editors', az: 'Redaktorlar' },
  Board: { en: 'Editorial Board', az: 'Redaksiya Heyəti' },
};

const ROLE_ORDER = ['Chief', 'Editor', 'Board'];

function MemberCard({ member, isChief }: { member: Member; isChief: boolean }) {
  return isChief ? (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <p className="text-lg font-semibold text-gray-900">{member.name}</p>
      {member.affiliation && (
        <p className="text-sm text-gray-600 mt-1">{member.affiliation}</p>
      )}
    </div>
  ) : (
    <div className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
      <div>
        <p className="font-semibold text-gray-900">{member.name}</p>
        {member.affiliation && (
          <p className="text-sm text-gray-600 mt-1">{member.affiliation}</p>
        )}
      </div>
    </div>
  );
}

export function EditorialBoardView({ members, settings }: Props) {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const grouped = ROLE_ORDER.reduce<Record<string, Member[]>>((acc, role) => {
    acc[role] = members.filter((m) => m.role === role);
    return acc;
  }, {});

  const hasAny = members.length > 0;

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
              <p className="text-blue-200 mt-1">
                {isEn ? 'Meet our distinguished editorial team' : 'Hörmətli redaksiya heyətimizlə tanış olun'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {!hasAny && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100 text-gray-500">
                {isEn ? 'No members found.' : 'Üzv tapılmadı.'}
              </div>
            )}

            {ROLE_ORDER.map((role) => {
              const group = grouped[role];
              if (!group.length) return null;
              const label = isEn ? ROLE_LABELS[role].en : ROLE_LABELS[role].az;
              const isChief = role === 'Chief';

              return (
                <section key={role} className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
                    {label}
                  </h2>
                  <div className={isChief ? 'space-y-4' : 'space-y-3'}>
                    {group.map((member) => (
                      <MemberCard key={member._id} member={member} isChief={isChief} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Contact Info */}
            <section className="bg-blue-50 rounded-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-academic-blue" />
                {isEn ? 'Contact the Editorial Office' : 'Redaksiya İdarəsi ilə Əlaqə'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {settings?.contactEmail && <p><strong>Email:</strong> {settings.contactEmail}</p>}
                {settings?.contactPhone && <p><strong>Phone:</strong> {settings.contactPhone}</p>}
                {settings?.address && <p><strong>Address:</strong> {settings.address}</p>}
                {!settings?.contactEmail && !settings?.contactPhone && !settings?.address && (
                  <p className="text-gray-400 italic">
                    {isEn ? 'Contact info not configured.' : 'Əlaqə məlumatları təyin edilməyib.'}
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
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
