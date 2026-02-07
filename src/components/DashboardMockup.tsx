'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { chartData, behavioralAlerts } from '@/lib/mockData';

/**
 * DashboardMockup Component
 * Clean mockup dashboard for the Hero section
 */
export default function DashboardMockup() {
    const primaryAlert = behavioralAlerts[0];

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
        >
            {/* Main Dashboard Window */}
            <div className="card p-6 w-[400px] glow-blue-subtle">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--signal-red)]" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-[var(--signal-green)]" />
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-mono">EUR/USD • Live</span>
                </div>

                {/* Price Display */}
                <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white font-mono">1.0862</span>
                        <span className="text-[var(--signal-green)] text-sm font-semibold">+0.18%</span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">Last updated: Just now</span>
                </div>

                {/* Chart */}
                <div className="h-28 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.5} />
                                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <YAxis domain={['dataMin', 'dataMax']} hide />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#60a5fa"
                                strokeWidth={3}
                                fill="url(#chartGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Time Labels */}
                <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono">
                    <span>09:00</span>
                    <span>12:00</span>
                    <span>15:00</span>
                </div>
            </div>

            {/* Floating Alert Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-3 -right-3 card p-4 border-[var(--signal-red)]/30"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--signal-red)]/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-[var(--signal-red)]" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">{primaryAlert.message}</p>
                        <p className="text-xs text-[var(--text-muted)]">{primaryAlert.timestamp}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
