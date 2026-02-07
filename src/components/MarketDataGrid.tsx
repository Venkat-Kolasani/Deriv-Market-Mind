'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StockTable from './StockTable';
import { topGainersData, topLosersData, highestVolumeData, cryptoData, forexData } from '@/lib/mockData';

type TabType = 'gainers' | 'losers' | 'volume';
type CategoryType = 'stocks' | 'crypto' | 'forex';

interface MarketDataGridProps {
    category: CategoryType;
}

export default function MarketDataGrid({ category = 'stocks' }: MarketDataGridProps) {
    const [activeTab, setActiveTab] = useState<TabType>('volume');

    const getActiveData = () => {
        // STOCKS: Use specific mock arrays
        if (category === 'stocks') {
            switch (activeTab) {
                case 'gainers': return topGainersData;
                case 'losers': return topLosersData;
                case 'volume': return highestVolumeData;
                default: return highestVolumeData;
            }
        }

        // CRYPTO & FOREX: Use general array and filter/sort
        const sourceData = category === 'crypto' ? cryptoData : forexData;

        // Create a copy to sort/filter
        let processedData = [...sourceData];

        switch (activeTab) {
            case 'gainers':
                return processedData.sort((a, b) => b.changePercent - a.changePercent);
            case 'losers':
                return processedData.sort((a, b) => a.changePercent - b.changePercent); // Ascending (most negative first)
            case 'volume':
            default:
                // Assume default mock data order is volume or relevance
                return processedData;
        }
    };

    return (
        <div className="w-full">
            {/* Tab Controls */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--border-dark)] pb-1">
                <button
                    onClick={() => setActiveTab('volume')}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'volume' ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'
                        }`}
                >
                    Highest Volume
                    {activeTab === 'volume' && (
                        <motion.div layoutId="tabIndicator" className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[var(--accent-blue)]" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('gainers')}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'gainers' ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'
                        }`}
                >
                    Top Gainers
                    {activeTab === 'gainers' && (
                        <motion.div layoutId="tabIndicator" className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[var(--signal-green)]" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('losers')}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'losers' ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'
                        }`}
                >
                    Top Losers
                    {activeTab === 'losers' && (
                        <motion.div layoutId="tabIndicator" className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[var(--signal-red)]" />
                    )}
                </button>
            </div>

            {/* Table Content */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <StockTable stocks={getActiveData()} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-6 text-center">
                <button className="btn-secondary text-sm px-6 py-2">
                    View Full Market Screener
                </button>
            </div>
        </div>
    );
}
