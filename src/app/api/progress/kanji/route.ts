import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.id) {
        return NextResponse.json({
            error: "Not authentiated"
        }, {status: 401});
    }

    const {kanjiId, completed} = await request.json();

    if(completed) {
        await prisma.kanjiProgress.create({
            data: {
                userId: session.user.id,
                kanjiId: kanjiId,
            },
        });
    } else {
        await prisma.kanjiProgress.delete({
            where: {
                userId_kanjiId: {
                    userId: session.user.id,
                    kanjiId: kanjiId,
                },
            },
        });
    }

    return NextResponse.json({
        success: true
    })
}