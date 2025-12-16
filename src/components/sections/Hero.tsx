import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTextFlip } from '../ui/layout-text-flip';
import Header from "@/components/ui/Navbar";
import DojoText from '../ui/Dojotext';
import Pattern from '../ui/Pattern';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gray-400 dark:bg-black">
      <Pattern />
      <div className="relative z-50 backdrop-blur-[1px] flex pt-24 md:pt-44 min-h-screen p-4">
        <Header />
        <div className="text-center mb-8 md:ml-8 ml-0">
          <motion.div className="relative mx-4 my-32 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
            <h1 className='text-2xl dark:text-white text-black font-bold tracking-tight drop-shadow-lg md:text-6xl'>
              Fluency Forged through
            </h1>
            <LayoutTextFlip
              text="Fluency forged through"
              words={["Structure", "Focus", "Repetition", "Intent", "Discipline"]}
            />
          </motion.div>
          <div className='md:fixed relative'>
            <p className="mt-4 md:ml-24 text-center text-xl font-semibold dark:text-white text-black px-4 md:px-0">
              A focused platform built to help you train, test, and master every JLPT level
            </p>
          </div>
          <div className='fixed md:block hidden right-20 bottom-32'>
            <DojoText />
          </div>

          <div className='space-x-4 pt-18 text-xl md:ml-48 md:fixed flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-center max-w-4xl'>
            <Link href='#courses' className='dark:bg-neutral-950 dark:hover:border-neutral-900 bg-gray-200 border hover:bg-neutral-900 text-black dark:text-white dark:font-normal font-bold border-white/30 px-8 py-4 rounded-xl hover:dark:bg-white/90 hover:dark:text-black transition duration-200'>Explore courses</Link>
            <Link href='/about' className='dark:bg-neutral-950 dark:hover:border-neutral-900 bg-gray-200 border hover:bg-neutral-900 text-black dark:text-white dark:font-normal font-bold border-white/30 px-8 py-4 rounded-xl hover:dark:bg-white/90 hover:dark:text-black transition duration-200'>Get started</Link>
          </div>

        </div>
      </div>
    </div>
  );
}