'use client';

import { motion } from 'framer-motion';

type TickerItem = {
  symbol: string;
  price: number;
  changePercent: number;
};

function TickerItemRow({ item }: { item: TickerItem }) {
  const isPositive = item.changePercent >= 0;

  return (
    <div className="flex items-center gap-3 px-6 py-3 whitespace-nowrap">
      <span className="font-semibold text-white text-sm">{item.symbol}</span>
      <span className="text-gray-400 text-sm font-mono">
        {item.price.toFixed(2)}
      </span>
      <span
        className={`text-sm font-semibold ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isPositive ? '+' : ''}
        {item.changePercent.toFixed(2)}%
      </span>
    </div>
  );
}

export default function MarketTicker({
  data = [],
}: {
  data: TickerItem[];
}) {
  const doubledItems = [...data, ...data];

  if (data.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden border-y border-neutral-800 bg-black"
    >
      <div className="animate-scroll flex">
        {doubledItems.map((item, index) => (
          <TickerItemRow key={index} item={item} />
        ))}
      </div>
    </motion.div>
  );
}
