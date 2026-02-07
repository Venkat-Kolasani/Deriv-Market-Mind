'use client';

import { useEffect, useState } from 'react';
import { Activity, BarChart2 } from 'lucide-react';
import MarketTicker from '@/components/MarketTicker';
import MarketSummarySection from '@/components/MarketSummarySection';
import MarketDataGrid from '@/components/MarketDataGrid';

type MarketData = {
  ticker: any[];
  summary: any;
  grid: {
    stocks: any[];
    crypto: any[];
    forex: any[];
  };
};

export default function Home() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<'stocks' | 'crypto' | 'forex'>('stocks');

  // =========================
  // FETCH DATA FROM API
  // =========================
  useEffect(() => {
    async function fetchMarketData() {
      try {
        const res = await fetch('/api/market/overview');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setMarketData(data);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      }
    }

    fetchMarketData();
  }, []);

  // =========================
  // LOADING STATE
  // =========================
  if (!marketData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading market data...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-lg">Deriv Market Mind</span>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Market analysis <br />
          <span className="text-neutral-400">without the noise.</span>
        </h1>
        <p className="text-neutral-400 max-w-xl mb-10">
          Real-time market data with behavioral intelligence to help traders
          avoid emotional decisions.
        </p>
      </section>

      {/* ================= MARKET TICKER ================= */}
      <MarketTicker data={marketData.ticker} />

      {/* ================= DASHBOARD ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <BarChart2 className="text-blue-500" />
              Market Dashboard
            </h2>
            <p className="text-neutral-400">
              Real-time global market intelligence.
            </p>
          </div>

          <div className="flex gap-2">
            {(['stocks', 'crypto', 'forex'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded text-sm ${
                  activeCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <MarketSummarySection data={marketData.summary} />

        {/* DATA GRID */}
        <div className="mt-16">
          <MarketDataGrid
            category={activeCategory}
            data={marketData.grid}
          />
        </div>
      </section>
    </main>
  );
}
