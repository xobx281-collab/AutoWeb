'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Sparkles } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

function Wheel({ x, z }: { x: number; z: number }) {
  const tire = useRef<THREE.Group>(null);
  return (
    <group ref={tire} position={[x, 0.38, z]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.22, 48]} />
        <meshStandardMaterial color="#090c0f" metalness={0.12} roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.116, 0]}>
        <cylinderGeometry args={[0.235, 0.235, 0.018, 12]} />
        <meshStandardMaterial color="#89939b" metalness={0.92} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.129, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.022, 16]} />
        <meshStandardMaterial color="#151a1f" metalness={0.8} roughness={0.28} />
      </mesh>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 5) * 0.15, 0.13, Math.sin(i * Math.PI / 5) * 0.15]} rotation={[0, 0, -i * Math.PI / 5]}>
          <boxGeometry args={[0.025, 0.015, 0.24]} />
          <meshStandardMaterial color="#cbd3d9" metalness={0.85} roughness={0.22} />
        </mesh>
      ))}
    </group>
  );
}

function Bodywork() {
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-2.25, 0.32);
  bodyShape.quadraticCurveTo(-2.2, 0.58, -1.72, 0.66);
  bodyShape.lineTo(-1.2, 0.82);
  bodyShape.quadraticCurveTo(-0.7, 0.96, 0.1, 0.88);
  bodyShape.lineTo(1.38, 0.69);
  bodyShape.quadraticCurveTo(1.9, 0.62, 2.15, 0.42);
  bodyShape.lineTo(2.2, 0.28);
  bodyShape.quadraticCurveTo(1.9, 0.2, 1.62, 0.22);
  bodyShape.lineTo(-1.7, 0.22);
  bodyShape.quadraticCurveTo(-2.05, 0.22, -2.25, 0.32);
  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, { depth: 0.72, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.08, bevelThickness: 0.07, curveSegments: 16 });
  bodyGeo.translate(0, 0, -0.36);

  const cabinShape = new THREE.Shape();
  cabinShape.moveTo(-1.2, 0.84);
  cabinShape.lineTo(-0.72, 1.35);
  cabinShape.quadraticCurveTo(-0.6, 1.43, -0.42, 1.43);
  cabinShape.lineTo(0.47, 1.35);
  cabinShape.quadraticCurveTo(0.68, 1.32, 0.86, 1.12);
  cabinShape.lineTo(1.12, 0.78);
  cabinShape.closePath();
  const cabinGeo = new THREE.ExtrudeGeometry(cabinShape, { depth: 0.51, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.035, bevelThickness: 0.035, curveSegments: 16 });
  cabinGeo.translate(0, 0, -0.255);

  return (
    <group>
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshPhysicalMaterial color="#aab7c0" metalness={0.88} roughness={0.23} clearcoat={1} clearcoatRoughness={0.16} />
      </mesh>
      <mesh geometry={cabinGeo} position={[0, 0, 0]} castShadow>
        <meshPhysicalMaterial color="#111a22" metalness={0.7} roughness={0.18} clearcoat={1} transparent opacity={0.94} />
      </mesh>
      <mesh position={[0, 0.84, 0]} scale={[1.45, 0.018, 0.53]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#d7e2e9" metalness={0.95} roughness={0.16} />
      </mesh>
      <mesh position={[-1.96, 0.48, 0]} rotation={[0, 0, 0.06]}>
        <boxGeometry args={[0.2, 0.045, 0.5]} />
        <meshStandardMaterial color="#e9f5ff" emissive="#dceeff" emissiveIntensity={2.4} metalness={0.3} roughness={0.15} />
      </mesh>
      <mesh position={[2.05, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.035, 0.42]} />
        <meshStandardMaterial color="#ff3347" emissive="#ff172e" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 0.22, 0]} scale={[3.6, 0.12, 1.18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#080b0e" metalness={0.4} roughness={0.55} />
      </mesh>
      <Wheel x={-1.35} z={-0.42} />
      <Wheel x={1.28} z={-0.42} />
      <Wheel x={-1.35} z={0.42} />
      <Wheel x={1.28} z={0.42} />
      <mesh position={[-0.1, 0.58, 0.365]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.35, 0.018, 0.018]} />
        <meshStandardMaterial color="#e5edf2" metalness={1} roughness={0.18} />
      </mesh>
    </group>
  );
}

function StudioCar({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const rig = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!rig.current) return;
    const targetY = pointer.current.x * 0.24 + Math.sin(state.clock.elapsedTime * 0.18) * 0.035;
    const targetX = -pointer.current.y * 0.08;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, targetY, 2.4, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, targetX, 2.4, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, Math.sin(state.clock.elapsedTime * 0.65) * 0.055, 2, delta);
  });
  return (
    <group ref={rig} rotation={[0.04, -0.32, 0]} position={[0, 0.05, 0]} scale={1.08}>
      <Float speed={0.8} rotationIntensity={0.035} floatIntensity={0.12}>
        <Bodywork />
      </Float>
    </group>
  );
}

export default function AutomotiveScene() {
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setReady(true); return; }
    const tween = gsap.fromTo(el, { opacity: 0, y: 24, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 1.4, delay: 0.12, ease: 'power3.out', onComplete: () => setReady(true) });
    return () => { tween.kill(); };
  }, []);

  return (
    <div
      className="scene-canvas noir-3d-scene"
      ref={root}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      }}
      aria-label="Interactive 3D silver concept sports car. Move the pointer to change the viewing angle."
    >
      <Canvas
        dpr={[1, 1.65]}
        camera={{ position: [4.7, 2.6, 6.2], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.1} />
          <hemisphereLight args={['#eaf5ff', '#17202a', 1.5]} />
          <directionalLight position={[4, 7, 5]} intensity={3.4} color="#f1f7ff" castShadow />
          <directionalLight position={[-5, 3, -3]} intensity={4.2} color="#8db9db" />
          <spotLight position={[0, 5, -4]} intensity={55} angle={0.55} penumbra={1} color="#d6e7f4" />
          <pointLight position={[-3, 1.3, 2]} intensity={9} color="#d6e7f4" distance={8} />
          <StudioCar pointer={pointer} />
          <Sparkles count={38} scale={[7, 2.4, 4]} size={1.2} speed={0.18} opacity={0.25} color="#d6e8f4" />
          <ContactShadows position={[0, -0.05, 0]} opacity={0.42} scale={7} blur={2.6} far={4} />
        </Suspense>
      </Canvas>
      <div className="scene-caption"><span className="live-dot" /> {ready ? 'INTERACTIVE 3D / CONCEPT 001' : 'INITIALIZING STUDIO'}</div>
      <div className="scene-reticle" aria-hidden="true"><span /><span /></div>
    </div>
  );
}
