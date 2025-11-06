export type ItemType = "grammar" | "vocabulary" | "kanji"

export interface Items {
  id: string

  meaning?: string
  example?: string | null

  grammar?: string
  romaji?: string

  japanese?: string
  word?: string
  romajiReading?: string
  partsOfSpeech?: string
  reading?: string
  real?: string

  character?: string
  onYomi?: string
  kunYomi?: string
  strokeCount?: number | null
}

export interface ItemProps {
  type: ItemType
  items: Items[]
  progress: Set<string>
  notes: Map<string, string>
  onProgressUpdate: (itemId: string, isChecked: boolean) => void
  onAnkiAdd: (item: Items) => void
  onOpenNoteModal: (item: Items) => void
}

