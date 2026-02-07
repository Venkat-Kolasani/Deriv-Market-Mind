'use client';

import { motion } from 'framer-motion';
import { marketTickerData, type MarketTickerItem } from '@/lib/mockData';

/**
 * TickerItem Component
 * Displays a single market instrument with price and change
 */
function TickerItem({ item }: { item: MarketTickerItem }) {
    const isPositive = item.changePercent >= 0;

    return (
        <div className="flex items-center gap-3 px-6 py-3 whitespace-nowrap">
            <span className="font-semibold text-white text-sm">{item.symbol}</span>
            <span className="text-[var(--text-gray)] text-sm font-mono">
                {item.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: item.price > 1000 ? 2 : 4
                })}
            </span>
            <span className={`text-sm font-semibold ${isPositive ? 'text-[var(--signal-green)]' : 'text-[var(--signal-red)]'}`}>
                {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
        </div>
    );
}

/**
 * MarketTicker Component
 * Horizontal infinite-scrolling bar showing live market data
 */
export default function MarketTicker() {
    // Double the items for seamless infinite scroll
    const doubledItems = [...marketTickerData, ...marketTickerData];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full overflow-hidden border-y border-[var(--border-dark)] bg-[var(--soft-black)]"
        >
            <div className="animate-scroll flex">
                {doubledItems.map((item, index) => (
                    <TickerItem key={`${item.symbol}-${index}`} item={item} />
                ))}
            </div>
        </motion.div>
    );
}
