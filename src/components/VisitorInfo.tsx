import { ShirtIcon, Volume2, Smartphone, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const guidelines = [
  {
    icon: ShirtIcon,
    titleEn: 'Dress Code',
    titleUr: 'لباس کے اصول',
    contentEn: 'Please dress modestly. Men should wear clothing that covers from navel to knees. Women are requested to wear hijab and loose-fitting clothing.',
    contentUr: 'براہ کرم با حیا لباس پہنیں۔ مردوں کے لیے ناف سے گھٹنوں تک ڈھکا لباس ضروری ہے۔ خواتین سے حجاب اور ڈھیلا لباس پہننے کی درخواست ہے۔',
  },
  {
    icon: Volume2,
    titleEn: 'Maintain Silence',
    titleUr: 'خاموشی برقرار رکھیں',
    contentEn: 'Please keep your voice low inside the mosque. Avoid loud conversations, especially during prayer times.',
    contentUr: 'براہ کرم مسجد کے اندر آہستہ بولیں۔ بلند آواز سے گفتگو سے گریز کریں، خاص طور پر نماز کے اوقات میں۔',
  },
  {
    icon: Smartphone,
    titleEn: 'Mobile Phones',
    titleUr: 'موبائل فون',
    contentEn: 'Please switch off or silence your mobile phones before entering the prayer area.',
    contentUr: 'براہ کرم نماز کی جگہ میں داخل ہونے سے پہلے اپنے موبائل فون بند یا خاموش کر دیں۔',
  },
  {
    icon: Heart,
    titleEn: 'Respect & Cleanliness',
    titleUr: 'احترام اور صفائی',
    contentEn: 'Please maintain cleanliness and respect for the sacred space. Perform wudu before prayers.',
    contentUr: 'براہ کرم صفائی اور مقدس جگہ کا احترام برقرار رکھیں۔ نماز سے پہلے وضو کریں۔',
  },
];

const VisitorInfo = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-background islamic-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            ℹ️ {language === 'ur' ? 'زائرین کی رہنمائی' : 'Visitor Guide'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('visitor.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('visitor.welcome')}
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {guidelines.map((guideline, index) => {
            const IconComponent = guideline.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-islamic flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className={`text-lg ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {language === 'ur' ? guideline.titleUr : guideline.titleEn}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className={language === 'ur' ? 'font-urdu text-right' : ''}>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'ur' ? guideline.contentUr : guideline.contentEn}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Welcome Message */}
        <div className={`text-center mt-12 p-6 rounded-2xl bg-muted max-w-2xl mx-auto ${language === 'ur' ? 'font-urdu' : ''}`}>
          <p className="font-arabic text-2xl text-primary mb-3">
            أَهْلًا وَسَهْلًا
          </p>
          <p className="text-muted-foreground">
            {language === 'ur' 
              ? 'ہم تمام زائرین کا خیرمقدم کرتے ہیں۔ براہ کرم بلا جھجک سوالات پوچھیں۔'
              : 'We welcome all visitors. Please feel free to ask any questions.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisitorInfo;
