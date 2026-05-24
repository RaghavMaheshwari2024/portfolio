import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-start md:justify-center items-center py-20 md:py-32 px-6 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background glow orb */}
      <div className="absolute w-[400px] h-[400px] rounded-full filter blur-[120px] bg-purple-500/5 -top-12 -left-12 pointer-events-none" />
      
      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-left mb-24 md:mb-32"
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-cyan-400 mb-4">
            [ 01 // Philosophy ]
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-white">
            ENGINEERING WITH <span className="gradient-text">AGENCY</span>
          </h2>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2 glass-panel p-8 sm:p-10 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-500"
          >
            {/* Glowing corner indicator */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide font-light">
              I am a software engineer and AI researcher focused on building high-performance distributed systems, optimizing machine memory hierarchies, and leveraging generative AI to solve complex problems. 
            </p>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed tracking-wide font-light mt-8">
              My philosophy centers on extreme agency, meticulous systems-level engineering, and developing architectures that scale gracefully under pressure. I believe in understanding the stack from the silicon layer up to user interfaces, and designing clean code that solves real-world challenges.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between h-full hover:border-purple-500/20 transition-all duration-500 min-h-[220px]"
          >
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-2">IIT Jodhpur</h4>
              <p className="font-mono text-xs text-purple-400 uppercase tracking-widest mb-4">
                Computer Science Eng.
              </p>
            </div>
            <div className="border-t border-white/5 pt-4 mt-4">
              <span className="font-mono text-[10px] text-gray-500 uppercase block tracking-widest mb-1">
                Currently Exploring
              </span>
              <p className="text-sm text-gray-300 font-light tracking-wide leading-relaxed">
                Non-Volatile Memory (NVM) Cache Endurance, PQC Cryptography, and Bare-Metal RISC-V SoC Architecture.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
