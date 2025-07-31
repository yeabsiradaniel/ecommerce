import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus, Cylinder } from '@react-three/drei';

const JebenaModel = () => {
  return (
    <>
      {/* Base */}
      <Cylinder args={[1, 1.2, 0.5, 32]} position={[0, -1.25, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      {/* Neck */}
      <Cylinder args={[0.5, 0.3, 1.5, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Cylinder>
      {/* Spout */}
      <Torus args={[0.8, 0.15, 16, 100]} rotation={[0, 0, 1.2]} position={[-0.5, 0.8, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Torus>
       {/* Handle */}
       <Torus args={[0.8, 0.15, 16, 100]} rotation={[0, 1.5, 0]} position={[1.2, 0.2, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Torus>
    </>
  );
};

const JebenaViewer = () => {
  return (
    <div className="h-96 w-full bg-cream rounded-lg shadow-inner cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <JebenaModel />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

export default JebenaViewer;
