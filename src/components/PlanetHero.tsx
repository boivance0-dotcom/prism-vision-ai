import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export type PlanetHeroProps = {
  className?: string;
  textureUrl?: string;
  line1Text?: string;
  brandText?: string;
  autoRedirect?: boolean;
  redirectTo?: string;
  redirectDelayMs?: number;
  staySpinning?: boolean;
  onAfterSequence?: () => void;
};

const DEFAULT_TEXTURE_4K = 'https://www.solarsystemscope.com/textures/download/4k_earth_daymap.jpg';

const PlanetHero: React.FC<PlanetHeroProps> = ({
  className,
  textureUrl = DEFAULT_TEXTURE_4K,
  line1Text = 'Every ecosystem tells a story — we just have to listen.',
  brandText = 'BioVance',
  autoRedirect = false,
  redirectTo = '/ai/forest',
  redirectDelayMs = 3000,
  staySpinning = true,
  onAfterSequence,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    let cleanupFn: (() => void) | null = null;
    let disposed = false;

    // Lazy-load Three.js and set up the scene
    (async () => {
      const THREE = await import('three');

      if (disposed) return;

      const container = containerRef.current;
      if (!container) return;

      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 3.2);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(container.clientWidth, container.clientHeight, false);
      container.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
      dirLight.position.set(4, 3, 5);
      scene.add(dirLight);

      const hoverLight = new THREE.PointLight(0x86c232, 0.0, 6);
      hoverLight.position.set(0, 0, 2.2);
      scene.add(hoverLight);

      // Planet
      const radius = 1.0;
      const sphereGeo = new THREE.SphereGeometry(radius, 96, 96);

      const textureLoader = new THREE.TextureLoader();
      let colorMap: THREE.Texture | null = null;
      try {
        colorMap = await new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            textureUrl,
            (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace;
              tex.anisotropy = Math.min(8, (renderer.capabilities as any).getMaxAnisotropy?.() || 4);
              resolve(tex);
            },
            undefined,
            (err) => reject(err)
          );
        });
      } catch (err) {
        // Fallback: no texture — use a subtle colored material so we never blank out
        colorMap = null;
      }

      const materialOptions: any = colorMap
        ? { map: colorMap, roughness: 0.9, metalness: 0.0 }
        : { color: 0x1a3b5d, roughness: 0.85, metalness: 0.05 }; // fallback tint

      const sphereMat = new THREE.MeshStandardMaterial(materialOptions);
      const planet = new THREE.Mesh(sphereGeo, sphereMat);

      const planetGroup = new THREE.Group();
      planetGroup.add(planet);
      scene.add(planetGroup);

      // Add subtle additive glow sprite around the planet
      const glowSize = 256;
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = glowCanvas.height = glowSize;
      const gctx = glowCanvas.getContext('2d');
      if (gctx) {
        const gradient = gctx.createRadialGradient(glowSize / 2, glowSize / 2, 0, glowSize / 2, glowSize / 2, glowSize / 2);
        gradient.addColorStop(0, 'rgba(134,194,50,0.22)');
        gradient.addColorStop(1, 'rgba(134,194,50,0.00)');
        gctx.fillStyle = gradient;
        gctx.fillRect(0, 0, glowSize, glowSize);
      }
      const glowTexture = new THREE.CanvasTexture(glowCanvas);
      glowTexture.colorSpace = THREE.SRGBColorSpace;
      const glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const glowSprite = new THREE.Sprite(glowMaterial);
      glowSprite.scale.set(radius * 3.0, radius * 3.0, 1);
      planetGroup.add(glowSprite);

      // Resize handler
      const handleResize = () => {
        if (!container) return;
        const { clientWidth: w, clientHeight: h } = container;
        camera.aspect = Math.max(0.0001, w / Math.max(1, h));
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        const base = Math.min(w, h);
        const scale = Math.min(1.25, Math.max(0.8, base / 900));
        planetGroup.scale.set(scale, scale, scale);
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      // Interaction state
      let targetRotationSpeed = 0.12; // radians/sec
      let rotationSpeed = 0.10;
      let z0 = camera.position.z;
      let targetZ = z0;
      let lastT = performance.now();
      let raf = 0;
      const clock = new THREE.Clock();
      let hoverProximity = 0;
      let paused = false;

      const onPointerMove = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / Math.max(1, rect.width);
        const dy = (e.clientY - cy) / Math.max(1, rect.height);
        const d = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - d * 4); // within ~1/4 canvas radius
        hoverProximity = Math.max(0, Math.min(1, prox));
      };

      const onClick = () => {
        setClicked(true);
        // Boost rotation and zoom out ~10%
        targetRotationSpeed = 0.16;
        targetZ = z0 * 1.1;
        // Start text sequence
        setTimeout(() => setShowLine1(true), 220);
        setTimeout(() => setShowBrand(true), 1500);
        if (!staySpinning) {
          setTimeout(() => {
            paused = true;
          }, 1700);
        }
      };

      renderer.domElement.addEventListener('pointermove', onPointerMove);
      renderer.domElement.addEventListener('click', onClick);

      const animate = () => {
        raf = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min(0.05, (now - lastT) / 1000);
        lastT = now;

        // If paused, ease rotationSpeed to 0
        if (paused) {
          targetRotationSpeed = 0.0;
        }

        // Smoothly approach targets
        rotationSpeed += (targetRotationSpeed - rotationSpeed) * 0.08;
        camera.position.z += (targetZ - camera.position.z) * 0.06;

        // Continuous planet rotation
        planet.rotation.y += rotationSpeed * dt;

        // Hover glow + light pulse
        const pulse = 0.6 + 0.4 * Math.sin(clock.getElapsedTime() * 4);
        const glow = hoverProximity * pulse;
        glowMaterial.opacity += (glow - glowMaterial.opacity) * 0.2;
        hoverLight.intensity += ((0.5 + 1.2 * glow) - hoverLight.intensity) * 0.15;

        renderer.render(scene, camera);
      };

      animate();

      cleanupFn = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', handleResize);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        renderer.domElement.removeEventListener('click', onClick);

        // Dispose
        sphereGeo.dispose();
        sphereMat.dispose();
        glowTexture.dispose();
        glowMaterial.dispose();
        renderer.dispose();
        if (container && renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      if (cleanupFn) cleanupFn();
    };
  }, [textureUrl, staySpinning]);

  // Trigger redirect and/or inform parent when sequence is done
  useEffect(() => {
    if (!clicked || !showLine1 || !showBrand) return;

    // Notify parent once when sequence completes
    onAfterSequence?.();

    if (!autoRedirect) return;
    const t = setTimeout(() => {
      navigate(redirectTo);
    }, redirectDelayMs);
    return () => clearTimeout(t);
  }, [clicked, showLine1, showBrand, autoRedirect, redirectTo, redirectDelayMs, navigate, onAfterSequence]);

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden bg-[radial-gradient(1200px_600px_at_50%_30%,rgba(30,48,80,0.55),transparent_70%)] from-[#07090f] via-[#060b12] to-[#05080d] ${className || ''}`}
      style={{ backgroundImage: 'linear-gradient(180deg, #05070B 0%, #0B1020 60%, #0B0F14 100%)' }}
    >
      {/* 3D Canvas container */}
      <div ref={containerRef} className="absolute inset-0" aria-label="Interactive 3D planet" />

      {/* Overlay content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {clicked && (
            <motion.div
              key="texts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
              className="text-center px-6"
            >
              <AnimatePresence>
                {showLine1 && (
                  <motion.p
                    key="line1"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.9, 0.3, 1] }}
                    className="text-white/95 text-base sm:text-lg md:text-xl font-medium tracking-wide bg-black/40 border border-white/10 backdrop-blur-sm rounded-lg inline-block px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
                    style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
                  >
                    {line1Text}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showBrand && (
                  <motion.h1
                    key="brand"
                    initial={{ opacity: 0, letterSpacing: '0.3em', y: 10 }}
                    animate={{ opacity: 1, letterSpacing: '0.06em', y: 0 }}
                    transition={{ duration: 1.0, ease: [0.2, 0.9, 0.3, 1] }}
                    className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
                    style={{ textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
                  >
                    {brandText}
                  </motion.h1>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Help text overlay before click */}
      {!clicked && (
        <div className="absolute inset-x-0 bottom-8 flex items-center justify-center">
          <div className="pointer-events-none text-white/80 text-xs tracking-widest uppercase bg-black/30 border border-white/10 backdrop-blur-sm rounded-md px-3 py-1.5">
            Click the planet
          </div>
        </div>
      )}
    </section>
  );
};

export default PlanetHero;