import { GrammarIcon } from "@/public/GrammarIcon";
import { HomeIcon } from "@/public/HomeIcon";
import { KanjiIcon } from "@/public/KanjiIcon";
import { VocabularyIcon } from "@/public/VocabIcon";
import { IconBrandGithub } from "@tabler/icons-react";
import { JapaneseYen } from "lucide-react";
import { FloatingDock } from "./floating-dock";

const links = [
  {
    title: "Home",
    icon: <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/",
  },
  {
    title: "Basics",
    icon: <JapaneseYen className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/basics",
  },
  {
    title: "Vocabulary",
    icon: <VocabularyIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/vocabulary",
  },
  {
    title: "Grammar",
    icon: <GrammarIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/grammar",
  },
  {
    title: "Kanji",
    icon: <KanjiIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/kanji",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://github.com/Sigmabond01/jlptdojo",
  },
];

export default function FloatingNavbar() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  )
}