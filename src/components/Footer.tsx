const footerLinks = [
  { label: 'Health Concerns', href: '#health-concerns' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink py-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center">
              <img
                src="/assets/fIBPHwmodHYgCtu5q2ugcSwxTb0.png"
                alt="SA Wellness"
                className="h-12 sm:h-14 lg:h-[54px] w-auto object-contain brightness-0 invert opacity-95"
                width={232}
                height={120}
              />
            </div>
            <p className="mt-4 text-surface-white/60 text-[14px] leading-relaxed">
              Personalized nutrition and lifestyle care for South Asians in the United States. 100% online consultations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div>
              <h4 className="font-display font-500 text-surface-white/80 text-[13px] uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleClick(link.href)}
                      className="text-surface-white/60 text-[14px] hover:text-surface-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-500 text-surface-white/80 text-[13px] uppercase tracking-wider mb-4">
                Get Started
              </h4>
              <button
                onClick={() => handleClick('#consultation')}
                className="text-surface-white/60 text-[14px] hover:text-surface-white transition-colors text-left"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-white/10 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-surface-white/40 text-[13px]">
            © {new Date().getFullYear()} SA Wellness. All rights reserved.
          </p>
          <p className="text-surface-white/40 text-[13px] max-w-xl sm:text-right leading-relaxed">
            SA Wellness provides nutrition and lifestyle guidance. This is not a substitute for medical diagnosis or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
