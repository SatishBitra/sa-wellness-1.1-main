import { useEffect, useState } from 'react';

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroCta = document.querySelector('#consultation');
      if (!heroCta) return;
      const rect = heroCta.getBoundingClientRect();
      const heroCtaOffScreen = rect.bottom < 0;
      const footer = document.querySelector('footer');
      let pastFooter = false;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        pastFooter = footerRect.top < window.innerHeight;
      }
      setVisible(heroCtaOffScreen && !pastFooter);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ease-editorial ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-surface-primary/90 backdrop-blur-md border-t border-border-subtle px-5 py-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <button
          onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500"
        >
          Book a Consultation
        </button>
      </div>
    </div>
  );
}
