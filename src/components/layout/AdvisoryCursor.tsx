import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function AdvisoryCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    // Enable custom cursor styling class on body
    document.body.classList.add('advisory-cursor-active');

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.tagName) return;

      const isClickable =
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.classList.contains('cursor-pointer') ||
        (target.closest && (
          target.closest('button') || 
          target.closest('a') || 
          target.closest('.cursor-pointer')
        ));

      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('advisory-cursor-active');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [hasMoved]);

  if (!hasMoved) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Advisory Strategic Outer Compass Reticle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000] mix-blend-screen text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 28, mass: 0.1 }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Main compass outer circle */}
          <span 
            className={`absolute inset-0 rounded-full border transition-all duration-300 ${
              isHovering 
                ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                : 'border-amber-500/40 bg-transparent'
            }`} 
          />

          {/* Strategic crosshair/compass tick marks */}
          <span className={`absolute top-0 w-[1px] h-1.5 transition-colors duration-300 ${isHovering ? 'bg-amber-400 h-2' : 'bg-amber-500/60'}`} />
          <span className={`absolute bottom-0 w-[1px] h-1.5 transition-colors duration-300 ${isHovering ? 'bg-amber-400 h-2' : 'bg-amber-500/60'}`} />
          <span className={`absolute left-0 h-[1px] w-1.5 transition-colors duration-300 ${isHovering ? 'bg-amber-400 w-2' : 'bg-amber-500/60'}`} />
          <span className={`absolute right-0 h-[1px] w-1.5 transition-colors duration-300 ${isHovering ? 'bg-amber-400 w-2' : 'bg-amber-500/60'}`} />

          {/* Compass ring inner rotating notches (when hovering) */}
          {isHovering && (
            <motion.div 
              className="absolute inset-1.5 rounded-full border border-dashed border-amber-400/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>

      {/* Strategic Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{ type: 'spring', stiffness: 1100, damping: 32, mass: 0.05 }}
      >
        <div 
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            isHovering 
              ? 'bg-amber-300 shadow-[0_0_8px_#f59e0b] scale-125' 
              : 'bg-amber-400 shadow-[0_0_4px_rgba(245,158,11,0.5)]'
          }`} 
        />
      </motion.div>
    </>
  );
}
