import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface HealthConcern {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  renderIllustration: () => JSX.Element;
}

// Isometric SVGs designed specifically for SA Wellness with architectural line-art aesthetic
const concerns: HealthConcern[] = [
  {
    id: 't2d',
    num: '01',
    title: 'Type 2 Diabetes & Prediabetes',
    category: 'Metabolic Health',
    description:
      'Personalized macro balancing, glycemic sequencing, and carbohydrate timing to stabilize blood sugar without eliminating traditional staples.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Axis Reference Lines */}
        <line x1="30" y1="180" x2="290" y2="40" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />
        <line x1="40" y1="60" x2="280" y2="180" stroke="#314A3A" strokeOpacity="0.12" strokeDasharray="4 4" />
        <line x1="160" y1="20" x2="160" y2="200" stroke="#314A3A" strokeOpacity="0.10" strokeDasharray="4 4" />

        {/* Back Plane: Macro Glycemic sequencing */}
        <path
          d="M160 55 L230 95 L160 135 L90 95 Z"
          fill="#E7EFEA"
          fillOpacity="0.75"
          stroke="#314A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M160 55 L160 65 L90 105 L90 95 Z" fill="#314A3A" fillOpacity="0.12" />
        <path d="M160 65 L230 105 L230 95 L160 55 Z" fill="#314A3A" fillOpacity="0.22" />

        {/* Mid Wave Grid Plate: Continuous glucose response curve */}
        <path
          d="M160 85 L245 134 L160 183 L75 134 Z"
          fill="#F5FAF6"
          fillOpacity="0.85"
          stroke="#5B7B68"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Sine Wave Curve along isometric surface */}
        <path
          d="M95 138 Q130 115 160 135 T225 132"
          stroke="#D97706"
          strokeWidth="2.25"
          strokeLinecap="round"
          fill="none"
        />
        {/* Floating Glucose Molecular Node */}
        <circle cx="160" cy="135" r="4.5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Foreground Isometric Data Tile */}
        <path
          d="M130 120 L160 103 L190 120 L160 137 Z"
          fill="#FFFFFF"
          stroke="#314A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line x1="145" y1="120" x2="175" y2="120" stroke="#314A3A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'insulin',
    num: '02',
    title: 'Insulin Resistance',
    category: 'Cellular Health',
    description:
      'Target underlying cellular resistance, reduce fasting insulin, and restore metabolic flexibility through tailored nutrition.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Axis Reference Lines */}
        <line x1="40" y1="175" x2="280" y2="45" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />
        <line x1="160" y1="20" x2="160" y2="200" stroke="#314A3A" strokeOpacity="0.10" strokeDasharray="4 4" />

        {/* Isometric Base Pedestal / Cellular Receptor Platform */}
        <path
          d="M115 140 L160 114 L205 140 L160 166 Z"
          fill="#E7EFEA"
          stroke="#314A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M85 158 L160 114 L235 158 L160 200 Z"
          fill="none"
          stroke="#5B7B68"
          strokeWidth="1.25"
          strokeDasharray="2 2"
        />
        {/* Receptor Chamber Aperture */}
        <ellipse cx="160" cy="140" rx="22" ry="12" fill="#FFFFFF" stroke="#314A3A" strokeWidth="1.5" />
        <ellipse cx="160" cy="140" rx="13" ry="7" fill="#314A3A" fillOpacity="0.1" />

        {/* Floating Metabolic Energy Star / Spark Receptor */}
        <path
          d="M160 42 C163 68 180 85 204 88 C180 91 163 108 160 134 C157 108 140 91 116 88 C140 85 157 68 160 42 Z"
          fill="url(#sparkGrad)"
          stroke="#314A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Radiance Beam */}
        <line x1="160" y1="134" x2="160" y2="140" stroke="#D97706" strokeWidth="2" strokeDasharray="2 2" />

        <defs>
          <linearGradient id="sparkGrad" x1="160" y1="42" x2="160" y2="134" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EBF4EE" />
            <stop offset="1" stopColor="#B3CBB9" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'ibs',
    num: '03',
    title: 'IBS & Digestive Concerns',
    category: 'Digestive Wellness',
    description:
      'Identify dietary triggers, balance the microbiome, and optimize heritage spices to resolve chronic bloating, gas, and discomfort.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Grid Lines */}
        <line x1="30" y1="170" x2="290" y2="50" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />
        <line x1="40" y1="50" x2="280" y2="170" stroke="#314A3A" strokeOpacity="0.12" strokeDasharray="4 4" />

        {/* Concentric Microbiome Balance Dial */}
        <ellipse cx="160" cy="120" rx="72" ry="42" fill="#F4F8F5" stroke="#314A3A" strokeWidth="1.5" />
        <ellipse cx="160" cy="120" rx="54" ry="31" fill="#FFFFFF" stroke="#5B7B68" strokeWidth="1.25" strokeDasharray="3 2" />
        <ellipse cx="160" cy="120" rx="36" ry="21" fill="#E7EFEA" stroke="#314A3A" strokeWidth="1.5" />

        {/* Botanical Equilibrium Leaf Node */}
        <path
          d="M160 85 C185 100 185 130 160 145 C135 130 135 100 160 85 Z"
          fill="#314A3A"
          fillOpacity="0.85"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <line x1="160" y1="92" x2="160" y2="138" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

        {/* Spice Nutrient Rings */}
        <circle cx="215" cy="105" r="4.5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="105" cy="135" r="3.5" fill="#5B7B68" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'pcos',
    num: '04',
    title: 'PCOS & Hormonal Health',
    category: 'Hormonal Balance',
    description:
      'Targeted nutrition protocols for androgen regulation, regular ovulatory cycles, and hormonal insulin sensitivity.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Diagonal Lines */}
        <line x1="40" y1="180" x2="280" y2="40" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />
        <line x1="160" y1="20" x2="160" y2="200" stroke="#314A3A" strokeOpacity="0.10" strokeDasharray="4 4" />

        {/* Layered Endocrine Cycle Rings in 3D Isometric Space */}
        <ellipse cx="160" cy="145" rx="68" ry="38" fill="none" stroke="#314A3A" strokeWidth="1.5" strokeOpacity="0.3" />
        <ellipse cx="160" cy="120" rx="60" ry="33" fill="#F4F8F5" stroke="#314A3A" strokeWidth="1.5" />
        <ellipse cx="160" cy="95" rx="52" ry="28" fill="#FFFFFF" stroke="#5B7B68" strokeWidth="1.5" />

        {/* Central Floating Nexus Diamond */}
        <path
          d="M160 58 L184 95 L160 132 L136 95 Z"
          fill="#D97706"
          fillOpacity="0.9"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Inner Facet */}
        <path d="M160 58 L160 132" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="210" cy="120" r="4.5" fill="#314A3A" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="110" cy="120" r="4.5" fill="#5B7B68" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'visceral',
    num: '05',
    title: 'Abdominal & Visceral Fat',
    category: 'Body Composition',
    description:
      'Target deep visceral fat around internal organs with precision nutrition and waist-to-hip ratio management.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Baseline */}
        <line x1="40" y1="180" x2="280" y2="40" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />

        {/* Stepped Isometric Body Composition Concentric Cylinders */}
        {/* Base Layer */}
        <ellipse cx="160" cy="155" rx="74" ry="38" fill="#E7EFEA" stroke="#314A3A" strokeWidth="1.5" />
        <path d="M86 155 L86 168 A74 38 0 0 0 234 168 L234 155 Z" fill="#D3E2D8" stroke="#314A3A" strokeWidth="1.5" />

        {/* Mid Visceral Target Layer */}
        <ellipse cx="160" cy="125" rx="52" ry="27" fill="#FFFFFF" stroke="#314A3A" strokeWidth="1.5" />
        <path d="M108 125 L108 138 A52 27 0 0 0 212 138 L212 125 Z" fill="#E7EFEA" stroke="#314A3A" strokeWidth="1.5" />

        {/* Top Metabolic Core */}
        <ellipse cx="160" cy="95" rx="30" ry="16" fill="#D97706" fillOpacity="0.85" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M130 95 L130 108 A30 16 0 0 0 190 108 L190 95 Z" fill="#B45309" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Precision Measurement Guidelines */}
        <line x1="234" y1="70" x2="234" y2="170" stroke="#314A3A" strokeOpacity="0.3" strokeDasharray="3 3" />
        <circle cx="234" cy="120" r="3.5" fill="#314A3A" />
      </svg>
    ),
  },
  {
    id: 'hypertension',
    num: '06',
    title: 'Hypertension & BP',
    category: 'Cardiovascular Care',
    description:
      'Evidence-based sodium-to-potassium rebalancing, endothelial support, and lifestyle approaches to manage blood pressure sustainably.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Axis */}
        <line x1="30" y1="180" x2="290" y2="40" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />
        <line x1="160" y1="20" x2="160" y2="200" stroke="#314A3A" strokeOpacity="0.10" strokeDasharray="4 4" />

        {/* Precision 3D Circular Pressure Gauge / Dial */}
        <ellipse cx="160" cy="115" rx="76" ry="44" fill="#F4F8F5" stroke="#314A3A" strokeWidth="1.5" />
        {/* Gauge Rim Extrusion */}
        <path d="M84 115 L84 127 A76 44 0 0 0 236 127 L236 115 Z" fill="#D3E2D8" stroke="#314A3A" strokeWidth="1.5" />

        {/* Dial Face */}
        <ellipse cx="160" cy="115" rx="58" ry="33" fill="#FFFFFF" stroke="#5B7B68" strokeWidth="1.25" />

        {/* Radial Pressure Calibration Marks */}
        <path
          d="M125 105 A50 28 0 0 1 195 105"
          stroke="#D97706"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Isometric Indicator Needle */}
        <line x1="160" y1="115" x2="185" y2="92" stroke="#314A3A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="160" cy="115" r="5" fill="#314A3A" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'heart',
    num: '07',
    title: 'Heart Health & Plaque',
    category: 'Cardiovascular Care',
    description:
      'Target South Asian cardiometabolic risk factors — optimizing ApoB, lipid subfractions, and arterial inflammation naturally.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Axis */}
        <line x1="30" y1="180" x2="290" y2="40" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />
        <line x1="40" y1="50" x2="280" y2="170" stroke="#314A3A" strokeOpacity="0.12" strokeDasharray="4 4" />

        {/* Isometric Arterial Conduit Prism */}
        <path
          d="M90 110 L160 70 L230 110 L160 150 Z"
          fill="#FFFFFF"
          stroke="#314A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M90 110 L90 125 L160 165 L160 150 Z" fill="#E7EFEA" stroke="#314A3A" strokeWidth="1.5" />
        <path d="M160 150 L160 165 L230 125 L230 110 Z" fill="#D3E2D8" stroke="#314A3A" strokeWidth="1.5" />

        {/* Central ApoB Shield & Laminar Streamline */}
        <path
          d="M160 82 L185 96 L185 118 L160 132 L135 118 L135 96 Z"
          fill="#314A3A"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        {/* Pulse Heartbeat Core */}
        <path
          d="M160 98 C160 98 167 92 171 95 C174 98 174 103 160 114 C146 103 146 98 149 95 C153 92 160 98 160 98 Z"
          fill="#D97706"
        />
      </svg>
    ),
  },
  {
    id: 'vitamind',
    num: '08',
    title: 'Vitamin D & Nutrients',
    category: 'Micronutrient Health',
    description:
      'Clinical dietary strategies and co-factor pairing (K2, magnesium, healthy fats) to resolve chronic deficiencies.',
    renderIllustration: () => (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[190px] drop-shadow-sm select-none"
      >
        {/* Isometric Axis */}
        <line x1="40" y1="180" x2="280" y2="40" stroke="#314A3A" strokeOpacity="0.18" strokeDasharray="4 4" />
        <line x1="160" y1="20" x2="160" y2="200" stroke="#314A3A" strokeOpacity="0.10" strokeDasharray="4 4" />

        {/* Multi-tier Isometric Solar Spectrum Crystal */}
        <path
          d="M160 45 L205 75 L205 135 L160 165 L115 135 L115 75 Z"
          fill="#F5FAF6"
          stroke="#314A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Inner Facets */}
        <path d="M160 45 L160 165" stroke="#5B7B68" strokeWidth="1.25" strokeDasharray="3 2" />
        <path d="M115 75 L205 135" stroke="#314A3A" strokeWidth="1" strokeOpacity="0.25" />
        <path d="M205 75 L115 135" stroke="#314A3A" strokeWidth="1" strokeOpacity="0.25" />

        {/* Central Solar Amber Node (Vitamin D3) */}
        <circle cx="160" cy="105" r="14" fill="#D97706" fillOpacity="0.9" stroke="#FFFFFF" strokeWidth="2" />
        {/* Orbital Co-factors (K2, Magnesium) */}
        <circle cx="125" cy="80" r="6" fill="#314A3A" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="195" cy="130" r="5" fill="#5B7B68" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function HealthConcerns() {
  const headerRef = useReveal<HTMLDivElement>();
  const containerRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const closingRef = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { scrollTo } = useSmoothScroll();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
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
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cardWidth = 360; // approximate card stride
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="health-concerns" className="py-20 lg:py-30 scroll-mt-20 overflow-hidden bg-surface-primary">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section Header: Two-Column Split with Space-Between */}
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-14 mb-12 lg:mb-16"
        >
          {/* Left Column: Eyebrow Badge & Title Stack */}
          <div className="max-w-2xl">
            <span className="text-eyebrow text-brand-deep uppercase">
              Health Concerns We Support
            </span>

            <h2 className="mt-4 font-display font-600 text-ink text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-tight text-balance">
              Care designed around <br />
              <span className="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-light bg-clip-text text-transparent">
                What you're actually dealing with.
              </span>
            </h2>
          </div>

          {/* Right Column: Description Stack */}
          <div className="lg:max-w-md">
            <p className="text-[15px] sm:text-[16px] text-ink-secondary leading-[1.65] text-left lg:text-right">
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
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 -mx-6 px-6 lg:-mx-10 lg:px-10"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {concerns.map((concern) => (
              <div
                key={concern.id}
                onClick={() => scrollTo('#consultation')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollTo('#consultation')}
                className="group flex-shrink-0 w-[290px] sm:w-[330px] lg:w-[360px] snap-start rounded-[24px] overflow-hidden bg-surface-white border border-border-subtle shadow-[0_4px_24px_rgba(23,32,27,0.03)] hover:shadow-[0_16px_40px_rgba(23,32,27,0.08)] hover:border-brand-primary/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
                aria-label={`Learn more about ${concern.title}`}
              >
                {/* Top Half: Architectural Isometric Illustration */}
                <div className="relative w-full h-[220px] sm:h-[240px] bg-gradient-to-b from-[#F2F6F3]/70 to-surface-white border-b border-border-subtle/60 flex items-center justify-center p-5 overflow-hidden transition-colors duration-300 group-hover:from-[#E9F1EC]/80">
                  {/* Subtle Background Radial Glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-brand-light/10 via-transparent to-transparent pointer-events-none" />

                  {/* Watermark Number Badge */}
                  <span className="absolute top-4 right-4 text-[12px] font-500 text-ink-muted/50 font-mono">
                    {concern.num}
                  </span>

                  {/* SVG Isometric Artwork */}
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {concern.renderIllustration()}
                  </div>
                </div>

                {/* Bottom Half: Clean Typography & Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-start">
                  {/* Category Label */}
                  <span className="text-[11px] font-600 uppercase tracking-wider text-brand-light block mb-2">
                    {concern.category}
                  </span>

                  {/* Concern Title */}
                  <h3 className="font-display font-600 text-ink text-[18px] sm:text-[20px] leading-[1.3] group-hover:text-brand-deep transition-colors">
                    {concern.title}
                  </h3>

                  {/* Clinical Description */}
                  <p className="mt-2.5 text-[13.5px] sm:text-[14px] text-ink-secondary leading-[1.65]">
                    {concern.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Slider Navigation & Progress Bar (matching screenshot) */}
          <div className="flex items-center justify-between mt-10 pt-2">
            {/* Left Circular Arrow Button */}
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous health concerns"
              className="w-11 h-11 rounded-full border border-border-subtle bg-surface-white flex items-center justify-center text-ink hover:bg-surface-secondary hover:border-ink/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-xs cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Middle Continuous Track & Progress Indicator */}
            <div className="flex-1 max-w-xl mx-5 sm:mx-8 h-[3px] bg-border-subtle/80 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-ink rounded-full transition-all duration-200"
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
              className="w-11 h-11 rounded-full border border-border-subtle bg-surface-white flex items-center justify-center text-ink hover:bg-surface-secondary hover:border-ink/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-xs cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
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
