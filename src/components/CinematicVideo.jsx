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
  { text: 'Building Intelligent Systems',        progress: [0.08, 0.22], size: 'lg', theme: 'neon-cyan' },
  { text: 'Engineering Scalable Experiences',     progress: [0.26, 0.40], size: 'lg', theme: 'neon-magenta' },
  { text: 'Designing With Motion',                progress: [0.44, 0.58], size: 'lg', theme: 'neon-orange' },
  { text: 'AI • Backend • Distributed Systems',   progress: [0.62, 0.76], size: 'md', theme: 'neon-green' },
  { text: 'Crafted For The Future',               progress: [0.80, 0.95], size: 'lg', theme: 'neon-holo' },
];

const sizeClasses = {
  lg: 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight',
  md: 'text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight',
};

export default function CinematicVideo({ frames, videoWidth, videoHeight }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRefs = useRef([]);
  const currentFrameRef = useRef(0);

  // ── Draw a specific frame to the canvas ──
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas || !frames || !frames[index]) return;

    const ctx = canvas.getContext('2d');
    const frame = frames[index];

    // Cover-fit: fill the viewport while preserving aspect ratio
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const frameW = frame.width;
    const frameH = frame.height;

    const scale = Math.max(canvasW / frameW, canvasH / frameH);
    const drawW = frameW * scale;
    const drawH = frameH * scale;
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;

    ctx.drawImage(frame, offsetX, offsetY, drawW, drawH);
  }, [frames]);

  // ── Set canvas size to viewport ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      // Limit internal rendering size to max 1280px width for smooth GPU performance on all screens
      const MAX_RENDER_WIDTH = 1280;
      let w = window.innerWidth;
      let h = window.innerHeight;
      
      if (w > MAX_RENDER_WIDTH) {
        const scale = MAX_RENDER_WIDTH / w;
        w = MAX_RENDER_WIDTH;
        h = Math.round(h * scale);
      }

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
    if (frames && frames.length > 0) {
      drawFrame(0);
    }
  }, [frames, drawFrame]);

  // ── GSAP ScrollTrigger: scroll → frame index + text beats ──
  useEffect(() => {
    if (!frames || frames.length === 0) return;

    const totalFrames = frames.length;
    const scrollDistance = window.innerHeight * 8;

    containerRef.current.style.height = `${window.innerHeight + scrollDistance + window.innerHeight}px`;

    // Hero fade-out
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

    // Scroll indicator fade
    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: '5% top',
        end: '15% top',
        scrub: true,
      },
    });

    // Main scroll trigger — maps scroll to frame index
    const proxy = { frame: 0 };

    const tween = gsap.to(proxy, {
      frame: totalFrames - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: `${window.innerHeight}px top`,
        end: `+=${scrollDistance}`,
        scrub: 0.15,
        onUpdate: () => {
          const frameIndex = Math.round(proxy.frame);

          // Only redraw if frame actually changed
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }

          // Progress bar
          const progress = frameIndex / (totalFrames - 1);
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }

          // Text beats
          beats.forEach((beat, i) => {
            const el = textRefs.current[i];
            if (!el) return;

            const [start, end] = beat.progress;
            const fadeInEnd = start + (end - start) * 0.2;
            const visibleEnd = start + (end - start) * 0.75;
            const p = progress;

            if (p < start || p > end) {
              gsap.set(el, { opacity: 0, filter: 'blur(12px)', y: 30 });
            } else if (p >= start && p <= fadeInEnd) {
              const t = (p - start) / (fadeInEnd - start);
              const e = t * t * (3 - 2 * t);
              gsap.set(el, {
                opacity: e,
                filter: `blur(${12 * (1 - e)}px)`,
                y: 30 * (1 - e),
              });
            } else if (p > fadeInEnd && p <= visibleEnd) {
              gsap.set(el, { opacity: 1, filter: 'blur(0px)', y: 0 });
            } else if (p > visibleEnd && p <= end) {
              const t = (p - visibleEnd) / (end - visibleEnd);
              const e = t * t * (3 - 2 * t);
              gsap.set(el, {
                opacity: 1 - e,
                filter: `blur(${10 * e}px)`,
                y: -20 * e,
              });
            }
          });
        },
      },
    });

    // Show scroll indicator
    gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 1, delay: 0.5 });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [frames, drawFrame]);

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '100vh' }}>
      {/* ===== Fullscreen canvas (replaces <video>) ===== */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen"
        style={{ zIndex: 1 }}
      />

      {/* ===== Dark overlay ===== */}
      <div className="video-dim" />

      {/* ===== Vignette ===== */}
      <div className="vignette" />

      {/* ===== Edge glow ===== */}
      <div className="edge-glow" />

      {/* ===== Ambient orbs ===== */}
      <div
        className="ambient-glow visible"
        style={{
          width: '500px', height: '500px',
          background: 'rgba(0, 212, 255, 0.06)',
          top: '-10%', right: '-8%',
        }}
      />
      <div
        className="ambient-glow visible"
        style={{
          width: '400px', height: '400px',
          background: 'rgba(168, 85, 247, 0.05)',
          bottom: '-5%', left: '-5%',
        }}
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
            className="cine-text"
            style={{ opacity: 0 }}
          >
            <h2 className={`${sizeClasses[beat.size]} ${beat.theme}`}>{beat.text}</h2>
          </div>
        ))}
      </div>

      {/* ===== Progress bar ===== */}
      <div ref={progressBarRef} className="progress-bar w-full" />

      {/* ===== Nav ===== */}
      <div className="nav-minimal">
        <span className="font-display text-sm font-bold tracking-wider gradient-text">
          RM
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-ghost)' }}
        >
          Portfolio
        </span>
      </div>
    </div>
  );
}
