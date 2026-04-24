'use client';

import { useIsMobileLogo } from "@/app/hooks/useIsMobile";
import { motion, useAnimate, animate, useMotionValue } from "motion/react";
import { useEffect } from "react";

const startX = "35vw";
const startMobile = "55vw";
const endX = "0vw";
const drawEase = [0.25, 0.1, 0.25, 1] as const;

interface Props {
    onStackLanded: () => void;
}

export function LogoAnimation({ onStackLanded }: Props) {
    const [scope, animateScope] = useAnimate();
    const isMobile = useIsMobileLogo();
    const startPosition = isMobile ? startMobile : startX;
    const svgSize = isMobile ? 32 : 40;

    const p1 = useMotionValue(0);
    const p2 = useMotionValue(0);
    const p3 = useMotionValue(0);
    const op2 = useMotionValue(0);
    const op3 = useMotionValue(0);

    useEffect(() => {
        const run = async () => {
            await animateScope("[data-stack]", { x: startPosition }, { duration: 0 });

            await animate(p1, 1, { duration: 0.50, ease: drawEase });
            op2.set(1);
            await animate(p2, 1, { duration: 0.35, ease: drawEase });
            op3.set(1);
            await animate(p3, 1, { duration: 0.35, ease: drawEase });

            await new Promise((r) => setTimeout(r, 120));
            onStackLanded();

            await animateScope("[data-stack]", { x: endX }, { duration: 0.7, ease: [0.76, 0, 0.24, 1] });
        };

        run();
    }, [animateScope, onStackLanded, startPosition, p1, p2, p3, op2, op3]);

    return (
        <div ref={scope} style={{ flexShrink: 0 }} className="pr-1">
            <div data-stack>
                <svg
                    viewBox="0 0 16 16"
                    width={svgSize}
                    height={svgSize}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={0.7}
                >
                    <motion.path
                        d="M8 1.75 L1.75 5 L8 8.25 L14.25 5 Z"
                        style={{ pathLength: p1 }}
                    />
                    <motion.path
                        d="M1.75 8 L8 11.25 L14.25 8"
                        style={{ pathLength: p2, opacity: op2 }}
                    />
                    <motion.path
                        d="M1.75 11 L8 14.25 L14.25 11"
                        style={{ pathLength: p3, opacity: op3 }}
                    />
                </svg>
            </div>
        </div>
    );
}