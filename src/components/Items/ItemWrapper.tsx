"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addCard } from '@/lib/anki';
import AnkiAlert from '@/components/ui/AnkiAlert';
import AnkiFeedback from '@/components/ui/AnkiFeedback';
import ItemPage from './ItemPage';
import { Items, ItemType } from '@/types/items';
import NoteModal from '../ui/NoteModal';

interface ItemWrapperProps {
  initialItems: Items[];
  initialProgress: Set<string>;
  initialNotes: Map<string, string>;
  type: ItemType;
  level: string;
}

export default function ItemWrapper({
    initialItems,
    initialProgress,
    initialNotes,
    type,
    level
}: ItemWrapperProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [notes, setNotes] = useState(initialNotes);
  const [anki, setAnki] = useState({
    status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    message: '',
  });
  const [showGuide, setShowGuide] = useState(false);
  const [modal, setModal] = useState<Items | null>(null);
  const router = useRouter();

  const handleProgressUpdate = async (itemId: string, isComplete: boolean) => {
    setProgress(prev => {
        const newProgress = new Set(prev);
        if(isComplete) {
            newProgress.add(itemId);
        } else {
            newProgress.delete(itemId);
        }
        return newProgress;
    });

    await fetch(`/api/progress/${type}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ [`${type}Id`]: itemId, completed: isComplete }),
    });

    router.refresh();
  };

  const handleAnki = async (item: Items) => {
    setShowGuide(true);
    setAnki({ status: 'loading', message: 'Exporting to Anki...' });

    let front = '';
    let back = '';

    if(type === 'vocabulary') {
          front = `<div style="font-size: 80px;">${item.word}</div>`;
          back = `
            <div style="font-size: 20px">
            <strong>Reading:</strong> ${item.romajiReading}<br/>
            <strong>Meaning:</strong> ${item.partsOfSpeech}
            ${item.example ? `<br/><br/><strong>Example:</strong> ${item.meaning}` : ''}
            </div> `;
    } else if (type === 'grammar') {
          front = `<div style="font-size: 80px;">${item.grammar}</div>`;
          back = `
            <div style="font-size: 20px">
            <strong>Reading:</strong> ${item.romaji}<br/>
            <strong>Meaning:</strong> ${item.meaning}
            ${item.example ? `<br/><br/><strong>Example:</strong> ${item.example}` : ''}
            </div>
          `;
    } else if (type === 'kanji') {
            front = `<div style="font-size: 80px;">${item.character}</div>`;
            back = `
                <div style="font-size: 20px">
                <strong>Meaning:</strong> ${item.meaning}<br/>
                <strong>On'yomi:</strong> ${item.onYomi}<br/>
                <strong>Kun'yomi:</strong> ${item.kunYomi}<br/>
                <strong>Stroke Count:</strong> ${item.strokeCount}
                ${item.example ? `<br/><br/><strong>Example:</strong> ${item.example}` : ''}
                </div>
            `
    } else {
        console.error("unknown item type", item);

        setAnki({ status: 'error', message: 'Cannot formt card'});
        setTimeout(() => setAnki({ status: 'idle', message: ''}), 3000);
        return;
    }

    const deck = `Japanese::${level.toUpperCase()}::${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const result = await addCard(deck, 'Basic', {Front: front, Back: back});
    
    setAnki(result.success ? {status: 'success', message: 'Exported to Anki successfully'} : {status: 'error', message: result.message});
    setTimeout(() => setAnki({ status: 'idle', message: ''}), 3000);
  };

  const handleOpenModal = (item: Items) => {
    setModal(item);
  };

  const handleCloseModal = () => {
    setModal(null);
  }

  const handleSaveNote = async (noteText: string) => {
    if(!modal) return;
    try {
      const response = await fetch(`/api/notes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          itemId: modal.id,
          text: noteText,
          itemType: type
        }),
      });
      if(!response.ok) throw new Error('Failed to save note');
      setNotes(prev => new Map(prev).set(modal.id, noteText));
      router.refresh();
    } catch (error) {
      console.error("Error saving note", error);
    }
  };

  const handleDeleteNote = async () => {
    if(!modal) return;
    try {
      const response = await fetch(`/api/notes`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application.json'},
        body: JSON.stringify({ itemId: modal.id }),
      })
      if(!response.ok) throw new Error('Failed to delete note');
      setNotes(prev => {
        const newNotes = new Map(prev);
        newNotes.delete(modal.id);
        return newNotes;
      });
      router.refresh();
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  return (
    <div>
    <div>
        <div className='fixed top-26 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 space-y-3 pointer-events-none'>
            {showGuide && (
                <div className='pointer-events-auto'>
                    <AnkiAlert onClose={() => setShowGuide(false)} duration={3000} />
                </div>
            )}
            <div className='pointer-events-auto'>
                <AnkiFeedback status={anki.status} message={anki.message} />
            </div>
        </div>

            <ItemPage type={type} items={initialItems} progress={progress}
            onProgressUpdate={handleProgressUpdate} notes={notes} onOpenNoteModal={handleOpenModal} onAnkiAdd={handleAnki} />
        </div>
    {modal && (
      <NoteModal item={modal} initialNote={notes.get(modal.id) || ''}
      onClose={handleCloseModal}
      onSave={handleSaveNote}
      onDelete={handleDeleteNote} />
    )}
    </div>
  )
}