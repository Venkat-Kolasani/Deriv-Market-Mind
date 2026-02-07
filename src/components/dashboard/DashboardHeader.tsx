'use client';

import { Bell, Search, Settings } from 'lucide-react';
import { userStats } from '@/lib/mockData';

export default function DashboardHeader() {
    return (
        <header className="h-16 border-b border-[var(--border-dark)] bg-[var(--card-black)]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Trigger Placeholder (Hidden on Desktop) */}
                <div className="lg:hidden w-8 h-8 bg-[var(--soft-black)] rounded-md"></div>

                {/* Search Bar */}
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Search symbol (e.g. EUR/USD)..."
                        className="pl-10 pr-4 py-2 bg-[var(--pure-black)] border border-[var(--border-dark)] rounded-lg text-sm text-white focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] w-64 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Quick Stats */}
                <div className="text-right hidden md:block">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold tracking-wider">Balance</p>
                    <p className="text-base font-bold text-white font-mono">{userStats.balance}</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold tracking-wider">Today's P&L</p>
                    <p className="text-base font-bold text-[var(--signal-green)] font-mono">{userStats.dayPnL}</p>
                </div>

                <div className="w-px h-8 bg-[var(--border-dark)] mx-2 hidden md:block"></div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="relative p-2 text-[var(--text-gray)] hover:text-white hover:bg-[var(--soft-black)] rounded-lg transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--signal-red)] rounded-full ring-2 ring-[var(--card-black)]"></span>
                    </button>
                    <button className="p-2 text-[var(--text-gray)] hover:text-white hover:bg-[var(--soft-black)] rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
