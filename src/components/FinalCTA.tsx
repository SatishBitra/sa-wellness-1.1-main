import { Check, ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const keyBenefits = [
  'South Asian health expertise',
  'Evidence-based nutrition',
  'Personalized care',
  'Real-life practicality',
];

const stats = [
  {
    value: '1,000+',
    label: 'Consultations Completed',
  },
  {
    value: '100%',
    label: 'Online Care in the U.S.',
  },
  {
    value: '4.8/5',
    label: 'Average Patient Rating',
  },
  {
    value: '94%',
    label: 'Habit Retention Rate',
  },
];

export default function FinalCTA() {
  const containerRef = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const { scrollTo } = useSmoothScroll();

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-surface-primary">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div
          ref={containerRef}
          className="reveal relative rounded-3xl lg:rounded-[36px] overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 shadow-[0_24px_64px_rgba(23,32,27,0.16)] border border-border-subtle"
        >
          {/* Atmospheric Background Image: Sunset meadow */}
          <img
            src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1920&fit=crop"
            alt="Person standing in a serene golden wildflower field at sunset, looking forward"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-editorial hover:scale-100"
            loading="lazy"
            width={1920}
            height={1080}
          />

          {/* Cinematic Vignette & Brand Palette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#17201B]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[#17201B]/35 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/45 pointer-events-none" />

          {/* TOP SECTION: Two-Column Split */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-14">
            {/* Left Stack: Heading, Supporting Text, and Key Benefits */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-white/95 text-[12px] font-500 shadow-xs mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
                <span className="tracking-wide">Personalized Nutrition &amp; Lifestyle</span>
              </div>

              {/* Heading */}
              <h2 className="font-display font-600 text-surface-white text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.12] tracking-tight text-balance">
                A More Personalized Approach to Your Health Starts Here.
              </h2>

              {/* Supporting Text */}
              <p className="mt-4 sm:mt-5 text-white/85 text-[16px] sm:text-[17px] leading-[1.65] max-w-xl text-pretty">
                Understand your risks. Understand your needs. Build a plan that fits your life.
              </p>

              {/* Key Benefits List */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl">
                {keyBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-white/90 font-450"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-accent-warm flex-shrink-0">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Stack: Closing Line & CTA Button */}
            <div className="lg:max-w-md flex flex-col lg:items-end justify-center self-start lg:self-center pt-2 lg:pt-8">
              {/* Closing Line */}
              <p className="text-white/90 font-500 text-[15px] sm:text-[16px] leading-[1.5] mb-5 text-left lg:text-right">
                Take the first step toward better health.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => scrollTo('#consultation')}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-surface-white text-ink text-[13.5px] sm:text-[14px] font-600 tracking-wider uppercase hover:bg-brand-light hover:text-surface-white transition-all duration-300 shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                <span>Book a Consultation Now</span>
                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* BOTTOM SECTION: 4-Column Stat Bar with Dividing Lines (Preserved Exact Alignment) */}
          <div className="relative z-10 pt-16 sm:pt-20 lg:pt-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Thin horizontal dividing rule line */}
                  <div className="w-full h-[1px] bg-white/30 mb-3.5 sm:mb-4.5" />

                  {/* Stat Metric */}
                  <span className="font-display font-600 text-surface-white text-[28px] sm:text-[36px] lg:text-[42px] leading-tight tracking-tight tabular-nums">
                    {stat.value}
                  </span>

                  {/* Stat Label */}
                  <span className="mt-1 text-[11px] sm:text-[12px] font-600 tracking-wider uppercase text-white/70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
