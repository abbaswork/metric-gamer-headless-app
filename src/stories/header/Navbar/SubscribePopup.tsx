"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

interface SubscribePopupProps {
    isOpen: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLDivElement | null>;
}

export function SubscribePopup({ isOpen, onClose, anchorRef }: SubscribePopupProps) {
    const { submitForm, status, setStatus } = useHubSpotForm("341872712", "91132ed5-cb00-409d-bc16-d39d90617349");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [coords, setCoords] = useState({ top: 80, left: 0 });
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Basic window check for SSR
        if (typeof window === "undefined") return;

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (isOpen && anchorRef.current && window.innerWidth > 768) {
            const rect = anchorRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + 12,
                left: Math.max(20, rect.right - 320), // Align right edge, but keep on screen
            });
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, [isOpen, anchorRef]);

    useEffect(() => {
        if (status === "success") {
            const timer = setTimeout(() => {
                onClose();
                setEmail("");
                setName("");
                // Reset status after popup is closed transition-wise
                setTimeout(() => setStatus("idle"), 500);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [status, onClose, setStatus]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        await submitForm(email, name);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for mobile or to close on click outside */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:bg-black/10"
                    />

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: -20,
                            left: isMobile ? "50%" : coords.left,
                            x: isMobile ? "-50%" : 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            top: isMobile ? 80 : coords.top,
                            left: isMobile ? "50%" : coords.left,
                            x: isMobile ? "-50%" : 0,
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        style={{ position: 'fixed' }}
                        className="z-[70] w-[calc(100%-2rem)] max-w-[320px] bg-[#160026] border border-[#F6CA56]/30 rounded-2xl shadow-2xl overflow-hidden p-6"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {status === "success" ? (
                            <div className="py-4 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-12 h-12 bg-[#F6CA56]/20 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <Send className="w-6 h-6 text-[#F6CA56]" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-white font-heading mb-2">You&apos;re in!</h3>
                                <p className="text-gray-400 text-sm">Thanks for joining our community.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-white font-heading mb-1">
                                    Stay Updated
                                </h3>
                                <p className="text-gray-400 text-xs mb-6">
                                    Get the latest game metrics and reviews delivered to your inbox.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 ml-1">
                                            Email address
                                        </label>
                                        <Input
                                            type="email"
                                            required
                                            placeholder="chief@halo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#F6CA56]/50 h-10 rounded-xl"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-[#F6CA56] hover:bg-[#e0b545] text-black font-bold h-10 rounded-xl mt-2 transition-all active:scale-[0.98]"
                                    >
                                        {status === "loading" ? "Subscribing..." : "Subscribe Now"}
                                    </Button>

                                    {status === "error" && (
                                        <p className="text-red-400 text-[10px] text-center mt-2">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </form>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
