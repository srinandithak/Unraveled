"use client";

import { motion } from "framer-motion";
import { Warning, Browser } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ExtensionPreview() {
    return (
        <section id="brands" className="relative w-full min-h-[100dvh] bg-linen text-charcoal flex flex-col items-center justify-center overflow-hidden py-24">

            {/* Background ambient fabric pattern */}
            <div className="absolute inset-0 z-0 texture-woven opacity-5 mix-blend-multiply" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 mb-16 md:mb-24 text-center">
                <h2 className="font-sans font-medium text-charcoal/50 text-sm tracking-widest uppercase mb-4">
                    The Browser Extension
                </h2>
                <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-3xl mx-auto leading-tight">
                    Know before you buy.<br />Intercepts greenwashing natively.
                </h3>
            </div>

            <div className="relative w-full max-w-[1200px] mx-auto flex justify-center px-4 md:px-12 z-10">

                {/* Mock Browser Window Container */}
                <div className="w-full relative bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-charcoal/10 overflow-hidden flex flex-col h-[600px] md:h-[700px]">

                    {/* Browser Chrome Header */}
                    <div className="h-12 border-b border-charcoal/10 flex items-center px-4 gap-4 bg-cream/50 pointer-events-none">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-rust/50" />
                            <div className="w-3 h-3 rounded-full bg-sage/50" />
                            <div className="w-3 h-3 rounded-full bg-forest/50" />
                        </div>
                        <div className="flex-1 max-w-md bg-white rounded-md h-7 border border-charcoal/10 flex items-center px-3 font-mono text-[10px] text-charcoal/40">
                            <Browser className="w-3 h-3 mr-2" />
                            fastfashion-empire.com/products/trendy-top
                        </div>
                    </div>

                    {/* Browser Content Area (Split) */}
                    <div className="flex-1 flex relative bg-[#FAFAFA] overflow-hidden">

                        {/* Left Box: Autoscrolling e-commerce skeleton */}
                        <div className="w-full lg:w-[65%] h-[200%] absolute top-0 left-0 p-8 md:p-12">
                            <motion.div
                                animate={{ y: ["0%", "-30%"] }}
                                transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                                className="flex flex-col gap-12"
                            >
                                {/* Product Layout Mock */}
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-1/2 aspect-[3/4] bg-charcoal/5 rounded-lg animate-pulse" />
                                    <div className="w-full md:w-1/2 flex flex-col space-y-4 pt-4">
                                        <div className="h-8 w-3/4 bg-charcoal/10 rounded" />
                                        <div className="h-4 w-1/4 bg-charcoal/10 rounded mb-4" />
                                        <div className="h-10 w-full bg-charcoal/10 rounded" />
                                        <div className="space-y-2 pt-8">
                                            <div className="h-3 w-full bg-charcoal/5 rounded" />
                                            <div className="h-3 w-5/6 bg-charcoal/5 rounded" />
                                            <div className="h-3 w-4/6 bg-charcoal/5 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Panel: Unravel Extension Slide-in */}
                        <motion.div
                            initial={{ x: "100%", boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                            whileInView={{ x: "0%", boxShadow: "-30px 0 60px rgba(0,0,0,0.1)" }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.1, delay: 0.4 }}
                            className="absolute top-0 right-0 w-full max-w-[400px] h-full bg-charcoal text-cream border-l border-cream/10 flex flex-col shadow-2xl z-20"
                        >
                            {/* Extension Header */}
                            <div className="p-6 border-b border-cream/10 flex justify-between items-start">
                                <div>
                                    <h4 className="font-serif italic text-2xl font-bold mb-1">Unravel.</h4>
                                    <p className="font-mono text-[10px] uppercase text-cream/50 tracking-widest">Page Analysis Complete</p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-rust/20 border border-rust/30 text-rust">
                                    <Warning weight="fill" className="w-4 h-4" />
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Warning</span>
                                </div>
                            </div>

                            {/* Extension Body */}
                            <div className="p-6 flex-1 flex flex-col gap-8">

                                <div className="space-y-2">
                                    <span className="font-sans text-xs text-cream/60">Estimated Cost Per Wear</span>
                                    <div className="font-mono text-4xl text-rust tracking-tighter">$14.50</div>
                                </div>

                                <div className="space-y-3">
                                    <span className="font-sans text-xs text-cream/60">Material Composition</span>
                                    <div className="w-full h-8 flex rounded overflow-hidden">
                                        <div className="bg-rust w-[85%] relative group">
                                            <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-cream">85% Poly</span>
                                        </div>
                                        <div className="bg-charcoal/60 w-[15%] relative group border-l border-charcoal">
                                            <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-cream opacity-0 group-hover:opacity-100 transition-opacity">15% Elast</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-cream/5 rounded p-4 border border-cream/10 mt-auto">
                                    <h5 className="font-sans text-sm font-semibold mb-2">Trend Decay</h5>
                                    <p className="font-sans text-xs text-cream/70 mb-4">This item's aesthetic is currently <span className="text-rust font-semibold">fading</span>. It will likely appear out-of-style within 4 months.</p>
                                    <button className="w-full py-2 bg-cream text-charcoal font-semibold rounded text-sm hover:bg-white transition-colors">
                                        Find Quality Alternative
                                    </button>
                                </div>

                            </div>

                        </motion.div>

                    </div>
                </div>

            </div>

            <div className="mt-16 relative z-10">
                <MagneticButton strength={0.15} className="px-8 py-4 bg-charcoal text-cream font-sans font-medium text-lg rounded-full shadow-lg">
                    Add Unravel to Chrome — It's Free
                </MagneticButton>
            </div>

        </section>
    );
}
