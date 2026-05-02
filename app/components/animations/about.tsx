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

    const isInView = useInView(containerRef, { amount: 0.5, margin: "0px 0px -150px 0px", once: true });

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
            className="flex flex-col mt-32 mb-28 mx-auto">
            <div className="max-w-xs sm:max-w-xl space-y-1">
                <motion.h2
                    className="text-3xl md:text-4xl text-zinc-200 tracking-tighter"
                    initial="hidden"
                    animate={headerControls}
                    variants={headerVariants}
                >
                    About Me
                </motion.h2>
                <motion.span
                    className="text-lg md:text-xl text-zinc-100"
                    initial="hidden"
                    animate={spanControls}
                    variants={spanVariants}>
                    I build full-stack interfaces where
                    speed and intuitive design are the default.
                    I specialize in creating seamless web apps
                    with <strong className="text-sky-300">Next.js</strong>, <strong className="text-sky-300">TypeScript</strong>,
                    and intelligent <strong className="text-sky-300">AI integrations</strong>.
                </motion.span>
            </div>
        </section>
    )
}