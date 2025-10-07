"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Pattern from "@/components/ui/Pattern";


export default function Home() {
  return (
    <main className={`font-sans leading-wide min-h-screen w-full relative`}>
      <Pattern />
      <div className="min-h-screen w-full bg-white/90">
      <Header />
        <Hero />
      </div>
    </main>
  );
}