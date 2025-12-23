import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.prayers': 'Prayer Times',
    'nav.events': 'Events',
    'nav.education': 'Education',
    'nav.donate': 'Donate',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.welcome': 'Welcome to',
    'hero.mosque': 'Faizan e Madina Masjid',
    'hero.subtitle': 'A place of worship, learning, and community',
    'hero.viewPrayers': 'View Prayer Times',
    'hero.learnMore': 'Learn More',
    
    // Prayer Times
    'prayers.title': 'Prayer Times',
    'prayers.subtitle': 'Daily Salah & Iqaamah Schedule',
    'prayers.fajr': 'Fajr',
    'prayers.dhuhr': 'Dhuhr',
    'prayers.asr': 'Asr',
    'prayers.maghrib': 'Maghrib',
    'prayers.isha': 'Isha',
    'prayers.jumma': 'Jumu\'ah',
    'prayers.iqaamah': 'Iqaamah',
    'prayers.friday': 'Friday Prayer',
    
    // About
    'about.title': 'About Our Mosque',
    'about.mission': 'Our Mission',
    'about.missionText': 'To serve the Muslim community by providing a welcoming space for worship, education, and spiritual growth based on the teachings of the Quran and Sunnah.',
    'about.vision': 'Our Vision',
    'about.visionText': 'To be a beacon of Islamic knowledge, unity, and service, fostering a strong and vibrant Muslim community.',
    'about.history': 'Our History',
    'about.historyText': 'Faizan e Madina Masjid was established to serve the growing Muslim community in Iskandrabad Colony. Our mosque continues to grow and serve the community with dedication.',
    
    // Announcements
    'announcements.title': 'Announcements',
    'announcements.latest': 'Latest Updates',
    
    // Events
    'events.title': 'Upcoming Events',
    'events.calendar': 'Event Calendar',
    'events.quranClasses': 'Quran Classes',
    'events.youthProgram': 'Youth Program',
    'events.lectures': 'Islamic Lectures',
    
    // Education
    'education.title': 'Educational Resources',
    'education.subtitle': 'Learn and Grow in Faith',
    'education.quran': 'Quran Studies',
    'education.hadith': 'Hadith Collection',
    'education.fiqh': 'Islamic Jurisprudence',
    'education.khutbah': 'Friday Sermons',
    
    // Donations
    'donate.title': 'Support Our Mosque',
    'donate.subtitle': 'Your contributions help us serve the community',
    'donate.zakat': 'Zakat',
    'donate.sadaqah': 'Sadaqah',
    'donate.general': 'General Donation',
    'donate.comingSoon': 'Coming Soon',
    'donate.comingSoonText': 'Online donation portal will be available soon. For now, please donate in person at the mosque.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Operating Hours',
    'contact.openDaily': 'Open daily for all prayers',
    'contact.sendMessage': 'Send Message',
    'contact.location': 'Iskandrabad Colony',
    
    // Newsletter
    'newsletter.title': 'Stay Connected',
    'newsletter.subtitle': 'Subscribe to our newsletter for updates',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'Subscribe',
    
    // Visitor Info
    'visitor.title': 'Visitor Information',
    'visitor.welcome': 'Welcome to Faizan e Madina Masjid',
    'visitor.dressCode': 'Dress Code',
    'visitor.dressCodeText': 'Please dress modestly. Women are requested to wear hijab.',
    'visitor.etiquette': 'Mosque Etiquette',
    'visitor.etiquetteText': 'Please turn off mobile phones, speak softly, and maintain cleanliness.',
    
    // Tasbeeh
    'tasbeeh.title': 'Digital Tasbeeh',
    'tasbeeh.reset': 'Reset',
    'tasbeeh.counter': 'Counter',
    
    // Footer
    'footer.rights': 'All Rights Reserved',
    'footer.followUs': 'Follow Us',
    
    // Common
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.comingSoon': 'Coming Soon',
  },
  ur: {
    // Navigation
    'nav.home': 'ہوم',
    'nav.about': 'ہمارے بارے میں',
    'nav.prayers': 'نماز کے اوقات',
    'nav.events': 'تقریبات',
    'nav.education': 'تعلیم',
    'nav.donate': 'عطیات',
    'nav.contact': 'رابطہ',
    
    // Hero
    'hero.welcome': 'خوش آمدید',
    'hero.mosque': 'فیضان مدینہ مسجد',
    'hero.subtitle': 'عبادت، علم اور برادری کا مقام',
    'hero.viewPrayers': 'نماز کے اوقات دیکھیں',
    'hero.learnMore': 'مزید جانیں',
    
    // Prayer Times
    'prayers.title': 'نماز کے اوقات',
    'prayers.subtitle': 'روزانہ نماز کا شیڈول',
    'prayers.fajr': 'فجر',
    'prayers.dhuhr': 'ظہر',
    'prayers.asr': 'عصر',
    'prayers.maghrib': 'مغرب',
    'prayers.isha': 'عشاء',
    'prayers.jumma': 'جمعہ',
    'prayers.iqaamah': 'اقامت',
    'prayers.friday': 'جمعہ کی نماز',
    
    // About
    'about.title': 'مسجد کے بارے میں',
    'about.mission': 'ہمارا مقصد',
    'about.missionText': 'قرآن و سنت کی تعلیمات کی بنیاد پر عبادت، تعلیم اور روحانی ترقی کے لیے خوش آئند جگہ فراہم کرکے مسلم کمیونٹی کی خدمت کرنا۔',
    'about.vision': 'ہمارا وژن',
    'about.visionText': 'اسلامی علم، اتحاد اور خدمت کا چراغ بننا، ایک مضبوط اور متحرک مسلم کمیونٹی کو فروغ دینا۔',
    'about.history': 'ہماری تاریخ',
    'about.historyText': 'فیضان مدینہ مسجد اسکندر آباد کالونی میں بڑھتی ہوئی مسلم کمیونٹی کی خدمت کے لیے قائم کی گئی۔',
    
    // Announcements
    'announcements.title': 'اعلانات',
    'announcements.latest': 'تازہ ترین اپڈیٹس',
    
    // Events
    'events.title': 'آنے والے پروگرام',
    'events.calendar': 'تقریبات کا کیلنڈر',
    'events.quranClasses': 'قرآن کی کلاسیں',
    'events.youthProgram': 'نوجوانان پروگرام',
    'events.lectures': 'اسلامی لیکچرز',
    
    // Education
    'education.title': 'تعلیمی وسائل',
    'education.subtitle': 'ایمان میں سیکھیں اور بڑھیں',
    'education.quran': 'قرآن کا مطالعہ',
    'education.hadith': 'حدیث کا مجموعہ',
    'education.fiqh': 'اسلامی فقہ',
    'education.khutbah': 'جمعہ کے خطبات',
    
    // Donations
    'donate.title': 'مسجد کی مدد کریں',
    'donate.subtitle': 'آپ کے عطیات کمیونٹی کی خدمت میں مدد کرتے ہیں',
    'donate.zakat': 'زکوٰۃ',
    'donate.sadaqah': 'صدقہ',
    'donate.general': 'عام عطیات',
    'donate.comingSoon': 'جلد آرہا ہے',
    'donate.comingSoonText': 'آن لائن عطیات کا پورٹل جلد دستیاب ہوگا۔ فی الحال مسجد میں براہ راست عطیہ کریں۔',
    
    // Contact
    'contact.title': 'ہم سے رابطہ کریں',
    'contact.address': 'پتہ',
    'contact.phone': 'فون',
    'contact.email': 'ای میل',
    'contact.hours': 'کھلنے کے اوقات',
    'contact.openDaily': 'تمام نمازوں کے لیے روزانہ کھلا',
    'contact.sendMessage': 'پیغام بھیجیں',
    'contact.location': 'اسکندر آباد کالونی',
    
    // Newsletter
    'newsletter.title': 'جڑے رہیں',
    'newsletter.subtitle': 'اپڈیٹس کے لیے نیوز لیٹر سبسکرائب کریں',
    'newsletter.placeholder': 'اپنا ای میل درج کریں',
    'newsletter.subscribe': 'سبسکرائب',
    
    // Visitor Info
    'visitor.title': 'زائرین کی معلومات',
    'visitor.welcome': 'فیضان مدینہ مسجد میں خوش آمدید',
    'visitor.dressCode': 'لباس کے اصول',
    'visitor.dressCodeText': 'براہ کرم با حیا لباس پہنیں۔ خواتین سے حجاب پہننے کی درخواست ہے۔',
    'visitor.etiquette': 'مسجد کے آداب',
    'visitor.etiquetteText': 'براہ کرم موبائل فون بند کریں، آہستہ بولیں اور صفائی برقرار رکھیں۔',
    
    // Tasbeeh
    'tasbeeh.title': 'ڈیجیٹل تسبیح',
    'tasbeeh.reset': 'ری سیٹ',
    'tasbeeh.counter': 'گنتی',
    
    // Footer
    'footer.rights': 'تمام حقوق محفوظ ہیں',
    'footer.followUs': 'ہمیں فالو کریں',
    
    // Common
    'common.readMore': 'مزید پڑھیں',
    'common.viewAll': 'سب دیکھیں',
    'common.comingSoon': 'جلد آرہا ہے',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
