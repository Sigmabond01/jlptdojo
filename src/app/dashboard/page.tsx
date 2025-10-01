import { PrismaClient } from "@/generated/prisma"; 
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

async function getProgress(userId:string) {
    const totalN5Vocab = await prisma.vocabulary.count({where: {level: 'N5'}});
    const completedN5Vocab = await prisma.vocabularyProgress.count({
        where: {userId, vocabulary: {level: "N5"}},
    });

    const totalN5Kanji = await prisma.kanji.count({where: {level: 'N5'}});
    const completedN5Kanji = await prisma.kanjiProgress.count({
        where: {userId, kanji: {level: "N5"}},
    });

    return {
        n5Vocab: {
            total: totalN5Vocab,
            completed: completedN5Vocab,
            percentage: totalN5Vocab > 0 ? Math.round((completedN5Vocab / totalN5Vocab) * 100) : 0,
        },
        n5Kanji: {
            total: totalN5Kanji,
            completed: completedN5Kanji,
            percentage: totalN5Kanji > 0 ? Math.round((completedN5Kanji / totalN5Kanji) * 100) : 0,
        },
    };
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if(!session?.user?.id) {
        redirect("/");
    }
    
    const progress = await getProgress(session.user.id);

    return(
        <div className="container p-8 mx-auto">
            <h1 className="mb-6 text-4xl font-bold">Your Dashboard</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <div className="p-6 bg-white border rounded-lg shadow">
                    <h2 className="text-2xl font-semibold">N5 Vocabulary</h2>
                    <p className="mt-2 text-gray-600">{progress.n5Vocab.completed} / {progress.n5Vocab.total} items completed</p>
                    <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress.n5Vocab.percentage}%` }}></div>
                    </div>
                    <p className="mt-2 text-xl font-bold text-right">{progress.n5Vocab.percentage}%</p>
                </div>

                 <div className="p-6 bg-white border rounded-lg shadow">
                    <h2 className="text-2xl font-semibold">N5 Kanji</h2>
                    <p className="mt-2 text-gray-600">{progress.n5Kanji.completed} / {progress.n5Kanji.total} items completed</p>
                    <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress.n5Kanji.percentage}%` }}></div>
                    </div>
                    <p className="mt-2 text-xl font-bold text-right">{progress.n5Kanji.percentage}%</p>
                </div>
            </div>
        </div>
    );
    
}