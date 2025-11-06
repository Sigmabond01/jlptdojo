import { $Enums} from "@/generated/prisma";
import prisma from "@/lib/prisma";

export interface ProgressData {
  total: number;
  completed: number;
  percentage: number;
}

export interface LevelProgress {
  vocab: ProgressData;
  grammar: ProgressData;
  kanji: ProgressData;
}

const createProgressData = (total: number, completed: number): ProgressData => ({
  total,
  completed,
  percentage: total ? Math.round((completed / total) * 100) : 0,
});

export async function getProgress(userId: string) {
  async function getLevelData(level: $Enums.JlptLevel): Promise<LevelProgress> {
    const [
      vocabTotal, vocabCompleted,
      grammarTotal, grammarCompleted,
      kanjiTotal, kanjiCompleted
    ] = await Promise.all([
      prisma.vocabulary.count({ where: { level } }),
      prisma.vocabularyProgress.count({ where: { userId, vocabulary: { level } } }),
      prisma.grammar.count({ where: { level } }),
      prisma.grammarProgress.count({ where: { userId, grammar: { level } } }),
      prisma.kanji.count({ where: { level } }),
      prisma.kanjiProgress.count({ where: { userId, kanji: { level } } }),
    ]);

    return {
      vocab: createProgressData(vocabTotal, vocabCompleted),
      grammar: createProgressData(grammarTotal, grammarCompleted),
      kanji: createProgressData(kanjiTotal, kanjiCompleted),
    };
  }

  return {
    n5: await getLevelData("N5"),
    n4: await getLevelData("N4"),
  };
}

export function calculateOverallProgress(level: LevelProgress) {
  const total = level.vocab.total + level.grammar.total + level.kanji.total;
  const done = level.vocab.completed + level.grammar.completed + level.kanji.completed;
  return total ? Math.round((done / total) * 100) : 0;
}
