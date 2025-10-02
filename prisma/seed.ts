import { PrismaClient, JlptLevel } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding.');

    // Vocabulary
    await prisma.vocabulary.createMany({
        data: [
            { level: JlptLevel.N5, japanese: 'わたし', reading: 'watashi', meaning: 'I, me', example: 'わたしは学生です。' },
            { level: JlptLevel.N5, japanese: 'がくせい', reading: 'gakusei', meaning: 'student', example: '彼はがくせいです。'},
            { level: JlptLevel.N5, japanese: 'ほん', reading: 'hon', meaning: 'book', example: 'これはほんです。'},
        ],
        skipDuplicates: true,
    });

    // Grammar
    await prisma.grammar.createMany({
        data: [
            { level: JlptLevel.N5, structure: 'です', meaning: 'to be (polite)', explanation: 'Used to state something politely. Functions like “is/am/are.”', example: 'わたしは学生です。 (I am a student.)' },
            { level: JlptLevel.N5, structure: '〜ます', meaning: 'polite verb ending', explanation: 'Polite present/future tense verb conjugation.', example: 'わたしは毎日勉強します。 (I study every day.)' },
            { level: JlptLevel.N5, structure: '〜が', meaning: 'but / however', explanation: 'Connects two contrasting statements.', example: '寿司は好きですが、高いです。 (I like sushi, but it’s expensive.)' },
            { level: JlptLevel.N5, structure: '〜を', meaning: 'object marker', explanation: 'Indicates the direct object of an action.', example: '本を読みます。 (I read a book.)' },
            { level: JlptLevel.N5, structure: '〜に', meaning: 'location/time marker', explanation: 'Indicates destination, location, or time.', example: '学校に行きます。 (I go to school.)' },
            { level: JlptLevel.N5, structure: '〜で', meaning: 'location of action marker', explanation: 'Indicates where an action takes place.', example: '図書館で勉強します。 (I study at the library.)' },
            { level: JlptLevel.N5, structure: '〜へ', meaning: 'direction marker', explanation: 'Indicates direction of movement.', example: '日本へ行きます。 (I will go to Japan.)' },
            { level: JlptLevel.N5, structure: '〜と', meaning: 'with / and', explanation: 'Used to connect nouns or indicate companionship.', example: '友達と映画を見ます。 (I watch a movie with my friend.)' },
            { level: JlptLevel.N5, structure: '〜も', meaning: 'also, too', explanation: 'Indicates inclusion, like “also.”', example: 'わたしも学生です。 (I am also a student.)' },
            { level: JlptLevel.N5, structure: '〜から', meaning: 'because / from', explanation: 'Indicates reason or starting point.', example: '雨だから、行きません。 (Because it’s raining, I won’t go.)' },
            { level: JlptLevel.N5, structure: '〜まで', meaning: 'until / to (a place)', explanation: 'Indicates limit of time or place.', example: '駅まで歩きます。 (I walk to the station.)' },
            { level: JlptLevel.N5, structure: '〜の', meaning: 'possessive marker', explanation: 'Indicates possession or relation.', example: 'わたしの本です。 (It’s my book.)' },
            { level: JlptLevel.N5, structure: '〜か', meaning: 'question marker', explanation: 'Turns a sentence into a question.', example: 'これは本ですか。 (Is this a book?)' },
            { level: JlptLevel.N5, structure: '〜ね', meaning: 'isn’t it? / right?', explanation: 'Seeks agreement or confirmation.', example: 'いい天気ですね。 (Nice weather, isn’t it?)' },
            { level: JlptLevel.N5, structure: '〜よ', meaning: 'emphasis / assertion', explanation: 'Adds emphasis or assertion to a statement.', example: 'これは大事ですよ。 (This is important, you know.)' },
            { level: JlptLevel.N5, structure: '〜たい', meaning: 'want to do', explanation: 'Expresses desire to do something.', example: '日本に行きたいです。 (I want to go to Japan.)' },
            { level: JlptLevel.N5, structure: '〜ない', meaning: 'negative form', explanation: 'Indicates negation.', example: 'ご飯を食べない。 (I don’t eat rice.)' },
            { level: JlptLevel.N5, structure: '〜て', meaning: 'te-form', explanation: 'Used to connect verbs or make requests.', example: 'ドアを開けてください。 (Please open the door.)' },
            { level: JlptLevel.N5, structure: '〜から〜まで', meaning: 'from ~ to ~', explanation: 'Indicates a range of time or place.', example: '九時から五時まで働きます。 (I work from 9 to 5.)' },
            { level: JlptLevel.N5, structure: '〜けど', meaning: 'but / although', explanation: 'Like が, connects contrasting clauses (more casual).', example: '行きたいけど、お金がない。 (I want to go, but I don’t have money.)' },
        ],
        skipDuplicates: true,
    });

    // Kanji
    await prisma.kanji.createMany({
        data: [
            { level: JlptLevel.N5, character: '日', meaning: 'day, sun', onYomi: 'ニチ, ジツ', kunYomi: 'ひ, -び, -か', strokeCount: 4 },
            { level: JlptLevel.N5, character: '一', meaning: 'one', onYomi: 'イチ, イツ', kunYomi: 'ひと-', strokeCount: 1 },
            { level: JlptLevel.N5, character: '国', meaning: 'country', onYomi: 'コク', kunYomi: 'くに', strokeCount: 8 },  
        ],
        skipDuplicates: true,
    });

    console.log('Done seeding');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
