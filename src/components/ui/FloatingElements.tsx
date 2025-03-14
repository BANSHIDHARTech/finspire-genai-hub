
import React, { useEffect, useState } from 'react';

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    // Create floating elements on component mount
    const shapes = [];
    const shapeCount = window.innerWidth < 768 ? 8 : 15;
    
    for (let i = 0; i < shapeCount; i++) {
      const size = Math.random() * 60 + 20; // 20-80px
      const x = Math.random() * 100; // 0-100%
      const y = Math.random() * 100; // 0-100%
      const rotationSpeed = (Math.random() * 10 + 5) * (Math.random() > 0.5 ? 1 : -1);
      const floatDuration = Math.random() * 10 + 10; // 10-20s
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.15 + 0.05; // 0.05-0.2
      const shape = Math.floor(Math.random() * 4); // 0-3 for different shapes
      
      // Brand colors
      const colors = [
        '#2a3f88', // Navy
        '#ffd700', // Gold
        '#00c9b1', // Teal
        '#eaecf3', // Navy 50
        '#fff8c2', // Gold 50
        '#e4fcf8', // Teal 50
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      let shapeElement;
      
      if (shape === 0) {
        // Square
        shapeElement = (
          <div 
            key={i}
            className="absolute rounded-lg"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              opacity: opacity,
              transform: 'rotate(0deg)',
              animation: `
                float ${floatDuration}s ease-in-out infinite alternate ${delay}s,
                rotate ${Math.abs(rotationSpeed)}s linear infinite
              `,
            }}
          />
        );
      } else if (shape === 1) {
        // Circle
        shapeElement = (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              opacity: opacity,
              animation: `float ${floatDuration}s ease-in-out infinite alternate ${delay}s`,
            }}
          />
        );
      } else if (shape === 2) {
        // Triangle (using clip-path)
        shapeElement = (
          <div 
            key={i}
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              opacity: opacity,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transform: 'rotate(0deg)',
              animation: `
                float ${floatDuration}s ease-in-out infinite alternate ${delay}s,
                rotate ${Math.abs(rotationSpeed)}s linear infinite
              `,
            }}
          />
        );
      } else {
        // Rupee Symbol (using a custom shape)
        shapeElement = (
          <div 
            key={i}
            className="absolute flex items-center justify-center text-2xl font-bold"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              color: color,
              opacity: opacity,
              transform: 'rotate(0deg)',
              animation: `
                float ${floatDuration}s ease-in-out infinite alternate ${delay}s,
                rotate ${Math.abs(rotationSpeed)}s linear infinite
              `,
            }}
          >
            ₹
          </div>
        );
      }
      
      shapes.push(shapeElement);
    }
    
    setElements(shapes);
  }, []);
  
  return (
    <div className="w-full h-full relative">
      {elements}
    </div>
  );
};

export default FloatingElements;
