// app/blog/[slug]/page.tsx
'use client';
import { useState } from 'react';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';

export default function BlogPost() {
  const [isDark, setIsDark] = useState(true);

  const post = {
    title: "Demystifying Exchange-Correlation Functionals in DFT",
    date: "January 15, 2026",
    readTime: "8 min read",
    category: "DFT",
    tags: ["Quantum Mechanics", "DFT", "Computational Chemistry"],
    author: "Alikhan Seisembekov"
  };

  return (
    <main className={`min-h-screen transition-colors duration-700 ${
      isDark ? 'bg-slate-950' : 'bg-stone-50'
    }`}>
      
      <Navigation isDark={isDark} />

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

      <article className="relative pt-32 pb-20">
        
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-8">
          <Link 
            href="/blog"
            className={`text-sm font-mono flex items-center gap-2 transition-colors ${
              isDark ? 'text-gray-400 hover:text-purple-400' : 'text-stone-600 hover:text-purple-600'
            }`}
          >
            ← Back to all posts
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-4xl mx-auto px-6 lg:px-8 mb-16">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-mono mb-6 ${
            isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
          }`}>
            {post.category}
          </div>

          <h1 className={`text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}>
            {post.title}
          </h1>

          <div className={`flex flex-wrap items-center gap-4 text-sm font-mono mb-8 ${
            isDark ? 'text-gray-400' : 'text-stone-600'
          }`}>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className={`text-sm px-3 py-1 rounded-full ${
                isDark ? 'bg-slate-800 text-gray-300' : 'bg-stone-100 text-stone-700'
              }`}>
                #{tag}
              </span>
            ))}
          </div>

          <div className={`w-full h-px mt-8 ${
            isDark ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-transparent' : 'bg-gradient-to-r from-purple-400 via-pink-400 to-transparent'
          }`} />
        </header>

        {/* Content - FIXED STYLING */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className={`space-y-6 text-lg leading-relaxed ${
            isDark ? 'text-gray-200' : 'text-stone-800'
          }`}>
            
            {/* Lead paragraph */}
            <p className={`text-xl font-serif leading-relaxed ${
              isDark ? 'text-gray-100' : 'text-stone-900'
            }`}>
              If you've ever run a DFT calculation, you've probably encountered the bewildering array of exchange-correlation (XC) functionals: LDA, PBE, B3LYP, PBE0, SCAN... The list goes on. But what do these acronyms actually mean, and why does choosing the wrong one sometimes give you completely nonsensical results?
            </p>

            <h2 className={`text-3xl font-serif font-bold mt-12 mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              The Quantum Many-Body Problem
            </h2>
            
            <p>
              Let's start with the fundamental challenge. The Schrödinger equation for a many-electron system is, to put it mildly, unsolvable. With <em className={isDark ? 'text-purple-300' : 'text-purple-700'}>N</em> electrons, you're dealing with a 3<em className={isDark ? 'text-purple-300' : 'text-purple-700'}>N</em>-dimensional problem, and the computational cost scales exponentially. For anything beyond the smallest molecules, exact solutions are simply out of reach.
            </p>

            <p>
              This is where Density Functional Theory comes to the rescue. Instead of tracking every electron individually, DFT reformulates the problem in terms of electron density—a function of just three spatial coordinates, regardless of how many electrons you have.
            </p>

            <h2 className={`text-3xl font-serif font-bold mt-12 mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              The Kohn-Sham Approach
            </h2>

            <p>
              The Kohn-Sham formulation is beautifully clever. It replaces the interacting electron system with a fictitious non-interacting system that produces the same density. The total energy can then be written as:
            </p>

            <div className={`my-6 p-6 rounded-lg font-mono text-sm overflow-x-auto ${
              isDark ? 'bg-slate-900 border border-purple-500/30 text-gray-200' : 'bg-stone-100 border border-stone-300 text-stone-900'
            }`}>
              <code>E[ρ] = T_s[ρ] + E_ext[ρ] + E_Hartree[ρ] + E_xc[ρ]</code>
            </div>

            <p>
              The first three terms? We know how to calculate those exactly. But that last term—the exchange-correlation energy <code className={`px-2 py-1 rounded text-sm font-mono ${
                isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
              }`}>E_xc</code>—contains all the quantum mechanical complexity we swept under the rug. This is where the approximations come in.
            </p>

            <h2 className={`text-3xl font-serif font-bold mt-12 mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              The Functional Zoo
            </h2>

            <h3 className={`text-2xl font-serif font-bold mt-8 mb-3 ${
              isDark ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Local Density Approximation (LDA)
            </h3>
            
            <p>
              The simplest approach assumes that at each point in space, the exchange-correlation energy is the same as it would be in a uniform electron gas with that density. Remarkably, LDA works better than it has any right to—often giving bond lengths within 1-2% of experimental values. But it systematically overbinds molecules and underestimates band gaps.
            </p>

            <h3 className={`text-2xl font-serif font-bold mt-8 mb-3 ${
              isDark ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Generalized Gradient Approximation (GGA)
            </h3>

            <p>
              GGA functionals like PBE add dependence on the gradient of the density. This single addition dramatically improves predictions for molecular geometries and energies. In my own work simulating nanoscale catalysts, switching from LDA to PBE typically improves adsorption energies by 0.3-0.5 eV—enough to completely change your conclusions about reaction mechanisms.
            </p>

            <h3 className={`text-2xl font-serif font-bold mt-8 mb-3 ${
              isDark ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Meta-GGA and Hybrid Functionals
            </h3>

            <p>
              Meta-GGAs (like SCAN) incorporate the kinetic energy density, while hybrid functionals (like B3LYP or PBE0) mix in exact exchange from Hartree-Fock theory. These are computationally more expensive but often essential for systems with strong correlation or for accurate band gap predictions.
            </p>

            <h2 className={`text-3xl font-serif font-bold mt-12 mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Practical Advice from the Trenches
            </h2>

            <p>
              After burning through 1000+ compute hours on various functionals, here's what I've learned:
            </p>

            <ul className={`space-y-3 my-6 list-disc list-inside ${
              isDark ? 'text-gray-200' : 'text-stone-800'
            }`}>
              <li><strong className={isDark ? 'text-white' : 'text-stone-900'}>Start with PBE</strong> for most materials science problems. It's the workhorse for good reason.</li>
              <li><strong className={isDark ? 'text-white' : 'text-stone-900'}>Use hybrid functionals</strong> when you need accurate band gaps or are studying charge transfer.</li>
              <li><strong className={isDark ? 'text-white' : 'text-stone-900'}>Always benchmark</strong> against experimental data or higher-level calculations for your specific system.</li>
              <li><strong className={isDark ? 'text-white' : 'text-stone-900'}>Be consistent</strong>—comparing energies from different functionals is meaningless.</li>
            </ul>

            <h2 className={`text-3xl font-serif font-bold mt-12 mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              The Elephant in the Room
            </h2>

            <p>
              Here's the uncomfortable truth: there's no "best" functional. Each is a different approximation to an unknown exact functional. The choice depends on your system, the properties you care about, and sometimes just empirical testing.
            </p>

            <p>
              Machine learning is starting to change this landscape—functionals like DM21 are trained on high-quality quantum chemistry data. But for now, understanding the physics behind each approximation remains your best guide.
            </p>

            <h2 className={`text-3xl font-serif font-bold mt-12 mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Further Reading
            </h2>

            <ul className={`space-y-2 my-6 list-disc list-inside ${
              isDark ? 'text-gray-200' : 'text-stone-800'
            }`}>
              <li>Perdew & Schmidt, "Jacob's Ladder of density functional approximations" (2001)</li>
              <li>Burke, "Perspective on density functional theory" <em>J. Chem. Phys.</em> (2012)</li>
              <li>Peverati & Truhlar, "Quest for a universal density functional" <em>Phil. Trans. R. Soc. A</em> (2014)</li>
            </ul>

            <div className={`w-full h-px my-8 ${
              isDark ? 'bg-slate-800' : 'bg-stone-300'
            }`} />

            <p className={`text-base italic ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
              Got questions about DFT or want to share your own functional horror stories? 
              Drop me an email or find me on the Compute Canada Slack.
            </p>

          </div>
        </div>

        {/* Related Posts */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-20">
          <h2 className={`text-2xl font-serif font-bold mb-8 ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}>
            Related Articles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Debugging VASP: Common Errors and Quick Fixes", slug: "vasp-debugging-guide" },
              { title: "My First 1000 Hours on Compute Canada", slug: "compute-canada-lessons" }
            ].map((related) => (
              <Link 
                key={related.slug}
                href={`/blog/${related.slug}`}
                className={`p-6 rounded-xl transition-all border-l-4 group ${
                  isDark 
                    ? 'bg-slate-900/50 hover:bg-slate-900 border-purple-500/50 hover:border-purple-500' 
                    : 'bg-white hover:shadow-lg border-purple-400 hover:border-purple-600'
                }`}
              >
                <h3 className={`text-xl font-serif font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-purple-400' : 'text-stone-900 group-hover:text-purple-600'
                }`}>
                  {related.title} →
                </h3>
              </Link>
            ))}
          </div>
        </section>

      </article>
    </main>
  );
}
