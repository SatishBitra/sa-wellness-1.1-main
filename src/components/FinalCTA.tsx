import { Check } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const points = [
  'South Asian health expertise',
  'Evidence-based nutrition',
  'Personalized care',
  'Real-life practicality',
];

export default function FinalCTA() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="py-20 lg:py-30 bg-surface-secondary">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div ref={ref} className="reveal text-center max-w-3xl mx-auto">
          <h2 className="font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[46px] leading-[1.15] tracking-tight text-balance">
            A More Personalized Approach to Your Health Starts Here.
          </h2>
          <p className="mt-5 text-ink-secondary text-[16px] sm:text-[17px] leading-[1.65] text-pretty">
            Understand your risks. Understand your needs. Build a plan that fits your life.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {points.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-primary/15">
                  <Check size={12} className="text-brand-deep" />
                </span>
                <span className="text-[14px] font-500 text-ink">{p}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand-deep text-surface-white text-[16px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5"
            >
              Book a Consultation Now
            </button>
          </div>

          <p className="mt-5 text-ink-secondary text-[15px]">
            Take the first step toward better health.
          </p>
        </div>
      </div>
    </section>
  );
}
