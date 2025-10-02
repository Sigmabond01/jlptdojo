import AuthButton from "@/components/AuthButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-8 p-8 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Welcome to <span className="text-blue-600 dark:text-blue-400">JLPTDojo</span> 🇯🇵
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
                Your personal dojo for mastering the JLPT N5 & N4.
            </p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
            <AuthButton />
            <div className="flex gap-4 mt-4">
                <Link href="/n5/vocabulary" className="text-blue-500 hover:underline">
                    N5 Vocabulary
                </Link>
                <Link href="/n5/grammar" className="text-blue-500 hover:underline">
                    N5 Grammar
                </Link>
                <Link href="/n5/kanji" className="text-blue-500 hover:underline">
                    N5 Kanji
                </Link>
            </div>
        </div>

      </div>
    </main>
  );
}