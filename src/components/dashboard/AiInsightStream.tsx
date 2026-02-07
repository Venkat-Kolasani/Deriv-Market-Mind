'use client';
import { aiInsights, type AiInsight } from '@/lib/mockData';
import { Brain, Send } from 'lucide-react';

export default function AiInsightStream() {
    return (
        <div className="bg-[var(--card-black)] rounded-xl border border-[var(--border-dark)] flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[var(--border-dark)] flex items-center gap-2 bg-[var(--soft-black)]/30 backdrop-blur-sm">
                <Brain className="w-5 h-5 text-[var(--accent-blue)]" />
                <h3 className="font-bold text-white text-sm">AI Analyst</h3>
            </div>

            {/* Stream Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--border-subtle)]">
                {aiInsights.map((insight: AiInsight) => (
                    <div
                        key={insight.id}
                        className={`p-3 rounded-lg border-l-4 transition-all hover:scale-[1.02] cursor-pointer ${insight.type === 'warning'
                                ? 'bg-orange-500/5 border-orange-500 shadow-[0_4px_20px_-5px_rgba(249,115,22,0.1)]'
                                : 'bg-blue-500/5 border-blue-500 shadow-[0_4px_20px_-5px_rgba(59,130,246,0.1)]'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-xs font-bold uppercase tracking-wider ${insight.type === 'warning' ? 'text-orange-400' : 'text-blue-400'}`}>
                                {insight.title}
                            </h4>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono">{insight.timestamp}</span>
                        </div>
                        <p className="text-xs text-[var(--text-gray)] leading-relaxed mt-1">
                            {insight.content}
                        </p>
                    </div>
                ))}

                {/* Typing Indicator Mock */}
                <div className="flex items-center gap-1 px-2 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-[var(--border-dark)] relative">
                <input
                    type="text"
                    placeholder="Ask AI Analysis..."
                    className="w-full bg-[var(--pure-black)] border border-[var(--border-dark)] rounded-lg px-4 py-2.5 text-sm text-white focus:border-[var(--accent-blue)] outline-none pr-10 transition-colors"
                />
                <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-gray)] hover:text-[var(--accent-blue)] transition-colors">
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
