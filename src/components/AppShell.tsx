'use client';

import { Activity } from 'lucide-react';
import MarketTicker from '@/components/MarketTicker';

export default function AppShell({
  children,
  tickers,
}: {
  children: React.ReactNode;
  tickers?: any[];
}) {
  return (
    <main className="min-h-screen bg-[var(--pure-black)]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-dark)] bg-[var(--pure-black)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-2">
          <Activity className="w-6 h-6 text-[var(--accent-blue)]" />
          <span className="font-bold text-white text-lg">
            Market Dashboard
          </span>
        </div>
      </header>

      {/* TICKER */}
      <div className="pt-16">
        <MarketTicker data={tickers ?? []} />
      </div>

      {/* PAGE CONTENT */}
      <div>{children}</div>
    </main>
  );
}
