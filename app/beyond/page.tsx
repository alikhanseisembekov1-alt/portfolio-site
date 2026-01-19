// app/beyond/page.tsx
'use client';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function BeyondPage() {
  const [isDark, setIsDark] = useState(true);

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

      <div className="relative pt-32 pb-20">
        
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <div className="relative">
            <div className={`text-xs font-mono tracking-widest mb-6 ${
              isDark ? 'text-gray-600' : 'text-stone-400'
            }`}>
              LIFE • PASSIONS • PURSUITS
            </div>

            <h1 className={`text-6xl lg:text-7xl font-serif font-bold mb-6 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Beyond the<br/>
              <span className="italic bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Lab
              </span>
            </h1>

            <div className={`w-64 h-0.5 mb-8 ${
              isDark ? 'bg-gradient-to-r from-purple-500 to-transparent' : 'bg-gradient-to-r from-purple-400 to-transparent'
            }`} />

            <p className={`text-xl lg:text-2xl font-serif max-w-3xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-stone-700'
            }`}>
              Competitive gamer. Elite athlete. Polyglot. Voice actor. 
              When I'm not simulating molecular dynamics, I'm pursuing mastery in domains 
              far removed from nanotechnology—but somehow, it all connects.
            </p>
          </div>
        </section>
            

        {/* Personal Journey */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
    <div className={`p-10 rounded-2xl border-2 ${
        isDark 
      ? 'bg-gradient-to-br from-slate-900/70 to-indigo-900/30 border-indigo-500/40' 
      : 'bg-gradient-to-br from-slate-50 to-indigo-50 border-indigo-300'
        }`}>
    <div className="flex items-center gap-4 mb-6">
      <span className="text-5xl">🌏</span>
      <h2 className={`text-3xl font-serif font-bold ${
        isDark ? 'text-white' : 'text-stone-900'
      }`}>
        The Journey
      </h2>
    </div>
    
    <div className="space-y-6">
      <p className={`text-lg leading-relaxed ${
        isDark ? 'text-gray-300' : 'text-stone-700'
      }`}>
        My path to nanotechnology engineering wasn't straightforward—and that's exactly what made it interesting.
      </p>

      <div className="relative pl-8 border-l-2 border-purple-500/50 space-y-6">
        {/* Kazakhstan */}
        <div>
          <div className={`absolute -left-3 w-5 h-5 rounded-full ${
            isDark ? 'bg-purple-600' : 'bg-purple-500'
          } border-4 ${isDark ? 'border-slate-950' : 'border-stone-50'}`} />
          <div className={`text-sm font-mono mb-2 ${
            isDark ? 'text-purple-400' : 'text-purple-700'
          }`}>
            🇰🇿 Early Years • Kazakhstan
          </div>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
            Growing up in Kazakhstan, I was that kid who couldn't choose between physics, chemistry, 
            biology, and math—so I didn't. Led the astronomy club, competed in chess tournaments, 
            and discovered Dota 2 (which would later become a defining part of my life). 
            The sciences felt interconnected, and I loved exploring their boundaries.
          </p>
        </div>

        {/* Canada - Victoria */}
        <div>
          <div className={`absolute -left-3 w-5 h-5 rounded-full ${
            isDark ? 'bg-cyan-600' : 'bg-cyan-500'
          } border-4 ${isDark ? 'border-slate-950' : 'border-stone-50'}`} />
          <div className={`text-sm font-mono mb-2 ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}>
            🇨🇦 2018 • Victoria, BC
          </div>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
            Moving to Canada for high school was a reset button. New country, new language barriers 
            to overcome, new culture to navigate. While adjusting to life in Victoria, I doubled down 
            on what I loved: crushing ranked Dota matches late into the night, training calisthenics 
            at local parks, and diving deeper into physics and chemistry. The Pacific Northwest became 
            home, and I started dreaming bigger.
          </p>
        </div>

        {/* University of Waterloo */}
        <div>
          <div className={`absolute -left-3 w-5 h-5 rounded-full ${
            isDark ? 'bg-pink-600' : 'bg-pink-500'
          } border-4 ${isDark ? 'border-slate-950' : 'border-stone-50'}`} />
          <div className={`text-sm font-mono mb-2 ${
            isDark ? 'text-pink-400' : 'text-pink-700'
          }`}>
            🎓 2021 • University of Waterloo
          </div>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
            Nanotechnology Engineering at Waterloo was the perfect fit—finally, a program where my 
            refusal to pick just one science became an asset. Here, I could study quantum mechanics, 
            materials synthesis, computational modeling, AI, and biosensors all under one roof. 
            The co-op program let me work at Christie Digital on optical systems, FluidAI on medical 
            sensors, and the Institute of Batteries on energy materials. Each experience reinforced 
            that the best problems live at intersections.
          </p>
        </div>

        {/* Present */}
        <div>
          <div className={`absolute -left-3 w-5 h-5 rounded-full ${
            isDark ? 'bg-purple-600 animate-pulse' : 'bg-purple-500 animate-pulse'
          } border-4 ${isDark ? 'border-slate-950' : 'border-stone-50'}`} />
          <div className={`text-sm font-mono mb-2 ${
            isDark ? 'text-purple-400' : 'text-purple-700'
          }`}>
            🚀 Now • Building
          </div>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
            Today, I'm balancing DFT simulations on HPC clusters, maintaining Top 100 Dota rank, 
            holding human flags at the gym, and exploring how neuromorphic computing could change 
            everything. I still can't choose just one thing—but now I see that as a strength. 
            The future belongs to people who can connect dots across disciplines.
          </p>
        </div>
      </div>

      <div className={`p-6 rounded-xl border-l-4 mt-6 ${
        isDark 
          ? 'bg-purple-900/30 border-purple-500' 
          : 'bg-purple-50 border-purple-400'
      }`}>
        <p className={`text-base italic ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
          <strong>Why it matters:</strong> Moving across the world at 16 taught me adaptability. 
          Competing at the highest levels of Dota taught me strategic thinking under pressure. 
          Calisthenics taught me that mastery is built incrementally. And nanotechnology? 
          It's where all these lessons converge—optimizing complex systems, one iteration at a time.
        </p>
      </div>
    </div>
  </div>
</section>

        {/* Achievement Stats */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "Top 100", label: "Dota 2 NA", icon: "🎮" },
              { number: "Top 50", label: "Ability Draft", icon: "🏆" },
              { number: "1800+", label: "Chess Elo", icon: "♟️" },
              { number: "4", label: "Languages", icon: "🌍" }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-xl text-center border-2 transition-all hover:scale-105 ${
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

        {/* Dota 2 - Featured Section */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
          <div className={`p-12 rounded-2xl border-2 relative overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-red-900/30 via-orange-900/20 to-yellow-900/30 border-red-500/40' 
              : 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-red-300'
          }`}>
            {/* Decorative Dota logo style element */}
            <div className="absolute top-0 right-0 text-[200px] opacity-5 leading-none">
              🎮
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">🎮</span>
                <div>
                  <h2 className={`text-4xl font-serif font-bold ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    Dota 2 Mastery
                  </h2>
                  <p className={`text-sm font-mono ${
                    isDark ? 'text-red-400' : 'text-red-700'
                  }`}>
                    Top 100 North America • Top 50 Ability Draft
                  </p>
                </div>
              </div>

              <p className={`text-lg leading-relaxed mb-6 ${
                isDark ? 'text-gray-300' : 'text-stone-800'
              }`}>
                Reaching the top echelons of Dota 2 competitive play isn't just about mechanical skill—it's about 
                pattern recognition, resource optimization, probabilistic decision-making under uncertainty, 
                and real-time strategic adaptation. Sound familiar? The same skills that help me optimize 
                DFT functional selection help me predict enemy movements and calculate trade efficiency.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className={`p-6 rounded-xl ${
                  isDark ? 'bg-slate-900/70' : 'bg-white/70'
                }`}>
                  <h3 className={`font-serif font-bold mb-3 flex items-center gap-2 ${
                    isDark ? 'text-red-400' : 'text-red-700'
                  }`}>
                    <span>⚔️</span> Competitive Achievement
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
                    <li>• Top 100 player ranking in North America servers</li>
                    <li>• Top 50 globally in Ability Draft game mode</li>
                    <li>• Thousands of hours mastering meta strategies</li>
                    <li>• Deep understanding of draft theory and itemization</li>
                  </ul>
                </div>

                <div className={`p-6 rounded-xl ${
                  isDark ? 'bg-slate-900/70' : 'bg-white/70'
                }`}>
                  <h3 className={`font-serif font-bold mb-3 flex items-center gap-2 ${
                    isDark ? 'text-orange-400' : 'text-orange-700'
                  }`}>
                    <span>🧠</span> Skills That Transfer
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
                    <li>• Complex system optimization under constraints</li>
                    <li>• Real-time data analysis and decision making</li>
                    <li>• Team coordination and communication</li>
                    <li>• Adaptive problem solving in dynamic environments</li>
                  </ul>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-l-4 ${
                isDark ? 'bg-orange-900/30 border-orange-500' : 'bg-orange-50 border-orange-400'
              }`}>
                <p className={`text-sm italic ${isDark ? 'text-orange-300' : 'text-orange-800'}`}>
                  🎯 <strong>Future Project:</strong> Building a data analytics platform for Ability Draft 
                  using machine learning to predict optimal ability combinations—stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Interests Grid */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-12 space-y-8">
          
          {/* Chess */}
          <div className={`p-10 rounded-2xl border-2 ${
            isDark 
              ? 'bg-gradient-to-br from-slate-900/50 to-stone-900/50 border-slate-700' 
              : 'bg-gradient-to-br from-slate-50 to-stone-50 border-slate-300'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">♟️</span>
              <h2 className={`text-3xl font-serif font-bold ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Chess
              </h2>
            </div>
            <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              1800 Elo on Chess.com and Level 1 in official chess ratings (one level before Candidate Master). 
              Chess taught me patience, calculation, and the beauty of seeing 10 moves ahead—skills that directly 
              translate to research planning and experimental design.
            </p>
            <div className={`inline-block px-4 py-2 rounded-lg font-mono text-sm ${
              isDark ? 'bg-slate-800 text-gray-300' : 'bg-white text-stone-700'
            }`}>
              1800+ Elo • Level 1 Rating
            </div>
          </div>

          {/* Calisthenics */}
          <div className={`p-10 rounded-2xl border-2 ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/40' 
              : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">💪</span>
              <h2 className={`text-3xl font-serif font-bold ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Elite Calisthenics
              </h2>
            </div>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              The gym is my laboratory for understanding biomechanics and progressive overload. 
              Achieving advanced gymnastics skills requires the same dedication to incremental improvement 
              that drives my research.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { skill: "Front Lever", icon: "🔱", description: "Full body control" },
                { skill: "Handstand Push-ups", icon: "🤸", description: "Shoulder strength" },
                { skill: "Human Flag", icon: "🚩", description: "Core mastery" }
              ].map((item) => (
                <div key={item.skill} className={`p-4 rounded-xl text-center ${
                  isDark ? 'bg-slate-900/70' : 'bg-white/70'
                }`}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className={`font-serif font-bold text-sm mb-1 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    {item.skill}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-stone-600'}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className={`p-10 rounded-2xl border-2 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/40' 
              : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🌍</span>
              <h2 className={`text-3xl font-serif font-bold ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Multilingual Mind
              </h2>
            </div>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              Fluent in four languages with more in progress. Each language offers a unique lens for 
              understanding the world—and communicating complex scientific ideas across cultures.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { lang: "Kazakh", flag: "🇰🇿", level: "Native" },
                { lang: "Russian", flag: "🇷🇺", level: "Native" },
                { lang: "English", flag: "🇨🇦", level: "Fluent" },
                { lang: "French", flag: "🇫🇷", level: "Intermediate" }
              ].map((item) => (
                <div key={item.lang} className={`p-4 rounded-xl text-center ${
                  isDark ? 'bg-slate-900/70' : 'bg-white/70'
                }`}>
                  <div className="text-3xl mb-2">{item.flag}</div>
                  <h3 className={`font-serif font-bold text-sm mb-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-700'
                  }`}>
                    {item.lang}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-stone-600'}`}>
                    {item.level}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Acting & Arts */}
          <div className={`p-10 rounded-2xl border-2 ${
            isDark 
              ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/40' 
              : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🎭</span>
              <h2 className={`text-3xl font-serif font-bold ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Voice Acting & The Arts
              </h2>
            </div>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              From voice acting to appreciating classical music, opera, and ballet—I'm fascinated by 
              how humans express complexity through art. Museums and art galleries are where I go to 
              reset my mind and see patterns in unexpected places.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-900/70' : 'bg-white/70'}`}>
                <div className="text-2xl mb-2">🎙️</div>
                <h3 className={`font-serif font-bold text-sm mb-2 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Voice Acting
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                  Exploring character voices and narrative delivery in my free time
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-900/70' : 'bg-white/70'}`}>
                <div className="text-2xl mb-2">🎵</div>
                <h3 className={`font-serif font-bold text-sm mb-2 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Classical Music
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                  Opera, ballet, and symphonies—the mathematics of beautiful sound
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-900/70' : 'bg-white/70'}`}>
                <div className="text-2xl mb-2">🖼️</div>
                <h3 className={`font-serif font-bold text-sm mb-2 ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Museums & Galleries
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                  Regular visitor to art exhibitions and cultural spaces
                </p>
              </div>
            </div>
          </div>

          {/* Reading & Learning */}
          <div className={`p-10 rounded-2xl border-2 ${
            isDark 
              ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-500/40' 
              : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">📚</span>
              <h2 className={`text-3xl font-serif font-bold ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Perpetual Learner
              </h2>
            </div>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              I'm deeply fascinated by human intelligence and extraordinary talent across disciplines. 
              Whether it's reading about cognitive science, watching Veritasium and 3Blue1Brown, or 
              exploring board game theory—I love understanding how mastery develops.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className={`font-serif font-bold mb-3 ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  Favorite Creators
                </h3>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
                  <li>📹 Veritasium - Science communication excellence</li>
                  <li>🔵 3Blue1Brown - Mathematical beauty visualized</li>
                  <li>📖 Book journal enthusiast (tracking insights)</li>
                  <li>🎲 Board game strategy analysis</li>
                </ul>
              </div>
              <div>
                <h3 className={`font-serif font-bold mb-3 ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  Core Fascinations
                </h3>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-stone-700'}`}>
                  <li>🧠 Nature of human intelligence</li>
                  <li>🎯 Development of expertise and mastery</li>
                  <li>🔬 Interdisciplinary thinking</li>
                  <li>🌟 Meeting extraordinary people from all fields</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Astronomy */}
          <div className={`p-10 rounded-2xl border-2 ${
            isDark 
              ? 'bg-gradient-to-br from-indigo-900/30 to-violet-900/30 border-indigo-500/40' 
              : 'bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-300'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🌌</span>
              <h2 className={`text-3xl font-serif font-bold ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Astronomy & Outreach
              </h2>
            </div>
            <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              Led astronomy club and earned a Leadership Diploma teaching the cosmos to others. 
              There's something profound about helping someone understand orbital mechanics or 
              stellar evolution for the first time—it's where science meets wonder.
            </p>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-900/70' : 'bg-white/70'}`}>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className={isDark ? 'text-gray-400' : 'text-stone-700'}>
                  ⭐ Astronomy Club Leadership Diploma<br/>
                  📚 Tutored 50+ students in physics and astronomy
                </div>
                <div className={isDark ? 'text-gray-400' : 'text-stone-700'}>
                  🎤 15+ presentations on astrophysics<br/>
                  🔭 Organized stargazing events
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Philosophy Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <div className={`p-12 rounded-2xl border-2 text-center ${
            isDark 
              ? 'bg-gradient-to-br from-slate-900/70 to-purple-900/30 border-purple-500/30' 
              : 'bg-gradient-to-br from-slate-50 to-purple-50 border-purple-300'
          }`}>
            <div className="text-5xl mb-6">🎯</div>
            <h2 className={`text-3xl font-serif font-bold mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              The Common Thread
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              Whether I'm optimizing a Dota draft, holding a human flag, calculating chess tactics, 
              or selecting DFT functionals—it's all about pattern recognition, systematic improvement, 
              and understanding complex systems. Nanotechnology chose me because I've always been 
              fascinated by how mastery develops at the intersection of different domains. 
              The best insights come from unexpected connections.
            </p>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className={`text-3xl font-serif font-bold text-center mb-12 ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}>
            Random Facts You Didn't Ask For
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "☕", fact: "Tea is my fuel of choice—optimal for both late-night DFT runs and intense Dota sessions" },
              { icon: "🎮", fact: "Can explain why certain Dota mechanics are mathematically optimal in three languages" },
              { icon: "🏋️", fact: "Treat progressive overload in the gym with the same rigor as experimental design" },
              { icon: "🎭", fact: "Voice acting lets me explore character psychology—useful for understanding human intelligence" },
              { icon: "🎨", fact: "Museums and galleries are where I spot patterns that later inspire research approaches" },
              { icon: "🌲", fact: "Love the outdoors—nature is the ultimate nanoscale engineer" },
              { icon: "📖", fact: "Keep a book journal to track insights across sci-fi, documentaries, and technical papers" },
              { icon: "🎲", fact: "Board games are just real-world optimization problems with friends" }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-xl border-2 flex items-start gap-4 transition-all hover:scale-105 ${
                isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-stone-200'
              }`}>
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <p className={`${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
                  {item.fact}
                </p>
              </div>
            ))}
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
              Let's Connect
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
              Whether you want to discuss DFT functionals, debate Dota meta, analyze chess openings, 
              trade calisthenics tips, or explore the nature of intelligence—I'm always up for deep conversations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:adseisem@uwaterloo.ca"
                className={`px-8 py-4 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl'
                }`}
              >
                📧 Get in Touch
              </a>
              <Link
                href="/projects"
                className={`px-8 py-4 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:scale-105 border-2 ${
                  isDark 
                    ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30' 
                    : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                🚀 View Projects
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
