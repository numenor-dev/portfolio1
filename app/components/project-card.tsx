
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useAnimationControls } from "motion/react";
import { projects } from "../lib/static-data";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        }
    }
}

const techVariants = {
    hidden: {
        x: 75,
        opacity: 0,
        transition: {
            x: {
                type: "spring",
                stiffness: 1000,
                damping: 300
            },
            duration: 0.3
        }
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            x: {
                type: "spring",
                stiffness: 75,
                damping: 15,
            },
            duration: 0.8
        }
    }
}

export default function ProjectCard({
    project,
    index,
    total,
    scrollYProgress,
    techDelay
}: {
    project: (typeof projects)[number];
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    techDelay: number[];
}) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasAnimated = useRef(false);

    const center = (total - 1) / 2;
    const stackedRotate = (center - index) * 5;
    const stackedZ = total - index;

    // Stack vertically on scroll
    const spreadY = (index - center) * 235
    const y = useTransform(scrollYProgress, [0, 0.6], [0, spreadY]);
    const rotate = useTransform(scrollYProgress, [0, 0.6], [stackedRotate, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [0.92, 1]);

    const controls = useAnimationControls();

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v >= 0.55 && !hasAnimated.current) {
            hasAnimated.current = true;
            timeoutRef.current = setTimeout(() => controls.start("visible"), techDelay[index] * 300);
        } else if (v < 0.55) {
            hasAnimated.current = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            controls.start("hidden");
        }
    });

    return (
        <motion.a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute w-[21em] sm:w-md md:w-lg lg:w-xl xl:w-2xl md:min-h-56 bg-zinc-950/70 ring ring-sky-900/50 rounded-2xl p-4 sm:p-6
                     shadow-3xl backdrop-blur-md cursor-pointer flex flex-col
                     hover:ring-sky-400/40 transition-colors"
            style={{ y, rotate, scale, zIndex: stackedZ }}
        >
            <ArrowTopRightOnSquareIcon className="absolute top-5 right-2 md:right-5 ml-1 size-4" />
            <h3 className="text-lg md:text-xl lg:text-2xl mb-5 font-semibold text-zinc-200/90">
                {project.title}
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-zinc-200/80 leading-relaxed">
                {project.desc}
            </p>
            <motion.ul
                className="flex flex-row flex-wrap items-center mt-8 mx-auto"
                initial="hidden"
                animate={controls}
                variants={listVariants}
            >
                {project.tech.map((tech, i) => (
                    <motion.li
                        key={tech}
                        className="text-sm xl:text-base text-sky-400/80 md:tracking-wide"
                        variants={techVariants}
                    >
                        <span>{tech}</span>
                        {i !== project.tech.length - 1 && (
                            <span className="mx-2" aria-hidden="true">+</span>
                        )}
                    </motion.li>
                ))}
            </motion.ul>
        </motion.a>
    );
}