import type { Metadata } from "next";
import "./globals.css";
import { fornire, ranade, panchang, hkGroteskWide } from "@/lib/fonts";
import { SceneProvider } from "@/context/SceneContext";
import NavigationDock from "@/components/layout/NavigationDock";
import SmoothScroll from "@/components/layout/SmoothScroll";
import SystemBackground from "@/components/layout/SystemBackground";
import Cursor from "@/components/layout/Cursor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://darshitlagdhir.is-a.dev"),
  title: {
    default: "Darshit Lagdhir | Systems Engineer",
    template: "%s | Darshit Lagdhir"
  },
  description: "Architectural portfolio of Darshit Lagdhir, focusing on high-performance backend systems, distributed architectures, and explicit memory safety.",
  keywords: ["Systems Engineering", "Backend Developer", "Rust", "Node.js", "Software Architecture", "Low-Latency"],
  authors: [{ name: "Darshit Lagdhir", url: "https://darshitlagdhir.is-a.dev" }],
  creator: "Darshit Lagdhir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://darshitlagdhir.is-a.dev",
    title: "Darshit Lagdhir | Systems Engineer",
    description: "Architectural portfolio of Darshit Lagdhir, focusing on systems thinking and high-performance digital environments.",
    siteName: "Darshit Lagdhir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darshit Lagdhir | Systems Engineer",
    description: "Architectural portfolio of Darshit Lagdhir, focusing on systems thinking.",
    creator: "@darshitlagdhir"
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${fornire.variable} ${ranade.variable} ${panchang.variable} ${hkGroteskWide.variable}`}
    >
      <body className="antialiased bg-bg-primary text-text-primary overflow-x-hidden selection:bg-accent selection:text-white">
        <SceneProvider>
          {/* BACKGROUND LAYER: visual backdrop for the portal */}
          <SystemBackground />
          
          {/* NAVIGATION LAYER: persistent navigational interface */}
          <NavigationDock />

          {/* CONTENT LAYER: scroll-managed dynamic content */}
          <SmoothScroll>
            <main className="flex-grow w-full relative">
              {children}
            </main>
          </SmoothScroll>

          {/* INTERACTION LAYER: custom cursor overlay (disabled on touch) */}
          <Cursor />
        </SceneProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
