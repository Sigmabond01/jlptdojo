// src/app/[category]/[level]/page.tsx
import { getLearningData } from "@/lib/fetchData";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { getStreakData } from "@/lib/getStreakData";
import { normalizeParams } from "@/lib/normalizeParams";
import { LearningLayout } from "@/components/layout/LearningLayout";
import { JlptLevel } from "@/generated/prisma";
import { ItemType } from "@/types/items";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    category: string;
    level: string;
  };
}

const validCategories: ItemType[] = ["vocabulary", "grammar", "kanji"];
const validLevels: JlptLevel[] = [JlptLevel.N5, JlptLevel.N4];

export default async function LearningLevelPage({ params }: PageProps) {
  const { category, level } = normalizeParams(params);

  if (!validCategories.includes(category)) return notFound();
  if (!validLevels.includes(level)) return notFound();

  const session = await getServerSession(authOptions);

  const [{ items, userProgress, userNotes }, streakData] = await Promise.all([
    getLearningData(session?.user?.id, category, level),
    session?.user ? getStreakData(session.user.id) : Promise.resolve({}),
  ]);

  return (
    <LearningLayout
      items={items}
      userProgress={userProgress}
      userNotes={userNotes}
      category={category}
      level={level}
      streakData={streakData}
      session={session}
    />
    //nice
  );
}