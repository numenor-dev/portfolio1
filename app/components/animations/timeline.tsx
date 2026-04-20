import { useRef, useEffect } from "react";
import { motion, useScroll, useAnimationControls, useMotionValueEvent, Variants } from "motion/react";
import { experience } from "@/app/lib/static-data";
import { useIsMobile } from "@/app/hooks/useIsMobile";

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


export default function TimelineLine() {
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();

    const h2Controls = useAnimationControls();
    const lineControls = useAnimationControls();
    const entriesControls = useAnimationControls();

    const hasAnimated = useRef(false);
    const { scrollY } = useScroll();

    const headerFinalX = isMobile ? 20 : 33

    const headerFinalY = isMobile ? 180 : 130;

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

        await h2Controls.start({ opacity: 1, x, transition: { duration: 1.7, ease: "easeInOut" } });
        await h2Controls.start({ rotate: -90, transition: { duration: 0.2, ease: "easeInOut" } });
        await h2Controls.start({ y, transition: { duration: 0.5, ease: "easeInOut" } });

        await lineControls.start({ scaleY: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } });

        entriesControls.start("visible");
    }

    function resetAnimation() {
        h2Controls.start({ opacity: 0, x: 0, y: 0, rotate: 0, transition: { duration: 0.5 } });
        lineControls.start({ scaleY: 0, opacity: 0, transition: { duration: 0.3 } });
        entriesControls.start("hidden");
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        <section className="mx-auto pl-9 sm:pl-16 xl:pl-18 mb-20 sm:mt-0">
            <div className="flex justify-center mb-8 w-96">
                <motion.h2
                    ref={h2Ref}
                    className="text-2xl md:text-4xl tracking-tighter"
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
                    <motion.div
                        className="flex flex-col gap-16 sm:gap-22 flex-1 min-w-0"
                        initial="hidden"
                        animate={entriesControls}
                        variants={containerVariants}
                    >
                        {experience.map((exp) => (
                            <motion.div key={exp.company} className="flex flex-col gap-1" variants={entryVariants}>

                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="h-1 w-8 sm:w-12 md:w-16 bg-sky-400/50 origin-left shrink-0"
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
                                className="pl-12 sm:pl-16 md:pl-21 flex flex-col gap-1 max-w-72 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                                variants={cardVariants}
                                >
                                    <h3 className="text-xl md:text-3xl font-semibold tracking-wide">
                                        {exp.company}
                                        </h3>
                                    <span className="text-base md:text-lg text-white/50">
                                        {exp.role} · {exp.location}
                                    </span>
                                    <ul className="mt-2 space-y-1">
                                        {exp.highlights.map((h) => (
                                            <li key={h} className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 before:content-['-'] before:mr-2 before:text-sky-400/60">
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