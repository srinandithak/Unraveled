"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export function ScoringMethodology() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".sticky-card");

            cards.forEach((card, index) => {
                // We only animate if there's a card after this one to cover it
                if (index < cards.length - 1) {
                    const nextCard = cards[index + 1];

                    gsap.to(card, {
                        scale: 0.92,
                        opacity: 0.55,
                        filter: "blur(4px)", // 16px blur can be very heavy on GPU, using 4px for performance + theme constraint
                        ease: "none",
                        scrollTrigger: {
                            trigger: nextCard,
                            start: "top bottom", // When the top of the NEXT card hits the bottom of the viewport
                            end: "top top",      // When the top of the NEXT card hits the top of the viewport
                            scrub: true,
                        }
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-charcoal pb-32"
        >
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pt-24 mb-12">
                <h2 className="font-sans font-medium text-cream/50 text-sm tracking-widest uppercase mb-4 text-center">
                    The Unravel Matrix
                </h2>
                <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-cream text-center leading-tight">
                    How we score.
                </h3>
            </div>

            {/* 
        Sticky Stacking Wrapper 
        Each card is h-screen, sticky to top-0, allowing natural scroll overlap
      */}
            <div className="relative w-full md:w-[90%] lg:w-[80%] mx-auto px-4 md:px-0">

                {/* Card 1: Fiber Score */}
                <div className="sticky-card sticky top-6 md:top-12 h-[80vh] w-full bg-cream rounded-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.3)] origin-top overflow-hidden mb-12 border border-charcoal/10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
                    <div className="md:w-1/2 flex flex-col text-forest z-10">
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-70">Dimension 1</h4>
                        <h5 className="font-serif italic text-5xl md:text-6xl lg:text-7xl mb-6">Fiber Score</h5>
                        <p className="font-sans text-lg lg:text-xl opacity-80 max-w-md">
                            We analyze the material composition against 40+ sustainability databases, identifying microplastics and evaluating end-of-life biodegradability.
                        </p>
                    </div>

                    {/* Weave Diagram SVG */}
                    <div className="w-full md:w-1/2 h-full flex items-center justify-center relative">
                        <svg viewBox="0 0 200 200" className="w-full max-w-[300px] aspect-square opacity-80">
                            <motion.g
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                }}
                            >
                                {/* Horizontal threads */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.line
                                        key={`h-${i}`}
                                        x1="20" y1={40 + i * 24} x2="180" y2={40 + i * 24}
                                        stroke="var(--color-charcoal)" strokeWidth="4" strokeLinecap="round" opacity="0.3"
                                        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeOut" } } }}
                                    />
                                ))}
                                {/* Vertical threads */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.line
                                        key={`v-${i}`}
                                        x1={40 + i * 24} y1="20" x2={40 + i * 24} y2="180"
                                        stroke="var(--color-rust)" strokeWidth="4" strokeLinecap="round" opacity="0.8"
                                        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeOut", delay: 0.5 } } }}
                                    />
                                ))}
                            </motion.g>
                        </svg>

                        {/* Rotating bobbin decoration */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="absolute right-0 bottom-0 w-32 h-32 border border-dashed border-forest/30 rounded-full flex items-center justify-center"
                        >
                            <div className="w-16 h-16 border border-forest/50 rounded-full" />
                        </motion.div>
                    </div>
                </div>

                {/* Card 2: Trend Score */}
                <div className="sticky-card sticky top-12 md:top-16 h-[80vh] w-full bg-forest rounded-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] origin-top overflow-hidden mb-12 border border-cream/10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
                    <div className="md:w-1/2 flex flex-col text-cream z-10">
                        <h4 className="font-mono text-xs text-sage uppercase tracking-widest mb-4">Dimension 2</h4>
                        <h5 className="font-serif italic text-5xl md:text-6xl lg:text-7xl mb-6 text-cream">Trend Score</h5>
                        <p className="font-sans text-lg lg:text-xl text-cream/80 max-w-md mb-8">
                            A proprietary telemetry engine monitors social volume, search velocity, and sentiment to classify items as micro-trends, seasonal, or timeless classics.
                        </p>
                        <div className="flex items-center gap-3 bg-charcoal/30 w-max px-4 py-2 rounded-full border border-cream/10">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-sage"></span>
                            </span>
                            <span className="font-mono text-xs uppercase text-sage">Signal Active</span>
                        </div>
                    </div>

                    {/* Trend Velocity Graph SVG */}
                    <div className="w-full md:w-1/2 h-full flex items-end justify-center pt-8">
                        <svg viewBox="0 0 300 200" className="w-full max-w-[400px]">
                            <motion.g
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                }}
                            >
                                {[10, 24, 45, 80, 140, 95, 30].map((h, i) => (
                                    <motion.rect
                                        key={i}
                                        x={20 + i * 40} y={180 - h} width="24" height={h} rx="4"
                                        fill={i === 4 ? "var(--color-rust)" : "var(--color-sage)"}
                                        opacity={i === 4 ? 1 : 0.6}
                                        variants={{
                                            hidden: { height: 0, y: 180 },
                                            visible: { height: h, y: 180 - h, transition: { type: "spring", bounce: 0.4 } }
                                        }}
                                    />
                                ))}
                            </motion.g>
                        </svg>
                    </div>
                </div>

                {/* Card 3: Brand Ethics Score */}
                <div className="sticky-card sticky top-16 md:top-20 h-[80vh] w-full bg-[#111] rounded-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.6)] origin-top overflow-hidden border border-cream/5 flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
                    <div className="md:w-1/2 flex flex-col text-cream z-10">
                        <h4 className="font-mono text-xs text-rust uppercase tracking-widest mb-4">Dimension 3</h4>
                        <h5 className="font-serif italic text-5xl md:text-6xl lg:text-7xl mb-6">Ethics Score</h5>
                        <p className="font-sans text-lg lg:text-xl text-cream/70 max-w-md">
                            We trace global supply chains, auditing labor practices, carbon footprint transparency, and corporate governance to reveal the true human cost.
                        </p>
                    </div>

                    {/* Radar Chart SVG */}
                    <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                        <svg viewBox="0 0 300 300" className="w-full max-w-[300px] aspect-square">
                            {/* Radar Grid */}
                            {[40, 80, 120].map((r, i) => (
                                <circle key={i} cx="150" cy="150" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                            ))}

                            {/* Axes */}
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                                const x = 150 + 120 * Math.cos(angle * Math.PI / 180);
                                const y = 150 + 120 * Math.sin(angle * Math.PI / 180);
                                return <line key={`axis-${i}`} x1="150" y1="150" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />;
                            })}

                            {/* Data Polygon */}
                            <motion.polygon
                                points="150,70 219,110 219,190 150,230 81,190 81,110"
                                fill="none"
                                stroke="var(--color-rust)"
                                strokeWidth="2"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                                style={{ originX: "150px", originY: "150px" }}
                            />
                            <motion.polygon
                                points="150,70 219,110 219,190 150,230 81,190 81,110"
                                fill="var(--color-rust)"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 0.2 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                                style={{ originX: "150px", originY: "150px" }}
                            />
                        </svg>
                    </div>
                </div>

            </div>

        </section>
    );
}
