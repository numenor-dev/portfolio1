
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects } from "../lib/static-data";
import ProjectCard from "./project-card";


export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // h2 animates once cards finish animating
    const scrollOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                <motion.h2
                    className="text-3xl font-semibold tracking-tight mb-2 sm:mb-0"
                    animate={{ y: -220 }}
                    style={{
                        opacity: scrollOpacity,
                    }}
                >
                    Projects
                </motion.h2>

                <div className="relative flex items-center justify-center w-full">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                            total={projects.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}