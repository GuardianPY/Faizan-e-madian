import { Target, Eye, History, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t, language } = useLanguage();

  const sections = [
    {
      icon: Target,
      titleKey: 'about.mission',
      textKey: 'about.missionText',
      color: 'from-primary to-mosque-teal',
    },
    {
      icon: Eye,
      titleKey: 'about.vision',
      textKey: 'about.visionText',
      color: 'from-accent to-mosque-gold-light',
    },
    {
      icon: History,
      titleKey: 'about.history',
      textKey: 'about.historyText',
      color: 'from-mosque-teal to-primary',
    },
  ];

  const leadershipTeam = [
    { name: language === 'ur' ? 'امام صاحب' : 'Imam', role: language === 'ur' ? 'امام و خطیب' : 'Imam & Khateeb' },
    { name: language === 'ur' ? 'صدر' : 'President', role: language === 'ur' ? 'انتظامی سربراہ' : 'Administrative Head' },
    { name: language === 'ur' ? 'سیکریٹری' : 'Secretary', role: language === 'ur' ? 'جنرل سیکریٹری' : 'General Secretary' },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {language === 'ur' ? 'ہمارے بارے میں' : 'About Us'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Mission, Vision, History Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.titleKey}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                <CardContent className={`p-8 ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${section.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    {t(section.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(section.textKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leadership Section */}
        <div className={`${language === 'ur' ? 'font-urdu' : ''}`}>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="font-display text-2xl font-bold text-foreground">
                {language === 'ur' ? 'قیادت' : 'Leadership'}
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {leadershipTeam.map((leader, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full gradient-islamic mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-primary-foreground font-arabic">👤</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{leader.name}</h4>
                  <p className="text-sm text-muted-foreground">{leader.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
