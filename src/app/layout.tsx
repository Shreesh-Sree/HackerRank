import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "HackerRank Campus Crew — SJGI | Code Beyond Reality",
  description: "Official landing page and crew portal for HackerRank Campus Crew Club (HRCC) at St. Joseph's Group of Institutions. Where logic meets the surreal.",
  openGraph: {
    type: "website",
    siteName: "HRCC SJGI",
    title: "HRCC SJGI — Code Beyond Reality",
    description: "Official landing page for HackerRank Campus Crew at St. Joseph's Group of Institutions.",
    images: [
      {
        url: "https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-g.png",
        alt: "HackerRank Campus Crew SJGI branding artwork",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HRCC SJGI — Code Beyond Reality",
    description: "Official portal for HackerRank Campus Crew at St. Joseph's Group of Institutions.",
    images: ["https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-g.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-[#121418] font-satoshi overflow-x-hidden">
        <Providers>
          {/* 1. Cloned Top Navigation */}
          <Navigation />


          {/* 2. Main Page Stream */}
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
