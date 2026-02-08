'use client';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { mainIndexHistory } from '@/lib/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[var(--card-black)] border border-[var(--border-dark)] p-3 rounded-lg shadow-xl">
                <p className="text-[var(--text-muted)] text-xs mb-1">{label}</p>
                <p className="text-white font-mono font-bold">
                    {payload[0].value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
            </div>
        );
    }
    return null;
};

/**
 * IndexChart Component
 * Large area chart showing the main market index (S&P 500)
 * Mimics the "Market Summary" view from the reference image
 */
export default function IndexChart() {
    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mainIndexHistory} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="mainChartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                        interval={15}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                        tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fill="url(#mainChartGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
