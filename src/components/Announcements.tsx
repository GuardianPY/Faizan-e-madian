import { Bell, Calendar, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const announcements = [
  {
    id: 1,
    type: 'important',
    titleEn: 'Ramadan Schedule 2024',
    titleUr: 'رمضان شیڈول 2024',
    contentEn: 'Special Tarawih prayers will begin after Isha. Please check the updated timings.',
    contentUr: 'تراویح کی خصوصی نماز عشاء کے بعد شروع ہوگی۔ براہ کرم اپڈیٹ شدہ اوقات چیک کریں۔',
    date: 'Dec 20, 2024',
  },
  {
    id: 2,
    type: 'event',
    titleEn: 'Weekly Quran Class',
    titleUr: 'ہفتہ وار قرآن کلاس',
    contentEn: 'Join us every Saturday after Maghrib for Quran Tafseer class with the Imam.',
    contentUr: 'ہر ہفتے کو مغرب کے بعد امام صاحب کے ساتھ قرآن تفسیر کلاس میں شامل ہوں۔',
    date: 'Every Saturday',
  },
  {
    id: 3,
    type: 'info',
    titleEn: 'Mosque Renovation Update',
    titleUr: 'مسجد کی تزئین و آرائش',
    contentEn: 'Wudu area renovation is in progress. Please use the temporary facilities.',
    contentUr: 'وضو خانے کی تزئین و آرائش جاری ہے۔ براہ کرم عارضی سہولیات استعمال کریں۔',
    date: 'Ongoing',
  },
];

const getTypeConfig = (type: string) => {
  switch (type) {
    case 'important':
      return { icon: AlertCircle, color: 'bg-destructive text-destructive-foreground', label: 'Important' };
    case 'event':
      return { icon: Calendar, color: 'bg-primary text-primary-foreground', label: 'Event' };
    default:
      return { icon: Info, color: 'bg-muted text-muted-foreground', label: 'Info' };
  }
};

const Announcements = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="w-8 h-8 text-primary" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t('announcements.title')}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {t('announcements.latest')}
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {announcements.map((announcement, index) => {
            const config = getTypeConfig(announcement.type);
            const IconComponent = config.icon;
            
            return (
              <Card
                key={announcement.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge className={config.color}>
                      <IconComponent className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{announcement.date}</span>
                  </div>
                  <CardTitle className={`text-lg mt-3 ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                    {language === 'ur' ? announcement.titleUr : announcement.titleEn}
                  </CardTitle>
                </CardHeader>
                <CardContent className={language === 'ur' ? 'font-urdu text-right' : ''}>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {language === 'ur' ? announcement.contentUr : announcement.contentEn}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
