'use client';

import dynamic from "next/dynamic";
import Hero from "./components/ui/hero";
import Header from "./components/header";
import Projects from "./components/projects";

const Experience = dynamic(() => import("./components/experience"));
const About = dynamic(() => import("./components/aboutme"));
const Footer = dynamic(() => import("./components/footer"));

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Footer />
    </div>
  );
}