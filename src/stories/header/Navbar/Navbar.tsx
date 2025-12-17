"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, Home, Gamepad2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoTransparent from "@/assets/Logo_Transparent_1765216442252.png";
import Image from "next/image";

export const Navbar = memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <Link href="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-full px-3 h-8 gap-1.5 text-xs transition-all ${pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>

            <Link href="/metrics">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-full px-3 h-8 gap-1.5 text-xs transition-all ${pathname === '/metrics' ? 'bg-[#F6CA56] text-black hover:bg-[#e0b545]' : 'text-gray-400 hover:text-[#F6CA56] hover:bg-white/5'}`}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search Games</span>
              </Button>
            </Link>
          </nav>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Subscribe / Menu */}
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-white/5 hover:bg-white/10 text-white rounded-full px-4 h-8 text-xs font-bold hidden md:flex">
              Subscribe
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full w-8 h-8 text-gray-400 hover:text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                  <Search className="w-4 h-4 mr-2" /> Search Games
                </Button>
              </Link>
              <div className="h-px bg-white/10 my-2" />
              <Button className="w-full bg-[#F6CA56] text-black hover:bg-[#e0b545]">
                Subscribe
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
