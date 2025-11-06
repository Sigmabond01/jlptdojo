import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.id) {
        return NextResponse.json({
            error: "Not authenticated"
        }, {status : 401});
    }

    const {grammarId, completed} = await request.json();

    if(completed) {
        await prisma.grammarProgress.create({
            data: {
                userId: session.user.id,
                grammarId: grammarId,
            },
        });
    } else {
        await prisma.grammarProgress.delete({
            where: {
                userId_grammarId : {
                    userId: session.user.id,
                    grammarId: grammarId,
                },
            },
        });
    }
    return NextResponse.json({
        success: true
    })
}