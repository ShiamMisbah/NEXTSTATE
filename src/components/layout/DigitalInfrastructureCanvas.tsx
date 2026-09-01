import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, GraduationCap, Hospital, Shield, Network, Building, Server } from 'lucide-react';

const ENTITIES = [
  { id: 'classrooms', icon: GraduationCap, label: 'Digital Classrooms', desc: 'Interactive boards, cloud learning, and connected student environments.' },
  { id: 'offices', icon: Building2, label: 'Smart Offices', desc: 'Automated workspaces, unified communications, and remote collaboration.' },
  { id: 'hospitals', icon: Hospital, label: 'Connected Healthcare', desc: 'Telemedicine, unified patient records, and IoT medical devices.' },
  { id: 'smart-cities', icon: Building, label: 'Smart Cities', desc: 'Intelligent traffic networks, automated grids, and public security.' },
];

export default function DigitalInfrastructureCanvas() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= ENTITIES.length - 1 ? -1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nodes = useMemo(() => {
    const radius = 120;
    return ENTITIES.map((data, i) => {
      // distribute along the top and sides
      const angle = (i / ENTITIES.length) * Math.PI - Math.PI; 
      // i=0: -180deg (left), i=1: -120deg, i=2: -60deg, i=3: 0deg (right) 
      // Let's just do a semi-circle or a straight line or grid.
      // Grid is probably better
      const isLeft = i % 2 === 0;
      const isTop = i < 2;
      const x = isLeft ? -100 : 100;
      const y = isTop ? -80 : 80;
      return { ...data, x, y };
    });
  }, []);

  const activeInfo = activeIndex === -1 ? {
    label: "Digital Infrastructure Hub",
    desc: "Transforming traditional physical architecture into hyper-connected smart ecosystems."
  } : ENTITIES[activeIndex];

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden pointer-events-auto bg-transparent">
      
      {/* 2D Zooming Canvas Area */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center origin-center">
        <motion.div 
          className="relative w-[360px] h-[360px] flex items-center justify-center scale-[0.7] sm:scale-95 md:scale-100"
          animate={{ 
            scale: activeIndex === -1 ? 1 : 1.1,
            x: activeIndex === -1 ? 0 : -nodes[activeIndex].x * 0.4,
            y: activeIndex === -1 ? 0 : -nodes[activeIndex].y * 0.4
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
        >
          
          {/* SVG layer for wiring */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 360">
             {nodes.map((node, i) => {
               const isActive = activeIndex === i || activeIndex === -1;
               const isSpecificallyActive = activeIndex === i;
               return (
                 <motion.path 
                    key={`wire-${i}`}
                    d={`M 180 180 Q ${180} ${180 + node.y} ${180 + node.x} ${180 + node.y}`}
                    stroke="#10b981" // emerald-500
                    strokeWidth={isSpecificallyActive ? "3" : "1.5"}
                    fill="none"
                    strokeDasharray={isSpecificallyActive ? "8 8" : "4 4"}
                    opacity={isSpecificallyActive ? 0.9 : (isActive ? 0.4 : 0.1)}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -24 }}
                    transition={{ duration: isSpecificallyActive ? 1 : 3, ease: "linear", repeat: Infinity }}
                 />
               );
             })}
          </svg>

          {/* Central Hub Container (Data Center/Cloud) */}
          <motion.div 
            className={`relative z-10 w-24 h-24 bg-black/90 backdrop-blur border-2 ${activeIndex === -1 ? 'border-emerald-400' : 'border-emerald-400/30'} rounded-2xl flex items-center justify-center`}
            animate={{ 
              boxShadow: activeIndex === -1 
                ? ['0 0 30px rgba(16,185,129,0.4)', '0 0 60px rgba(16,185,129,0.8)', '0 0 30px rgba(16,185,129,0.4)'] 
                : '0 0 15px rgba(16,185,129,0.1)'
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Server className={`w-10 h-10 ${activeIndex === -1 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,1)]' : 'text-emerald-600'}`} />
          </motion.div>

          {/* Infrastructure Nodes */}
          {nodes.map((node, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={`node-${i}`}
                className={`absolute z-20 w-16 h-16 bg-black/95 border ${isActive ? 'border-emerald-300 z-30' : 'border-emerald-400/40'} rounded-2xl flex items-center justify-center`}
                style={{ 
                  left: `calc(50% + ${node.x}px - 32px)`, 
                  top: `calc(50% + ${node.y}px - 32px)` 
                }}
                animate={{ 
                  scale: isActive ? 1.2 : 0.9, 
                  opacity: isActive ? 1 : 0.4,
                  boxShadow: isActive ? '0 0 30px rgba(16,185,129,0.6)' : '0 0 0px rgba(16,185,129,0)'
                }}
                transition={{ duration: 0.8 }}
              >
                 <node.icon className={`w-7 h-7 ${isActive ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,1)]' : 'text-emerald-600'}`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Persistent Info Overlay at the bottom */}
      <div className="absolute bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm bg-black/80 border border-emerald-500/30 p-4 rounded-xl backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2 mb-2">
               {activeIndex !== -1 && <Network className="w-4 h-4 text-emerald-400/70" />}
               <div className="text-emerald-300 font-mono text-sm font-bold tracking-wider uppercase drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                 {activeInfo.label}
               </div>
            </div>
            <div className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
               {activeInfo.desc}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
