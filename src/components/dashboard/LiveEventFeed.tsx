'use client';
import { liveEvents, type LiveEvent } from '@/lib/mockData';
import { TrendingUp, TrendingDown, Bell, Zap, Newspaper } from 'lucide-react';

export default function LiveEventFeed() {
    return (
        <div className="bg-[var(--card-black)] rounded-xl border border-[var(--border-dark)] flex flex-col h-full overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-dark)] bg-[var(--soft-black)]/30 backdrop-blur-sm flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--signal-red)] animate-pulse"></div>
                    <h3 className="font-bold text-sm text-white tracking-wide">Live Feed</h3>
                </div>
                <button className="text-[10px] text-[var(--accent-blue)] font-medium hover:underline">Filter</button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--border-subtle)]">
                {liveEvents.map((event: LiveEvent, index: number) => (
                    <div
                        key={event.id}
                        className={`flex items-start gap-3 p-3 border-b border-[var(--border-dark)]/50 hover:bg-[var(--soft-black)] transition-colors group cursor-pointer ${index === 0 ? 'bg-[var(--accent-blue)]/5' : ''
                            }`}
                    >
                        <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${event.type === 'uptrade' ? 'bg-green-500/10 text-green-500' :
                                event.type === 'downtrade' ? 'bg-red-500/10 text-red-500' :
                                    'bg-blue-500/10 text-blue-500'
                            }`}>
                            {event.type === 'uptrade' && <TrendingUp className="w-3.5 h-3.5" />}
                            {event.type === 'downtrade' && <TrendingDown className="w-3.5 h-3.5" />}
                            {event.type === 'news' && <Newspaper className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${event.type === 'uptrade' ? 'text-green-500' :
                                        event.type === 'downtrade' ? 'text-red-500' :
                                            'text-blue-500'
                                    }`}>{event.type}</span>
                                <span className="text-[10px] text-[var(--text-muted)] font-mono">{event.timestamp}</span>
                            </div>
                            <p className="text-xs text-[var(--text-gray)] group-hover:text-white transition-colors line-clamp-2">
                                {event.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
