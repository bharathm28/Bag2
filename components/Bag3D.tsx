
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  ContactShadows, 
  RoundedBox,
  Float
} from '@react-three/drei';
import * as THREE from 'three';
import { CustomizationState } from '../types';

interface BagMeshProps {
  state: CustomizationState;
}

// Separate component to handle texture loading safely
const TexturedPanel: React.FC<{ url: string; dims: any; color: string }> = ({ url, dims, color }) => {
  const texture = useLoader(THREE.TextureLoader, url);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  
  return (
    <mesh position={[0, 0, dims.d / 2 + 0.041]}>
      <planeGeometry args={[dims.w * 0.7, dims.h * 0.65]} />
      <meshStandardMaterial 
        color={color}
        map={texture}
        roughness={0.7}
        metalness={0.1}
        transparent={true}
      />
    </mesh>
  );
};

const Hardware: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => (
  <mesh position={position} scale={scale} castShadow>
    <torusGeometry args={[0.05, 0.015, 16, 32]} />
    <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
  </mesh>
);

const BagMesh: React.FC<BagMeshProps> = ({ state }) => {
  const groupRef = useRef<THREE.Group>(null);

  const dimensions = useMemo(() => {
    switch (state.type) {
      case 'College Bag':
      case 'Backpack Bag': return { w: 1.0, h: 1.4, d: 0.7, r: 0.2, taper: 0.8 };
      case 'Duffel Bag':
      case 'Barrel Bag': return { w: 1.7, h: 0.9, d: 0.9, r: 0.45, taper: 1.0 };
      case 'Tote Bag': return { w: 1.4, h: 1.3, d: 0.35, r: 0.05, taper: 1.1 };
      case 'Messenger Bag': return { w: 1.5, h: 1.1, d: 0.45, r: 0.1, taper: 1.0 };
      default: return { w: 1.0, h: 1.0, d: 0.6, r: 0.15, taper: 1.0 };
    }
  }, [state.type]);

  return (
    <group ref={groupRef} scale={1.1}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Main Bag Body - Base Layer */}
        <RoundedBox
          args={[dimensions.w, dimensions.h, dimensions.d]}
          radius={dimensions.r}
          smoothness={6}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial 
            color={state.frontColor} 
            roughness={0.65} 
            metalness={0.15} 
            envMapIntensity={1}
          />
        </RoundedBox>

        {/* Front Panel Inset (Seam Detail) */}
        <mesh position={[0, 0, 0.01]}>
          <RoundedBox
            args={[dimensions.w * 0.9, dimensions.h * 0.85, dimensions.d]}
            radius={dimensions.r * 0.8}
            smoothness={6}
          >
            <meshStandardMaterial color={state.frontColor} roughness={0.7} metalness={0.1} />
          </RoundedBox>
        </mesh>

        {/* Custom Print Layer */}
        {state.frontTexture && (
          <Suspense fallback={null}>
            <TexturedPanel url={state.frontTexture} dims={dimensions} color={state.frontColor} />
          </Suspense>
        )}

        {/* Hardware - Strap Rings */}
        <Hardware position={[-0.3, dimensions.h / 2, dimensions.d / 2 - 0.05]} />
        <Hardware position={[0.3, dimensions.h / 2, dimensions.d / 2 - 0.05]} />

        {/* Handles & Straps */}
        <group position={[0, dimensions.h / 2, 0]}>
          {/* Top Carry Handle */}
          <mesh castShadow position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.22, 0.045, 16, 100, Math.PI]} />
            <meshStandardMaterial color={state.gripColor} roughness={0.4} metalness={0.2} />
          </mesh>
          
          {/* Backpack Straps (Enhanced Flat Geometry) */}
          {(state.type.includes('Bag') || state.type === 'College Bag') && (
            <group position={[0, -0.1, -dimensions.d / 2]}>
              <mesh position={[-0.3, -dimensions.h / 2, -0.1]} rotation={[0.1, 0, 0.05]} castShadow>
                <boxGeometry args={[0.15, dimensions.h * 1.3, 0.03]} />
                <meshStandardMaterial color={state.strapColor} roughness={0.8} />
              </mesh>
              <mesh position={[0.3, -dimensions.h / 2, -0.1]} rotation={[0.1, 0, -0.05]} castShadow>
                <boxGeometry args={[0.15, dimensions.h * 1.3, 0.03]} />
                <meshStandardMaterial color={state.strapColor} roughness={0.8} />
              </mesh>
              {/* Strap Buckles */}
              <mesh position={[-0.3, -dimensions.h + 0.2, -0.1]}>
                <boxGeometry args={[0.18, 0.08, 0.05]} />
                <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
              </mesh>
              <mesh position={[0.3, -dimensions.h + 0.2, -0.1]}>
                <boxGeometry args={[0.18, 0.08, 0.05]} />
                <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
              </mesh>
            </group>
          )}
        </group>

        {/* Luxury Branding Plate (Hardware) */}
        <group position={[0, -dimensions.h / 2 + 0.25, dimensions.d / 2 + 0.03]}>
          <mesh castShadow>
            <boxGeometry args={[0.35, 0.12, 0.02]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.25, 0.06]} />
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
          </mesh>
        </group>

        {/* Zipper Line Detail */}
        <mesh position={[0, dimensions.h / 2 - 0.1, dimensions.d / 2 + 0.01]}>
          <boxGeometry args={[dimensions.w * 0.8, 0.01, 0.02]} />
          <meshStandardMaterial color="#111" metalness={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

export const Bag3D: React.FC<BagMeshProps> = ({ state }) => {
  return (
    <div className="w-full h-full bg-[#ebecee] flex items-center justify-center">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.5, 4.5]} fov={35} />
        
        {/* Professional Studio Lighting */}
        <ambientLight intensity={0.6} />
        
        {/* Main Key Light */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Fill Light */}
        <pointLight position={[-5, 2, 5]} intensity={0.8} color="#fff" />
        
        {/* Rim Light (Crucial for Realism - defines edges) */}
        <pointLight position={[0, 5, -5]} intensity={1.2} color="#fff" />
        
        {/* Warm Ground Bounce */}
        <pointLight position={[0, -5, 2]} intensity={0.4} color="#fcd34d" />
        
        <BagMesh state={state} />
        
        <ContactShadows 
          position={[0, -1.2, 0]} 
          opacity={0.5} 
          scale={12} 
          blur={3} 
          far={2.5} 
          color="#222"
        />
        
        <OrbitControls 
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          autoRotate={false}
          makeDefault
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
};
