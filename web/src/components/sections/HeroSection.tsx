"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const typewriterTexts = [
    "Analyzing 1,247,391 items... 83% rated unsustainable.",
    "Avg. fast fashion item worn 7x before discard.",
    "Your wardrobe's true CPW: unknown."
];

export function HeroSection() {
    const container = useRef<HTMLDivElement>(null);
    const headlineRef1 = useRef<HTMLHeadingElement>(null);
    const ctaContainerRef = useRef<HTMLDivElement>(null);
    const subheadRef = useRef<HTMLDivElement>(null);

    const [typewriterIndex, setTypewriterIndex] = useState(0);
    const [typewriterText, setTypewriterText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Unravel word splitting
    const unravelWord = "Unraveled.";
    const unravelLetters = unravelWord.split("");

    // Vanilla React Typewriter (Lightweight)
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentFullText = typewriterTexts[typewriterIndex];

        if (isDeleting) {
            if (typewriterText === "") {
                setIsDeleting(false);
                setTypewriterIndex((prev) => (prev + 1) % typewriterTexts.length);
                timeout = setTimeout(() => { }, 500); // Wait before typing next
            } else {
                setTypewriterText(prev => prev.slice(0, -1));
                timeout = setTimeout(() => { }, 20); // Fast delete
            }
        } else {
            if (typewriterText === currentFullText) {
                timeout = setTimeout(() => setIsDeleting(true), 3500); // Read time
            } else {
                setTypewriterText(currentFullText.slice(0, typewriterText.length + 1));
                timeout = setTimeout(() => { }, Math.random() * 30 + 40); // Organic typing speed
            }
        }

        return () => clearTimeout(timeout);
    }, [typewriterText, isDeleting, typewriterIndex]);

    // GSAP Initial Stagger Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.1 });

            tl.fromTo(headlineRef1.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
            );

            // Thread-unspooling reveal: right-to-left
            const letters = gsap.utils.toArray(".unravel-letter");
            tl.fromTo(letters.reverse(),
                { opacity: 0, filter: "blur(4px)", x: 20 },
                { opacity: 1, filter: "blur(0px)", x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
                "-=0.5"
            );

            tl.fromTo(subheadRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.2"
            );

            tl.fromTo(ctaContainerRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.7"
            );

        }, container);

        return () => ctx.revert(); // Cleanup memory leaks
    }, []);

    return (
        <section
            ref={container}
            className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-24 md:pb-32 px-4 md:px-12 lg:px-24 overflow-hidden bg-charcoal"
        >
            {/* Background Image & Gradient Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2000&auto=format&fit=crop"
                    alt="Dark draped clothing fabric texture"
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-rust/20 mix-blend-multiply opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent" />
            </div>

            {/* Content anchored to bottom-left third */}
            <div className="relative z-10 max-w-4xl text-cream">

                {/* Line 1 */}
                <h1
                    ref={headlineRef1}
                    className="font-sans font-bold text-4xl sm:text-5xl md:text-[5rem] leading-[1.1] tracking-tighter max-w-[15ch] opacity-0"
                >
                    The sustainability of your clothes
                </h1>

                {/* Line 2 */}
                <h2 className="font-drama italic text-rust text-[6rem] sm:text-[8rem] md:text-[11rem] lg:text-[13rem] leading-[0.85] tracking-tight -ml-2 sm:-ml-4 mt-2 mb-8 flex flex-wrap">
                    {unravelLetters.map((char, index) => (
                        <span key={index} className="unravel-letter inline-block opacity-0">
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h2>

                {/* Subheadline Typewriter */}
                <div ref={subheadRef} className="opacity-0 mb-12 h-6 md:h-8 flex items-center">
                    <p className="font-mono text-xs sm:text-sm md:text-base text-cream/90 uppercase tracking-widest">
                        {typewriterText}
                        <span className="inline-block w-2.5 h-4 ml-1 bg-rust animate-pulse vertical-align-middle -mb-0.5" />
                    </p>
                </div>

                {/* CTAs */}
                <div ref={ctaContainerRef} className="opacity-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <MagneticButton
                        strength={0.2}
                        className="group px-8 py-4 bg-rust text-cream rounded-[1.5rem] font-sans font-semibold text-lg hover:text-white"
                    >
                        <span>Get the Extension</span>
                        <ArrowRight weight="bold" className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>

                    <MagneticButton
                        strength={0.15}
                        className="group px-8 py-4 bg-transparent border border-cream/30 text-cream rounded-[1.5rem] font-sans font-medium text-lg overflow-hidden transition-colors hover:border-transparent hover:text-cream"
                    >
                        {/* Sliding Forest fill on hover per requirements */}
                        <span className="absolute inset-0 w-full h-full bg-forest translate-y-[100%] group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none" />
                        <span className="relative z-10 flex items-center">
                            Try the Trend Clock
                            <ArrowDown weight="bold" className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
                        </span>
                    </MagneticButton>
                </div>

            </div>
        </section>
    );
}
