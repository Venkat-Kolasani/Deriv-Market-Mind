'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StockTable from './StockTable';

type TabType = 'gainers' | 'losers' | 'volume';
type CategoryType = 'stocks' | 'crypto' | 'forex';

/**
 * TYPE DATA DARI API
 */
export type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume?: number;
};

interface MarketDataGridProps {
  category: CategoryType;
  data?: Record<CategoryType, MarketItem[]>;
}

export default function MarketDataGrid({
  category,
  data
}: MarketDataGridProps) {
  const [activeTab, setActiveTab] = useState<TabType>('volume');

  // === HANDLE LOADING ===
  if (!data || !data[category]) {
    return (
      <div className="card p-6 text-[var(--text-muted)]">
        Loading market data...
      </div>
    );
  }

  /**
   * FILTER / SORT DATA BASED ON TAB
   */
  const getActiveData = () => {
    const sourceData = [...data[category]];

    switch (activeTab) {
      case 'gainers':
        return sourceData.sort(
          (a, b) => b.changePercent - a.changePercent
        );
      case 'losers':
        return sourceData.sort(
          (a, b) => a.changePercent - b.changePercent
        );
      case 'volume':
      default:
        return sourceData.sort(
          (a, b) => (b.volume ?? 0) - (a.volume ?? 0)
        );
    }
  };

  return (
    <div className="w-full">
      {/* TAB CONTROLS */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--border-dark)] pb-1">
        <button
          onClick={() => setActiveTab('volume')}
          className={`px-4 py-2 text-sm font-medium relative ${
            activeTab === 'volume'
              ? 'text-white'
              : 'text-[var(--text-muted)] hover:text-white'
          }`}
        >
          Highest Volume
          {activeTab === 'volume' && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[var(--accent-blue)]"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('gainers')}
          className={`px-4 py-2 text-sm font-medium relative ${
            activeTab === 'gainers'
              ? 'text-white'
              : 'text-[var(--text-muted)] hover:text-white'
          }`}
        >
          Top Gainers
          {activeTab === 'gainers' && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[var(--signal-green)]"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('losers')}
          className={`px-4 py-2 text-sm font-medium relative ${
            activeTab === 'losers'
              ? 'text-white'
              : 'text-[var(--text-muted)] hover:text-white'
          }`}
        >
          Top Losers
          {activeTab === 'losers' && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[var(--signal-red)]"
            />
          )}
        </button>
      </div>

      {/* TABLE CONTENT */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <StockTable stocks={getActiveData()} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <button className="btn-secondary text-sm px-6 py-2">
          View Full Market Screener
        </button>
      </div>
    </div>
  );
}
