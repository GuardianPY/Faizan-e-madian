import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Camera, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const galleryImages = [
  {
    id: 1,
    title: { en: 'Main Prayer Hall', ur: 'مرکزی نماز ہال' },
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    title: { en: 'Mihrab & Minbar', ur: 'محراب اور منبر' },
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    title: { en: 'Dome Architecture', ur: 'گنبد تعمیرات' },
    image: 'https://images.unsplash.com/photo-1564769610735-6f44e5f5268d?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    title: { en: 'Evening View', ur: 'شام کا منظر' },
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    title: { en: 'Calligraphy Wall', ur: 'خطاطی کی دیوار' },
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    title: { en: 'Community Gathering', ur: 'اجتماع' },
    image: 'https://images.unsplash.com/photo-1583932866134-37068a71b6c4?w=800&h=600&fit=crop'
  }
];

const Gallery = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className="w-8 h-8 text-primary" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              {language === 'ur' ? 'تصویری گیلری' : 'Photo Gallery'}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ur' 
              ? 'ہماری مسجد کی خوبصورت تصاویر' 
              : 'Glimpses of our beautiful mosque'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={item.image}
                  alt={item.title[language as 'en' | 'ur']}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`text-white font-semibold text-lg ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {item.title[language as 'en' | 'ur']}
                    </h3>
                  </div>
                </div>
                {/* Islamic Pattern Overlay */}
                <div className="absolute inset-0 islamic-pattern opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title[language as 'en' | 'ur']}
                className="w-full h-auto"
              />
              <div className="p-6 bg-background">
                <h3 className={`text-2xl font-semibold text-foreground ${language === 'ur' ? 'font-urdu' : ''}`}>
                  {selectedImage.title[language as 'en' | 'ur']}
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;