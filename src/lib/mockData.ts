/**
 * Mock Data for Deriv Market Mind
 * Used to power the landing page UI before backend integration
 * 
 * NOTE: All data is for demonstration purposes only.
 * No financial predictions or advice is implied.
 */

export interface MarketTickerItem {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
}

export interface StockItem {
    rank: number;
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    marketCap: string;
    volume: string;
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    signal: string;
    sparkline: number[];
}

export interface VolatilityAlert {
    id: string;
    instrument: string;
    message: string;
    severity: 'high' | 'medium' | 'low';
    timestamp: string;
}

export interface BehavioralAlert {
    id: string;
    type: 'revenge_trading' | 'overtrading' | 'tilt' | 'fomo';
    message: string;
    timestamp: string;
}

export interface ChartDataPoint {
    time: string;
    price: number;
    volume: number;
}

// Helper to generate realistic sparkline data
function generateSparkline(trend: 'up' | 'down' | 'volatile', points: number = 12): number[] {
    const data: number[] = [];
    let value = 100;

    for (let i = 0; i < points; i++) {
        const noise = (Math.random() - 0.5) * 8;
        if (trend === 'up') {
            value += Math.random() * 3 + noise;
        } else if (trend === 'down') {
            value -= Math.random() * 3 + noise;
        } else {
            value += noise * 2;
        }
        data.push(Math.max(80, Math.min(120, value)));
    }
    return data;
}

// Market Ticker Data
export const marketTickerData: MarketTickerItem[] = [
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: 1.0842, change: 0.0012, changePercent: 0.11 },
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 67432.50, change: 1245.30, changePercent: 1.88 },
    { symbol: 'XAU/USD', name: 'Gold', price: 2024.65, change: -8.40, changePercent: -0.41 },
    { symbol: 'GBP/USD', name: 'Pound/Dollar', price: 1.2654, change: 0.0034, changePercent: 0.27 },
    { symbol: 'ETH/USD', name: 'Ethereum', price: 3456.78, change: 89.23, changePercent: 2.65 },
    { symbol: 'USD/JPY', name: 'Dollar/Yen', price: 148.92, change: -0.45, changePercent: -0.30 },
    { symbol: 'AAPL', name: 'Apple Inc', price: 189.45, change: 2.34, changePercent: 1.25 },
    { symbol: 'NVDA', name: 'NVIDIA', price: 721.33, change: 15.67, changePercent: 2.22 },
];

// Top Gainers with Sparkline Charts
export const topGainersData: StockItem[] = [
    {
        rank: 1, symbol: 'NVDA', name: 'NVIDIA Corporation', price: 487.50, changePercent: 3.24,
        marketCap: '$1.2T', volume: '42M', sentiment: 'Bullish', signal: 'Strong Buy',
        sparkline: generateSparkline('up')
    },
    {
        rank: 2, symbol: 'TSLA', name: 'Tesla, Inc.', price: 265.80, changePercent: 3.18,
        marketCap: '$850B', volume: '105M', sentiment: 'Neutral', signal: 'Momentum',
        sparkline: generateSparkline('up')
    },
    {
        rank: 3, symbol: 'AMD', name: 'Advanced Micro Devices', price: 167.40, changePercent: 3.14,
        marketCap: '$280B', volume: '65M', sentiment: 'Bullish', signal: 'Breakout',
        sparkline: generateSparkline('up')
    },
    {
        rank: 4, symbol: 'META', name: 'Meta Platforms Inc.', price: 498.20, changePercent: 3.08,
        marketCap: '$1.3T', volume: '22M', sentiment: 'Bullish', signal: 'Trend Cont.',
        sparkline: generateSparkline('up')
    },
    {
        rank: 5, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 178.30, changePercent: 2.95,
        marketCap: '$1.8T', volume: '18M', sentiment: 'Neutral', signal: 'Hold',
        sparkline: generateSparkline('up')
    },
    {
        rank: 6, symbol: 'MSFT', name: 'Microsoft Corporation', price: 422.40, changePercent: 2.87,
        marketCap: '$3.0T', volume: '25M', sentiment: 'Bullish', signal: 'Strong Buy',
        sparkline: generateSparkline('up')
    },
];

