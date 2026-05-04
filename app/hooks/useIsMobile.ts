'use client';

import { useState, useEffect } from "react";

function useIsBelowWidth(breakpoint: number): boolean | null {
    const [isBelow, setIsBelow] = useState<boolean | null>(null);
    useEffect(() => {
        const check = () => setIsBelow(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);
    return isBelow;
}

export const useIsMobileLogo = () => useIsBelowWidth(775);
export const useIsMobileTimeLine = () => useIsBelowWidth(650);