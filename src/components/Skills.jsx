import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Frontend Development',
    glow: 'cyan',
    skills: [
      { name: 'React.js', level: '90%' },
      { name: 'Next.js', level: '85%' },
      { name: 'HTML5 / CSS3', level: '95%' },
      { name: 'TailwindCSS', level: '95%' },
      { name: 'Framer Motion', level: '85%' },
      { name: 'GSAP Animations', level: '80%' },
    ],
  },
  {
    title: 'Backend Systems',
    glow: 'purple',
    skills: [
      { name: 'Node.js', level: '90%' },
      { name: 'Express.js', level: '90%' },
      { name: 'C++ Systems', level: '85%' },
      { name: 'Python Systems', level: '85%' },
      { name: 'REST APIs & Architecture', level: '95%' },
      { name: 'WebSockets & Real-time', level: '80%' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    glow: 'emerald',
    skills: [
      { name: 'PyTorch / ML Libs', level: '75%' },
      { name: 'XGBoost Modeling', level: '80%' },
      { name: 'NumPy & Pandas', level: '85%' },
      { name: 'Data Visualization', level: '80%' },
      { name: 'OpenCV Computer Vision', level: '70%' },
      { name: 'LLM & AI Integrations', level: '85%' },
    ],
  },
  {
    title: 'Databases & Performance',
    glow: 'orange',
    skills: [
      { name: 'MongoDB NoSQL', level: '90%' },
      { name: 'PostgreSQL Relational', level: '80%' },
      { name: 'Redis Caching', level: '75%' },
      { name: 'Database Indexing', level: '80%' },
      { name: 'NVM Cache Simulation', level: '85%' },
    ],
  },
  {
    title: 'Cloud & System DevOps',
    glow: 'blue',
    skills: [
      { name: 'Docker Containers', level: '85%' },
      { name: 'Git Version Control', level: '95%' },
      { name: 'Linux Systems', level: '90%' },
      { name: 'LiteX SoC Architectures', level: '75%' },
      { name: 'Verilator RTL Simulation', level: '75%' },
      { name: 'Bare-Metal Deployment', level: '80%' },
    ],
  },
];

const glows = {
  cyan: 'group-hover:border-cyan-500/20 shadow-cyan-500/2',
  purple: 'group-hover:border-purple-500/20 shadow-purple-500/2',
  emerald: 'group-hover:border-emerald-500/20 shadow-emerald-500/2',
  orange: 'group-hover:border-amber-500/20 shadow-amber-500/2',
  blue: 'group-hover:border-blue-500/20 shadow-blue-500/2',
};

const barColors = {
  cyan: 'from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]',
  purple: 'from-purple-400 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
  emerald: 'from-emerald-400 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
  orange: 'from-amber-400 to-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
  blue: 'from-blue-400 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-24 px-6 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full filter blur-[150px] bg-purple-500/5 top-1/4 -left-12 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 md:mb-32"
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-cyan-400 mb-4">
            [ 03 // Abilities ]
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
            TECHNICAL <span className="gradient-text">ENGINEERING</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className={`group glass-panel p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent hover:bg-white/[0.03] transition-all duration-500 shadow-2xl ${glows[cat.glow]}`}
            >
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-8 border-b border-white/5 pb-4 group-hover:text-cyan-300 transition-colors duration-300">
                {cat.title}
              </h3>
              
              <div className="space-y-6">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm font-mono tracking-wide">
                      <span className="text-gray-300 font-light group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 font-semibold">{skill.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r rounded-full ${barColors[cat.glow]}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
