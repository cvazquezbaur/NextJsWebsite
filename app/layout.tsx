import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import RouteTransition from "../components/RouteTransition";
import Providers from "../components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Carlos Vazquez Baur | Portfolio",
    template: "%s | Carlos Vazquez Baur",
  },
  description:
    "Portfolio of Carlos Vazquez Baur featuring software projects, performance work, and outdoor adventures.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Carlos Vazquez Baur",
    title: "Carlos Vazquez Baur | Portfolio",
    description:
      "Software engineering work, performance experience, and outdoor adventures in one portfolio.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Vazquez Baur | Portfolio",
    description:
      "Software engineering work, performance experience, and outdoor adventures in one portfolio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <RouteTransition>{children}</RouteTransition>
        </Providers>
      </body>
    </html>
  );
}
