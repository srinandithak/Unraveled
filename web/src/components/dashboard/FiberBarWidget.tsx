"use client";

import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const GARMENTS = [
    {
        name: "Fast Fashion Blouse",
        score: 24,
        fibers: [
            { name: "Polyester", percent: 85, color: "bg-rust" },
            { name: "Elastane", percent: 15, color: "bg-charcoal/60" }
        ]
    },
    {
        name: "Premium Knit Sweater",
        score: 78,
        fibers: [
            { name: "Cotton", percent: 60, color: "bg-sage" },
            { name: "Recycled", percent: 40, color: "bg-forest" }
        ]
    },
    {
        name: "Summer Trousers",
        score: 92,
        fibers: [
            { name: "Linen", percent: 100, color: "bg-cream border border-charcoal/10" }
        ]
    },
];

export const FiberBarWidget = memo(function FiberBarWidget() {
    const [index, setIndex] = useState(0);
    const [animatedScore, setAnimatedScore] = useState(0);

    const currentGarment = GARMENTS[index];

    // Garment cycler
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % GARMENTS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Score counter animation
    useEffect(() => {
        let startTimestamp: number;
        const duration = 1000;
        const startValue = animatedScore;
        const endValue = currentGarment.score;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setAnimatedScore(Math.floor(startValue + ease * (endValue - startValue)));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [currentGarment.score]);

    // Interpolate score color (Rust for low, Forest for high)
    const scoreColor = currentGarment.score < 40 ? "text-rust" : currentGarment.score < 70 ? "text-sage" : "text-forest";

    return (
        <div className="flex flex-col h-full bg-cream pt-8 pb-8 px-6 md:px-10 border-t border-linen/50">

            {/* Garment Label Crossfade */}
            <div className="h-8 relative mb-6">
                <AnimatePresence mode="wait">
                    <motion.h3
                        key={currentGarment.name}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 font-sans font-medium text-lg text-charcoal"
                    >
                        {currentGarment.name}
                    </motion.h3>
                </AnimatePresence>
            </div>

            {/* Fiber Stack Bar */}
            <div className="w-full h-8 flex rounded-sm overflow-hidden mb-8 bg-linen/50 relative">
                <AnimatePresence>
                    {currentGarment.fibers.map((fiber, i) => (
                        <motion.div
                            key={`${fiber.name}-${i}`}
                            layout
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: `${fiber.percent}%`, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                                delay: i * 0.08 // slight stagger
                            }}
                            className={cn("h-full relative group cursor-crosshair", fiber.color)}
                        >
                            {/* Custom Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal text-cream text-[10px] font-mono px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                                {fiber.percent}% {fiber.name}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Score Output */}
            <div className="mt-auto">
                <p className="font-mono text-xs text-charcoal/50 uppercase tracking-widest mb-1">
                    Fiber Score
                </p>
                <div className="flex items-baseline gap-2">
                    <span className={cn("font-mono text-5xl md:text-6xl font-light tracking-tighter transition-colors duration-500", scoreColor)}>
                        {animatedScore}
                    </span>
                    <span className="font-mono text-xl text-charcoal/30">/100</span>
                </div>
            </div>

        </div>
    );
});
