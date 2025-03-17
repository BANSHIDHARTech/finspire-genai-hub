
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Mascot3DProps {
  position?: [number, number, number];
  showSpeechBubble?: boolean;
  speechText?: string;
}

const Mascot3D: React.FC<Mascot3DProps> = ({ 
  position = [0, 0, 0], 
  showSpeechBubble = false,
  speechText = "Hi, I'm Sipre!"
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  
  // Minimize state changes
  const [isWinking, setIsWinking] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  
  // Simplified effect - delay initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlying(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Minimal hover animation
      if (isFlying) {
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
      }
      
      // Very slight rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    }
    
    // Minimal wing animation
    if (leftWingRef.current && rightWingRef.current && isFlying) {
      const wingFlapSpeed = 2; // Reduced from 5
      leftWingRef.current.rotation.z = Math.sin(state.clock.elapsedTime * wingFlapSpeed) * 0.05 - 0.3;
      rightWingRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * wingFlapSpeed) * 0.05 + 0.3;
    }
    
    // Simple eye animation
    if (rightEyeRef.current && isWinking) {
      rightEyeRef.current.scale.y = 0.1;
    } else if (rightEyeRef.current) {
      rightEyeRef.current.scale.y = 1;
    }
  });
  
  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Body - simplified geometry */}
      <mesh ref={bodyRef}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#2A3F88" roughness={0.7} />
      </mesh>
      
      {/* Eyes - simplified */}
      <group position={[0, 0.1, 0.4]}>
        {/* Left Eye */}
        <mesh ref={leftEyeRef} position={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="white" />
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>
        
        {/* Right Eye */}
        <mesh ref={rightEyeRef} position={[0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="white" />
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>
      </group>
      
      {/* Beak - simplified */}
      <mesh position={[0, -0.1, 0.4]} rotation={[Math.PI * 0.1, 0, 0]}>
        <coneGeometry args={[0.12, 0.2, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Wings - simplified */}
      <mesh ref={leftWingRef} position={[-0.4, 0, 0]} rotation={[0, -Math.PI * 0.3, -0.3]}>
        <boxGeometry args={[0.4, 0.5, 0.1]} />
        <meshStandardMaterial color="#1E2F6D" roughness={0.7} />
      </mesh>
      
      <mesh ref={rightWingRef} position={[0.4, 0, 0]} rotation={[0, Math.PI * 0.3, 0.3]}>
        <boxGeometry args={[0.4, 0.5, 0.1]} />
        <meshStandardMaterial color="#1E2F6D" roughness={0.7} />
      </mesh>
      
      {/* Feet - simplified */}
      <mesh position={[-0.2, -0.5, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0.2, -0.5, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Speech Bubble - simplified and conditional */}
      {showSpeechBubble && (
        <group position={[0.8, 0.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial color="white" roughness={0.5} />
          </mesh>
          <mesh position={[-0.2, -0.4, 0]}>
            <sphereGeometry args={[0.15, 6, 6]} />
            <meshStandardMaterial color="white" roughness={0.5} />
          </mesh>
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.1}
            maxWidth={0.7}
            textAlign="center"
            color="#2A3F88"
          >
            {speechText}
          </Text>
        </group>
      )}
    </group>
  );
};

export default Mascot3D;
