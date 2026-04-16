'use client';

import { useState, useEffect } from "react";

export function CountUp({
    from,
    to,
    duration = 1100,
    running,
}: {
    from: number;
    to: number;
    duration?: number;
    running: boolean;
}) {
    const [val, setVal] = useState(from);

    useEffect(() => {
        if (!running) return;
        let startTs: number | null = null;

        const tick = (ts: number) => {
            if (!startTs) startTs = ts;
            const p = Math.min((ts - startTs) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(from + (to - from) * ease));
            if (p < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [running, from, to, duration]);

    return (
        <>{val}</>
    )
}