import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import * as anime from 'animejs';

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
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 3.5;

      // Renderer setup with professional quality
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mountRef.current.appendChild(renderer.domElement);

      // Professional lighting setup
      const ambientLight = new THREE.AmbientLight(0x101010, 0.1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(5, 3, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Subtle fill light
      const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
      fillLight.position.set(-5, -3, -5);
      scene.add(fillLight);

      // Create realistic starfield
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 20000;
      const positions = new Float32Array(starsCount * 3);
      const colors = new Float32Array(starsCount * 3);
      const sizes = new Float32Array(starsCount);

      for (let i = 0; i < starsCount * 3; i += 3) {
        // Realistic star distribution
        const radius = 20 + Math.random() * 80;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        // Realistic star colors
        const starType = Math.random();
        let color;
        if (starType < 0.75) {
          // White stars (most common)
          const temp = 0.95 + Math.random() * 0.05;
          color = new THREE.Color(temp, temp, temp);
        } else if (starType < 0.9) {
          // Blue-white stars
          color = new THREE.Color(0.9, 0.9, 1.0);
        } else if (starType < 0.98) {
          // Yellow stars
          color = new THREE.Color(1.0, 0.95, 0.8);
        } else {
          // Red stars
          color = new THREE.Color(1.0, 0.8, 0.8);
        }
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        // Realistic star sizes
        const brightness = Math.random();
        sizes[i / 3] = 0.005 + brightness * 0.02;
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Create simple, realistic star texture
      const starCanvas = document.createElement('canvas');
      starCanvas.width = 32;
      starCanvas.height = 32;
      const starCtx = starCanvas.getContext('2d')!;
      
      // Simple, realistic star
      const gradient = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      starCtx.fillStyle = gradient;
      starCtx.fillRect(0, 0, 32, 32);
      
      const starTexture = new THREE.CanvasTexture(starCanvas);

      const starsMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        map: starTexture,
        depthWrite: false
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      // Create Earth with professional materials
      const earthGeometry = new THREE.SphereGeometry(1, 256, 256);
      
      const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        shininess: 20,
        specular: 0x222222
      });

      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.castShadow = true;
      earth.receiveShadow = true;
      scene.add(earth);

      // Load professional Earth textures
      const textureLoader = new THREE.TextureLoader();
      
      // Earth surface texture
      textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
        (texture) => {
          earthMaterial.map = texture;
          earthMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Earth texture loading failed, using fallback:', error);
        }
      );

      // Earth bump map for terrain
      textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
        (bumpMap) => {
          earthMaterial.bumpMap = bumpMap;
          earthMaterial.bumpScale = 0.03;
          earthMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Bump map loading failed:', error);
        }
      );

      // Earth specular map
      textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
        (specularMap) => {
          earthMaterial.specularMap = specularMap;
          earthMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Specular map loading failed:', error);
        }
      );

      // Professional cloud layer
      const cloudsGeometry = new THREE.SphereGeometry(1.01, 256, 256);
      const cloudsMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });

      const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
      scene.add(clouds);

      // Load cloud texture
      textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
        (cloudsTexture) => {
          cloudsMaterial.map = cloudsTexture;
          cloudsMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Cloud texture loading failed:', error);
        }
      );

      // Subtle atmosphere
      const atmosphereGeometry = new THREE.SphereGeometry(1.05, 128, 128);
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

        // Earth rotation
        earth.rotation.y += 0.001;
        
        // Cloud rotation
        clouds.rotation.y += 0.0015;
        
        // Star field rotation
        stars.rotation.y += 0.0001;

        renderer.render(scene, camera);
      };

      animate();

      // Professional camera animation
      anime.default({
        targets: camera.position,
        z: [4, 3.2],
        duration: 5000,
        easing: 'easeOutQuart',
        delay: 1000
      });

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
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-black">
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
      style={{ 
        background: '#000000',
        overflow: 'hidden'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-300">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealisticEarth;