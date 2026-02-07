import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: "Deriv Market Mind | The AI That Watches The Market And You",
  description: "MindTrade AI combines real-time market intelligence with behavioral psychology to stop you from losing money. Analysis and insights, not predictions.",
  keywords: ["trading", "AI", "market analysis", "behavioral trading", "fintech"],
  openGraph: {
    title: "Deriv Market Mind",
    description: "The Analyst That Watches The Market. And You.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
