import { useState } from 'react';
import {
  Activity,
  Gauge,
  Apple,
  Sun,
  Heart,
  CircleDot,
  HeartPulse,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Concern = {
  num: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const concerns: Concern[] = [
  { num: '01', title: 'Type 2 Diabetes & Prediabetes', description: 'Support healthier nutrition and lifestyle habits to manage blood sugar.', icon: Activity },
  { num: '02', title: 'Insulin Resistance', description: 'Address underlying metabolic patterns with targeted guidance.', icon: Gauge },
  { num: '03', title: 'Digestive Health', description: 'Identify triggers and build a gut-friendly eating routine.', icon: Apple },
  { num: '04', title: 'Vitamin D Deficiency', description: 'Practical strategies to improve nutrient levels naturally.', icon: Sun },
  { num: '05', title: 'Heart Health', description: 'Support cardiovascular wellness through food and lifestyle.', icon: Heart },
  { num: '06', title: 'Abdominal / Visceral Fat', description: 'Target body composition with a metabolically aware plan.', icon: CircleDot },
  { num: '07', title: 'High Blood Pressure', description: 'Dietary approaches that help manage blood pressure sustainably.', icon: HeartPulse },
  { num: '08', title: 'PCOS & Hormonal Health', description: 'Personalized nutrition for hormonal balance and insulin sensitivity.', icon: Sparkles },
];

function ConcernRow({ concern }: { concern: Concern }) {
  const [hovered, setHovered] = useState(false);
  const Icon = concern.icon;

  return (
    <button
      className="group flex items-start gap-4 sm:gap-6 py-6 px-4 sm:px-6 rounded-xl2 text-left transition-all duration-300 ease-editorial hover:bg-surface-white hover:shadow-[0_4px_20px_rgba(23,32,27,0.04)] hover:-translate-y-0.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
      aria-label={`Learn about ${concern.title}`}
    >
      <span className="font-display font-500 text-ink-muted text-[15px] mt-1 tabular-nums w-6 shrink-0">
        {concern.num}
      </span>

      <div className={`shrink-0 mt-0.5 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary/12">
          <Icon size={18} className="text-brand-deep" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display font-600 text-ink text-[16px] sm:text-[17px] leading-snug">
          {concern.title}
        </h3>
        <p className="mt-1 text-ink-secondary text-[14px] leading-snug">
          {concern.description}
        </p>
      </div>

      <ArrowRight
        size={18}
        className={`shrink-0 mt-1 text-ink-muted transition-all duration-300 ease-editorial ${hovered ? 'text-brand-deep translate-x-1' : ''}`}
      />
    </button>
  );
}

export default function HealthConcerns() {
  const headerRef = useReveal<HTMLDivElement>();
  const closingRef = useReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="health-concerns" className="py-20 lg:py-30 scroll-mt-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div ref={headerRef} className="reveal max-w-2xl">
          <span className="text-eyebrow text-brand-deep uppercase">Health Concerns We Support</span>
          <h2 className="mt-4 font-display font-600 text-ink text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight text-balance">
            Care designed around what you're actually dealing with.
          </h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-x-10 gap-y-0">
          {concerns.map((c) => (
            <ConcernRow key={c.num} concern={c} />
          ))}
        </div>

        <div ref={closingRef} className="reveal mt-16 lg:mt-20 text-center max-w-3xl mx-auto">
          <p className="font-display font-600 text-ink text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.3] tracking-tight text-balance">
            Your health is more than one number, one symptom, or one diagnosis.
          </p>
          <p className="mt-4 font-display font-500 text-brand-deep text-[18px] sm:text-[22px] leading-snug">
            We look at the bigger picture.
          </p>
        </div>
      </div>
    </section>
  );
}
