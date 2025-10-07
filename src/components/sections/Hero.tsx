import React from 'react';

export default function Hero() {
  return (
      <div>
      <div className="relative z-10 backdrop-blur-[1px] flex items-center justify-center min-h-screen p-4">

          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-4">
              Welcome to JLPTDojo
            </h1>
            <p className="text-xl text-black font-bold max-w-2xl mx-auto">
              Your personal training ground for mastering the Japanese Language Proficiency Test 🇯🇵
            </p>

          </div>

          {/* Auth Button */}
        </div>
      </div>
  );
}