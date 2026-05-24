import { motion } from 'framer-motion';

const timelineData = [
  {
    role: 'AI Summer Resident',
    company: 'AI Summer Residency, IIMA Ventures',
    period: 'May 2026 – June 2026',
    bullets: [
      'Selected in the top 40 among 11,000+ applicants (< 0.36% acceptance rate) for the elite residency.',
      'Supported directly by OpenAI and Krishnamurthy Tandon School of AI to leverage cutting-edge infrastructure.',
      'Collaborated in high-agency technical teams to validate product-market fit and showcase system architecture.',
    ],
    theme: 'cyan',
  },
  {
    role: 'Contingent Member',
    company: 'Inter-IIT Tech Meet 14.0 (IIT Patna)',
    period: 'Sep 2025 – Dec 2025',
    bullets: [
      'Optimized PQC (Kyber, Dilithium) on bare-metal RISC-V IoT, presented at IIT Patna.',
      'Reduced ROM to 0.566 MB and RAM to 0.0023 MB.',
      'Improved latency and scalability, securing 8th rank among 23 competing IIT teams.',
      'Prototyped SoC using LiteX and validated via Verilator RTL simulation.',
    ],
    theme: 'purple',
  },
  {
    role: 'Undergraduate Student Researcher',
    company: 'Dept. of CSE, IITJ (Supervisor: Dr. Palash Das)',
    period: 'Aug 2025 – Present',
    bullets: [
      'Improved NVM Last Level Cache endurance and latency using write-bypassing in ChampSim simulator.',
      'Designed a non-inclusive LLC architecture to maximize effective capacity and efficiency.',
      'Optimized cache decision policies using an XGBoost model, achieving 75.17% accuracy.',
    ],
    theme: 'cyan',
  },
];

const dotColors = {
  cyan: 'bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]',
  purple: 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]',
};

const borderHover = {
  cyan: 'hover:border-cyan-400/25',
  purple: 'hover:border-purple-500/25',
};

export default function Timeline() {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex flex-col justify-start md:justify-center items-center py-20 md:py-32 px-6 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background glow orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full filter blur-[150px] bg-blue-500/5 -bottom-24 -left-24 pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-28 md:mb-36"
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.5em] uppercase text-purple-400 mb-8">
            [ 03 // TIMELINE ]
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
            JOURNEY & <span className="gradient-text">EXPERIENCE</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-transparent pointer-events-none" />

          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.role + item.company}
                  className={`relative flex w-full md:justify-between items-center ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Spacer block (only visible on desktop) */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Card Block */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8 }}
                      className={`glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-all duration-500 text-left ${borderHover[item.theme]}`}
                    >
                      <span className={`font-mono text-xs font-semibold tracking-wider block mb-2 ${item.theme === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
                        {item.period}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                        {item.role}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-8">
                        {item.company}
                      </p>
                      <ul className="space-y-4">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed tracking-wide flex items-start gap-2.5">
                            <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${item.theme === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Centered Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 flex items-start justify-center pt-8 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                      className={`w-3.5 h-3.5 rounded-full border-2 border-black ${dotColors[item.theme]}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
