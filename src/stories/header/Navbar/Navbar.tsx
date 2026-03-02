"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Menu, Home, Gamepad2, X, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoTransparent from "@/assets/Logo_Transparent_1765216442252.png";
import Image from "next/image";
import { SubscribePopup } from "./SubscribePopup";
import { useRef } from "react";

export const Navbar = memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const subscribeButtonRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Island Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300`}
      >
        <div className={`
          pointer-events-auto
          bg-[#160026]/80 backdrop-blur-xl border border-white/10 
          rounded-full shadow-2xl shadow-black/50
          flex items-center gap-1.5 p-1.5 pl-4 pr-1.5
          transition-all duration-300
          ${isScrolled ? "scale-90" : "scale-100"}
        `}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-3 group">
            <div className="relative h-6 w-6">
              <Image
                src={logoTransparent}
                alt="Metric Gamer"
                fill
                className="object-contain transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#F6CA56] blur-lg opacity-0 group-hover:opacity-40 transition-opacity rounded-full" />
            </div>
            <span className="font-bold font-heading text-white text-xs tracking-wide hidden sm:block">
              METRIC GAMER
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />

          {/* Navigation Items */}
          <nav className="flex items-center gap-1">
            <Link href="/" aria-label="Go to Home page" id="nav-home">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 h-10 gap-1.5 text-xs font-sans transition-all ${pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                aria-hidden="true"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>

            <Link href="/metrics" aria-label="Find Games" id="nav-find-games">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 h-10 gap-1.5 text-xs font-sans transition-all ${pathname === '/metrics' ? 'bg-[#F6CA56] text-black hover:bg-[#e0b545]' : 'text-gray-400 hover:text-[#F6CA56] hover:bg-white/5'}`}
                aria-hidden="true"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Find Games</span>
              </Button>
            </Link>

            <Link href="/metrics?type=blog" aria-label="Find Ranked Lists" id="nav-find-ranked">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 h-10 gap-1.5 text-xs font-sans transition-all ${pathname === '/metrics' ? 'bg-[#F6CA56] text-black hover:bg-[#e0b545]' : 'text-gray-400 hover:text-[#F6CA56] hover:bg-white/5'}`}
                aria-hidden="true"
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Find Ranked Lists</span>
              </Button>
            </Link>
          </nav>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Subscribe / Menu */}
          <div className="flex items-center gap-2" ref={subscribeButtonRef}>
            <Button
              size="sm"
              className="bg-white/5 hover:bg-white/10 text-white rounded-full px-4 h-10 text-xs font-bold hidden md:flex transition-all active:scale-95"
              onClick={() => setIsSubscribeOpen(true)}
              aria-label="Subscribe to our newsletter"
              id="nav-subscribe"
            >
              Subscribe
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full w-10 h-10 text-gray-400 hover:text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              id="nav-mobile-toggle"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#160026] border border-[#351150] rounded-2xl p-4 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                  <Home className="w-4 h-4 mr-2" /> Home
                </Button>
              </Link>
              <Link href="/metrics">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-[#F6CA56] hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                  <Database className="w-4 h-4 mr-2" /> Database
                </Button>
              </Link>
              <div className="h-px bg-white/10 my-2" />
              <Button
                className="w-full bg-[#F6CA56] text-black hover:bg-[#e0b545] font-bold"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSubscribeOpen(true);
                }}
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SubscribePopup
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        anchorRef={subscribeButtonRef}
      />
    </>
  );
});
