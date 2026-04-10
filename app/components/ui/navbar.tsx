'use client';

import Link from "next/link";
import { useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";

const links = [
  { href: "/", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Fade out between 60px and 120px of scroll
  const opacity = useTransform(scrollY, [50, 175], [1, 0]);
  const pointerEvents = useTransform(opacity, (v) => (v === 0 ? "none" : "auto"));

  return (
    <header className="relative z-50 mb-16">

      {/* Desktop nav fades on scroll */}
      <motion.div
        className="fixed top-6 left-0 right-0 justify-center px-4 hidden md:flex"
        style={{ opacity, pointerEvents }}
      >
        <nav>
          <ul className="flex items-center space-x-9 rounded-full px-7 py-2.5 text-sm bg-gray-700/30 font-medium shadow-lg backdrop-blur-sm">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="border-b-2 border-transparent hover:border-b-sky-400/70 transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Mobile button */}
      <motion.div
        className="fixed top-9 right-8 z-50 md:hidden"
        style={{ opacity, pointerEvents }}
      >
        <button
          className="rounded-full p-3 bg-gray-700/30 shadow-lg backdrop-blur-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <XMarkIcon className="size-4" />
            : <Bars3Icon className="size-4" />
          }
        </button>
      </motion.div>

      {/* Mobile menu drodown */}
      {menuOpen && (
        <div className="fixed top-20 right-10 md:hidden rounded-2xl bg-gray-700/30 px-6 py-4 shadow-lg backdrop-blur-sm">
          <ul className="flex flex-col gap-5 text-sm font-medium">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="inline-block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}