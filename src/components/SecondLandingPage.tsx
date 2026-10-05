import { useState, useEffect, type FormEvent } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Leaf,
  User,
  Calendar,
  Pause,
  Play,
} from 'lucide-react';
import founderImg from '../../assets/03lyKqCdFEsXx6Kmt8oSVHMgaA.png';

interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  member: string;
  city: string;
  diagnosis: string;
  goal: string;
  strategy: string;
  result: string;
  image: string;
  alt: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'case-01',
    tag: 'Card 1',
    title: 'Bridal & Sangeet Prep',
    member: 'Meera K.',
    city: 'San Francisco, CA',
    diagnosis: 'Bridal & Sangeet Prep',
    goal: 'Reduce persistent abdominal bloat, improve skin clarity, and maintain high stamina through long events.',
    strategy:
      'Adjusted macro ratios for home-cooked meals, added targeted gut-support nutrients, and applied a specialized 7-day pre-event hydration plan.',
    result:
      'Heavy bridal lengha fit effortlessly with zero waistline tightness; sustained full energy through late-night functions.',
    image: '/assets/t0.png',
    alt: 'Bridal & Sangeet Prep client celebration',
  },
  {
    id: 'case-02',
    tag: 'Card 2',
    title: 'Milestone Anniversary & Hosting',
    member: 'Sanjay & Neha P.',
    city: 'Dallas, TX',
    diagnosis: '25th Wedding Anniversary Gala',
    goal: 'Shed stubborn midsection weight while hosting weekend dinner parties for visiting family.',
    strategy:
      'Structuring event-day meal timing and pairing traditional party foods with metabolic-balancing choices earlier in the day.',
    result:
      'Both reduced waist circumference and felt light, active, and relaxed during their entire hosting week.',
    image: '/assets/t02.png',
    alt: 'Milestone Anniversary & Hosting celebration',
  },
  {
    id: 'case-03',
    tag: 'Card 3',
    title: 'Family Reunion & Travel',
    member: 'Anjali R.',
    city: 'Northern New Jersey',
    diagnosis: 'Milestone Birthday & Multi-City Reunion',
    goal: 'Eliminate post-meal sluggishness and feel light in tailored traditional wear.',
    strategy:
      'Optimized digestion with simple spice-pairing adjustments and an anti-inflammatory routine for frequent travel days.',
    result:
      'Total digestive ease, balanced daily energy, and full confidence in every photo.',
    image: '/assets/t03-1.png',
    alt: 'Family Reunion & Travel celebration outcome',
  },
];

const comparisons = [
  {
    usual: 'A standard plan for everyone',
    sa: 'Guidance based on your individual goals',
  },
  {
    usual: 'Focused mainly on what to cut out',
    sa: 'Focus on what you can add, adjust, and improve',
  },
  {
    usual: "Doesn't always fit your everyday routine",
    sa: 'Built around your lifestyle and food preferences',
  },
  {
    usual: 'Short-term changes for a specific date',
    sa: 'A realistic approach for your occasion and beyond',
  },
  {
    usual: 'Generic nutrition advice',
    sa: 'Personalised, evidence-informed guidance',
  },
];

const faqItems = [
  {
    question: 'What happens during the consultation?',
    answer:
      'You’ll have a 1:1 conversation about your goals, health, lifestyle, food preferences, and upcoming occasion.',
  },
  {
    question: 'Is the consultation online?',
    answer:
      'Yes. Your consultation is conducted online, so you can connect from anywhere in the U.S.',
  },
  {
    question: 'Do I need to follow a strict diet?',
    answer:
      'No. We focus on realistic changes that can fit into your lifestyle and the foods you enjoy.',
  },
  {
    question: 'Is this only for weddings?',
    answer:
      'Not at all. You can book a consultation for an engagement, milestone celebration, special event, or any occasion that matters to you.',
  },
  {
    question: 'When should I book?',
    answer:
      'Starting early gives you more time to work towards your goals without relying on last-minute changes. However, your timeline can be discussed during the consultation.',
  },
  {
    question: 'What happens after the consultation?',
    answer:
      'You’ll have a clearer understanding of your goals, what may be realistic for your timeline, and the next steps that may be right for you.',
  },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  eventDate: string;
  notes: string;
}

