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
            duration: 1,
            ease: "easeInOut" as const
        }
    },
}

const spanVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 0.8,
        transition:
        {
            duration: 1,
            ease: "easeOut" as const
        }
    },
}

export default function AboutAnimation() {
    const containerRef = useRef<HTMLElement>(null);

    const headerControls = useAnimationControls();
    const spanControls = useAnimationControls();

    const isInView = useInView(containerRef, { amount: 0.5, margin: "0px 0px -200px 0px", once: true });

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
            className="flex flex-col my-32 mx-auto">
            <div className="max-w-xs sm:max-w-xl space-y-1">
                <motion.h2
                    className="text-3xl md:text-4xl tracking-tighter"
                    initial="hidden"
                    animate={headerControls}
                    variants={headerVariants}
                >
                    About Me
                </motion.h2>
                <motion.span
                    className="text-lg md:text-xl text-zinc-300/90"
                    initial="hidden"
                    animate={spanControls}
                    variants={spanVariants}>
                    I bring full-stack engineering to interfaces that are
                    fast by default and considered by intention. I focus on
                    the space between functional and felt using Next.js,
                    TypeScript, Tailwind, and AI integration.
                </motion.span>
            </div>
        </section>
    )
}