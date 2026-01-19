'use client';
import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Link from 'next/link';

// Custom typewriter hook (UNCHANGED)
const useTypewriter = (text, speed = 50, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(prev => prev + text.charAt(index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, hasStarted]);

  return { displayText, isComplete };
};

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const tagline = "Where Atoms Meet Neurons";
  const intro = "investigate the convergence of nanotechnology, neuroscience, and artificial intelligence. My research explores how intelligence emerges from physical substrates—whether biological neurons or nanoscale transistors.";
  
  const { displayText: typedTagline, isComplete: taglineComplete } = useTypewriter(tagline, 60);
  const { displayText: typedIntro, isComplete: introComplete } = useTypewriter(intro, 30, 1500);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const highlights = [
    { number: "3", label: "Patents Filed", metric: "Innovation" },
    { number: "1000+", label: "HPC Hours", metric: "Computational Research" },
    { number: "4", label: "Co-op Terms", metric: "Industry Experience" },
    { number: "66%", label: "Time Saved", metric: "Process Optimization" }
  ];

  const skillCategories = [
    { 
      name: "Computational Physics", 
      skills: ["Python", "VASP", "LAMMPS", "MATLAB", "C++"],
      description: "Quantum simulations & molecular dynamics"
    },
    { 
      name: "Experimental Methods", 
      skills: ["SEM", "XRD", "AFM", "Raman", "Ellipsometry"],
      description: "Nanomaterial characterization"
    },
    { 
      name: "Engineering Design", 
      skills: ["SolidWorks", "COMSOL", "PCB Design", "3D Printing"],
      description: "Hardware prototyping & CAD"
    },
    { 
      name: "AI & Machine Learning", 
      skills: ["TensorFlow", "Computer Vision", "NLP", "Data Analysis"],
      description: "Intelligent systems development"
    }
  ];

  const currentFocus = [
    {
      title: "DFT Functional Benchmarking",
      description: "Optimizing exchange-correlation functionals for transition metal oxide systems",
      status: "Active Research",
      institution: "University of Waterloo"
    },
    {
      title: "Optical System Testing",
      description: "High-precision projector characterization and thermal management analysis",
      status: "Co-op Position",
      institution: "Christie Digital"
    },
    {
      title: "Ability Draft Analytics",
      description: "ML-powered platform for strategic optimization in competitive gaming",
      status: "Side Project",
      institution: "Personal"
    }
  ];

  const projects = [
    {
      id: 0,
      number: "01",
      title: "Computational Materials Science",
      subtitle: "DFT & Molecular Dynamics Simulations",
      description: "Investigating nanoscale materials through first-principles quantum calculations and classical MD simulations. Optimizing exchange-correlation functionals and analyzing thermodynamic properties using VASP and LAMMPS on HPC clusters.",
      tags: ['DFT', 'LAMMPS', 'Python', 'VASP', 'HPC'],
      color: 'purple',
      metrics: [
        "1000+ cluster hours on Compute Canada",
        "10M+ timestep molecular dynamics trajectories",
        "Automated functional benchmarking workflows",
        "Sub-0.1 eV accuracy in adsorption energy predictions"
      ],
      link: "/projects#computational"
    },
    {
      id: 1,
      number: "02",
      title: "Battery Materials Innovation",
      subtitle: "Electrochemistry & Nanomaterial Synthesis",
      description: "Developing novel methods for lithium extraction, nickel recovery, and cathode material optimization. Three independent patents on hydrometallurgical processes and NCM811 doping strategies for next-generation energy storage.",
      tags: ['Electrochemistry', 'Patents', 'NCM811', 'Sustainability'],
      color: 'yellow',
      metrics: [
        "3 patent applications filed independently",
        "92% nickel recovery efficiency achieved",
        "40% cycle life improvement in doped cathodes",
        "Eco-friendly pouch cell prototype development"
      ],
      link: "/projects#battery"
    },
    {
      id: 2,
      number: "03",
      title: "Optical Systems & Medical Devices",
      subtitle: "Engineering Design & Process Optimization",
      description: "Hands-on engineering across optical testing, medical sensor development, and hardware automation. From characterizing high-precision projectors at Christie Digital to designing calibration stations that cut process time by 66%.",
      tags: ['Optics', 'Medical Devices', 'Automation', 'Hardware'],
      color: 'blue',
      metrics: [
        "66% reduction in sensor calibration time",
        "50+ medical sensors validated to ISO 13485",
        "Optical testing of MEMS-based projection systems",
        "Automated testing workflows with Git-based APIs"
      ],
      link: "/projects#engineering"
    }
  ];

  return (
    <main className={`min-h-screen overflow-x-hidden transition-colors duration-700 ${
      isDark ? 'bg-slate-950' : 'bg-stone-50'
    }`}>
      
      <Navigation isDark={isDark} />

      {/* Background animations */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${10 + i * 11}%`,
                background: isDark 
                  ? `radial-gradient(circle, rgba(139,92,246,${0.4 - i * 0.04}) 0%, transparent 70%)`
                  : `radial-gradient(circle, rgba(99,102,241,${0.3 - i * 0.03}) 0%, transparent 70%)`,
                filter: 'blur(2px)',
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 opacity-10">
          {[10, 25, 45, 65, 85].map((pos, i) => (
            <div
              key={`v-${i}`}
              className={`absolute h-full w-px ${isDark ? 'bg-purple-500/20' : 'bg-stone-300'}`}
              style={{ left: `${pos}%` }}
            />
          ))}
        </div>

        <div 
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.01}deg)` }}
        >
          <svg className="absolute top-1/4 right-1/4" width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke={isDark ? "#8b5cf6" : "#6366f1"} strokeWidth="2" />
            <circle cx="100" cy="100" r="60" fill="none" stroke={isDark ? "#ec4899" : "#db2777"} strokeWidth="1" />
            <circle cx="100" cy="100" r="40" fill="none" stroke={isDark ? "#06b6d4" : "#0891b2"} strokeWidth="1" />
          </svg>

          {[...Array(20)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-purple-500/20' : 'bg-stone-400/30'}`}
              style={{
                left: `${(i * 7 + 15) % 90}%`,
                top: `${(i * 11 + 10) % 80}%`,
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-6 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isDark 
            ? 'bg-slate-800 text-yellow-300 shadow-lg shadow-purple-900/50' 
            : 'bg-white text-slate-800 shadow-xl border-2 border-gray-200'
        }`}
        aria-label="Toggle theme"
      >
        <span className="text-2xl">{isDark ? '☀️' : '🌙'}</span>
      </button>

      <div className="relative">
        
        {/* IMPROVED Hero Section - Better Proportions */}
        <section ref={heroRef} id="home" className="min-h-screen relative pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-8">
            
            <div className="flex items-start gap-12">
              
              {/* LEFT SIDE - Text Content (Takes more space) */}
              <div className="flex-1 relative max-w-3xl">
                
                <div className={`absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 ${
                  isDark ? 'border-purple-500/40' : 'border-purple-400/60'
                }`}>
                  <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${
                    isDark ? 'bg-purple-500' : 'bg-purple-400'
                  } animate-pulse`} />
                </div>

                <div className={`text-xs font-mono tracking-widest mb-8 ${
                  isDark ? 'text-gray-600' : 'text-stone-400'
                }`}
                style={{ transform: `translateX(${scrollY * 0.1}px)` }}>
                  WATERLOO, ONTARIO • VOL. I • 2026
                </div>
                
                <div className={`w-32 h-px mb-8 ${
                  isDark ? 'bg-gradient-to-r from-purple-500 to-transparent' : 'bg-gradient-to-r from-purple-400 to-transparent'
                }`} />

                <h1 
                  className={`font-serif font-bold mb-8 ${isDark ? 'text-white' : 'text-stone-900'}`}
                  style={{ 
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    lineHeight: '1',
                    letterSpacing: '-0.02em',
                    transform: `translateX(${-scrollY * 0.05}px)`
                  }}
                >
                  Alikhan<br/>
                  <span className="italic" style={{
                    backgroundImage: isDark 
                      ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                      : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Seisembekov
                  </span>
                </h1>

                <div className={`w-64 h-0.5 mb-10 relative ${
                  isDark ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-transparent' 
                         : 'bg-gradient-to-r from-purple-400 via-pink-400 to-transparent'
                }`}>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                    isDark ? 'bg-purple-500' : 'bg-purple-400'
                  }`} />
                  <div className={`absolute left-20 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                    isDark ? 'bg-pink-500' : 'bg-pink-400'
                  }`} />
                </div>

                <p className={`text-2xl font-serif italic mb-10 min-h-[3rem] ${
                  isDark ? 'text-purple-300' : 'text-purple-900'
                }`}
                style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
                  {typedTagline}
                  {!taglineComplete && <span className="animate-pulse ml-1">|</span>}
                </p>

                <div className="relative mb-12">
                  <div className={`absolute -left-8 top-1 text-5xl font-serif ${
                    isDark ? 'text-purple-500/30' : 'text-purple-400/40'
                  }`}>
                    "
                  </div>
                  
                  <p className={`text-lg font-serif leading-relaxed min-h-[8rem] ${
                    isDark ? 'text-gray-300' : 'text-stone-700'
                  }`}>
                    <span className={`text-5xl float-left mr-3 mt-1 leading-none font-bold ${
                      isDark ? 'text-purple-500' : 'text-stone-800'
                    }`}>I</span>
                    {typedIntro}
                    {!introComplete && <span className="animate-pulse ml-1">|</span>}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/projects"
                    className={`px-10 py-4 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                      isDark 
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl'
                    }`}
                  >
                    <span className="relative z-10">View Projects →</span>
                    <div className={`absolute inset-0 ${isDark ? 'bg-purple-500' : 'bg-purple-700'} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
                  </Link>
                  <Link
                    href="/experience"
                    className={`px-10 py-4 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-slate-800/50 hover:bg-slate-800 text-purple-300 border border-purple-500/30' 
                        : 'bg-white hover:bg-gray-50 text-purple-700 border-2 border-purple-200'
                    }`}
                  >
                    Download CV
                  </Link>
                </div>

                <div className={`absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 ${
                  isDark ? 'border-purple-500/40' : 'border-purple-400/60'
                }`} />
              </div>

              {/* RIGHT SIDE - Smaller Photo */}
              <div className="hidden lg:block flex-shrink-0" style={{ width: '320px' }}>
                <div 
                  className="relative w-full sticky top-32"
                  style={{ 
                    transform: `translateY(${scrollY * 0.1}px)`,
                  }}
                >
                  <div className={`relative rounded-xl overflow-hidden aspect-[3/4] ${
                    isDark ? 'border-2 border-purple-500/30' : 'border-2 border-stone-300'
                  }`}
                  style={{
                    boxShadow: isDark 
                      ? '0 20px 60px rgba(168,85,247,0.3)' 
                      : '0 20px 60px rgba(0,0,0,0.12)'
                  }}>
                    
                    {/* Corner brackets - smaller */}
                    <div className={`absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 z-10 ${
                      isDark ? 'border-purple-400' : 'border-stone-400'
                    }`} />
                    <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 z-10 ${
                      isDark ? 'border-purple-400' : 'border-stone-400'
                    }`} />
                    <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 z-10 ${
                      isDark ? 'border-purple-400' : 'border-stone-400'
                    }`} />
                    <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 z-10 ${
                      isDark ? 'border-purple-400' : 'border-stone-400'
                    }`} />
                    
                    {/* Photo */}
                    <img 
                      src="/images/alikhan-headshot.jpg" 
                      alt="Alikhan Seisembekov"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: 'center 25%',
                        filter: isDark 
                          ? 'brightness(1) contrast(1.05)' 
                          : 'brightness(1.05) contrast(1.05)'
                      }}
                    />
                    
                    {/* Subtle overlay */}
                    <div className={`absolute inset-0 pointer-events-none ${
                      isDark 
                        ? 'bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5' 
                        : 'bg-gradient-to-br from-purple-100/10 via-transparent to-pink-100/10'
                    }`} />
                  </div>

                  {/* Smaller floating accents */}
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${
                    isDark ? 'bg-purple-600/20 blur-2xl' : 'bg-purple-300/30 blur-2xl'
                  }`} />
                  <div className={`absolute -top-6 -left-6 w-20 h-20 rounded-full ${
                    isDark ? 'bg-pink-600/15 blur-2xl' : 'bg-pink-300/25 blur-2xl'
                  }`} />
                </div>
              </div>

            </div>
          </div>

          {!hasScrolled && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
              <div className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${
                isDark ? 'border-purple-500/50' : 'border-purple-400'
              }`}>
                <div className={`w-1 h-2 rounded-full ${
                  isDark ? 'bg-purple-500' : 'bg-purple-600'
                }`} />
              </div>
            </div>
          )}
        </section>

        {/* Highlights Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((item, i) => (
                <div 
                  key={i} 
                  className={`p-8 rounded-xl text-center border-2 transition-all duration-500 hover:scale-105 ${
                    isDark ? 'bg-slate-900/50 border-purple-500/30' : 'bg-white border-purple-200 shadow-lg'
                  }`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                  }}
                >
                  <div className={`text-5xl font-serif font-bold mb-2 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {item.number}
                  </div>
                  <div className={`text-sm font-mono mb-1 ${
                    isDark ? 'text-gray-400' : 'text-stone-600'
                  }`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-stone-500'}`}>
                    {item.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Focus Section */}
        <section className="relative py-32">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex items-center gap-6 mb-16">
              <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
              <h2 className={`text-sm font-mono tracking-widest ${
                isDark ? 'text-purple-400' : 'text-purple-700'
              }`}>
                CURRENT FOCUS
              </h2>
              <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {currentFocus.map((item, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-xl border-2 transition-all duration-500 ${
                    isDark ? 'bg-slate-900/50 border-slate-700 hover:border-purple-500/50' 
                           : 'bg-white border-stone-200 hover:border-purple-400'
                  }`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both`
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                      item.status === 'Active Research' 
                        ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700')
                        : item.status === 'Co-op Position'
                        ? (isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700')
                        : (isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700')
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className={`text-xl font-serif font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                    {item.description}
                  </p>
                  <div className={`text-xs font-mono ${isDark ? 'text-gray-600' : 'text-stone-500'}`}>
                    {item.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="relative py-20">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className={`text-3xl font-serif font-bold text-center mb-16 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Technical Expertise
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCategories.map((category, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveSkill(i)}
                  className={`p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                    activeSkill === i
                      ? (isDark ? 'border-purple-500/60 bg-purple-900/30 scale-105' : 'border-purple-400 bg-purple-50 scale-105')
                      : (isDark ? 'border-slate-700 bg-slate-900/50' : 'border-stone-200 bg-white')
                  }`}
                >
                  <h3 className={`text-lg font-serif font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-stone-500'}`}>
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div key={skill} className={`text-sm px-3 py-1 rounded ${
                        isDark ? 'bg-slate-800 text-gray-300' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Projects Section */}
        <section id="research" className="relative py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-8">
            
            <div className="flex items-center gap-6 mb-20">
              <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
              <h2 className={`text-sm font-mono tracking-widest ${
                isDark ? 'text-purple-400' : 'text-purple-700'
              }`}>
                RESEARCH DOMAINS
              </h2>
              <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
            </div>

            <div className="space-y-32">
              {projects.map((project, index) => (
                <div key={project.id} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div 
                    className={`p-12 rounded-2xl transition-all duration-700 cursor-pointer group relative ${
                      isDark ? 'bg-slate-900/50 hover:bg-slate-900' : 'bg-white hover:shadow-2xl'
                    }`}
                    onMouseEnter={() => setSelectedProject(project.id)}
                    onMouseLeave={() => setSelectedProject(null)}
                    onClick={() => window.location.href = project.link}
                    style={{
                      transform: selectedProject === project.id ? 'scale(1.05) rotate(-1deg)' : 'scale(1)',
                      border: isDark ? '2px solid rgba(139,92,246,0.3)' : '2px solid rgba(99,102,241,0.2)'
                    }}
                  >
                    <div className={`absolute top-4 left-4 w-6 h-6 border-t border-l ${
                      isDark ? 'border-purple-500/50' : 'border-purple-400/50'
                    }`} />
                    <div className={`absolute top-4 right-4 w-6 h-6 border-t border-r ${
                      isDark ? 'border-purple-500/50' : 'border-purple-400/50'
                    }`} />
                    
                    <div className="flex items-start gap-4 mb-6">
                      <span className={`text-6xl font-serif font-bold ${
                        isDark ? 'text-purple-500/50' : 'text-stone-300'
                      } group-hover:text-purple-500 transition-colors`}>
                        {project.number}
                      </span>
                      <div>
                        <h3 className={`text-4xl font-serif font-bold mb-3 ${
                          isDark ? 'text-white' : 'text-stone-900'
                        }`}>
                          {project.title}
                        </h3>
                        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className={`text-lg font-serif leading-relaxed mb-6 ${
                      isDark ? 'text-gray-300' : 'text-stone-700'
                    }`}>
                      {project.description}
                    </p>

                    <div className="flex gap-3 flex-wrap mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-4 py-2 rounded-full text-sm font-mono ${
                          isDark ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ${
                      selectedProject === project.id ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className={`pt-6 border-t ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
                        {project.metrics.map((metric, i) => (
                          <p key={i} className={`text-sm font-mono mb-2 ${isDark ? 'text-gray-500' : 'text-stone-500'}`}>
                            → {metric}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className={`absolute bottom-4 left-4 w-6 h-6 border-b border-l ${
                      isDark ? 'border-purple-500/50' : 'border-purple-400/50'
                    }`} />
                    <div className={`absolute bottom-4 right-4 w-6 h-6 border-b border-r ${
                      isDark ? 'border-purple-500/50' : 'border-purple-400/50'
                    }`} />
                  </div>

                  <div className="relative h-96 hidden lg:block">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {index === 0 && (
                        <svg width="300" height="300" viewBox="0 0 300 300" className="animate-spin-slow">
                          <circle cx="150" cy="150" r="10" fill={isDark ? "#a855f7" : "#6366f1"} />
                          {[0, 120, 240].map((rotation, i) => (
                            <g key={i} transform={`rotate(${rotation} 150 150)`}>
                              <ellipse 
                                cx="150" 
                                cy="150" 
                                rx="100" 
                                ry="30" 
                                fill="none" 
                                stroke={isDark ? "#8b5cf6" : "#6366f1"} 
                                strokeWidth="2"
                                opacity="0.6"
                              />
                              <circle 
                                cx="250" 
                                cy="150" 
                                r="8" 
                                fill={isDark ? "#ec4899" : "#db2777"}
                                className="animate-pulse"
                              />
                            </g>
                          ))}
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="300" height="300" viewBox="0 0 300 300">
                          {[...Array(50)].map((_, i) => (
                            <circle
                              key={i}
                              cx={150 + Math.cos(i * 0.5) * (80 + i * 2)}
                              cy={150 + Math.sin(i * 0.5) * (80 + i * 2)}
                              r="3"
                              fill={isDark ? "#eab308" : "#ca8a04"}
                              opacity={0.6 - i * 0.01}
                              className="animate-pulse"
                              style={{ animationDelay: `${i * 0.05}s` }}
                            />
                          ))}
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="300" height="300" viewBox="0 0 300 300">
                          {[...Array(9)].map((_, i) => (
                            <circle
                              key={i}
                              cx={50 + (i % 3) * 100}
                              cy={50 + Math.floor(i / 3) * 100}
                              r="20"
                              fill="none"
                              stroke={isDark ? "#06b6d4" : "#0891b2"}
                              strokeWidth="2"
                              className="animate-pulse"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                          {[...Array(12)].map((_, i) => (
                            <line
                              key={i}
                              x1={50 + ((i % 4) % 3) * 100}
                              y1={50 + Math.floor((i % 4) / 3) * 100}
                              x2={50 + (((i % 4) + 1) % 3) * 100}
                              y2={50 + Math.floor(((i % 4) + 1) / 3) * 100}
                              stroke={isDark ? "#3b82f6" : "#2563eb"}
                              strokeWidth="1"
                              opacity="0.4"
                            />
                          ))}
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-32 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className={`text-5xl font-serif font-bold mb-6 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Let's Collaborate
            </h2>
            <p className={`text-xl font-serif mb-12 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              Interested in nanoscale innovation, computational research, or interdisciplinary collaboration? Let's connect.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:adseisem@uwaterloo.ca"
                className={`px-12 py-5 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl'
                }`}
              >
                Get in Touch →
              </a>
              <Link
                href="/beyond"
                className={`px-12 py-5 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 border-2 ${
                  isDark 
                    ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                Beyond the Lab
              </Link>
            </div>
          </div>
        </section>
        
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .scroll-mt-24 {
          scroll-margin-top: 6rem;
        }
      `}</style>
    </main>
  );
}
