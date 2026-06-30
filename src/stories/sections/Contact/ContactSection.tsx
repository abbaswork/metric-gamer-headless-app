"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Script from "next/script";

declare global {
  interface Window {
    hbspt: any;
  }
}

export function ContactSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F6CA56]/30 to-transparent" />

      <div className="max-w-2xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm mb-4"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-heading"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            Got a question, a suggestion, or just want to say hello? We&apos;d love to hear from you. Drop us a message and we&apos;ll get back to you as soon as possible!
          </motion.p>
        </div>

        {/* HubSpot Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#160026] border border-[#351150] rounded-3xl p-8 md:p-10"
        >
          <Script
            src="https://js-eu1.hsforms.net/forms/embed/v2.js"
            strategy="afterInteractive"
            onLoad={() => {
              if (window.hbspt) {
                window.hbspt.forms.create({
                  region: "eu1",
                  portalId: "147547659",
                  formId: "74257535-3314-493e-9893-2ccfd32aa729",
                  target: "#hubspot-contact-form",
                });
              }
            }}
          />
          <div id="hubspot-contact-form" />
        </motion.div>

        {/* Email fallback */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Prefer email? Reach us at{" "}
          <a href="mailto:metricgamer.content@gmail.com" className="text-[#F6CA56] hover:underline">
            metricgamer.content@gmail.com
          </a>
        </motion.p>

      </div>
    </section>
  );
}
