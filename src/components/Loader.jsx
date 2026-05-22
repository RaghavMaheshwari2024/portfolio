import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ progress = 0 }) {
  const pct = Math.min(Math.floor(progress), 100);
  const visible = pct < 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="load-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="load-ring mb-10" />

          <motion.span
            className="font-display text-2xl font-bold tracking-wider gradient-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            RM
          </motion.span>

          <motion.span
            className="font-mono text-[10px] tracking-[0.35em] uppercase mt-2"
            style={{ color: 'var(--text-ghost)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Preparing Cinematic Experience
          </motion.span>

          {/* Real progress bar */}
          <div
            className="mt-8 w-48 h-px rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-150 ease-linear"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))',
              }}
            />
          </div>

          <span
            className="font-mono text-[10px] mt-3 tracking-[0.2em]"
            style={{ color: 'var(--text-ghost)' }}
          >
            {pct}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
