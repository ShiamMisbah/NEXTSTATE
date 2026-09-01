import { motion } from "motion/react";

export default function GlobalAnimations() {
  const orbs = [
    { id: 1, x: 10, y: 20, dur: 20, scale: 1.5, color: "bg-emerald/10" },
    { id: 2, x: 80, y: 15, dur: 25, scale: 2, color: "bg-emerald-bright/5" },
    { id: 3, x: 50, y: 80, dur: 22, scale: 1.8, color: "bg-emerald/10" },
    { id: 4, x: 20, y: 70, dur: 28, scale: 1.2, color: "bg-white/5" },
    { id: 5, x: 90, y: 90, dur: 18, scale: 2.5, color: "bg-emerald-bright/5" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-screen opacity-60">
      {orbs.map(orb => (
         <motion.div
            key={orb.id}
            className={`absolute w-[40vh] h-[40vh] rounded-full blur-[100px] ${orb.color}`}
            initial={{ top: `${orb.y}%`, left: `${orb.x}%`, scale: 1, x: '-50%', y: '-50%' }}
            animate={{ 
              top: [`${orb.y}%`, `${(orb.y + 30) % 100}%`, `${orb.y}%`],
              left: [`${orb.x}%`, `${(orb.x - 20) % 100}%`, `${orb.x}%`],
              scale: [1, orb.scale, 1],
            }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "linear" }}
         />
      ))}
      {/* Scanning ambient line for the entire site */}
      <motion.div 
        className="absolute left-0 right-0 h-[15vh] bg-gradient-to-b from-transparent via-emerald-bright/5 to-transparent opacity-20"
        animate={{ top: ['-20%', '120%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
