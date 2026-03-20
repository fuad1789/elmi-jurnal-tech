'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert(isEn ? 'Message sent successfully!' : 'Mesaj uğurla göndərildi!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Error: ' + (data.error || 'Failed to send message'));
      }
    } catch (error) {
      alert(isEn ? 'Failed to send message. Please try again.' : 'Mesaj göndərilmədi. Zəhmət olmasa yenidən cəhd edin.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.nav.contact}</h1>
              <p className="text-blue-200 mt-1">Get in touch with our editorial team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isEn ? 'Send Us a Message' : 'Bizə Mesaj Göndərin'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isEn ? 'Your Name' : 'Adınız'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-academic-blue focus:border-transparent"
                      placeholder={isEn ? 'John Doe' : 'Ad Soyad'}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isEn ? 'Email Address' : 'E-poçt Ünvanı'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-academic-blue focus:border-transparent"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isEn ? 'Subject' : 'Mövzu'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-academic-blue focus:border-transparent"
                    placeholder={isEn ? 'Inquiry about submission' : 'Təqdimat haqqında sorğu'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isEn ? 'Message' : 'Mesaj'}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-academic-blue focus:border-transparent resize-none"
                    placeholder={isEn ? 'Your message here...' : 'Mesajınız burada...'}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-academic-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
                >
                  <Send className="h-5 w-5" />
                  {isEn ? 'Send Message' : 'Mesajı Göndər'}
                </button>
              </form>
            </section>

            {/* Contact Information */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isEn ? 'Contact Information' : 'Əlaqə Məlumatları'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Editorial Office */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {isEn ? 'Editorial Office' : 'Redaksiya İdarəsi'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-academic-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">{isEn ? 'Email' : 'E-poçt'}</p>
                        <p className="font-medium text-gray-900">journal@sdu.edu.az</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-academic-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">{isEn ? 'Phone' : 'Telefon'}</p>
                        <p className="font-medium text-gray-900">+994 18 242 00 18</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {isEn ? 'Address' : 'Ünvan'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-academic-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">{isEn ? 'Location' : 'Yerləşmə'}</p>
                        <p className="font-medium text-gray-900">
                          {isEn ? 'Sumqait State University' : 'Sumqayıt Dövlət Universiteti'}
                        </p>
                        <p className="text-sm text-gray-700">H. Zərdabi küç. 54, Sumqayıt, AZ5008</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Office Hours */}
            <section className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEn ? 'Office Hours' : 'İş Saatları'}
                  </h2>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">
                    {isEn ? 'Monday - Friday' : 'Bazar ertəsi - Cümə'}
                  </span>
                  <span className="font-medium text-gray-900">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700">
                    {isEn ? 'Saturday' : 'Şənbə'}
                  </span>
                  <span className="font-medium text-gray-900">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">
                    {isEn ? 'Sunday' : 'Bazar'}
                  </span>
                  <span className="font-medium text-gray-500">{isEn ? 'Closed' : 'Bağlıdır'}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {isEn
                  ? '* Office hours may vary during holidays and summer break'
                  : '* İş saatları bayram günlərində və yay tətilində dəyişə bilər'}
              </p>
            </section>

            {/* FAQ Quick Links */}
            <section className="bg-gradient-to-r from-academic-blue to-blue-600 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                {isEn ? 'Quick Links' : 'Tez Keçidlər'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { en: 'Author Guidelines', az: 'Müəllif Təlimatları', href: '/about/author-guidelines' },
                  { en: 'Publication Ethics', az: 'Nəşr Etiyası', href: '/about/publication-ethics' },
                  { en: 'Submit a Manuscript', az: 'Əlyazma Təqdim Edin', href: 'mailto:journal@sdu.edu.az' },
                  { en: 'Editorial Board', az: 'Redaksiya Heyəti', href: '/editorial-board' },
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm">{isEn ? link.en : link.az}</span>
                  </a>
                ))}
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