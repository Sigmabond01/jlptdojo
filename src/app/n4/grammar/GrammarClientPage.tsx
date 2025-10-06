"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

type GrammarItem = {
    id: string;
    structure: string;
    meaning: string;
    explanation: string;
    example: string;
}

interface Props {
    initialGrammar: GrammarItem[];
    initialProgress: Set<string>;
}

export default function GrammarClientPage({ initialGrammar, initialProgress}: Props) {
    const [progress, setProgress] = useState(initialProgress);
    const router = useRouter();

    const handleCheckboxChange = async (grammarId: string, isChecked: boolean) => {
        const newProgress = new Set(progress);
        if(isChecked) {
            newProgress.add(grammarId);
        } else {
            newProgress.delete(grammarId);
        }
        setProgress(newProgress);

        await fetch('/api/progress/grammar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ grammarId: grammarId, completed: isChecked}),
        });
        router.refresh();
    };

    return(
        <div className='space-y-4'>
            {initialGrammar.map((item) => (
                <div key={item.id} className='flex items-center p-4 bg-gray-100 border rounded-lg'>
                    <input type="checkbox"
                    className='w-6 h-6 mr-4'
                    checked={progress.has(item.id)}
                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
                    <div>
                        <p className='text-xl font-semibold'> {item.structure} ({item.meaning}) </p>
                        <p className='text-gray-600'> {item.explanation} </p>
                        <p className='text-gray-600'> {item.example} </p>
                    </div>
                </div>
            ))}
        </div>  
    );
}