// Top Losers with Detailed Info
export const topLosersData: StockItem[] = [
    {
        rank: 1, symbol: 'INTC', name: 'Intel Corporation', price: 42.30, changePercent: -4.21,
        marketCap: '$180B', volume: '32M', sentiment: 'Bearish', signal: 'Sell',
        sparkline: generateSparkline('down')
    },
    {
        rank: 2, symbol: 'BA', name: 'Boeing Company', price: 178.90, changePercent: -3.45,
        marketCap: '$108B', volume: '12M', sentiment: 'Bearish', signal: 'Strong Sell',
        sparkline: generateSparkline('down')
    },
    {
        rank: 3, symbol: 'DIS', name: 'Walt Disney Co.', price: 98.70, changePercent: -2.89,
        marketCap: '$180B', volume: '15M', sentiment: 'Neutral', signal: 'Oversold',
        sparkline: generateSparkline('down')
    },
    {
        rank: 4, symbol: 'NFLX', name: 'Netflix Inc.', price: 612.40, changePercent: -2.34,
        marketCap: '$260B', volume: '8M', sentiment: 'Neutral', signal: 'Correction',
        sparkline: generateSparkline('down')
    },
    {
        rank: 5, symbol: 'PYPL', name: 'PayPal Holdings', price: 67.80, changePercent: -2.12,
        marketCap: '$72B', volume: '14M', sentiment: 'Bearish', signal: 'Sell',
        sparkline: generateSparkline('down')
    },
    {
        rank: 6, symbol: 'COIN', name: 'Coinbase Global', price: 234.50, changePercent: -1.98,
        marketCap: '$55B', volume: '18M', sentiment: 'Neutral', signal: 'Volatile',
        sparkline: generateSparkline('down')
    },
];

// Volatility Alerts
export const volatilityAlerts: VolatilityAlert[] = [
    {
        id: '1',
        instrument: 'XAU/USD',
        message: 'High volatility detected in Gold. VIX-like measure up 23%.',
        severity: 'high',
        timestamp: '2 min ago',
    },
    {
        id: '2',
        instrument: 'BTC/USD',
        message: 'Bitcoin approaching key resistance at $68,000.',
        severity: 'medium',
        timestamp: '5 min ago',
    },
    {
        id: '3',
        instrument: 'USD/JPY',
        message: 'Yen showing unusual strength after BoJ comments.',
        severity: 'medium',
        timestamp: '12 min ago',
    },
];

// Behavioral Alerts (for dashboard mockup)
export const behavioralAlerts: BehavioralAlert[] = [
    {
        id: '1',
        type: 'revenge_trading',
        message: 'Revenge Trading Detected',
        timestamp: 'Just now',
    },
    {
        id: '2',
        type: 'overtrading',
        message: 'Trading frequency 3x above normal',
        timestamp: '15 min ago',
    },
];

// Chart Data for Dashboard Mockup
export const chartData: ChartDataPoint[] = [
    { time: '09:00', price: 1.0820, volume: 1200 },
    { time: '09:30', price: 1.0825, volume: 1450 },
    { time: '10:00', price: 1.0818, volume: 980 },
    { time: '10:30', price: 1.0832, volume: 1650 },
    { time: '11:00', price: 1.0840, volume: 2100 },
    { time: '11:30', price: 1.0835, volume: 1800 },
    { time: '12:00', price: 1.0842, volume: 1560 },
    { time: '12:30', price: 1.0848, volume: 1720 },
    { time: '13:00', price: 1.0855, volume: 2300 },
    { time: '13:30', price: 1.0850, volume: 1950 },
    { time: '14:00', price: 1.0862, volume: 2450 },
    { time: '14:30', price: 1.0858, volume: 2100 },
];

// Feature list for the Solutions section
export const features = [
    {
        id: 'market-analysis',
        title: 'Smart Market Analysis',
        description: 'We explain price moves in plain English. No confusing jargon, just clear insights about what the market is doing and why.',
        icon: 'brain',
    },
    {
        id: 'behavioral-nudges',
        title: 'Behavioral Nudges',
        description: 'Our AI detects when you are "Tilting" or "Revenge Trading" and warns you before you make costly emotional decisions.',
        icon: 'shield',
    },
    {
        id: 'social-autopilot',
        title: 'Social Auto-Pilot',
        description: 'Turn market data and your analysis into viral LinkedIn & X posts in one click. Build your trading brand effortlessly.',
        icon: 'share',
    },
];

