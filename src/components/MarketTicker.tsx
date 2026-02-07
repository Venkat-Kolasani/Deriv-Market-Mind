'use client';

import { motion } from 'framer-motion';

type IndexSummary = {
  main: {
    name: string;
    symbol: string;
    value: number;
    currency: string;
    changePercent: number;
  };
  others: {
    name: string;
    symbol: string;
    value: number;
    changePercent: number;
  }[];
};

export default function MarketSummarySection({
  data,
}: {
  data: IndexSummary;
}) {
  if (!data) return null;

  const isPositive = data.main.changePercent >= 0;

  return (
    <div className="card p-6 lg:p-8 bg-neutral-900/60 border border-neutral-800 rounded-xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ================= LEFT: MAIN INDEX ================= */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
              500
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-white">
                  {data.main.name}
                </h3>
                <span className="text-gray-400 text-sm uppercase tracking-wider">
                  {data.main.symbol}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white">
                  {data.main.value.toLocaleString()}
                </span>
                <span className="text-gray-400 text-sm">
                  {data.main.currency}
                </span>
                <span
                  className={`font-bold text-lg ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {data.main.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* ================= CHART PLACEHOLDER ================= */}
          <div className="h-[280px] rounded-lg bg-black border border-neutral-800 flex items-center justify-center text-neutral-500">
            Chart placeholder (API-ready)
          </div>
        </div>

        {/* ================= RIGHT: MAJOR INDICES ================= */}
        <div className="w-full lg:w-[320px] border-l border-neutral-800 pl-0 lg:pl-8 pt-8 lg:pt-0">
          <h3 className="text-lg font-bold text-white mb-6">
            Major indices
          </h3>

          <div className="space-y-5">
            {data.others.map((index) => {
              const up = index.changePercent >= 0;

              return (
                <motion.div
                  key={index.symbol}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs text-white">
                      {index.symbol.slice(0, 2)}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {index.name}
                      </p>
                      <span className="text-xs text-neutral-500">
                        INDEX
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-white">
                      {index.value.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        up ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {up ? '+' : ''}
                      {index.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800">
            <button className="text-blue-500 text-sm font-semibold hover:underline">
              See all major indices →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
