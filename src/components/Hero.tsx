import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-islamic opacity-95" />
      <div className="absolute inset-0 islamic-pattern opacity-30" />
      
      {/* Decorative Elements - Enhanced */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/20 blur-3xl animate-float animate-glow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/30 blur-3xl animate-float animate-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary-foreground/10 blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Star Decorations */}
      <div className="absolute top-1/4 left-1/4 text-accent/30 text-4xl animate-pulse-slow">✦</div>
      <div className="absolute bottom-1/3 right-1/3 text-accent/30 text-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}>✦</div>

      {/* Dome Shape */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-background mosque-dome opacity-90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`max-w-4xl mx-auto ${language === 'ur' ? 'font-urdu' : ''}`}>
          {/* Arabic Bismillah */}
          <p className="font-arabic text-2xl md:text-3xl text-primary-foreground/90 mb-6 animate-fade-in">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Welcome Text */}
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.welcome')}
          </p>

          {/* Mosque Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 font-display animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {language === 'ur' ? (
              <span className="font-urdu">فیضان مدینہ مسجد</span>
            ) : (
              <>
                <span className="text-gradient-gold">Faizan e Madina</span>
                <br />
                <span>Masjid</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button
              size="lg"
              onClick={() => scrollToSection('prayers')}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg font-semibold"
            >
              {t('hero.viewPrayers')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
            >
              {t('hero.learnMore')}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
        </div>
      </div>

      {/* Crescent Moon Decoration */}
      <div className="absolute top-32 right-16 hidden lg:block">
        <div className="w-16 h-16 border-4 border-accent/40 rounded-full relative">
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
