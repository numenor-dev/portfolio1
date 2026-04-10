'use client';

import Hero from "./components/ui/hero";
import Header from "./components/header";
import Projects from "./components/projects";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex w-full flex-col items-center px-7 sm:items-start">
        <div className="w-full bg-radial flex flex-col from-slate-600/10 from-5% to-almost-black to-60%">
          <Header />
          <Hero />
          <Projects />
        </div>
      </main>
    </div>
  );
}