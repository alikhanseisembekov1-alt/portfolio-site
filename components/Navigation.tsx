// components/Navigation.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ isDark }: { isDark: boolean }) {
  const pathname = usePathname();
  
// components/Navigation.tsx
const navItems = [
  { name: 'About', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'Projects', href: '/projects' }, // NEW!
  { name: 'Blog', href: '/blog' },
  { name: 'Experience', href: '/experience' },
  { name: 'Beyond the Lab', href: '/beyond' },

];


  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md ${
      isDark ? 'bg-slate-950/80 border-b border-slate-800' : 'bg-white/80 border-b border-stone-200'
    }`}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className={`text-xl font-serif font-bold ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}>
            Alikhan Seisembekov
          </Link>

          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-mono text-sm tracking-wide transition-colors ${
                    pathname === item.href
                      ? (isDark ? 'text-purple-400' : 'text-purple-600')
                      : (isDark ? 'text-gray-400 hover:text-purple-300' : 'text-stone-600 hover:text-purple-700')
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
