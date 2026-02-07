'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, BarChart2, TrendingUp } from 'lucide-react';
import MarketTicker from '@/components/MarketTicker';
import FeatureCard from '@/components/FeatureCard';
import DashboardMockup from '@/components/DashboardMockup';
import MarketSummarySection from '@/components/MarketSummarySection';
import MarketDataGrid from '@/components/MarketDataGrid';
import { features } from '@/lib/mockData';

/**
 * Deriv Market Mind - Landing Page
 * 
 * "Informed" Design Update:
 * - Detailed Market Dashboard showing S&P 500 and global indices
 * - "Highest Volume" and "Trending" stock grids
 * - Pure Black aesthetic
 */
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'stocks' | 'crypto' | 'forex'>('stocks');

  return (
    <main className="min-h-screen bg-[var(--pure-black)] selection:bg-[var(--accent-blue)] selection:text-white">
      {/* ========== HEADER ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-dark)] bg-[var(--pure-black)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[var(--accent-blue)]" />
            <span className="font-bold text-white text-lg tracking-tight">Deriv Market Mind</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-[var(--text-gray)] hover:text-white transition-colors">Analysis</a>
            <a href="#" className="text-sm font-medium text-[var(--text-gray)] hover:text-white transition-colors">Markets</a>
            <a href="#" className="text-sm font-medium text-[var(--text-gray)] hover:text-white transition-colors">Behavioral</a>
          </nav>
          <button className="btn-primary text-sm px-5 py-2">
            Get Started
          </button>
        </div>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent-blue)]/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--signal-green)]/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--card-black)] mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span className="text-xs font-medium text-[var(--text-white)]">Next-Gen Intelligent Analysis</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                Market analysis <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-gray)] to-[var(--text-muted)]">
                  without the noise.
                </span>
              </h1>

              <p className="text-xl text-[var(--text-gray)] leading-relaxed mb-10 max-w-xl font-light">
                The only platform that tracks real-time market data AND your trading behavior to prevent emotional decisions.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary text-base px-8 py-3.5 shadow-lg shadow-blue-500/20"
                >
                  Start Analysis
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary text-base px-8 py-3.5"
                >
                  View Live Demo
                </motion.button>
              </div>

              {/* Stats - Horizontal Bar */}
              <div className="mt-16 pt-8 border-t border-[var(--border-dark)] grid grid-cols-3 gap-8">
                <div>
                  <p className="text-2xl font-bold text-white font-mono">2.1B</p>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Daily Volume</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-mono">50k+</p>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--signal-green)] font-mono">99.9%</p>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Uptime</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <div className="hidden lg:flex justify-center perspective-1000">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ========== MARKET TICKER ========== */}
      <MarketTicker />

      {/* ========== MARKET DASHBOARD ========== */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[var(--accent-blue)]/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <BarChart2 className="w-8 h-8 text-[var(--accent-blue)]" />
                Market Dashboard
              </h2>
              <p className="text-[var(--text-muted)] text-lg">
                Real-time global market intelligence.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => setActiveCategory('stocks')}
                className={`px-4 py-2 text-sm font-medium transition-colors border rounded-lg ${activeCategory === 'stocks'
                    ? 'bg-[var(--card-black)] text-white border-[var(--accent-blue)]'
                    : 'text-[var(--text-muted)] border-transparent hover:text-white'
                  }`}
              >
                Stocks
              </button>
              <button
                onClick={() => setActiveCategory('crypto')}
                className={`px-4 py-2 text-sm font-medium transition-colors border rounded-lg ${activeCategory === 'crypto'
                    ? 'bg-[var(--card-black)] text-white border-[var(--accent-blue)]'
                    : 'text-[var(--text-muted)] border-transparent hover:text-white'
                  }`}
              >
                Crypto
              </button>
              <button
                onClick={() => setActiveCategory('forex')}
                className={`px-4 py-2 text-sm font-medium transition-colors border rounded-lg ${activeCategory === 'forex'
                    ? 'bg-[var(--card-black)] text-white border-[var(--accent-blue)]'
                    : 'text-[var(--text-muted)] border-transparent hover:text-white'
                  }`}
              >
                Forex
              </button>
            </div>
          </div>

          {/* Main Market Summary (Chart + Sidebar) */}
          <div className="mb-16">
            <MarketSummarySection />
          </div>

          {/* Data Grids */}
          <div>
            <MarketDataGrid category={activeCategory} />
          </div>
        </div>
      </section>

      {/* ========== SOLUTIONS ========== */}
      <section className="py-32 px-6 border-t border-[var(--border-dark)] bg-gradient-to-b from-[var(--pure-black)] to-[var(--soft-black)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why <span className="text-[var(--accent-blue)]">Deriv Market Mind?</span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
              Most platforms give you data. We give you clarity. Our AI interprets market moves and monitors your psychology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon as 'brain' | 'shield' | 'share'}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-16 px-6 border-t border-[var(--border-dark)] bg-[var(--card-black)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[var(--accent-blue)]" />
            <span className="font-bold text-white text-lg">Deriv Market Mind</span>
          </div>
          <div className="flex gap-8 text-sm text-[var(--text-muted)]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-xs text-center md:text-right leading-relaxed">
            Not financial advice. <br />© 2026 Deriv Market Mind.
          </p>
        </div>
      </footer>
    </main>
  );
}
