
import { ReactNode } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[var(--pure-black)] font-sans">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
                    {/* Background Gradient */}
                    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none z-0" />
                    <div className="relative z-10 max-w-[1600px] mx-auto h-full flex flex-col">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
