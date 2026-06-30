"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "Our Opinions",
    body: "Everything you read on Metric Gamer, including reviews, scores, rankings, and recommendations, represents the collective opinion of our team based on our time with each game. Gaming is deeply personal, and while we work hard to give you an honest and considered take, our scores are not objective facts. Your experience with a game may differ, and that's completely fine. We'd rather you use our rubric as a starting point than a final verdict.",
  },
  {
    title: "Affiliate Links",
    body: "Metric Gamer does not currently use affiliate links. If that changes in the future, any post containing affiliate links will clearly state so at the top of that page. We will never let a commercial relationship influence a score or recommendation.",
  },
  {
    title: "Review Copies",
    body: "We do not currently receive review copies from publishers or developers. If we do in the future, it will be clearly disclosed on the relevant page. Receiving a copy would never affect our coverage; games are scored against the same rubric regardless of how we obtained them.",
  },
  {
    title: "Advertising",
    body: null,
    custom: (
      <p className="text-gray-300 leading-relaxed">
        This site displays advertisements through Google AdSense. Google uses cookies to serve ads based on your browsing activity. We have no responsibility over the content of these ads. If you&apos;d like to opt out of personalised advertising, you can do so through{" "}
        <Link
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F6CA56] hover:underline"
        >
          Google&apos;s Ad Settings
        </Link>
        .
      </p>
    ),
  },
  {
    title: "Accuracy",
    body: "We strive to make sure everything on Metric Gamer is accurate and up to date. That said, game prices, availability, release dates, and platform information can change after publication. If you spot something that needs correcting, please get in touch and we'll update it as quickly as we can.",
  },
  {
    title: "External Links",
    body: "Some pages on Metric Gamer may link to third-party websites. We are not responsible for the content, accuracy, or privacy practices of those sites.",
  },
  {
    title: "Intellectual Property",
    body: "All reviews, scores, rankings, written content, and page designs published on Metric Gamer are our original work and remain our property. You're welcome to quote or reference our content, but reproducing it in full or passing it off as your own without permission isn't something we allow. Game titles, artwork, logos, and trademarks referenced on this site belong to their respective publishers and developers.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, Metric Gamer accepts no liability for any loss or damage arising from your use of this site or reliance on its content. Everything here is provided as-is, without warranties of any kind. This includes decisions made on the basis of our scores, recommendations, or any information that turns out to be inaccurate or out of date.",
  },
];

export function Disclaimer() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-[#F6CA56] selection:text-black">
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-32 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm">
            <ShieldCheck className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight">
            Disclaimer
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            A few things worth knowing about how Metric Gamer works and what our content represents.
          </p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="border-t border-[#351150] pt-8"
            >
              <h2 className="text-xl font-bold text-white font-heading mb-3">
                {section.title}
              </h2>
              {section.custom ?? (
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
