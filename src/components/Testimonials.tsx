import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    quote: 'My blood sugar and cholesterol were creeping up and generic advice wasn\'t working. SA Wellness helped me understand how my South Asian body responds to food differently. Within months, my numbers improved — and I never had to give up roti or rice.',
    name: 'Sourav Majumdar',
    title: 'Physician',
    location: 'Palo Alto, CA',
  },
  {
    quote: 'I\'d tried so many diets that told me to stop eating the foods I grew up with. This was the first time someone said: let\'s work with your food, not against it. That changed everything for me.',
    name: 'Priya Sharma',
    title: 'Software Engineer',
    location: 'New York, NY',
  },
  {
    quote: 'As a busy parent working full-time, I needed something realistic. The plan fit into my family\'s routine — cooking, eating out, everything. My energy is better and my HbA1c is finally in range.',
    name: 'Arjun Patel',
    title: 'Product Manager',
    location: 'Jersey City, NJ',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const headerRef = useReveal<HTMLDivElement>();
  const cardRef = useReveal<HTMLDivElement>({ threshold: 0.2 });

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[active];

  return (
    <section className="py-20 lg:py-30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div ref={headerRef} className="reveal text-center max-w-2xl mx-auto">
          <span className="text-eyebrow text-brand-deep uppercase">Trusted by South Asians Across Borders</span>
          <h2 className="mt-4 font-display font-600 text-ink text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight text-balance">
            Personalized care. Practical guidance. Real experiences.
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-accent-warm text-accent-warm" />
              ))}
            </div>
            <span className="text-[14px] font-500 text-ink">4.8/5</span>
            <span className="text-[14px] text-ink-muted">·</span>
            <span className="text-[14px] text-ink-secondary">300+ Customer Reviews</span>
          </div>
        </div>

        <div ref={cardRef} className="reveal mt-12 max-w-4xl mx-auto">
          <blockquote className="bg-surface-white rounded-editorial border border-border-subtle p-8 sm:p-12 lg:p-14">
            <p className="font-display font-400 text-ink text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.4] text-balance">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-600 text-ink text-[16px]">{current.name}</div>
                <div className="text-ink-secondary text-[14px]">{current.title}, {current.location}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle text-ink-secondary hover:border-brand-primary hover:text-brand-deep transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle text-ink-secondary hover:border-brand-primary hover:text-brand-deep transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-brand-deep' : 'w-2 bg-border-subtle'}`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-selected={i === active}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
