
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, BakeShadows, PerspectiveCamera } from '@react-three/drei';
import Logo3D from './Logo3D';
import Mascot3D from './Mascot3D';

interface Scene3DProps {
  showLogo?: boolean;
  showMascot?: boolean;
  cameraPosition?: [number, number, number];
  orbitControls?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Scene3D: React.FC<Scene3DProps> = ({
  showLogo = true,
  showMascot = true,
  cameraPosition = [0, 0, 5],
  orbitControls = false,
  className = "",
  children
}) => {
  return (
    <div className={`${className} w-full h-full`}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          
          {showLogo && (
            <Logo3D />
          )}
          
          {showMascot && (
            <Mascot3D position={[2, 0, 0]} showSpeechBubble={true} />
          )}
          
          {children}
          
          <Environment preset="city" />
          <BakeShadows />
        </Suspense>
        
        {orbitControls && <OrbitControls />}
      </Canvas>
    </div>
  );
};

export default Scene3D;
