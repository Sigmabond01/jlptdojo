"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import DojoEntrance from "./DojoEntrance";

export default function Header() {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white/80 dark:bg-neutral-950 backdrop-blur-xl border-b-2 border-black/10 dark:border-white/10 sticky top-0 z-50 transition-colors duration-300">
            <nav className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
                <Logo />

                {/* Desktop stuff*/}
                <div>
                    <div>
                        {status === 'loading' && (
                            <div className="flex items-center gap-2">
                                <DojoEntrance /> {/*add loader here */}
                            </div>
                        )}

                        {status === 'authenticated' && session?.user && (
                            <div className="flex items-center gap-3">                                
                                <div className="flex items-center gap-2 rounded-xl">
                                    {session.user.image && (
                                        <Image
                                            src={session.user.image}
                                            alt={session.user.name ?? 'Profile'}
                                            width={28}
                                            height={28}
                                            className="rounded-full border-2 border-black/20 dark:border-white/20"
                                        />
                                    )}
                                    <span className="text-sm font-medium text-black dark:text-white">
                                        {session.user.name}
                                    </span>
                                </div>

                                
                                <Link 
                                    href="/dashboard"
                                    className="px-4 py-2 text-sm font-bold text-black dark:text-white bg-black/10 dark:bg-white/10 rounded-xl hover:bg-black/20 dark:hover:bg-white/20 transition-all uppercase tracking-wider"
                                >
                                    Dashboard
                                </Link>
                                

                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-2 text-sm font-bold text-white dark:text-black bg-black dark:bg-white rounded-xl hover:scale-105 transition-all uppercase tracking-wider"
                                >
                                    Sign Out
                                </button>
                                <ThemeToggle />
                                </div>
                        )}

                        {status === 'unauthenticated' && (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => signIn()}
                                    className="px-4 py-2 text-sm font-bold text-black dark:text-white border-2 border-black/20 dark:border-white/20 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all uppercase tracking-wider"
                                >
                                    Sign In
                                </button>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-bold text-white dark:text-black bg-black dark:bg-white rounded-xl hover:scale-105 transition-all uppercase tracking-wider"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/*For mob*/}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </button>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden border-t-2 border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
                    <div className="container mx-auto px-4 py-6 space-y-4">
                        <div className="pt-4 border-t-2 border-black/10 dark:border-white/10 space-y-3">
                            {status === 'loading' && (
                                <div className="flex items-center gap-2 px-4 py-3">
                                    <div className="h-8 w-8 bg-black/10 dark:bg-white/10 rounded-full animate-pulse" />
                                    <div className="h-8 flex-1 bg-black/10 dark:bg-white/10 rounded-lg animate-pulse" />
                                </div>
                            )}

                            {status === 'authenticated' && session?.user && (
                                <>
                                    <div className="flex items-center gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10">
                                        {session.user.image && (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name ?? 'Profile'}
                                                width={32}
                                                height={32}
                                                className="rounded-full border-2 border-black/20 dark:border-white/20"
                                            />
                                        )}
                                        <span className="text-sm font-medium text-black dark:text-white">
                                            {session.user.name}
                                        </span>
                                    </div>

                                        {/*Additonal links
                                        className="block w-full px-4 py-3 text-sm font-bold text-center text-black dark:text-white bg-black/10 dark:bg-white/10 rounded-xl hover:bg-black/20 dark:hover:bg-white/20 transition-all uppercase tracking-wider"
                                         */}


                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-sm font-bold text-white dark:text-black bg-black dark:bg-white rounded-xl hover:scale-105 transition-all uppercase tracking-wider"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            )}

                            {status === 'unauthenticated' && (
                                <>
                                    <button
                                        onClick={() => {
                                            signIn();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-sm font-bold text-black dark:text-white border-2 border-black/20 dark:border-white/20 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all uppercase tracking-wider"
                                    >
                                        Sign In
                                    </button>
                                    <Link
                                        href="/register"
                                        className="block w-full px-4 py-3 text-sm font-bold text-center text-white dark:text-black bg-black dark:bg-white rounded-xl hover:scale-105 transition-all uppercase tracking-wider"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}