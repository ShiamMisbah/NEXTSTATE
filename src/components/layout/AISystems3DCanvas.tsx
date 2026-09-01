import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Database, Globe, Network, ShieldCheck } from 'lucide-react';

const THEME_COLOR = "#22d3ee"; // cyan-400

const NODE_DATA = [
  { Icon: Brain, label: "Machine Learning", desc: "Adaptive algorithms for autonomous decision making." },
  { Icon: Database, label: "Data Extraction", desc: "Intelligent OCR and semantic data mining." },
  { Icon: Globe, label: "Edge AI", desc: "Distributed intelligence across global nodes." },
  { Icon: ShieldCheck, label: "Threat Detection", desc: "Predictive security and anomaly pattern recognition." },
  { Icon: Network, label: "Neural Routing", desc: "Optimized data pathways and automated load balancing." },
  { Icon: Cpu, label: "Accelerated Inference", desc: "High-performance compute for real-time processing." },
];

export default function AISystems3DCanvas() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= NODE_DATA.length - 1 ? -1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const nodes = useMemo(() => {
    const radius = 140;
    return NODE_DATA.map((data, i) => {
      const angle = (i / NODE_DATA.length) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.9;
      return { ...data, x, y };
    });
  }, []);

  const targetScale = activeIndex !== -1 ? 1.2 : 1;
  const targetX = activeIndex !== -1 ? -nodes[activeIndex].x * 0.7 : 0;
  const targetY = activeIndex !== -1 ? -nodes[activeIndex].y * 0.7 : 0;
  
  const getActiveInfo = () => {
    if (activeIndex === -1) {
      return {
        title: "Central Neural Core",
        desc: "Orchestrating autonomous intelligence systems."
      };
    }
    return {
      title: NODE_DATA[activeIndex].label,
      desc: NODE_DATA[activeIndex].desc
    };
  };

  const activeInfo = getActiveInfo();

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden pointer-events-auto bg-transparent">
      
      {/* 2D Zooming Canvas Area */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center origin-center">
        <motion.div 
          className="relative w-[400px] h-[400px] flex items-center justify-center scale-[0.6] sm:scale-[0.8] md:scale-100"
          animate={{ scale: targetScale, x: targetX, y: targetY }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
        >
          {/* SVG layer for wiring */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
             {/* Data Wires to Nodes */}
             {nodes.map((node, i) => {
               const isActive = activeIndex === i || activeIndex === -1;
               const isSpecificallyActive = activeIndex === i;
               return (
                 <motion.path 
                    key={`wire-${i}`}
                    d={`M 200 200 L ${200 + node.x} ${200 + node.y}`}
                    stroke={THEME_COLOR}
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

          {/* Central Chip */}
          <motion.div 
            className={`relative z-10 w-28 h-28 bg-black/90 backdrop-blur border-2 ${activeIndex === -1 ? 'border-cyan-400' : 'border-cyan-400/30'} rounded-xl flex items-center justify-center`}
            animate={{ 
              boxShadow: activeIndex === -1 
                ? ['0 0 30px rgba(34,211,238,0.4)', '0 0 60px rgba(34,211,238,0.8)', '0 0 30px rgba(34,211,238,0.4)'] 
                : '0 0 15px rgba(34,211,238,0.1)'
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Pins Simulation */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(6)].map((_, i) => <div key={`t-${i}`} className={`w-1.5 h-3 ${activeIndex === -1 ? 'bg-cyan-500' : 'bg-cyan-900 border-cyan-800'} border rounded-sm`} />)}
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(6)].map((_, i) => <div key={`b-${i}`} className={`w-1.5 h-3 ${activeIndex === -1 ? 'bg-cyan-500' : 'bg-cyan-900 border-cyan-800'} border rounded-sm`} />)}
            </div>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 flex flex-col gap-2">
              {[...Array(6)].map((_, i) => <div key={`l-${i}`} className={`w-3 h-1.5 ${activeIndex === -1 ? 'bg-cyan-500' : 'bg-cyan-900 border-cyan-800'} border rounded-sm`} />)}
            </div>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 flex flex-col gap-2">
              {[...Array(6)].map((_, i) => <div key={`r-${i}`} className={`w-3 h-1.5 ${activeIndex === -1 ? 'bg-cyan-500' : 'bg-cyan-900 border-cyan-800'} border rounded-sm`} />)}
            </div>

            <div className="w-20 h-20 border border-cyan-400/30 rounded-lg flex items-center justify-center bg-black">
               <span className="font-mono text-3xl font-bold text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,1)] tracking-widest pl-1">
                 AI
               </span>
            </div>
          </motion.div>

          {/* Outer Nodes */}
          {nodes.map((node, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={`node-${i}`}
                className={`absolute z-20 w-14 h-14 bg-black/95 border ${isActive ? 'border-cyan-300 z-30' : 'border-cyan-400/40'} rounded-full flex items-center justify-center`}
                style={{ 
                  left: `calc(50% + ${node.x}px - 28px)`, 
                  top: `calc(50% + ${node.y}px - 28px)` 
                }}
                animate={{ 
                  scale: isActive ? 1.3 : 0.9, 
                  opacity: isActive ? 1 : 0.4,
                  boxShadow: isActive ? '0 0 30px rgba(34,211,238,0.8)' : '0 0 0px rgba(34,211,238,0)'
                }}
                transition={{ duration: 0.8 }}
              >
                 <node.Icon className={`w-6 h-6 ${isActive ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,1)]' : 'text-cyan-600'}`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Persistent Info Overlay at the bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm bg-black/80 border border-cyan-500/30 p-4 rounded-2xl backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col items-center text-center"
          >
            <div className="text-cyan-300 font-mono text-sm font-bold mb-1 tracking-wider uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
               {activeInfo.title}
            </div>
            <div className="text-white/70 text-xs sm:text-sm font-light">
               {activeInfo.desc}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
