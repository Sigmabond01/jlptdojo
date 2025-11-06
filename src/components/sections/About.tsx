import { useState } from "react";

export default function About() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
const principles = [
  {
    kanji: "志",
    title: "Purpose",
    subtitle: "Kokorozashi",
    description: "Set clear JLPT goals and pursue Japanese fluency with focused intent"
  },
  {
    kanji: "修",
    title: "Discipline",
    subtitle: "Shūgyō",
    description: "Develop strong study discipline through consistent JLPT learning practice"
  },
  {
    kanji: "進",
    title: "Progress",
    subtitle: "Shinpo",
    description: "Track your JLPT progress and improve Japanese skills every single day"
  },
  {
    kanji: "達",
    title: "Mastery",
    subtitle: "Tassei",
    description: "Reach true JLPT mastery through dedication, repetition, and lifelong learning"
  }
];


  return (
    <div className="relative z-10 min-h-screen dark:bg-black bg-gray-400 dark:text-white text-black flex flex-col items-center justify-center p-8 overflow-hidden">

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-7xl font-bold tracking-wide mb-10">
          ABOUT
        </h1>
        <div className="flex items-center justify-center gap-4 text-black dark:text-gray-500">
          <p className="text-lg">
            JLPTDOJO is a focused training ground for mastering the Japanese Language Proficiency Test (JLPT) through discipline, structure, and consistent progress.
            Train like a true learner refine your Japanese, strengthen your skills, and achieve mastery with purpose.
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {principles.map((principle, index) => (
          <div
            key={index}
            className={`group relative border-2 border-white/30 hover:border-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer dark:bg-neutral-950
              ${activeCard === index ? 'scale-105 shadow-2xl shadow-white/20' : 'hover:scale-105'}
            `}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
          >
            
            <div className="relative p-8 h-full flex flex-col items-center justify-center text-center">
              <div 
                className="text-8xl font-bold mb-4 transition-all dark:text-white text-black duration-500 opacity-20 group-hover:opacity-60 group-hover:scale-110"
              >
                {principle.kanji}
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2 group-hover:text-white transition-colors">
                {principle.title}
              </h3>

              <p className="text-sm dark:text-gray-500 text-black mb-6 italic">{principle.subtitle}</p>

              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  activeCard === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm dark:text-gray-400 text-black leading-relaxed px-2">
                  {principle.description}
                </p>
              </div>
            </div>

            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/40" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/40" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40" />
          </div>
        ))}
      </div>
    </div>
  );
}