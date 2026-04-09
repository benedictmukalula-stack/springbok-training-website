import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Programmes | Springbok Zambia",
  description:
    "Explore 31+ expert-led corporate training courses across 6 categories: Leadership & Management, Sales & Customer Service, Personal Development, Administration & Operations, HR, and Corporate Solutions. Available across all 10 provinces of Zambia.",
  openGraph: {
    title: "Training Programmes | Springbok Training & Business Solutions",
    description: "31+ courses across 6 professional categories. Leadership, Sales, Customer Service, Administration, HR, and bespoke Corporate Solutions.",
  },
};

export default function ProgrammesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
