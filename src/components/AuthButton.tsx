"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthButton() {
    const { data: session } = useSession();

    if(session) {
        return (
            <div className='flex items-center gap-4'>
                <p> {session.user?.name} </p>
                <button onClick={() => signOut()} 
                className='px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700'>
                    Sign Out
                </button>
                <Link href="/dashboard" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Dashboard
                </Link>
            </div>
        );
    }
    return (
        <button onClick={() => signIn('google')} className='px-4 py-2 font-bold text-black bg-white border rounded'>
            Sign in With Google lols(fk me)
        </button>
    );
}