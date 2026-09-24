import { ArrowRight, ShieldCheck, Video, Calendar } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface PillarCard {
  id: string;
  title: string;
  image: string;
}

const pillars: PillarCard[] = [
  {
    id: 'cultural-understanding',
    title: 'Cultural\nunderstanding',
    image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=1000&fit=crop',
  },
  {
    id: 'evidence-nutrition',
    title: 'Evidence-based\nnutrition',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=compress&cs=tinysrgb&w=1000&fit=crop',
  },
  {
    id: 'practicality',
    title: 'Real-life\npracticality',
    image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1000&fit=crop',
  },
  {
    id: 'personalized-care',
    title: 'Personalized\ncare',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=compress&cs=tinysrgb&w=1000&fit=crop',
  },
];

export default function OnlineConsultations() {
  const headerRef = useReveal<HTMLDivElement>();
  const cardsRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const footerRef = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="consultations" className="py-20 lg:py-30 scroll-mt-20 bg-surface-secondary/40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* ============================================================== */}
        {/* SECTION HEADER: Two-Column Split Aligned With Our Methodology */}
        {/* ============================================================== */}
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-14 mb-12 lg:mb-16"
        >
          {/* Left Column: Eyebrow Badge & Title Stack */}
          <div className="max-w-2xl">
            <span className="text-eyebrow text-brand-deep uppercase">
              Expert Nutrition Guidance
            </span>

            <h2 className="mt-4 font-display font-600 text-ink text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-tight text-balance">
              Expert clinical care, <br />
              <span className="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-light bg-clip-text text-transparent">
                Wherever you are across the U.S.
              </span>
            </h2>
          </div>

          {/* Right Column: Description Stack */}
          <div className="lg:max-w-md">
            <p className="text-[15px] sm:text-[16px] text-ink-secondary leading-[1.65] text-left lg:text-right">
              100% online clinical consultations for South Asians nationwide. No commute, no waiting rooms — personalized, culturally attuned care delivered directly to your home.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4 PHOTOGRAPHIC PILLAR CARDS (Clean photographic layout)       */}
        {/* ============================================================== */}
        <div
          ref={cardsRef}
          className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => scrollTo('#consultation')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollTo('#consultation')}
              aria-label={`Book consultation for ${pillar.title.replace('\n', ' ')}`}
              className="group relative rounded-[26px] overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] cursor-pointer shadow-[0_4px_24px_rgba(23,32,27,0.06)] hover:shadow-[0_20px_48px_rgba(23,32,27,0.18)] transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 select-none bg-ink"
            >
              {/* Background Photography */}
              <img
                src={pillar.image}
                alt={pillar.title.replace('\n', ' ')}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-108"
                loading="lazy"
                width={800}
                height={1000}
              />

              {/* Dark Gradient Vignette for pristine white text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-[#17201B]/25 mix-blend-multiply" />

              {/* Bottom Content: Clean Display Typography */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10 flex flex-col justify-end">
                <h3 className="font-display font-600 text-surface-white text-[22px] sm:text-[24px] lg:text-[25px] leading-[1.18] tracking-tight whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {pillar.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM ACTION BAR: Telehealth Reassurance & Booking Trigger */}
        {/* ============================================================== */}
        <div
          ref={footerRef}
          className="reveal mt-12 sm:mt-16 p-6 sm:p-8 rounded-[24px] bg-surface-white border border-border-subtle shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-8 text-ink text-[14px] font-500">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-deep">
                <Video size={16} />
              </span>
              <span>100% Online HD Telehealth</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-deep">
                <ShieldCheck size={16} />
              </span>
              <span>HIPAA Compliant &amp; Private</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-deep">
                <Calendar size={16} />
              </span>
              <span>Flexible Weekend &amp; Evening Slots</span>
            </div>
          </div>

          <button
            onClick={() => scrollTo('#consultation')}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-deep text-surface-white text-[14px] font-600 tracking-wide hover:bg-brand-primary transition-all duration-250 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
