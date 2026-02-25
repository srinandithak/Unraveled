"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";

const placeholders = [
    "barrel jeans...",
    "coastal grandmother aesthetic...",
    "ballet flats..."
];

export function DeathClockDemo() {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [text, setText] = useState("");

    // Terminal Placeholder Typewriter
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const current = placeholders[placeholderIndex];

        if (isTyping) {
            if (text === current) {
                timeout = setTimeout(() => setIsTyping(false), 2000);
            } else {
                setText(current.slice(0, text.length + 1));
                timeout = setTimeout(() => { }, 60);
            }
        } else {
            if (text === "") {
                setIsTyping(true);
                setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
            } else {
                setText(text.slice(0, -1));
                timeout = setTimeout(() => { }, 30);
            }
        }
        return () => clearTimeout(timeout);
    }, [text, isTyping, placeholderIndex]);

    // SVG Path Data for the curve
    const curvePath = "M 0,250 C 100,250 150,50 250,20 C 350,-10 400,180 600,280";

    return (
        <section className="relative w-full min-h-[100dvh] bg-charcoal text-cream py-24 md:py-32 px-4 md:px-12 lg:px-24 flex items-center overflow-hidden">

            {/* Amplified Noise for this specific section */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-70 mix-blend-overlay"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
                }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                {/* Left Panel: Terminal Search (~40% = col-span-5) */}
                <div className="lg:col-span-5 flex flex-col">
                    <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                        The Micro-Trend<br />Death Clock
                    </h2>
                    <p className="font-sans text-cream/70 text-lg mb-12 max-w-md">
                        Enter any product, aesthetic, or micro-trend. We'll tell you exactly when it's going to die.
                    </p>

                    <div className="flex flex-col gap-4 w-full">
                        {/* Terminal Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-sage">
                                <MagnifyingGlass weight="bold" className="w-5 h-5" />
                            </div>
                            <div className="w-full bg-charcoal/50 border border-sage/50 text-cream font-mono text-sm py-5 pl-12 pr-4 rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex items-center">
                                <span className="opacity-60">{text}</span>
                                <span className="w-2 h-4 bg-sage ml-1 animate-pulse" />
                            </div>
                        </div>

                        <MagneticButton
                            strength={0.1}
                            className="w-full py-5 bg-rust text-cream font-sans font-semibold text-lg rounded-xl group overflow-hidden"
                        >
                            Analyze Trend
                            <ArrowRight weight="bold" className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </MagneticButton>

                        {/* Recent Searches Chips */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="font-mono text-[10px] text-sage/60 uppercase tracking-widest mr-2 flex items-center">Recent:</span>
                            {["balletcore", "jorts", "silver metallics"].map(chip => (
                                <button key={chip} className="px-3 py-1.5 rounded-full border border-sage/30 text-sage/70 font-mono text-[10px] hover:bg-sage/10 transition-colors">
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel: SVG Curve (~60% = col-span-7) */}
                <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-0">

                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] border-l border-b border-cream/10 mb-8">
                        {/* Axis Labels */}
                        <span className="absolute -left-8 top-0 font-mono text-[10px] text-cream/30 -rotate-90 origin-bottom-left tracking-widest uppercase">Velocity</span>
                        <span className="absolute right-0 -bottom-6 font-mono text-[10px] text-cream/30 tracking-widest uppercase">Weeks ➝</span>

                        {/* SVG Chart */}
                        <svg viewBox="0 0 600 300" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            {/* Grid lines */}
                            <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

                            {/* Faint projected baseline curve */}
                            <path d={curvePath} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

                            {/* Animated drawing curve */}
                            <motion.path
                                d={curvePath}
                                fill="none"
                                stroke="var(--color-rust)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            />

                            {/* Marker 1: You are here */}
                            <motion.g
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 1.0, type: "spring" }}
                            >
                                <circle cx="280" cy="30" r="6" fill="var(--color-rust)" />
                                <circle cx="280" cy="30" r="14" fill="none" stroke="var(--color-rust)" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '280px 30px' }} />
                                <text x="280" y="10" fill="var(--color-cream)" opacity="0.8" fontSize="12" fontFamily="monospace" textAnchor="middle">📍 You are here</text>
                            </motion.g>

                            {/* Marker 2: Trend Death */}
                            <motion.g
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 1.6 }}
                            >
                                <line x1="500" y1="210" x2="500" y2="300" stroke="var(--color-sage)" strokeWidth="1" strokeDasharray="4 4" />
                                <circle cx="500" cy="210" r="5" fill="none" stroke="var(--color-sage)" strokeWidth="2" />
                                <text x="500" y="190" fill="var(--color-sage)" fontSize="12" fontFamily="monospace" textAnchor="middle">☠ Projected death</text>
                            </motion.g>
                        </svg>
                    </div>

                    {/* Staggered Output Chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="bg-charcoal border border-rust/30 rounded-xl p-4 flex flex-col justify-between"
                        >
                            <span className="font-mono text-[10px] text-cream/50 uppercase tracking-widest mb-2">Lifespan Score</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                                <span className="font-mono text-rust font-bold">FADING</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                            className="bg-charcoal border border-cream/10 rounded-xl p-4 flex flex-col justify-between"
                        >
                            <span className="font-mono text-[10px] text-cream/50 uppercase tracking-widest mb-1">Projected CPW</span>
                            <span className="font-mono text-2xl text-cream font-light tracking-tighter">$11.25</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="bg-forest rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                        >
                            <span className="font-serif italic text-cream text-lg leading-tight">
                                The Timeless Alternative
                            </span>
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    );
}
