"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
    "Browse as normal.",
    "Unravel scores your item instantly.",
    "See the real cost — before you checkout."
];

export function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(bgRef.current, {
                yPercent: 30, // move background slightly downward as you scroll down
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // Word-by-word reveal for headlines
            const stepsElements = gsap.utils.toArray<HTMLElement>(".step-headline");

            stepsElements.forEach((headline, index) => {
                const words = headline.querySelectorAll(".split-word-inner");

                gsap.fromTo(words,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headline,
                            start: "top 85%", // trigger when top of element hits 85% down viewport
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Fade in the ghost number
                const numberNode = headline.parentElement?.querySelector(".ghost-number");
                if (numberNode) {
                    gsap.fromTo(numberNode,
                        { opacity: 0, scale: 0.9 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: headline,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split text into span wrapped words for animation
    const renderSplitText = (text: string) => {
        return text.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 -mb-2 mr-2 md:mr-3">
                <span className="split-word-inner inline-block">{word}</span>
            </span>
        ));
    };

    return (
        <section
            ref={sectionRef}
            id="methodology"
            className="relative w-full bg-charcoal text-cream py-32 md:py-48 overflow-hidden"
        >
            {/* Parallax Background */}
            <div
                ref={bgRef}
                className="absolute inset-x-0 -top-[20%] h-[140%] z-0 pointer-events-none opacity-8"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2000&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">

                <div className="mb-24">
                    <h2 className="font-sans font-medium text-cream/50 text-sm tracking-widest uppercase mb-4">
                        The Intelligence Stack
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
                    {steps.map((text, i) => (
                        <div key={i} className="relative pt-12">
                            {/* Ghost Numeral */}
                            <div className="ghost-number absolute -top-8 -left-4 font-drama italic text-[8rem] md:text-[10rem] lg:text-[12rem] text-forest/40 leading-none select-none -z-10">
                                {i + 1}
                            </div>

                            <h3 className="step-headline font-sans font-semibold text-2xl md:text-3xl lg:text-4xl leading-tight">
                                {renderSplitText(text)}
                            </h3>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
