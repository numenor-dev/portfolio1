import { useRef, useEffect } from "react";
import { motion, useScroll, useAnimationControls, useMotionValueEvent } from "motion/react";
import { experience } from "@/app/lib/static-data";
import { useIsMobile } from "@/app/hooks/useIsMobile";


export default function TimelineLine() {
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();

    const h2Controls = useAnimationControls();
    const lineControls = useAnimationControls();

    const tick0 = useAnimationControls();
    const date0 = useAnimationControls();
    const card0 = useAnimationControls();
    const tick1 = useAnimationControls();
    const date1 = useAnimationControls();
    const card1 = useAnimationControls();

    const entryControls = [
        { tick: tick0, date: date0, card: card0 },
        { tick: tick1, date: date1, card: card1 },
    ];

    const hasAnimated = useRef(false);
    const { scrollY } = useScroll();

    const headerFinalX = isMobile ? 27 : 40

    const headerFinalY = 125;

    function headerAnimation() {
        if (!h2Ref.current || !barRef.current) return { x: -300, y: 200 };

        const h2Rect = h2Ref.current.getBoundingClientRect();
        const barRect = barRef.current.getBoundingClientRect();

        const h2Center = h2Rect.left + h2Rect.width / 2;

        // Exact pixel distance from h2's current left edge to the bar's left edge
        const targetX = barRect.left - h2Center - headerFinalX;

        // After rotating -90deg around its center, offset by half the h2's width
        // so it sits vertically alongside the bar rather than floating above it
         const targetY = h2Rect.width + headerFinalY;

        return { x: targetX, y: targetY };
    }

    async function runAnimation() {
        const { x, y } = headerAnimation();

        // Phase 1: slide left to measured x
        await h2Controls.start({
            opacity: 1,
            x,
            transition: { duration: 2, ease: "easeInOut" },
        });

        // Phase 2: rotate once in position
        await h2Controls.start({
            rotate: -90,
            transition: { duration: 0.2, ease: "easeInOut" },
        });

        // Phase 3: drop down alongside the bar
        await h2Controls.start({
            y,
            transition: { duration: 0.5, ease: "easeInOut" },
        });

        // Vertical bar grows after h2 is settled
        await lineControls.start({
            scaleY: 1,
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" },
        });

        for (const { tick, date, card } of entryControls) {
            await tick.start({
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" },
            });
            await date.start({
                opacity: 1,
                x: 0,
                transition: { duration: 0.35, ease: "easeOut" },
            });
            await card.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: "easeOut" },
            });
        }
    }

    function resetAnimation() {
        // Reset all three phases — x, rotate, and y all need to unwind
        h2Controls.start({ opacity: 0, x: 0, y: 0, rotate: 0, transition: { duration: 0.5 } });
        lineControls.start({ scaleY: 0, opacity: 0, transition: { duration: 0.3 } });
        entryControls.forEach(({ tick, date, card }) => {
            tick.start({ scaleX: 0, opacity: 0, transition: { duration: 0.2 } });
            date.start({ opacity: 0, x: -12, transition: { duration: 0.2 } });
            card.start({ opacity: 0, y: 12, transition: { duration: 0.2 } });
        });
    }

    useEffect(() => {
        const handleResize = () => {
            if (hasAnimated.current) {
                hasAnimated.current = false;
                resetAnimation();
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    })

    useMotionValueEvent(scrollY, "change", (v) => {
        if (v > 2000 && !hasAnimated.current) {
            hasAnimated.current = true;
            h2Controls.stop();
            runAnimation();
        } else if (v <= 1800 && hasAnimated.current) {
            hasAnimated.current = false;
            resetAnimation();
        }
    });

    return (
        <section className="mx-auto pl-7 sm:pl-16 md:pl-20 lg:pl-24 xl:pl-28 mb-20 sm:mt-0">
            <div className="flex justify-center mb-8">
                <motion.h2
                    ref={h2Ref}
                    className="text-2xl md:text-4xl tracking-wider"
                    initial={{ opacity: 0, x: 0, rotate: 0, y: 0 }}
                    animate={h2Controls}
                >
                    Experience
                </motion.h2>
            </div>
            <div className="flex">

                {/* Vertical bar + entries */}
                <div className="flex flex-1 min-w-0">

                    {/* The bar — height is driven by content, not a fixed vh */}
                    <motion.div
                        ref={barRef}
                        className="w-1 self-strech rounded-full bg-sky-400/50 origin-top self-stretch shrink-0"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={lineControls}
                    />

                    {/* Entries column */}
                    <div className="flex flex-col gap-28 flex-1 min-w-0 pt-2">
                        {experience.map((exp, i) => {
                            const { tick, date, card } = entryControls[i];
                            return (
                                <div key={exp.company} className="flex flex-col gap-3">

                                    {/* Tick + date row */}
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className="h-1 w-5 sm:w-10 md:w-16 bg-sky-400/50 origin-left shrink-0"
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            animate={tick}
                                        />
                                        <motion.span
                                            className="text-3xl md:text-5xl font-bold tracking-tight text-sky-300/80 whitespace-nowrap"
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={date}
                                        >
                                            {exp.date}
                                        </motion.span>
                                    </div>

                                    {/* Card */}
                                    <motion.div
                                        className="pl-9 sm:pl-14 md:pl-21 flex flex-col gap-1"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={card}
                                    >
                                        <h3 className="text-xl md:text-3xl font-semibold tracking-wide">
                                            {exp.company}
                                        </h3>
                                        <span className="text-base md:text-lg text-white/50">
                                            {exp.role} · {exp.location}
                                        </span>
                                        <ul className="mt-2 space-y-1">
                                            {exp.highlights.map((h) => (
                                                <li
                                                    key={h}
                                                    className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 before:content-['-'] before:mr-2 before:text-sky-400/60"
                                                >
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}