import { PrismaClient } from "@/generated/prisma"; 
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GrammarClientPage from "./GrammarClientPage";

const prisma = new PrismaClient();

async function getGrammarData(userId:string | undefined) {
    const grammar = await prisma.grammar.findMany({
        where: {level: 'N5'},
    });

    if(!userId) {
        return { grammar, userProgress: new Set() };
    }

    const progress = await prisma.grammarProgress.findMany({
        where: {userId },
        select: {grammarId: true},
    });

    const userProgress = new Set(progress.map(p => p.grammarId));

    return { grammar, userProgress };
}

export default async function GrammarPage() {
    const session = await getServerSession(authOptions);
    const {grammar, userProgress} = await getGrammarData(session?.user?.id);

    return (
        <div className="container bg-white p-8 mx-auto">
            <h1 className="mb-6 text-4xl font-bold">N4 Grammar</h1>
           { /*@ts-expect-error idk man */ }
            <GrammarClientPage initialGrammar={grammar} initialProgress={userProgress} />
        </div>
    );
}
