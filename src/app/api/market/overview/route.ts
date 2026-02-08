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
}
