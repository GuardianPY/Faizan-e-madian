import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: language === 'ur' ? 'پیغام بھیج دیا گیا' : 'Message Sent',
      description: language === 'ur' 
        ? 'آپ کا پیغام موصول ہوگیا۔ ہم جلد جواب دیں گے۔'
        : 'Your message has been received. We will respond soon.',
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      labelKey: 'contact.address',
      value: language === 'ur' ? 'اسکندر آباد کالونی' : 'Iskandrabad Colony',
    },
    {
      icon: Phone,
      labelKey: 'contact.phone',
      value: '+92 300 0671272',
      href: 'tel:+923000671272',
    },
    {
      icon: Mail,
      labelKey: 'contact.email',
      value: 'sulemanhyder2@gmail.com',
      href: 'mailto:sulemanhyder2@gmail.com',
    },
    {
      icon: Clock,
      labelKey: 'contact.hours',
      value: language === 'ur' ? 'تمام نمازوں کے لیے روزانہ کھلا' : 'Open daily for all prayers',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            📍 {language === 'ur' ? 'رابطہ' : 'Get in Touch'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className={`font-display text-xl ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                {t('contact.sendMessage')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder={language === 'ur' ? 'آپ کا نام' : 'Your Name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={language === 'ur' ? 'font-urdu text-right' : ''}
                  />
                  <Input
                    type="email"
                    placeholder={language === 'ur' ? 'ای میل' : 'Email Address'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  placeholder={language === 'ur' ? 'موضوع' : 'Subject'}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className={language === 'ur' ? 'font-urdu text-right' : ''}
                />
                <Textarea
                  placeholder={language === 'ur' ? 'آپ کا پیغام...' : 'Your message...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className={language === 'ur' ? 'font-urdu text-right' : ''}
                />
                <Button 
                  type="submit" 
                  className="w-full gradient-islamic"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {language === 'ur' ? 'بھیج رہا ہے...' : 'Sending...'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('contact.sendMessage')}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className={`p-4 flex items-start gap-3 ${language === 'ur' ? 'font-urdu flex-row-reverse text-right' : ''}`}>
                      <div className="w-10 h-10 rounded-lg gradient-islamic flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{t(info.labelKey)}</p>
                        <p className="font-medium text-sm">{info.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                );

                return info.href ? (
                  <a key={index} href={info.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Google Map */}
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.089566925637!2d71.58611661202464!3d32.892704555644805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392743007a34f403%3A0x85de9210ef6292d2!2sFiazan-E-Madina%20Masjid%20Iskandar%20Abad!5e0!3m2!1sen!2s!4v1766501150689!5m2!1sen!2s"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Faizan e Madina Masjid Location"
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
