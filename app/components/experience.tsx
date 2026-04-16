"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { experience } from "../lib/static-data";
import { CountUp } from "../hooks/countUp";


function ExperienceItem({
  exp,
  index,
}: {
  exp: (typeof experience)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  // Image reveals as user scrolls
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start 0.85", "start 0.3"],
  });
  const rawClip = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const smoothClip = useSpring(rawClip, { stiffness: 60, damping: 20 });
  const clipPath = useTransform(
    smoothClip,
    (v) => `inset(0 0 ${v}% 0)`
  );

  // Scale the image slightly as it reveals for depth
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const smoothScale = useSpring(scale, { stiffness: 60, damping: 20 });

  // Text slide-in
  const txtRef = useRef<HTMLDivElement>(null);
  const txtInView = useInView(txtRef, { once: true, margin: "0px 0px -15% 0px" });

  // Year badge
  const [yearsVisible, setYearsVisible] = useState(false);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.85 && !yearsVisible) {
        setTimeout(() => setYearsVisible(true), 300);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, yearsVisible]);

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 border-t border-white/5 ${
        isLeft ? "" : "lg:[direction:rtl]"
      }`}
    >
      {/* Image panel */}
      <div ref={imgRef} className="relative overflow-hidden h-85 lg:h-100">
        <motion.div
          style={{ clipPath, scale: smoothScale }}
          className="absolute inset-0 origin-bottom"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{ background: exp.bg }}
          />

          {/* SVG grid overlay */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={`${(i + 1) * 10}%`} y1="0"
                x2={`${(i + 1) * 10}%`} y2="100%"
                stroke="#2dd4bf" strokeWidth="0.5" opacity="0.1"
              />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0" y1={`${(i + 1) * 10}%`}
                x2="100%" y2={`${(i + 1) * 10}%`}
                stroke="#2dd4bf" strokeWidth="0.5" opacity="0.1"
              />
            ))}
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.15" />
            <circle cx="70%" cy="32%" r="19%" fill="none" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.12" />
            <circle cx="70%" cy="32%" r="7%" fill="none" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.2" />
          </svg>

          {/* Watermark */}
          <div
            className="absolute bottom-[6%] left-[5%] select-none whitespace-nowrap leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "rgba(255,255,255,0.03)",
              letterSpacing: "0.05em",
            }}
          >
            {exp.company.toUpperCase()}
          </div>
        </motion.div>

        {/* ── Year badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.93 }}
          animate={
            yearsVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: -10, scale: 0.93 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-4 right-4 z-10"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "#2dd4bf",
            background: "rgba(5, 8, 12, 0.82)",
            border: "1px solid rgba(45, 212, 191, 0.22)",
            padding: "0.35rem 0.75rem",
            letterSpacing: "0.1em",
            // Undo direction:rtl from parent on odd rows
            direction: "ltr",
          }}
        >
          <CountUp from={exp.period.start} to={exp.period.start} running={yearsVisible} />
          {" — "}
          <CountUp
            from={exp.period.start}
            to={exp.period.end}
            duration={1000}
            running={yearsVisible}
          />
        </motion.div>
      </div>

      {/* ── Text panel ── */}
      <motion.div
        ref={txtRef}
        initial={{ opacity: 0, x: isLeft ? 32 : -32 }}
        animate={txtInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="flex flex-col justify-center px-8 py-10 lg:py-14"
        style={{ direction: "ltr" }}
      >
        {/* Location */}
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            color: "#2dd4bf",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            opacity: 0.8,
          }}
        >
          {exp.location}
        </p>

        {/* Company */}
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            color: "#ede8dc",
            letterSpacing: "0.03em",
            lineHeight: 0.88,
            marginBottom: "0.5rem",
          }}
        >
          {exp.company}
        </h2>

        {/* Role */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 300,
            color: "#6b7280",
            letterSpacing: "0.03em",
            marginBottom: "1.25rem",
          }}
        >
          {exp.role}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            color: "#9ca3af",
            lineHeight: 1.8,
            maxWidth: "38ch",
            marginBottom: "1.25rem",
          }}
        >
          {exp.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-col">
          {exp.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-start gap-2 py-[0.35rem]"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "#6b7280",
              }}
            >
              <span style={{ color: "#2dd4bf", fontSize: "0.48rem", marginTop: "0.22em", flexShrink: 0 }}>
                ◆
              </span>
              {h}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="flex flex-col min-h-screen">
         <h1 className="mx-auto text-4xl mb-5 tracking-wider"
        >
          Experience
        </h1>

      {/* Experience rows */}
      <div className="max-w-350 mx-auto">
        {experience.map((exp, i) => (
          <ExperienceItem key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}