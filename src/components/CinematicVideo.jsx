import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * Cinematic text beats that appear at specific scroll progress points.
 * progress: [fadeInStart, fadeOutEnd] as 0–1 fraction of total scroll.
 */
const beats = [
  { text: 'Building Intelligent Systems', progress: [0.08, 0.22], size: 'lg', theme: 'holo', className:"font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase" },
  { text: 'Engineering Scalable Experiences', progress: [0.26, 0.40], size: 'lg', theme: 'holo', className:"font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase" },
  { text: 'Designing Robust Architecture', progress: [0.44, 0.58], size: 'lg', theme: 'holo', className:"font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase" },
  { text: 'Backend Development', progress: [0.62, 0.74], size: 'lg', theme: 'holo', className:"font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase" },
  { text: 'Artificial Intelligence', progress: [0.74, 0.84], size: 'lg', theme: 'holo', className:"font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase" },
  { text: 'For The Future', progress: [0.84, 0.92], size: 'lg', theme: 'holo', className:"font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase" },
  {
    // Final cinematic beat — matches About.jsx heading alignment
    text: (
      <div className="max-w-5xl w-[90vw] md:w-full text-left mx-auto px-6">
        <p className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-cyan-400 mb-8">
          [ 01 // Philosophy ]
        </p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase">
          Engineering with{' '}
          <span className="gradient-text font-display">Agency</span>
        </h2>
      </div>
    ),
    progress: [0.93, 1.0],
    size: 'lg',
    theme: '',
  },
];

const sizeClasses = {
  lg: 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight',
  md: 'text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight',
};

export default function CinematicVideo({ canvasRef, frames, videoWidth, videoHeight }) {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRefs = useRef([]);
  const currentFrameRef = useRef(0);
  // Tracks the canvas filter state so transition timeline overrides it cleanly
  const inTransitionRef = useRef(false);

  // ── Draw a specific frame to the canvas ──
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas || !frames || !frames[index]) return;

    const ctx = canvas.getContext('2d');
    const frame = frames[index];
    const cW = canvas.width;
    const cH = canvas.height;
    const fW = frame.width;
    const fH = frame.height;
    const scale = Math.max(cW / fW, cH / fH);
    const drawW = fW * scale;
    const drawH = fH * scale;
    ctx.drawImage(frame, (cW - drawW) / 2, (cH - drawH) / 2, drawW, drawH);
  }, [frames]);

  // ── Set canvas size to viewport ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const MAX_W = 1280;
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (w > MAX_W) { const s = MAX_W / w; w = MAX_W; h = Math.round(h * s); }
      canvas.width = w;
      canvas.height = h;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // ── Draw first frame immediately ──
  useEffect(() => {
    if (frames && frames.length > 0) drawFrame(0);
  }, [frames, drawFrame]);

  // ── GSAP ScrollTrigger: scroll → frames + beats + transitions ──
  useEffect(() => {
    if (!frames || frames.length === 0) return;

    const totalFrames = frames.length;
    const vh = window.innerHeight;
    // 8 viewports of scroll distance for the video scrub
    const scrollDistance = vh * 8;
    // 1 extra viewport pinned after scrub ends (for the outro transition)
    const outroDuration = vh;

    containerRef.current.style.height = `${vh + scrollDistance + outroDuration}px`;

    // ── Hero fade-out ──
    gsap.to(heroRef.current, {
      opacity: 0,
      y: -60,
      filter: 'blur(10px)',
      ease: 'power2.in',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=50%',
        scrub: true,
      },
    });

    // ── Scroll indicator hide ──
    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: '5% top',
        end: '15% top',
        scrub: true,
      },
    });

    // ── Main scroll → frame index ──
    // We use a proxy object because GSAP needs to tween a numeric value.
    // Easing is applied manually inside onUpdate so we can use a JS function.
    const proxy = { rawProgress: 0 };

    const scrubST = ScrollTrigger.create({
      trigger: containerRef.current,
      start: `${vh}px top`,
      end: `+=${scrollDistance}`,
      scrub: 0.15,
      onUpdate: (self) => {
        const rawP = self.progress; // 0 → 1 linear scroll progress

        // Ease-out the final 20% so the video slows into its last frame
        let easedP;
        if (rawP < 0.8) {
          easedP = rawP; // linear for first 80%
        } else {
          const t = (rawP - 0.8) / 0.2;          // 0 → 1 in the final 20%
          easedP = 0.8 + 0.2 * (1 - (1 - t) * (1 - t)); // ease-out quad
        }

        const frameIndex = Math.min(Math.round(easedP * (totalFrames - 1)), totalFrames - 1);

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // Progress bar follows eased progress
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${easedP})`;
        }

        // ── Atmospheric dim/blur on the canvas near the end ──
        // Only do this while we're NOT in the outro transition
        if (!inTransitionRef.current) {
          if (rawP > 0.78) {
            const t = (rawP - 0.78) / 0.22;
            const q = t * t; // quadratic ease-in
            const blur = 10 * q;
            const bri = 1 - 0.35 * q;
            gsap.set(canvasRef.current, {
              filter: `blur(${blur}px) brightness(${bri})`,
            });
            const dimEl = document.querySelector('.video-dim');
            if (dimEl) gsap.set(dimEl, { opacity: 0.4 + 0.3 * q });
          } else {
            gsap.set(canvasRef.current, { filter: 'blur(0px) brightness(1)' });
            const dimEl = document.querySelector('.video-dim');
            if (dimEl) gsap.set(dimEl, { opacity: 0.4 });
          }
        }

        // ── Text beats ──
        beats.forEach((beat, i) => {
          const el = textRefs.current[i];
          if (!el) return;

          const [start, end] = beat.progress;
          const isLast = i === beats.length - 1;
          const fadeInEnd = start + (end - start) * 0.25;
          const holdEnd = start + (end - start) * 0.75;
          const p = easedP;

          if (p < start) {
            gsap.set(el, { opacity: 0, filter: 'blur(12px)', y: 30 });
          } else if (p <= fadeInEnd) {
            const t = (p - start) / (fadeInEnd - start);
            const e = t * t * (3 - 2 * t); // smoothstep
            gsap.set(el, { opacity: e, filter: `blur(${12 * (1 - e)}px)`, y: 30 * (1 - e) });
          } else if (p <= holdEnd) {
            gsap.set(el, { opacity: 1, filter: 'blur(0px)', y: 0 });
          } else if (p <= end) {
            if (isLast) {
              // Keep the final title visible — it will be faded by the outro timeline
              gsap.set(el, { opacity: 1, filter: 'blur(0px)', y: 0 });
            } else {
              const t = (p - holdEnd) / (end - holdEnd);
              const e = t * t * (3 - 2 * t);
              gsap.set(el, { opacity: 1 - e, filter: `blur(${10 * e}px)`, y: -20 * e });
            }
          } else {
            // Past end
            if (isLast) {
              gsap.set(el, { opacity: 1, filter: 'blur(0px)', y: 0 });
            } else {
              gsap.set(el, { opacity: 0, filter: 'blur(12px)', y: 30 });
            }
          }
        });
      },
    });

    // ── Outro transition timeline ──
    // Runs during the extra `outroDuration` viewport after the scrub ends.
    // This is where the video fades out and the portfolio content fades in.
    const outroStart = vh + scrollDistance; // absolute scroll position where outro begins

    const outroTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: () => `${outroStart}px top`,
        end: () => `${outroStart + outroDuration}px top`,
        scrub: true,
        onEnter: () => { inTransitionRef.current = true; },
        onLeaveBack: () => { inTransitionRef.current = false; },
      },
    });

    // 1. Fade + blur the canvas away
    outroTL.fromTo(
      canvasRef.current,
      { opacity: 1, filter: 'blur(10px) brightness(0.65)' }, // matches the end-state from scrub
      { opacity: 0, filter: 'blur(30px) brightness(0.1)', ease: 'power2.inOut' },
      0
    );

    // 2. Fade + slide up the text layer (including the "Engineering with Agency" title)
    outroTL.to(
      '.text-layer',
      { opacity: 0, y: -80, filter: 'blur(16px)', ease: 'power2.inOut' },
      0
    );

    // 3. Hide the dim overlay
    outroTL.to(
      '.video-dim',
      { opacity: 0, ease: 'power1.inOut' },
      0
    );

    // 4. Fade out progress bar
    if (progressBarRef.current) {
      outroTL.to(progressBarRef.current, { opacity: 0, ease: 'power1.inOut' }, 0);
    }

    // 5. Fade in the portfolio content — starts at 20% of the outro and finishes at 90%
    outroTL.fromTo(
      '#portfolio-content',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: 'power2.out' },
      0.2 // begin at 20% of the outro timeline
    );

    // Show scroll indicator initially
    gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 1, delay: 0.5 });

    return () => {
      scrubST.kill();
      outroTL.scrollTrigger?.kill();
      outroTL.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [frames, drawFrame]);

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '100vh' }}>

      {/* ===== Dark overlay ===== */}
      <div className="video-dim" />

      {/* ===== Vignette ===== */}
      <div className="vignette" />

      {/* ===== Edge glow ===== */}
      <div className="edge-glow" />

      {/* ===== Ambient orbs ===== */}
      <div
        className="ambient-glow visible"
        style={{ width: '500px', height: '500px', background: 'rgba(0,212,255,0.06)', top: '-10%', right: '-8%' }}
      />
      <div
        className="ambient-glow visible"
        style={{ width: '400px', height: '400px', background: 'rgba(168,85,247,0.05)', bottom: '-5%', left: '-5%' }}
      />

      {/* ===== HERO SCREEN ===== */}
      <div
        ref={heroRef}
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 15, pointerEvents: 'none' }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          <p
            className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
            style={{ color: 'var(--neon-blue)' }}
          >
            {'<'} Welcome to my universe {'/>'}
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            <span className="gradient-text">RAGHAV</span>
          </h1>
          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mt-1"
            style={{ color: '#ffffff', textShadow: '0 0 40px rgba(255,255,255,0.15)' }}
          >
            MAHESHWARI
          </h1>
          <p
            className="mt-8 text-sm md:text-base tracking-wider"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Software Engineer{' '}
            <span style={{ color: 'var(--neon-blue)' }}>•</span>{' '}
            AI Builder{' '}
            <span style={{ color: 'var(--neon-purple)' }}>•</span>{' '}
            Systems Thinker
          </p>
        </motion.div>
      </div>

      {/* ===== Scroll indicator ===== */}
      <div ref={scrollIndicatorRef} className="scroll-indicator" style={{ opacity: 0 }}>
        <span className="label">Scroll to explore</span>
        <div className="scroll-pill">
          <div className="scroll-dot" />
        </div>
      </div>

      {/* ===== Cinematic text overlay ===== */}
      <div className="text-layer">
        {beats.map((beat, i) => (
          <div
            key={i}
            ref={(el) => (textRefs.current[i] = el)}
            className="cine-text w-full flex justify-center"
            style={{ opacity: 0 }}
          >
            {typeof beat.text === 'string' ? (
              <h2 className={`${sizeClasses[beat.size]} ${beat.theme}`}>{beat.text}</h2>
            ) : (
              beat.text
            )}
          </div>
        ))}
      </div>

      {/* ===== Progress bar ===== */}
      <div ref={progressBarRef} className="progress-bar w-full" />

      {/* ===== Nav ===== */}
      <div className="nav-minimal">
        <span className="font-display text-sm font-bold tracking-wider gradient-text">RM</span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-ghost)' }}>
          Portfolio
        </span>
      </div>
    </div>
  );
}
