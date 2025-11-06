import { ItemType } from "@/types/items";
import { JlptLevel } from "@/generated/prisma";

export function normalizeParams(params: { category: string; level: string }) {
  const category = params.category.toLowerCase() as ItemType;
  const level = params.level.toUpperCase() as JlptLevel;
  return { category, level };
}
