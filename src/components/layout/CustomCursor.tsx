import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

interface CustomCursorProps {
  theme?: 'light' | 'dark';
}

export default function CustomCursor({ theme = 'dark' }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    document.body.classList.add('tech-cursor');

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.tagName) return;
      
      const isClickable = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        (target.closest && (target.closest('button') || target.closest('a')));
        
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('tech-cursor');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[100000] ${
          theme === 'light'
            ? 'text-emerald-600 drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)]'
            : 'mix-blend-screen text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]'
        }`}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 25, mass: 0.1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Globe className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </>
  );
}

