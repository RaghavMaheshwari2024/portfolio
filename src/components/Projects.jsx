import { motion } from 'framer-motion';

const projects = [
  {
    title: 'AVID: Anonymous Voting with Integrity and Discretion',
    period: 'Nov 2025 – Dec 2025',
    tags: ['JavaScript', 'MongoDB', 'Docker', 'Node.js', 'Express.js', 'Cryptography'],
    description:
      'A cryptographically secure, decentralized-ready voting platform leveraging ECC digital signatures, RSA ballot privacy, and Byzantine-resilient consensus tolerating up to 33% malicious nodes.',
    image: '/assets/architecture.png',
    driveLink:
      'https://drive.google.com/file/d/1lTLCzdgLpSbOaD9bUc5LKvjANx7CIg3x/view?usp=drive_link',
    themeColor: 'from-purple-500/20 to-pink-500/5',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    accentColor: 'purple',
  },
  {
    title: 'Crypto Wallet Risk Prediction',
    period: 'Jan 2026 – Present',
    tags: ['Blockchain', 'JavaScript', 'Python', 'NumPy', 'Pandas', 'MongoDB', 'Node.js', 'React.js'],
    description:
      'Dual-service Web3 application with a Node.js Gateway and Python Risk Engine, integrating GoldRush and Tatum APIs for multi-chain wallet analysis and ML-ready risk scoring.',
    image: '/assets/crypto.png',
    driveLink:
      'https://drive.google.com/file/d/1EwoSvrX6t09vaPO7TvaHWnyuIxr20Vk9/view?usp=sharing',
    website: 'https://crypto-wallet-frontend.onrender.com',
    themeColor: 'from-green-500/20 to-emerald-500/5',
    glowColor: 'rgba(57, 255, 20, 0.15)',
    accentColor: 'green',
  },
  {
    title: 'Social Network Analysis & Influence Mapping',
    period: 'Sep 2025 – Nov 2025',
    tags: ['C++', 'Network Theory', 'Graph Theory', 'ICM', 'Adjacency Matrix'],
    description:
      'Analyzed the SNAP Facebook dataset across 4,039 nodes using Betweenness Centrality and the Independent Cascade Model to map influence propagation bridges.',
    image: '/assets/social.png',

    themeColor: 'from-cyan-500/20 to-blue-500/5',
    glowColor: 'rgba(0, 240, 255, 0.15)',
    accentColor: 'cyan',
  },
];

const accentClasses = {
  cyan: {
    dot: 'bg-cyan-400',
    border: 'hover:border-cyan-400/25',
    tag: 'text-cyan-300',
    link: 'hover:text-cyan-300',
  },
  purple: {
    dot: 'bg-purple-500',
    border: 'hover:border-purple-400/25',
    tag: 'text-purple-300',
    link: 'hover:text-purple-300',
  },
  green: {
    dot: 'bg-green-400',
    border: 'hover:border-green-400/25',
    tag: 'text-green-300',
    link: 'hover:text-green-300',
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full flex flex-col items-center py-20 md:py-32 px-6 overflow-hidden"
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
          className="text-center mb-[150vh]"
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-purple-400 mb-8">
            [ 02 // Work ]
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
            FEATURED <span className="gradient-text">PROJECTS</span>
          </h2>
        </motion.div>

        {/* Project rows — stacked vertically */}
        <div className="flex flex-col gap-24 md:gap-32 mt-40">
          {projects.map((project, idx) => {
            const accent = accentClasses[project.accentColor] || accentClasses.cyan;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`group rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent ${accent.border} hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 relative overflow-hidden`}
                style={{
                  boxShadow: `0 10px 30px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)`,
                }}
              >
                {/* Backglow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 20%, ${project.glowColor} 0%, transparent 60%)`,
                  }}
                />

                {/* Content */}
                <div className="flex flex-col items-center p-8 sm:p-10">
                  {/* Header row */}
                  <div className="flex items-center justify-between w-full mb-6">
                    <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                      {project.period}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${accent.dot} animate-pulse`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300 text-center">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed tracking-wide mb-8 font-light max-w-3xl text-center">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-16">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Architecture diagram image */}
                  {project.image && project.driveLink && (
                    <a
                      href={project.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block mb-10 max-w-3xl w-full rounded-xl overflow-hidden border border-white/5 hover:border-cyan-400/30 transition-all duration-300 group/img"
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} architecture diagram`}
                        className="w-full max-h-80 object-contain bg-white/[0.02] group-hover/img:scale-[1.01] transition-transform duration-500"
                      />
                      <div className="px-4 py-2.5 bg-white/[0.03] flex items-center justify-center gap-2 font-mono text-[10px] text-gray-400 group-hover/img:text-cyan-300 transition-colors">
                        <svg
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                        </svg>
                        View Full Diagram on Google Drive
                      </div>
                    </a>
                  )}
                  {project.image && !project.driveLink && (
                    <div className="block mb-10 max-w-3xl w-full rounded-xl overflow-hidden border border-white/5">
                      <img
                        src={project.image}
                        alt={`${project.title} diagram`}
                        className="w-full max-h-80 object-contain bg-white/[0.02]"
                      />
                    </div>
                  )}

                  {/* Action links */}
                  <div className="flex justify-center gap-4 border-t border-white/5 pt-8 w-full">
                    {project.driveLink && (
                      <a
                        href={project.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 font-mono text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 px-5 py-2.5 rounded-lg transition-all duration-300 group/btn"
                      >
                        <svg
                          className="w-4 h-4 fill-current text-gray-400 group-hover/btn:text-white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                        </svg>
                        Drive
                      </a>
                    )}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 font-mono text-xs text-black bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 px-5 py-2.5 rounded-lg font-bold shadow-[0_4px_14px_rgba(6,182,212,0.3)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.5)] transition-all duration-300"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                        </svg>
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
