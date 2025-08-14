import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const RealisticEarth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 3;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      // Create stars
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 5000;
      const positions = new Float32Array(starsCount * 3);

      for (let i = 0; i < starsCount * 3; i += 3) {
        const radius = 50 + Math.random() * 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const starsMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      // Create Earth with fallback texture
      const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
      
      // Create a simple Earth material with gradient
      const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        shininess: 10
      });

      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      // Try to load Earth texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
        (texture) => {
          earthMaterial.map = texture;
          earthMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Texture loading failed, using fallback:', error);
        }
      );

      // Cloud layer
      const cloudsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
      const cloudsMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });

      const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
      scene.add(clouds);

      // Atmosphere glow
      const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
      });

      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);

      // Animation setup
      const animate = () => {
        requestAnimationFrame(animate);

        earth.rotation.y += 0.002;
        clouds.rotation.y += 0.003;
        stars.rotation.y += 0.0005;

        renderer.render(scene, camera);
      };

      animate();

      // Camera animation
      let startTime = Date.now();
      const animateCamera = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 3000, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        camera.position.z = 4 - (1.5 * easeOutCubic);
        
        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      };
      setTimeout(animateCamera, 500);

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      setIsLoading(false);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error('Error setting up Three.js scene:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Earth Background</h2>
          <p className="text-gray-300">Loading Earth visualization...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #1a1a3a 25%, #2d1b69 50%, #1a1a3a 75%, #0a0a2e 100%)' }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Earth...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealisticEarth;