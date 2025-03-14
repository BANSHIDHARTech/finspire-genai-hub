
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
  const coinRef = useRef<THREE.Mesh>(null);
  
  const [hasCoin, setHasCoin] = useState(true);
  const [isWinking, setIsWinking] = useState(false);
  const [isFlying, setIsFlying] = useState(true);
  
  // Animation for dropping the coin
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasCoin(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation for winking
  useEffect(() => {
    const winkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 300);
    }, 5000);
    
    return () => clearInterval(winkInterval);
  }, []);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Hover animation
      if (isFlying) {
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
      
      // Slight rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    // Wing flapping animation
    if (leftWingRef.current && rightWingRef.current) {
      const wingFlapSpeed = isFlying ? 10 : 2;
      leftWingRef.current.rotation.z = Math.sin(state.clock.elapsedTime * wingFlapSpeed) * 0.2 - 0.3;
      rightWingRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * wingFlapSpeed) * 0.2 + 0.3;
    }
    
    // Winking animation
    if (rightEyeRef.current) {
      if (isWinking) {
        rightEyeRef.current.scale.y = 0.1;
      } else {
        rightEyeRef.current.scale.y = 1;
      }
    }
    
    // Coin dropping animation
    if (coinRef.current) {
      if (!hasCoin) {
        coinRef.current.position.y -= delta * 2;
        coinRef.current.rotation.y += delta * 5;
        
        // Stop flying once the coin is dropped
        if (coinRef.current.position.y < -3) {
          setIsFlying(false);
        }
      } else {
        coinRef.current.rotation.y += delta * 2;
      }
    }
  });
  
  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Body */}
      <mesh ref={bodyRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#2A3F88" roughness={0.6} />
      </mesh>
      
      {/* Eyes */}
      <group position={[0, 0.1, 0.4]}>
        {/* Left Eye */}
        <mesh ref={leftEyeRef} position={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="white" />
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.06, 32, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>
        
        {/* Right Eye */}
        <mesh ref={rightEyeRef} position={[0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="white" />
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.06, 32, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>
      </group>
      
      {/* Beak */}
      <mesh position={[0, -0.1, 0.4]} rotation={[Math.PI * 0.1, 0, 0]}>
        <coneGeometry args={[0.12, 0.2, 32]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.3} />
      </mesh>
      
      {/* Left Wing */}
      <mesh ref={leftWingRef} position={[-0.4, 0, 0]} rotation={[0, -Math.PI * 0.3, -0.3]}>
        <boxGeometry args={[0.4, 0.5, 0.1]} />
        <meshStandardMaterial color="#1E2F6D" roughness={0.6} />
      </mesh>
      
      {/* Right Wing */}
      <mesh ref={rightWingRef} position={[0.4, 0, 0]} rotation={[0, Math.PI * 0.3, 0.3]}>
        <boxGeometry args={[0.4, 0.5, 0.1]} />
        <meshStandardMaterial color="#1E2F6D" roughness={0.6} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.2, -0.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0.2, -0.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.3} />
      </mesh>
      
      {/* Golden Coin */}
      {hasCoin && (
        <mesh ref={coinRef} position={[0, -0.6, 0.4]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.8} />
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.15}
            color="#2A3F88"
          >
            ₹
          </Text>
        </mesh>
      )}
      
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <group position={[0.8, 0.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial color="white" roughness={0.3} />
          </mesh>
          <mesh position={[-0.2, -0.4, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="white" roughness={0.3} />
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
