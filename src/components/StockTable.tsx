'use client';

import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StockTableProps {
  stocks?: any[];
}

export default function StockTable({ stocks = [] }: StockTableProps) {
  // ===== DEFENSIVE GUARD =====
  if (!Array.isArray(stocks) || stocks.length === 0) {
    return (
      <div className="p-6 text-center text-[var(--text-muted)]">
        No market data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-dark)] text-xs text-[var(--text-muted)] uppercase tracking-wider">
            <th className="py-4 pl-4 font-medium">Symbol</th>
            <th className="py-4 font-medium">Price</th>
            <th className="py-4 font-medium">Change</th>
            <th className="py-4 font-medium hidden md:table-cell">
              Mkt Cap
            </th>
            <th className="py-4 font-medium hidden md:table-cell">
              Volume
            </th>
            <th className="py-4 font-medium hidden lg:table-cell">
              Signal
            </th>
            <th className="py-4 pr-4 font-medium w-[120px]">
              Trend
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {stocks.map((stock, index) => {
            const isPositive = (stock.changePercent ?? 0) >= 0;
            const chartColor = isPositive ? '#22c55e' : '#ef4444';

            // ===== SAFE FALLBACKS =====
            const sparkline =
              stock.sparkline && stock.sparkline.length > 0
                ? stock.sparkline
                : [stock.price, stock.price];

            const chartData = sparkline.map((value: number, i: number) => ({
              value,
              i
            }));

            const signal = stock.signal ?? 'Neutral';

            return (
              <motion.tr
                key={stock.symbol}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group border-b border-[var(--border-dark)] hover:bg-[var(--card-black)] transition-colors cursor-pointer"
              >
                {/* SYMBOL */}
                <td className="py-4 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--border-subtle)] flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-[var(--accent-blue)] transition-colors">
                      {stock.symbol?.[0] ?? '?'}
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        {stock.symbol}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] hidden sm:block truncate max-w-[100px]">
                        {stock.name ?? '—'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* PRICE */}
                <td className="py-4 font-mono text-white">
                  $
                  {stock.price?.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  }) ?? '0.00'}
                </td>

                {/* CHANGE */}
                <td className="py-4">
                  <div
                    className={`flex items-center gap-1 font-semibold ${isPositive
                      ? 'text-[var(--signal-green)]'
                      : 'text-[var(--signal-red)]'
                      }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(stock.changePercent ?? 0).toFixed(2)}%
                  </div>
                </td>

                {/* MARKET CAP */}
                <td className="py-4 text-[var(--text-gray)] hidden md:table-cell">
                  {stock.marketCap ?? '—'}
                </td>

                {/* VOLUME */}
                <td className="py-4 text-[var(--text-gray)] hidden md:table-cell">
                  {stock.volume?.toLocaleString() ?? '—'}
                </td>

                {/* SIGNAL */}
                <td className="py-4 hidden lg:table-cell">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${signal.includes('Buy')
                      ? 'bg-green-900/20 text-green-400 border-green-900/50'
                      : signal.includes('Sell')
                        ? 'bg-red-900/20 text-red-400 border-red-900/50'
                        : 'bg-gray-800 text-gray-400 border-gray-700'
                      }`}
                  >
                    {signal}
                  </span>
                </td>

                {/* TREND CHART */}
                <td className="py-4 pr-4">
                  <div className="h-8 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={chartColor}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
