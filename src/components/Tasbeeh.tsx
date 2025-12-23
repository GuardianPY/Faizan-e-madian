import { useState, useEffect } from 'react';
import { RotateCcw, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const tasbeehPhrases = [
  { arabic: 'سُبْحَانَ اللَّهِ', english: 'SubhanAllah', meaning: 'Glory be to Allah' },
  { arabic: 'الْحَمْدُ لِلَّهِ', english: 'Alhamdulillah', meaning: 'Praise be to Allah' },
  { arabic: 'اللَّهُ أَكْبَرُ', english: 'Allahu Akbar', meaning: 'Allah is the Greatest' },
  { arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', english: 'La ilaha illallah', meaning: 'There is no god but Allah' },
];

const Tasbeeh = () => {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(33);
  const [selectedPhrase, setSelectedPhrase] = useState(0);
  const { t, language } = useLanguage();

  const handleCount = () => {
    setCount((prev) => prev + 1);
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const progress = Math.min((count / targetCount) * 100, 100);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto overflow-hidden shadow-xl">
          <CardHeader className="gradient-islamic text-primary-foreground text-center pb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="font-arabic text-3xl">📿</span>
            </div>
            <CardTitle className={`text-2xl ${language === 'ur' ? 'font-urdu' : 'font-display'}`}>
              {t('tasbeeh.title')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Phrase Selection */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {tasbeehPhrases.map((phrase, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhrase(index)}
                  className={`p-3 rounded-lg text-sm transition-all ${
                    selectedPhrase === index
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <span className="font-arabic text-lg block">{phrase.arabic}</span>
                  <span className="text-xs opacity-80">{phrase.english}</span>
                </button>
              ))}
            </div>

            {/* Current Phrase Display */}
            <div className="text-center mb-6 p-4 rounded-lg bg-muted">
              <p className="font-arabic text-3xl text-primary mb-2">
                {tasbeehPhrases[selectedPhrase].arabic}
              </p>
              <p className="text-sm text-muted-foreground">
                {tasbeehPhrases[selectedPhrase].meaning}
              </p>
            </div>

            {/* Progress Ring */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
                  className="text-primary transition-all duration-300"
                  strokeLinecap="round"
                />
              </svg>
              <button
                onClick={handleCount}
                className="absolute inset-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center transition-all active:scale-95 shadow-lg"
              >
                <span className="text-4xl font-bold font-display">{count}</span>
                <span className="text-sm opacity-80">/ {targetCount}</span>
              </button>
            </div>

            {/* Target Selection */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTargetCount(Math.max(11, targetCount - 11))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[80px] text-center">
                Target: {targetCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTargetCount(targetCount + 11)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('tasbeeh.reset')}
            </Button>

            {/* Completion Message */}
            {count >= targetCount && (
              <div className="mt-4 p-4 rounded-lg bg-primary/10 text-center animate-fade-in">
                <p className="font-arabic text-xl text-primary mb-1">ما شاء الله</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ur' ? 'مبارک ہو! آپ نے ہدف مکمل کر لیا' : 'Congratulations! You completed the target'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Tasbeeh;
