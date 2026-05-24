import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar visibility/bg based on scroll depth
      if (window.scrollY > window.innerHeight * 0.5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is in view
      const sections = navLinks.map(link => {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // We check if the section is occupying the top/middle of the viewport
          return {
            id,
            top: rect.top,
            height: rect.height,
            visibleAmount: Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
          };
        }
        return null;
      }).filter(Boolean);

      // Find section with maximum visible screen space
      if (sections.length > 0) {
        const mostVisible = sections.reduce((max, current) => 
          current.visibleAmount > max.visibleAmount ? current : max
        , sections[0]);
        
        if (mostVisible.visibleAmount > 0) {
          setActiveSection(mostVisible.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-8 px-10 py-5 rounded-2xl border transition-all duration-700 ${
        scrolled
          ? 'bg-black/50 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]'
          : 'bg-transparent border-transparent opacity-0 pointer-events-none'
      }`}
    >
      {/* Logo */}
      <span
        className="font-display text-base font-bold tracking-wider gradient-text cursor-pointer px-3 py-2 select-none"
        onClick={(e) => handleClick(e, '#home')}
      >
        RM
      </span>

      {/* Divider */}
      <div className="w-px h-5 bg-white/10" />

      {/* Nav links */}
      <div className="flex items-center gap-4">
        {navLinks.map((link) => {
          const id = link.href.substring(1);
          const isActive = activeSection === id;
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`relative font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-white bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]'
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
