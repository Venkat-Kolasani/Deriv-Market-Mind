# Deriv Market Mind

**The AI Analyst That Watches The Market. And You.**

Deriv Market Mind is an intelligent trading companion designed to bridge the gap between market data and trader psychology. It provides real-time market analysis powered by the **Deriv API** alongside behavioral nudges to prevent emotional trading mistakes.

![Deriv Market Mind](public/dashboard-preview.png)

---

## 🏆 Hackathon Submission

This project is built for the **Deriv Hackathon 2026**, demonstrating innovative use of the Deriv API for trader empowerment.

### Problem Statement
Retail traders often make emotional decisions during volatile markets, leading to significant losses. Traditional tools focus only on market data, ignoring the human element.

### Our Solution
Deriv Market Mind combines:
- **Real-time Deriv API integration** for live market data
- **Behavioral analysis** to detect risky trading patterns
- **Educational nudges** to promote disciplined trading

---

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| **Live Market Dashboard** | Real-time BTC/USD and EUR/USD data via Deriv WebSocket API |
| **Multi-Asset Support** | Tabs for Stocks, Crypto, and Forex markets |
| **Behavioral Nudges** | Detects patterns like "Revenge Trading" and "Tilt" |
| **Smart Analysis** | AI-powered market insights and sentiment signals |
| **Social Auto-Pilot** | Automated content generation for trading updates |
| **Midnight Enterprise UI** | Dark theme optimized for trading environments |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Charts**: Recharts
- **API**: Deriv WebSocket API (App ID: 1089)
- **Deployment**: Vercel-ready

---

## � Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Venkat-Kolasani/Deriv-Market-Mind.git

# Navigate to project
cd Deriv-Market-Mind

# Install dependencies
npm install

# Start development server
npm run dev
```

### Open the app
Navigate to [http://localhost:3000](http://localhost:3000)

---

## � Project Structure

```
Deriv-Market-Mind/
├── src/
│   ├── app/
│   │   ├── api/market/overview/    # Deriv API integration
│   │   ├── dashboard/              # Trading dashboard
│   │   ├── behavioural-nudges/     # Behavioral analysis page
│   │   ├── smart-market-analysis/  # AI market insights
│   │   └── social-auto-pilot/      # Content automation
│   ├── components/                 # Reusable UI components
│   └── lib/                        # Utilities and mock data
├── docs/
│   └── TECHNICAL_BRIEF.md          # Detailed architecture docs
└── public/                         # Static assets
```

---

## 🔌 Deriv API Integration

The application connects to Deriv's WebSocket API for real-time market data:

```typescript
// src/app/api/market/overview/route.ts
const ws = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

### Supported Endpoints
- `GET /api/market/overview` - Live ticks for BTC/USD and EUR/USD

---

## 📚 Documentation

For detailed architecture, component breakdown, and design system specs:
- **[Technical Brief](docs/TECHNICAL_BRIEF.md)**

---

## 🎯 Roadmap

- [x] Landing page with market overview
- [x] Dashboard with trading chart
- [x] Deriv API WebSocket integration
- [x] Behavioral nudges framework
- [ ] User authentication (Deriv OAuth)
- [ ] Profit table analysis
- [ ] Advanced tilt detection algorithm
- [ ] Mobile-responsive improvements

---

## ⚠️ Disclaimer

This application is for **educational and demonstration purposes only**. It does **not** provide financial advice, trading signals, or price predictions. Trading involves significant risk of loss.

---

## 👥 Team

Built with ❤️ for the Deriv Hackathon 2026

---

© 2026 Deriv Market Mind
