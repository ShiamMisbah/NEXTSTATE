import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

function WaveTerrain({ count = 100, size = 100 }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, phases] = useMemo(() => {
    const coords = new Float32Array(count * count * 3);
    const phs = new Float32Array(count * count);
    let i = 0;
    const spacing = size / count;
    const offset = size / 2;
    
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        coords[i * 3] = x * spacing - offset;
        coords[i * 3 + 1] = 0;
        coords[i * 3 + 2] = z * spacing - offset;
        
        // Random phase for wave motion
        phs[i] = Math.random() * Math.PI * 2;
        i++;
      }
    }
    return [coords, phs];
  }, [count, size]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * 0.5;
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      let i = 0;
      for (let x = 0; x < count; x++) {
        for (let z = 0; z < count; z++) {
          const px = positions[i * 3];
          const pz = positions[i * 3 + 2];
          
          // Complex wave equation
          const y = Math.sin(px * 0.1 + time) * 2 + 
                    Math.cos(pz * 0.1 + time) * 2 + 
                    Math.sin((px + pz) * 0.05 - time) * 1;
                    
          positions[i * 3 + 1] = y;
          i++;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#10b981" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle follow mouse
      const targetX = state.pointer.x * 0.1;
      const targetY = -state.pointer.y * 0.1;
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      
      // Auto gentle forward motion effect (by pushing the group forward slightly or just rotating)
      groupRef.current.rotation.y += 0.001; 
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lower wave terrain */}
      <group position={[0, -8, -10]}>
         <WaveTerrain count={80} size={150} />
      </group>
      {/* Upper inverted wave terrain */}
      <group position={[0, 20, -10]} rotation={[Math.PI, 0, 0]}>
         <WaveTerrain count={50} size={150} />
      </group>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 5, -20]}>
          <icosahedronGeometry args={[8, 1]} />
          <meshBasicMaterial color="#059669" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function Tech3DCanvas() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none mix-blend-screen h-screen">
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-transparent z-10" />
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
