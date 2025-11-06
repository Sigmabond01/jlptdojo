export default function DojoText() {
  const kanjiChars = ['武', '道', '心', '力', '気', '剣', '龍', '虎'];
  
  return (
    <div className="flex flex-col items-center pt-20">
      <div className="relative">
        {kanjiChars.map((char, i) => {
          const angle = (i / kanjiChars.length) * Math.PI * 2;
          const radius = 140;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const scale = 1 + (i % 3) * 0.3;
          const rotation = -15 + (i % 5) * 10;
          
          return (
            <div
              key={i}
              className="absolute dark:text-white text-neutral-900 font-bold"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${rotation}deg)`,
                fontSize: `${2 + (i % 3) * 0.5}rem`,
                zIndex: 0
              }}
            >
              {char}
            </div>
          );
        })}
        
        <svg
          viewBox="0 0 300 320"
          width="400"
          height="400"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          
          <circle cx="150" cy="150" r="90" fill="#000" stroke="#fff" strokeWidth="2" />
          
          <path
            d="M 150 60 A 90 90 0 0 1 150 240 A 45 45 0 0 1 150 150 A 45 45 0 0 0 150 60"
            fill="#fff"
          ></path>

          <circle cx="150" cy="105" r="15" fill="#fff" />
          <circle cx="150" cy="195" r="15" fill="#000" />
        </svg>
      </div>
    </div>
  );
}