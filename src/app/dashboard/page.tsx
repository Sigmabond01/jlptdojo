import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getProgress, calculateOverallProgress } from "../../lib/getProgress";
import LevelSection from "@/components/dashboard/Level";
import Header from "@/components/ui/Header";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if(!session?.user?.id) redirect("/");

    const progress = await getProgress(session.user.id);

    const sections = [
        {level: 'N5', data: progress.n5},
        {level: 'N4', data: progress.n4},
    ];

    return (
        <div className="min-h-screen relative bg-gray-400  dark:bg-black text-black dark:text-white">
            <div className="relative z-10 backdrop-blur-[1px]"></div>
            <Header />

            <div className="relative z-10 container mx-auto p-4 md:p-8">
                <header className="mb-12 pt-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">Your Dashboard</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Track Your Progress</p>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        Track your journey through JLPT N5 and N4. Master vocabulary, grammar, and kanji step by step.
                    </p>
                </header>

                {sections.map(({ level, data}) => (
                    <LevelSection key={level} levelName={level} levelDescription="" progress={data} overallPercentage={calculateOverallProgress(data)} />
                ))}
            </div>
        </div>
    );
}