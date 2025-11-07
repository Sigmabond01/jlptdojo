import { LevelProgress } from "@/lib/getProgress";
import ProgressCard from "./ProgressCard";
import OverallProgress from "./OverallProgress";

interface LevelSection {
  levelName: string;
  levelDescription: string;
  progress: LevelProgress;
  overallPercentage: number;   
}

export default function LevelSection({ levelName, levelDescription, progress, overallPercentage }: LevelSection) {
    const categories = [
        { title: "Vocabulary", data: progress.vocab, href: `/vocabulary/${levelName.toLowerCase()}` },
        { title: "Grammar", data: progress.grammar, href: `/grammar/${levelName.toLowerCase()}` },
        { title: "Kanji", data: progress.kanji, href: `/kanji/${levelName.toLowerCase()}` },
    ];

    return (
        <section className="mb-12">
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <span className="inline-block px-4 py-2 bg-black/10 dark:bg-white/10 rounded-full text-2xl">JLPT {levelName}</span>
                <span className="text-2xl text-gray-600 dark:text-gray-400">{levelDescription}</span>
            </h2>

            <OverallProgress level={progress} percentage={overallPercentage} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <ProgressCard key={category.title} {...category} />
                ))}
            </div>
        </section>
    );
}