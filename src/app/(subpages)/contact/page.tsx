import { ContactSection } from "@/stories/sections/Contact/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Metric Gamer",
  description: "Get in touch with the Metric Gamer team. We'd love to hear your questions, suggestions, or feedback.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <ContactSection />
    </div>
  );
}
