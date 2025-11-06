import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const {name, email, password} = await request.json();

        if(!name || !email || !password) {
            return NextResponse.json({
                error: "All fields are required!"
            }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: {email} });
        if(existingUser) {
            return NextResponse.json({
                error: "User with this email already exists. Login instead"
            }, {status: 409 });
        }

        // --- Hashing Step ---
        console.log("Register API: Hashing password for email:", email); // Add log before hashing
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("Register API: Hashed password generated:", hashPassword); // Add log after hashing
        // --------------------

        // --- Database Creation Step ---
        const user = await prisma.user.create({
            data: {
                name,
                email,
                // *** CRITICAL CHECK: Ensure this line correctly assigns the hash ***
                password: hashPassword,
                // ***************************************************************
            },
        });
        console.log("Register API: User created in DB:", user.id); // Log successful creation
        // ---------------------------

        return NextResponse.json({
            message: "User created successfully! Welcome.", user // Note: Returning the full user object (including hash) might be a minor security risk, consider returning only necessary fields.
        }, {status: 201});
    } catch (error) {
        console.error("Registration error: ", error);
        return NextResponse.json({
            error: "An unexpected error occured"
        }, {status: 500});
    }
}