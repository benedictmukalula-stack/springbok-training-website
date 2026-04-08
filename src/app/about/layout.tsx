import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Springbok | Corporate Training Zambia",
  description:
    "Learn about Springbok Training and Business Solutions — Zambia's premier corporate training academy with 17+ years of experience, BCI accreditation, and operations across all 10 provinces. Founded in 2014, offices in Lusaka and Copperbelt.",
  openGraph: {
    title: "About Springbok Training & Business Solutions",
    description: "Zambia's trusted training partner with 17+ years of experience. Accredited by The Business Continuity Institute.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
