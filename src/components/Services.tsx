import { BookOpen, Heart, Users, GraduationCap, Calendar, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const services = [
  {
    icon: BookOpen,
    title: { en: 'Quran Classes', ur: 'قرآن کی کلاسیں' },
    description: { en: 'Daily Quran recitation and Tajweed classes for all ages', ur: 'تمام عمر کے لیے روزانہ قرآن کی تلاوت اور تجوید کی کلاسیں' },
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: GraduationCap,
    title: { en: 'Islamic Studies', ur: 'اسلامی تعلیم' },
    description: { en: 'Comprehensive Islamic education programs', ur: 'مکمل اسلامی تعلیمی پروگرام' },
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Heart,
    title: { en: 'Community Support', ur: 'کمیونٹی سپورٹ' },
    description: { en: 'Assistance for families and individuals in need', ur: 'ضرورت مند خاندانوں اور افراد کی مدد' },
    color: 'from-rose-500 to-pink-600'
  },
  {
    icon: Users,
    title: { en: 'Youth Programs', ur: 'نوجوانوں کے پروگرام' },
    description: { en: 'Engaging activities for youth development', ur: 'نوجوانوں کی ترقی کے لیے دلچسپ سرگرمیاں' },
    color: 'from-purple-500 to-violet-600'
  },
  {
    icon: Calendar,
    title: { en: 'Weekly Programs', ur: 'ہفتہ وار پروگرام' },
    description: { en: 'Regular lectures, study circles, and gatherings', ur: 'باقاعدہ لیکچرز، دروس اور اجتماعات' },
    color: 'from-orange-500 to-amber-600'
  },
  {
    icon: Utensils,
    title: { en: 'Community Meals', ur: 'اجتماعی کھانا' },
    description: { en: 'Free meals during Ramadan and special occasions', ur: 'رمضان اور خاص مواقع پر مفت کھانا' },
    color: 'from-cyan-500 to-sky-600'
  }
];

const Services = () => {
  const { t, language } = useLanguage();

  return (
    <section id="services" className="py-20 bg-background islamic-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'ur' ? 'ہماری خدمات' : 'Our Services'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {language === 'ur' 
              ? 'کمیونٹی کی خدمت اور دین کی تعلیم' 
              : 'Serving the community and spreading knowledge'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 relative">
                  {/* Background Decoration */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`font-bold text-xl mb-3 text-foreground ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {service.title[language as 'en' | 'ur']}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
                    {service.description[language as 'en' | 'ur']}
                  </p>
                  
                  {/* Decorative Line */}
                  <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${service.color} rounded-full group-hover:w-full transition-all duration-500`} />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto gradient-islamic text-primary-foreground">
            <CardContent className="p-8">
              <h3 className={`text-2xl font-bold mb-3 ${language === 'ur' ? 'font-urdu' : 'font-display'}`}>
                {language === 'ur' ? 'مزید جاننا چاہتے ہیں؟' : 'Want to Learn More?'}
              </h3>
              <p className={`text-lg opacity-90 ${language === 'ur' ? 'font-urdu' : ''}`}>
                {language === 'ur' 
                  ? 'ہماری کسی بھی خدمت کے بارے میں مزید معلومات کے لیے ہم سے رابطہ کریں' 
                  : 'Contact us for more information about any of our services'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;