import { useEffect, useState } from 'react';

interface MobileCTAProps {
  onTakeAssessment?: () => void;
}

export default function MobileCTA({ onTakeAssessment }: MobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      const footer = document.querySelector('footer');
      let pastFooter = false;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        pastFooter = footerRect.top < window.innerHeight - 20;
      }
      // Visible once scrolled past hero (300px) and before the footer
      setVisible(scrollPos > 300 && !pastFooter);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBookConsultation = () => {
    const consultationEl = document.querySelector('#consultation');
    if (consultationEl) {
      consultationEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:hello@sawellness.com?subject=Book%20a%201-on-1%20Consultation';
    }
  };

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ease-editorial ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-surface-white/95 backdrop-blur-md border-t border-border-subtle px-4 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2.5">
        {onTakeAssessment && (
          <button
            onClick={onTakeAssessment}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-sand/80 hover:bg-sand text-brand-deep text-[13.5px] font-600 border border-sand-warm active:scale-[0.98] transition-all cursor-pointer"
          >
            Take Assessment
          </button>
        )}
        <button
          onClick={handleBookConsultation}
          className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-brand-deep text-surface-white text-[13.5px] font-600 hover:bg-brand-primary active:scale-[0.98] transition-all cursor-pointer shadow-xs"
        >
          Book Consultation
        </button>
      </div>
    </div>
  );
}
