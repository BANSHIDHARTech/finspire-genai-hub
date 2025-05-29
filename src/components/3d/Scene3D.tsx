
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Logo3D from './Logo3D';
import Mascot3D from './Mascot3D';
import { ErrorBoundary } from 'react-error-boundary';

interface Scene3DProps {
  showLogo?: boolean;
  showMascot?: boolean;
  cameraPosition?: [number, number, number];
  orbitControls?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Simple fallback component when 3D rendering fails
const Scene3DFallback = ({ className }: { className?: string }) => (
  <div className={`${className} w-full h-full bg-slate-100 flex items-center justify-center rounded-lg`}>
    <div className="text-slate-500 text-sm">3D content unavailable</div>
  </div>
);

const Scene3D: React.FC<Scene3DProps> = ({
  showLogo = true,
  showMascot = true,
  cameraPosition = [0, 0, 5],
  orbitControls = false,
  className = "",
  children
}) => {
  const [is3DSupported, setIs3DSupported] = useState(true);
  const [hasRendered, setHasRendered] = useState(false);

  // Check if WebGL is supported on component mount
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIs3DSupported(!!gl);
    } catch (e) {
      console.error("WebGL detection failed:", e);
      setIs3DSupported(false);
    }
  }, []);

  // Function to handle WebGL context loss
  const handleCreated = (state: any) => {
    if (state.gl) {
      const handleContextLost = (event: any) => {
        event.preventDefault();
        console.warn('WebGL context lost. Disabling 3D rendering.');
        setIs3DSupported(false);
      };
      
      const canvas = state.gl.domElement;
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      
      // Return a cleanup function
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
      };
    }
  };

  const handleError = (error: Error | React.SyntheticEvent) => {
    // Check if the error is a React event or an actual Error object
    if (error instanceof Error) {
      console.error("Error in 3D scene:", error);
      setIs3DSupported(false);
    } else {
      // It's a React event, handle accordingly
      console.error("React error event in 3D scene", error);
      setIs3DSupported(false);
    }
  };

  if (!is3DSupported) {
    return <Scene3DFallback className={className} />;
  }

  return (
    <div className={`${className} w-full h-full`}>
      <ErrorBoundary 
        fallback={<Scene3DFallback className={className} />}
        onError={handleError}
      >
        <Canvas 
          shadows={false} 
          gl={{ 
            powerPreference: 'default', 
            antialias: false,
            alpha: true,
            stencil: false,
            depth: true,
            preserveDrawingBuffer: true // Help with context stability
          }}
          dpr={[0.6, 1]} // Slightly increased from 0.5 for better balance
          frameloop="demand" // Only render when needed
          style={{ background: '#f8fafc' }} 
          onCreated={handleCreated}
        >
          <color attach="background" args={['#f8fafc']} />
          <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            
            {showLogo && (
              <Logo3D />
            )}
            
            {showMascot && (
              <Mascot3D position={[2, 0, 0]} showSpeechBubble={hasRendered} />
            )}
            
            {children}
            
            {orbitControls && <OrbitControls enableZoom={false} enablePan={false} />}
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Scene3D;
