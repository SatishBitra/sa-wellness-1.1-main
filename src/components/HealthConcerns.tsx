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
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface HealthConcern {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  angle: number; // degrees: 0, 45, 90, 135, 180, 225, 270, 315
  category: string;
}

const bowlImage =
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop';

const concerns: HealthConcern[] = [
  {
    id: 't2d',
    num: '01',
    title: 'Type 2 Diabetes & Prediabetes',
    shortTitle: 'Type 2 Diabetes',
    description:
      'Personalized macro balancing, glycemic sequencing, and carbohydrate timing to stabilize blood sugar without eliminating traditional staples.',
    icon: Activity,
    angle: 0, // Top (12 o'clock)
    category: 'Metabolic Health',
  },
  {
    id: 'insulin',
    num: '02',
    title: 'Insulin Resistance',
    shortTitle: 'Insulin Resistance',
    description:
      'Target underlying cellular resistance, reduce fasting insulin, and restore metabolic flexibility through tailored nutrition.',
    icon: Gauge,
    angle: 45, // Top-Right
    category: 'Cellular Health',
  },
  {
    id: 'ibs',
    num: '03',
    title: 'IBS & Digestive Concerns',
    shortTitle: 'IBS & Digestion',
    description:
      'Identify dietary triggers, balance the microbiome, and optimize heritage spices to resolve chronic bloating, gas, and discomfort.',
    icon: Apple,
    angle: 90, // Right (3 o'clock)
    category: 'Digestive Wellness',
  },
  {
    id: 'pcos',
    num: '04',
    title: 'PCOS & Hormonal Health',
    shortTitle: 'PCOS & Hormones',
    description:
      'Targeted nutrition protocols for androgen regulation, regular ovulatory cycles, and hormonal insulin sensitivity.',
    icon: Sparkles,
    angle: 135, // Bottom-Right
    category: 'Hormonal Balance',
  },
  {
    id: 'visceral',
    num: '05',
    title: 'Abdominal & Visceral Fat',
    shortTitle: 'Visceral Fat',
    description:
      'Target deep visceral fat around internal organs with precision nutrition and waist-to-hip ratio management.',
    icon: CircleDot,
    angle: 180, // Bottom (6 o'clock)
    category: 'Body Composition',
  },
  {
    id: 'hypertension',
    num: '06',
    title: 'Hypertension & BP',
    shortTitle: 'Hypertension',
    description:
      'Evidence-based sodium-to-potassium rebalancing, endothelial support, and lifestyle approaches to manage blood pressure sustainably.',
    icon: HeartPulse,
    angle: 225, // Bottom-Left
    category: 'Cardiovascular Care',
  },
  {
    id: 'heart',
    num: '07',
    title: 'Heart Health & Plaque',
    shortTitle: 'Heart Health',
    description:
      'Target South Asian cardiometabolic risk factors — optimizing ApoB, lipid subfractions, and arterial inflammation naturally.',
    icon: Heart,
    angle: 270, // Left (9 o'clock)
    category: 'Cardiovascular Care',
  },
  {
    id: 'vitamind',
    num: '08',
    title: 'Vitamin D & Nutrients',
    shortTitle: 'Vitamin D',
    description:
      'Clinical dietary strategies and co-factor pairing (K2, magnesium, healthy fats) to resolve chronic deficiencies.',
    icon: Sun,
    angle: 315, // Top-Left
    category: 'Micronutrient Health',
  },
];

