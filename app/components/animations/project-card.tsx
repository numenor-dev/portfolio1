import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useAnimationControls } from "motion/react";
import { projects } from "../../lib/static-data";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

const listVariants = {
    visible: {
        transition: {
            staggerChildren: 0.3,
        }
    }
}

const spanVariants = {
    hidden: {
        x: 20,
        opacity: 0,
        transition: {
            x: {
                type: "spring",
                stiffness: 1000,
                damping: 300
            },
            duration: 0.4
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
            duration: 0.4
        }
    }
}

const techVariants = {
    hidden: {
        x: 20,
        opacity: 0,
        transition: {
            x: {
                type: "spring",
                stiffness: 1000,
                damping: 300
            },
            duration: 0.4
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
    const stackedRotate = (center - index) * 7;
    const stackedZ = total - index;

    // Stack vertically on scroll
    const spreadY = (index - center) * 268;
    const y = useTransform(scrollYProgress, [0, 0.35], [0, spreadY]);
    const rotate = useTransform(scrollYProgress, [0, 0.4], [stackedRotate, 0]);

    const controls = useAnimationControls();

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v >= 0.35 && !hasAnimated.current) {
            hasAnimated.current = true;
            timeoutRef.current = setTimeout(() => controls.start("visible"), techDelay[index] * 300);
        } else if (v < 0.35) {
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
            className="absolute w-[21em] sm:w-md md:w-xl lg:w-2xl min-h-60 sm:min-h-64 bg-zinc-950/70 border-l-2 border-r-2 border-sky-700/80 rounded-3xl p-4 sm:p-6
                     shadow-3xl backdrop-blur-sm cursor-pointer flex flex-col
                     hover:border-sky-300/40 transition-colors overflow-hidden"
            style={{ y, rotate, zIndex: stackedZ }}
        >
            <ArrowTopRightOnSquareIcon className="absolute top-4 right-2 md:top-5 md:right-5 ml-1 size-3 md:size-4" />
            <span className="text-xl md:text-2xl lg:text-3xl my-3 md:my-4 font-semibold text-zinc-200/90">
                {project.title}
            </span>
            <p className="text-sm md:text-base lg:text-lg text-zinc-200/80 leading-relaxed">
                {project.desc}
            </p>
            <motion.ul
                className="flex flex-row flex-wrap items-center mt-10"
                initial="hidden"
                animate={controls}
                variants={listVariants}
            >
                <motion.span
                className="pr-2 text-sm xl:text-base md:tracking-wide"
                    initial="hidden"
                    animate={controls}
                    variants={spanVariants}
                >
                    Built with:
                </motion.span>
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