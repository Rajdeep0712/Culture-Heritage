import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { VoiceProvider } from "@/lib/voice-context";
import { VoiceGuide } from "@/components/voice-guide";
import { Navbar } from "@/components/navbar";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sutr — India's Living Heritage Marketplace",
  description: "Discover, learn from, and directly support India's vanishing crafts and the artisans who keep them alive.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-parchment text-ink grain-overlay">
        <AuthProvider>
          <VoiceProvider>
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <VoiceGuide />
          </VoiceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
