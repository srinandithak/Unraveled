"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Browser as ChromeIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "Platform", href: "#platform" },
    { name: "Methodology", href: "#methodology" },
    { name: "Brands", href: "#brands" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("Platform");
    const { scrollY } = useScroll();

    // Strict avoidance of window.addEventListener per theme.md rules
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[1400px] px-4 md:px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isScrolled
                    ? "w-[90%] md:w-[70%]"
                    : "w-full"
            )}
        >
            <nav
                className={cn(
                    "flex items-center justify-between rounded-full px-4 py-3 md:px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isScrolled
                        ? "bg-secondary/75 backdrop-blur-xl border border-primary text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_32px_rgba(44,74,62,0.1)]"
                        : "bg-transparent border-transparent text-cream"
                )}
            >
                <div className="flex items-center gap-x-8">
                    <Link href="/" className="font-serif italic font-bold text-xl md:text-2xl tracking-wide shrink-0">
                        Unravel.
                    </Link>

                    <ul className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => setActiveLink(link.name)}
                                    className="relative px-4 py-2 hover:opacity-100 transition-opacity"
                                    style={{ opacity: activeLink === link.name ? 1 : 0.7 }}
                                >
                                    {link.name}
                                    <AnimatePresence>
                                        {activeLink === link.name && isScrolled && (
                                            <motion.div
                                                layoutId="active-nav-underline"
                                                className="absolute bottom-1 left-4 right-4 h-[2px] bg-destructive"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <MagneticButton
                    strength={0.15}
                    className={cn(
                        "rounded-full px-5 py-2.5 font-sans font-medium text-sm transition-colors duration-500",
                        isScrolled
                            ? "bg-primary text-cream"
                            : "bg-cream text-charcoal"
                    )}
                >
                    <ChromeIcon weight="bold" className="w-4 h-4" />
                    <span className="hidden sm:inline">Get the Extension</span>
                </MagneticButton>
            </nav>
        </motion.header>
    );
}
