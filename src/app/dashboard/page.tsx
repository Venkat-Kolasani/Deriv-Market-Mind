'use client';

import { motion } from 'framer-motion';
import TradingChart from '@/components/dashboard/TradingChart';
import LiveEventFeed from '@/components/dashboard/LiveEventFeed';
import AiInsightStream from '@/components/dashboard/AiInsightStream';
import TiltMeter from '@/components/dashboard/TiltMeter';

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-[calc(100vh-8rem)]">
            {/* CENTER STAGE (3 Columns) */}
            <div className="lg:col-span-3 flex flex-col gap-6 h-full min-h-[600px]">
                {/* Top: Chart */}
                <div className="flex-[2] bg-[var(--card-black)] rounded-xl overflow-hidden shadow-2xl relative min-h-[400px] hover:shadow-[var(--accent-blue)]/5 transition-shadow duration-500">
                    <TradingChart />
                </div>

                {/* Bottom: Live Feed */}
                <div className="flex-1 min-h-[200px] bg-[var(--card-black)] rounded-xl overflow-hidden hover:border-[var(--border-subtle)] transition-colors">
                    <LiveEventFeed />
                </div>
            </div>

            {/* RIGHT SIDEBAR (1 Column) */}
            <div className="flex flex-col gap-6 h-full min-h-[600px]">
                {/* Zone A: AI Analyst */}
                <div className="flex-[2] bg-[var(--card-black)] rounded-xl overflow-hidden shadow-lg border border-[var(--border-dark)]/50 min-h-[350px]">
                    <AiInsightStream />
                </div>

                {/* Zone B: Tilt Meter */}
                <div className="flex-1 bg-[var(--card-black)] rounded-xl border border-[var(--border-dark)]/50 p-4 relative overflow-hidden min-h-[200px]">
                    <TiltMeter />
                </div>
            </div>
        </div>
    );
}
