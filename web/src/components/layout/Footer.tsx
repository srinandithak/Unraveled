"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const Tiers = [
    {
        name: "Basic",
        price: "Free",
        period: "",
        description: "For the conscious browser.",
        features: [
            "Chrome Extension",
            "Real-time CPW Estimates",
            "Basic Material Scoring"
        ],
        buttonText: "Add to Chrome",
        primary: false
    },
    {
        name: "Pro",
        price: "$8",
        period: "/mo",
        description: "For the wardrobe architect.",
        features: [
            "Everything in Basic",
            "Unlimited Trend Forecasting",
            "Personal Wardrobe CPW Dashboard",
            "Brand Alternatives Archive"
        ],
        buttonText: "Start 14-Day Trial",
        primary: true
    }
];

export function Footer() {
    return (
        <footer className="w-full bg-charcoal text-cream mt-auto pt-32 pb-12 px-4 md:px-12 lg:px-24 rounded-t-[3rem] md:rounded-t-[4rem] flex flex-col items-center overflow-hidden">

            {/* Membership Tiers Grid */}
            <div className="w-full max-w-[1200px] mb-32">
                <div className="text-center mb-16">
                    <h2 className="font-serif italic text-4xl md:text-5xl text-cream mb-4">Choose your intelligence level.</h2>
                    <p className="font-sans text-cream/70 text-lg">Invest in knowledge. Stop wasting money on dead trends.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {Tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`p-8 md:p-12 border ${tier.primary ? 'border-rust bg-charcoal/50 shadow-[inset_0_0_80px_rgba(200,75,49,0.05)]' : 'border-cream/10 bg-transparent'} rounded-[2rem] flex flex-col h-full`}
                        >
                            <div className="mb-8">
                                <h3 className="font-mono text-sm uppercase tracking-widest text-cream/70 mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-sans font-bold text-5xl tracking-tighter text-cream">{tier.price}</span>
                                    <span className="font-sans text-cream/50">{tier.period}</span>
                                </div>
                                <p className="font-sans text-cream/60 mt-4">{tier.description}</p>
                            </div>

                            <ul className="flex-1 space-y-4 mb-12">
                                {tier.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                                        <span className="font-sans text-cream/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <MagneticButton
                                strength={0.1}
                                className={`w-full py-4 rounded-xl font-sans font-semibold text-charcoal transition-colors ${tier.primary ? 'bg-rust text-cream hover:bg-rust/90' : 'bg-cream hover:bg-white'}`}
                            >
                                {tier.buttonText}
                            </MagneticButton>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Massive Typographic Footer */}
            <div className="w-full border-t border-cream/10 pt-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 text-center md:text-left">

                <div>
                    <h2 className="font-serif italic text-[12vw] md:text-[8rem] leading-none tracking-tight text-cream/90 select-none">Unravel.</h2>
                </div>

                <div className="flex flex-col gap-8 md:min-w-[300px]">
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 font-mono text-xs uppercase tracking-widest text-cream/50">
                        <a href="#" className="hover:text-cream transition-colors flex items-center gap-1">Twitter <ArrowUpRight className="w-3 h-3" /></a>
                        <a href="#" className="hover:text-cream transition-colors flex items-center gap-1">Instagram <ArrowUpRight className="w-3 h-3" /></a>
                        <a href="#" className="hover:text-cream transition-colors flex items-center gap-1">Manifesto <ArrowUpRight className="w-3 h-3" /></a>
                    </div>

                    <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-cream/30">
                        <span>© {new Date().getFullYear()} Unravel Intelligence Inc.</span>
                        <span>Made to last.</span>
                        <div className="flex gap-4 mt-2 justify-center md:justify-start">
                            <a href="#" className="hover:text-cream/80">Privacy</a>
                            <a href="#" className="hover:text-cream/80">Terms</a>
                        </div>
                    </div>
                </div>

            </div>

        </footer>
    );
}
