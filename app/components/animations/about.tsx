'use client';

import { useRef, useEffect, useCallback } from "react";
import { motion, useAnimationControls, useInView, Variants } from "motion/react";

const headerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition:
        {
            duration: 1.3,
            ease: "easeInOut" as const
        }
    },
}

const spanVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition:
        {
            duration: 1.3,
            ease: "easeOut" as const
        }
    },
}

export default function AboutAnimation() {
    const containerRef = useRef<HTMLElement>(null);

    const headerControls = useAnimationControls();
    const spanControls = useAnimationControls();

    const isInView = useInView(containerRef, { amount: 0.3, once: true });

    const runAnimation = useCallback(async () => {

        await headerControls.start("visible");
        await spanControls.start("visible");

    }, [headerControls, spanControls]);

    useEffect(() => {
        if (isInView) runAnimation();
    }, [isInView, runAnimation]);

    return (
        <section
            ref={containerRef}
            className="flex flex-col h-80 md:h-96 mx-auto">
            <div className="max-w-lg space-y-1">
                <motion.h2
                    className="text-3xl md:text-4xl tracking-tighter"
                    initial="hidden"
                    animate={headerControls}
                    variants={headerVariants}
                >
                    About Me
                </motion.h2>
                <motion.span
                    className="text-xl md:text-2xl"
                    initial="hidden"
                    animate={spanControls}
                    variants={spanVariants}>
                    Full-stack engineering with interfaces that are fast by default
                    and considered by intention. I&apos;m more interested in the
                    space between functional and felt using Next.js, TypeScript,
                    Tailwind, and LLM integration.
                </motion.span>
            </div>
        </section>
    )
}