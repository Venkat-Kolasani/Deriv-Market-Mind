# Deriv Market Mind - Technical Brief

> **Document Version:** 1.0  
> **Last Updated:** February 2026  
> **Status:** MVP Landing Page

---

## Overview

Deriv Market Mind is an AI-powered Intelligent Trading Analyst that combines:
1. **Real-time market intelligence** - Plain-language explanations of price movements
2. **Behavioral coaching** - Detection of emotional trading patterns
3. **Social content generation** - Automated LinkedIn/X posts from market analysis

> ⚠️ **Compliance Note:** This system provides **analysis only** — no predictions, no buy/sell signals.

---

## Directory Structure

```
Deriv-Market-Mind/
├── src/
│   ├── app/
│   │   ├── globals.css       # Midnight Enterprise design system (Pure Black)
│   │   ├── layout.tsx        # Root layout with Space Grotesk/JetBrains Mono
│   │   ├── page.tsx          # Main landing page (Hero, Market Dashboard, Features)
│   │   └── favicon.ico
│   ├── components/
│   │   ├── MarketTicker.tsx  # Infinite-scroll price bar
│   │   ├── FeatureCard.tsx   # Solution feature display
│   │   ├── DashboardMockup.tsx # Hero visual with chart
│   │   ├── IndexChart.tsx    # Large market index chart (AreaChart)
│   │   ├── MarketSummarySection.tsx # Combined chart + major indices sidebar
│   │   ├── MarketDataGrid.tsx # Tabbed data table (Volume/Gainers/Losers)
│   │   └── StockTable.tsx    # Reusable specialized data table
│   └── lib/
│       └── mockData.ts       # Typed mock data (Stocks, Crypto, Forex)
├── docs/
│   └── TECHNICAL_BRIEF.md    # This file
├── public/                   # Static assets
└── package.json              # Dependencies
```

---

## Design System: "Pure Black Enterprise"

### Color Palette

| Name           | Hex       | Usage                           |
|----------------|-----------|----------------------------------|
| `pure-black`   | `#000000` | Page background                  |
| `card-black`   | `#111111` | Card/surface backgrounds         |
| `electric-blue`| `#3b82f6` | Primary accent, CTAs, charts     |
| `signal-green` | `#22c55e` | Positive price movements         |
| `signal-red`   | `#ef4444` | Negative moves, alerts           |
| `slate-gray`   | `#94a3b8` | Body text                        |
| `white`        | `#ffffff` | Headlines, emphasis              |

### Typography
- **Headings:** Space Grotesk
- **Data/Code:** JetBrains Mono
- **Body:** Inter

---

## Component Architecture

### 1. Market Dashboard (New)
- **MarketSummarySection**:
  - Displays S&P 500 performance with a large area chart.
  - Sidebar lists major global indices (Nasdaq, DAX, FTSE).
- **MarketDataGrid**:
  - Tabbed interface switching between *Highest Volume*, *Top Gainers*, *Top Losers*.
  - Supports filtering by Asset Class: **Stocks**, **Crypto**, **Forex**.
- **StockTable**:
  - Detailed rows showing Symbol, Price, Change%, Market Cap, Volume, Signal badge, and Sparkline.

### 2. MarketTicker
- **Purpose:** Displays scrolling live market prices
- **Data Source:** `lib/mockData.ts → marketTickerData`
- **Animation:** CSS keyframes with `animation-play-state: paused` on hover

### 3. DashboardMockup
- **Purpose:** Hero visual showcasing the product
- **Features:**
  - Simulated EUR/USD price chart with "Revenge Trading Detected" alert overlay.
  - High-visibility chart design for black background.

### 4. FeatureCard
- **Purpose:** Displays solution features with icons
- **Icons:** Lucide React (`Brain`, `Shield`, `Share2`)

---

## Tech Stack

| Layer     | Technology           | Version |
|-----------|----------------------|---------|
| Framework | Next.js (App Router) | 15.x    |
| Language  | TypeScript           | 5.x     |
| Styling   | Tailwind CSS         | 4.x     |
| Animation | Framer Motion        | 11.x    |
| Charts    | Recharts             | 2.x     |
| Icons     | Lucide React         | 0.x     |

---

## Mock Data Strategy

All data is served from `lib/mockData.ts` until backend integration. Now supports multi-asset classes:

```typescript
// Expanded structure
export interface StockItem {
  symbol: string;
  price: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  signal: string;      // e.g. "Strong Buy"
  sparkline: number[]; // Array for mini-charts
}
```

**Exported datasets:**
- `marketTickerData` - 8 instruments for the ticker
- `topGainersData`, `topLosersData`, `highestVolumeData` - US Stocks
- `cryptoData` - Bitcoin, Ethereum, Solana, etc.
- `forexData` - Major currency pairs
- `volatilityAlerts`, `behavioralAlerts` - Sample alerts
- `chartData`, `mainIndexHistory` - Chart plotting points
- `features` - Solution descriptions

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint the codebase
npm run lint
```

---

## Future Integration Points

1. **Deriv API** - Real-time market data via WebSocket
2. **OpenAI/Claude** - Market explanation generation
3. **Trading History Import** - For behavioral analysis
4. **LinkedIn/X APIs** - Social content publishing

---

## Compliance Reminders

Per `.cursorrules` and project requirements:
- ❌ **Never** generate price predictions
- ❌ **Never** provide buy/sell signals
- ✅ **Always** include disclaimers on market content
- ✅ Focus on **analysis, reporting, and behavioral insights**
