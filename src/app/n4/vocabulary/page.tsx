import { PrismaClient } from "@/generated/prisma"; 
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import VocabularyClientPage from "./VocabularyClientPage";

const prisma = new PrismaClient();

async function getVocabularyData(userId: string | undefined) {
    const vocabulary = await prisma.vocabulary.findMany({
        where: {level: 'N4'},
    });

    if(!userId) {
        return { vocabulary, userProgress: new Set() };
    }

    const progress = await prisma.vocabularyProgress.findMany({
        where: { userId },
        select: { vocabularyId: true },
    });

    const userProgress = new Set(progress.map(p => p.vocabularyId));

    return { vocabulary, userProgress };
}

export default async function VocabularyPage() {
    const session = await getServerSession(authOptions);
    const {vocabulary, userProgress} = await getVocabularyData(session?.user?.id);

    return (
        <div className="container bg-black p-8 mx-auto">
            <h1 className="mb-6 text-4xl font-bold">N4 Vocabulary</h1>
           { /*@ts-expect-error idk man */ }
            <VocabularyClientPage initialVocabulary={vocabulary} initialProgress={userProgress} />
        </div>
    );
    
}