export default function HealthConcerns() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const headerRef = useReveal<HTMLDivElement>();
  const closingRef = useReveal<HTMLDivElement>({ threshold: 0.3 });
  const wheelRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const { scrollTo } = useSmoothScroll();

  const activeConcern = concerns.find((c) => c.id === hoveredId) || null;

  return (
    <section id="health-concerns" className="py-20 lg:py-32 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="reveal max-w-2xl mx-auto text-center mb-14 lg:mb-20">
          <span className="text-eyebrow text-brand-deep uppercase">
            Health Concerns We Support
          </span>
          <h2 className="mt-4 font-display font-600 text-ink text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.15] tracking-tight text-balance">
            Care designed around what you're actually dealing with.
          </h2>
          <p className="mt-4 text-ink-secondary text-[15px] sm:text-[16px] leading-[1.65]">
            South Asian health challenges are deeply interconnected. Hover over any health concern below to explore our targeted clinical and nutritional approaches.
          </p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEWPORT (lg+): 8 Radial Blocks Around Center Circle    */}
        {/* ============================================================== */}
        <div
          ref={wheelRef}
          className="reveal hidden lg:block relative w-[780px] h-[780px] xl:w-[840px] xl:h-[840px] mx-auto my-6"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-brand-light/10 blur-3xl pointer-events-none" />

          {/* Central Nourishing Bowl Circle */}
          <div
            onClick={() => scrollTo('#consultation')}
            className="group cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] xl:w-[320px] xl:h-[320px] rounded-full p-2.5 bg-surface-white shadow-[0_12px_44px_rgba(23,32,27,0.12)] border border-[#314A3A]/20 transition-all duration-500 hover:scale-[1.02]"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-surface-white shadow-inner">
              <img
                src={bowlImage}
                alt="Nutritious wholesome grain and vegetable bowl with avocado, chickpeas, and fresh greens"
                className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                loading="lazy"
                width={640}
                height={640}
              />

              {/* Decorative Subtle Vignette Ring */}
              <div
                className="absolute inset-0 rounded-full border-4 border-surface-white/60 pointer-events-none"
                aria-hidden="true"
              />

              {/* Active Overlay when a Health Issue is Hovered */}
              {activeConcern ? (
                <div className="absolute inset-0 rounded-full bg-[#17201B]/85 backdrop-blur-md p-6 text-center text-surface-white flex flex-col items-center justify-center transition-all duration-300 animate-fade-in z-20">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/30 border border-white/20 flex items-center justify-center mb-2 shadow-xs">
                    <activeConcern.icon size={20} className="text-white" />
                  </div>
                  <h4 className="font-display font-600 text-[16px] text-white leading-tight">
                    {activeConcern.title}
                  </h4>
                  <p className="text-[12px] text-white/85 leading-snug mt-2 max-w-[200px]">
                    {activeConcern.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-600 text-emerald-300 group-hover:underline">
                    <span>Schedule Consultation</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              ) : (
                /* Default Center Badge */
                <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center p-4 z-10 pointer-events-none">
                  <div className="px-4 py-2.5 rounded-full bg-surface-white/90 backdrop-blur-md border border-border-subtle shadow-md text-center max-w-[190px]">
                    <span className="block text-[10px] font-600 tracking-wider uppercase text-brand-deep">
                      Clinical Nutrition
                    </span>
                    <span className="block text-[13px] font-display font-600 text-ink leading-tight mt-0.5">
                      8 Core Health Areas
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 8 Radial Blocks Around the Circumference */}
          {concerns.map((concern) => {
            const isHovered = hoveredId === concern.id;
            const Icon = concern.icon;

            // Calculate trigonometric coordinates based on angle (0° = Top / 12 o'clock)
            const rad = (concern.angle * Math.PI) / 180;
            // Radius percentage from center (35% from center places them hugging the central circle)
            const radiusPercent = 35.5;
            const leftPercent = 50 + radiusPercent * Math.sin(rad);
            const topPercent = 50 - radiusPercent * Math.cos(rad);

            return (
              <div
                key={concern.id}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                }}
                onMouseEnter={() => setHoveredId(concern.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => scrollTo('#consultation')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollTo('#consultation')}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-[190px] xl:w-[210px] rounded-[22px] p-4 text-center cursor-pointer transition-all duration-300 ease-spring select-none ${
                  isHovered
                    ? 'z-30 bg-surface-white border-2 border-brand-deep/50 shadow-[0_14px_36px_rgba(23,32,27,0.14)] scale-105'
                    : 'z-10 bg-gradient-to-b from-[#F9FAF7] to-[#EDF3EB] border border-[#314A3A]/20 shadow-[0_4px_16px_rgba(23,32,27,0.05)] hover:border-brand-primary/40'
                }`}
                aria-label={concern.title}
              >
                {/* Circular Icon in Dark Forest Green */}
                <div
                  className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-brand-deep text-surface-white shadow-md scale-110'
                      : 'bg-brand-deep/90 text-surface-white'
                  }`}
                >
                  <Icon size={18} />
                </div>

                {/* Main Title */}
                <h3
                  className={`font-display font-600 text-[13.5px] xl:text-[14.5px] leading-snug mt-2.5 transition-colors ${
                    isHovered ? 'text-brand-deep' : 'text-ink'
                  }`}
                >
                  {concern.shortTitle}
                </h3>

                {/* Description that expands smoothly when hovered */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-editorial ${
                    isHovered ? 'max-h-28 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[11.5px] text-ink-secondary leading-snug text-pretty">
                    {concern.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* MOBILE & TABLET VIEWPORT (< lg): Center Plate + 8 Responsive Cards */}
        {/* ============================================================== */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Centered Food Plate Showcase */}
          <div className="relative w-[190px] h-[190px] mx-auto rounded-full p-2 bg-surface-white shadow-lg border border-[#314A3A]/20">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <img
                src={bowlImage}
                alt="Nutritious food bowl"
                className="w-full h-full object-cover"
                loading="lazy"
                width={380}
                height={380}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                <span className="px-3 py-1 rounded-full bg-surface-white/90 backdrop-blur-md text-[11px] font-600 text-brand-deep shadow-xs">
                  8 Core Areas
                </span>
              </div>
            </div>
          </div>

          {/* 8 Cards in a 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {concerns.map((concern) => {
              const isHovered = hoveredId === concern.id;
              const Icon = concern.icon;

              return (
                <div
                  key={concern.id}
                  onClick={() => setHoveredId(isHovered ? null : concern.id)}
                  className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'bg-surface-white border-brand-deep/40 shadow-md'
                      : 'bg-gradient-to-b from-[#F9FAF7] to-[#EDF3EB] border-[#314A3A]/20 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-deep text-surface-white flex items-center justify-center shrink-0">
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-600 text-ink text-[14.5px] leading-tight">
                        {concern.title}
                      </h3>
                      <span className="text-[11px] text-brand-deep/80 font-medium">
                        {concern.category}
                      </span>
                    </div>
                  </div>

                  {/* Description: Toggles on tap or hover */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-editorial ${
                      isHovered ? 'max-h-36 opacity-100 mt-3 pt-3 border-t border-border-subtle/80' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[13px] text-ink-secondary leading-relaxed">
                      {concern.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollTo('#consultation');
                      }}
                      className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-600 text-brand-deep hover:underline"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Closing Narrative */}
        <div ref={closingRef} className="reveal mt-16 lg:mt-24 text-center max-w-3xl mx-auto">
          <p className="font-display font-600 text-ink text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.3] tracking-tight text-balance">
            Your health is more than one number, one symptom, or one diagnosis.
          </p>
          <p className="mt-4 font-display font-500 text-brand-deep text-[18px] sm:text-[22px] leading-snug">
            We look at the bigger picture.
          </p>
          <div className="mt-8">
            <button
              onClick={() => scrollTo('#consultation')}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Get Guidance on Your Health Concerns
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
