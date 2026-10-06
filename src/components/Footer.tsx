import { Instagram, Youtube, Facebook } from 'lucide-react';

const footerLinks = [
  { label: 'Health Concerns', href: '#health-concerns' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

// Clean vector icons for WhatsApp and TikTok to match Lucide styling
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 9a1.5 1.5 0 0 0 2 2l1.5-1.5a1 1 0 0 1 1.2-.2c1 .5 2 1.5 2.5 2.5.2.4.1.9-.2 1.2L15 15.5a2 2 0 0 1-2.5.5C10 14.5 8 12.5 7 10a2 2 0 0 1 .5-2.5L9 6.5a1 1 0 0 1 1.2-.2c.4.2.6.5.6.9v.3" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { name: 'TikTok', href: 'https://tiktok.com', icon: TikTokIcon },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'WhatsApp', href: 'https://whatsapp.com', icon: WhatsAppIcon },
];

export default function Footer() {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink py-10 sm:py-14">
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

            {/* Social Media Links with Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-white/10 hover:bg-brand-primary text-surface-white/80 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                    aria-label={`Visit our ${item.name} page`}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
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
                      className="text-surface-white/60 text-[14px] hover:text-surface-white transition-colors text-left cursor-pointer"
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
                className="text-surface-white/60 text-[14px] hover:text-surface-white transition-colors text-left cursor-pointer"
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
