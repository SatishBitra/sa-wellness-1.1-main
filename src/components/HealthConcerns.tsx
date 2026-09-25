import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

import h1 from '../../assets/h-1.png';
import h2 from '../../assets/h-2.png';
import h3 from '../../assets/h-3.png';
import h4 from '../../assets/h-4.png';
import h5 from '../../assets/h-5.png';
import h6 from '../../assets/h-6.png';
import h7 from '../../assets/h-7.png';
import h8 from '../../assets/h-8.png';

interface HealthConcern {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const concerns: HealthConcern[] = [
  {
    id: 't2d',
    num: '01',
    title: 'Type 2 Diabetes & Prediabetes',
    category: 'Metabolic Health',
    description:
      'Personalized macro balancing, glycemic sequencing, and carbohydrate timing to stabilize blood sugar without eliminating traditional staples.',
    image: h1,
  },
  {
    id: 'insulin',
    num: '02',
    title: 'Insulin Resistance',
    category: 'Cellular Health',
    description:
      'Target underlying cellular resistance, reduce fasting insulin, and restore metabolic flexibility through tailored nutrition.',
    image: h2,
  },
  {
    id: 'ibs',
    num: '03',
    title: 'IBS & Digestive Concerns',
    category: 'Digestive Wellness',
    description:
      'Identify dietary triggers, balance the microbiome, and optimize heritage spices to resolve chronic bloating, gas, and discomfort.',
    image: h3,
  },
  {
    id: 'pcos',
    num: '04',
    title: 'PCOS & Hormonal Health',
    category: 'Hormonal Balance',
    description:
      'Targeted nutrition protocols for androgen regulation, regular ovulatory cycles, and hormonal insulin sensitivity.',
    image: h4,
  },
  {
    id: 'visceral',
    num: '05',
    title: 'Abdominal & Visceral Fat',
    category: 'Body Composition',
    description:
      'Target deep visceral fat around internal organs with precision nutrition and waist-to-hip ratio management.',
    image: h5,
  },
  {
    id: 'hypertension',
    num: '06',
    title: 'Hypertension & BP',
    category: 'Cardiovascular Care',
    description:
      'Evidence-based sodium-to-potassium rebalancing, endothelial support, and lifestyle approaches to manage blood pressure sustainably.',
    image: h6,
  },
  {
    id: 'heart',
    num: '07',
    title: 'Heart Health & Plaque',
    category: 'Cardiovascular Care',
    description:
      'Target South Asian cardiometabolic risk factors — optimizing ApoB, lipid subfractions, and arterial inflammation naturally.',
    image: h7,
  },
  {
    id: 'vitamind',
    num: '08',
    title: 'Vitamin D & Nutrients',
    category: 'Micronutrient Health',
    description:
      'Clinical dietary strategies and co-factor pairing (K2, magnesium, healthy fats) to resolve chronic deficiencies.',
    image: h8,
  },
];

export default function HealthConcerns() {
  const headerRef = useReveal<HTMLDivElement>();
  const containerRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const { scrollTo, lenis } = useSmoothScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [desktopTranslateX, setDesktopTranslateX] = useState(0);

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024 && window.innerHeight >= 550;
      setIsDesktop(desktop);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const DESKTOP_STICKY_SCROLL_VH = 240;

  const updateScrollState = useCallback(() => {
    if (isDesktop) {
      const section = sectionRef.current;
      const track = scrollContainerRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const totalStickyScroll = (window.innerHeight * DESKTOP_STICKY_SCROLL_VH) / 100;

      if (totalStickyScroll <= 0) return;

      const scrolled = Math.max(0, Math.min(totalStickyScroll, -rect.top));
      const progress = scrolled / totalStickyScroll;

      const lastCard = track.lastElementChild as HTMLElement;
      const firstCard = track.firstElementChild as HTMLElement;

      let maxTranslate = 0;
      if (lastCard && firstCard) {
        const trackWidth = lastCard.offsetLeft + lastCard.offsetWidth - firstCard.offsetLeft;
        const visibleWidth = track.parentElement?.clientWidth || window.innerWidth;
        maxTranslate = Math.max(0, trackWidth - visibleWidth);
      } else {
        maxTranslate = Math.max(0, track.scrollWidth - track.clientWidth);
      }

      const currentTranslate = progress * maxTranslate;
      setDesktopTranslateX(currentTranslate);
      setScrollProgress(progress * 100);
      setCanScrollLeft(progress > 0.01);
      setCanScrollRight(progress < 0.99);
    } else {
      const el = scrollContainerRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;

      if (maxScroll <= 5) {
        setScrollProgress(0);
        setCanScrollLeft(false);
        setCanScrollRight(false);
        return;
      }

      const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  }, [isDesktop]);

  useEffect(() => {
    updateScrollState();

    const onScroll = () => {
      updateScrollState();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollState);
      if (el) {
        el.removeEventListener('scroll', updateScrollState);
      }
    };
  }, [updateScrollState]);

  useEffect(() => {
    if (!lenis) return;
    const handleLenisScroll = () => {
      if (isDesktop) {
        updateScrollState();
      }
    };
    lenis.on('scroll', handleLenisScroll);
    return () => {
      lenis.off('scroll', handleLenisScroll);
    };
  }, [lenis, isDesktop, updateScrollState]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (isDesktop && sectionRef.current) {
      const totalStickyScroll = (window.innerHeight * DESKTOP_STICKY_SCROLL_VH) / 100;
      const stepY = totalStickyScroll / (concerns.length - 1);
      const targetY = window.scrollY + (direction === 'right' ? stepY : -stepY);
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
      return;
    }

    const el = scrollContainerRef.current;
    if (!el) return;

    const cardWidth = 360; // approximate card stride
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="health-concerns"
      ref={sectionRef}
      className={`relative scroll-mt-20 bg-surface-primary ${
        isDesktop ? 'h-[340vh]' : 'py-20 lg:py-30 overflow-hidden'
      }`}
    >
      <div
        className={`mx-auto max-w-[1280px] px-6 lg:px-10 ${
          isDesktop
            ? 'sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-8'
            : ''
        }`}
      >
        {/* Section Header: Two-Column Split with Space-Between */}
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-14 mb-8 lg:mb-10"
        >
          {/* Left Column: Eyebrow Badge & Title Stack */}
          <div className="max-w-2xl">
            <span className="text-eyebrow text-brand-deep uppercase">
              Health Concerns We Support
            </span>

            <h2 className="mt-3 sm:mt-4 font-display font-600 text-ink text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.12] tracking-tight text-balance">
              Care designed around <br />
              <span className="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-light bg-clip-text text-transparent">
                What you're actually dealing with.
              </span>
            </h2>
          </div>

          {/* Right Column: Description Stack */}
          <div className="lg:max-w-md">
            <p className="text-[14.5px] sm:text-[15.5px] text-ink-secondary leading-[1.6] text-left lg:text-right">
              South Asian health challenges are deeply interconnected. Explore our evidence-based clinical protocols tailored to your distinct biology, genetics, and heritage foods.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* HEALTH CONCERNS CAROUSEL: Matching Screenshot Layout & Structure */}
        {/* ============================================================== */}
        <div ref={containerRef} className="reveal relative w-full">
          {/* Horizontal Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className={`flex gap-5 sm:gap-6 pb-4 pt-1 -mx-6 px-6 lg:-mx-10 lg:px-10 will-change-transform ${
              isDesktop
                ? 'overflow-visible'
                : 'overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              transform: isDesktop ? `translate3d(-${desktopTranslateX}px, 0, 0)` : undefined,
            }}
          >
            {concerns.map((concern) => (
              <div
                key={concern.id}
                onClick={() => scrollTo('#consultation')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollTo('#consultation')}
                className="group flex-shrink-0 w-[290px] sm:w-[330px] lg:w-[350px] snap-start rounded-[24px] overflow-hidden bg-surface-white border border-border-subtle shadow-[0_4px_24px_rgba(23,32,27,0.03)] hover:shadow-[0_16px_40px_rgba(23,32,27,0.08)] hover:border-brand-primary/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
                aria-label={`Learn more about ${concern.title}`}
              >
                {/* Top Half: Photographic Card Image with Subtle Overlay */}
                <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[210px] bg-gradient-to-b from-[#F2F6F3]/70 to-surface-white border-b border-border-subtle/60 overflow-hidden">
                  {/* Watermark Number Badge */}
                  <span className="absolute top-4 right-4 z-10 text-[12px] font-600 text-ink font-mono bg-white/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-black/5 shadow-xs">
                    {concern.num}
                  </span>

                  {/* Card Image */}
                  <img
                    src={concern.image}
                    alt={concern.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-108"
                    loading="lazy"
                    decoding="async"
                    width={720}
                    height={480}
                  />

                  {/* Gentle gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Bottom Half: Clean Typography & Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-start">
                  {/* Category Label */}
                  <span className="text-[11px] font-600 uppercase tracking-wider text-brand-light block mb-2">
                    {concern.category}
                  </span>

                  {/* Concern Title */}
                  <h3 className="font-display font-600 text-ink text-[17px] sm:text-[19px] leading-[1.3] group-hover:text-brand-deep transition-colors">
                    {concern.title}
                  </h3>

                  {/* Clinical Description */}
                  <p className="mt-2 text-[13px] sm:text-[13.5px] text-ink-secondary leading-[1.6]">
                    {concern.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Slider Navigation & Progress Bar */}
          <div className="flex items-center justify-between mt-6 lg:mt-8 pt-2">
            {/* Left Circular Arrow Button */}
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous health concerns"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border-subtle bg-surface-white flex items-center justify-center text-ink hover:bg-surface-secondary hover:border-ink/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-xs cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Middle Continuous Track & Progress Indicator */}
            <div className="flex-1 max-w-xl mx-5 sm:mx-8 h-[3px] bg-border-subtle/80 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-ink rounded-full transition-all duration-150 ease-out"
                style={{
                  width: '28%',
                  left: `${(scrollProgress / 100) * 72}%`,
                }}
              />
            </div>

            {/* Right Circular Arrow Button */}
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next health concerns"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border-subtle bg-surface-white flex items-center justify-center text-ink hover:bg-surface-secondary hover:border-ink/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-xs cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
