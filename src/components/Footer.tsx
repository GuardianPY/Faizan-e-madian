import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.prayers', href: '#prayers' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.events', href: '#events' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <footer className="gradient-islamic text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Mosque Info */}
          <div className={language === 'ur' ? 'font-urdu text-right' : ''}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-arabic text-2xl">م</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">
                  {language === 'ur' ? 'فیضان مدینہ مسجد' : 'Faizan e Madina'}
                </h3>
                <p className="text-sm opacity-80">
                  {language === 'ur' ? 'اسکندر آباد کالونی' : 'Masjid'}
                </p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {language === 'ur' 
                ? 'عبادت، علم اور برادری کا مقام۔ قرآن و سنت کی تعلیمات پر مبنی۔'
                : 'A place of worship, learning, and community. Based on the teachings of Quran and Sunnah.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className={language === 'ur' ? 'font-urdu text-right' : ''}>
            <h4 className="font-display text-lg font-semibold mb-6">
              {language === 'ur' ? 'فوری روابط' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity hover:underline"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={language === 'ur' ? 'font-urdu text-right' : ''}>
            <h4 className="font-display text-lg font-semibold mb-6">
              {t('contact.title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80" />
                <span className="text-sm opacity-80">
                  {language === 'ur' ? 'اسکندر آباد کالونی' : 'Iskandrabad Colony'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 opacity-80" />
                <a href="tel:+923000671272" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  +92 300 0671272
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 opacity-80" />
                <a href="mailto:sulemanhyder2@gmail.com" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  sulemanhyder2@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className={language === 'ur' ? 'font-urdu text-right' : ''}>
            <h4 className="font-display text-lg font-semibold mb-6">
              {t('footer.followUs')}
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm opacity-60 mt-6">
              {language === 'ur' 
                ? 'سوشل میڈیا پر ہمیں فالو کریں'
                : 'Stay connected with us on social media'
              }
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-60">
              © {currentYear} Faizan e Madina Masjid. {t('footer.rights')}.
            </p>
            <p className="text-sm opacity-40 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-400 inline animate-pulse" /> by Suleman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
