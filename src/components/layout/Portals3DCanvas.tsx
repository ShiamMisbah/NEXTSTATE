import { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, Grid, Edges } from '@react-three/drei';
import * as THREE from 'three';

const PANELS = [
  { 
    id: "Citizen", title: "CITIZEN SERVICES", color: "#10b981", 
    systems: ["Public & Citizen Service Portals", "Citizen Complaint & Grievance", "Utility Bill & Service Requests", "Permit & License Management", "Citizen Grievance App", "City Services App", "Permit Renewal App"] 
  },
  { 
    id: "Records", title: "RECORDS & ADMIN", color: "#3b82f6", 
    systems: ["Digital Filing & Records", "Land Registry Systems", "Property Tax Admin System"] 
  },
  { 
    id: "Justice", title: "JUSTICE & LEGAL", color: "#a855f7", 
    systems: ["Legal Case Management", "Digital Case File Management"] 
  },
  { 
    id: "Health", title: "PUBLIC HEALTH", color: "#f59e0b", 
    systems: ["Health Appointment App", "Outbreak Hotline", "Epidemic Information Desk", "Hospital Management Software"] 
  },
  { 
    id: "Helpline", title: "HELPLINES & HOTLINES", color: "#ec4899", 
    systems: ["National Non-Emergency", "Social Services Support", "Service Registration Hotline", "Disaster Response Center"] 
  },
  { 
    id: "Learning", title: "LEARNING & ED", color: "#06b6d4", 
    systems: ["Learning Management System", "Certification Portals", "Classroom Management Portal"] 
  }
];

function Panel({ data, index, isActive, onToggle }: { data: typeof PANELS[0], index: number, isActive: boolean, onToggle: () => void }) {
  const [hovered, setHovered] = useState(false);
  const width = 1.9;
  const height = 2.8;

  const xOffset = ((PANELS.length - 1) / 2 - index) * 2.8;

  const stats = useMemo(() => data.systems.map(() => ({
    width: `${Math.floor(Math.random() * 40 + 60)}%`,
    opacity: Math.random() * 0.5 + 0.5
  })), [data.systems]);
  
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScaleY = isActive ? 1 : 0.3;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScaleY, delta * 8);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.15} position={[xOffset, 0, 0]}>
       {/* Glass Panel Frame */}
       <mesh 
         ref={meshRef}
         position={[0, 0, -0.02]}
         onPointerEnter={() => { setHovered(true); document.body.style.cursor="pointer"; }}
         onPointerLeave={() => { setHovered(false); document.body.style.cursor="auto"; }}
         onClick={(e) => { e.stopPropagation(); onToggle(); }}
       >
         <boxGeometry args={[width, height, 0.04]} />
         <meshStandardMaterial color="#020202" opacity={0.7} transparent roughness={0.1} metalness={0.9} />
         <Edges scale={1.01} color={data.color} opacity={hovered || isActive ? 1 : 0.4} transparent />
       </mesh>

       {/* Floating Interactive HUD UI */}
       <Html transform distanceFactor={3.5} position={[0, 0, 0.01]} zIndexRange={[100 - index, 0]} pointerEvents="none">
         <div 
           className={`flex flex-col font-mono rounded-lg overflow-hidden backdrop-blur-md transition-all duration-500 will-change-transform ${isActive ? 'h-[500px]' : 'h-[120px]'}`}
           style={{ 
               width: '280px',
               backgroundColor: hovered || isActive ? 'rgba(5,5,5,0.9)' : 'rgba(0,0,0,0.6)',
               border: `1px solid ${data.color}${hovered || isActive ? '80' : '40'}`,
               boxShadow: hovered || isActive ? `0 0 40px ${data.color}40` : `0 0 15px ${data.color}15`,
               transform: hovered && !isActive ? 'scale(1.05)' : 'scale(1)'
           }}
         >
           {/* Top Window Bar */}
           <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: `${data.color}30`, backgroundColor: `${data.color}15` }}>
             <span className="text-[10px] text-white/70 tracking-widest font-bold">SYS.NODE //</span>
             <div className="flex items-center gap-2">
                 <span className="text-[8px] text-white/50">{isActive ? 'ACTIVE_SYNC' : 'STANDBY'}</span>
                 <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: data.color, boxShadow: isActive ? `0 0 8px ${data.color}` : 'none' }} />
             </div>
           </div>

           {/* Content Body */}
           <div className="p-5 flex-1 flex flex-col justify-center">
              <h3 className={`font-bold tracking-widest transition-all duration-300 ${isActive ? 'text-base mb-6 text-left' : 'text-lg text-center mb-0'}`} style={{ color: data.color }}>{data.title}</h3>
              
              <div className={`flex-1 space-y-4 transition-all duration-500 overflow-hidden ${isActive ? 'opacity-100 max-h-[500px] mt-2' : 'opacity-0 max-h-0 mt-0'}`}>
                 {data.systems.map((sys, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                       <span className="text-white/90 text-xs font-semibold">{sys}</span>
                       <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full rounded-full transition-all duration-1000 delay-100" 
                                style={{ 
                                    width: isActive ? stats[i].width : '0%', 
                                    backgroundColor: data.color,
                                    opacity: isActive ? stats[i].opacity : 0
                                }} 
                           />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Bottom Status Bar */}
           <div className={`p-3 border-t text-[10px] flex justify-between text-white/40 bg-black/60 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 hidden'}`} style={{ borderColor: `${data.color}30` }}>
             <span>THREADS: {hovered ? '1024' : '512'}</span>
             <span style={{ color: data.color }}>v2.4.1</span>
           </div>
         </div>
       </Html>
    </Float>
  );
}

function Scene() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PANELS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (controlsRef.current) {
      // cinematic focus pulling for video sequence
      const targetX = ((PANELS.length - 1) / 2 - activeIndex) * 2.8;
      controlsRef.current.target.lerp(new THREE.Vector3(targetX, 0, 0), delta * 2);
      // Track camera alongside the target
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 1.5);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5, delta * 1.5);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7, delta * 1.5);
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      <OrbitControls 
        ref={controlsRef}
        enableZoom={false} 
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 1.7} 
        minPolarAngle={Math.PI / 4} 
        enablePan={false}
        autoRotate={false}
      />
      {/* 3D Software Grid Environment */}
      <Grid 
        position={[0, -2.5, 0]} 
        args={[50, 50]} 
        cellSize={0.25} cellThickness={0.5} cellColor="#10b981" 
        sectionSize={2.5} sectionThickness={1} sectionColor="#059669" 
        fadeDistance={25} fadeStrength={1.5} 
      />

      {/* Deploy Linear Stacked Dashboard Panels */}
      {PANELS.map((p, i) => (
        <Panel 
          key={i} 
          data={p} 
          index={i}
          isActive={activeIndex === i}
          onToggle={() => {
            setActiveIndex(i);
          }}
        />
      ))}

      {/* Decorative Core Hologram Base */}
      <group position={[0, -2.4, 0]}>
        <mesh>
          <boxGeometry args={[18, 0.2, 3]} />
          <meshStandardMaterial color="#050505" />
          <Edges scale={1} color="#10b981" opacity={0.3} transparent />
        </mesh>
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[17.5, 2.5]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export default function Portals3DCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full mix-blend-screen bg-transparent pointer-events-auto">
      <Canvas camera={{ position: [0, 1.5, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1.5} />
        <Scene />
      </Canvas>
    </div>
  );
}
