'use client';

import { motion } from 'framer-motion';

/**
 * TYPE DATA (dari API)
 */
export type MarketTickerItem = {
  symbol: string;
  price: number;
  changePercent: number;
};

/**
 * TickerItem Component
 */
function TickerItem({ item }: { item: MarketTickerItem }) {
  const isPositive = item.changePercent >= 0;

  return (
    <div className="flex items-center gap-3 px-6 py-3 whitespace-nowrap">
      <span className="font-semibold text-white text-sm">
        {item.symbol}
      </span>

      <span className="text-[var(--text-gray)] text-sm font-mono">
        {item.price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: item.price > 1000 ? 2 : 4
        })}
      </span>

      <span
        className={`text-sm font-semibold ${
          isPositive
            ? 'text-[var(--signal-green)]'
            : 'text-[var(--signal-red)]'
        }`}
      >
        {isPositive ? '+' : ''}
        {item.changePercent.toFixed(2)}%
      </span>
    </div>
  );
}

/**
 * MarketTicker Component
 * NOW: API-driven (no mock data)
 */
export default function MarketTicker({
  data
}: {
  data?: MarketTickerItem[];
}) {
  // Handle loading / empty state
  if (!data || data.length === 0) {
    return (
      <div className="border-y border-[var(--border-dark)] bg-[var(--soft-black)] px-6 py-3 text-sm text-[var(--text-muted)]">
        Loading market tickers...
      </div>
    );
  }

  // Duplicate items for infinite scroll
  const doubledItems = [...data, ...data];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5
