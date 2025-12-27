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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Event Header with Gradient */}
                  <div className="gradient-islamic p-6 text-primary-foreground relative overflow-hidden">
                    <div className="absolute inset-0 islamic-pattern opacity-20" />
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <Badge className="bg-accent/20 text-white border-white/30">
                        {event.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className={`font-bold text-xl mb-3 text-foreground ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {language === 'ur' ? event.titleUr : event.titleEn}
                    </h3>
                    <p className={`text-muted-foreground mb-4 leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {language === 'ur' ? event.descUr : event.descEn}
                    </p>

                    {/* Date and Time */}
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{event.day}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{event.time}</span>
                      </div>
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
