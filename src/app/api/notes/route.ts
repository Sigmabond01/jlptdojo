import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { ItemType } from "@/types/items";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session?.user?.id) {
        return NextResponse.json({
            error: "Signup or Signin"
        }, {
            status: 401
        });
    }

    const {itemId, text, itemType} = await request.json();
    const userId = session.user.id;

    if(!itemType) {
        return NextResponse.json({
            error: "Missing a field"
        }, {
            status: 400
        });
    }

    if(!['vocabulary', 'grammar', 'kanji'].includes(itemType)) {
        return NextResponse.json({
            error: 'Invalid type'
        }, {
            status: 400
        });
    }

    try {
        const result = await prisma.note.upsert({
            where: {
                userId_itemId: {userId, itemId},
            },
            update: {text},
            create: { userId, itemId, itemType: itemType as ItemType, text},
        });
        return NextResponse.json(result, {
            status: 200
        });
    } catch (error) {
        console.error('Error inserting note', error);
        return NextResponse.json({
            error: 'Failed to save note'
        }, {
            status: 500
        });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session?.user?.id) {
        return NextResponse.json({
            error: "Signup or Signin"
        }, {
            status: 401
        });
    }

    const { itemId } = await request.json();
    const userId = session.user.id;

    if(!itemId) {
        return NextResponse.json({
            error: "Missing ID"
        }, {
            status: 400
        });
    }

    try {
        await prisma.note.delete({
            where: {
                userId_itemId: {userId, itemId},
            },
        });
        return NextResponse.json({
            success: true
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Failed to delete note", error);
        return NextResponse.json({
            error: 'Failed to delete note'
        }, {
            status: 500
        });
    }

}