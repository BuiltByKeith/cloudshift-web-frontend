'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About Us' },
  { href: '/careers',  label: 'Careers' },
  { href: '/contact',  label: 'Contact Us' },
  { href: '/blogs',    label: 'Blogs' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // collapse the drawer when navigating
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <header
        className={[
          'cs-island pointer-events-auto w-full transition-all duration-500 ease-out',
          open ? 'rounded-[1.75rem]' : 'rounded-full',
          scrolled ? 'cs-island-solid max-w-6xl' : 'max-w-7xl',
        ].join(' ')}
      >
        <div
          className={[
            'flex items-center justify-between gap-4 transition-all duration-500 ease-out',
            scrolled ? 'px-4 py-2.5 sm:px-5' : 'px-5 py-3.5 sm:px-7',
          ].join(' ')}
        >
          {/* brand + links, grouped left */}
          <div className="flex min-w-0 items-center gap-7">
            <Link href="/" aria-label="CloudShift — home" className="shrink-0 pl-1.5">
              <Image
                src="/images/cloudshift.png"
                alt="CloudShift"
                width={691}
                height={120}
                priority
                className={`w-auto transition-all duration-500 ease-out ${
                  scrolled ? 'h-7' : 'h-8 sm:h-9'
                }`}
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-4 py-2 text-[15px] transition-colors ${
                      active
                        ? 'bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                        : 'text-slate-300 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* CTA, far right */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={[
                'hidden rounded-full bg-gradient-to-b from-[#6d92ff] to-brand font-semibold text-white',
                'shadow-[0_12px_26px_-12px_rgba(79,124,255,1)] transition-all',
                'hover:-translate-y-0.5 hover:to-brand-hover sm:inline-block',
                scrolled ? 'px-5 py-2 text-sm' : 'px-6 py-2.5 text-[15px]',
              ].join(' ')}
            >
              Collaborate with us
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/6 text-slate-100 transition-colors hover:bg-white/12 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* the island expands downward on mobile */}
        <div
          className={`grid overflow-hidden transition-all duration-500 ease-out lg:hidden ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <nav className="min-h-0">
            <div className="flex flex-col gap-1 px-3 pb-3 pt-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2.5 text-sm transition-colors ${
                    pathname === item.href
                      ? 'bg-white/12 text-white'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-1 rounded-full bg-gradient-to-b from-[#6d92ff] to-brand px-4 py-2.5 text-center text-sm font-semibold text-white sm:hidden"
              >
                Collaborate with us
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
