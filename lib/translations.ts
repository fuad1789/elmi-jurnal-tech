export type Language = 'az' | 'en';

export interface Translation {
  nav: {
    home: string;
    editorialBoard: string;
    abstractingIndexing: string;
    aimsScope: string;
    about: string;
    publicationEthics: string;
    authorGuidelines: string;
    publisher: string;
    contact: string;
    archives: string;
  };
  hero: {
    title: string;
    subtitle: string;
    issn: string;
    submitButton: string;
  };
  home: {
    latestArticles: string;
    viewAll: string;
    readMore: string;
  };
  sidebar: {
    news: string;
    viewAll: string;
    currentIssue: string;
    quickLinks: string;
  };
  footer: {
    allRightsReserved: string;
    journalInfo: string;
    forAuthors: string;
    newsletter: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    join: string;
    quickLinks: string;
    editorialBoard: string;
    aimsScope: string;
    abstractingIndexing: string;
  };
  article: {
    published: string;
    authors: string;
    doi: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      editorialBoard: 'Editorial Board',
      abstractingIndexing: 'Abstracting and Indexing',
      aimsScope: 'Aims and Scope',
      about: 'About',
      publicationEthics: 'Publication Ethics',
      authorGuidelines: 'Author Guidelines',
      publisher: 'Publisher',
      contact: 'Contact',
      archives: 'Archives',
    },
    hero: {
      title: 'Journal of Sumgait State University',
      subtitle: 'Mathematics and Computer Science',
      issn: 'ISSN: 2989-3453 print | E-3012-4567',
      submitButton: 'Submit an Article',
    },
    home: {
      latestArticles: 'Latest Articles',
      viewAll: 'View All Articles',
      readMore: 'Read More',
    },
    sidebar: {
      news: 'News',
      viewAll: 'View All',
      currentIssue: 'Current Issue',
      quickLinks: 'Quick Links',
    },
    footer: {
      allRightsReserved: 'All rights reserved',
      journalInfo: 'Journal Info',
      forAuthors: 'For Authors',
      newsletter: 'Newsletter',
      newsletterDesc: 'Subscribe to get updates',
      emailPlaceholder: 'Enter your email',
      join: 'Join',
      quickLinks: 'Quick Links',
      editorialBoard: 'Editorial Board',
      aimsScope: 'Aims and Scope',
      abstractingIndexing: 'Abstracting & Indexing',
    },
    article: {
      published: 'Published',
      authors: 'Authors',
      doi: 'DOI',
    },
  },
  az: {
    nav: {
      home: 'Ana Səhifə',
      editorialBoard: 'Redaksiya Heyəti',
      abstractingIndexing: 'İndeksləşdirmə',
      aimsScope: 'Məqsəd və Əhatə',
      about: 'Haqqında',
      publicationEthics: 'Nəşr Etiyası',
      authorGuidelines: 'Müəllif Təlimatları',
      publisher: 'Nəşriyyat',
      contact: 'Əlaqə',
      archives: 'Arxivlər',
    },
    hero: {
      title: 'Sumqayıt Dövlət Universitetinin Jurnalı',
      subtitle: 'Riyaziyyat və Kompüter Elmləri',
      issn: 'ISSN: 2989-3453 çap | E-3012-4567 onlayn',
      submitButton: 'Məqalə Təqdim Edin',
    },
    home: {
      latestArticles: 'Son Məqalələr',
      viewAll: 'Bütün Məqalələrə Bax',
      readMore: 'Daha Ətraflı',
    },
    sidebar: {
      news: 'Xəbərlər',
      viewAll: 'Hamısına Bax',
      currentIssue: 'Cari Nömrə',
      quickLinks: 'Tez Keçidlər',
    },
    footer: {
      allRightsReserved: 'Bütün hüquqlar qorunur',
      journalInfo: 'Jurnal Haqqında',
      forAuthors: 'Müəlliflər Üçün',
      newsletter: 'Bülleten',
      newsletterDesc: 'Yenilikləri almaq üçün abunə olun',
      emailPlaceholder: 'E-poçtunuzu daxil edin',
      join: 'Qoşul',
      quickLinks: 'Tez Keçidlər',
      editorialBoard: 'Redaksiya Heyəti',
      aimsScope: 'Məqsəd və Əhatə',
      abstractingIndexing: 'İndeksləşdirmə',
    },
    article: {
      published: 'Dərc olunub',
      authors: 'Müəlliflər',
      doi: 'DOI',
    },
  },
};

export const getTranslation = (lang: Language): Translation => {
  return translations[lang];
};