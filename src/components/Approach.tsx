import { useState, useId } from 'react';
import {
  Activity,
  Sliders,
  Utensils,
  Compass,
  TrendingUp,
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
  icon: LucideIcon;
  graphic: 'biomarker' | 'personalize' | 'nutrition' | 'lifestyle' | 'habits';
}

const steps: Step[] = [
  {
    id: 'step-01',
    num: '01.',
    shortLabel: 'Analyze Biology',
    title: 'South Asian Biomarker & Risk Analysis',
    description:
      'We assess your distinct metabolic profile — evaluating visceral adiposity, lipid subfractions, fasting insulin, and HOMA-IR sensitivity rather than relying on generic population averages.',
    icon: Activity,
    graphic: 'biomarker',
  },
  {
    id: 'step-02',
    num: '02.',
    shortLabel: 'Personalize Plan',
    title: 'Personalize Your Metabolic Care',
    description:
      'No copy-paste meal plans or rigid templates. Your clinical dietitian designs a tailored care protocol shaped around your unique lab markers, daily routine, stress patterns, and family history.',
    icon: Sliders,
    graphic: 'personalize',
  },
  {
    id: 'step-03',
    num: '03.',
    shortLabel: 'Work with Food',
    title: 'Work with Your Food, Not Against It',
    description:
      'Rice, roti, dal, sabzi, and heritage spices aren’t obstacles — they are therapeutic assets. We engineer precise glycemic sequencing and macro pairing around the meals your household actually eats.',
    icon: Utensils,
    graphic: 'nutrition',
  },
  {
    id: 'step-04',
    num: '04.',
    shortLabel: 'U.S. Life Fit',
    title: 'Make It Work in American Life',
    description:
      'Engineered for demanding American schedules — including grocery roadmaps for Trader Joe’s, Costco, and Patel Brothers, fast-casual order guides, and dining strategies for family celebrations.',
    icon: Compass,
    graphic: 'lifestyle',
  },
  {
    id: 'step-05',
    num: '05.',
    shortLabel: 'Build Habits',
    title: 'Build Habits That Last for Decades',
    description:
      'Real health transformation is an enduring practice, not a 30-day challenge. Through regular 1-on-1 clinician check-ins, continuous chat support, and repeat biomarker validation, we build lasting resilience.',
    icon: TrendingUp,
    graphic: 'habits',
  },
];

/**
 * Pure vector artwork for each step's active card,
 * inspired by the clean 3D undulating ribbon graphic in the reference design.
 */
