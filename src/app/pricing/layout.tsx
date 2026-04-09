import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Calculator | Springbok Zambia",
  description:
    "Transparent training investment options starting from K3,500 per participant per day. Public courses, in-house training, and customised programmes. Volume discounts available. Use our pricing calculator to plan your training budget.",
  openGraph: {
    title: "Training Pricing & Investment Calculator | Springbok",
    description: "Plan your training budget with our transparent pricing. Starting from K3,500 per participant per day with volume discounts.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
