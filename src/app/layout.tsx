import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HackerRank Orchestrate | 24-Hour Hackathon",
  description: "HackerRank Orchestrate is a 24-hour hackathon to design, build, and ship an agent.",
  openGraph: {
    type: "website",
    siteName: "HackerRank",
    title: "HackerRank Orchestrate | 24-Hour Hackathon",
    description: "A 24-hour hackathon to design, build, and ship an agent.",
    url: "https://www.hackerrank.com/hackerrank-orchestrate-may26",
    images: [
      {
        url: "https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-g.png",
        alt: "HackerRank Orchestrate hackathon rewards artwork",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackerRank Orchestrate | 24-Hour Hackathon",
    description: "A 24-hour hackathon to design, build, and ship an agent.",
    images: ["https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-g.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
