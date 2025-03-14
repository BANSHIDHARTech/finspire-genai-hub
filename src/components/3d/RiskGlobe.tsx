
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface RiskGlobeProps {
  riskLevel?: 'low' | 'medium' | 'high';
  autoRotate?: boolean;
}

const RiskGlobe: React.FC<RiskGlobeProps> = ({ 
  riskLevel = 'medium',
  autoRotate = true 
}) => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Create risk zones on the globe
  const riskZones = [
    { color: '#00C9B1', position: [0, 1, 0], size: 0.3, risk: 'low' },    // Low risk - North pole
    { color: '#FFD700', position: [0, 0, 1], size: 0.3, risk: 'medium' },  // Medium risk - Equator
    { color: '#FF4D4D', position: [0, -1, 0], size: 0.3, risk: 'high' }    // High risk - South pole
  ];
  
  useFrame(({ clock }) => {
    if (autoRotate && globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    
    // Highlight the user's risk zone
    if (globeRef.current) {
      // Find the zone that matches user's risk level
      const userZone = riskZones.find(zone => zone.risk === riskLevel);
      
      if (userZone) {
        // Rotate to focus on that zone
        const targetRotation = Math.atan2(userZone.position[0], userZone.position[2]);
        // Smoothly rotate towards the target
        globeRef.current.rotation.x = THREE.MathUtils.lerp(
          globeRef.current.rotation.x,
          userZone.position[1] * 0.5,
          0.01
        );
      }
    }
  });
  
  return (
    <group>
      <mesh ref={globeRef}>
        {/* Base globe */}
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#2A3F88"
          roughness={0.6}
          metalness={0.1}
          opacity={0.8}
          transparent={true}
        />
        
        {/* Grid lines */}
        <Sphere args={[1.01, 64, 64]}>
          <meshStandardMaterial
            wireframe={true}
            color="#ffffff"
            opacity={0.2}
            transparent={true}
          />
        </Sphere>
        
        {/* Risk zones */}
        {riskZones.map((zone, index) => (
          <mesh
            key={index}
            position={[zone.position[0], zone.position[1], zone.position[2]]}
          >
            <sphereGeometry args={[zone.size, 32, 32]} />
            <meshStandardMaterial
              color={zone.color}
              roughness={0.3}
              metalness={0.5}
              emissive={zone.color}
              emissiveIntensity={zone.risk === riskLevel ? 0.5 : 0.2}
            />
          </mesh>
        ))}
      </mesh>
    </group>
  );
};

export default RiskGlobe;
