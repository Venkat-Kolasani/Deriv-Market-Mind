'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mainIndexHistory } from '@/lib/mockData';
import { Brain, BookOpen } from 'lucide-react';

export default function TradingChart() {
    return (
        <div className="w-full h-full p-4 bg-[var(--card-black)] rounded-xl border border-[var(--border-dark)] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--signal-green)] animate-pulse"></span>
                        EUR/USD
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">Euro / US Dollar</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Action Buttons (Compliance: No Buy/Sell) */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-blue)] hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20">
                            <Brain className="w-3.5 h-3.5" />
                            ANALYZE
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-[var(--soft-black)] hover:bg-[var(--border-dark)] text-[var(--text-gray)] hover:text-white border border-[var(--border-dark)] text-xs font-bold rounded-lg transition-colors">
                            <BookOpen className="w-3.5 h-3.5" />
                            JOURNAL
                        </button>
                    </div>

                    {/* Timeframes */}
                    <div className="flex gap-1 bg-[var(--soft-black)] p-1 rounded-lg border border-[var(--border-dark)]">
                        {['1H', '4H', '1D', '1W'].map((tf) => (
                            <button key={tf} className={`px-2 py-1 text-[10px] font-medium rounded ${tf === '1H' ? 'bg-[var(--card-black)] text-white shadow-sm' : 'text-[var(--text-muted)] hover:text-white'}`}>
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mainIndexHistory}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis domain={['auto', 'auto']} orientation="right" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                            itemStyle={{ color: '#3b82f6' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
