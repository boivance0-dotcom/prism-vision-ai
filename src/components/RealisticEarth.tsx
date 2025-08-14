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

      // Enhanced lighting setup for space feel
      const ambientLight = new THREE.AmbientLight(0x202020, 0.2);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
      directionalLight.position.set(5, 3, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Fill light for better illumination
      const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.8);
      fillLight.position.set(-5, -3, -5);
      scene.add(fillLight);

      // Create realistic stars with proper distribution
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 15000;
      const positions = new Float32Array(starsCount * 3);
      const colors = new Float32Array(starsCount * 3);
      const sizes = new Float32Array(starsCount);

      for (let i = 0; i < starsCount * 3; i += 3) {
        // Create more realistic star distribution
        const radius = 25 + Math.random() * 75;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        // Create realistic star colors based on temperature
        const starType = Math.random();
        let color;
        if (starType < 0.7) {
          // White/blue-white stars (most common)
          const temp = 0.9 + Math.random() * 0.1;
          color = new THREE.Color(temp, temp, 1.0);
        } else if (starType < 0.85) {
          // Yellow stars
          color = new THREE.Color(1.0, 0.9 + Math.random() * 0.1, 0.7 + Math.random() * 0.3);
        } else if (starType < 0.95) {
          // Orange stars
          color = new THREE.Color(1.0, 0.6 + Math.random() * 0.3, 0.3 + Math.random() * 0.3);
        } else {
          // Red stars
          color = new THREE.Color(1.0, 0.3 + Math.random() * 0.3, 0.3 + Math.random() * 0.3);
        }
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        // Realistic star sizes based on brightness
        const brightness = Math.random();
        sizes[i / 3] = 0.01 + brightness * 0.15;
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Create realistic star texture with proper star shape
      const starCanvas = document.createElement('canvas');
      starCanvas.width = 64;
      starCanvas.height = 64;
      const starCtx = starCanvas.getContext('2d')!;
      
      // Create realistic star with cross pattern
      starCtx.fillStyle = 'rgba(0, 0, 0, 0)';
      starCtx.fillRect(0, 0, 64, 64);
      
      // Main star glow
      const gradient = starCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      starCtx.fillStyle = gradient;
      starCtx.fillRect(0, 0, 64, 64);
      
      // Add star spikes for realism
      starCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      starCtx.lineWidth = 1;
      
      // Vertical spike
      starCtx.beginPath();
      starCtx.moveTo(32, 8);
      starCtx.lineTo(32, 56);
      starCtx.stroke();
      
      // Horizontal spike
      starCtx.beginPath();
      starCtx.moveTo(8, 32);
      starCtx.lineTo(56, 32);
      starCtx.stroke();
      
      // Diagonal spikes
      starCtx.beginPath();
      starCtx.moveTo(12, 12);
      starCtx.lineTo(52, 52);
      starCtx.stroke();
      
      starCtx.beginPath();
      starCtx.moveTo(52, 12);
      starCtx.lineTo(12, 52);
      starCtx.stroke();
      
      const starTexture = new THREE.CanvasTexture(starCanvas);

      const starsMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        map: starTexture,
        depthWrite: false
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
        opacity: 0.25,
        side: THREE.BackSide
      });
      const atmosphere1 = new THREE.Mesh(atmosphereGeometry1, atmosphereMaterial1);
      scene.add(atmosphere1);

      const atmosphereGeometry2 = new THREE.SphereGeometry(1.2, 128, 128);
      const atmosphereMaterial2 = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.1,
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
          { value: [0.25, 0.1], duration: 2000 },
          { value: [0.1, 0.25], duration: 2000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
      });

      // Animate star twinkling
      anime.default({
        targets: stars.material,
        opacity: [1.0, 1.5, 1.0],
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