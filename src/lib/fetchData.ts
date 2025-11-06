import { PrismaClient, JlptLevel } from '@/generated/prisma';
import { ItemType, Items } from '@/types/items';
import prisma from './prisma';

type DbItem = Record<string, unknown>;
type ProgressResult = Record<string, string>;

type ItemConfig<TModel extends keyof PrismaClient, TProgressModel extends keyof PrismaClient> = {
  model: TModel;
  progressModel: TProgressModel;
  progressField: string;
  select: Record<string, boolean>;
};

const itemConfigs: Record<ItemType, ItemConfig<keyof PrismaClient, keyof PrismaClient>> = {
  vocabulary: {
    model: 'vocabulary',
    progressModel: 'vocabularyProgress',
    progressField: 'vocabularyId',
    select: {
      id: true,
      word: true,
      romajiReading: true,
      partsOfSpeech: true,
      meaning: true,
      example: true,
    },
  },
  grammar: {
    model: 'grammar',
    progressModel: 'grammarProgress',
    progressField: 'grammarId',
    select: {
      id: true,
      grammar: true,
      romaji: true,
      meaning: true,
      example: true,
    },
  },
  kanji: {
    model: 'kanji',
    progressModel: 'kanjiProgress',
    progressField: 'kanjiId',
    select: {
      id: true,
      character: true,
      meaning: true,
      onYomi: true,
      kunYomi: true,
      strokeCount: true,
      example: true,
      reading: true,
    },
  },
};

const transformDataToItems = (dbItems: DbItem[], itemType: ItemType): Items[] =>
  dbItems.map(dbItem => {
    const base: Items = {
      id: dbItem.id as string,
      meaning: (dbItem.meaning as string | undefined) ?? undefined,
      example: (dbItem.example as string | null) ?? null,
      japanese: '',
      word: '',
      romajiReading: '',
      partsOfSpeech: '',
      reading: '',
      real: '',
    };

    switch (itemType) {
      case 'vocabulary':
        Object.assign(base, {
          japanese: dbItem.word as string,
          word: dbItem.word as string,
          romajiReading: dbItem.romajiReading as string,
          partsOfSpeech: dbItem.partsOfSpeech as string,
          reading: dbItem.romajiReading as string,
        });
        break;
      case 'grammar':
        Object.assign(base, {
          grammar: dbItem.grammar as string,
          romaji: (dbItem.romaji as string | undefined) ?? undefined,
        });
        break;
      case 'kanji':
        Object.assign(base, {
          character: dbItem.character as string,
          onYomi: dbItem.onYomi as string,
          kunYomi: dbItem.kunYomi as string,
          strokeCount: (dbItem.strokeCount as number | null) ?? null,
          reading: (dbItem.reading as string | null) ?? undefined,
        });
        break;
    }
    return base;
  });

export async function getLearningData(
  userId: string | undefined,
  itemType: ItemType,
  level: JlptLevel
): Promise<{ items: Items[]; userProgress: Set<string>; userNotes: Map<string, string> }> {
  const config = itemConfigs[itemType];
  if (!config) {
    console.error(`Invalid itemType: ${itemType}`);
    return { items: [], userProgress: new Set(), userNotes: new Map() };
  }

  try {
    const model = prisma[config.model] as unknown as {
      findMany: (args: { where: { level: JlptLevel }; select: Record<string, boolean> }) => Promise<DbItem[]>;
    };

    const dbItems = await model.findMany({
      where: { level },
      select: config.select,
    });

    let userProgress = new Set<string>();
    const userNotes = new Map<string, string>();

    const items = transformDataToItems(dbItems, itemType);

    if (!userId) return { items, userProgress: new Set(), userNotes: new Map() };

    const progressModel = prisma[config.progressModel] as unknown as {
      findMany: (args: { where: Record<string, unknown>; select: Record<string, boolean> }) => Promise<ProgressResult[]>;
    };

    const ids = items.map(i => i.id);

    if(ids.length > 0) {
      const [progress, notes] = await Promise.all([
        progressModel.findMany({
          where: { userId, [config.progressField]: { in: ids } },
          select: { [config.progressField]: true },
        }) as Promise<ProgressResult[]>,
        
        prisma.note.findMany({
          where: {
            userId,
            itemType: itemType,
            itemId: {in: ids}
          },
          select: {itemId: true, text: true},
        })
      ]);

      userProgress = new Set(progress.map(p => p[config.progressField]));

      for (const note of notes) {
        userNotes.set(note.itemId, note.text);
      }
    }

    return { items, userProgress, userNotes };
  } catch (err) {
    console.error(`Error fetching ${itemType} level ${level}:`, err);
    return { items: [], userProgress: new Set(), userNotes: new Map() };
  }
}