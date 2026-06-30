import { Youtube, Instagram, Music2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoTransparent from "@/assets/Logo_Transparent_1765216442252.png";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy & Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const socials = [
  {
    href: "https://www.youtube.com/@MetricGamerOfficial",
    label: "YouTube",
    icon: <Youtube className="w-4 h-4" />,
  },
  {
    href: "https://www.instagram.com/metric.gamer.official/",
    label: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
  },
  {
    href: "https://www.tiktok.com/@metric.gamer.official?lang=en",
    label: "TikTok",
    icon: <Music2 className="w-4 h-4" />,
  },
  {
    href: "https://store.steampowered.com/curator/45037659-Metric-Gamer-Official/",
    label: "Steam",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#160026] border-t border-[#351150] mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-6 w-6">
              <Image src={logoTransparent} alt="Metric Gamer" fill className="object-contain" />
            </div>
            <span className="font-bold font-heading text-white text-sm tracking-wide">
              METRIC GAMER
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-gray-400 hover:text-[#F6CA56] text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2 shrink-0">
            {socials.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg border border-[#F6CA56]/40 text-[#F6CA56] flex items-center justify-center hover:bg-[#F6CA56] hover:text-black transition-all"
              >
                {icon}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-[#351150]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © 2026 Metric Gamer. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            For enquiries:{" "}
            <a href="mailto:metricgamer.content@gmail.com" className="text-gray-500 hover:text-[#F6CA56] transition-colors">
              metricgamer.content@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
