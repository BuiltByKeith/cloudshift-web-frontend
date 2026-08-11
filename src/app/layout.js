import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'CloudShift',
  description: 'CloudShift corporate site',
};

const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About Us' },
  { href: '/careers',  label: 'Careers' },
  { href: '/contact',  label: 'Contact Us' },
  { href: '/blogs',    label: 'Blogs' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-ink font-sans text-slate-100 antialiased">
        <SiteHeader />
        {/* the island is fixed, so reserve its height; the hero pulls back up under it */}
        <div aria-hidden="true" className="h-[var(--cs-header-h)]" />

        {children}

        <footer className="mt-10 border-t border-white/8 bg-ink-soft">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7 text-sm text-slate-400">
            <span>© {new Date().getFullYear()} CloudShift. All rights reserved.</span>
            <nav className="flex flex-wrap gap-4">
              {NAV.map(item => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-100">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}