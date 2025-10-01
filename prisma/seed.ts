import { PrismaClient, JlptLevel } from '@/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding.');

    await prisma.vocabulary.createMany({
        data: [
            { level: JlptLevel.N5, japanese: 'わたし', reading: 'watashi', meaning: 'I, me', example: 'わたしは学生です。' },
            { level: JlptLevel.N5, japanese: 'がくせい', reading: 'gakusei', meaning: 'student', example: '彼はがくせいです。'},
            { level: JlptLevel.N5, japanese: 'ほん', reading: 'hon', meaning: 'book', example: 'これはほんです。'},
        ],
        skipDuplicates: true,
    });

    await prisma.kanji.createMany({
        data: [
          { level: JlptLevel.N5, character: '日', meaning: 'day, sun', onYomi: 'ニチ, ジツ', kunYomi: 'ひ, -び, -か', strokeCount: 4 },
          { level: JlptLevel.N5, character: '一', meaning: 'one', onYomi: 'イチ, イツ', kunYomi: 'ひと-', strokeCount: 1 },
          { level: JlptLevel.N5, character: '国', meaning: 'country', onYomi: 'コク', kunYomi: 'くに', strokeCount: 8 },  
        ],
        skipDuplicates: true,
    });

    console.log("Done seeding");
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
})