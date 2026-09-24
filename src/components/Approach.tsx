import { useState } from 'react';
import {
  Activity,
  Sliders,
  Utensils,
  Compass,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useReveal } from '@/hooks/useReveal';

interface Step {
  id: string;
  num: string;
  shortLabel: string;
  title: string;
  description: string;
  bulletList?: string[];
  icon: LucideIcon;
  image: string;
}

const steps: Step[] = [
  {
    id: 'step-01',
    num: '01.',
    shortLabel: 'South Asian Risks',
    title: 'Start with South Asian Health Risks',
    description:
      'South Asian health can require a different lens. We consider factors such as family history, metabolic risk, body composition, lifestyle, and health goals rather than relying on a one-size-fits-all approach.',
    icon: Activity,
    image: '/assets/om1.png',
  },
  {
    id: 'step-02',
    num: '02.',
    shortLabel: 'Personalize Plan',
    title: 'Personalize the Plan',
    description:
      "Your age, routine, goals, preferences, health concerns, and day-to-day reality are different from someone else's. Your care should be built around you.",
    icon: Sliders,
    image: '/assets/om2.png',
  },
  {
    id: 'step-03',
    num: '03.',
    shortLabel: 'Work with Food',
    title: 'Work with Your Food, Not Against It',
    description:
      "Traditional foods don't have to disappear from your life. We help you make informed choices around the foods, meals, and eating patterns that matter to you.",
    icon: Utensils,
    image: '/assets/om3.png',
  },
  {
    id: 'step-04',
    num: '04.',
    shortLabel: 'American Life Fit',
    title: 'Make It Work in American Life',
    description:
      'Because life in the U.S. brings its own realities: long workdays, eating out, travel, family responsibilities, social events, and changing food environments. Your nutrition strategy has to work beyond the kitchen.',
    bulletList: [
      'Long workdays',
      'Eating out',
      'Travel',
      'Family responsibilities',
      'Social events',
      'Changing food environments',
    ],
    icon: Compass,
    image: '/assets/om4.png',
  },
  {
    id: 'step-05',
    num: '05.',
    shortLabel: 'Habits That Last',
    title: 'Build Habits That Last',
    description:
      'No extreme reset. No unrealistic rules. The goal is to create changes you can continue long after the initial consultation.',
    icon: TrendingUp,
    image: '/assets/om5.png',
  },
];

