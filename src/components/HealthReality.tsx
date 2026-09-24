import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';

type StatItem = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
};

const stats: StatItem[] = [
  { value: 2, suffix: '–4×', label: 'Higher likelihood', sublabel: 'of Type 2 Diabetes' },
  { value: 2, suffix: '×', label: 'Higher cardiovascular risk' },
  { value: 5, suffix: '–10 yrs', label: 'Earlier Type 2 Diabetes risk' },
  { value: 6, suffix: '–8%', label: 'Higher body fat', sublabel: 'at the same BMI' },
];

function StatBlock({ stat, index }: { stat: StatItem; index: number }) {
  const { ref, value } = useCountUp(index === 2 || index === 3 ? stat.value : 0, {
    duration: 1400,
    decimals: 0,
  });

  const displayValue = index === 0 || index === 1 ? stat.value : value;

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline font-display font-600 text-brand-deep text-[42px] sm:text-[52px] lg:text-[60px] leading-none tracking-tight">
        <span ref={ref}>{displayValue}</span>
        {stat.suffix && <span className="text-[28px] sm:text-[34px] lg:text-[40px] ml-0.5">{stat.suffix}</span>}
      </div>
      <div className="mt-2 text-ink text-[15px] font-500 leading-snug">{stat.label}</div>
      {stat.sublabel && <div className="text-ink-secondary text-[13px] leading-snug">{stat.sublabel}</div>}
    </div>
  );
}

export default function HealthReality() {
  const headerRef = useReveal<HTMLDivElement>();
  const statsRef = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="py-20 lg:py-30 bg-surface-secondary">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div ref={headerRef} className="reveal max-w-3xl">
          <span className="text-eyebrow text-brand-deep uppercase">The South Asian Health Reality</span>
          <h2 className="mt-4 font-display font-600 text-ink text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.15] tracking-tight text-balance">
            Your risk isn't always reflected by the number on the scale.
          </h2>
          <p className="mt-5 text-ink-secondary text-[16px] leading-[1.65] max-w-2xl">
            South Asians face elevated cardiometabolic risks — often at lower body weights than other populations. Understanding these differences is the first step toward protecting your long-term health.
          </p>
        </div>

        <div ref={statsRef} className="reveal mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-10">
          {stats.map((stat, i) => (
            <StatBlock key={i} stat={stat} index={i} />
          ))}
        </div>

        <p className="mt-12 text-[12px] text-ink-muted max-w-2xl leading-relaxed">
          These figures reflect elevated cardiometabolic risk patterns observed in South Asian populations. Individual risk varies based on biology, lifestyle, family history, and environment.
        </p>
      </div>
    </section>
  );
}
