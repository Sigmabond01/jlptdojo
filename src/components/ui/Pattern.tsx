import React from 'react';

const Pattern = () => {
  const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
  const chars = katakana.repeat(30).split('');

  const floatAnimation = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); opacity: 0.8; }
      50% { transform: translateY(-8px); opacity: 1; }
    }
    .animate-float {
      animation: float infinite;
    }
  `;

  return (
    // The core positioning fix
    <div className="fixed inset-0 z-10 overflow-hidden">
      <style>{floatAnimation}</style>
      
      {/* RESTORED: Your original classes for grid layout and text styling */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] auto-rows-[40px] text-[32px] font-mono">
        {chars.map((char, i) => (
          <span
            key={i}
            // RESTORED: Kept your original classes.
            // NOTE: `text-gray-700` is very dark on black. I've changed it to `text-gray-500`
            // to make it subtly visible. Feel free to change it back or use `text-white/20`.
            className="text-center select-none leading-none text-black mix-blend-difference animate-float"
            style={{
              // RESTORED: Your original animation timing
              animationDelay: `${(i % 25) * 0.1}s`,
              animationDuration: `${5 + (i % 5)}s`
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pattern;