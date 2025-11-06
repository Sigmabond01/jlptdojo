import AlphabetChart from "@/components/ui/AlphabetChart";
import { FloatingDock } from "../ui/floating-dock";
import { JapaneseYen } from "lucide-react";
import { VocabularyIcon } from "@/public/VocabIcon";
import { GrammarIcon } from "@/public/GrammarIcon";
import { KanjiIcon } from "@/public/KanjiIcon";
import { IconBrandGithub } from "@tabler/icons-react";
import { HomeIcon } from "@/public/HomeIcon";
import Header from "../ui/Header";
import Footer from "../sections/Footer";

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

export default function BasicsPage() {
    return (
        <div className="min-h-screen relative bg-gray-400 dark:bg-black text-black dark:text-white">
            <Header /> 
            <div className="pt-18 space-y-4">
            <h1 className="text-center text-5xl font-bold">Hiragana and Katakana</h1>
            <p className="text-center text-gray-400 font-semibold">If you are completely new to Japanese, start by learning the alphabets</p>
            </div>
            <AlphabetChart />
            <Footer />
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <FloatingDock items={links} />
          </div>
        </div>
    )
}