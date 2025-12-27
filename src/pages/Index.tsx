import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PrayerTimes from '@/components/PrayerTimes';
import About from '@/components/About';
import Announcements from '@/components/Announcements';
import Events from '@/components/Events';
import Donations from '@/components/Donations';
import Tasbeeh from '@/components/Tasbeeh';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import VisitorInfo from '@/components/VisitorInfo';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <PrayerTimes />
          <About />
          <Announcements />
          <Events />
          <Donations />
          <Tasbeeh />
          <VisitorInfo />
          <Contact />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
