
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
    const scrollOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
    const scrollY = useTransform(scrollYProgress, [0.55, 0.7], [-235, -230]);

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                <motion.h2
                    className="text-3xl font-semibold tracking-tight mb-1 sm:mb-2"
                    style={{
                        opacity: scrollOpacity,
                        y: scrollY
                    }}
                >
                    Projects
                </motion.h2>

                <div className="relative flex items-center justify-center w-full">
                    {projects.map((project, i) => {
                        let techListDelay = 0;
                        const techDelay = 0.7 + techListDelay;
                        techListDelay += project.tech.length * 0.3 + 1;

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