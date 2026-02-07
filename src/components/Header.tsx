'use client';

import { useRouter } from 'next/navigation';
import { Activity, ArrowLeft } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-dark)] bg-[var(--pure-black)]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* App title */}
        <div className="flex items-center gap-2 ml-4">
          <Activity className="w-6 h-6 text-[var(--accent-blue)]" />
          <span className="font-bold text-lg">
            Market Dashboard
          </span>
        </div>
      </div>
    </header>
  );
}
