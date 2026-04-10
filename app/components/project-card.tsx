
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "../lib/static-data";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function ProjectCard({
    project,
    index,
    total,
    scrollYProgress,
}: {
    project: (typeof projects)[number];
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const center = (total - 1) / 2;
    const stackedRotate = (index - center) * 5;
    const stackedZ = total - Math.abs(index - center);

    // Stack vertically on scroll
    const spreadY = (index - center) * 205
    const gap = 23;
    const y = useTransform(scrollYProgress, [0, 0.6], [0, spreadY]);
    const rotate = useTransform(scrollYProgress, [0, 0.6], [stackedRotate, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [0.92, 1]);

    return (
        <motion.a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute w-[20em] sm:w-md md:w-lg lg:w-xl md:min-h-48 bg-sky-900/20 border border-sky-900/70 rounded-2xl p-4 sm:p-6
                     shadow-2xl backdrop-blur-md cursor-pointer flex flex-col gap-3
                     hover:border-cyan-300/40 transition-colors"
            style={{ y, gap, rotate, scale, zIndex: stackedZ }}
        >
            <ArrowTopRightOnSquareIcon className="fixed top-5 right-5 ml-1 size-4" />
            <h3 className="text-lg md:text-xl font-semibold text-zinc-200/90">{project.title}</h3>
            <p className="text-sm md:text-base text-zinc-200/80 leading-relaxed">
                {project.desc}
            </p>
            <span className="text-xs text-sky-400 mt-auto">{project.tech}</span>
        </motion.a>
    );
}