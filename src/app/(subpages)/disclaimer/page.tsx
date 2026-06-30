import { Disclaimer } from "@/stories/pages/Disclaimer/Disclaimer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Metric Gamer",
  description: "Read the Metric Gamer disclaimer covering our opinions, advertising, affiliate links, and accuracy policy.",
  alternates: {
    canonical: "/disclaimer/",
  },
};

export default function DisclaimerPage() {
  return <Disclaimer />;
}
