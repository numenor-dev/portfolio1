'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "https://github.com/numenor-dev", label: "Github" },
  { href: "https://www.linkedin.com/in/nick-ahlers/", label: "LinkedIn" },
  { href: "https://drive.google.com/file/d/1kkW8Q4aUNFRU5HiaUEXNGrLURhW1DR4R/view?usp=sharing", label: "Resume" },
];

const lineTransition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const };

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
      <motion.line
        x1="2" y1="3" x2="18" y2="3"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isOpen ? { x1: 3, y1: 3, x2: 17, y2: 15 } : { x1: 2, y1: 3, x2: 18, y2: 3 }}
        transition={lineTransition}
      />
      <motion.line
        x1="2" y1="9" x2="18" y2="9"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isOpen
          ? { x1: 10, y1: 9, x2: 10, y2: 9, opacity: 0 }
          : { x1: 2, y1: 9, x2: 18, y2: 9, opacity: 1 }}
        transition={lineTransition}
      />
      <motion.line
        x1="2" y1="15" x2="18" y2="15"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isOpen ? { x1: 3, y1: 15, x2: 17, y2: 3 } : { x1: 2, y1: 15, x2: 18, y2: 15 }}
        transition={lineTransition}
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent horizontal bleed while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="relative z-50 mb-16">

        {/* Desktop nav */}
        <div className="hidden md:flex justify-center pt-7">
          <nav>
            <ul className="flex items-center space-x-12 rounded-full px-7 py-2.5 text-sm bg-slate-700/50 font-medium">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener referrer"
                    className="border-b-2 border-transparent hover:border-b-teal-400/70 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile menu button */}
        <div className="flex justify-end px-7 pt-8 md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="rounded-full p-3 bg-gray-700/30 backdrop-blur-sm shadow-lg"
          >
            <MenuIcon isOpen={menuOpen} />
          </button>
        </div>
      </header>

      <div className="fixed inset-0 z-40 pointer-events-none md:hidden">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav"
              key="mobile-drawer"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-x-0 top-0 overflow-hidden pointer-events-auto bg-gray-900/95 backdrop-blur-md shadow-2xl"
            >
              <div className="pt-24 pb-10 px-8">
                <ul className="flex flex-col">
                  {links.map(({ href, label }, i) => (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.25 }}
                      className="border-b border-gray-700/50 last:border-none p-3"
                    >
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener referrer"
                        onClick={closeMenu}
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
      </div>
    </>
  );
}