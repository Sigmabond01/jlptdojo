import prisma from '@/lib/prisma';

export async function getStreakData(userId: string) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

  try {
    // --- FIX: Use backticks (`) for $queryRaw ---
    const results: { date: Date; count: string }[] = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('day', "completedAt")::date AS date,
        COUNT(*)
      FROM (
        SELECT "completedAt", "userId" FROM "VocabularyProgress"
        WHERE "userId" = ${userId} AND "completedAt" >= ${startOfMonth} AND "completedAt" <= ${endOfMonth}
        UNION ALL
        SELECT "completedAt", "userId" FROM "GrammarProgress"
        WHERE "userId" = ${userId} AND "completedAt" >= ${startOfMonth} AND "completedAt" <= ${endOfMonth}
        UNION ALL
        SELECT "completedAt", "userId" FROM "KanjiProgress"
        WHERE "userId" = ${userId} AND "completedAt" >= ${startOfMonth} AND "completedAt" <= ${endOfMonth}
      ) AS all_progress
      GROUP BY date
      ORDER BY date;
    `;
    // ------------------------------------------

    const streakData: { [date: string]: number } = {};
    for (const row of results) {
      const isoDate = new Date(row.date).toISOString().split('T')[0];
      streakData[isoDate] = Number(row.count);
    }
    return streakData;

  } catch (error) {
    console.error("Error fetching streak data:", error);
    return {};
  }
}