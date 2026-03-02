import { PrivacyPolicy } from "@/stories/pages/PrivacyPolicy/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Metric Gamer",
    description: "Read the Metric Gamer Privacy Policy to understand how we handle your data.",
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicy />;
}
