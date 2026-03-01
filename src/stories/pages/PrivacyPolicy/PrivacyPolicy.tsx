"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, Microscope } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingNumber = () => {
    const [config, setConfig] = useState({
        x: 0,
        y: 0,
        duration: 10,
        delay: 0,
        fontSize: 10,
        value: 0
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConfig({
            x: Math.random() * 1000,
            y: Math.random() * 500 + 500,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 10,
            fontSize: Math.random() * 20 + 10,
            value: Math.floor(Math.random() * 100)
        });
    }, []);

    if (config.duration === 10 && config.x === 0) return null;

    return (
        <motion.div
            className="absolute text-[#F6CA56] font-mono font-bold"
            initial={{
                x: config.x,
                y: config.y,
                opacity: 0
            }}
            animate={{
                y: -100,
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                ease: "linear",
                delay: config.delay
            }}
            style={{ fontSize: config.fontSize }}
        >
            {config.value}%
        </motion.div>
    );
};

export function PrivacyPolicy() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground pt-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#351150]/10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F6CA56]/30 to-transparent" />

            {/* Animated Floating Numbers Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
                {isMounted && [...Array(15)].map((_, i) => (
                    <FloatingNumber key={i} />
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm mb-4"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Legal
                    </motion.div> */}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white font-heading"
                    >
                        Privacy and Cookie Policy
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 font-medium"
                    >
                        Last Updated: March 2026
                    </motion.p>
                </div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#160026] border border-[#351150] rounded-3xl p-8 md:p-12 space-y-10 shadow-2xl"
                >
                    <div className="prose prose-invert max-w-none">
                        {/* <p className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-[#F6CA56] pl-6 py-2">
                            At Metric Gamer, we take your privacy as seriously as we take our gaming metrics. This policy explains how we collect, use, and protect your data when you visit www.metricgamer.com.
                        </p> */}

                        <div className="space-y-12">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">1</span>
                                    Information We Collect
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We collect information to provide a better experience for our readers. This includes:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Voluntary Information:</strong> Email addresses if you sign up for our newsletter or contact us via our contact forms.</li>
                                        <li><strong className="text-white">Automated Information:</strong> Technical data such as your IP address, browser type, and device information collected through cookies.</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">2</span>
                                    Google AdSense and Third-Party Advertising
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use Google AdSense to serve advertisements on our site.</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Google&apos;s Use of Cookies:</strong> Google, as a third-party vendor, uses cookies to serve ads on Metric Gamer. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to this site and/or other sites on the Internet.</li>
                                        <li><strong className="text-white">Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting Google Ads Settings.</li>
                                        <li><strong className="text-white">Third-Party Vendors:</strong> Other third-party vendors or ad networks may also use cookies to serve ads on our site. You can opt out of some third-party vendors’ uses of cookies for personalized advertising by visiting www.aboutads.info.</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">3</span>
                                    Analytics and Tracking (Google & HubSpot)
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>To understand how our readers use the &quot;Metric Method,&quot; we use industry-standard tracking tools:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Google Analytics 4 (GA4):</strong> We use Google cookies to analyze website traffic and user behavior. This helps us see which game reviews are the most popular so we can create better content.</li>
                                        <li><strong className="text-white">HubSpot:</strong> We use HubSpot for our site analytics and customer relationship management. HubSpot places cookies on your device to track your interactions with our site, help us manage our marketing efforts, and provide a personalized experience.</li>
                                        <li><strong className="text-white">Consent Mode:</strong> We implement Google Consent Mode v2. This ensures that Google and HubSpot services respect your privacy choices made via our cookie banner. If you decline cookies, these services will operate in a restricted, non-identifying mode.</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">4</span>
                                    How to Manage Cookies
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>You have the right to decide whether to accept or reject cookies.</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Cookie Banner:</strong> Upon your first visit, you can select your preferences via our consent manager.</li>
                                        <li><strong className="text-white">Browser Settings:</strong> You can set or amend your web browser controls to accept or refuse cookies.</li>
                                        <li><strong className="text-white">HubSpot Opt-Out:</strong> You can manage your HubSpot-specific tracking preferences at any time by clicking the &quot;Manage Cookies&quot; link in our footer.</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">5</span>
                                    Data Protection Rights (GDPR/CCPA)
                                </h2>
                                <div className="text-gray-400 leading-relaxed">
                                    <p>Depending on your location, you have rights regarding your personal data, including the right to access, correct, or delete your information. To exercise these rights, please contact us at <a href="mailto:accipiterconsultancy@gmail.com" className="text-[#F6CA56] hover:underline">accipiterconsultancy@gmail.com</a>.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>

                {/* Support Section */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                        <FileText className="w-4 h-4" />
                        <span>Metric Gamer — Transparency in Gaming Metrics</span>
                    </div>
                </motion.div> */}
            </div>
        </main>
    );
}
