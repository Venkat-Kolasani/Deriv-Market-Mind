'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StockTable from './StockTable';

type TabType = 'volume' | 'gainers' | 'losers';
type CategoryType = 'stocks' | 'crypto' | 'forex';

export type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  marketCap?: number;
  volume?: number;
  signal?: string;
  trend?: number[];
};

interface MarketDataGridProps {
  category: CategoryType;
  data?: Record<CategoryType, MarketItem[]>;
}

export default function MarketDataGrid({
  category,
  data,
}: MarketDataGridProps) {
  const [activeTab, setActiveTab] = useState<TabType>('volume');

  // ===== GUARD =====
  if (!data || !data[category]) {
    return (
      <div className="text-center py-24 text-neutral-500">
        Loading market data…
      </div>
    );
  }

  // ===== SORT LOGIC =====
  const sortedData = [...data[category]].sort((a, b) => {
    switch (activeTab) {
      case 'gainers':
        return b.changePercent - a.changePercent;
      case 'losers':
        return a.changePercent - b.changePercent;
      case 'volume':
      default:
        return (b.volume ?? 0) - (a.volume ?? 0);
    }
  });

  return (
    <div className="w-full">
      {/* ================= TABS ================= */}
      <div className="flex gap-2 mb-6 border-b border-neutral-800 pb-1">
        <TabButton
          label="Highest Volume"
          active={activeTab === 'volume'}
          onClick={() => setActiveTab('volume')}
          color="blue"
        />
        <TabButton
          label="Top Gainers"
          active={activeTab === 'gainers'}
          onClick={() => setActiveTab('gainers')}
          color="green"
        />
        <TabButton
          label="Top Losers"
          active={activeTab === 'losers'}
          onClick={() => setActiveTab('losers')}
          color="red"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <StockTable stocks={sortedData} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-8 text-center">
        <button className="btn-secondary text-sm px-6 py-2">
          View Full Market Screener
        </button>
      </div>
    </div>
  );
}

/* ================= TAB BUTTON ================= */

function TabButton({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: 'blue' | 'green' | 'red';
}) {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
  };

  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        active ? 'text-white' : 'text-neutral-400 hover:text-white'
      }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="tab-indicator"
          className={`absolute bottom-[-5px] left-0 right-0 h-0.5 ${colorMap[color]}`}
        />
      )}
    </button>
  );
}