// Main Index Chart Data (S&P 500 style detailed history)
export const mainIndexHistory = Array.from({ length: 100 }, (_, i) => {
    const baseValue = 5000;
    const trend = i * 2;
    const noise = Math.random() * 50 - 25;
    return {
        time: `10:${i < 10 ? '0' + i : i}`,
        value: baseValue + trend + noise,
    };
});

// Highest Volume Stocks
export const highestVolumeData: StockItem[] = [
    {
        rank: 1, symbol: 'NVDA', name: 'NVIDIA Corporation', price: 185.41, changePercent: 7.87,
        marketCap: '$1.2T', volume: '156M', sentiment: 'Bullish', signal: 'Strong Buy',
        sparkline: generateSparkline('up')
    },
    {
        rank: 2, symbol: 'TSLA', name: 'Tesla, Inc.', price: 411.11, changePercent: 3.50,
        marketCap: '$850B', volume: '142M', sentiment: 'Bullish', signal: 'Momentum',
        sparkline: generateSparkline('up')
    },
    {
        rank: 3, symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 210.32, changePercent: -5.55,
        marketCap: '$1.6T', volume: '98M', sentiment: 'Bearish', signal: 'Oversold',
        sparkline: generateSparkline('down')
    },
    {
        rank: 4, symbol: 'MSFT', name: 'Microsoft Corp.', price: 401.14, changePercent: 1.90,
        marketCap: '$3.0T', volume: '85M', sentiment: 'Neutral', signal: 'Consolidation',
        sparkline: generateSparkline('up')
    },
    {
        rank: 5, symbol: 'AAPL', name: 'Apple Inc.', price: 278.12, changePercent: 0.80,
        marketCap: '$2.8T', volume: '76M', sentiment: 'Neutral', signal: 'Hold',
        sparkline: generateSparkline('up')
    },
    {
        rank: 6, symbol: 'AMD', name: 'Adv. Micro Devices', price: 167.40, changePercent: 3.14,
        marketCap: '$280B', volume: '65M', sentiment: 'Bullish', signal: 'Breakout',
        sparkline: generateSparkline('up')
    },
];

// CRYPTO DATA
export const cryptoData: StockItem[] = [
    { rank: 1, symbol: 'BTC', name: 'Bitcoin', price: 67432.50, changePercent: 1.88, marketCap: '$1.3T', volume: '$45B', sentiment: 'Bullish', signal: 'Strong Buy', sparkline: generateSparkline('up') },
    { rank: 2, symbol: 'ETH', name: 'Ethereum', price: 3456.78, changePercent: 2.65, marketCap: '$400B', volume: '$20B', sentiment: 'Bullish', signal: 'Breakout', sparkline: generateSparkline('up') },
    { rank: 3, symbol: 'SOL', name: 'Solana', price: 145.20, changePercent: 5.40, marketCap: '$65B', volume: '$5B', sentiment: 'Bullish', signal: 'Momentum', sparkline: generateSparkline('up') },
    { rank: 4, symbol: 'XRP', name: 'Ripple', price: 0.62, changePercent: -0.50, marketCap: '$34B', volume: '$2B', sentiment: 'Neutral', signal: 'Hold', sparkline: generateSparkline('down') },
    { rank: 5, symbol: 'DOGE', name: 'Dogecoin', price: 0.12, changePercent: -1.20, marketCap: '$18B', volume: '$1B', sentiment: 'Bearish', signal: 'Sell', sparkline: generateSparkline('down') },
    { rank: 6, symbol: 'ADA', name: 'Cardano', price: 0.58, changePercent: 0.40, marketCap: '$20B', volume: '$800M', sentiment: 'Neutral', signal: 'Consolidation', sparkline: generateSparkline('volatile') },
];

