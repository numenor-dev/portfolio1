import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
    const x = useTransform(scrollYProgress, [0.3, 0.7], [0, -300]);
    const rotate = useTransform(scrollYProgress, [0.699, 0.7], [0, -90]);

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 mt-20 flex items-center justify-center">
                <motion.h2
                    className="text-2xl tracking-widest"
                    style={{ opacity, x, rotate }}
                >
                    Experience
                </motion.h2>
            </div>
        </section>
    );
}