export const KanjiIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 4h12M12 4v16M4 10h16M6 16h12" strokeWidth="2.5" />
    <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
  </svg>
);