function StepGraphic({ type }: { type: Step['graphic'] }) {
  const uid = useId();

  if (type === 'nutrition') {
    // Signature emerald/teal fluid undulating ribbon wave
    return (
      <div className="relative w-full h-[175px] sm:h-[190px] xl:h-[200px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#EBF5EF] via-[#E2EFE7] to-[#D5E7DC] p-3 border border-brand-primary/15 shadow-inner">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-28 bg-emerald-400/20 blur-2xl rounded-full pointer-events-none" />
        
        <svg
          viewBox="0 0 460 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`${uid}-ribbon1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3B2B" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#3A6B4F" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#67A581" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#A8DCBD" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id={`${uid}-ribbon2`} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#254A36" stopOpacity="0.1" />
              <stop offset="40%" stopColor="#3B7454" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#5CA079" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9DE0B9" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id={`${uid}-mesh`} x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#17201B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#417354" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#81BFA0" stopOpacity="0.2" />
            </linearGradient>

            <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d="M-20 160 C 90 170, 160 110, 240 100 C 320 90, 390 140, 480 150"
            stroke="#17201B"
            strokeWidth="32"
            strokeOpacity="0.06"
            strokeLinecap="round"
            filter={`url(#${uid}-glow)`}
          />

          <path
            d="M-30 145 C 80 165, 170 125, 235 85 C 315 35, 385 65, 490 110"
            stroke={`url(#${uid}-ribbon1)`}
            strokeWidth="28"
            strokeLinecap="round"
          />

          <path
            d="M-20 120 C 70 135, 180 90, 250 55 C 320 20, 390 40, 490 95"
            stroke={`url(#${uid}-ribbon2)`}
            strokeWidth="16"
            strokeLinecap="round"
          />

          {[-12, -8, -4, 0, 4, 8, 12, 16, 20, 24, 28, 32].map((offset, i) => (
            <path
              key={i}
              d={`M-30 ${130 + offset * 0.7} C 75 ${145 + offset * 0.9}, 175 ${105 + offset * 0.6}, 245 ${68 + offset * 0.4} C 315 ${30 + offset * 0.5}, 385 ${50 + offset * 0.8}, 490 ${100 + offset * 0.7}`}
              stroke={`url(#${uid}-mesh)`}
              strokeWidth={i % 3 === 0 ? "1.5" : "0.75"}
              strokeOpacity={0.25 + (i / 20)}
              fill="none"
            />
          ))}

          <path
            d="M40 135 C 130 135, 200 85, 260 55 C 320 25, 375 40, 440 75"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeOpacity="0.75"
            strokeLinecap="round"
            filter={`url(#${uid}-glow)`}
          />
        </svg>
      </div>
    );
  }

  if (type === 'biomarker') {
    // Dynamic cardiovascular / metabolic waveform mesh
    return (
      <div className="relative w-full h-[175px] sm:h-[190px] xl:h-[200px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F3F7F4] via-[#E6EDE8] to-[#DAE5DD] p-3 border border-brand-primary/15 shadow-inner">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-24 bg-brand-light/25 blur-2xl rounded-full pointer-events-none" />
        <svg
          viewBox="0 0 460 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`${uid}-bioGrad`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#314A3A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#5D735F" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8AAB8F" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {[-20, -10, 0, 10, 20, 30].map((shift, idx) => (
            <path
              key={idx}
              d={`M0 ${100 + shift * 0.6} Q 70 ${60 + shift}, 140 ${100 + shift * 0.4} T 280 ${100 + shift * 0.5} Q 350 ${140 + shift}, 460 ${90 + shift * 0.7}`}
              stroke={`url(#${uid}-bioGrad)`}
              strokeWidth={idx === 2 ? "2.5" : "1"}
              strokeOpacity={0.2 + idx * 0.12}
              fill="none"
            />
          ))}

          <circle cx="140" cy="100" r="5" fill="#314A3A" />
          <circle cx="140" cy="100" r="11" stroke="#314A3A" strokeOpacity="0.25" strokeWidth="2" />
          <circle cx="280" cy="100" r="4" fill="#5D735F" />
          <circle cx="350" cy="140" r="6" fill="#1E3B2B" />
          <circle cx="350" cy="140" r="14" stroke="#1E3B2B" strokeOpacity="0.2" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (type === 'personalize') {
    // Calibration mesh & metabolic tuning curves (Personalize Plan)
    return (
      <div className="relative w-full h-[175px] sm:h-[190px] xl:h-[200px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5F7F3] via-[#EBF1E8] to-[#DEE8DB] p-3 border border-brand-primary/15 shadow-inner">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-brand-primary/20 blur-2xl rounded-full pointer-events-none" />
        <svg
          viewBox="0 0 460 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`${uid}-plan1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#314A3A" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#5D735F" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A3B899" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {[-18, -9, 0, 9, 18, 27].map((offset, i) => (
            <path
              key={i}
              d={`M-20 ${70 + offset * 0.8} C 100 ${140 + offset}, 220 ${40 + offset * 0.5}, 340 ${120 + offset * 0.7} C 390 ${150 + offset * 0.8}, 440 ${110 + offset * 0.5}, 480 ${90 + offset}`}
              stroke={`url(#${uid}-plan1)`}
              strokeWidth={i === 2 ? "2.5" : "1"}
              strokeOpacity={0.25 + i * 0.12}
              fill="none"
            />
          ))}

          <line x1="220" y1="20" x2="220" y2="180" stroke="#314A3A" strokeOpacity="0.15" strokeDasharray="3 3" />
          <circle cx="220" cy="55" r="5" fill="#314A3A" />
          <circle cx="220" cy="55" r="12" stroke="#314A3A" strokeOpacity="0.25" strokeWidth="1.5" />
          <circle cx="340" cy="130" r="4.5" fill="#5D735F" />
        </svg>
      </div>
    );
  }

  if (type === 'lifestyle') {
    // Intersecting dynamic architectural pathways (American life integration)
    return (
      <div className="relative w-full h-[175px] sm:h-[190px] xl:h-[200px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F4F6F3] via-[#EAEFE8] to-[#DDE6DC] p-3 border border-brand-primary/15 shadow-inner">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-accent-warm/20 blur-2xl rounded-full pointer-events-none" />
        <svg
          viewBox="0 0 460 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`${uid}-path1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#314A3A" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#B99668" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#D4BC9A" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={`${uid}-path2`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5D735F" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#314A3A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A3B899" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <path
            d="M-20 50 C 120 70, 200 150, 480 120"
            stroke={`url(#${uid}-path1)`}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M-10 160 C 140 140, 260 50, 480 80"
            stroke={`url(#${uid}-path2)`}
            strokeWidth="14"
            strokeLinecap="round"
          />

          {[-15, -7, 0, 7, 15].map((off, i) => (
            <path
              key={i}
              d={`M-20 ${50 + off} C 120 ${70 + off * 0.8}, 200 ${150 + off * 0.6}, 480 ${120 + off}`}
              stroke="#314A3A"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
        </svg>
      </div>
    );
  }

  // Habits: Continuous upward compound curves
  return (
    <div className="relative w-full h-[175px] sm:h-[190px] xl:h-[200px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F2F6F3] via-[#E5EFE9] to-[#D6E6DB] p-3 border border-brand-primary/15 shadow-inner">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-brand-primary/25 blur-2xl rounded-full pointer-events-none" />
      <svg
        viewBox="0 0 460 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`${uid}-habitGrad`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#17201B" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#314A3A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#67A581" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {[0, 8, 16, 24, 32, 40].map((shift, i) => (
          <path
            key={i}
            d={`M-10 ${175 + shift * 0.4} C 120 ${165 + shift * 0.5}, 240 ${120 + shift * 0.3}, 470 ${35 + shift * 0.3}`}
            stroke={`url(#${uid}-habitGrad)`}
            strokeWidth={i === 2 ? "3" : "1"}
            strokeOpacity={0.25 + i * 0.12}
            fill="none"
          />
        ))}

        <circle cx="160" cy="145" r="4.5" fill="#314A3A" />
        <circle cx="280" cy="100" r="5.5" fill="#4A7C5E" />
        <circle cx="410" cy="50" r="7" fill="#67A581" />
        <circle cx="410" cy="50" r="14" stroke="#67A581" strokeOpacity="0.3" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function Approach() {
  // Step 03 (Cultural Nutrition, index 2) is active by default as the signature center card
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
          {/* Left Column: Eyebrow Badge & Two-Tone Title */}
          <div className="max-w-2xl">
            <span className="text-eyebrow text-brand-deep uppercase">
              Our Methodology
            </span>

            <h2 className="mt-4 font-display font-600 text-ink text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-tight text-balance">
              We’ve structured <br />
              <span className="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-light bg-clip-text text-transparent">
                Your Care Protocol.
              </span>
            </h2>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:max-w-md">
            <p className="text-[15px] sm:text-[16px] text-ink-secondary leading-[1.65] text-left lg:text-right">
              SA Wellness brings clarity, not restriction — uniting biomarker precision, culturally authentic nutrition, and ongoing clinician guidance into one adaptive 5-stage protocol.
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
                  {/* Top: Pure Artwork Container */}
                  <div className="w-full">
                    <StepGraphic type={step.graphic} />
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
                  </div>
                </div>
              );
            }

            // Inactive (Collapsed) Card State
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveStep(idx)}
                className="flex-1 min-w-[105px] xl:min-w-[125px] max-w-[170px] bg-surface-white/90 hover:bg-surface-white rounded-3xl p-6 border border-border-subtle/80 hover:border-brand-primary/30 shadow-[0_4px_16px_rgba(23,32,27,0.02)] hover:shadow-[0_10px_28px_rgba(23,32,27,0.05)] cursor-pointer transition-all duration-500 ease-spring flex flex-col justify-between group hover:-translate-y-1"
                aria-label={`Expand step ${step.num} ${step.title}`}
              >
                {/* Top: Large Faint Step Watermark Number */}
                <div className="font-display font-400 text-[38px] xl:text-[44px] text-ink-muted/30 group-hover:text-brand-deep/60 transition-colors duration-300 tabular-nums leading-none select-none">
                  {step.num}
                </div>

                {/* Middle: Clean Negative Space */}
                <div className="flex-1" />

                {/* Bottom: Icon & Concise Label */}
                <div>
                  <div className="w-8 h-8 rounded-full bg-surface-secondary border border-border-subtle group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 flex items-center justify-center text-ink-secondary group-hover:text-brand-deep transition-all duration-300">
                    <Icon size={15} />
                  </div>
                  <h4 className="font-display font-600 text-ink text-[14px] xl:text-[15px] leading-snug mt-3 group-hover:text-brand-deep transition-colors">
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
                    <StepGraphic type={step.graphic} />
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
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-surface-secondary border border-border-subtle flex items-center justify-center text-ink-secondary">
                        <Icon size={15} />
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

        {/* Bottom Booking Action */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-[14px] text-ink-secondary mb-4">
            Ready to experience nutrition care tailored to your South Asian biology and lifestyle?
          </p>
          <button
            onClick={scrollToConsultation}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            Schedule Your Clinical Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
