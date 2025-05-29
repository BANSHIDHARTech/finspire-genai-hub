
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Logo3D = () => {
  const logoRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={logoRef} position={[0, 0, 0]}>
      {/* Main navy sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial color="#2a3f88" />
      </mesh>
      
      {/* Gold ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      
      {/* Teal accent ring */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <torusGeometry args={[1.1, 0.05, 16, 100]} />
        <meshStandardMaterial color="#00c9b1" />
      </mesh>
      
      {/* Chat bubble icon */}
      <mesh position={[-0.2, 0.2, 0.6]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Trending up arrow */}
      <mesh position={[0.3, 0.1, 0.5]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      
      {/* Arrow head */}
      <mesh position={[0.4, 0.2, 0.5]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.08, 0.15, 3]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      
      {/* Rupee symbol */}
      <group ref={textRef}>
        <Text
          font="/fonts/Inter_Regular.json"
          position={[-0.15, -0.05, 0.06]}
          fontSize={0.3}
        >
          ₹
          <meshStandardMaterial color="#00c9b1" />
        </Text>
      </group>
      
      {/* Company name */}
      <Text
        font="/fonts/Inter_Regular.json"
        position={[0, -1.2, 0]}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
      >
        Finspire
        <meshStandardMaterial color="#2a3f88" />
      </Text>
      
      {/* Ambient light for the logo */}
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={1} />
    </group>
  );
};

export default Logo3D;