export const forexData: StockItem[] = [
    { rank: 1, symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0842, changePercent: 0.11, marketCap: '-', volume: '$200B', sentiment: 'Neutral', signal: 'Hold', sparkline: generateSparkline('volatile') },
    { rank: 2, symbol: 'GBP/USD', name: 'Pound / US Dollar', price: 1.2654, changePercent: 0.27, marketCap: '-', volume: '$150B', sentiment: 'Bullish', signal: 'Buy', sparkline: generateSparkline('up') },
    { rank: 3, symbol: 'USD/JPY', name: 'US Dollar / Yen', price: 148.92, changePercent: -0.30, marketCap: '-', volume: '$180B', sentiment: 'Bearish', signal: 'Correction', sparkline: generateSparkline('down') },
    { rank: 4, symbol: 'AUD/USD', name: 'Aus Dollar / USD', price: 0.6540, changePercent: -0.15, marketCap: '-', volume: '$80B', sentiment: 'Neutral', signal: 'Range', sparkline: generateSparkline('volatile') },
    { rank: 5, symbol: 'USD/CAD', name: 'USD / Canadian Dollar', price: 1.3520, changePercent: 0.05, marketCap: '-', volume: '$60B', sentiment: 'Neutral', signal: 'Hold', sparkline: generateSparkline('up') },
    { rank: 6, symbol: 'USD/CHF', name: 'USD / Swiss Franc', price: 0.8840, changePercent: 0.10, marketCap: '-', volume: '$50B', sentiment: 'Bullish', signal: 'Trend Cont.', sparkline: generateSparkline('up') },
];

// Major indices for the overview section
export const majorIndices = [
    { symbol: 'S&P 500', value: 6932.31, change: 1.97, sparkline: generateSparkline('up') },
    { symbol: 'Nasdaq 100', value: 25075.77, change: 2.15, sparkline: generateSparkline('up') },
    { symbol: 'Japan 225', value: 54253.68, change: 0.81, sparkline: generateSparkline('up') },
    { symbol: 'FTSE 100', value: 10369.75, change: 0.59, sparkline: generateSparkline('up') },
    { symbol: 'DAX', value: 24721.46, change: 0.94, sparkline: generateSparkline('up') },
];

// --- DASHBOARD DATA ---

export interface AiInsight {
    id: string;
    type: 'fact' | 'warning';
    title: string;
    content: string;
    timestamp: string;
}

export const aiInsights: AiInsight[] = [
    {
        id: '1',
        type: 'fact',
        title: 'Market Fact',
        content: 'EUR/USD volume is up 20% compared to the 30-day average. Institutional buying detected.',
        timestamp: '2 min ago'
    },
    {
        id: '2',
        type: 'warning',
        title: 'Behavioral Warning',
        content: 'You are trading too fast! Your order frequency has spiked. Consider taking a 5-minute break.',
        timestamp: 'Just now'
    },
    {
        id: '3',
        type: 'fact',
        title: 'Support Level',
        content: 'Key support level at 1.0850 holds strong. 3 failed breakout attempts observed.',
        timestamp: '15 min ago'
    },
    {
        id: '4',
        type: 'warning',
        title: 'Tilt Alert',
        content: 'Consecutive losses detected on XAU/USD. Risk of emotional decision making.',
        timestamp: '1 hour ago'
    }
];

export interface LiveEvent {
    id: string;
    type: 'news' | 'uptrade' | 'downtrade';
    message: string;
    timestamp: string;
}

export const liveEvents: LiveEvent[] = [
    { id: '1', type: 'uptrade', message: 'EUR/USD spiked 20 pips on high volume', timestamp: '10:42 AM' },
    { id: '2', type: 'news', message: 'US CPI Data released: 3.2% vs 3.1% expected', timestamp: '10:30 AM' },
    { id: '3', type: 'downtrade', message: 'Gold (XAU/USD) breaks below 2020 support', timestamp: '10:15 AM' },
    { id: '4', type: 'uptrade', message: 'BTC/USD reclaims $68,000 level', timestamp: '09:55 AM' },
    { id: '5', type: 'news', message: 'ECB President Lagarde scheduled to speak', timestamp: '09:00 AM' },
];

export const userStats = {
    name: 'Alex Trader',
    balance: '$24,500.00',
    dayPnL: '+$450.20 (+1.8%)',
    tiltScore: 15, // 0-100, where 100 is max tilt
    status: 'Stable'
};
