import { Bell, Calendar, AlertCircle, Info, Clock } from 'lucide-react';
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
      return { icon: AlertCircle, color: 'text-red-600', label: 'Important' };
    case 'event':
      return { icon: Calendar, color: 'text-blue-600', label: 'Event' };
    default:
      return { icon: Info, color: 'text-emerald-600', label: 'Info' };
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement, index) => {
            const config = getTypeConfig(announcement.type);
            const IconComponent = config.icon;
            
            return (
              <Card
                key={announcement.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in border-l-4"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  borderLeftColor: config.color === 'text-red-600' ? '#dc2626' : 
                                   config.color === 'text-blue-600' ? '#2563eb' : '#059669'
                }}
              >
                <CardContent className="p-6 relative">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 bg-gradient-to-br from-primary to-accent" />
                  
                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${config.color.replace('text-', 'bg-')}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <Badge variant="outline" className={`${config.color} border-current`}>
                      {config.label}
                    </Badge>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {announcement.date}
                  </p>

                  {/* Content */}
                  <h3 className={`font-bold text-xl mb-3 text-foreground ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {language === 'ur' ? announcement.titleUr : announcement.titleEn}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {language === 'ur' ? announcement.contentUr : announcement.contentEn}
                  </p>
                  
                  {/* Decorative Line */}
                  <div className={`mt-6 h-1 w-16 ${config.color.replace('text-', 'bg-')} rounded-full group-hover:w-full transition-all duration-500`} />
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
