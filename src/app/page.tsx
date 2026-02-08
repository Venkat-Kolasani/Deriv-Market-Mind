'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2 } from 'lucide-react';

import MarketTicker from '@/components/MarketTicker';
import FeatureCard from '@/components/FeatureCard';
import DashboardMockup from '@/components/DashboardMockup';
import MarketSummarySection from '@/components/MarketSummarySection';
import MarketDataGrid from '@/components/MarketDataGrid';
import { features } from '@/lib/mockData';

type Category = 'stocks' | 'crypto' | 'forex';

export default function Home() {
  // ================= STATE =================
  const [activeCategory, setActiveCategory] =
    useState<Category>('stocks');

  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const pricesRef = useRef<Record<string, number>>({});

  // ================= SYMBOL DEFINITIONS =================
  const symbols = {
    stocks: [
      { name: 'NASDAQ Composite', symbol: 'R_100' },
      { name: 'Apple Inc.', symbol: 'R_10' },
      { name: 'Microsoft Corp.', symbol: 'R_25' },
      { name: 'Starbucks', symbol: 'R_50' },
      { name: 'S&P 500', symbol: 'R_75' }
    ],
    crypto: [
      { name: 'BTC/USD', symbol: 'cryBTCUSD' },
      { name: 'ETH/USD', symbol: 'cryETHUSD' },
      { name: 'LTC/USD', symbol: 'cryLTCUSD' },
      { name: 'BCH/USD', symbol: 'cryBCHUSD' },
      { name: 'XRP/USD', symbol: 'cryXRPUSD' }
    ],
    forex: [
      { name: 'EUR/USD', symbol: 'frxEURUSD' },
      { name: 'GBP/USD', symbol: 'frxGBPUSD' },
      { name: 'USD/JPY', symbol: 'frxUSDJPY' },
      { name: 'AUD/USD', symbol: 'frxAUDUSD' },
      { name: 'USD/CHF', symbol: 'frxUSDCHF' }
    ]
  };

  // ================= MAIN ASSET PER CATEGORY =================
  const MAIN_ASSET = {
    stocks: {
      name: 'NASDAQ Composite',
      symbol: 'NASDAQ',
      key: 'R_100'
    },
    crypto: {
      name: 'Bitcoin',
      symbol: 'BTC/USD',
      key: 'cryBTCUSD'
    },
    forex: {
      name: 'EUR / USD',
      symbol: 'EUR/USD',
      key: 'frxEURUSD'
    }
  };

  // ================= WEBSOCKET =================
  useEffect(() => {
    const ws = new WebSocket(
      'wss://ws.derivws.com/websockets/v3?app_id=1089'
    );

    ws.onopen = () => {
      [...symbols.stocks, ...symbols.crypto, ...symbols.forex].forEach(
        (item) => {
          ws.send(
            JSON.stringify({
              ticks: item.symbol,
              subscribe: 1
            })
          );
        }
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (!data.tick) return;

      pricesRef.current[data.tick.symbol] = data.tick.quote;
      setDataReady(true);
      setLoading(false);
    };
    return () => ws.close();
  }, []);

  // ================= BUILD UI DATA =================
  useEffect(() => {
    if (!dataReady) return;

    const main = MAIN_ASSET[activeCategory];

    setMarketData({
      tickers: [
        ...symbols.stocks,
        ...symbols.crypto,
        ...symbols.forex
      ].map((item) => ({
        symbol: item.name,
        price: pricesRef.current[item.symbol] ?? 0,
        changePercent: 0
      })),

      summary: {
        mainIndex: {
          name: main.name,
          symbol: main.symbol,
          value: pricesRef.current[main.key] ?? 0,
          change: 0
        },
        majorIndices: (
          activeCategory === 'stocks'
            ? symbols.stocks
            : activeCategory === 'crypto'
              ? symbols.crypto
              : symbols.forex
        ).map((item) => ({
          symbol: item.name, // ✅ FIXED (display name)
          value: pricesRef.current[item.symbol] ?? 0,
          change: 0
        }))
      },

      grid: {
        stocks: symbols.stocks.map((s) => ({
          symbol: s.name,
          name: s.name,
          price: pricesRef.current[s.symbol] ?? 0,
          changePercent: 0
        })),
        crypto: symbols.crypto.map((c) => ({
          symbol: c.name,
          name: c.name,
          price: pricesRef.current[c.symbol] ?? 0,
          changePercent: 0
        })),
        forex: symbols.forex.map((f) => ({
          symbol: f.name,
          name: f.name,
          price: pricesRef.current[f.symbol] ?? 0,
          changePercent: 0
        }))
      }
    });
  }, [activeCategory, dataReady]);

  // ================= UI STATES =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading market data...
      </div>
    );
  }

  // ================= UI =================
  return (
    <main className="min-h-screen bg-[var(--pure-black)]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-dark)] bg-[var(--pure-black)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[var(--accent-blue)]" />
            <span className="font-bold text-white text-lg">
              Market Dashboard
            </span>
          </div>
          <a
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/80 text-white font-medium rounded-lg transition-all"
          >
            <BarChart2 className="w-4 h-4" />
            Dashboard
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Market analysis <br /> without the noise.
              </h1>
              <p className="text-xl text-[var(--text-gray)] mb-10">
                Real-time market data powered by Deriv.
              </p>
            </motion.div>
            <div className="hidden lg:flex justify-center">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <MarketTicker data={marketData?.tickers} />

      {/* DASHBOARD */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart2 className="w-8 h-8 text-[var(--accent-blue)]" />
              Market Overview
            </h2>

            <div className="flex gap-2">
              {(['stocks', 'crypto', 'forex'] as Category[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-sm border rounded-lg ${activeCategory === cat
                        ? 'text-white border-blue-500'
                        : 'text-gray-400'
                      }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                )
              )}
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

          <FeatureCard
            title="Smart Market Analysis"
            description="We explain price moves in plain English..."
            icon="brain"
            href="/smart-market-analysis"
            delay={0}
          />

          <FeatureCard
            title="Behavioral Nudges"
            description="Detect emotional trading before it hurts you..."
            icon="shield"
            href="/behavioural-nudges"
            delay={0.1}
          />

          <FeatureCard
            title="Social Auto-Pilot"
            description="Turn insights into viral trading content..."
            icon="share"
            href="/social-auto-pilot"
            delay={0.2}
          />

        </div>
      </section>
    </main>
  );
}
