import { ProgressData } from "../../lib/getProgress";

interface ProgressCardProps {
  title: string;
  data: ProgressData;
  href: string;
}

export default function ProgressCard({ title, data, href }: ProgressCardProps) {
  return (
    <a
      href={href}
      className="group relative bg-white/80 dark:bg-neutral-950 border-2 border-black/10 dark:border-white/10 p-6 hover:scale-105 transition-all duration-500"
    >
      {[['top-3 left-3 border-t-2 border-l-2'], ['top-3 right-3 border-t-2 border-r-2'], ['bottom-3 left-3 border-b-2 border-l-2'], ['bottom-3 right-3 border-b-2 border-r-2']].map((cls, i) => (
        <div key={i} className={`absolute w-4 h-4 ${cls.join(' ')} border-black/30 dark:border-white/30`} />
      ))}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {data.completed} / {data.total} items
        </p>

        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
          <div
            className="bg-black dark:bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${data.percentage}%` }}
          />
        </div>

        <p className="text-2xl font-bold text-right">{data.percentage}%</p>
      </div>
    </a>
  );
}
