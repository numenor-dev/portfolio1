'use client';

import { useState } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";


const LogoAnimation = dynamic(() => import("../animations/logo").then((mod) => mod.LogoAnimation), {
    ssr: false,
    loading: () => <span style={{ width: 47, height: 55, display: "inline-block" }} />
});

export default function HeroSection() {
    const [stackLanded, setStackLanded] = useState(false);

    return (
        <section className="flex flex-col mx-auto max-w-xs sm:max-w-sm md:max-w-lg">
            <div className="flex flex-row items-center">
                <LogoAnimation onStackLanded={() => setStackLanded(true)} />
                <motion.h1
                    className="text-3xl md:text-4xl font-semibold tracking-tight"
                    initial={{ opacity: 0.001, clipPath: "inset(0 0 0 100%)" }}
                    animate={stackLanded ? { opacity: 1, clipPath: "inset(0 0 0 0)" } : {}}
                    transition={{ duration: 0.3, delay: 0.43 }}
                >
                    Hey, I&apos;m <span className="text-sky-400/60">Nick Ahlers.</span>
                </motion.h1>
            </div>
            <div>
                <motion.p
                    className="text-lg md:text-xl font-normal leading-8"
                    initial={{ opacity: 0.001 }}
                    animate={stackLanded ? { opacity: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                    I&apos;m a Frontend Developer with several years of fullstack experience.
                    I build intuitive, high-performing web apps from the ground up.
                </motion.p>
            </div>
        </section>
    );
}