'use client';

import { useIsMobile } from "@/app/hooks/useIsMobile";
import { motion, useAnimate, animate, useMotionValue } from "motion/react";
import { useEffect } from "react";

const startX = "30vw";
const startMobile = "65vw";
const endX = "0vw";
const endXMobile = "1.5vw";
const drawEase = [0.25, 0.1, 0.25, 1] as const;

interface Props {
    onStackLanded: () => void;
}

export function LogoAnimation({ onStackLanded }: Props) {
    const [scope, animateScope] = useAnimate();
    const isMobile = useIsMobile();
    const startPosition = isMobile ? startMobile : startX;
    const endPosition = isMobile ? endXMobile : endX;
    const svgSize = isMobile ? 31 : 43;

    const p1 = useMotionValue(0);
    const p2 = useMotionValue(0);
    const p3 = useMotionValue(0);

    useEffect(() => {
        const run = async () => {
            await animateScope("[data-stack]", { x: startPosition }, { duration: 0 });

            await animate(p1, 1, { duration: 0.50, ease: drawEase });
            await animate(p2, 1, { duration: 0.40, ease: drawEase });
            await animate(p3, 1, { duration: 0.40, ease: drawEase });

            await new Promise((r) => setTimeout(r, 120));
            onStackLanded();

            await animateScope("[data-stack]", { x: endPosition }, { duration: 0.7, ease: [0.76, 0, 0.24, 1] });
        };

        run();
    }, [animateScope, onStackLanded, startPosition, p1, p2, p3, endPosition]);

    return (
        <div ref={scope} style={{ flexShrink: 0 }} className="pr-3 md:pr-2">
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
                        style={{ pathLength: p2 }}
                    />
                    <motion.path
                        d="M1.75 11 L8 14.25 L14.25 11"
                        style={{ pathLength: p3 }}
                    />
                </svg>
            </div>
        </div>
    );
}