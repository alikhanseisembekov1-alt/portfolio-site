// app/experience/page.tsx - ENHANCED VERSION
'use client';
import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';

export default function ExperiencePage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences = [
    {
      title: "Optical Engineering Co-op",
      company: "Christie Digital",
      location: "Kitchener, ON",
      period: "Jan 2025 – Present",
      type: "Co-op",
      category: "industry",
      description: "Optical testing, characterization, and simulation for high-precision projection systems.",
      achievements: [
        "Performed optical testing and characterization of color polarization filters, diffusers, and optical components using spectrometers to analyze transmission spectra and evaluate optical efficiency",
        "Conducted laser system testing on high-precision projectors, analyzing speckle effects and light profile distortions using BeamGage software for laser beam profiling",
        "Integrated and tested MEMS-based optical devices including Digital Micromirror Devices (DMDs), integrating rods, and spheres, ensuring precise alignment and optical uniformity",
        "Collaborated with thermal management team investigating focus drift issues and thermal expansion effects on optical elements",
        "Developed automated testing workflows using Testinator and Git-based APIs, optimizing real-time camera and fan control in projectors"
      ],
      skills: ["Optical Testing", "Zemax", "MATLAB", "BeamGage", "MEMS", "Git", "Test Automation"],
      color: "blue",
      icon: "🔬"
    },
    {
      title: "Research & Development Engineering Associate Co-op",
      company: "FluidAI",
      location: "Waterloo, ON",
      period: "September 2023 – April 2024",
      type: "Co-op",
      category: "industry",
      description: "Medical sensor R&D, calibration optimization, and fluid dynamics analysis for patient monitoring systems.",
      achievements: [
        "Spearheaded Design of Experiments (DOE) project optimizing sensor calibration workflows, reducing calibration time by 66% and saving 20 hours monthly",
        "Developed and optimized artifact filter model enhancing sensor precision while processing 1,000+ parquet files using Python and statistical analysis",
        "Designed and validated 50+ medical sensors (pH and ISFET), achieving 95% compliance with ISO 13485 QA/QC standards",
        "Conducted research with bio-hazardous fluids, employing flow meters and simulating fluid management in COMSOL",
        "Authored and updated 5+ Standard Operating Procedures (SOPs) ensuring ISO 13485 compliance",
        "Designed calibration stations with 3D-printed components, integrated PCB design and Arduino-based sensor control systems"
      ],
      skills: ["Python", "COMSOL", "Medical Devices", "PCB Design", "Arduino", "ISO 13485", "Statistical Analysis"],
      color: "green",
      icon: "⚕️"
    },
    {
      title: "Research Assistant Co-op",
      company: "Institute of Batteries LLP",
      location: "Almaty, Kazakhstan",
      period: "February – May 2023",
      type: "Co-op",
      category: "research",
      description: "Battery materials research, nanomaterial synthesis, and patent development for energy storage applications.",
      achievements: [
        "Performed battery material research characterizing cathode materials, electrolytes, and separators using SEM, XRD, and electrospinning",
        "Fabricated and tested coin cell batteries through electrode preparation, electrolyte filling, and electrochemical testing (EIS and cyclic voltammetry)",
        "Developed eco-friendly pouch cell prototype, contributing to LiFePO4 battery design and fabrication using AutoCAD",
        "Worked in cleanroom performing Magnetron Sputtering, PECVD, and Electrospinning for nanomaterial deposition",
        "Independently authored 3 patents focusing on electrochemical/hydrometallurgical methods for lithium/nickel extraction and nanomaterial doping for NCM811 cathodes",
        "Reviewed 100+ research papers on battery materials for EV applications; co-authored study on 3D-structured nanomaterials",
        "Collaborated with 60-member research team on cathode material optimization and cycle life improvements"
      ],
      skills: ["SEM", "XRD", "Electrospinning", "PECVD", "Magnetron Sputtering", "Electrochemistry", "Patent Writing", "AutoCAD"],
      color: "yellow",
      icon: "🔋"
    },
    {
      title: "Access Control Administrator Co-op",
      company: "Toronto Transit Commission",
      location: "Toronto, ON",
      period: "May – August 2022",
      type: "Co-op",
      category: "industry",
      description: "IT security administration and access management automation.",
      achievements: [
        "Managed user access on Active Directory & IBM Mainframe, ensuring data security compliance",
        "Automated access review processes with Python & Excel Macro, enhancing operational efficiency",
        "Administered security groups and generic service accounts in Active Directory"
      ],
      skills: ["Active Directory", "Python", "Excel Automation", "Cybersecurity", "IBM Mainframe"],
      color: "red",
      icon: "🔐"
    }
  ];

  const projects = [
    {
      title: "Waterloo Rocketry - Payload Member",
      period: "October 2021 – May 2022",
      category: "project",
      description: "Researched radiation absorption comparing boron nitride nanotube (BNNT) and Gadolinium Oxide. Contributed to research report on adverse effects of NP TiO2 usage.",
      skills: ["Research", "Technical Writing", "Materials Science"],
      icon: "🚀"
    },
    {
      title: "Toyota Innovation Challenge - Hackathon",
      period: "May 2023",
      category: "project",
      description: "Constructed image recognition deep learning model for quality inspection automation using vision-integrated robotics for automotive manufacturing.",
      skills: ["Machine Learning", "Computer Vision", "Robotics", "TensorFlow"],
      icon: "🤖"
    },
    {
      title: "News Article Summarization with ML",
      period: "August 2022",
      category: "project",
      description: "Developed NLP application to summarize news articles using TensorFlow, including sentiment analysis with GUI.",
      skills: ["NLP", "Python", "TensorFlow", "GUI Development"],
      icon: "📰"
    }
  ];

  const education = {
    degree: "Bachelor of Applied Science in Nanotechnology Engineering",
    school: "University of Waterloo",
    period: "September 2021 – June 2026",
    specialization: "AI, Cognitive Science, Quantum Technologies, and Biosensors",
    coursework: [
      "Nanobiosensors",
      "Quantum Computing",
      "Machine Learning for Engineers",
      "Neuromorphic Chips",
      "Micro- and Nanofabrication",
      "Advanced Materials Characterization",
      "Semiconductor Device Physics"
    ]
  };

  const awards = [
    { text: "Astronomy Club Leadership Diploma - Multiple presentations and tutoring for math, physics and astronomy", icon: "⭐" },
    { text: "4th Place Esotero 2020 Business Contest - Collaborated on innovative Uber business model", icon: "🏆" },
    { text: "Python Programming Certificate - Code.hs", icon: "🐍" },
    { text: "WHMIS 2024 Workplace Hazardous Materials Certificate", icon: "⚠️" }
  ];

  const skills = {
    "Programming & Data Analysis": ["Python", "C++", "MATLAB", "SQL", "TensorFlow", "OpenCV", "Pandas"],
    "Engineering & Design Tools": ["SolidWorks", "COMSOL", "AutoCAD", "OriginLab", "3D Printing", "Arduino", "Gwyddion"],
    "Nanomaterial Synthesis & Characterization": ["SEM", "AFM", "XRD", "Raman Spectroscopy", "Ellipsometry", "Titration"],
    "Microfabrication & Thin Films": ["PECVD", "Magnetron Sputtering", "Photolithography"],
    "Polymer Science & Surface Chemistry": ["RAFT Polymerization", "Quantum Dot Synthesis", "SPION Synthesis", "MEMs"],
    "Microfluidics & Lab-on-a-Chip": ["PDMS Device Fabrication", "Fluidic Control Systems"],
    "Optical Systems & Simulation": ["Zemax", "TracePro", "BeamGage", "Spectrometers"],
    "Embedded Systems & Hardware": ["PCB Design", "Microcontrollers", "Test Automation", "Git APIs"],
    "Languages": ["English", "Russian", "Kazakh", "French (Limited)", "Spanish (Limited)"]
  };

  const filteredExperiences = selectedCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

  const colorSchemes = {
    blue: { dark: 'bg-blue-900/50 text-blue-300', light: 'bg-blue-100 text-blue-700' },
    green: { dark: 'bg-green-900/50 text-green-300', light: 'bg-green-100 text-green-700' },
    yellow: { dark: 'bg-yellow-900/50 text-yellow-300', light: 'bg-yellow-100 text-yellow-700' },
    red: { dark: 'bg-red-900/50 text-red-300', light: 'bg-red-100 text-red-700' }
  };

  return (
    <main className={`min-h-screen transition-colors duration-700 ${
      isDark ? 'bg-slate-950' : 'bg-stone-50'
    }`}>
      
      <Navigation isDark={isDark} />

      {/* Enhanced Background decorations with MORE elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Vertical grid lines */}
        <div className="absolute inset-0 opacity-10">
          {[15, 35, 55, 75, 95].map((pos, i) => (
            <div
              key={`v-${i}`}
              className={`absolute h-full w-px ${isDark ? 'bg-purple-500/20' : 'bg-stone-300'}`}
              style={{ left: `${pos}%` }}
            />
          ))}
        </div>

        {/* Animated floating particles */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + i * 10}%`,
                background: isDark 
                  ? `radial-gradient(circle, rgba(139,92,246,${0.4 - i * 0.04}) 0%, transparent 70%)`
                  : `radial-gradient(circle, rgba(99,102,241,${0.3 - i * 0.03}) 0%, transparent 70%)`,
                filter: 'blur(1px)',
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>

        {/* Decorative geometric shapes */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.01}deg)` }}
        >
          {/* Stars */}
          <svg className="absolute top-20 left-1/4" width="80" height="80" viewBox="0 0 80 80">
            <path 
              d="M40 10 L45 30 L65 35 L45 40 L40 60 L35 40 L15 35 L35 30 Z" 
              fill="none" 
              stroke={isDark ? "#8b5cf6" : "#6366f1"} 
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>

          {/* Gears */}
          <svg className="absolute bottom-1/4 right-1/4" width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke={isDark ? "#ec4899" : "#db2777"} strokeWidth="2" />
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="15"
                width="4"
                height="10"
                fill={isDark ? "#8b5cf6" : "#6366f1"}
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
          </svg>

          {/* Circuit-like connections */}
          <svg className="absolute top-1/3 right-1/3" width="150" height="150" viewBox="0 0 150 150">
            <path 
              d="M20,20 L60,20 L60,60 M90,60 L130,60 L130,100" 
              fill="none" 
              stroke={isDark ? "#06b6d4" : "#0891b2"} 
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <circle cx="20" cy="20" r="4" fill={isDark ? "#8b5cf6" : "#6366f1"} className="animate-pulse" />
            <circle cx="60" cy="60" r="4" fill={isDark ? "#ec4899" : "#db2777"} className="animate-pulse" style={{animationDelay: '0.3s'}} />
            <circle cx="130" cy="100" r="4" fill={isDark ? "#06b6d4" : "#0891b2"} className="animate-pulse" style={{animationDelay: '0.6s'}} />
          </svg>
        </div>

        {/* Corner decorative elements */}
        <div className={`absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 ${
          isDark ? 'border-purple-500/30' : 'border-purple-400/40'
        }`} />
        <div className={`absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 ${
          isDark ? 'border-purple-500/30' : 'border-purple-400/40'
        }`} />

        {/* Scattered small squares */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`square-${i}`}
            className={`absolute w-4 h-4 border-2 ${isDark ? 'border-purple-500/20' : 'border-stone-300'}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${70 + i * 3}%`,
              transform: `rotate(${i * 25}deg)`,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
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
            {/* Enhanced decorative corner */}
            <div className={`absolute -top-8 -left-8 w-20 h-20 border-t-2 border-l-2 ${
              isDark ? 'border-purple-500/40' : 'border-purple-400/60'
            }`}>
              <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${
                isDark ? 'bg-purple-500' : 'bg-purple-400'
              } animate-pulse`} />
            </div>

            <div className={`text-xs font-mono tracking-widest mb-6 ${
              isDark ? 'text-gray-600' : 'text-stone-400'
            }`}>
              PROFESSIONAL EXPERIENCE • CV
            </div>

            <h1 className={`text-6xl lg:text-7xl font-serif font-bold mb-6 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Experience &<br/>
              <span className="italic bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h1>

            <div className={`w-64 h-0.5 mb-8 relative ${
              isDark ? 'bg-gradient-to-r from-purple-500 to-transparent' : 'bg-gradient-to-r from-purple-400 to-transparent'
            }`}>
              <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                isDark ? 'bg-purple-500' : 'bg-purple-400'
              }`} />
              <div className={`absolute left-16 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-pink-500' : 'bg-pink-400'
              }`} />
            </div>

            <p className={`text-xl lg:text-2xl font-serif max-w-3xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              Nanotechnology engineering student with hands-on experience in optical systems, 
              medical devices, battery materials, and computational modeling.
            </p>

            {/* Quick Links with icons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="mailto:adseisem@uwaterloo.ca"
                className={`px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105 flex items-center gap-2 ${
                  isDark 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <span>📧</span> Email Me
              </a>
              <a
                href="https://linkedin.com/in/alikhan-seisembekov-81874521a"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105 border-2 flex items-center gap-2 ${
                  isDark 
                    ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <span>💼</span> LinkedIn →
              </a>
              <a
                href="https://github.com/alsei09"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105 border-2 flex items-center gap-2 ${
                  isDark 
                    ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <span>💻</span> GitHub →
              </a>
              <button
                className={`px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105 border-2 flex items-center gap-2 ${
                  isDark 
                    ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <span>📄</span> Download CV ↓
              </button>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
          <div className="flex gap-4">
            {['all', 'industry', 'research'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-lg font-mono text-sm tracking-wide transition-all relative overflow-hidden ${
                  selectedCategory === cat
                    ? (isDark ? 'bg-purple-600 text-white shadow-lg' : 'bg-purple-600 text-white shadow-xl')
                    : (isDark ? 'bg-slate-800/50 text-gray-400 hover:bg-slate-800' : 'bg-white text-stone-600 hover:bg-gray-50 border-2 border-stone-200')
                }`}
              >
                {selectedCategory === cat && (
                  <div className={`absolute inset-0 ${isDark ? 'bg-purple-500' : 'bg-purple-700'} opacity-50 animate-pulse`} />
                )}
                <span className="relative z-10">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Work Experience with enhanced decorations */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-3xl font-serif font-bold ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Work Experience
            </h2>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
          </div>

          <div className="space-y-8">
            {filteredExperiences.map((exp, index) => {
              const scheme = colorSchemes[exp.color as keyof typeof colorSchemes];
              return (
                <div
                  key={index}
                  className={`p-8 rounded-2xl border-2 transition-all hover:scale-[1.01] relative overflow-hidden group ${
                    isDark 
                      ? 'bg-slate-900/50 border-purple-500/30 hover:border-purple-500/60' 
                      : 'bg-white border-purple-200 hover:shadow-xl'
                  }`}
                >
                  {/* Corner decoration */}
                  <div className={`absolute top-4 right-4 w-12 h-12 border-t border-r opacity-30 group-hover:opacity-60 transition-opacity ${
                    isDark ? 'border-purple-400' : 'border-purple-500'
                  }`} />

                  {/* Icon decoration */}
                  <div className="absolute top-8 right-8 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                    {exp.icon}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{exp.icon}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                          isDark ? scheme.dark : scheme.light
                        }`}>
                          {exp.type}
                        </span>
                        <span className={`text-sm font-mono ${
                          isDark ? 'text-gray-500' : 'text-stone-500'
                        }`}>
                          {exp.period}
                        </span>
                      </div>
                      
                      <h3 className={`text-2xl font-serif font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-stone-900'
                      }`}>
                        {exp.title}
                      </h3>
                      
                      <p className={`text-lg mb-2 ${
                        isDark ? 'text-purple-400' : 'text-purple-700'
                      }`}>
                        {exp.company} • {exp.location}
                      </p>

                      <p className={`text-base italic mb-4 ${
                        isDark ? 'text-gray-400' : 'text-stone-600'
                      }`}>
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className={`flex items-start gap-3 ${
                        isDark ? 'text-gray-300' : 'text-stone-700'
                      }`}>
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-xs font-mono ${
                        isDark ? 'bg-slate-800 text-gray-400' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects with icons */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-3xl font-serif font-bold ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Projects & Competitions
            </h2>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all hover:scale-105 group relative ${
                  isDark 
                    ? 'bg-slate-900/50 border-slate-700 hover:border-purple-500/50' 
                    : 'bg-white border-stone-200 hover:shadow-lg'
                }`}
              >
                {/* Icon background */}
                <div className="absolute top-4 right-4 text-5xl opacity-5 group-hover:opacity-10 transition-opacity">
                  {project.icon}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{project.icon}</span>
                  <h3 className={`text-xl font-serif font-bold ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    {project.title.split(' - ')[0]}
                  </h3>
                </div>
                
                <p className={`text-sm font-mono mb-3 ${
                  isDark ? 'text-gray-500' : 'text-stone-500'
                }`}>
                  {project.period}
                </p>

                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-stone-700'
                }`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill} className={`px-2 py-1 rounded text-xs ${
                      isDark ? 'bg-slate-800 text-gray-400' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-3xl font-serif font-bold ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Education
            </h2>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
          </div>

          <div className={`p-8 rounded-2xl border-2 relative overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/40' 
              : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
          }`}>
            {/* Decorative graduation cap */}
            <div className="absolute top-8 right-8 text-6xl opacity-10">
              🎓
            </div>

            <h3 className={`text-2xl font-serif font-bold mb-2 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              {education.degree}
            </h3>
            
            <p className={`text-lg mb-1 ${
              isDark ? 'text-purple-400' : 'text-purple-700'
            }`}>
              {education.school}
            </p>

            <p className={`text-sm font-mono mb-4 ${
              isDark ? 'text-gray-500' : 'text-stone-600'
            }`}>
              {education.period}
            </p>

            <p className={`text-base mb-4 ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              <strong>Specialization:</strong> {education.specialization}
            </p>

            <div>
              <p className={`text-sm font-semibold mb-2 ${
                isDark ? 'text-gray-400' : 'text-stone-600'
              }`}>
                Relevant Coursework:
              </p>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <span key={course} className={`px-3 py-1 rounded-full text-sm ${
                    isDark ? 'bg-slate-800 text-gray-300' : 'bg-white text-stone-700'
                  }`}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-3xl font-serif font-bold ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Technical Skills
            </h2>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={category}
                className={`p-6 rounded-xl border-2 relative overflow-hidden group ${
                  isDark 
                    ? 'bg-slate-900/50 border-slate-700 hover:border-purple-500/30' 
                    : 'bg-white border-stone-200 hover:border-purple-300'
                } transition-all`}
              >
                {/* Small decorative element */}
                <div className={`absolute top-4 left-4 w-2 h-2 rounded-full ${
                  isDark ? 'bg-purple-500/50' : 'bg-purple-400/50'
                } group-hover:scale-150 transition-transform`} />

                <h3 className={`text-lg font-serif font-bold mb-4 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span key={skill} className={`px-3 py-1 rounded text-sm transition-all hover:scale-105 ${
                      isDark ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards with icons */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-3xl font-serif font-bold ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Awards & Certificates
            </h2>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
          </div>

          <div className="space-y-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 flex items-center gap-4 transition-all hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-slate-900/30 border-purple-500 hover:bg-slate-900/50' 
                    : 'bg-white border-purple-400 hover:shadow-md'
                }`}
              >
                <span className="text-3xl flex-shrink-0">{award.icon}</span>
                <p className={`${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
                  {award.text}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </main>
  );
}
