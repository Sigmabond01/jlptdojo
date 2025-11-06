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

async function seedGrammarForLevel(levelNumber: number, jlptLevel: JlptLevel) {
  const GRAMMAR_API_URL = `https://jlpt-grammar-api.vercel.app/api/grammar/${jlptLevel}`;
  
  console.log(`Fetching grammar for JLPT N${levelNumber}`);
  
  try {
    const response = await fetch(GRAMMAR_API_URL);
    if (!response.ok) {
      console.log(`API returned a non-200 status for N${levelNumber}`);
      return;
    }
    
    const responseData = await response.json();
    
    if (responseData.length === 0) {
        console.log(`No grammar words to seed for N${levelNumber}`);
        return;
    }
    
    console.log(`Found ${responseData.length} N${levelNumber} words. Seeding to database`);

    interface GrammarItem {
      grammar: string;
      romaji: string;
      meaning: string;
      example: string;
    }
    
    const formattedGrammarData = responseData.map((item: GrammarItem) => ({
      level: jlptLevel,
      grammar: item.grammar,
      romaji: item.romaji,
      meaning: item.meaning,
      example: item.example,
    }));

    await prisma.grammar.createMany({
      data: formattedGrammarData,
      skipDuplicates: true,
    });
    console.log(`N${levelNumber} grammar seeding finished`);

  } catch (error) {
    console.error(`Error seeding N${levelNumber} grammar:`, error);
  }
}

async function seedVocabForLevel(levelNumber: number, jlptLevel: JlptLevel) {
  const VOCAB_API_URL = `https://jlpt-grammar-api.vercel.app/api/vocabulary/${jlptLevel}`;
  
  console.log(`Fetching vocabulary for JLPT N${levelNumber}`);
  
  try {
    const response = await fetch(VOCAB_API_URL);
    if (!response.ok) {
      console.log(`API returned a non-200 status for N${levelNumber}`);
      return;
    }
    
    const responseData = await response.json();
    
    if (responseData.length === 0) {
        console.log(`No vocab words to seed for N${levelNumber}`);
        return;
    }
    
    console.log(`Found ${responseData.length} N${levelNumber} words. Seeding to database`);

    interface VocabItem {
      word: string;
      romaji_reading: string;
      pos: string;
      meaning: string;
      example: string;
    }

    const formattedVocabData = responseData.map((item: VocabItem) => ({
      level: jlptLevel,
      word: item.word,
      romajiReading: item.romaji_reading,
      partsOfSpeech: item.pos,
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


  await seedVocabForLevel(5, JlptLevel.N5);
  await seedVocabForLevel(4, JlptLevel.N4);

  await seedGrammarForLevel(5, JlptLevel.N5);
  await seedGrammarForLevel(4, JlptLevel.N4);

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