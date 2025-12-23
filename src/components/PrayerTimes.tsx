import { Clock, Sun, Sunset, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const prayerData = [
  { key: 'fajr', time: '6:30 AM', icon: Moon, color: 'from-indigo-500 to-purple-600' },
  { key: 'dhuhr', time: '1:30 PM', icon: Sun, color: 'from-yellow-400 to-orange-500' },
  { key: 'asr', time: '4:45 PM', icon: Sun, color: 'from-orange-400 to-red-500' },
  { key: 'maghrib', time: '6:10 PM', icon: Sunset, color: 'from-pink-500 to-purple-600' },
  { key: 'isha', time: '8:00 PM', icon: Moon, color: 'from-purple-600 to-indigo-700' },
];

const PrayerTimes = () => {
  const { t, language } = useLanguage();

  return (
    <section id="prayers" className="py-20 bg-gradient-to-b from-background to-muted islamic-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              {t('prayers.title')}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('prayers.subtitle')}
          </p>
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {prayerData.map((prayer) => {
            const IconComponent = prayer.icon;
            return (
              <Card
                key={prayer.key}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${prayer.color}`} />
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r ${prayer.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`font-semibold text-lg text-foreground mb-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {t(`prayers.${prayer.key}`)}
                  </h3>
                  <p className="text-2xl font-bold text-primary font-display">
                    {prayer.time}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Jumu'ah Prayer Card */}
        <Card className="max-w-md mx-auto gradient-islamic text-primary-foreground overflow-hidden">
          <CardContent className="p-8 text-center relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-arabic text-3xl">جمعہ</span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${language === 'ur' ? 'font-urdu' : 'font-display'}`}>
                {t('prayers.friday')}
              </h3>
              <p className="text-4xl font-bold font-display">2:00 PM</p>
              <p className={`text-sm opacity-80 mt-2 ${language === 'ur' ? 'font-urdu' : ''}`}>
                {t('prayers.jumma')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PrayerTimes;
