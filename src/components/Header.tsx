import { useState } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.prayers', href: '#prayers' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.events', href: '#events' },
    { key: 'nav.education', href: '#education' },
    { key: 'nav.donate', href: '#donate' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-islamic flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-arabic text-xl font-bold">م</span>
            </div>
            <div className={language === 'ur' ? 'font-urdu text-right' : ''}>
              <h1 className="font-display text-lg md:text-xl font-bold text-primary">
                {language === 'ur' ? 'فیضان مدینہ' : 'Faizan e Madina'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {language === 'ur' ? 'مسجد' : 'Masjid'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary ${
                  language === 'ur' ? 'font-urdu' : ''
                }`}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full"
              title={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle language</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`lg:hidden py-4 border-t border-border ${language === 'ur' ? 'text-right' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full px-4 py-3 text-left hover:bg-primary/10 hover:text-primary transition-colors ${
                  language === 'ur' ? 'font-urdu text-right' : ''
                }`}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
