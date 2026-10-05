import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HealthReality from '@/components/HealthReality';
import Testimonials from '@/components/Testimonials';
import FounderStory from '@/components/FounderStory';
import HealthConcerns from '@/components/HealthConcerns';
import Approach from '@/components/Approach';
import OnlineConsultations from '@/components/OnlineConsultations';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';
import AssessmentPage from '@/components/AssessmentPage';
import SecondLandingPage from '@/components/SecondLandingPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'assessment' | 'second-page'>('home');

  useEffect(() => {
    const handleLocation = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#assessment' || path === '/assessment') {
        setCurrentView('assessment');
      } else if (
        hash === '#2nd-page' ||
        hash === '#second-page' ||
        path === '/2nd-page' ||
        path === '/second-page'
      ) {
        setCurrentView('second-page');
      } else {
        setCurrentView('home');
      }
    };

    handleLocation();
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);

    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  const navigateToAssessment = () => {
    setCurrentView('assessment');
    window.history.pushState(null, '', '#assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.history.pushState(null, '', window.location.pathname.replace(/\/2nd-page|\/second-page|\/assessment/g, '') || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSecondPage = () => {
    setCurrentView('second-page');
    window.history.pushState(null, '', '#2nd-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToConsultation = () => {
    if (currentView === 'second-page') {
      const el = document.querySelector('#consultation-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    setCurrentView('home');
    window.history.pushState(null, '', '#consultation');
    setTimeout(() => {
      const el = document.querySelector('#consultation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  if (currentView === 'assessment') {
    return (
      <AssessmentPage
        onGoHome={navigateToHome}
        onBookConsultation={navigateToConsultation}
      />
    );
  }

  if (currentView === 'second-page') {
    return (
      <ReactLenis
        root
        options={{
          duration: 1.2,
          lerp: 0.1,
          smoothWheel: true,
        }}
      >
        <div className="min-h-screen bg-surface-primary">
          <Header
            currentPage="second-page"
            onNavigateHome={navigateToHome}
            onNavigateSecondPage={navigateToSecondPage}
            onBookConsultation={navigateToConsultation}
          />
          <main>
            <SecondLandingPage />
          </main>
          <Footer />
          <MobileCTA onBookConsultation={navigateToConsultation} />
        </div>
      </ReactLenis>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      <div className="min-h-screen bg-surface-primary">
        <Header
          currentPage="home"
          onNavigateHome={navigateToHome}
          onNavigateSecondPage={navigateToSecondPage}
          onBookConsultation={navigateToConsultation}
        />
        <main>
          <Hero onTakeAssessment={navigateToAssessment} />
          <HealthReality />
          <Testimonials />
          <FounderStory />
          <HealthConcerns />
          <Approach />
          <OnlineConsultations />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <MobileCTA onTakeAssessment={navigateToAssessment} />
      </div>
    </ReactLenis>
  );
}
