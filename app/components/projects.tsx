
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
    const scrollOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const scrollY = useTransform(scrollYProgress, [0.55, 0.7], [-270, -270]);

    const techDelays = projects.reduce<number[]>((total, project, i) => {
        const prev = i === 0 ? 0 : total[i - 1] + projects[i - 1].tech.length * 0.7 + 1;
        total.push(0.7 + prev);
        return total;
    }, []);

    return (
        <section ref={containerRef} className="relative h-[300vh] mb-16">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                <motion.h2
                    className="text-4xl font-semibold tracking-wider mb-1 sm:mb-2"
                    style={{
                        opacity: scrollOpacity,
                        y: scrollY
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
                                techDelay={techDelays}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}