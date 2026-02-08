'use client';

import { motion } from 'framer-motion';
import IndexChart from './IndexChart';

/**
 * TYPE DATA DARI API
 */
export type MajorIndexItem = {
  symbol: string;
  value?: number;
  change?: number;
};

export type MarketSummaryData = {
  mainIndex?: {
    name?: string;
    symbol?: string;
    value?: number;
    change?: number;
  };
  majorIndices?: MajorIndexItem[];
};

/**
 * MarketSummarySection
 * Defensive & WebSocket-safe
 */
export default function MarketSummarySection({
  data
}: {
  data?: MarketSummaryData;
}) {
  // ===== FULL GUARD =====
  if (
    !data ||
    !data.mainIndex ||
    typeof data.mainIndex.value !== 'number'
  ) {
    return (
      <div className="card p-6 lg:p-8 text-[var(--text-muted)]">
        Loading market overview...
      </div>
    );
  }

  const main = data.mainIndex;

  return (
    <div className="card p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT: MAIN INDEX */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#ef4444] flex items-center justify-center text-white font-bold text-sm">
              IDX
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-white">
                  {main.name ?? '—'}
                </h3>
                <span className="text-[var(--text-muted)] text-sm uppercase tracking-wider">
                  {main.symbol ?? ''}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">
                  {(main.value ?? 0).toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}
                </span>

                <span className="text-[var(--text-muted)] text-sm">
                  USD
                </span>

                <span
                  className={`font-bold text-lg ${(main.change ?? 0) >= 0
                      ? 'text-[var(--signal-green)]'
                      : 'text-[var(--signal-red)]'
                    }`}
                >
                  {(main.change ?? 0) >= 0 ? '+' : ''}
                  {(main.change ?? 0).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* CHART */}
          <IndexChart />
        </div>

        {/* RIGHT: MAJOR INDICES */}
        <div className="w-full lg:w-[320px] border-l border-[var(--border-dark)] pl-0 lg:pl-8 pt-8 lg:pt-0">
          <h3 className="text-lg font-bold text-white mb-6">
            Major indices
          </h3>

          <div className="space-y-6">
            {(data.majorIndices ?? []).map((index) => {
              const value =
                typeof index.value === 'number' ? index.value : 0;
              const change = index.change ?? 0;
              const isPositive = change >= 0;

              return (
                <motion.div
                  key={index.symbol}
                  whileHover={{ x: 5 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--border-subtle)] flex items-center justify-center text-[10px] text-white">
                        {index.symbol.slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-bold text-sm text-white group-hover:text-[var(--accent-blue)] transition-colors">
                          {index.symbol}
                        </p>
                        <span className="text-[10px] bg-[var(--border-subtle)] text-[var(--text-muted)] px-1 rounded">
                          INDEX
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-sm text-white font-bold">
                        {value.toLocaleString('en-US', {
                          minimumFractionDigits: 2
                        })}
                      </p>

                      <p
                        className={`text-xs font-semibold ${isPositive
                            ? 'text-[var(--signal-green)]'
                            : 'text-[var(--signal-red)]'
                          }`}
                      >
                        {isPositive ? '+' : ''}
                        {change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-dark)]">
            <button className="text-[var(--accent-blue)] text-sm font-semibold hover:underline">
              See all major indices ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
