import { BookOpen, Headphones, FileText, Video, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const resources = [
  {
    id: 1,
    titleEn: 'Quran Studies',
    titleUr: 'قرآن کا مطالعہ',
    descEn: 'Learn Quran recitation, Tajweed, and Tafseer with our comprehensive resources.',
    descUr: 'ہماری جامع وسائل کے ساتھ قرآن کی تلاوت، تجوید اور تفسیر سیکھیں۔',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-600',
    items: ['Tajweed Rules', 'Quran Translation', 'Tafseer Notes'],
  },
  {
    id: 2,
    titleEn: 'Hadith Collection',
    titleUr: 'حدیث کا مجموعہ',
    descEn: 'Authentic Hadith collections from Sahih Bukhari, Muslim, and more.',
    descUr: 'صحیح بخاری، مسلم اور دیگر سے مستند احادیث کا مجموعہ۔',
    icon: FileText,
    color: 'from-blue-500 to-indigo-600',
    items: ['Sahih Bukhari', 'Sahih Muslim', '40 Hadith Nawawi'],
  },
  {
    id: 3,
    titleEn: 'Friday Sermons',
    titleUr: 'جمعہ کے خطبات',
    descEn: 'Audio and video recordings of Friday Khutbahs.',
    descUr: 'جمعہ کے خطبات کی آڈیو اور ویڈیو ریکارڈنگز۔',
    icon: Headphones,
    color: 'from-purple-500 to-pink-600',
    items: ['Latest Khutbah', 'Archive', 'Podcasts'],
  },
  {
    id: 4,
    titleEn: 'Islamic Lectures',
    titleUr: 'اسلامی لیکچرز',
    descEn: 'Educational videos and lectures on various Islamic topics.',
    descUr: 'مختلف اسلامی موضوعات پر تعلیمی ویڈیوز اور لیکچرز۔',
    icon: Video,
    color: 'from-orange-500 to-red-600',
    items: ['Fiqh Classes', 'Seerah Series', 'Q&A Sessions'],
  },
];

const Education = () => {
  const { t, language } = useLanguage();

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            📚 {language === 'ur' ? 'تعلیمی وسائل' : 'Learning Center'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('education.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <Card
                key={resource.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${resource.color}`} />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${resource.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className={`text-xl ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                        {language === 'ur' ? resource.titleUr : resource.titleEn}
                      </CardTitle>
                      <p className={`text-sm text-muted-foreground mt-2 ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                        {language === 'ur' ? resource.descUr : resource.descEn}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.items.map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {language === 'ur' ? 'دیکھیں' : 'Browse'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
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

export default Education;
