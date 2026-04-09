import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate & In-House Training | Springbok Zambia",
  description:
    "100% customized in-house training delivered at your location. Standard courses, tailor-made programmes, and long-term training partnerships. Cost-effective solutions for organizations across all 10 provinces of Zambia.",
  openGraph: {
    title: "Corporate & In-House Training | Springbok Training & Business Solutions",
    description: "Bespoke in-house training solutions delivered at your location. Cost-effective, customized, and convenient for teams of any size.",
  },
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
