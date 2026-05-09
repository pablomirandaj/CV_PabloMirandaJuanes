import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pablo Miranda Juanes | PMO & Data Analyst",
    template: "%s | Pablo Miranda Juanes",
  },
  description:
    "Portfolio of Pablo Miranda Juanes — Industrial Engineer specialized in Project Management and Business Intelligence. Madrid, Spain.",
  keywords: [
    "Pablo Miranda Juanes",
    "PMO",
    "Business Intelligence",
    "Data Analysis",
    "Power BI",
    "Python",
    "Project Management",
    "Madrid",
  ],
  authors: [{ name: "Pablo Miranda Juanes", url: "https://pablomirandajuanes.dev" }],
  creator: "Pablo Miranda Juanes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pablomirandajuanes.dev",
    title: "Pablo Miranda Juanes | PMO & Data Analyst",
    description: "Industrial Engineer specialized in Project Management and Business Intelligence.",
    siteName: "Pablo Miranda Juanes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Miranda Juanes | PMO & Data Analyst",
    description: "Industrial Engineer specialized in Project Management and Business Intelligence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#050a14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230ea5e9'/><text y='.9em' font-size='65' x='12' fill='white' font-weight='bold'>P</text></svg>" />
      </head>
      <body className="bg-dark-900 text-slate-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
