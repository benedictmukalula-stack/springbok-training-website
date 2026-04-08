import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Springbok Training & Business Solutions | Corporate Training Zambia",
  description:
    "Zambia's premier corporate training academy. Expert-led programmes in leadership, sales, customer service, administration, HR, and personal development. Accredited Training Partner with 17+ years of experience. In-house and public training across all 10 provinces.",
  keywords: [
    "corporate training Zambia",
    "Lusaka training",
    "soft skills training",
    "leadership development Zambia",
    "customer service training",
    "in-house training Zambia",
    "Copperbelt training",
    "Springbok Training",
    "business solutions Zambia",
    "HR training Zambia",
    "sales training Lusaka",
    "project management training Zambia",
  ],
  authors: [{ name: "Springbok Training and Business Solutions" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Springbok Training & Business Solutions | Corporate Training Zambia",
    description:
      "Elevate your workforce with Zambia's premier corporate training academy. Accredited programmes in leadership, sales, operations, and more across all 10 provinces.",
    siteName: "Springbok Training and Business Solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
