'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "/", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  const transition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
      <motion.line
        x1="2" y1="3" x2="18" y2="3"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isOpen ? { x1: 3, y1: 3, x2: 17, y2: 15 } : { x1: 2, y1: 3, x2: 18, y2: 3 }}
        transition={transition}
      />
      <motion.line
        x1="2" y1="9" x2="18" y2="9"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isOpen ? { x1: 10, y1: 9, x2: 10, y2: 9, opacity: 0 } : { x1: 2, y1: 9, x2: 18, y2: 9, opacity: 1 }}
        transition={transition}
      />
      <motion.line
        x1="2" y1="15" x2="18" y2="15"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isOpen ? { x1: 3, y1: 15, x2: 17, y2: 3 } : { x1: 2, y1: 15, x2: 18, y2: 15 }}
        transition={transition}
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header sits above the drawer at z-50 */}
      <header className="relative z-50 mb-16">

        {/* Desktop nav */}
        <div className="hidden md:flex justify-center px-4 pt-6">
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
        </div>

        {/* Mobile toggle button */}
        <div className="flex justify-end px-4 pt-6 md:hidden">
          <button
            className="rounded-full p-3 bg-gray-700/30 backdrop-blur-sm shadow-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon isOpen={menuOpen} />
          </button>
        </div>
      </header>

      {/* Full-width drawer — sits at z-40, below header/button but above page content */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-0 top-0 z-40 md:hidden bg-gray-900/95 backdrop-blur-md shadow-2xl"
          >
            {/* Spacer pushes links below the header button area */}
            <div className="pt-24 pb-10 px-8">
              <ul className="flex flex-col">
                {links.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.25 }}
                    className="border-b border-gray-700/50 last:border-none"
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 text-lg font-medium tracking-wide hover:text-sky-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}