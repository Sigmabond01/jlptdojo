import { LevelProgress } from "@/lib/getProgress";

interface OverallProgress {
    level: LevelProgress;
    percentage: number;
}

export default function OverallProgress({ level, percentage}: OverallProgress) {
    const totalCompleted = level.vocab.completed + level.grammar.completed + level.kanji.completed;
    const totalItems = level.vocab.total + level.grammar.total + level.kanji.total;

    return (
        <div className="mb-6 relative bg-white/80 dark:bg-black/80 border-2 border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Overall Progress</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {totalCompleted} / {totalItems} completed
                    </p>
                </div>

                <div className="relative w-28 h-28">
                              <svg className="w-28 h-28 transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-black/10 dark:text-white/10"
            />
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 48}`}
              strokeDashoffset={`${2 * Math.PI * 48 * (1 - percentage / 100)}`}
              className="text-black dark:text-white transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl font-bold"> {percentage}% </div>
                    </div>
                </div>
            </div>
        </div>
    );
}