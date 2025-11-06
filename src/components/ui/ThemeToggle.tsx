"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-black bg-white hover:text-gray-600 duration-300 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/50 dark:text-black transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
