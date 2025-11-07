"use client"
import React, { useState, useEffect, useRef } from 'react';

type AnimationStage = 'intro' | 'transitioning' | 'complete';

interface LogoPosition {
  x: number;
  y: number;
  scale: number;
}

const DojoEntrance: React.FC = () => {
  const [animationStage, setAnimationStage] = useState<AnimationStage>('intro');
  const [logoPosition, setLogoPosition] = useState<LogoPosition>({ x: 0, y: 0, scale: 1 });
  const swirlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stage 1: Show spinning swirl for 3 seconds
    const introTimer = setTimeout(() => {
      // Find the logo element (looking for the SVG with the yin-yang)
      const logoElement = document.querySelector<SVGSVGElement>('svg[viewBox="0 0 300 300"]');
      
      if (logoElement) {
        const logoRect = logoElement.getBoundingClientRect();
        const swirlRect = swirlRef.current?.getBoundingClientRect();
        
        if (swirlRect) {
          // Calculate the translation needed to move swirl to logo
          const translateX = logoRect.left + logoRect.width / 2 - (swirlRect.left + swirlRect.width / 2);
          const translateY = logoRect.top + logoRect.height / 2 - (swirlRect.top + swirlRect.height / 2);
          
          // Calculate scale to match logo size
          const scaleValue = logoRect.width / swirlRect.width;
          
          setLogoPosition({ x: translateX, y: translateY, scale: scaleValue });
        }
      }
      
      setAnimationStage('transitioning');
    }, 3000);

    // Stage 2: Complete animation and remove overlay
    const completeTimer = setTimeout(() => {
      setAnimationStage('complete');
    }, 4500); // 3s intro + 1.5s transition

    return () => {
      clearTimeout(introTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  // Don't render anything after animation completes
  if (animationStage === 'complete') {
    return null;
  }

  return (
    <div
      className="dojo-entrance-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(20,20,30,0.95) 0%, rgba(10,10,15,0.98) 100%)',
        opacity: animationStage === 'transitioning' ? 0 : 1,
        transition: 'opacity 1.5s ease-out',
        pointerEvents: animationStage === 'transitioning' ? 'none' : 'all',
      }}
    >
      {/* Yin-Yang Swirl SVG - Matching your exact logo design */}
      <div
        ref={swirlRef}
        style={{
          width: '200px',
          height: '200px',
          transform: animationStage === 'transitioning' 
            ? `translate(${logoPosition.x}px, ${logoPosition.y}px) scale(${logoPosition.scale})`
            : 'translate(0, 0) scale(1)',
          transition: 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          opacity: animationStage === 'transitioning' ? 0 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            animation: animationStage === 'intro' ? 'spinCircular 2s linear infinite' : 'none',
            transformOrigin: '100px 100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 300 320"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.4))',
              display: 'block',
            }}
          >
            {/* Exact replica of your logo */}
            <circle cx="150" cy="150" r="90" fill="#000" stroke="#fff" strokeWidth="2" />

            <path
              d="M 150 60 A 90 90 0 0 1 150 240 A 45 45 0 0 1 150 150 A 45 45 0 0 0 150 60"
              fill="#fff"
            />

            <circle cx="150" cy="105" r="15" fill="#fff" />
            <circle cx="150" cy="195" r="15" fill="#000" />
          </svg>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spinCircular {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Prevent scrolling during animation */
        .dojo-entrance-overlay {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DojoEntrance;