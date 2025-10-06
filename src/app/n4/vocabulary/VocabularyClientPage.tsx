"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type VocabularyItem = {
    id: string;
    japanese: string;
    reading: string;
    meaning: string;
    example: string;
};

interface Props {
    initialVocabulary: VocabularyItem[];
    initialProgress: Set<string>;
}

export default function VocabularyClientPage({ initialVocabulary, initialProgress }: Props) {
    const [progress, setProgress] = useState(initialProgress);
    const router = useRouter();

    const handleCheckboxChange = async (vocabId: string, isChecked: boolean) => {
        const newProgress = new Set(progress);
        if(isChecked) {
            newProgress.add(vocabId);
        } else {
            newProgress.delete(vocabId);
        }
        setProgress(newProgress);

        await fetch('/api/progress/vocabulary', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ vocabularyId: vocabId, completed: isChecked }),
        });
        router.refresh();
    };

    return (
        <div className='space-y-4'>
            {initialVocabulary.map((item) => (
                <div key={item.id} className='flex items-center p-4 border rounded-lg'>
                    <input type="checkbox"
                    className='w-6 h-6 mr-4'
                    checked={progress.has(item.id)}
                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
                    <div>
                        <p className='text-xl font-semibold'> {item.japanese} ({item.reading}) </p>
                        <p className='text-gray-600'> {item.meaning} </p>
                        <p className='text-gray-600'> {item.example} </p>
                    </div>
                </div>
            ))}
        </div>
    );
}