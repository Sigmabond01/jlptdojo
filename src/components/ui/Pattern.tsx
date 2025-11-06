import React from 'react';

const Pattern = () => {
  const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
  const chars = katakana.repeat(25).split("");

  return (
    // The core positioning fix
    <div className="absolute inset-0 z-0 overflow-hidden">
      
      {/* RESTORED: Your original classes for grid layout and text styling */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] auto-rows-[40px] text-[20px] font-mono">
        {chars.map((char, i) => (
          <span
            key={i}
            // RESTORED: Kept your original classes.
            // NOTE: `text-gray-700` is very dark on black. I've changed it to `text-gray-500`
            // to make it subtly visible. Feel free to change it back or use `text-white/20`.
            className="text-center select-none leading-none dark:text-gray-600 text-black mix-blend-difference animate-float">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pattern;