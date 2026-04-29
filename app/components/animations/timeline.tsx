'use client';

import { useRef, useEffect, useCallback } from "react";
import { motion, useAnimationControls, useInView, Variants } from "motion/react";
import { experience } from "@/app/lib/static-data";
import { useIsMobileTimeLine } from "@/app/hooks/useIsMobile";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.7,
        },
    },
};

const entryVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const dashVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const dateVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const headerFinalX = -25;

export default function TimeLine() {
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const isMobile = useIsMobileTimeLine();

    const h2Controls = useAnimationControls();
    const lineControls = useAnimationControls();
    const entriesControls = useAnimationControls();

    const isInView = useInView(barRef, { amount: 1, margin: "0px 0px -300px 0px", once: true });

    const headerFinalY = isMobile ? 180 : 127;


    const runAnimation = useCallback(async () => {
        if (!h2Ref.current || !barRef.current) return;

        const h2Rect = h2Ref.current.getBoundingClientRect();
        const barRect = barRef.current.getBoundingClientRect();
        const h2Center = h2Rect.left + h2Rect.width / 2;
        const targetX = barRect.left - h2Center + headerFinalX;
        const targetY = h2Rect.width + headerFinalY;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            await h2Controls.start({ opacity: 1, x: targetX, y: targetY, rotate: -90, transition: { duration: 0.5 } });
            await lineControls.start({ scaleY: 1, opacity: 1, transition: { duration: 0.5 } });
            hasAnimated.current = true;
            entriesControls.start("visible");
            return;
        }

        await h2Controls.start({ opacity: 1, x: targetX, transition: { duration: 1.75, ease: "easeInOut" } });
        await h2Controls.start({ rotate: -90, transition: { duration: 0.2, ease: "easeInOut" } });
        await h2Controls.start({ y: targetY, transition: { duration: 0.5, ease: "easeInOut" } });
        await lineControls.start({ scaleY: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } });

        hasAnimated.current = true;

        entriesControls.start("visible");
    }, [h2Controls, lineControls, entriesControls, headerFinalY]);

    const resetAnimation = useCallback(async () => {
        await Promise.all([
            h2Controls.start({ opacity: 0, x: 0, y: 0, rotate: 0, transition: { duration: 0.5 } }),
            lineControls.start({ scaleY: 0, opacity: 0, transition: { duration: 0.3 } }),
            entriesControls.start("hidden"),
        ]);
    }, [h2Controls, lineControls, entriesControls]);

    useEffect(() => {
        if (isInView) runAnimation();

    }, [isInView, runAnimation])

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const handleResize = async () => {
            clearTimeout(timer);
            timer = setTimeout(async () => {
                if (hasAnimated.current) {
                    hasAnimated.current = false;
                    await resetAnimation();
                }
                if (isInView) runAnimation();
            }, 150);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, [resetAnimation, isInView, runAnimation]);

    return (
        <section className="relative mx-auto pl-10 -mt-36 sm:mt-0">
            <div className="flex justify-center mb-8">
                <motion.h2
                    ref={h2Ref}
                    className="text-3xl md:text-4xl tracking-tighter"
                    initial={{ opacity: 0, x: 0, rotate: 0, y: 0 }}
                    animate={h2Controls}
                >
                    Experience
                </motion.h2>
            </div>
            <div className="flex">
                <div className="flex flex-1 min-w-0">

                    {/* Vertical bar */}
                    <motion.div
                        ref={barRef}
                        className="w-1 rounded-full bg-sky-400/50 origin-top self-stretch shrink-0"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={lineControls}
                    />

                    {/* Experience */}
                    <motion.div
                        className="flex flex-col gap-16 sm:gap-24 flex-1 min-w-0"
                        initial="hidden"
                        animate={entriesControls}
                        variants={containerVariants}
                    >
                        {experience.map((exp) => (
                            <motion.div key={exp.company} className="flex flex-col gap-1" variants={entryVariants}>

                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="h-1 w-6 sm:w-12 md:w-16 bg-sky-400/50 origin-left shrink-0"
                                        variants={dashVariants}
                                    />
                                    <motion.span
                                        className="text-3xl md:text-5xl font-bold tracking-tight text-sky-300/70 whitespace-nowrap"
                                        variants={dateVariants}
                                    >
                                        {exp.date}
                                    </motion.span>
                                </div>

                                <motion.div
                                    className="pl-10 sm:pl-16 md:pl-20 flex flex-col gap-1 max-w-72 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                                    variants={cardVariants}
                                >
                                    <h3 className="text-xl md:text-3xl font-semibold tracking-wide">
                                        {exp.company}
                                    </h3>
                                    <span className="text-base md:text-lg text-zinc-400/80">
                                        {exp.role} · {exp.location}
                                    </span>
                                    <ul className="mt-2 space-y-1">
                                        {exp.highlights.map((h) => (
                                            <li key={h} className="text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300/80 before:content-['-'] before:mr-2 before:text-sky-400/60">
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section >
    );
}