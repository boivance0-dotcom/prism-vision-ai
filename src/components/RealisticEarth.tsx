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
      camera.position.z = 4;

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
      renderer.toneMappingExposure = 0.8;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mountRef.current.appendChild(renderer.domElement);

      // Professional lighting setup
      const ambientLight = new THREE.AmbientLight(0x080808, 0.05);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(5, 3, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Subtle fill light
      const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.2);
      fillLight.position.set(-5, -3, -5);
      scene.add(fillLight);

      // Create realistic starfield with fewer stars
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 3000; // Much fewer stars
      const positions = new Float32Array(starsCount * 3);
      const colors = new Float32Array(starsCount * 3);
      const sizes = new Float32Array(starsCount);

      for (let i = 0; i < starsCount * 3; i += 3) {
        // Realistic star distribution
        const radius = 30 + Math.random() * 70;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        // Realistic star colors
        const starType = Math.random();
        let color;
        if (starType < 0.8) {
          // White stars (most common)
          const temp = 0.9 + Math.random() * 0.1;
          color = new THREE.Color(temp, temp, temp);
        } else if (starType < 0.95) {
          // Blue-white stars
          color = new THREE.Color(0.8, 0.8, 1.0);
        } else {
          // Yellow stars
          color = new THREE.Color(1.0, 0.9, 0.7);
        }
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        // Realistic star sizes
        const brightness = Math.random();
        sizes[i / 3] = 0.003 + brightness * 0.01;
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Create simple star texture
      const starCanvas = document.createElement('canvas');
      starCanvas.width = 16;
      starCanvas.height = 16;
      const starCtx = starCanvas.getContext('2d')!;
      
      const gradient = starCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      starCtx.fillStyle = gradient;
      starCtx.fillRect(0, 0, 16, 16);
      
      const starTexture = new THREE.CanvasTexture(starCanvas);

      const starsMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        map: starTexture,
        depthWrite: false
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      // Create floating asteroids/rocks
      const asteroidGroup = new THREE.Group();
      const asteroidCount = 15;
      
      for (let i = 0; i < asteroidCount; i++) {
        // Random asteroid size
        const size = 0.02 + Math.random() * 0.08;
        
        // Create irregular asteroid geometry
        const asteroidGeometry = new THREE.DodecahedronGeometry(size, 0);
        // Distort the geometry to make it more irregular
        const positions = asteroidGeometry.attributes.position;
        for (let j = 0; j < positions.count; j++) {
          const x = positions.getX(j);
          const y = positions.getY(j);
          const z = positions.getZ(j);
          
          const distortion = 0.1 + Math.random() * 0.2;
          positions.setXYZ(j, x * distortion, y * distortion, z * distortion);
        }
        
        // Create asteroid material
        const asteroidMaterial = new THREE.MeshPhongMaterial({
          color: new THREE.Color(0.3 + Math.random() * 0.4, 0.3 + Math.random() * 0.4, 0.3 + Math.random() * 0.4),
          shininess: 5,
          specular: 0x111111
        });
        
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        
        // Position asteroids around Earth
        const angle = Math.random() * Math.PI * 2;
        const distance = 2 + Math.random() * 3;
        const height = (Math.random() - 0.5) * 2;
        
        asteroid.position.set(
          Math.cos(angle) * distance,
          height,
          Math.sin(angle) * distance
        );
        
        // Random rotation
        asteroid.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        asteroid.castShadow = true;
        asteroid.receiveShadow = true;
        
        asteroidGroup.add(asteroid);
      }
      
      scene.add(asteroidGroup);

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
        opacity: 0.08,
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
        
        // Asteroid rotation and movement
        asteroidGroup.children.forEach((asteroid, index) => {
          asteroid.rotation.x += 0.002 + Math.random() * 0.003;
          asteroid.rotation.y += 0.003 + Math.random() * 0.002;
          asteroid.rotation.z += 0.001 + Math.random() * 0.002;
          
          // Slow orbital movement around Earth
          const time = Date.now() * 0.0001;
          const originalAngle = index * (Math.PI * 2 / asteroidCount);
          const distance = 2 + Math.sin(index) * 0.5;
          asteroid.position.x = Math.cos(originalAngle + time) * distance;
          asteroid.position.z = Math.sin(originalAngle + time) * distance;
        });

        renderer.render(scene, camera);
      };

      animate();

      // Professional camera animation
      anime.default({
        targets: camera.position,
        z: [4, 3.5],
        duration: 6000,
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