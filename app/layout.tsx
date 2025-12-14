import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import Auth from '@/components/Auth'; // We will update Auth to handle checking auth state

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BioScholar - Expert Biology Prep',
  description: 'Master Biology from Freshman to Senior level.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col`}>
        {/* Global Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">BioScholar</span>
            </Link>
            
            <div className="flex items-center gap-4">
               {/* We wrap Auth in a client component wrapper or handle it there */}
               <Auth />
            </div>
          </div>
        </header>

        <main className="flex-1 bg-slate-50">
          {children}
        </main>

        <footer className="bg-white border-t border-slate-200 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} BioScholar. Designed by Akin S. Sokpah.</p>
                <p className="mt-2 text-xs">Educational content provided for biology students.</p>
            </div>
        </footer>
      </body>
    </html>
  );
}