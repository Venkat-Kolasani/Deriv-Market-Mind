'use client';

import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { type StockItem } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StockTableProps {
    stocks: StockItem[];
}

export default function StockTable({ stocks }: StockTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-dark)] text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        <th className="py-4 pl-4 font-medium">Symbol</th>
                        <th className="py-4 font-medium">Price</th>
                        <th className="py-4 font-medium">Change</th>
                        <th className="py-4 font-medium hidden md:table-cell">Mkt Cap</th>
                        <th className="py-4 font-medium hidden md:table-cell">Volume</th>
                        <th className="py-4 font-medium hidden lg:table-cell">Signal</th>
                        <th className="py-4 pr-4 font-medium w-[120px]">Trend</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {stocks.map((stock, index) => {
                        const isPositive = stock.changePercent >= 0;
                        const chartColor = isPositive ? '#22c55e' : '#ef4444';
                        const chartData = stock.sparkline.map((value, i) => ({ value, i }));

                        return (
                            <motion.tr
                                key={stock.symbol}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group border-b border-[var(--border-dark)] hover:bg-[var(--card-black)] transition-colors cursor-pointer"
                            >
                                {/* Symbol & Name */}
                                <td className="py-4 pl-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[var(--border-subtle)] flex items-center justify-center text-[10px] font-bold text-white shrink-0 group-hover:bg-[var(--accent-blue)] transition-colors">
                                            {stock.symbol[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{stock.symbol}</p>
                                            <p className="text-xs text-[var(--text-muted)] hidden sm:block truncate max-w-[100px]">
                                                {stock.name}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="py-4 font-mono text-white">
                                    ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>

                                {/* Change */}
                                <td className="py-4">
                                    <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-[var(--signal-green)]' : 'text-[var(--signal-red)]'}`}>
                                        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {Math.abs(stock.changePercent).toFixed(2)}%
                                    </div>
                                </td>

                                {/* Market Cap */}
                                <td className="py-4 text-[var(--text-gray)] hidden md:table-cell">
                                    {stock.marketCap}
                                </td>

                                {/* Volume */}
                                <td className="py-4 text-[var(--text-gray)] hidden md:table-cell">
                                    {stock.volume}
                                </td>

                                {/* Signal Badge */}
                                <td className="py-4 hidden lg:table-cell">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border
                     ${stock.signal.includes('Buy')
                                            ? 'bg-green-900/20 text-green-400 border-green-900/50'
                                            : stock.signal.includes('Sell')
                                                ? 'bg-red-900/20 text-red-400 border-red-900/50'
                                                : 'bg-gray-800 text-gray-400 border-gray-700'
                                        }
                   `}>
                                        {stock.signal}
                                    </span>
                                </td>

                                {/* Trend Chart */}
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
