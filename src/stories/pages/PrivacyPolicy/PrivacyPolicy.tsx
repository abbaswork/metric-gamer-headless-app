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
                        Privacy & Cookie Policy
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 font-medium"
                    >
                        Last Updated: 18th March 2026
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
                                    Who We Are
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>Metric Gamer is operated by Accipiter Tech, a tech consulting firm.</p>
                                    <p>This website serves a global audience, including users in the United Kingdom, European Economic Area (EEA), and the United States.</p>
                                    <p>If you have any questions about this policy, you can contact us at: <a href="mailto:accipiterconsultancy@gmail.com" className="text-[#F6CA56] hover:underline">accipiterconsultancy@gmail.com</a></p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">2</span>
                                    Information We Collect
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We collect information in the following ways:</p>
                                    <div className="space-y-2">
                                        <h3 className="text-white font-bold text-lg">a) Information You Provide</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Email address (e.g. when contacting us or subscribing to a newsletter)</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-white font-bold text-lg">b) Information Collected Automatically</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>IP address</li>
                                            <li>Browser type and device information</li>
                                            <li>Pages visited and interactions on our website</li>
                                        </ul>
                                    </div>
                                    <p>This information is collected using cookies and similar technologies.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">3</span>
                                    How We Use Your Information
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use collected data to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Operate and maintain our website</li>
                                        <li>Improve content and user experience</li>
                                        <li>Understand how users interact with our site</li>
                                        <li>Respond to enquiries or messages</li>
                                        <li>Support future advertising and monetisation efforts</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">4</span>
                                    Cookies and Tracking Technologies
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use cookies to improve your experience. These may include:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Essential Cookies</strong> – necessary for the website to function</li>
                                        <li><strong className="text-white">Analytics Cookies</strong> – help us understand site usage</li>
                                        <li><strong className="text-white">Advertising Cookies</strong> – used to display relevant ads (when enabled)</li>
                                    </ul>
                                    <p>On your first visit, you may be asked to set your cookie preferences via our consent banner.</p>
                                    <p>You can also control cookies through your browser settings.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">5</span>
                                    Analytics and Third-Party Services
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use trusted third-party services to analyse usage and improve our website:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Google Analytics 4 (GA4)</strong> – helps us understand user behaviour and site performance</li>
                                        <li><strong className="text-white">HubSpot</strong> – used for analytics and customer relationship management</li>
                                    </ul>
                                    <p>These services may use cookies and process data according to their own privacy policies.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">6</span>
                                    Advertising (Google AdSense)
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We may use advertising services such as Google AdSense to display ads on this website in the future.</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on users’ visits to this and other websites.</li>
                                        <li>These cookies allow Google and its partners to display relevant advertisements.</li>
                                        <li>Users can opt out of personalised advertising by visiting Google Ads Settings.</li>
                                        <li>Advertising cookies will only be used where required by law after obtaining user consent.</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">7</span>
                                    Consent and Google Consent Mode
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use or plan to use consent management tools (including Google Consent Mode v2) to ensure that cookies and tracking technologies respect your choices.</p>
                                    <p>If you decline cookies, certain features (such as analytics or personalised ads) may operate in a limited or non-identifying mode.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">8</span>
                                    Data Sharing and Third Parties
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We do not sell your personal data.</p>
                                    <p>However, we may share data with trusted third-party service providers (such as analytics or advertising partners) who help us operate the website.</p>
                                    <p>Some of these providers may process data in countries outside your own, including the United States.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">9</span>
                                    Data Retention
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required or permitted by law.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">10</span>
                                    Your Privacy Rights
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-white font-bold text-lg">For UK/EEA Users (GDPR)</h3>
                                        <p>You have the right to:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Access your personal data</li>
                                            <li>Request correction or deletion</li>
                                            <li>Restrict or object to processing</li>
                                            <li>Request data portability</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-white font-bold text-lg">For US Users (CCPA/CPRA)</h3>
                                        <p>You have the right to:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Know what personal data we collect</li>
                                            <li>Request deletion of your data</li>
                                            <li>Opt out of the sale or sharing of personal data</li>
                                            <li>Not be discriminated against for exercising your rights</li>
                                        </ul>
                                    </div>
                                    <p>We do not sell personal data. However, certain third-party cookies may be considered “sharing” under US law.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">11</span>
                                    International Data Transfers
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>Your information may be processed in countries outside your country of residence, including where our service providers operate.</p>
                                    <p>We take reasonable steps to ensure your data is handled securely and in accordance with applicable laws.</p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">12</span>
                                    Managing Your Choices
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>You can manage your privacy preferences by:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Using our cookie consent banner</li>
                                        <li>Adjusting your browser settings</li>
                                        <li>Contacting us directly</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">13</span>
                                    Changes to This Policy
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We may update this policy from time to time. Updates will be posted on this page with a revised “Last Updated” date.</p>
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
