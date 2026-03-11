import { AboutSection } from "@/stories/sections/About/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Metric Gamer",
  description: "Learn more about Metric Gamer and our mission to provide the best game performance metrics and analysis.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <AboutSection />
    </div>
  );
}
