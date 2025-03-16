
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
  animate?: boolean;
}

const Logo3D: React.FC<Logo3DProps> = ({ animate = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const chatBubbleRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Mesh>(null);
  const rupeeGroupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!animate) return;
    
    if (groupRef.current) {
      // Slower, more stable rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    
    if (chatBubbleRef.current) {
      // Smaller scale change
      chatBubbleRef.current.scale.setScalar(0.9 + Math.sin(state.clock.elapsedTime) * 0.05);
    }
    
    if (arrowRef.current) {
      // Smaller rotation
      arrowRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05;
    }
    
    if (rupeeGroupRef.current) {
      // Gentler animations
      rupeeGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      rupeeGroupRef.current.position.y = 0.7 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Chat bubble - simplified geometry */}
      <mesh ref={chatBubbleRef} position={[-0.5, 0, 0]}>
        <sphereGeometry args={[0.6, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#2A3F88" roughness={0.5} metalness={0.1} />
        <mesh position={[-0.4, -0.4, 0]}>
          <sphereGeometry args={[0.2, 6, 6]} />
          <meshStandardMaterial color="#2A3F88" roughness={0.5} metalness={0.1} />
        </mesh>
      </mesh>
      
      {/* Rising arrow - simplified */}
      <mesh ref={arrowRef} position={[0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 6]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.5} />
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.15, 0.3, 6]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.5} />
        </mesh>
      </mesh>
      
      {/* Rupee symbol - in a group */}
      <group ref={rupeeGroupRef} position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.35, 0.1, 12]} />
          <meshStandardMaterial color="#00C9B1" roughness={0.3} metalness={0.3} />
        </mesh>
        <Text3D
          font="/fonts/Inter_Regular.json"
          position={[-0.15, -0.05, 0.06]}
          size={0.3}
          height={0.05}
        >
          ₹
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.5} />
        </Text3D>
      </group>
      
      {/* Reduced number of particles with simpler materials */}
      {[...Array(3)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i * Math.PI * 2 / 3) * 1.2,
            Math.cos(i * Math.PI * 2 / 3) * 1.2,
            0
          ]}
          scale={[0.06, 0.06, 0.06]}
        >
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#00C9B1" : "#2A3F88"} 
            emissive={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#00C9B1" : "#2A3F88"}
            emissiveIntensity={0.3}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Logo3D;
