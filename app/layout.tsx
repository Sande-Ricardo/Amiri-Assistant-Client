import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { WarmupProvider } from "./components/WarmupProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amiri - Automated B2B Commercial Proposal Generator",
  description: "Generate production-grade B2B commercial proposals powered by an asynchronous multi-agent AI backend.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <WarmupProvider />
        {children}
      </body>
    </html>
  );
}
