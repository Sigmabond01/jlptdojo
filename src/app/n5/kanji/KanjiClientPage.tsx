"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

type KanjiItems = {
    id: string;
    character: string;
    reading: string | null;
    meaning: string;
    onYomi: string;
    kunYomi: string;
    strokeCount: number;
    example: string | null;
}

interface Props {
    initialKanji: KanjiItems[];
    initialProgress: Set<string>;
}

export default function KanjiClientPage({ initialKanji, initialProgress }: Props) {
    const [progress, setProgress] = useState(initialProgress);
    const router = useRouter();

    const handleCheckboxChange = async (kanjiId: string, isChecked: boolean) => {
        const newProgress = new Set(progress);
        if(isChecked) {
            newProgress.add(kanjiId);
        } else {
            newProgress.delete(kanjiId);
        }
        setProgress(newProgress);

        await fetch('/api/progress/kanji', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ kanjiId: kanjiId, completed: isChecked }),
        });
        router.refresh();
    };

    return (
        <div className='space-y-4'>
            {initialKanji.map((item) => (
                <div key={item.id} className='flex items-center p-4 border rounded-lg'>
                    <input type="checkbox"
                    className='w-6 h-6 mr-4'
                    checked={progress.has(item.id)}
                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
                    <div>
                        <p className='text-xl font-semibold'> {item.character} ({item.reading}) </p>
                        <p className='text-gray-600'> {item.meaning} </p>
                        <p className='text-gray-600'> {item.onYomi} </p>
                        <p className='text-gray-600'> {item.kunYomi} </p>
                        <p className='text-gray-600'> {item.strokeCount} </p>
                        <p className='text-gray-600'> {item.example} </p>
                    </div>
                </div>
            ))}
        </div>
    );
}