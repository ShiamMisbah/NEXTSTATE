import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function TechnologyCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    // Enable custom cursor styling class on body
    document.body.classList.add('tech-cursor-active');

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
          target.closest('.cursor-pointer') ||
          target.closest('canvas') // interactive 3D canvasses
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
      document.body.classList.remove('tech-cursor-active');
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

      {/* Outer Tech Ring with Reticle Brackets */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 28, mass: 0.1 }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Glowing Outer Circle */}
          <span 
            className={`absolute inset-0 rounded-full border transition-all duration-300 ${
              isHovering 
                ? 'border-cyan-400/80 bg-cyan-500/5 shadow-[0_0_12px_rgba(34,211,238,0.5)]' 
                : 'border-emerald-500/50 bg-transparent shadow-[0_0_8px_rgba(16,185,129,0.2)]'
            }`} 
          />

          {/* Futuristic corner tick marks */}
          <span className={`absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-emerald-400'}`} />
          <span className={`absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-emerald-400'}`} />
          <span className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-emerald-400'}`} />
          <span className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-emerald-400'}`} />
        </div>
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1100, damping: 32, mass: 0.05 }}
      >
        <div 
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isHovering 
              ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' 
              : 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
          }`} 
        />
      </motion.div>
    </>
  );
}
