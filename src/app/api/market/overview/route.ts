<<<<<<< HEAD
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import WebSocket from 'ws';

function getDerivTick(symbol: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      'wss://ws.derivws.com/websockets/v3?app_id=1089'
    );

    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          ticks: symbol,
          subscribe: 0
        })
      );
    });

    ws.on('message', (data) => {
      const json = JSON.parse(data.toString());

      if (json.tick) {
        ws.close();
        resolve(json.tick);
      }
    });

    ws.on('error', (err) => {
      reject(err);
    });
  });
}

export async function GET() {
  try {
    const [btc, eurusd] = await Promise.all([
      getDerivTick('BTCUSD'),
      getDerivTick('frxEURUSD')
    ]);

    return NextResponse.json({
      tickers: [
        {
          symbol: 'BTC/USD',
          price: btc.quote,
          changePercent: 0
        },
        {
          symbol: 'EUR/USD',
          price: eurusd.quote,
          changePercent: 0
        }
      ],
      summary: {
        mainIndex: {
          name: 'Deriv Live Market',
          symbol: 'DERIV',
          value: btc.quote,
          change: 0
        },
        majorIndices: [
          {
            symbol: 'BTC/USD',
            value: btc.quote,
            change: 0
          },
          {
            symbol: 'EUR/USD',
            value: eurusd.quote,
            change: 0
          }
        ]
      },
      grid: {
        stocks: [],
        crypto: [],
        forex: []
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Deriv data' },
      { status: 500 }
    );
  }
=======
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
>>>>>>> f7ebaa05301695606e27ee6c9bbba62d00d3e43a
}
