import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';

// Earth component with realistic textures
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load realistic Earth textures
  const earthTexture = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
  const specularMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');
  const cloudsTexture = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color('grey')}
          shininess={5}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshPhongMaterial
          color="#4a90e2"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Realistic starfield
function RealisticStars() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

// Main component
const RealisticEarth: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 60 }}
        style={{ background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #1a1a3a 25%, #2d1b69 50%, #1a1a3a 75%, #0a0a2e 100%)' }}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.1} />
        
        {/* Main directional light (sun) */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={1}
          castShadow
        />
        
        {/* Additional fill light */}
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.3}
        />
        
        {/* Realistic starfield */}
        <RealisticStars />
        
        {/* Earth */}
        <Earth />
        
        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
};

export default RealisticEarth;