'use client';

import { motion } from 'framer-motion';
import { majorIndices } from '@/lib/mockData';
import IndexChart from './IndexChart';

/**
 * MarketSummarySection Component
 * Combines the main Index Chart (S&P 500) with a side list of other major indices.
 * MIMICS: The "Market Summary" reference image layout.
 */
export default function MarketSummarySection() {
    return (
        <div className="card p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT COLUMN: Main Chart (S&P 500) */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-[#ef4444] flex items-center justify-center text-white font-bold text-sm">
                            500
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-bold text-white">S&P 500</h3>
                                <span className="text-[var(--text-muted)] text-sm uppercase tracking-wider">SPX</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold text-white">6,932.31</span>
                                <span className="text-[var(--text-muted)] text-sm">USD</span>
                                <span className="text-[var(--signal-green)] font-bold text-lg">+1.97%</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Component */}
                    <IndexChart />
                </div>

                {/* RIGHT COLUMN: Major Indices List */}
                <div className="w-full lg:w-[320px] border-l border-[var(--border-dark)] pl-0 lg:pl-8 pt-8 lg:pt-0">
                    <h3 className="text-lg font-bold text-white mb-6">Major indices</h3>
                    <div className="space-y-6">
                        {majorIndices.slice(1).map((index) => {
                            const isPositive = index.change >= 0;
                            return (
                                <motion.div
                                    key={index.symbol}
                                    whileHover={{ x: 5 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            {/* Simple Circle Logo Placeholder */}
                                            <div className="w-8 h-8 rounded-full bg-[var(--border-subtle)] flex items-center justify-center text-[10px] text-white">
                                                {index.symbol.substring(0, 2)}
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
                                                {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </p>
                                            <p className={`text-xs font-semibold ${isPositive ? 'text-[var(--signal-green)]' : 'text-[var(--signal-red)]'}`}>
                                                {isPositive ? '+' : ''}{index.change}%
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
