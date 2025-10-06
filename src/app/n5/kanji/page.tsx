import { PrismaClient } from "@/generated/prisma"; 
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import KanjiClientPage from "./KanjiClientPage";

const prisma = new PrismaClient();

async function getKanjiData(userId: string | undefined) {
    const kanji = await prisma.kanji.findMany({
        where: {level: 'N5'},
    });

    if(!userId) {
        return { kanji, userProgress: new Set() };
    }

    const progress = await prisma.kanjiProgress.findMany({
        where: { userId },
        select: { kanjiId: true },
    });

    const userProgress = new Set(progress.map(p => p.kanjiId));

    return { kanji, userProgress };
}

export default async function KanjiPage() {
    const session = await getServerSession(authOptions);
    const {kanji, userProgress} = await getKanjiData(session?.user?.id);

    return (
        <div className="container bg-black p-8 mx-auto">
            <h1 className="mb-6 text-4xl font-bold">N5 Kanji</h1>
           { /*@ts-expect-error idk man */ }
            <KanjiClientPage initialKanji={kanji} initialProgress={userProgress} />
        </div>
    );
    
}