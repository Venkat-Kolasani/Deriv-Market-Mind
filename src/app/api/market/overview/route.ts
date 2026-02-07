import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ticker: [
      { symbol: 'EUR/USD', price: 1.0862, changePercent: 0.18 },
      { symbol: 'GBP/USD', price: 1.2654, changePercent: 0.27 },
      { symbol: 'BTC/USD', price: 67432.5, changePercent: 1.88 },
      { symbol: 'ETH/USD', price: 3456.78, changePercent: 2.65 }
    ],
    summary: {
      mainIndex: {
        name: 'S&P 500',
        symbol: 'SPX',
        value: 6932.31,
        change: 1.97
      },
      majorIndices: [
        { symbol: 'NASDAQ 100', value: 25075.77, change: 2.15 },
        { symbol: 'JAPAN 225', value: 54253.68, change: 0.81 },
        { symbol: 'FTSE 100', value: 10369.75, change: 0.59 },
        { symbol: 'DAX', value: 24721.46, change: 0.94 }
      ]
    },
    grid: {
      stocks: [],
      crypto: [],
      forex: []
    }
  });
}
