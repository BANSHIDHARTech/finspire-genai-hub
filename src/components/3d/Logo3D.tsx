
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';

const Logo3D = ({ animate = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const chatBubbleRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Mesh>(null);
  const rupeeRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!animate) return;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    // Simple animations that won't stress the renderer
    if (chatBubbleRef.current) {
      chatBubbleRef.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime) * 0.1);
    }
    
    if (arrowRef.current) {
      arrowRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
    
    if (rupeeRef.current) {
      rupeeRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      rupeeRef.current.position.y = 0.7 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Chat bubble */}
      <mesh ref={chatBubbleRef} position={[-0.5, 0, 0]}>
        <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#2A3F88" roughness={0.3} metalness={0.2} />
        <mesh position={[-0.4, -0.4, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#2A3F88" roughness={0.3} metalness={0.2} />
        </mesh>
      </mesh>
      
      {/* Rising arrow */}
      <mesh ref={arrowRef} position={[0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.8} />
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.15, 0.3, 8]} />
          <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.8} />
        </mesh>
      </mesh>
      
      {/* Rupee symbol */}
      <group ref={rupeeRef} position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.35, 0.1, 16]} />
          <meshStandardMaterial color="#00C9B1" roughness={0.2} metalness={0.5} />
        </mesh>
        <Text3D
          font="/fonts/Inter_Regular.json"
          position={[-0.15, -0.05, 0.06]}
          size={0.3}
          height={0.05}
        >
          ₹
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
        </Text3D>
      </group>
      
      {/* Simplified particles - only 5 instead of 10 */}
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i * Math.PI * 2 / 5) * 1.2,
            Math.cos(i * Math.PI * 2 / 5) * 1.2,
            0
          ]}
          scale={[0.06, 0.06, 0.06]}
        >
          <sphereGeometry />
          <meshStandardMaterial 
            color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#00C9B1" : "#2A3F88"} 
            emissive={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#00C9B1" : "#2A3F88"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Logo3D;
