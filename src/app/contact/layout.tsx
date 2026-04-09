import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Springbok Training Zambia",
  description:
    "Get in touch with Springbok Training and Business Solutions. Offices in Lusaka and Copperbelt Province, Zambia. Call +260 966 135 560 or email info@springboktraining.net. Free consultation available.",
  openGraph: {
    title: "Contact Springbok Training & Business Solutions",
    description: "Request a free consultation. Offices in Lusaka and Copperbelt. Call +260 966 135 560.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
