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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[80] flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500 w-[90%] max-w-[650px] ${
        scrolled
          ? 'bg-black/40 backdrop-blur-md border-white/10 shadow-[0_8px_32px_rgba(0,240,255,0.05)]'
          : 'bg-transparent border-transparent opacity-0 pointer-events-none'
      }`}
    >
      <span className="font-display text-sm font-bold tracking-wider gradient-text cursor-pointer" onClick={(e) => handleClick(e, '#home')}>
        RM
      </span>
      <div className="flex items-center gap-1 sm:gap-4 md:gap-6">
        {navLinks.map((link) => {
          const id = link.href.substring(1);
          const isActive = activeSection === id;
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 relative px-2 py-1 ${
                isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
