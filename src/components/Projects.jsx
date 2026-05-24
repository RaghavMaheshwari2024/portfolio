import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Social Network Analysis & Influence Mapping',
    period: 'Sep 2025 – Nov 2025',
    tags: ['C++', 'Network Theory', 'Graph Theory', 'ICM', 'Adjacency Matrix'],
    description: 'Analyzed the SNAP Facebook dataset for network influence utilizing graph centrality metrics and stochastic models. Calculated Betweenness Centrality using adjacency matrices to map information bridges across 4,039 nodes and simulated flow propagation utilizing the Independent Cascade Model (ICM).',
    github: 'https://github.com/RaghavMaheshwari2024',
    demo: '#',
    themeColor: 'from-cyan-500/20 to-blue-500/5',
    glowColor: 'rgba(0, 240, 255, 0.15)',
  },
  {
    title: 'AVID: Anonymous Voting with Integrity and Discretion',
    period: 'Nov 2025 - Dec 2025',
    tags: ['JavaScript', 'MongoDB', 'Docker', 'Node.js', 'Express.js', 'Cryptography'],
    description: 'Developed a cryptographically secure, decentralized-ready online voting platform designed to run over insecure networks. Leveraged Elliptic Curve Cryptography (ECC) for digital signatures, RSA for ballot privacy, and engineered a Byzantine-resilient voting architecture that tolerates up to 33% malicious nodes.',
    github: 'https://github.com/RaghavMaheshwari2024',
    demo: '#',
    themeColor: 'from-purple-500/20 to-pink-500/5',
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
  {
    title: 'Crypto Wallet Risk Prediction',
    period: 'Jan 2026 – Present',
    tags: ['Blockchain', 'JavaScript', 'Python', 'NumPy', 'Pandas', 'MongoDB', 'Node.js', 'React.js'],
    description: 'Designed and built a dual-service Web3 application comprised of a high-throughput Node.js Gateway and a Python Risk Evaluation Engine. Integrated GoldRush and Tatum API layers to ingest multi-chain transaction data, supporting unified wallet parsing with future scalability for ML-based risk scores.',
    github: 'https://github.com/RaghavMaheshwari2024',
    demo: '#',
    themeColor: 'from-green-500/20 to-emerald-500/5',
    glowColor: 'rgba(57, 255, 20, 0.15)',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex flex-col justify-start md:justify-center items-center py-20 md:py-32 px-6 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Glow orb */}
      <div className="absolute w-[500px] h-[500px] rounded-full filter blur-[150px] bg-cyan-500/5 bottom-12 -right-12 pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 md:mb-32"
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-purple-400 mb-4">
            [ 02 // Work ]
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
            FEATURED <span className="gradient-text">PROJECTS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-cyan-500/5 transition-all duration-500 relative overflow-hidden"
              style={{
                boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.03)`
              }}
            >
              {/* Backglow element on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl -z-10"
                style={{
                  background: `radial-gradient(circle at 50% 20%, ${project.glowColor} 0%, transparent 60%)`
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                    {project.period}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed tracking-wide mb-6 font-light">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 border-t border-white/5 pt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 font-mono text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 py-2.5 rounded-lg transition-all duration-300 group/btn"
                  >
                    {/* GitHub SVG */}
                    <svg className="w-4 h-4 fill-current text-gray-400 group-hover/btn:text-white" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                  {project.demo && project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 font-mono text-xs text-black bg-cyan-400 hover:bg-cyan-300 py-2.5 rounded-lg font-bold shadow-[0_4px_14px_rgba(6,182,212,0.3)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.5)] transition-all duration-300"
                    >
                      Demo
                      <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
