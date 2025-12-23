import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Newsletter = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    toast({
      title: language === 'ur' ? 'سبسکرائب ہوگیا!' : 'Subscribed!',
      description: language === 'ur' 
        ? 'آپ ہماری نیوز لیٹر میں شامل ہوگئے ہیں۔'
        : 'You have been added to our newsletter.',
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto gradient-islamic overflow-hidden">
          <CardContent className="p-8 md:p-12 text-primary-foreground relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className={`text-center ${language === 'ur' ? 'font-urdu' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                  {t('newsletter.title')}
                </h2>
                <p className="opacity-80 mb-8 max-w-md mx-auto">
                  {t('newsletter.subtitle')}
                </p>
              </div>

              {isSubscribed ? (
                <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg animate-fade-in">
                  <CheckCircle className="w-6 h-6" />
                  <span className={language === 'ur' ? 'font-urdu' : ''}>
                    {language === 'ur' ? 'شکریہ! آپ سبسکرائب ہوگئے ہیں۔' : 'Thank you! You are now subscribed.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/60 focus:bg-white/20"
                  />
                  <Button 
                    type="submit" 
                    className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('newsletter.subscribe')}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
