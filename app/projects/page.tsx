// app/projects/page.tsx
'use client';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function ProjectsPage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projects = [
    // PATENTS
    {
      id: 1,
      title: "Electrochemical Lithium Extraction Method",
      category: "patent",
      period: "2023",
      status: "Patent Filed",
      description: "Novel electrochemical method for efficient lithium extraction from brine solutions for battery applications.",
      fullDescription: "Developed innovative electrochemical process for extracting lithium ions from concentrated brine solutions using selective ion exchange membranes and controlled potential cycling. This method offers higher purity and lower environmental impact compared to traditional evaporation ponds.",
      achievements: [
        "Independently authored patent application with detailed claims and drawings",
        "Achieved 85%+ lithium recovery efficiency in laboratory tests",
        "Reduced extraction time from weeks to hours compared to evaporation methods",
        "Minimized water consumption and chemical waste production",
        "Potential application in sustainable lithium mining operations"
      ],
      technologies: ["Electrochemistry", "Ion Exchange", "Materials Science", "Patent Writing", "AutoCAD"],
      links: {
        patent: "Pending",
        github: null
      },
      tags: ["Battery Materials", "Green Chemistry", "Lithium", "Innovation"],
      icon: "⚡",
      color: "yellow"
    },
    {
      id: 2,
      title: "Hydrometallurgical Nickel Recovery System",
      category: "patent",
      period: "2023",
      status: "Patent Filed",
      description: "Efficient hydrometallurgical process for recovering high-purity nickel from spent battery cathodes.",
      fullDescription: "Created a closed-loop hydrometallurgical system for extracting nickel from end-of-life lithium-ion batteries. The process combines selective leaching, precipitation, and purification steps to recover battery-grade nickel with minimal chemical waste.",
      achievements: [
        "Designed complete recycling workflow from battery disassembly to pure nickel salt",
        "Achieved 92% nickel recovery rate with 99.5% purity",
        "Reduced hazardous waste by 60% compared to pyrometallurgical methods",
        "Patent includes detailed process flow diagrams and optimization parameters",
        "Addresses critical supply chain challenges in EV battery manufacturing"
      ],
      technologies: ["Hydrometallurgy", "Chemical Engineering", "Recycling", "Process Design"],
      links: {
        patent: "Pending",
        github: null
      },
      tags: ["Circular Economy", "Battery Recycling", "Sustainability", "Nickel"],
      icon: "♻️",
      color: "green"
    },
    {
      id: 3,
      title: "Doped NCM811 Cathode Nanomaterials",
      category: "patent",
      period: "2023",
      status: "Patent Filed",
      description: "Advanced doping strategy for NCM811 cathode materials to enhance cycle life and thermal stability.",
      fullDescription: "Developed novel doping methodology using rare earth elements to improve the structural stability and electrochemical performance of nickel-rich NCM811 cathodes. The approach addresses critical degradation mechanisms in high-energy-density batteries.",
      achievements: [
        "Increased cycle life by 40% compared to undoped NCM811 at high voltages",
        "Improved thermal stability reducing risk of thermal runaway",
        "Maintained high specific capacity (>200 mAh/g) over 1000 cycles",
        "Scalable synthesis process compatible with industrial production",
        "Patent covers composition ranges, synthesis methods, and characterization"
      ],
      technologies: ["Nanomaterial Synthesis", "Doping", "Electrochemistry", "Materials Characterization"],
      links: {
        patent: "Pending",
        github: null
      },
      tags: ["Cathode Materials", "Battery Technology", "Nanomaterials", "NCM811"],
      icon: "🔋",
      color: "orange"
    },

    // RESEARCH PROJECTS
    {
      id: 4,
      title: "DFT Functional Benchmarking Suite",
      category: "research",
      period: "2024 – Present",
      status: "Active Development",
      description: "Automated Python framework for benchmarking exchange-correlation functionals in VASP simulations.",
      fullDescription: "Building a comprehensive toolkit to streamline DFT calculations and functional comparisons. The suite automates the tedious process of running multiple functionals and analyzing results, saving researchers hours of manual work.",
      achievements: [
        "Automated VASP input generation for GGA, meta-GGA, and hybrid functionals",
        "Created Python scripts for parsing OUTCAR files and extracting key properties",
        "Built visualization tools for comparing band structures, DOS, and energies",
        "Integrated with ASE (Atomic Simulation Environment) for structure manipulation",
        "Reduced functional benchmarking time from days to hours",
        "Shared with research group, adopted by 5+ fellow students"
      ],
      technologies: ["Python", "VASP", "ASE", "NumPy", "Matplotlib", "Bash Scripting"],
      links: {
        github: "https://github.com/alsei09/dft-benchmark",
        demo: null
      },
      tags: ["DFT", "Computational Chemistry", "Python", "HPC"],
      icon: "⚛️",
      color: "cyan"
    },
    {
      id: 5,
      title: "Waterloo Rocketry - Radiation Shielding Research",
      category: "research",
      period: "October 2021 – May 2022",
      status: "Completed",
      description: "Comparative analysis of radiation absorption between boron nitride nanotubes (BNNT) and Gadolinium Oxide for aerospace applications.",
      fullDescription: "As part of Waterloo Rocketry's payload team, I contributed to critical research on radiation shielding materials for high-altitude rocket payloads. The project involved analyzing the effectiveness of advanced nanomaterials in protecting sensitive electronics from cosmic radiation.",
      achievements: [
        "Researched and compared radiation absorption properties of BNNT vs. Gadolinium Oxide",
        "Authored comprehensive research report on adverse effects of TiO2 nanoparticles",
        "Collaborated with multidisciplinary team on payload design specifications",
        "Presented findings to team leads and contributed to material selection decisions"
      ],
      technologies: ["Materials Research", "Technical Writing", "Data Analysis", "Literature Review"],
      links: {
        github: null,
        demo: null
      },
      tags: ["Nanotechnology", "Aerospace", "Materials Science", "Radiation"],
      icon: "🚀",
      color: "blue"
    },

    // HACKATHONS
    {
      id: 6,
      title: "Toyota Innovation Challenge - Automated Quality Inspection",
      category: "hackathon",
      period: "May 2023",
      status: "Winner",
      description: "Deep learning computer vision system for automated sticker application quality control in automotive manufacturing.",
      fullDescription: "Developed an intelligent quality inspection system combining computer vision and robotics to automate the detection and application of body panel stickers. The solution addressed real manufacturing challenges in Toyota's production line.",
      achievements: [
        "Built image recognition model using TensorFlow and OpenCV for defect detection",
        "Integrated vision system with robotic arm for automated sticker placement",
        "Achieved 95%+ accuracy in identifying misaligned or missing stickers",
        "Presented solution to Toyota executives and engineering team",
        "Demonstrated potential 40% reduction in manual inspection time"
      ],
      technologies: ["Python", "TensorFlow", "OpenCV", "Computer Vision", "Robotics", "Machine Learning"],
      links: {
        github: "https://github.com/alsei09/toyota-qc",
        demo: null
      },
      tags: ["AI", "Computer Vision", "Automation", "Manufacturing"],
      icon: "🤖",
      color: "green"
    },

    // PERSONAL PROJECTS
    {
      id: 7,
      title: "Intelligent News Summarizer",
      category: "personal",
      period: "August 2022",
      status: "Completed",
      description: "NLP-powered application for automatic summarization and sentiment analysis of news articles.",
      fullDescription: "Personal project exploring natural language processing and text summarization. Built a Python application that scrapes news articles, generates concise summaries, and performs sentiment analysis to help users quickly understand news content.",
      achievements: [
        "Implemented TensorFlow-based NLP pipeline for text extraction and summarization",
        "Added sentiment analysis feature to classify article tone (positive/neutral/negative)",
        "Created intuitive GUI using Tkinter for easy user interaction",
        "Processed and summarized 500+ articles during testing phase",
        "Reduced reading time by ~70% while maintaining key information"
      ],
      technologies: ["Python", "TensorFlow", "NLP", "Tkinter", "BeautifulSoup", "NLTK"],
      links: {
        github: "https://github.com/alsei09/news-summarizer",
        demo: null
      },
      tags: ["NLP", "Machine Learning", "Python", "GUI"],
      icon: "📰",
      color: "purple"
    },
    {
      id: 8,
      title: "3D-Printed Sensor Calibration Station",
      category: "hardware",
      period: "Fall 2023",
      status: "In Use",
      description: "Custom-designed calibration hardware for medical pH sensors at FluidAI, reducing setup time by 66%.",
      fullDescription: "During my co-op at FluidAI, I identified inefficiencies in the sensor calibration workflow and designed a complete solution from scratch. Integrated mechanical design, electronics, and software automation.",
      achievements: [
        "Designed and 3D-printed custom fixtures for holding pH sensors during calibration",
        "Created PCB layout for Arduino-based sensor control and data acquisition",
        "Programmed automated calibration sequences reducing manual intervention",
        "Achieved 66% reduction in calibration time (from 30min to 10min per sensor)",
        "Designed modular system allowing quick adaptation to different sensor types",
        "Station now used daily by R&D team for 50+ sensors"
      ],
      technologies: ["SolidWorks", "3D Printing", "Arduino", "PCB Design", "Python", "Sensor Integration"],
      links: {
        github: null,
        demo: null
      },
      tags: ["Hardware", "IoT", "Automation", "Medical Devices"],
      icon: "🔧",
      color: "orange"
    }
  ];

  const categories = [
    { name: 'all', label: 'All Projects', icon: '📦', count: projects.length },
    { name: 'patent', label: 'Patents', icon: '📜', count: projects.filter(p => p.category === 'patent').length },
    { name: 'research', label: 'Research', icon: '🔬', count: projects.filter(p => p.category === 'research').length },
    { name: 'hackathon', label: 'Hackathons', icon: '🏆', count: projects.filter(p => p.category === 'hackathon').length },
    { name: 'personal', label: 'Personal', icon: '💡', count: projects.filter(p => p.category === 'personal').length },
    { name: 'hardware', label: 'Hardware', icon: '🔧', count: projects.filter(p => p.category === 'hardware').length }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const colorSchemes: Record<string, { dark: string; light: string }> = {
    blue: { dark: 'from-blue-900/30 to-cyan-900/30', light: 'from-blue-50 to-cyan-50' },
    green: { dark: 'from-green-900/30 to-emerald-900/30', light: 'from-green-50 to-emerald-50' },
    purple: { dark: 'from-purple-900/30 to-pink-900/30', light: 'from-purple-50 to-pink-50' },
    orange: { dark: 'from-orange-900/30 to-red-900/30', light: 'from-orange-50 to-red-50' },
    cyan: { dark: 'from-cyan-900/30 to-blue-900/30', light: 'from-cyan-50 to-blue-50' },
    yellow: { dark: 'from-yellow-900/30 to-orange-900/30', light: 'from-yellow-50 to-orange-50' }
  };

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
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-20">
          <div className="relative">
            <div className={`absolute -top-8 -left-8 w-20 h-20 border-t-2 border-l-2 ${
              isDark ? 'border-purple-500/40' : 'border-purple-400/60'
            }`} />

            <div className={`text-xs font-mono tracking-widest mb-6 ${
              isDark ? 'text-gray-600' : 'text-stone-400'
            }`}>
              COMPLETE PORTFOLIO • RESEARCH + INNOVATION
            </div>

            <h1 className={`text-6xl lg:text-7xl font-serif font-bold mb-6 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Projects &<br/>
              <span className="italic bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>

            <div className={`w-64 h-0.5 mb-8 ${
              isDark ? 'bg-gradient-to-r from-purple-500 to-transparent' : 'bg-gradient-to-r from-purple-400 to-transparent'
            }`} />

            <p className={`text-xl lg:text-2xl font-serif max-w-3xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              From patented innovations to research breakthroughs and hackathon victories—
              exploring the boundaries of nanotechnology, AI, and computational science.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-3 rounded-lg font-mono text-sm tracking-wide transition-all flex items-center gap-2 ${
                  selectedCategory === cat.name
                    ? (isDark ? 'bg-purple-600 text-white shadow-lg' : 'bg-purple-600 text-white shadow-xl')
                    : (isDark ? 'bg-slate-800/50 text-gray-400 hover:bg-slate-800' : 'bg-white text-stone-600 hover:bg-gray-50 border-2 border-stone-200')
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-xs ${selectedCategory === cat.name ? 'opacity-80' : 'opacity-60'}`}>
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "3", label: "Patents Filed", icon: "📜" },
              { number: "8", label: "Total Projects", icon: "🚀" },
              { number: "1", label: "Hackathon Wins", icon: "🏆" },
              { number: "1000+", label: "Compute Hours", icon: "💻" }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-xl text-center border-2 ${
                isDark ? 'bg-slate-900/50 border-purple-500/30' : 'bg-white border-purple-200'
              }`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-serif font-bold mb-1 ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-xs font-mono ${
                  isDark ? 'text-gray-500' : 'text-stone-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-20">
          <div className="space-y-12">
            {filteredProjects.map((project, index) => {
              const gradient = colorSchemes[project.color];
              return (
                <div
                  key={project.id}
                  className={`rounded-2xl border-2 overflow-hidden transition-all hover:scale-[1.01] ${
                    isDark ? 'bg-slate-900/50 border-purple-500/30' : 'bg-white border-purple-200 shadow-lg'
                  }`}
                >
                  <div className={`p-8 lg:p-12 bg-gradient-to-br ${isDark ? gradient.dark : gradient.light}`}>
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{project.icon}</span>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                              isDark ? 'bg-slate-800/50 text-purple-300' : 'bg-white/80 text-purple-700'
                            }`}>
                              {project.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                              project.status === 'Completed' || project.status === 'Winner'
                                ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700')
                                : project.status === 'Patent Filed'
                                ? (isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700')
                                : (isDark ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700')
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <h2 className={`text-3xl font-serif font-bold mb-2 ${
                            isDark ? 'text-white' : 'text-stone-900'
                          }`}>
                            {project.title}
                          </h2>
                          <p className={`text-sm font-mono ${
                            isDark ? 'text-gray-500' : 'text-stone-600'
                          }`}>
                            {project.period}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-lg mb-4 ${
                      isDark ? 'text-gray-300' : 'text-stone-800'
                    }`}>
                      {project.fullDescription}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h3 className={`text-sm font-mono tracking-wider mb-3 ${
                        isDark ? 'text-purple-400' : 'text-purple-700'
                      }`}>
                        KEY ACHIEVEMENTS
                      </h3>
                      <ul className="space-y-2">
                        {project.achievements.map((achievement, i) => (
                          <li key={i} className={`flex items-start gap-3 ${
                            isDark ? 'text-gray-400' : 'text-stone-700'
                          }`}>
                            <span className="text-purple-500 mt-1">•</span>
                            <span className="text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className={`text-sm font-mono tracking-wider mb-3 ${
                        isDark ? 'text-purple-400' : 'text-purple-700'
                      }`}>
                        TECHNOLOGIES
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className={`px-3 py-1 rounded text-sm ${
                            isDark ? 'bg-slate-800/70 text-gray-300' : 'bg-white/70 text-stone-700'
                          }`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-xs font-mono ${
                          isDark ? 'bg-slate-800/50 text-gray-500' : 'bg-stone-100 text-stone-600'
                        }`}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105 flex items-center gap-2 ${
                            isDark 
                              ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                              : 'bg-stone-900 hover:bg-stone-800 text-white'
                          }`}
                        >
                          <span>💻</span> View Code →
                        </a>
                      )}
                      {project.links.patent && (
                        <div className={`px-6 py-3 rounded-lg font-mono text-sm flex items-center gap-2 ${
                          isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                        }`}>
                          <span>📜</span> Patent: {project.links.patent}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className={`p-12 rounded-2xl text-center ${
            isDark 
              ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30' 
              : 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200'
          }`}>
            <h2 className={`text-3xl font-serif font-bold mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Have a Project Idea?
            </h2>
            <p className={`text-lg mb-8 ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              Always interested in collaborating on innovative nanotechnology, AI, or hardware projects.
            </p>
            <Link
              href="/experience"
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
