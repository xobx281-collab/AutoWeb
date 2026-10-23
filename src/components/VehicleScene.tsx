'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Mesh } from 'three';
import * as THREE from 'three';

function SculpturalForm() {
 const group = useRef<THREE.Group>(null);
 const body = useRef<Mesh>(null);
 useFrame((state, delta) => { if (group.current) { group.current.rotation.y = Math.sin(state.clock.elapsedTime * .18) * .12 + state.pointer.x * .08; group.current.position.y = Math.sin(state.clock.elapsedTime * .4) * .025; } if (body.current) body.current.rotation.z = Math.sin(state.clock.elapsedTime * .2) * .008; });
 return <group ref={group} rotation={[0, -.25, 0]}>
  <mesh ref={body} castShadow receiveShadow position={[0, .35, 0]} scale={[2.5,.52,1.08]}><sphereGeometry args={[1,64,32]}/><meshPhysicalMaterial color="#202326" metalness={.82} roughness={.22} clearcoat={1} clearcoatRoughness={.12}/></mesh>
  <mesh castShadow position={[.1,.7,0]} scale={[1.15,.38,.78]}><sphereGeometry args={[1,48,24]}/><meshPhysicalMaterial color="#080a0c" metalness={.65} roughness={.16} clearcoat={1}/></mesh>
  {[-1.45,1.45].map((x) => [-.8,.8].map((z) => <group key={`${x}-${z}`} position={[x,.04,z*.58]} rotation={[Math.PI/2,0,0]}><mesh castShadow><cylinderGeometry args={[.36,.36,.15,48]}/><meshStandardMaterial color="#08090a" metalness={.75} roughness={.35}/></mesh><mesh><cylinderGeometry args={[.22,.22,.16,48]}/><meshStandardMaterial color="#777d82" metalness={.95} roughness={.2}/></mesh><mesh position={[0,0,.09]}><cylinderGeometry args={[.08,.08,.17,32]}/><meshStandardMaterial color="#111315" metalness={.6} roughness={.25}/></mesh></group>))}
  <mesh position={[0,.42,.53]} scale={[1.85,.025,.012]}><boxGeometry/><meshBasicMaterial color="#dce4eb"/></mesh>
 </group>;
}
function Studio() { return <><color attach="background" args={['#08090a']}/><fog attach="fog" args={['#08090a',7,19]}/><ambientLight intensity={.45}/><spotLight position={[-4,7,4]} angle={.48} penumbra={.9} intensity={95} color="#dbe5ef" castShadow/><spotLight position={[5,5,-3]} angle={.42} penumbra={1} intensity={80} color="#aeb8c2"/><pointLight position={[0,2,5]} intensity={9} color="#f2f5f8"/><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.3,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color="#101214" metalness={.58} roughness={.32}/></mesh><Float speed={.5} rotationIntensity={0} floatIntensity={.12}><SculpturalForm/></Float><ContactShadows position={[0,-.28,0]} opacity={.5} scale={9} blur={2.7} far={3}/><Environment preset="warehouse"/></>; }
export default function VehicleScene() {
 const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 return <div className="scene-canvas" aria-label="Interactive real-time 3D abstract sculptural vehicle study"><Canvas shadows dpr={[1,1.5]} camera={{position:[0,2.1,7.4],fov:37}} frameloop="always" gl={{antialias:true,alpha:false,powerPreference:'high-performance'}}><Suspense fallback={null}><Studio/></Suspense></Canvas><span className="scene-caption">{reduced ? 'STUDIO STUDY / STATIC MOTION' : 'REAL-TIME 3D / STUDIO STUDY'}</span></div>;
}