function SecondPageSkeleton() {
  return (
    <div className="min-h-screen bg-surface-primary pt-[100px] sm:pt-[130px] pb-24 px-6 lg:px-10 max-w-[1280px] mx-auto animate-pulse transition-opacity duration-300">
      {/* Hero grid skeleton */}
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-16 items-center">
        <div className="w-full h-[320px] sm:h-[480px] rounded-hero skeleton-shimmer order-1 lg:order-2" />
        <div className="space-y-4 order-2 lg:order-1">
          <div className="w-48 h-4 rounded-full skeleton-shimmer" />
          <div className="w-full max-w-lg h-12 rounded-xl skeleton-shimmer" />
          <div className="w-3/4 h-8 rounded-xl skeleton-shimmer" />
          <div className="space-y-2.5 pt-2">
            <div className="w-full h-4 rounded skeleton-shimmer" />
            <div className="w-11/12 h-4 rounded skeleton-shimmer" />
            <div className="w-4/5 h-4 rounded skeleton-shimmer" />
          </div>
          <div className="w-52 h-12 rounded-xl skeleton-shimmer pt-3" />
          <div className="w-72 h-4 rounded skeleton-shimmer pt-2" />
        </div>
      </div>

      {/* 3 Pillars skeleton */}
      <div className="mt-14 pt-10 border-t border-border-subtle grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="w-24 h-4 rounded skeleton-shimmer" />
            <div className="w-44 h-6 rounded skeleton-shimmer" />
            <div className="w-full h-4 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SecondLandingPage() {
  const [isReady, setIsReady] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    eventDate: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  // Outcomes Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const totalDuration = 6000;
    const increment = (intervalTime / totalDuration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((curr) => (curr + 1) % caseStudies.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectSlide = (index: number) => {
    setActiveSlide(index);
    setProgress(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Subtle skeleton loader / fade-in transition on initial page mount/switch
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 180);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll & text scrolling reveal animations on all .reveal and .reveal-scale elements
  useEffect(() => {
    if (!isReady) return;

    const elements = document.querySelectorAll('.reveal, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isReady]);

  const scrollToConsultation = () => {
    const el = document.querySelector('#consultation-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errors.phone = 'Please enter your phone number.';
    }
    if (!formData.occasion.trim()) {
      errors.occasion = "Please let us know what occasion you're preparing for.";
    }
    return errors;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const existing = JSON.parse(
        localStorage.getItem('sa_wellness_occasion_consultations') || '[]'
      );
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(
        'sa_wellness_occasion_consultations',
        JSON.stringify(existing)
      );
      setFormStatus('success');
    } catch {
      setFormStatus('success');
    }
  };

  if (!isReady) {
    return <SecondPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-surface-primary text-ink font-sans antialiased selection:bg-brand-soft selection:text-ink transition-opacity duration-500 ease-editorial opacity-100">
      {/* ============================================================== */}
      {/* SECTION 1: HERO & OCCASION POSITIONING */}
      {/* ============================================================== */}
      <section
        id="top"
        className="relative pt-[100px] sm:pt-[130px] pb-16 lg:pt-[140px] lg:pb-24 overflow-hidden border-b border-border-subtle"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Visual Column: Layered Lifestyle Photo Composition */}
            <div className="relative reveal-scale order-1 lg:order-2 w-full">
              <div className="relative h-[480px] xs:h-[510px] sm:h-[540px] lg:h-[560px] w-full max-w-[540px] mx-auto select-none pt-2">
                {/* Ambient glow backdrop */}
                <div className="absolute inset-0 bg-radial-gradient from-sand-light/60 to-transparent pointer-events-none" />

                {/* Card 1: Your Goal — Weddings & Milestone Prep */}
                <div className="absolute top-0 left-0 w-[55%] sm:w-[52%] h-[225px] sm:h-[250px] z-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-[0_16px_36px_rgba(20,24,18,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer">
                  <img
                    src="/assets/t0.png"
                    alt="South Asian bridal and milestone celebration preparation"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-104"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10.5px] sm:text-[11px] font-600 uppercase tracking-wider">
                        Your Goal
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-600 text-white text-[15px] sm:text-[17px] leading-snug drop-shadow-xs">
                        Feel confident for the moments ahead.
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card 2: Your Food — Celebratory Dining & Traditional Food */}
                <div className="absolute top-2 sm:top-4 right-0 w-[54%] sm:w-[50%] h-[215px] sm:h-[240px] z-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-[0_16px_36px_rgba(20,24,18,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer">
                  <img
                    src="/assets/t02.png"
                    alt="South Asian shared festive meals and balanced nutrition"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-104"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10.5px] sm:text-[11px] font-600 uppercase tracking-wider">
                        Your Food
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-600 text-white text-[15px] sm:text-[17px] leading-snug drop-shadow-xs">
                        Keep the food you actually love.
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card 3: Your Life — Travel & Everyday Routine */}
                <div className="absolute bottom-2 sm:bottom-3 left-0 sm:left-2 w-[60%] sm:w-[56%] h-[235px] sm:h-[265px] z-20 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-[0_16px_36px_rgba(20,24,18,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer">
                  <img
                    src="/assets/t03-1.png"
                    alt="South Asian celebration, travel, and active daily lifestyle"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-104"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10.5px] sm:text-[11px] font-600 uppercase tracking-wider">
                        Your Life
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-600 text-white text-[15px] sm:text-[17px] leading-snug drop-shadow-xs">
                        Build something you can live with.
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Foreground Trust Card: Floats on the Your Life card on the top right side without overlapping Your Food */}
                <div
                  onClick={scrollToConsultation}
                  className="absolute bottom-[135px] sm:bottom-[155px] left-[20%] sm:left-[24%] w-[62%] sm:w-[56%] z-40 bg-surface-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-border-subtle shadow-[0_20px_45px_rgba(43,45,36,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(43,45,36,0.24)] cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10.5px] sm:text-[11px] font-700 uppercase tracking-wider text-emerald-800">
                      Free 20-min Consult
                    </span>
                  </div>
                  <p className="font-display font-600 text-ink text-[14px] sm:text-[15px] leading-snug">
                    1:1 with a real coach
                  </p>
                  <p className="text-[11.5px] sm:text-[12px] text-ink-secondary mt-0.5">
                    No forms. No bots. Culturally tailored.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Content Column: Lean, Emotionally Grounded & High-Converting */}
            <div className="flex flex-col order-2 lg:order-1">
              {/* Eyebrow */}
              <div className="reveal">
                <span className="text-eyebrow text-brand-deep uppercase tracking-wider">
                  Occasion &amp; Milestone Wellness Care
                </span>
              </div>

              {/* Primary Headline */}
              <h1 className="reveal delay-100 mt-4 font-display font-600 text-ink text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.12] tracking-tight text-balance max-w-xl">
                Your Food Is Part of Your Life.
                <span className="block mt-1">Your Nutrition Should Be, Too.</span>
              </h1>

              {/* Supporting Headline */}
              <h2 className="reveal delay-200 mt-4 font-display font-500 text-brand-deep text-[20px] sm:text-[23px] lg:text-[25px] leading-snug">
                Say Hello to Empathetic, Cultural Wellness Care.
              </h2>

              {/* Body Copy */}
              <div className="reveal delay-300 mt-5 space-y-3.5 text-ink-secondary text-[15.5px] sm:text-[16.5px] leading-[1.68] max-w-xl text-pretty">
                <p>
                  Whether you’re preparing for a wedding, engagement, milestone celebration, or another important occasion, you deserve more than a last-minute diet.
                </p>
                <p>
                  Get personalised nutrition and wellness guidance based on your health, lifestyle, food, goals, and the time you have before your event.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="reveal delay-400 mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={scrollToConsultation}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand-deep text-surface-white text-[15.5px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
                >
                  <span>Book Your Consultation</span>
                </button>
              </div>

              {/* Proof Hierarchy: 3 Key Pillars + Verified Stat */}
              <div className="reveal delay-500 mt-7 pt-6 border-t border-border-subtle space-y-3.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] sm:text-[13.5px] text-ink font-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={13.5} className="text-brand-deep shrink-0" />
                    1:1 Personalized Care
                  </span>
                  <span className="text-accent-warm">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={13.5} className="text-brand-deep shrink-0" />
                    Online Across the U.S.
                  </span>
                  <span className="text-accent-warm">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={13.5} className="text-brand-deep shrink-0" />
                    South Asian Expertise
                  </span>
                </div>

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="font-display font-600 text-brand-deep text-[28px] sm:text-[32px] leading-none shrink-0">
                    91%
                  </span>
                  <p className="text-[13px] sm:text-[13.5px] text-ink-secondary leading-snug">
                    of clients report feeling lighter, more energetic, and camera-ready within 4 weeks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: PERSONALISED CONSULTATION & FORM ON RIGHT SIDE */}
      {/* ============================================================== */}
      <section
        id="how-it-works"
        className="py-18 lg:py-26 bg-surface-secondary/40 border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_minmax(460px,540px)] gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading, Supporting Content & Large Stats */}
            <div className="flex flex-col justify-between h-full pt-1">
              <div>
                {/* Section Badge 2 */}
                <div className="reveal">
                  <span className="text-eyebrow text-brand-deep uppercase">
                    1:1 Personalised Consultation
                  </span>
                </div>

                <h2 className="reveal delay-100 mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.15] tracking-tight">
                  Let’s Make a Plan That Works for You
                </h2>

                <div className="reveal delay-200 mt-6 space-y-4 text-ink-secondary text-[15.5px] sm:text-[16.5px] leading-[1.68]">
                  <p>
                    When you have an important occasion coming up, it’s easy to feel unsure about where to start.
                  </p>
                  <p>
                    You may have tried diets before. You may be wondering what to eat, what to change, or how to make it work around your everyday life.
                  </p>
                  <p>
                    Your consultation is a chance to talk through all of that with a professional — and find an approach that makes sense for you.
                  </p>
                </div>
              </div>

              {/* Trust Statistics */}
              <div className="reveal delay-300 mt-10 pt-8 border-t border-border-subtle">
                <div className="grid grid-cols-2 gap-7 sm:gap-9">
                  <div>
                    <div className="font-display font-500 text-ink text-[34px] sm:text-[42px] leading-none tracking-tight">
                      5000+
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-2">
                      Consultations
                    </div>
                  </div>

                  <div>
                    <div className="font-display font-500 text-ink text-[34px] sm:text-[42px] leading-none tracking-tight">
                      30+
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-2">
                      Years of Experience
                    </div>
                  </div>

                  <div>
                    <div className="font-display font-500 text-ink text-[34px] sm:text-[42px] leading-none tracking-tight">
                      1:1
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-2">
                      Personalised Care
                    </div>
                  </div>

                  <div>
                    <div className="font-display font-500 text-brand-deep text-[22px] sm:text-[26px] leading-snug font-600">
                      South Asian
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-1">
                      Nutrition Expertise
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2.5 text-[12.5px] sm:text-[13px] text-ink-secondary">
                  <ShieldCheck size={18} className="text-emerald-600 fill-emerald-100/60 shrink-0" />
                  <span>100% Online &amp; HIPAA-Compliant Telehealth Across the U.S.</span>
                </div>
              </div>
            </div>

            {/* Right-Side Form */}
            <div id="consultation-form" className="scroll-mt-28 w-full reveal delay-150">
              <div className="bg-surface-white rounded-hero border border-border-subtle p-6 sm:p-7 lg:p-8 shadow-[0_14px_38px_rgba(43,45,36,0.07)]">
                <div className="mb-4 pb-3 border-b border-border-subtle">
                  <span className="text-[11.5px] font-600 uppercase tracking-wider text-brand-deep block mb-0.5">
                    Direct Booking
                  </span>
                  <h3 className="font-display font-600 text-ink text-[20px] sm:text-[22px] leading-tight">
                    Start With a Personalised Consultation
                  </h3>
                </div>

                {formStatus === 'success' ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-brand-soft text-brand-deep flex items-center justify-center mx-auto">
                      <CheckCircle2 size={30} />
                    </div>
                    <h4 className="font-display font-600 text-ink text-[20px]">
                      Consultation Request Received
                    </h4>
                    <p className="text-[14.5px] text-ink-secondary max-w-sm mx-auto leading-relaxed">
                      Thank you, {formData.name}. We have received your request for your upcoming{' '}
                      <span className="font-500 text-ink">{formData.occasion}</span>. We will reach out within 24 hours to schedule your consultation.
                    </p>
                    <button
                      onClick={() => {
                        setFormStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          occasion: '',
                          eventDate: '',
                          notes: '',
                        });
                      }}
                      className="mt-3 text-[13.5px] font-500 text-brand-deep underline cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-3.5">
                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-[13px] font-500 text-ink mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                          }}
                          placeholder="e.g. Priya Sharma"
                          className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none transition-colors ${
                            formErrors.name
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                          }`}
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? 'name-error' : undefined}
                        />
                        {formErrors.name && (
                          <p id="name-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>{formErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-[13px] font-500 text-ink mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                          }}
                          placeholder="priya@example.com"
                          className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none transition-colors ${
                            formErrors.email
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                          }`}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone Number and Event Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Phone Number */}
                      <div>
                        <label htmlFor="phone" className="block text-[13px] font-500 text-ink mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                          }}
                          placeholder="(555) 234-5678"
                          className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none transition-colors ${
                            formErrors.phone
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                          }`}
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                        />
                        {formErrors.phone && (
                          <p id="phone-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Event date (if any) */}
                      <div>
                        <label htmlFor="eventDate" className="block text-[13px] font-500 text-ink mb-1">
                          Event date <span className="text-ink-muted font-normal">(if any)</span>
                        </label>
                        <input
                          type="text"
                          id="eventDate"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          placeholder="e.g. Nov 2026 / 3 mos"
                          className="w-full h-[46px] px-3.5 rounded-xl border border-border-subtle bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand-primary focus:bg-surface-primary/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* What's coming up? */}
                    <div>
                      <label htmlFor="occasion" className="block text-[13px] font-500 text-ink mb-1">
                        What&apos;s coming up?
                      </label>
                      <select
                        id="occasion"
                        value={formData.occasion}
                        onChange={(e) => {
                          setFormData({ ...formData, occasion: e.target.value });
                          if (formErrors.occasion) setFormErrors({ ...formErrors, occasion: '' });
                        }}
                        className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink focus:outline-none transition-colors cursor-pointer ${
                          formErrors.occasion
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                        }`}
                        aria-invalid={!!formErrors.occasion}
                        aria-describedby={formErrors.occasion ? 'occasion-error' : undefined}
                      >
                        <option value="">Select your upcoming occasion</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Milestone Celebration">Milestone Celebration</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Family Reunion">Family Reunion</option>
                        <option value="Special Event">Special Event</option>
                      </select>
                      {formErrors.occasion && (
                        <p id="occasion-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{formErrors.occasion}</span>
                        </p>
                      )}
                    </div>

                    {/* Anything we should know? */}
                    <div>
                      <label htmlFor="notes" className="block text-[13px] font-500 text-ink mb-1">
                        Anything we should know?
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Share dietary preferences, goals, or questions..."
                        className="w-full min-h-[72px] p-3 rounded-xl border border-border-subtle bg-surface-white text-[14px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand-primary focus:bg-surface-primary/30 transition-colors resize-none"
                      />
                    </div>

                    {/* Button - Book Your Consultation */}
                    <div className="pt-1.5">
                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full h-[48px] rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'loading' ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Book Your Consultation</span>
                        )}
                      </button>
                    </div>

                    <p className="text-[12px] text-ink-muted text-center pt-0.5">
                      No referral required · 100% confidential &amp; secure
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: YOUR LIFE DOESN'T HAVE TO GO ON HOLD */}
      {/* 3 Image Feature Cards: Non-overlapping, clean alignment, no text badge */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-surface-primary border-b border-border-subtle">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="reveal text-left sm:text-center max-w-3xl sm:mx-auto">
            {/* Section Badge 3 */}
            <span className="text-eyebrow text-brand-deep uppercase block">
              Realistic Preparation
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.16] tracking-tight">
              Your Life Doesn’t Have to Go on Hold.
            </h2>
            <div className="mt-4 space-y-2 text-ink-secondary text-[15.5px] sm:text-[17px] leading-[1.65]">
              <p>
                Preparing for an important occasion shouldn&apos;t mean putting your life, social plans, or favorite foods aside.
              </p>
              <p>
                Your approach should work alongside your schedule, your relationships, your food, and the moments you&apos;re looking forward to.
              </p>
            </div>
          </div>

          {/* 3 Image Feature Cards with Staggered Scroll Reveal */}
          <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Card 01: Flexible, Not Restrictive */}
            <div className="reveal delay-100 bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ease-editorial hover:-translate-y-1">
              <div>
                {/* Top Image */}
                <div className="relative h-[210px] sm:h-[230px] w-full bg-surface-secondary overflow-hidden">
                  <img
                    src="/assets/f21.jpeg"
                    alt="Flexible, not restrictive South Asian meal prep and nutrition"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge */}
                <div className="relative px-6">
                  <div className="-mt-6 w-12 h-12 rounded-full bg-[#E5ECE1] border-[3px] border-white text-brand-deep flex items-center justify-center shadow-xs z-10 relative">
                    <Leaf size={20} className="text-brand-deep" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pt-4 pb-4">
                  <span className="text-[12.5px] font-600 text-ink-muted block mb-1">
                    01
                  </span>
                  <h3 className="font-display font-600 text-ink text-[21px] sm:text-[23px] leading-snug">
                    Flexible, Not Restrictive
                  </h3>
                  <p className="mt-2.5 text-[14.5px] text-ink-secondary leading-relaxed">
                    Enjoy the foods you love and make changes without an all-or-nothing approach.
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="px-6 pb-6 pt-2">
                <div className="w-8 h-[2.5px] bg-[#8F9E8B] rounded-full" />
              </div>
            </div>

            {/* Card 02: Personal, Not Prescribed */}
            <div className="reveal delay-200 bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ease-editorial hover:-translate-y-1">
              <div>
                {/* Top Image */}
                <div className="relative h-[210px] sm:h-[230px] w-full bg-surface-secondary overflow-hidden">
                  <img
                    src="/assets/f24.jpeg"
                    alt="Personalized lifestyle and nutrition planning"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge */}
                <div className="relative px-6">
                  <div className="-mt-6 w-12 h-12 rounded-full bg-[#FCEAE6] border-[3px] border-white text-[#B85D4D] flex items-center justify-center shadow-xs z-10 relative">
                    <User size={20} className="text-[#B85D4D]" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pt-4 pb-4">
                  <span className="text-[12.5px] font-600 text-ink-muted block mb-1">
                    02
                  </span>
                  <h3 className="font-display font-600 text-ink text-[21px] sm:text-[23px] leading-snug">
                    Personal, Not Prescribed
                  </h3>
                  <p className="mt-2.5 text-[14.5px] text-ink-secondary leading-relaxed">
                    Your recommendations are based on your goals, needs and lifestyle — not a one-size-fits-all plan.
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="px-6 pb-6 pt-2">
                <div className="w-8 h-[2.5px] bg-[#C47C70] rounded-full" />
              </div>
            </div>

            {/* Card 03: Sustainable, Not Short-Term */}
            <div className="reveal delay-300 bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ease-editorial hover:-translate-y-1">
              <div>
                {/* Top Image */}
                <div className="relative h-[210px] sm:h-[230px] w-full bg-surface-secondary overflow-hidden">
                  <img
                    src="/assets/f23.jpeg"
                    alt="Sustainable habits for celebration and beyond"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge */}
                <div className="relative px-6">
                  <div className="-mt-6 w-12 h-12 rounded-full bg-[#E5ECE1] border-[3px] border-white text-brand-deep flex items-center justify-center shadow-xs z-10 relative">
                    <Calendar size={20} className="text-brand-deep" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pt-4 pb-4">
                  <span className="text-[12.5px] font-600 text-ink-muted block mb-1">
                    03
                  </span>
                  <h3 className="font-display font-600 text-ink text-[21px] sm:text-[23px] leading-snug">
                    Sustainable, Not Short-Term
                  </h3>
                  <p className="mt-2.5 text-[14.5px] text-ink-secondary leading-relaxed">
                    Build habits that support you beyond the date on your calendar — so you can feel your best, now and later.
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="px-6 pb-6 pt-2">
                <div className="w-8 h-[2.5px] bg-[#5B735F] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: PROVEN OUTCOMES */}
      {/* Centered Section Header + Separate Left Image & Right Card */}
      {/* ============================================================== */}
      <section
        id="outcomes"
        className="py-20 lg:py-28 relative overflow-hidden bg-[#F5F1EB] border-b border-border-subtle scroll-mt-20"
      >
        {/* Serene soft mist cloud background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_35%_50%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0)_70%)]" />

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
          {/* Centered Section Header: Section Badge, Title & Description in Middle */}
          <div className="reveal text-left sm:text-center max-w-3xl sm:mx-auto mb-12 sm:mb-16">
            <span className="text-eyebrow text-brand-deep uppercase block">
              Proven Outcomes
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.16] tracking-tight">
              Real transformation built around real celebrations.
            </h2>

            <p className="mt-4 text-ink-secondary text-[15px] sm:text-[16px] leading-[1.68] max-w-xl sm:mx-auto">
              Every occasion is personal. We create evidence-informed nutrition strategies tailored to your celebrations, family foods, and timeline.
            </p>
          </div>

          {/* 2-Column Layout: Left Side Image Placeholder & Right Side Outcome Card */}
          {(() => {
            const currentCase = caseStudies[activeSlide];
            return (
              <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
                {/* Left Side: Image Placeholder for each card (changes simultaneously) */}
                <div className="reveal delay-100 h-full">
                  <div className="h-full min-h-[360px] sm:min-h-[440px] lg:min-h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-border-subtle shadow-[0_12px_36px_rgba(43,45,36,0.06)] bg-surface-white relative group">
                    <img
                      key={currentCase.id}
                      src={currentCase.image}
                      alt={currentCase.alt}
                      className="w-full h-full object-cover object-center transition-all duration-500 ease-editorial group-hover:scale-102"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Side: The Outcome Card */}
                <div className="reveal delay-150 h-full">
                  <div className="bg-surface-white rounded-2xl sm:rounded-3xl border border-border-subtle shadow-[0_12px_36px_rgba(43,45,36,0.06)] p-6 sm:p-8 lg:p-9 h-full flex flex-col justify-between transition-all duration-300">
                    <div>
                      {/* Top Header Row: MEMBER, DIAGNOSIS, and City Badge on Top Right */}
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[11px] sm:text-[11.5px] font-700 uppercase tracking-widest text-[#2B2D24]/70 block">
                              MEMBER
                            </span>
                            <span className="font-display font-600 text-ink text-[17px] sm:text-[19px] block mt-1 leading-snug">
                              {currentCase.member}
                            </span>
                          </div>

                          {/* City Name as Badge on Top Right */}
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] sm:text-[12px] font-600 bg-[#F4EFEA] text-brand-deep border border-border-subtle/80 shrink-0">
                            {currentCase.city}
                          </span>
                        </div>

                        <div className="mt-3">
                          <span className="text-[11px] sm:text-[11.5px] font-700 uppercase tracking-widest text-[#2B2D24]/70 block">
                            DIAGNOSIS
                          </span>
                          <span className="text-[14px] sm:text-[15px] font-500 text-ink block mt-1 leading-snug">
                            {currentCase.diagnosis}
                          </span>
                        </div>

                        {/* Thin divider line under Member / Diagnosis */}
                        <div className="h-[1px] bg-border-subtle/70 my-4" />

                        {/* GOALS */}
                        <div>
                          <span className="text-[11px] sm:text-[11.5px] font-700 uppercase tracking-widest text-[#2B2D24]/70 block mb-1">
                            GOALS
                          </span>
                          <p className="text-[13.5px] sm:text-[14px] text-ink-secondary leading-relaxed">
                            {currentCase.goal}
                          </p>
                        </div>
                      </div>

                      {/* Divider 1 */}
                      <div className="h-[1px] bg-border-subtle/70 my-4 sm:my-5" />

                      {/* THE STRATEGY (actions replaced with The Strategy & removed 'The Strategy:' in description) */}
                      <div>
                        <span className="text-[11px] sm:text-[11.5px] font-700 uppercase tracking-widest text-[#2B2D24]/70 block mb-1.5">
                          THE STRATEGY
                        </span>
                        <p className="text-[13.5px] sm:text-[14px] text-ink-secondary leading-relaxed">
                          {currentCase.strategy}
                        </p>
                      </div>

                      {/* Divider 2 */}
                      <div className="h-[1px] bg-border-subtle/70 my-4 sm:my-5" />

                      {/* RESULT (wins replaced with Result & removed 'Result:' in description) */}
                      <div>
                        <span className="text-[11px] sm:text-[11.5px] font-700 uppercase tracking-widest text-[#2B2D24]/70 block mb-1.5">
                          RESULT
                        </span>
                        <p className="text-[13.5px] sm:text-[14px] text-ink font-500 leading-relaxed">
                          {currentCase.result}
                        </p>
                      </div>

                      {/* Divider 3 */}
                      <div className="h-[1px] bg-border-subtle/70 my-4 sm:my-5" />
                    </div>

                    {/* Footer: Dietitian Shared by in Hierarchical Alignment */}
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={founderImg}
                        alt="Dr. Hena Nafis"
                        className="w-9 h-9 rounded-full object-cover object-top ring-1 ring-border-subtle shrink-0"
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-[13px] sm:text-[13.5px] font-600 text-ink leading-snug">
                          Shared by Dr. Hena Nafis
                        </span>
                        <span className="text-[11.5px] sm:text-[12px] text-ink-secondary mt-0.5">
                          Chief Nutritionist &amp; Registered Dietitian
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Carousel Controls (dots, progress bar, play/pause button) */}
          <div className="max-w-xl mx-auto mt-8 flex items-center justify-between gap-4 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSlide(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlide === i
                      ? 'w-6 h-2.5 bg-ink'
                      : 'w-2.5 h-2.5 bg-ink/25 hover:bg-ink/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Smooth Progress Bar */}
            <div className="flex-1 h-1.5 bg-ink/10 rounded-full overflow-hidden mx-2 sm:mx-4">
              <div
                className="h-full bg-ink/80 rounded-full transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={handleTogglePlay}
              className="w-8 h-8 rounded-full bg-surface-white border border-border-subtle/80 flex items-center justify-center text-ink hover:bg-surface-secondary transition-colors cursor-pointer shadow-2xs shrink-0"
              aria-label={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={13} className="fill-ink text-ink" />
              ) : (
                <Play size={13} className="fill-ink text-ink ml-0.5" />
              )}
            </button>
          </div>

          {/* Centered Book Your Consultation Button */}
          <div className="mt-10 text-center reveal">
            <button
              onClick={scrollToConsultation}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
            >
              <span>Book Your Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: WHY SA WELLNESS IS DIFFERENT */}
      {/* ============================================================== */}
      <section
        id="why-sa-wellness"
        className="py-20 lg:py-28 bg-surface-primary border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="reveal text-left sm:text-center max-w-3xl sm:mx-auto">
            {/* Section Badge 5 */}
            <span className="text-eyebrow text-brand-deep uppercase block">
              Why SA Wellness Is Different
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.16] tracking-tight">
              You Don’t Need a More Restrictive Plan. You Need a More Personal One.
            </h2>
            <p className="mt-3 sm:mt-4 font-display font-500 text-brand-deep text-[17px] sm:text-[20px]">
              Your Occasion Is the Reason to Start - Not a Reason to Rush.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="reveal delay-150 mt-14 max-w-4xl mx-auto bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-border-subtle text-[13.5px] font-600">
              <div className="p-4 sm:p-5 text-ink-secondary bg-surface-primary/60">
                The Usual Approach
              </div>
              <div className="p-4 sm:p-5 text-brand-deep bg-brand-soft/40 border-t sm:border-t-0 sm:border-l border-border-subtle">
                The SA Wellness Approach
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border-subtle">
              {comparisons.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 text-[14.5px]">
                  {/* Left Column (The Usual Approach) */}
                  <div className="p-4 sm:p-5 text-ink-secondary flex items-start gap-3 bg-surface-white">
                    <span className="w-5 h-5 rounded-full border border-border-subtle text-ink-secondary flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      ✕
                    </span>
                    <span>{row.usual}</span>
                  </div>

                  {/* Right Column (The SA Wellness Approach) */}
                  <div className="p-4 sm:p-5 text-ink font-500 flex items-start gap-3 bg-surface-secondary/30 sm:border-l border-border-subtle">
                    <span className="w-5 h-5 rounded-full bg-brand-deep text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      ✓
                    </span>
                    <span>{row.sa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Copy & Button */}
          <div className="reveal delay-200 mt-10 sm:mt-12 text-left sm:text-center max-w-2xl sm:mx-auto">
            <p className="text-[15.5px] sm:text-[16px] text-ink-secondary leading-[1.65]">
              At SA Wellness, we look beyond a meal plan to understand your health, lifestyle, food preferences, goals, and the occasion you&apos;re preparing for.
            </p>
            <div className="mt-7 flex sm:justify-center">
              <button
                onClick={scrollToConsultation}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
              >
                <span>Book Your Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: WHO’S BEHIND SA WELLNESS */}
      {/* ============================================================== */}
      <section
        id="about"
        className="py-20 lg:py-28 bg-surface-secondary/40 border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
            {/* Dr. Hena Nafis Image on Left Side - reduced radius on mobile */}
            <div className="relative reveal-scale">
              <div className="overflow-hidden rounded-xl sm:rounded-editorial border border-border-subtle shadow-md bg-surface-white">
                <img
                  src={founderImg}
                  alt="Dr. Hena Nafis, Founder, SA Wellness"
                  className="w-full h-[420px] sm:h-[500px] object-cover object-top"
                  loading="lazy"
                  width={900}
                  height={600}
                />
              </div>
            </div>

            {/* Founder Statement and Attribution */}
            <div className="reveal delay-150">
              {/* Section Badge 6 */}
              <span className="text-eyebrow text-brand-deep uppercase block mb-4">
                WHO’S BEHIND SA WELLNESS
              </span>

              <div className="pl-5 border-l-2 border-brand-primary">
                <blockquote className="font-display font-500 text-ink text-[20px] sm:text-[25px] lg:text-[27px] leading-[1.3] text-balance">
                  &ldquo;I built SA Wellness to help South Asians take care of their health without feeling like they have to give up the food, culture, and experiences that are part of their lives. I believe nutrition should fit into your life - not take it over.&rdquo;
                </blockquote>
              </div>

              <div className="mt-7">
                <div className="font-display font-600 text-ink text-[19px]">
                  Dr. Hena Nafis
                </div>
                <div className="text-[14px] text-ink-secondary mt-0.5 font-500">
                  Founder, SA Wellness
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: FAQ */}
      {/* ============================================================== */}
      <section
        id="faq"
        className="py-20 lg:py-28 bg-surface-primary border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[960px] px-6 lg:px-10">
          <div className="reveal text-left sm:text-center max-w-2xl sm:mx-auto mb-10 sm:mb-14">
            {/* Section Badge 7 */}
            <span className="text-eyebrow text-brand-deep uppercase block">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] leading-[1.16] tracking-tight">
              A Few Things You May Be Wondering
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="reveal bg-surface-white rounded-2xl border border-border-subtle overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-500 text-ink text-[16px] sm:text-[17px]">
                      {item.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full border border-border-subtle flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-45 bg-sand text-brand-deep' : 'text-ink-secondary'
                      }`}
                    >
                      <span className="text-[16px] font-light leading-none">+</span>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-ink-secondary text-[14.5px] leading-relaxed pt-1 border-t border-border-subtle/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Small line below FAQ & Book Your Consultation */}
          <div className="reveal delay-100 mt-12 text-center p-8 rounded-editorial bg-surface-secondary/40 border border-border-subtle">
            <p className="text-[16px] font-500 text-ink">
              Still have questions? Start with a conversation.
            </p>
            <div className="mt-4">
              <button
                onClick={scrollToConsultation}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
              >
                <span>Book Your Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
