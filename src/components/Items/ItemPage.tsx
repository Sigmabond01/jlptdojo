"use client"

import { ItemProps } from "@/types/items"
import { NotebookText, StickyNote } from "lucide-react" // Import icons

export default function ItemPage({
  type,
  items,
  progress,
  notes, // Get notes prop
  onProgressUpdate,
  onAnkiAdd,
  onOpenNoteModal // Get modal handler
}: ItemProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        // Check if a note exists for this item
        const hasNote = notes.has(item.id) && notes.get(item.id) !== '';

        return (
          <div key={item.id} className="flex items-start p-4 border-2 dark:border-white/10 border-black/20 dark:bg-neutral-950 rounded-lg">
            <input
              type="checkbox"
              className="w-6 h-6 mr-4 mt-1 flex-shrink-0" // Aligned checkbox
              checked={progress.has(item.id)}
              onChange={(e) => onProgressUpdate(item.id, e.target.checked)}
            />

            <div className="flex-1 min-w-0">
              {type === "grammar" && (
                <div>
                  <p className="text-xl dark:text-white/80 text-black font-semibold">
                    {item.grammar}
                  </p>
                  <p className="text-xl text-black dark:text-white/80 font-semibold">
                    <span className="text-sm text-gray-600">Reading: </span>
                    {item.romaji}
                  </p>
                  <p className="text-lg text-black dark:text-white/80">
                    <span className="text-sm text-gray-600">Meaning: </span>
                    {item.meaning}
                  </p>
                  <p className="text-lg text-black dark:text-white/80">
                    <span className="text-sm text-gray-600">Example: </span>
                    {item.example}
                  </p>
                </div>
              )}

              {type === "vocabulary" && (
                <div>
                  <p className="text-xl text-black dark:text-white/80 font-semibold">
                    {item.word}
                  </p>
                  <p className="text-xl text-black dark:text-white/80 font-bold">
                    <span className="text-sm text-gray-600">Reading: </span>
                    {item.romajiReading}
                  </p>
                  <p className="text-lg text-black dark:text-white/80">
                    <span className="text-sm font-semibold text-gray-600">
                      Parts of speech:{" "}
                    </span>
                    {item.partsOfSpeech}
                  </p>
                  <p className="text-lg text-black dark:text-white/80">
                    <span className="text-sm font-semibold text-gray-600">
                      Meaning:{" "}
                    </span>
                    {item.meaning}
                  </p>
                  {/* Conditionally render example for vocab */}
                  {item.example && (
                    <p className="text-lg text-black dark:text-white/80">
                      <span className="text-sm font-semibold text-gray-600">
                        Example:{" "}
                      </span>
                      {item.example}
                    </p>
                  )}
                </div>
              )}

              {type === "kanji" && (
                <div>
                  <p className="text-4xl dark:text-white/80 text-black font-bold">
                    {item.character}
                  </p>
                  {item.reading && (
                    <p className="text-xl text-black dark:text-white/80 font-bold">
                      <span className="text-sm text-gray-600">Reading: </span>
                      {item.reading}
                    </p>
                  )}
                  <p className="text-lg text-black dark:text-white/80 font-bold">
                    <span className="text-sm text-gray-600">Meaning: </span>
                    {item.meaning}
                  </p>
                  <p className="text-lg text-black dark:text-white/80">
                    <span className="text-sm text-gray-600">OnYomi: </span>
                    {item.onYomi}
                  </p>
                  <p className="text-lg text-black dark:text-white/80">
                    <span className="text-sm text-gray-600">KunYomi: </span>
                    {item.kunYomi}
                  </p>
                  {item.strokeCount != null && (
                    <p className="text-lg text-black dark:text-white/80">
                      <span className="text-sm text-gray-600">Stroke Count: </span>
                      {item.strokeCount}
                    </p>
                  )}
                  {item.example && (
                    <p className="text-lg text-black dark:text-white/80">
                      <span className="text-sm text-gray-600">Example: </span>
                      {item.example}
                    </p>
                  )}
                </div>
              )}

              {/* Button Group */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => onAnkiAdd(item)}
                  className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  Export To Anki
                </button>
                
                <button
                  onClick={() => onOpenNoteModal(item)}
                  title={hasNote ? "Edit note" : "Add note"}
                  className={`inline-flex items-center justify-center p-0 w-7 h-7 text-xs font-semibold rounded-full transition-colors ${
                    hasNote
                      ? 'dark:text-yellow-400 dark:bg-yellow-500/10 bg-yellow-300 text-yellow-900 hover:bg-yellow-500/20'
                      : 'dark:text-gray-400 text-black dark:bg-white/10 bg-white hover:bg-white/20'
                  }`}
                >
                  {hasNote ? (
                    <StickyNote className="w-4 h-4" />
                  ) : (
                    <NotebookText className="w-4 h-4" />
                  )}
                </button>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}