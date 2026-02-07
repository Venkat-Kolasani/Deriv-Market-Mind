'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, BarChart2 } from 'lucide-react';

import MarketTicker from '@/components/MarketTicker';
import FeatureCard from '@/components/FeatureCard';
import DashboardMockup from '@/components/DashboardMockup';
import MarketSummarySection from '@/components/MarketSummarySection';
import MarketDataGrid from '@/components/MarketDataGrid';
import { features } from '@/lib/mockData';

export default function Home() {
  // ===== UI STATE (SUDAH ADA) =====
  const [activeCategory, setActiveCategory] =
    useState<'stocks' | 'crypto' | 'forex'>('stocks');

  // ===== API STATE (TASK KAU) =====
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ===== FETCH DATA DARI API =====
  useEffect(() => {
    async function fetchMarketData() {
      try {
        const res = await fetch('http://localhost:4000/api/market/overview');
        if (!res.ok) throw new Error('API error');

        const data = await res.json();
        setMarketData(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketData();
  }, []);

  // ===== UI BEHAVIOUR =====
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading market data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Failed to load market data
      </div>
    );
  }

  // ===== MAIN UI (TIDAK DIUBAH) =====
  return (
    <main className="min-h-screen bg-[var(--pure-black)]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-dark)] bg-[var(--pure-black)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[var(--accent-blue)]" />
            <span className="font-bold text-white text-lg">
              Deriv Market Mind
            </span>
          </div>
          <button className="btn-primary text-sm px-5 py-2">
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Market analysis <br /> without the noise.
              </h1>
              <p className="text-xl text-[var(--text-gray)] mb-10">
                Real-time market data with behavioral insight.
              </p>
            </motion.div>
            <div className="hidden lg:flex justify-center">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* MARKET TICKER */}
      <MarketTicker data={marketData?.tickers} />

      {/* MARKET DASHBOARD */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart2 className="w-8 h-8 text-[var(--accent-blue)]" />
              Market Dashboard
            </h2>
            <div className="flex gap-2">
              {['stocks', 'crypto', 'forex'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-4 py-2 text-sm border rounded-lg ${
                    activeCategory === cat
                      ? 'text-white border-blue-500'
                      : 'text-gray-400'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <MarketSummarySection data={marketData?.summary} />

          <MarketDataGrid
            category={activeCategory}
            data={marketData?.grid}
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
