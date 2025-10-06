// prisma/seed.ts
import { PrismaClient, JlptLevel } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function seedKanjiForLevel(levelNumber: number, jlptLevel: JlptLevel) {
  const KANJI_LIST_URL = `https://kanjiapi.dev/v1/kanji/jlpt-${levelNumber}`;
  console.log(`Fetching kanji for JLPT N${levelNumber}`);

  try {
    const listResponse = await fetch(KANJI_LIST_URL);
    if (!listResponse.ok) {
      console.log(`API returned non-200 for N${levelNumber}`);
      return;
    }

    const kanjiList = await listResponse.json();

    if (!Array.isArray(kanjiList)) {
      console.log(`No kanji list found for N${levelNumber}`);
      return;
    }

    console.log(`Found ${kanjiList.length} kanji for N${levelNumber}. Fetching details`);

    const formattedKanjiData = [];

    for (const kanjiChar of kanjiList) {
      const detailUrl = `https://kanjiapi.dev/v1/kanji/${kanjiChar}`;
      const detailResponse = await fetch(detailUrl);
      if (!detailResponse.ok) continue;

      const item = await detailResponse.json();

      formattedKanjiData.push({
        level: jlptLevel,
        character: item.kanji,
        reading: item.reading ?? null,
        meaning: item.meanings.join(", "),
        onYomi: item.on_readings.join(", "),
        kunYomi: item.kun_readings.join(", "),
        strokeCount: item.stroke_count ?? 0,
      });
    }

    if (formattedKanjiData.length > 0) {
      await prisma.kanji.createMany({
        data: formattedKanjiData,
        skipDuplicates: true,
      });
      console.log(`N${levelNumber} kanji seeding finished`);
    } else {
      console.log(`No kanji data fetched for N${levelNumber}`);
    }

  } catch (error) {
    console.error(`Error seeding N${levelNumber} kanji:`, error);
  }
}



async function seedVocabularyForLevel(levelNumber: number, jlptLevel: JlptLevel) {
  const API_URL = `https://jlpt-vocab-api.vercel.app/api/words?level=${levelNumber}&limit=3470`;
  
  console.log(`Fetching vocabulary for JLPT N${levelNumber}`);
  
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.log(`API returned a non-200 status for N${levelNumber}`);
      return;
    }
    
    const responseData = await response.json();
    
    const vocabArray = responseData.words;

    if (!Array.isArray(vocabArray)) {
      console.log(`No vocabulary data array found in API response for N${levelNumber}`);
      return;
    }
    
    if (vocabArray.length === 0) {
        console.log(`No vocabulary words to seed for N${levelNumber}`);
        return;
    }
    
    console.log(`Found ${vocabArray.length} N${levelNumber} words. Seeding to database`);

    //The API uses 'furigana' for the reading, not 'reading'
    const formattedVocabData = vocabArray.map((item: any) => ({
      level: jlptLevel,
      japanese: item.word,
      reading: item.furigana,
      meaning: item.meaning,
      example: item.example,
    }));

    await prisma.vocabulary.createMany({
      data: formattedVocabData,
      skipDuplicates: true,
    });
    console.log(`N${levelNumber} vocabulary seeding finished`);

  } catch (error) {
    console.error(`Error seeding N${levelNumber} vocabulary:`, error);
  }
}


async function main() {
  console.log('Start seeding process.....');

  await seedVocabularyForLevel(5, JlptLevel.N5);
  await seedVocabularyForLevel(4, JlptLevel.N4);

  await seedKanjiForLevel(5, JlptLevel.N5);
  await seedKanjiForLevel(4, JlptLevel.N4);

  console.log("All seeding done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });