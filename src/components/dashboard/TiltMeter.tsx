'use client';
import { userStats } from '@/lib/mockData';
import { ShieldAlert, Zap } from 'lucide-react';

export default function TiltMeter() {
    const tilt = userStats.tiltScore; // 0-100
    // Calculate rotation: 0% = -90deg, 100% = +90deg
    const rotation = (tilt / 100) * 180 - 90;

    return (
        <div className="bg-[var(--card-black)] rounded-xl border border-[var(--border-dark)] p-6 flex flex-col items-center justify-center h-full relative overflow-hidden group hover:border-[var(--signal-green)]/30 transition-colors">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--signal-green)]/5 blur-[50px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-2 mb-6 opacity-80">
                <ShieldAlert className="w-4 h-4 text-[var(--signal-green)]" />
                <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Psycho-Metric Guard</h3>
            </div>

            {/* Gauge Container */}
            <div className="relative w-48 h-24 overflow-hidden mb-2">
                {/* Background Arc */}
                <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-[var(--soft-black)] box-border"></div>

                {/* Progress Arc - rotated */}
                <div
                    className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-t-transparent border-r-transparent box-border transition-all duration-1000 ease-out origin-center"
                    style={{
                        borderColor: `var(--signal-green)`,
                        borderBottomColor: 'transparent',
                        borderLeftColor: 'transparent',
                        transform: `rotate(${rotation}deg)`
                    }}
                ></div>

                {/* Needle (simplified as a central text for now, or just fill) */}
                {/* Actually, CSS border rotation is tricky for gauge. Let's use SVG for precision if needed, or stick to this simple visual. */}
                {/* Better approach: SVG */}
                <svg viewBox="0 0 100 50" className="absolute top-0 left-0 w-full h-full">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
                    <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="126"
                        strokeDashoffset={126 - (126 * tilt / 100)}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
            </div>

            <div className="text-center relative z-10 -mt-2">
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white tracking-tighter">{tilt}</span>
                    <span className="text-xs text-[var(--text-muted)]">/ 100</span>
                </div>
                <p className="text-xs font-bold text-[var(--signal-green)] mt-1 tracking-wide flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 fill-current" />
                    {userStats.status.toUpperCase()}
                </p>
            </div>

            <p className="text-[10px] text-[var(--text-gray)] mt-4 text-center max-w-[150px] leading-tight">
                Emotional state is stable. Market volatility low.
            </p>
        </div>
    );
}
