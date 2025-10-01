import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.id) {
        return NextResponse.json({
            error: "Not authenticated"
        }, {status : 401 });
    }

    const { vocabularyId, completed } = await request.json();

    if(completed) {
        await prisma.vocabularyProgress.create({
            data: {
                userId: session.user.id,
                vocabularyId: vocabularyId,
            },
        });
    } else {
        await prisma.vocabularyProgress.delete({
            where: {
                userId_vocabularyId: {
                    userId: session.user.id,
                    vocabularyId: vocabularyId,
                },
            },
        });
    }

    return NextResponse.json({
        success: true
    });
}