export default function Approach() {
  // Step 03 (Work with Food, index 2) is active by default as the signature center card
  const [activeStep, setActiveStep] = useState(2);
  const headerRef = useReveal<HTMLDivElement>();
  const cardsRef = useReveal<HTMLDivElement>({ threshold: 0.12 });
  const lenis = useLenis();

  const scrollToConsultation = () => {
    if (lenis) {
      lenis.scrollTo('#consultation', { offset: -80 });
    } else {
      document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="approach"
      className="relative py-20 lg:py-30 bg-surface-secondary scroll-mt-20 overflow-hidden"
    >
      {/* Feather-light background engineering grid with smooth radial fade */}
      <div className="absolute inset-0 bg-tech-grid pointer-events-none opacity-60" />

      {/* Subtle ambient central lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[680px] h-[320px] bg-brand-light/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* ============================================================== */}
        {/* HEADER SECTION: Balanced Typo Hierarchy & Clean Alignment      */}
        {/* ============================================================== */}
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-14 mb-12 lg:mb-16"
        >
          {/* Left Column: Eyebrow Badge & Title */}
          <div className="max-w-2xl">
            <span className="text-eyebrow text-brand-deep uppercase">
              WHAT SA WELLNESS DOES DIFFERENTLY
            </span>

            <h2 className="mt-4 font-display font-600 text-ink text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-tight text-balance">
              A More Complete Approach to <br />
              <span className="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-light bg-clip-text text-transparent">
                South Asian Health
              </span>
            </h2>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:max-w-md">
            <p className="text-[15px] sm:text-[16px] text-ink-secondary leading-[1.65] text-left lg:text-right">
              Because better health isn't just about what you eat. It is about understanding how your body, your risks, your environment, and your everyday life come together.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEWPORT: 5 Interactive Cards with Space-Between Flow  */}
        {/* ============================================================== */}
        <div
          ref={cardsRef}
          className="reveal hidden lg:flex items-stretch gap-3 xl:gap-4 min-h-[510px] xl:min-h-[530px] w-full"
        >
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const Icon = step.icon;

            if (isActive) {
              return (
                <div
                  key={step.id}
                  className="flex-[2.6] xl:flex-[2.8] bg-surface-white rounded-3xl p-6 xl:p-7 border border-brand-primary/20 shadow-[0_16px_40px_rgba(23,32,27,0.06)] flex flex-col justify-between transition-all duration-500 ease-spring"
                >
                  {/* Top: Card Photographic Artwork Container */}
                  <div className="relative w-full h-[180px] sm:h-[195px] xl:h-[210px] rounded-2xl overflow-hidden border border-brand-primary/15 shadow-sm bg-surface-secondary">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-editorial hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom: Icon, Title, Description */}
                  <div className="pt-6 flex flex-col justify-end flex-1">
                    <div className="w-8 h-8 rounded-full bg-[#17201B] text-surface-white flex items-center justify-center shadow-xs">
                      <Icon size={15} />
                    </div>

                    <h3 className="font-display font-600 text-ink text-[22px] xl:text-[24px] leading-[1.25] tracking-tight mt-3.5 text-balance">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 text-ink-secondary text-[14px] xl:text-[14.5px] leading-[1.65]">
                      {step.description}
                    </p>

                    {/* Bullet List for Step 04 */}
                    {step.bulletList && (
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                        {step.bulletList.map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-[11.5px] font-500 text-brand-deep bg-brand-primary/10 px-2.5 py-1 rounded-full"
                          >
                            • {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            // Inactive (Collapsed) Card State - Image hidden when not expanded
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveStep(idx)}
                className="flex-1 min-w-[105px] xl:min-w-[125px] max-w-[170px] bg-surface-white/90 hover:bg-surface-white rounded-3xl p-5 xl:p-6 border border-border-subtle/80 hover:border-brand-primary/30 shadow-[0_4px_16px_rgba(23,32,27,0.02)] hover:shadow-[0_10px_28px_rgba(23,32,27,0.05)] cursor-pointer transition-all duration-500 ease-spring flex flex-col justify-between group hover:-translate-y-1"
                aria-label={`Expand step ${step.num} ${step.title}`}
              >
                {/* Top: Large Faint Step Watermark Number */}
                <div className="font-display font-400 text-[36px] xl:text-[42px] text-ink-muted/30 group-hover:text-brand-deep/60 transition-colors duration-300 tabular-nums leading-none select-none">
                  {step.num}
                </div>

                {/* Bottom: Icon & Concise Label */}
                <div className="pt-auto">
                  <div className="w-8 h-8 rounded-full bg-surface-secondary border border-border-subtle group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 flex items-center justify-center text-ink-secondary group-hover:text-brand-deep transition-all duration-300">
                    <Icon size={15} />
                  </div>
                  <h4 className="font-display font-600 text-ink text-[13px] xl:text-[14px] leading-snug mt-2.5 group-hover:text-brand-deep transition-colors line-clamp-2">
                    {step.shortLabel}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* MOBILE & TABLET VIEWPORT (< lg): Clean Interactive Accordion   */}
        {/* ============================================================== */}
        <div className="lg:hidden flex flex-col gap-3">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`rounded-2xl transition-all duration-400 ease-spring overflow-hidden border ${
                  isActive
                    ? 'bg-surface-white border-brand-primary/20 shadow-[0_8px_28px_rgba(23,32,27,0.06)] p-5 sm:p-6'
                    : 'bg-surface-white/80 hover:bg-surface-white border-border-subtle/80 p-4 sm:p-5 cursor-pointer'
                }`}
              >
                {isActive ? (
                  <div className="flex flex-col justify-between">
                    <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden border border-brand-primary/15 shadow-sm bg-surface-secondary">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-5 flex flex-col justify-end">
                      <div className="w-8 h-8 rounded-full bg-[#17201B] text-surface-white flex items-center justify-center shadow-xs">
                        <Icon size={15} />
                      </div>
                      <h3 className="font-display font-600 text-ink text-[20px] sm:text-[22px] leading-tight tracking-tight mt-3">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-ink-secondary text-[13.5px] sm:text-[14px] leading-relaxed">
                        {step.description}
                      </p>
                      {step.bulletList && (
                        <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                          {step.bulletList.map((item, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center text-[11px] font-500 text-brand-deep bg-brand-primary/10 px-2 py-0.5 rounded-full"
                            >
                              • {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-secondary border border-border-subtle flex items-center justify-center text-ink-secondary shrink-0">
                        <Icon size={14} />
                      </div>
                      <span className="font-display font-600 text-ink text-[15px] sm:text-[16px]">
                        {step.title}
                      </span>
                    </div>
                    <span className="font-display font-500 text-ink-muted/40 text-[18px] tabular-nums">
                      {step.num}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM SECTION: Closing Line & CTA Button                      */}
        {/* ============================================================== */}
        <div className="mt-14 lg:mt-20 text-center max-w-xl mx-auto">
          <p className="text-[16px] sm:text-[18px] font-display font-500 text-ink tracking-tight mb-6">
            Science-informed. South Asian-aware. Built for real life.
          </p>
          <button
            onClick={scrollToConsultation}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-deep text-surface-white text-[13.5px] sm:text-[14px] font-600 tracking-wider uppercase hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Book a Consultation Now</span>
            <ArrowRight size={15} className="transition-transform duration-250 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
