import { useReveal } from '@/hooks/useReveal';

interface StatItem {
  category: string;
  stat: string;
  description: string;
  image: string;
  alt: string;
}

const stats: StatItem[] = [
  {
    category: 'Type 2 Diabetes',
    stat: '2–4×',
    description: 'Higher likelihood of Type 2 Diabetes',
    image: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Person focusing on metabolic health and nutrition care',
  },
  {
    category: 'Cardiovascular Health',
    stat: '2×',
    description: 'Higher lifetime cardiovascular risk',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Active runner supporting heart and cardiovascular wellness',
  },
  {
    category: 'Early-Onset Risk',
    stat: '5–10 yrs',
    description: 'Earlier metabolic disease onset',
    image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Young adult engaging in proactive wellness lifestyle',
  },
  {
    category: 'Visceral Adiposity',
    stat: '6–8%',
    description: 'Higher body fat at the same BMI',
    image: 'https://images.pexels.com/photos/4498221/pexels-photo-4498221.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Individual monitoring body composition and metabolic health',
  },
];

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <div className="group relative h-[180px] sm:h-[195px] lg:h-[210px] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(23,32,27,0.06)] hover:shadow-[0_10px_32px_rgba(23,32,27,0.18)] transition-all duration-300 hover:-translate-y-1">
      {/* Background Image with Subtle Hover Zoom */}
      <img
        src={stat.image}
        alt={stat.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
        loading="lazy"
        width={800}
        height={500}
      />

      {/* Dark Ambient Gradient Overlay for Text Readability & Contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30 group-hover:from-black/95 group-hover:via-black/50 transition-colors duration-300"
        aria-hidden="true"
      />

      {/* Subtle Inner Glow Border */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Inner Content with Space-Between Layout */}
      <div className="relative z-10 h-full p-5 sm:p-5 lg:p-6 flex flex-col justify-between select-none">
        {/* Top: Category Title */}
        <div className="text-white/95 text-[14px] sm:text-[15px] font-medium tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          {stat.category}
        </div>

        {/* Bottom: Big Stat Number + Aligned Description */}
        <div className="flex items-end gap-2.5 sm:gap-3">
          <span className="font-display font-600 text-white text-[32px] sm:text-[34px] lg:text-[36px] xl:text-[38px] leading-none shrink-0 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {stat.stat}
          </span>
          <span className="text-white/90 text-[12px] sm:text-[12.5px] lg:text-[13px] leading-[1.3] font-450 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] flex-1 min-w-0">
            {stat.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HealthReality() {
  const headerRef = useReveal<HTMLDivElement>();
  const statsRef = useReveal<HTMLDivElement>({ threshold: 0.15 });

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

        {/* Responsive Grid with 4 Modern Photographic Cards */}
        <div
          ref={statsRef}
          className="reveal mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>

        <p className="mt-10 text-[12.5px] text-ink-muted max-w-2xl leading-relaxed">
          These figures reflect elevated cardiometabolic risk patterns observed in South Asian populations across clinical studies. Individual risk varies based on biology, lifestyle, family history, and environment.
        </p>
      </div>
    </section>
  );
}
