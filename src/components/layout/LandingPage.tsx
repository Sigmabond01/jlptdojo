"use client";

import About from "@/components/sections/About";
import Courses from "@/components/sections/Courses";
import { Features } from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/Questions";


export default function Landing() {
  return (
    <main className={`leading-wide min-h-screen w-full relative`}>
      <div className="min-h-screen w-full dark:bg-black bg-gray-100">
        <Hero />
        <Courses />
        <About />
        <Features />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}