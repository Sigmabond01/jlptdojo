"use client";

import Link from "next/link";
import { ArrowRight, Coffee } from "lucide-react";
import Header from "@/components/ui/Header";
import DailyStreakCard from "@/components/ui/DailyStreakCard";
import ItemWrapper from "../Items/ItemWrapper";
import { JlptLevel } from "@/generated/prisma";
import { ItemType, Items } from "@/types/items";
import { Session } from "next-auth";
import FloatingNavbar from "../ui/FloatingNav";

const STROKE_CIRCUMFERENCE = 2 * Math.PI * 56;

interface LearningLayoutProps {
  items: Items[];
  userProgress: Set<string>;
  userNotes: Map<string, string>;
  category: ItemType;
  level: JlptLevel;
  streakData: Record<string, number>;
  session: Session | null;
}

export function LearningLayout({
  items,
  userProgress,
  userNotes,
  category,
  level,
  streakData,
  session,
}: LearningLayoutProps) {
  const totalItems = items.length;
  const completedItems = userProgress.size;
  const remainingItems = totalItems - completedItems;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const progressStrokeOffset =
    totalItems > 0 ? STROKE_CIRCUMFERENCE * (1 - completedItems / totalItems) : STROKE_CIRCUMFERENCE;

  const levelTitle = level === "N5" ? "Beginner" : "Elementary";
  const headerTitle = `${levelTitle} ${capitalize(category)}`;
  const description = `Master ${totalItems}+ ${category} items for JLPT ${level}.`;

  return (
    <div className="min-h-screen relative bg-gray-400 dark:bg-black text-black dark:text-white">
      <Header />
      <div className="relative z-10 container mx-auto p-4 md:p-8 pb-24">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-black dark:text-gray-400 mb-4">
            <a href={`/${category}`}>{capitalize(category)}</a>
            <ArrowRight className="w-4 h-4" />
            <span className="text-black dark:text-white font-semibold">{level}</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-block px-4 py-2 bg-black/10 dark:bg-white/10 rounded-full">
                <span className="text-lg md:text-xl font-bold">JLPT {level}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">{headerTitle}</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-4xl">{description}</p>
          </div>

          {!session?.user && (
            <div className="mb-6 p-6 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-2 border-black/10 dark:border-white/10 rounded-2xl text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Sign in to save your progress</p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl"
              >
                Sign in to track progress
              </Link>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <ItemWrapper
              initialItems={items}
              initialProgress={userProgress}
              initialNotes={userNotes}
              type={category}
              level={level}
            />
          </div>

          {session?.user && (
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2 space-y-4 scrollbar-thin scrollbar-thumb-black/20 dark:scrollbar-thumb-white/20 scrollbar-track-transparent">
                <ProgressCard
                  totalItems={totalItems}
                  completedItems={completedItems}
                  remainingItems={remainingItems}
                  progressPercent={progressPercent}
                  progressStrokeOffset={progressStrokeOffset}
                />
                <DailyStreakCard streakData={streakData} />

                <div className="rounded-2xl overflow-hidden bg-neutral-950">
                  <iframe data-testid="embed-iframe" className="" src="https://open.spotify.com/embed/playlist/3QB6iQu9KKxdD8Bo7jDs8A?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
                
                <CTASection />
              </div>
            </div>
          )}
        </div>
      </div>

      <FloatingNavbar />
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface ProgressCardProps {
  totalItems: number;
  completedItems: number;
  remainingItems: number;
  progressPercent: number;
  progressStrokeOffset: number;
}

function ProgressCard({ totalItems, completedItems, remainingItems, progressPercent, progressStrokeOffset }: ProgressCardProps) {
  return (
    <div className="p-6 backdrop-blur-xl bg-gray-200 dark:bg-neutral-950 border-2 border-black/10 dark:border-white/10 rounded-2xl relative">
      <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 text-center">
        Your progress
      </h3>
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none"
              className="text-black/10 dark:text-white/10" />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={STROKE_CIRCUMFERENCE}
              strokeDashoffset={progressStrokeOffset}
              className="text-black dark:text-white transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">{progressPercent}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {completedItems} / {totalItems}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/60 dark:bg-black/60 rounded-xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
          <span className="text-xl font-bold">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
          <span className="text-xl font-bold">{completedItems}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Remaining</span>
          <span className="text-xl font-bold">{remainingItems}</span>
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <>
      <div className="p-4 backdrop-blur-xl bg-gray-200 dark:bg-black/80 text-center border-2 border-black/10 dark:border-white/10 rounded-2xl space-y-3">
        <h1 className="text-gray-600 dark:text-white">Star On Github!</h1>
        <a
          href="https://github.com/jlptdojo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 dark:text-gray-600 text-3xl transition-all duration-300 dark:hover:text-white"
        >
          CLICK HERE
        </a>
      </div>

      <div className="p-4 backdrop-blur-xl bg-gray-200 dark:bg-black/80 text-center border-2 border-black/10 dark:border-white/10 rounded-2xl space-y-3">
        <h1 className="text-gray-600 dark:text-white">Support Us!</h1>
        <div className="flex justify-center text-3xl text-gray-400 dark:text-gray-600 transition-all duration-300 dark:hover:text-white">
          <a href="https://buymeacoffee.com/sigmabond01" target="_blank" rel="noopener noreferrer">
            <Coffee />
          </a>
        </div>
      </div>
    </>
  );
}