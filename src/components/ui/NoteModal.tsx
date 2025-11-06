'use client';

import { useState } from "react";
import { Items } from "@/types/items";
import { Loader2, Trash2, X } from "lucide-react";

interface NoteModalProps {
  item: Items;
  initialNote: string;
  onClose: () => void;
  onSave: (noteText: string) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function NoteModal({
  item,
  initialNote,
  onClose,
  onSave,
  onDelete
}: NoteModalProps) {
  const [text, setText] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(text);
    setIsSaving(false);
    onClose();
  };
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true);
      await onDelete();
      setIsDeleting(false);
      onClose();
    }
  };

  const getTitle = () => {
    return item.word || item.grammar || item.character || 'Note';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-white/20 rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full dark:text-gray-400 text-gray-200 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-400 mb-4">
          Note for: <span className="text-white">{getTitle()}</span>
        </h2>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your personal notes here..."
          className="w-full h-48 p-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between items-center mt-4">
          {initialNote && (
            <button
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
              className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete Note
            </button>
          )}

          {!initialNote && <div />} 

          <button
            onClick={handleSave}
            disabled={isSaving || isDeleting}
            className="px-6 py-2 rounded-lg text-sm font-semibold text-black bg-white hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}