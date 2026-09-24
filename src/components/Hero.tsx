import { Star } from 'lucide-react';
import ConsultationForm from './ConsultationForm';
import HeroImageRibbon from './HeroImageRibbon';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="top" className="relative pt-[120px] pb-16 lg:pt-[140px] lg:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_minmax(380px,440px)] gap-10 lg:gap-16 items-start">
          <div className="flex flex-col">
            <span className="text-eyebrow text-brand-deep uppercase opacity-start animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              Personalized Nutrition &amp; Lifestyle Care
            </span>

            <h1 className="mt-5 font-display font-600 text-ink text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.1] tracking-tight text-balance opacity-start animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Your South Asian Health Deserves More Than Generic Nutrition Advice.
            </h1>

            <p className="mt-6 text-ink-secondary text-[16px] lg:text-[17px] leading-[1.65] max-w-xl text-pretty opacity-start animate-fade-up" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
              SA Wellness is a 100% online nutrition and lifestyle clinic built specifically for South Asians living in the United States. We understand your biology, your food, and your real life — so you can build sustainable habits without giving up who you are.
            </p>

            <div className="mt-8 opacity-start animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              <button
                onClick={() => scrollTo('#consultation')}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs"
              >
                Book a Consultation Now
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3 opacity-start animate-fade-up" style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent-warm text-accent-warm" />
                ))}
              </div>
              <span className="text-[14px] font-500 text-ink">4.8/5</span>
              <span className="text-[14px] text-ink-muted">·</span>
              <span className="text-[14px] text-ink-secondary">300+ Customer Reviews</span>
            </div>
          </div>

          <div id="consultation" className="scroll-mt-24 opacity-start animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <ConsultationForm />
          </div>
        </div>

        {/* Bottom Hero Image Ribbon: Panoramic 3D Auto-Scrolling Ribbon */}
        <div
          className="mt-14 lg:mt-20 -mx-6 lg:-mx-10 opacity-start animate-fade-in"
          style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
        >
          <HeroImageRibbon />
        </div>
      </div>
    </section>
  );
}
