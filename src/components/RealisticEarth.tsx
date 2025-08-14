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
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 4;

      // Renderer setup with better quality
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
      renderer.toneMappingExposure = 1.2;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mountRef.current.appendChild(renderer.domElement);

      // Enhanced lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(5, 3, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Fill light for better illumination
      const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.6);
      fillLight.position.set(-5, -3, -5);
      scene.add(fillLight);

      // Create enhanced stars with proper star shapes
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 12000;
      const positions = new Float32Array(starsCount * 3);
      const colors = new Float32Array(starsCount * 3);
      const sizes = new Float32Array(starsCount);

      for (let i = 0; i < starsCount * 3; i += 3) {
        const radius = 30 + Math.random() * 70;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        // Create different star colors (white, blue-white, yellow, red)
        const starType = Math.random();
        let color;
        if (starType < 0.6) {
          color = new THREE.Color(0xffffff); // White stars
        } else if (starType < 0.8) {
          color = new THREE.Color(0x4a90e2); // Blue-white stars
        } else if (starType < 0.95) {
          color = new THREE.Color(0xffd700); // Yellow stars
        } else {
          color = new THREE.Color(0xff6b6b); // Red stars
        }
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        // Different star sizes for depth
        sizes[i / 3] = 0.02 + Math.random() * 0.08;
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Create star texture for proper star shapes
      const starCanvas = document.createElement('canvas');
      starCanvas.width = 32;
      starCanvas.height = 32;
      const starCtx = starCanvas.getContext('2d')!;
      
      // Create radial gradient for star
      const gradient = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      starCtx.fillStyle = gradient;
      starCtx.fillRect(0, 0, 32, 32);
      
      const starTexture = new THREE.CanvasTexture(starCanvas);

      const starsMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        map: starTexture
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      // Create Earth with enhanced materials and textures
      const earthGeometry = new THREE.SphereGeometry(1, 256, 256);
      
      // Enhanced Earth material with better colors
      const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        shininess: 30,
        specular: 0x333333
      });

      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.castShadow = true;
      earth.receiveShadow = true;
      scene.add(earth);

      // Load high-quality Earth textures
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
          earthMaterial.bumpScale = 0.05;
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

      // Enhanced cloud layer with texture
      const cloudsGeometry = new THREE.SphereGeometry(1.02, 256, 256);
      const cloudsMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
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

      // Enhanced atmosphere glow with multiple layers
      const atmosphereGeometry1 = new THREE.SphereGeometry(1.1, 128, 128);
      const atmosphereMaterial1 = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const atmosphere1 = new THREE.Mesh(atmosphereGeometry1, atmosphereMaterial1);
      scene.add(atmosphere1);

      const atmosphereGeometry2 = new THREE.SphereGeometry(1.2, 128, 128);
      const atmosphereMaterial2 = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
      });
      const atmosphere2 = new THREE.Mesh(atmosphereGeometry2, atmosphereMaterial2);
      scene.add(atmosphere2);

      // Add orbital ring with better material
      const ringGeometry = new THREE.RingGeometry(1.3, 1.4, 128);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      // Add second orbital ring for more depth
      const ring2Geometry = new THREE.RingGeometry(1.5, 1.6, 128);
      const ring2Material = new THREE.MeshBasicMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
      });
      const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
      ring2.rotation.x = Math.PI / 2;
      scene.add(ring2);

      // Animation setup with enhanced effects
      const animate = () => {
        requestAnimationFrame(animate);

        // Earth rotation
        earth.rotation.y += 0.002;
        
        // Cloud rotation (faster)
        clouds.rotation.y += 0.003;
        
        // Star field rotation
        stars.rotation.y += 0.0003;

        renderer.render(scene, camera);
      };

      animate();

      // Enhanced camera animation with anime.js
      anime.default({
        targets: camera.position,
        z: [4, 2.5],
        x: [0, 0.2, -0.2, 0],
        y: [0, 0.1, -0.1, 0],
        duration: 4000,
        easing: 'easeOutQuart',
        delay: 500
      });

      // Animate orbital rings
      anime.default({
        targets: ring.rotation,
        z: [0, Math.PI * 2],
        duration: 20000,
        easing: 'linear',
        loop: true
      });

      anime.default({
        targets: ring2.rotation,
        z: [0, -Math.PI * 2],
        duration: 30000,
        easing: 'linear',
        loop: true
      });

      // Animate atmosphere pulsing
      anime.default({
        targets: [atmosphere1.material, atmosphere2.material],
        opacity: [
          { value: [0.15, 0.05], duration: 2000 },
          { value: [0.05, 0.15], duration: 2000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
      });

      // Animate star twinkling
      anime.default({
        targets: stars.material,
        opacity: [0.9, 1.2, 0.9],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
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
      style={{ 
        background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #1a1a3a 25%, #2d1b69 50%, #1a1a3a 75%, #0a0a2e 100%)',
        overflow: 'hidden'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-white text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="text-lg font-medium">Loading Earth...</p>
            <p className="text-sm text-gray-400 mt-2">Preparing stunning visualization</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealisticEarth;