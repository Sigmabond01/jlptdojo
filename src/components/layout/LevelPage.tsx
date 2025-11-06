import { FloatingDock } from "@/components/ui/floating-dock";
import Header from "@/components/ui/Header";
import { GrammarIcon } from "@/public/GrammarIcon";
import { HomeIcon } from "@/public/HomeIcon";
import { KanjiIcon } from "@/public/KanjiIcon";
import { VocabularyIcon } from "@/public/VocabIcon";
import { IconBrandGithub } from "@tabler/icons-react";
import { ArrowRight, JapaneseYen } from "lucide-react";
import Footer from "../sections/Footer";

interface Props {
    params: {
    category: string;
    }
}

const links = [
  {
    title: "Home",
    icon: (
      <HomeIcon className='h-full w-full text-neutral-500 dark:text-neutral-300' />
    ),
    href: "/",
  },
  {
    title: "Basics",
    icon: (
      <JapaneseYen className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/basics",
  },
  {
    title: "Vocabulary",
    icon: (
      <VocabularyIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/vocabulary",
  },
  {
    title: "Grammar",
    icon: (
      <GrammarIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/grammar",
  },
  {
    title: "Kanji",
    icon: (
      <KanjiIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/kanji",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com/Sigmabond01/jlptdojo",
  },
];

const levelsData = {
    vocabulary: [
        { level: "N5", title: "Beginner", description: "Basic vocabulary and common expressions", itemCount: "600+ words", color: "from-gray-500/20 to-gray-400/20" },
        { level: "N4", title: "Elementary", description: "Everyday conversations and topics", itemCount: "600+ words", color: "from-blue-500/20 to-cyan-500/20" },
    ],
    grammar: [
        { level: "N5", title: "Beginner", description: "Basic sentence structures and particles", itemCount: "100+ points", color: "from-gray-500/20 to-gray-400/20" },
        { level: "N4", title: "Elementary", description: "More complex structures and conjunctions", itemCount: "150+ points", color: "from-blue-500/20 to-cyan-500/20" },
    ],
    kanji: [
        { level: "N5", title: "Beginner", description: "The first 80 essential kanji", itemCount: "80 Kanji", color: "from-gray-500/20 to-gray-400/20" },
        { level: "N4", title: "Elementary", description: "Building up common use kanji", itemCount: "167 Kanji", color: "from-blue-500/20 to-cyan-500/20" },
    ]
};

export default async function LevelPage({ params }: Props) {
  const { category } = await params;
  const categoryParam = category.toLowerCase();
  const levels = levelsData[categoryParam as keyof typeof levelsData];
  const categoryTitle = {
    vocabulary: "Vocabulary",
    grammar: "Grammar",
    kanji: "Kanji",
  }[categoryParam];

  return (
    <div className="min-h-screen relative bg-gray-400 dark:bg-black text-black dark:text-white">
      <Header />
      <div className="relative z-10 w-full p-8 pb-32">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            {categoryTitle} Section
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From beginner basics to professional mastery, build your grammar across all JLPT levels
          </p>
        </div>

        {levels && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {levels.map((item) => (
              <a
                href={`/${categoryParam}/${item.level.toLowerCase()}`}
                key={item.level}
                className="group relative backdrop-blur-xl dark:bg-neutral-950 bg-white/80 border-2 border-black/10 dark:border-white/10 rounded-3xl p-8 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `linear-gradient(135deg, ${item.color.split(" ")[1]}, ${item.color.split(" ")[3]})`,
                  }}
                />
                <div className="relative z-10">
                  <div className="inline-block px-4 py-2 bg-black/10 dark:bg-white/10 rounded-full mb-4">
                    <span className="text-2xl font-bold">JLPT {item.level}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent my-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-200">
                      {item.itemCount}
                    </span>
                    <ArrowRight />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={links} />
      </div>
      <Footer />
    </div>
  );
}
