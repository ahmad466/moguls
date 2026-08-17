'use client';

import { useState } from 'react';
import { ConnectWallet } from './ConnectWallet';

const LINKS = [
  { href: '/floor#about', label: 'ABOUT' },
  { href: '/floor#roster', label: 'ROSTER' },
  { href: '/staking', label: 'STAKING' },
  { href: '/floor#roadmap', label: 'ROADMAP' },
  { href: '/floor#faq', label: 'FAQ' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b-4 border-exbr-line relative">
      <div className="flex items-center justify-between flex-wrap px-4 md:px-10 py-4 md:py-7 gap-3">
        <a href="/" className="font-pixel text-lg md:text-2xl tracking-wider">
          MOG<span className="text-exbr-amber">ULS</span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-pixel text-xs text-white/70">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-exbr-amber transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <a
            href="/floor#whitelist"
            className="font-pixel text-[10px] bg-transparent text-exbr-amber px-3 md:px-4 py-3 border-4 border-exbr-amber hover:bg-exbr-amber hover:text-black transition-colors whitespace-nowrap flex-shrink-0"
          >
            APPLY WL
          </a>
          <ConnectWallet />

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden font-pixel text-xs bg-transparent text-white px-3 py-3 border-4 border-exbr-line flex-shrink-0"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t-4 border-exbr-line bg-exbr-panel flex flex-col">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-pixel text-xs text-white/80 px-6 py-4 border-b-4 border-exbr-line last:border-b-0 hover:text-exbr-amber hover:bg-exbr-bg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
