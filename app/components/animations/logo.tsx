'use client';

import { useIsMobile } from "@/app/hooks/useIsMobile";
import { motion, useAnimate } from "motion/react";
import { useEffect } from "react";


const planeBase = {
    width: 25,
    height: 25,
    backgroundColor: "transparent",
    borderWidth: "medium",
    borderColor: "inherit",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    marginTop: -19,
    marginLeft: -17,
    rotateZ: 45,
    rotateX: 55,
    opacity: 0
};

const planeBaseMobile = {
    width: 18,
    height: 18,
    backgroundColor: "transparent",
    borderWidth: "medium",
    borderColor: "inherit",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    marginTop: -19,
    marginLeft: -12,
    rotateZ: 45,
    rotateX: 55,
    opacity: 0
}

const startX = "25vw";
const startMobile = "40vw";
const endX = "0vw";
const startY = -120;
const endY = { p1: 15, p2: 8, p3: 1 };
const endYMobile = { p1: 15, p2: 10, p3: 5}
const dropEase = [0.33, 1, 0.68, 1] as const;

interface Props {
    onStackLanded: () => void;
}

export function LogoAnimation({ onStackLanded }: Props) {
    const [scope, animate] = useAnimate();
    const isMobile = useIsMobile();
    const startPositionMobile = isMobile ? startMobile : startX
    const planeBaseSize = isMobile ? {...planeBaseMobile} : {...planeBase}
    const widthMobile = isMobile ? {width: 32} : {width: 47}
    const animateEndY = isMobile ? endYMobile : endY

    useEffect(() => {
        const run = async () => {
            await animate("[data-stack]", { x: startPositionMobile }, { duration: 0 });
            await animate("[data-plane]", { y: startY }, { duration: 0 });

            await animate("[data-plane='1']", { opacity: 1, y: animateEndY.p1 }, { duration: 0.36, ease: dropEase });
            await animate("[data-plane='2']", { opacity: 1, y: animateEndY.p2 }, { duration: 0.32, ease: dropEase });
            await animate("[data-plane='3']", { opacity: 1, y: animateEndY.p3 }, { duration: 0.28, ease: dropEase });

            await new Promise((r) => setTimeout(r, 120));
            onStackLanded();

            await animate("[data-stack]", { x: endX }, { duration: 0.7, ease: [0.76, 0, 0.24, 1] });
        };

        run();
    }, [animate, onStackLanded, startPositionMobile, animateEndY]);

    return (
        <div
            ref={scope}
            style={{
                perspective: 700,
                flexShrink: 0
            }}
        >
            <div
                data-stack
                style={{ position: "relative", ...widthMobile, height: 50 }}
            >
                {(["1", "2", "3"] as const).map((plane, i) => (
                    <motion.div
                        key={plane}
                        data-plane={plane}
                        style={{ ...planeBaseSize, zIndex: i + 1 }}
                    />
                ))}
            </div>
        </div>
    );
}