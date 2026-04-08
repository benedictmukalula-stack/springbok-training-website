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
  title: "Springbok Training Academy | Premium Corporate Training South Africa",
  description: "Elevate your workforce with Springbok Training Academy. Expert-led programmes in leadership, sales, operations, compliance, and AI. Virtual, in-person, and corporate in-house delivery.",
  keywords: ["corporate training", "South Africa", "leadership development", "sales training", "compliance training", "AI skills", "Springbok Training"],
  authors: [{ name: "Springbok Training Academy" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Springbok Training Academy | Premium Corporate Training",
    description: "Elevate your workforce with South Africa's premier corporate training academy.",
    siteName: "Springbok Training Academy",
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
