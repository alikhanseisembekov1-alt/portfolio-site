// app/research/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function ResearchPage() {
  const [isDark, setIsDark] = useState(true);
  const [activeProject, setActiveProject] = useState<number>(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 0,
      title: "Quantum Intelligence",
      subtitle: "Density Functional Theory & Exchange-Correlation Functionals",
      description: "Investigating nanoscale materials through first-principles quantum mechanical calculations. My work focuses on understanding and optimizing exchange-correlation functionals for accurate predictions of electronic structure and material properties.",
      longDescription: "Density Functional Theory (DFT) has become the workhorse of computational materials science, but its accuracy hinges critically on the choice of exchange-correlation functional. My research explores the performance of various functional families—from simple LDA to sophisticated hybrid and meta-GGA approaches—across different material systems.",
      keyFindings: [
        "Benchmarked GGA, meta-GGA, and hybrid functionals for transition metal oxides",
        "Achieved sub-0.1 eV accuracy in adsorption energy predictions",
        "Developed automated workflow for functional selection based on material class"
      ],
      methods: [
        "VASP (Vienna Ab initio Simulation Package)",
        "Quantum ESPRESSO for PAW calculations",
        "Python automation with ASE (Atomic Simulation Environment)",
        "Graham & Cedar clusters (Compute Canada)"
      ],
      publications: [
        {
          title: "Exchange-Correlation Functional Performance in Transition Metal Catalysis",
          journal: "Computational Materials Science",
          year: "2025",
          status: "In Review"
        }
      ],
      skills: ["DFT", "Quantum Mechanics", "Python", "VASP", "HPC", "Materials Science"],
      github: "https://github.com/yourusername/dft-functionals",
      color: "purple"
    },
    {
      id: 1,
      title: "Molecular Choreography",
      subtitle: "Classical Molecular Dynamics & Statistical Mechanics",
      description: "Simulating the time evolution of atomic systems to understand thermodynamic properties, phase transitions, and structural transformations at the nanoscale. Focus on LAMMPS-based large-scale simulations.",
      longDescription: "Molecular dynamics simulations bridge the gap between quantum mechanics and macroscopic material properties. Using classical force fields, I investigate atomic-scale motion over nanosecond to microsecond timescales, accessing phenomena inaccessible to DFT due to computational cost.",
      keyFindings: [
        "Characterized phase transitions in metallic nanoparticles using RDF analysis",
        "Simulated 10M+ timestep trajectories for thermal conductivity calculations",
        "Identified critical nucleation mechanisms in crystal growth"
      ],
      methods: [
        "LAMMPS (Large-scale Atomic/Molecular Massively Parallel Simulator)",
        "EAM and ReaxFF potential parameterization",
        "Radial distribution function (RDF) analysis",
        "Temperature and pressure coupling algorithms (NPT, NVT ensembles)"
      ],
      publications: [
        {
          title: "Thermal Transport in Low-Dimensional Nanomaterials",
          journal: "Journal of Applied Physics",
          year: "2026",
          status: "In Preparation"
        }
      ],
      skills: ["Molecular Dynamics", "LAMMPS", "Statistical Mechanics", "Shell Scripting", "Data Analysis"],
      github: "https://github.com/yourusername/md-simulations",
      color: "cyan"
    },
    {
      id: 2,
      title: "Synthetic Cognition",
      subtitle: "Neuromorphic Computing & Emergent Intelligence",
      description: "Exploring the intersection of nanotechnology and cognitive science. Investigating how brain-inspired architectures and nanoscale materials can enable next-generation computing paradigms beyond von Neumann architectures.",
      longDescription: "True artificial intelligence may require not just better algorithms, but fundamentally different hardware. My interdisciplinary research explores how neuromorphic computing—inspired by biological neural networks—combined with novel nanomaterials could unlock emergent cognitive capabilities.",
      keyFindings: [
        "Surveyed memristor technologies for synaptic weight implementation",
        "Analyzed cellular automata as models for self-organizing computation",
        "Proposed nanoscale architectures for energy-efficient inference"
      ],
      methods: [
        "Literature synthesis across neuroscience, AI, and materials science",
        "Computational modeling of neural network dynamics",
        "K-means clustering and Mahalanobis distance for pattern recognition",
        "Agent-based modeling of emergent behavior"
      ],
      publications: [
        {
          title: "From Transistors to Neurons: A Nanotechnology Perspective on Cognition",
          journal: "Nature Nanotechnology",
          year: "2026",
          status: "Conceptual Stage"
        }
      ],
      skills: ["Machine Learning", "Neuromorphic Computing", "Systems Thinking", "Interdisciplinary Research"],
      github: "https://github.com/yourusername/neuromorphic-nano",
      color: "pink"
    }
  ];

  const colorSchemes = {
    purple: {
      dark: { gradient: 'from-purple-900/30 to-pink-900/30', border: 'border-purple-500/40', accent: 'text-purple-400', bg: 'bg-purple-900/50', btnBg: 'bg-purple-600 hover:bg-purple-500' },
      light: { gradient: 'from-purple-50 to-pink-50', border: 'border-purple-300', accent: 'text-purple-700', bg: 'bg-purple-100', btnBg: 'bg-purple-600 hover:bg-purple-700' }
    },
    cyan: {
      dark: { gradient: 'from-cyan-900/30 to-blue-900/30', border: 'border-cyan-500/40', accent: 'text-cyan-400', bg: 'bg-cyan-900/50', btnBg: 'bg-cyan-600 hover:bg-cyan-500' },
      light: { gradient: 'from-cyan-50 to-blue-50', border: 'border-cyan-300', accent: 'text-cyan-700', bg: 'bg-cyan-100', btnBg: 'bg-cyan-600 hover:bg-cyan-700' }
    },
    pink: {
      dark: { gradient: 'from-pink-900/30 to-rose-900/30', border: 'border-pink-500/40', accent: 'text-pink-400', bg: 'bg-pink-900/50', btnBg: 'bg-pink-600 hover:bg-pink-500' },
      light: { gradient: 'from-pink-50 to-rose-50', border: 'border-pink-300', accent: 'text-pink-700', bg: 'bg-pink-100', btnBg: 'bg-pink-600 hover:bg-pink-700' }
    }
  };

  const currentProject = projects[activeProject];
  const scheme = colorSchemes[currentProject.color as keyof typeof colorSchemes];
  const colors = isDark ? scheme.dark : scheme.light;

  return (
    <main className={`min-h-screen transition-colors duration-700 ${
      isDark ? 'bg-slate-950' : 'bg-stone-50'
    }`}>
      
      <Navigation isDark={isDark} />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        {[15, 35, 55, 75, 95].map((pos, i) => (
          <div
            key={`v-${i}`}
            className={`absolute h-full w-px ${isDark ? 'bg-purple-500/20' : 'bg-stone-300'}`}
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-6 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isDark 
            ? 'bg-slate-800 text-yellow-300 shadow-lg shadow-purple-900/50' 
            : 'bg-white text-slate-800 shadow-xl border-2 border-gray-200'
        }`}
      >
        <span className="text-2xl">{isDark ? '☀️' : '🌙'}</span>
      </button>

      <div className="relative pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className="relative">
            <div className={`absolute -top-8 -left-8 w-20 h-20 border-t-2 border-l-2 ${
              isDark ? 'border-purple-500/40' : 'border-purple-400/60'
            }`} />

            <div className={`text-xs font-mono tracking-widest mb-6 ${
              isDark ? 'text-gray-600' : 'text-stone-400'
            }`}>
              RESEARCH PORTFOLIO • UNIVERSITY OF WATERLOO
            </div>

            <h1 className={`text-6xl lg:text-7xl font-serif font-bold mb-6 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Research<br/>
              <span className="italic bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <div className={`w-64 h-0.5 mb-8 ${
              isDark ? 'bg-gradient-to-r from-purple-500 to-transparent' : 'bg-gradient-to-r from-purple-400 to-transparent'
            }`} />

            <p className={`text-xl lg:text-2xl font-serif max-w-3xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              From quantum mechanics to emergent intelligence, exploring how matter and information 
              converge at the nanoscale.
            </p>
          </div>
        </section>

        {/* Project Navigation */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <div className="flex flex-wrap gap-4">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`px-8 py-4 rounded-xl font-mono text-sm transition-all duration-500 border-2 ${
                  activeProject === index
                    ? (isDark 
                        ? `${colorSchemes[project.color as keyof typeof colorSchemes].dark.bg} ${colorSchemes[project.color as keyof typeof colorSchemes].dark.border} ${colorSchemes[project.color as keyof typeof colorSchemes].dark.accent} shadow-lg` 
                        : `${colorSchemes[project.color as keyof typeof colorSchemes].light.bg} ${colorSchemes[project.color as keyof typeof colorSchemes].light.border} ${colorSchemes[project.color as keyof typeof colorSchemes].light.accent}`)
                    : (isDark
                        ? 'bg-slate-800/30 border-slate-700 text-gray-400 hover:border-purple-500/50'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-purple-400')
                }`}
              >
                <div className="font-bold mb-1">{String(index + 1).padStart(2, '0')}</div>
                <div className="text-xs tracking-wider">{project.title}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Project Detail */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className={`p-12 rounded-3xl border-2 transition-all duration-500 bg-gradient-to-br ${colors.gradient} ${colors.border}`}>
            
            {/* Project Header */}
            <div className="mb-12">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className={`text-5xl font-serif font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    {currentProject.title}
                  </h2>
                  <p className={`text-2xl font-serif italic ${colors.accent}`}>
                    {currentProject.subtitle}
                  </p>
                </div>
                <div className={`text-8xl font-serif font-bold opacity-20 ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  {String(activeProject + 1).padStart(2, '0')}
                </div>
              </div>

              <div className={`w-full h-px my-8 ${
                isDark ? 'bg-white/20' : 'bg-stone-300'
              }`} />

              <p className={`text-xl leading-relaxed mb-6 ${
                isDark ? 'text-gray-200' : 'text-stone-800'
              }`}>
                {currentProject.description}
              </p>

              <p className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-stone-700'
              }`}>
                {currentProject.longDescription}
              </p>
            </div>

            {/* Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Left Column */}
              <div className="space-y-8">
                
                {/* Key Findings */}
                <div>
                  <h3 className={`text-2xl font-serif font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    Key Findings
                  </h3>
                  <ul className="space-y-3">
                    {currentProject.keyFindings.map((finding, i) => (
                      <li key={i} className={`flex items-start gap-3 ${
                        isDark ? 'text-gray-300' : 'text-stone-700'
                      }`}>
                        <span className={colors.accent}>→</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Methods & Tools */}
                <div>
                  <h3 className={`text-2xl font-serif font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    Methods & Tools
                  </h3>
                  <ul className="space-y-3">
                    {currentProject.methods.map((method, i) => (
                      <li key={i} className={`flex items-start gap-3 ${
                        isDark ? 'text-gray-300' : 'text-stone-700'
                      }`}>
                        <span className={colors.accent}>•</span>
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h3 className={`text-2xl font-serif font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.skills.map((skill) => (
                      <span key={skill} className={`px-4 py-2 rounded-full text-sm font-mono ${
                        isDark ? 'bg-slate-800/50 text-gray-300' : 'bg-white/50 text-stone-700'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                
                {/* Publications */}
                <div>
                  <h3 className={`text-2xl font-serif font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    Publications
                  </h3>
                  <div className="space-y-4">
                    {currentProject.publications.map((pub, i) => (
                      <div key={i} className={`p-4 rounded-lg ${
                        isDark ? 'bg-slate-800/50' : 'bg-white/50'
                      }`}>
                        <h4 className={`font-serif font-bold mb-2 ${
                          isDark ? 'text-white' : 'text-stone-900'
                        }`}>
                          {pub.title}
                        </h4>
                        <p className={`text-sm font-mono mb-1 ${
                          isDark ? 'text-gray-400' : 'text-stone-600'
                        }`}>
                          {pub.journal} • {pub.year}
                        </p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${
                          pub.status === 'Published' 
                            ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700')
                            : (isDark ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700')
                        }`}>
                          {pub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-4">
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-4 rounded-lg font-mono text-sm text-center transition-all duration-300 hover:scale-105 ${
                      colors.btnBg
                    } text-white shadow-lg`}
                  >
                    View on GitHub →
                  </a>
                  <Link
                    href="/blog"
                    className={`px-6 py-4 rounded-lg font-mono text-sm text-center transition-all duration-300 border-2 ${
                      isDark 
                        ? 'border-white/30 text-gray-300 hover:bg-white/10' 
                        : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Related Blog Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Stats */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "1000+", label: "Compute Hours" },
              { number: "10M+", label: "MD Timesteps" },
              { number: "3", label: "Active Projects" },
              { number: "2", label: "Publications" }
            ].map((stat, i) => (
              <div key={i} className={`p-8 rounded-2xl text-center border-2 ${
                isDark 
                  ? 'bg-slate-900/50 border-purple-500/30' 
                  : 'bg-white border-purple-200'
              }`}>
                <div className={`text-4xl font-serif font-bold mb-2 ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-mono tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-stone-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className={`p-12 rounded-2xl text-center ${
            isDark 
              ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30' 
              : 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200'
          }`}>
            <h2 className={`text-3xl font-serif font-bold mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Interested in Collaboration?
            </h2>
            <p className={`text-lg mb-8 ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              Looking for computational expertise in DFT, molecular dynamics, or neuromorphic computing?
            </p>
            <Link
              href="/#contact"
              className={`inline-block px-12 py-5 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl'
              }`}
            >
              Get in Touch →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
