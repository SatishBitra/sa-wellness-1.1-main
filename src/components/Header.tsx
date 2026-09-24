import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

const navLinks = [
  { label: 'Health Concerns', href: '#health-concerns' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-editorial ${
        scrolled
          ? 'bg-surface-primary/85 backdrop-blur-md border-b border-border-subtle'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[68px]' : 'h-[80px]'}`}>
          <a href="#top" className="flex items-center gap-2.5 group" aria-label="SA Wellness home">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-deep text-surface-white font-display font-600 text-[15px] tracking-tight transition-transform group-hover:scale-105">
              SA
            </span>
            <span className="font-display font-600 text-ink text-[17px] tracking-tight">
              Wellness
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[14px] font-450 text-ink-secondary hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#consultation')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-deep text-surface-white text-[14px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5"
            >
              Book a Consultation
            </button>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink hover:bg-surface-secondary transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-surface-primary border-b border-border-subtle">
          <nav className="mx-auto max-w-[1280px] px-6 py-4 flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 px-2 text-[15px] font-450 text-ink-secondary hover:text-ink hover:bg-surface-secondary rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#consultation')}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500"
            >
              Book a Consultation
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
