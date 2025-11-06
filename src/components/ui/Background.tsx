"use client"
export default function YinYangBackground() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">


        {/* Scattered smaller yin-yangs */}
        {[
          { top: '10%', left: '15%', size: 100, delay: 0 },
          { top: '20%', right: '10%', size: 80, delay: 2 },
          { top: '70%', left: '10%', size: 120, delay: 4 },
          { top: '75%', right: '15%', size: 90, delay: 6 },
          { top: '40%', left: '5%', size: 60, delay: 3 },
          { top: '50%', right: '5%', size: 70, delay: 5 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute dark:opacity-70"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
            }}
          >
            <svg 
              viewBox="0 0 200 200" 
              className="w-full h-full animate-spin-slow" 
              style={{ animationDelay: `${pos.delay}s` }}
            >
              <circle cx="100" cy="100" r="90" fill="currentColor" className="text-black dark:text-white" />
              <path
                d="M 100 10 A 90 90 0 0 1 100 190 A 45 45 0 0 1 100 100 A 45 45 0 0 0 100 10"
                fill="currentColor"
                className="text-white dark:text-black"
              />
              <circle cx="100" cy="55" r="15" fill="currentColor" className="text-white dark:text-black" />
              <circle cx="100" cy="145" r="15" fill="currentColor" className="text-black dark:text-white" />
            </svg>
          </div>
        ))}
      </div>


    </>
  );
}