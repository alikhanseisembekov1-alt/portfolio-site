// app/blog/page.tsx
'use client';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function BlogPage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'DFT', 'Molecular Dynamics', 'AI & Neuromorphic', 'HPC', 'Research Life'];

  const posts = [
    {
      title: "Demystifying Exchange-Correlation Functionals in DFT",
      date: "January 15, 2026",
      readTime: "8 min read",
      category: "DFT",
      excerpt: "Ever wondered why your DFT calculations give different results with GGA vs. hybrid functionals? Let's dive into the quantum mechanical heart of density functional theory and understand what exchange-correlation really means.",
      slug: "dft-exchange-correlation-functionals",
      featured: true,
      tags: ["Quantum Mechanics", "DFT", "Computational Chemistry"]
    },
    {
      title: "My First 1000 Hours on Compute Canada: Lessons Learned",
      date: "January 10, 2026",
      readTime: "6 min read",
      category: "HPC",
      excerpt: "From crashed jobs to inefficient SLURM scripts, here's everything I wish I knew before running molecular dynamics simulations on Graham cluster. A practical guide for nanotechnology students.",
      slug: "compute-canada-lessons",
      featured: false,
      tags: ["HPC", "LAMMPS", "Career"]
    },
    {
      title: "Radial Distribution Functions: The Atomic Fingerprint",
      date: "January 5, 2026",
      readTime: "10 min read",
      category: "Molecular Dynamics",
      excerpt: "RDFs are more than just pretty graphs—they're windows into the atomic-scale structure of materials. Here's how to interpret them, what the peaks actually mean, and common pitfalls to avoid.",
      slug: "radial-distribution-functions-guide",
      featured: true,
      tags: ["Molecular Dynamics", "Materials Science", "Data Analysis"]
    },
    {
      title: "Why Neuromorphic Computing Needs Nanotechnology",
      date: "December 28, 2025",
      readTime: "12 min read",
      category: "AI & Neuromorphic",
      excerpt: "Brain-inspired computing isn't just about clever algorithms—it requires revolutionary hardware. Exploring how nanoscale materials and quantum effects might unlock true artificial cognition.",
      slug: "neuromorphic-nanotechnology",
      featured: false,
      tags: ["Neuromorphic", "AI", "Nanomaterials"]
    },
    {
      title: "Debugging VASP: Common Errors and Quick Fixes",
      date: "December 20, 2025",
      readTime: "5 min read",
      category: "DFT",
      excerpt: "ZPOTRF error? EDDDAV convergence issues? This quick reference guide covers the most common VASP errors I've encountered and how to fix them without hours of forum diving.",
      slug: "vasp-debugging-guide",
      featured: false,
      tags: ["DFT", "VASP", "Tutorial"]
    },
    {
      title: "The Art of Scientific Figures: From Matplotlib to Publication",
      date: "December 12, 2025",
      readTime: "7 min read",
      category: "Research Life",
      excerpt: "Your research is only as good as your ability to communicate it. A visual guide to creating publication-quality scientific figures that reviewers and readers will actually understand.",
      slug: "scientific-figures-guide",
      featured: false,
      tags: ["Visualization", "Python", "Academic Writing"]
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <main className={`min-h-screen transition-colors duration-700 ${
      isDark ? 'bg-slate-950' : 'bg-stone-50'
    }`}>
      
      <Navigation isDark={isDark} />

      {/* Decorative background elements */}
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
            {/* Decorative corner */}
            <div className={`absolute -top-8 -left-8 w-20 h-20 border-t-2 border-l-2 ${
              isDark ? 'border-purple-500/40' : 'border-purple-400/60'
            }`} />

            <div className={`text-xs font-mono tracking-widest mb-6 ${
              isDark ? 'text-gray-600' : 'text-stone-400'
            }`}>
              RESEARCH NOTES • WATERLOO, ON
            </div>

            <h1 className={`text-6xl lg:text-7xl font-serif font-bold mb-6 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Lab Notes &<br/>
              <span className="italic bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Reflections
              </span>
            </h1>

            <div className={`w-64 h-0.5 mb-8 ${
              isDark ? 'bg-gradient-to-r from-purple-500 to-transparent' : 'bg-gradient-to-r from-purple-400 to-transparent'
            }`} />

            <p className={`text-xl lg:text-2xl font-serif max-w-3xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              Exploring the intersection of quantum mechanics, molecular dynamics, and artificial intelligence. 
              From SLURM job scripts to philosophical musings on emergent intelligence.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className={`text-sm font-mono tracking-widest ${
              isDark ? 'text-purple-400' : 'text-purple-700'
            }`}>
              FEATURED ARTICLES
            </h2>
            <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className={`h-full p-8 rounded-2xl transition-all duration-500 border-2 relative overflow-hidden ${
                  isDark 
                    ? 'bg-slate-900/50 hover:bg-slate-900 border-purple-500/30 hover:border-purple-500/60' 
                    : 'bg-white hover:shadow-2xl border-purple-200 hover:border-purple-400'
                }`}>
                  
                  {/* Corner decoration */}
                  <div className={`absolute top-4 right-4 w-8 h-8 border-t border-r transition-colors ${
                    isDark ? 'border-purple-500/50 group-hover:border-purple-400' : 'border-purple-400/50 group-hover:border-purple-600'
                  }`} />

                  {/* Category badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 ${
                    isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {post.category}
                  </div>

                  <h3 className={`text-3xl font-serif font-bold mb-4 group-hover:text-purple-500 transition-colors ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    {post.title}
                  </h3>

                  <p className={`text-lg leading-relaxed mb-6 ${
                    isDark ? 'text-gray-300' : 'text-stone-700'
                  }`}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className={`text-sm font-mono ${
                      isDark ? 'text-gray-500' : 'text-stone-500'
                    }`}>
                      {post.date} • {post.readTime}
                    </div>
                    <div className={`text-sm font-mono transition-all ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    } group-hover:translate-x-2`}>
                      Read more →
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {post.tags.map(tag => (
                      <span key={tag} className={`text-xs px-2 py-1 rounded ${
                        isDark ? 'bg-slate-800 text-gray-400' : 'bg-stone-100 text-stone-600'
                      }`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 ${
                  selectedCategory === cat
                    ? (isDark 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' 
                        : 'bg-purple-600 text-white shadow-xl')
                    : (isDark
                        ? 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-purple-300'
                        : 'bg-white text-stone-600 hover:bg-gray-50 hover:text-purple-700 border-2 border-stone-200')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* All Posts Grid */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-20">
          <div className="flex items-center gap-4 mb-12">
            <h2 className={`text-sm font-mono tracking-widest ${
              isDark ? 'text-purple-400' : 'text-purple-700'
            }`}>
              {selectedCategory === 'all' ? 'ALL POSTS' : selectedCategory.toUpperCase()}
            </h2>
            <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-stone-300'}`} />
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className={`p-6 lg:p-8 rounded-xl transition-all duration-300 border-l-4 ${
                  isDark 
                    ? 'bg-slate-900/30 hover:bg-slate-900/60 border-purple-500/50 hover:border-purple-500' 
                    : 'bg-white hover:shadow-lg border-purple-300 hover:border-purple-600'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                          isDark ? 'bg-slate-800 text-purple-300' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {post.category}
                        </span>
                        <span className={`text-sm font-mono ${
                          isDark ? 'text-gray-600' : 'text-stone-400'
                        }`}>
                          {post.date}
                        </span>
                      </div>
                      
                      <h3 className={`text-2xl font-serif font-bold mb-2 group-hover:text-purple-500 transition-colors ${
                        isDark ? 'text-white' : 'text-stone-900'
                      }`}>
                        {post.title}
                      </h3>
                      
                      <p className={`text-base leading-relaxed mb-3 ${
                        isDark ? 'text-gray-400' : 'text-stone-600'
                      }`}>
                        {post.excerpt}
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map(tag => (
                          <span key={tag} className={`text-xs px-2 py-1 rounded ${
                            isDark ? 'bg-slate-800 text-gray-500' : 'bg-stone-100 text-stone-500'
                          }`}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                      <div className={`text-sm font-mono ${
                        isDark ? 'text-gray-500' : 'text-stone-500'
                      }`}>
                        {post.readTime}
                      </div>
                      <div className={`text-2xl transition-transform group-hover:translate-x-2 ${
                        isDark ? 'text-purple-500' : 'text-purple-600'
                      }`}>
                        →
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className={`p-12 rounded-2xl text-center relative overflow-hidden ${
            isDark ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200'
          }`}>
            {/* Decorative elements */}
            <div className={`absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 ${
              isDark ? 'border-purple-400/50' : 'border-purple-500/50'
            }`} />
            <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 ${
              isDark ? 'border-purple-400/50' : 'border-purple-500/50'
            }`} />

            <h2 className={`text-3xl font-serif font-bold mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Stay Updated
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              Get notified when I publish new articles on computational nanotechnology, 
              DFT simulations, and the future of neuromorphic computing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.email@example.com"
                className={`flex-1 px-6 py-4 rounded-lg font-mono text-sm ${
                  isDark 
                    ? 'bg-slate-800 text-white border border-purple-500/30 focus:border-purple-500' 
                    : 'bg-white text-stone-900 border-2 border-purple-200 focus:border-purple-500'
                } focus:outline-none transition-colors`}
              />
              <button className={`px-8 py-4 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl'
              }`}>
                Subscribe →
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
