// src/components/ui/AnkiAlert.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
  duration?: number;
}

// Info Icon SVG
const InfoIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

export default function AnkiAlert({ onClose, duration = 5000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="relative w-full p-4 pl-12 mb-4 overflow-hidden text-yellow-900 bg-yellow-100 border border-yellow-300 rounded-lg shadow-md">
      {/* Icon */}
      <div className="absolute top-0 left-0 p-4">
        <InfoIcon />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full text-yellow-900/50 hover:text-yellow-900 hover:bg-yellow-200"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Content */}
      <p className="font-semibold">
        Want to know how this feature works?{' '}
        <Link href="/anki-guide" className="font-bold underline hover:text-blue-700">
          Click here
        </Link>
      </p>
      <p className="text-sm">
        This requires the Anki desktop app to be running.
      </p>

      {/* Timer bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-yellow-400/50">
        <div
          className="h-full bg-yellow-500 animate-shrink-width"
          style={{ animationDuration: `${duration}ms` }}
        ></div>
      </div>
    </div>
  );
}