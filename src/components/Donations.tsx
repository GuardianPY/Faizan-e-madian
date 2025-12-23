import { Heart, Coins, Gift, CreditCard, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const donationTypes = [
  {
    id: 1,
    titleEn: 'Zakat',
    titleUr: 'زکوٰۃ',
    descEn: 'Fulfill your obligatory charity for eligible recipients.',
    descUr: 'مستحقین کے لیے اپنی فرض صدقہ ادا کریں۔',
    icon: Coins,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    titleEn: 'Sadaqah',
    titleUr: 'صدقہ',
    descEn: 'Voluntary charity for the pleasure of Allah.',
    descUr: 'اللہ کی رضا کے لیے نفلی صدقہ۔',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 3,
    titleEn: 'General Fund',
    titleUr: 'عام فنڈ',
    descEn: 'Support mosque operations and maintenance.',
    descUr: 'مسجد کے انتظام اور دیکھ بھال میں مدد کریں۔',
    icon: Gift,
    color: 'from-blue-500 to-indigo-600',
  },
];

const Donations = () => {
  const { t, language } = useLanguage();

  return (
    <section id="donate" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            💝 {language === 'ur' ? 'عطیات' : 'Contribute'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('donate.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('donate.subtitle')}
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
            <CardContent className={`p-8 text-center ${language === 'ur' ? 'font-urdu' : ''}`}>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <Badge variant="secondary" className="mb-4">
                {t('donate.comingSoon')}
              </Badge>
              <h3 className="font-display text-xl font-semibold mb-3">
                {language === 'ur' ? 'آن لائن عطیات پورٹل' : 'Online Donation Portal'}
              </h3>
              <p className="text-muted-foreground">
                {t('donate.comingSoonText')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Donation Types */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {donationTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <Card
                key={type.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden opacity-80"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                <CardContent className={`p-6 text-center ${language === 'ur' ? 'font-urdu' : ''}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {language === 'ur' ? type.titleUr : type.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'ur' ? type.descUr : type.descEn}
                  </p>
                  <Button variant="outline" disabled className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t('donate.comingSoon')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Transparency Note */}
        <div className={`text-center mt-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {language === 'ur' 
              ? 'تمام عطیات شفاف طریقے سے استعمال کیے جاتے ہیں۔ سالانہ رپورٹ مسجد میں دستیاب ہے۔'
              : 'All donations are used transparently. Annual reports are available at the mosque.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default Donations;
