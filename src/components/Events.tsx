import { Calendar, Clock, MapPin, Users, BookOpen, Mic, Baby } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
  {
    id: 1,
    titleEn: 'Weekly Quran Classes',
    titleUr: 'ہفتہ وار قرآن کلاس',
    descEn: 'Learn Quran recitation and Tajweed with qualified teachers.',
    descUr: 'تجوید کے ساتھ قرآن کی تلاوت سیکھیں۔',
    day: 'Saturday',
    time: 'After Maghrib',
    icon: BookOpen,
    category: 'Education',
  },
  {
    id: 2,
    titleEn: 'Friday Sermon (Khutbah)',
    titleUr: 'جمعہ کا خطبہ',
    descEn: 'Join us for the weekly Friday prayer and inspiring sermon.',
    descUr: 'ہفتہ وار جمعہ کی نماز اور پُراثر خطبے میں شامل ہوں۔',
    day: 'Friday',
    time: '2:00 PM',
    icon: Mic,
    category: 'Prayer',
  },
  {
    id: 3,
    titleEn: 'Youth Program',
    titleUr: 'نوجوانان پروگرام',
    descEn: 'Islamic education and activities for young Muslims.',
    descUr: 'نوجوان مسلمانوں کے لیے اسلامی تعلیم اور سرگرمیاں۔',
    day: 'Sunday',
    time: '10:00 AM',
    icon: Users,
    category: 'Youth',
  },
  {
    id: 4,
    titleEn: 'Children Hifz Program',
    titleUr: 'بچوں کا حفظ پروگرام',
    descEn: 'Quran memorization program for children with experienced teachers.',
    descUr: 'تجربہ کار اساتذہ کے ساتھ بچوں کے لیے قرآن حفظ پروگرام۔',
    day: 'Daily',
    time: 'After Fajr',
    icon: Baby,
    category: 'Education',
  },
];

const Events = () => {
  const { t, language } = useLanguage();

  return (
    <section id="events" className="py-20 bg-background islamic-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 inline mr-2" />
            {t('events.calendar')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('events.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full" />
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <Card
                key={event.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-l-4 border-l-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl gradient-islamic flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                  <CardTitle className={`text-xl mt-4 ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                    {language === 'ur' ? event.titleUr : event.titleEn}
                  </CardTitle>
                </CardHeader>
                <CardContent className={language === 'ur' ? 'font-urdu text-right' : ''}>
                  <p className="text-muted-foreground mb-4">
                    {language === 'ur' ? event.descUr : event.descEn}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-primary">
                      <Calendar className="w-4 h-4" />
                      <span>{event.day}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;
