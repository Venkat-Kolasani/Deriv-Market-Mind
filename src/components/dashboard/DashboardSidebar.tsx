'use client';

import { Activity, BarChart2, Share2, User, PieChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Market Monitor', href: '/dashboard', icon: Activity },
        { name: 'My Performance', href: '/dashboard/performance', icon: PieChart },
        { name: 'Content Studio', href: '/dashboard/studio', icon: Share2 },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[var(--card-black)] border-r border-[var(--border-dark)] flex flex-col z-40 hidden lg:flex">
            {/* Brand */}
            <div className="h-16 flex items-center gap-3 px-6 border-b border-[var(--border-dark)]">
                <Activity className="w-6 h-6 text-[var(--accent-blue)]" />
                <span className="font-bold text-white text-lg tracking-tight">MindTrade</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                                    ? 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]'
                                    : 'text-[var(--text-gray)] hover:bg-[var(--soft-black)] hover:text-white border border-transparent'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-muted)] group-hover:text-white transition-colors'}`} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Snippet */}
            <div className="p-4 border-t border-[var(--border-dark)]">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--soft-black)]/50 border border-[var(--border-subtle)] hover:bg-[var(--soft-black)] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                        AT
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Alex Trader</p>
                        <p className="text-xs text-[var(--signal-green)] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-green)]"></span>
                            Pro Plan
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
