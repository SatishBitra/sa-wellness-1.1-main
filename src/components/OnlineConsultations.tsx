import { Monitor, Lock, Calendar, User } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const consultationImage = 'https://images.pexels.com/photos/7690095/pexels-photo-7690095.jpeg?auto=compress&cs=tinysrgb&w=1100&h=900&fit=crop';

const badges = [
  { label: 'Online', icon: Monitor },
  { label: 'Private', icon: Lock },
  { label: 'Convenient', icon: Calendar },
  { label: 'Personalized', icon: User },
];

export default function OnlineConsultations() {
  const imageRef = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const textRef = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="py-20 lg:py-30">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center">
          <div ref={imageRef} className="reveal-scale order-2 lg:order-1">
            <div className="overflow-hidden rounded-editorial">
              <img
                src={consultationImage}
                alt="A woman having a private virtual consultation from her home"
                className="w-full h-[360px] sm:h-[460px] lg:h-[520px] object-cover"
                loading="lazy"
                width={1100}
                height={520}
              />
            </div>
          </div>

          <div ref={textRef} className="reveal order-1 lg:order-2">
            <span className="text-eyebrow text-brand-deep uppercase">Expert Nutrition Guidance</span>
            <h2 className="mt-4 font-display font-600 text-ink text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.15] tracking-tight text-balance">
              Expert Nutrition Guidance, Wherever You Are
            </h2>
            <p className="mt-5 text-ink-secondary text-[16px] leading-[1.65]">
              100% Online Consultations for South Asians Across the U.S.
            </p>
            <p className="mt-4 text-ink-secondary text-[16px] leading-[1.65]">
              No commute. No waiting room. No need to live near a clinic. Whether you're in New York, New Jersey, California, or anywhere in between — your consultation happens wherever you are most comfortable.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {badges.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl2 border border-border-subtle bg-surface-white"
                >
                  <Icon size={18} className="text-brand-deep shrink-0" />
                  <span className="text-[14px] font-500 text-ink">{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5"
            >
              Book a Consultation Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
