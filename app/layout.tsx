
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import BackgroundMusic from "@/components/BackgroundMusic";
import BackToTop from "@/components/BackToTop";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.title}`, template: `%s — ${site.name}` },
  description: site.description,
  keywords: [
    "Security Engineer",
    "Endpoint Security & Management",
    "Security Engineering",
    "Vulnerability Management",
    "HCL BigFix",
    "SentinelOne",
    "IBM QRadar",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    title: `${site.name} — ${site.title}`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github],
  knowsAbout: ["Endpoint Security & Management", "Security Engineering", "Vulnerability Management"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        */}
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        {children}
        <BackgroundMusic />
        <BackToTop />
      </body>
    </html>
  );
}
