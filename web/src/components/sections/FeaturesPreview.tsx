"use client";

import { GaugeWidget } from "@/components/dashboard/GaugeWidget";
import { FiberBarWidget } from "@/components/dashboard/FiberBarWidget";
import { CpwComparisonWidget } from "@/components/dashboard/CpwComparisonWidget";
import { motion } from "framer-motion";

export function FeaturesPreview() {
    return (
        <section id="platform" className="w-full bg-cream py-24 md:py-32 px-4 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="font-sans font-medium text-charcoal/50 text-sm tracking-widest uppercase mb-4">
                            The Intelligence Dashboard
                        </h2>
                        <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-2xl leading-tight">
                            Interactive functional artifacts, replacing guesswork with data.
                        </h3>
                    </div>
                    <p className="font-mono text-sm text-charcoal/60 max-w-sm uppercase tracking-wider">
                        Live telemetry · Trend tracking · Sustainability scoring
                    </p>
                </div>

                {/* 
          3-column asymmetric grid matching the Bento 2.0 / theme.md principles 
          On mobile, falls back to a 1 column stack
        */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[420px]">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col relative group"
                    >
                        <div className="flex-1 overflow-hidden transition-all duration-300">
                            <GaugeWidget />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col relative group"
                    >
                        <div className="flex-1 overflow-hidden transition-all duration-300 transform lg:-translate-y-8">
                            <FiberBarWidget />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col relative group"
                    >
                        <div className="flex-1 overflow-hidden transition-all duration-300">
                            <CpwComparisonWidget />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
