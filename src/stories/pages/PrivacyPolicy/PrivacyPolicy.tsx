"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingNumber = () => {
    const [config, setConfig] = useState({
        x: 0, y: 0, duration: 10, delay: 0, fontSize: 10, value: 0
    });

    useEffect(() => {
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
            initial={{ x: config.x, y: config.y, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 1, 0] }}
            transition={{ duration: config.duration, repeat: Infinity, ease: "linear", delay: config.delay }}
            style={{ fontSize: config.fontSize }}
        >
            {config.value}%
        </motion.div>
    );
};

const SectionNumber = ({ n }: { n: number }) => (
    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#351150] text-[#F6CA56] flex items-center justify-center text-sm">
        {n}
    </span>
);

export function PrivacyPolicy() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground pt-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#351150]/10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F6CA56]/30 to-transparent" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
                {isMounted && [...Array(15)].map((_, i) => (
                    <FloatingNumber key={i} />
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
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
                        Last Updated: 24th June 2026
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#160026] border border-[#351150] rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="prose prose-invert max-w-none">
                        <div className="space-y-12">

                            {/* Intro */}
                            <p className="text-gray-400 leading-relaxed">
                                This policy covers how Metric Gamer collects and uses your data when you visit{" "}
                                <span className="text-white">metricgamer.com</span>. We serve a global audience including users in the United Kingdom, European Economic Area (EEA), and the United States. For any questions about this policy, contact us at{" "}
                                <a href="mailto:metricgamer.content@gmail.com" className="text-[#F6CA56] hover:underline">
                                    metricgamer.content@gmail.com
                                </a>.
                            </p>

                            {/* 1 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={1} /> Information We Collect
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

                            {/* 2 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={2} /> How We Use Your Information
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use collected data to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Operate and maintain our website</li>
                                        <li>Improve content and user experience</li>
                                        <li>Understand how users interact with our site</li>
                                        <li>Respond to enquiries or messages</li>
                                        <li>Support advertising and monetisation</li>
                                    </ul>
                                </div>
                            </section>

                            {/* 3 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={3} /> Cookies and Tracking Technologies
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use cookies to improve your experience. These may include:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Essential Cookies</strong> — necessary for the website to function</li>
                                        <li><strong className="text-white">Analytics Cookies</strong> — help us understand site usage</li>
                                        <li><strong className="text-white">Advertising Cookies</strong> — used to display personalised ads (when you have given consent)</li>
                                    </ul>
                                    <p>On your first visit, you will be asked to set your cookie preferences via our consent banner. You can also control cookies at any time through your browser settings.</p>
                                </div>
                            </section>

                            {/* 4 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={4} /> Analytics and Third-Party Services
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use trusted third-party services to analyse usage and improve our website:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong className="text-white">Google Analytics 4 (GA4)</strong> — helps us understand user behaviour and site performance</li>
                                        <li><strong className="text-white">HubSpot</strong> — used for analytics and customer relationship management</li>
                                    </ul>
                                    <p>These services may use cookies and process data according to their own privacy policies.</p>
                                </div>
                            </section>

                            {/* 5 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={5} /> Advertising — Google AdSense
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>This website uses Google AdSense to display advertisements.</p>
                                    <p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the internet. This is known as interest-based or personalised advertising.</p>
                                    <p>Google uses the DoubleClick cookie to enable it and its partners to serve ads based on your prior visits to this and other websites.</p>
                                    <p>We process advertising data on the basis of your consent. For UK and EEA users, we will only serve personalised ads where you have given explicit consent under Article 6(1)(a) of the UK/EU GDPR. If you decline advertising cookies, non-personalised ads will be shown instead.</p>
                                    <p>
                                        You can opt out of personalised advertising at any time by visiting{" "}
                                        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#F6CA56] hover:underline">
                                            Google Ads Settings
                                        </a>{" "}
                                        or the{" "}
                                        <a href="http://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#F6CA56] hover:underline">
                                            Network Advertising Initiative opt-out page
                                        </a>.
                                    </p>
                                </div>
                            </section>

                            {/* 6 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={6} /> Consent and Google Consent Mode
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We use Google Consent Mode v2 to ensure that cookies and tracking technologies respect your choices.</p>
                                    <p>If you consent to advertising cookies, personalised ads may be displayed. If you decline, non-personalised ads will be served instead and no advertising data will be used to build a profile about you. Analytics may operate in a limited, non-identifying mode.</p>
                                    <p>You can update your consent preferences at any time via our cookie banner.</p>
                                </div>
                            </section>

                            {/* 7 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={7} /> Data Sharing and Third Parties
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We do not sell your personal data.</p>
                                    <p>However, we may share data with trusted third-party service providers (such as analytics or advertising partners) who help us operate the website.</p>
                                    <p>Some of these providers may process data in countries outside your own, including the United States.</p>
                                </div>
                            </section>

                            {/* 8 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={8} /> Data Retention
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required or permitted by law.</p>
                                </div>
                            </section>

                            {/* 9 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={9} /> Your Privacy Rights
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
                                    <p>We do not sell personal data. However, certain third-party cookies may be considered "sharing" under US law.</p>
                                </div>
                            </section>

                            {/* 10 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={10} /> International Data Transfers
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>Your information may be processed in countries outside your country of residence, including where our service providers operate. We take reasonable steps to ensure your data is handled securely and in accordance with applicable laws.</p>
                                </div>
                            </section>

                            {/* 11 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={11} /> Managing Your Choices
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

                            {/* 12 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#F6CA56] font-heading flex items-center gap-3">
                                    <SectionNumber n={12} /> Changes to This Policy
                                </h2>
                                <div className="text-gray-400 leading-relaxed space-y-4">
                                    <p>We may update this policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.</p>
                                </div>
                            </section>

                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
