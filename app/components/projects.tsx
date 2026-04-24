import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, techDelay } from "../lib/static-data";
import ProjectCard from "./animations/project-card";

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // h2 animates once cards finish animating
    const scrollOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[275vh] mb-16">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-semibold tracking-tighter mb-1 sm:mb-2"
                    style={{
                        opacity: scrollOpacity,
                        y: -270,
                    }}
                >
                    Projects
                </motion.h2>

                <div className="relative flex items-center justify-center w-full">

                    {projects.map((project, i) => {
                        return (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={i}
                                total={projects.length}
                                scrollYProgress={scrollYProgress}
                                techDelay={techDelay}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}