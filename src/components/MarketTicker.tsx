'use client';

import { motion } from 'framer-motion';

export type MarketTickerItem = {
  symbol: string;
  price: number;
  changePercent: number;
};

function TickerItem({ item }: { item: MarketTickerItem }) {
  const isPositive = item.changePercent >= 0;

  return (
    <div className="flex items-center gap-3 px-6 py-3 whitespace-nowrap">
      <span className="font-semibold text-white text-sm">
        {item.symbol}
      </span>
      <span className="text-[var(--text-gray)] text-sm font-mono">
        {item.price.toLocaleString()}
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

export default function MarketTicker({
  data
}: {
  data?: MarketTickerItem[];
}) {
  if (!data) {
    return (
      <div className="w-full border-y border-[var(--border-dark)] bg-[var(--soft-black)] text-center text-[var(--text-muted)] py-4">
        Loading market ticker...
      </div>
    );
  }

  const doubledItems = [...data, ...data];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden border-y border-[var(--border-dark)] bg-[var(--soft-black)]"
    >
      <div className="animate-scroll flex">
        {doubledItems.map((item, index) => (
          <TickerItem
            key={`${item.symbol}-${index}`}
            item={item}
          />
        ))}
      </div>
    </motion.div>
  );
}
