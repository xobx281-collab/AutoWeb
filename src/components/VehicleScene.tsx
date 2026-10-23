'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, MeshReflectorMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Mesh } from 'three';
import * as THREE from 'three';

function Wheel({ position }: { position: [number, number, number] }) {
 return <group position={position} rotation={[Math.PI / 2, 0, 0]}>
  <mesh castShadow><cylinderGeometry args={[.36,.36,.22,48]}/><meshStandardMaterial color="#080a0c" metalness={.72} roughness={.3}/></mesh>
  <mesh position={[0,0,.125]}><cylinderGeometry args={[.245,.245,.025,48]}/><meshStandardMaterial color="#8e9ba5" metalness={1} roughness={.2}/></mesh>
  <mesh position={[0,0,.145]}><cylinderGeometry args={[.17,.17,.03,12]}/><meshStandardMaterial color="#151b20" metalness={.88} roughness={.22}/></mesh>
  {Array.from({length:10},(_,i)=><mesh key={i} rotation={[0,0,i*Math.PI/5]} position={[0,0,.165]}><boxGeometry args={[.025,.28,.012]}/><meshStandardMaterial color="#b6c1c9" metalness={.95} roughness={.23}/></mesh>)}
 </group>;
}
function SculpturalForm() {
 const group = useRef<THREE.Group>(null);
 const body = useRef<Mesh>(null);
 const glass = useRef<Mesh>(null);
 useFrame((state) => {
  if (group.current) {
   group.current.rotation.y = -.18 + Math.sin(state.clock.elapsedTime * .19) * .08 + state.pointer.x * .12;
   group.current.rotation.x = state.pointer.y * .025;
   group.current.position.y = Math.sin(state.clock.elapsedTime * .55) * .045;
  }
  if (body.current) body.current.rotation.z = Math.sin(state.clock.elapsedTime * .22) * .004;
  if (glass.current) glass.current.rotation.y = Math.sin(state.clock.elapsedTime * .19) * .012;
 });
 return <group ref={group} rotation={[0, -.2, 0]} scale={1.08}>
  {/* Low, wide grand-tourer bodywork */}
  <mesh ref={body} castShadow receiveShadow position={[0,.38,0]} scale={[2.55,.39,1.12]}><sphereGeometry args={[1,64,32]}/><meshPhysicalMaterial color="#303a43" metalness={.9} roughness={.19} clearcoat={1} clearcoatRoughness={.08} envMapIntensity={1.6}/></mesh>
  <mesh castShadow position={[-.82,.53,0]} scale={[1.1,.25,.98]}><sphereGeometry args={[1,48,24]}/><meshPhysicalMaterial color="#52616d" metalness={.88} roughness={.23} clearcoat={1}/></mesh>
  <mesh castShadow position={[.56,.68,0]} scale={[1.05,.39,.76]}><sphereGeometry args={[1,48,24]}/><meshPhysicalMaterial color="#0a1015" metalness={.55} roughness={.12} clearcoat={1} clearcoatRoughness={.04}/></mesh>
  <mesh ref={glass} position={[.53,.72,0]} scale={[.84,.31,.68]}><sphereGeometry args={[1,40,24]}/><meshPhysicalMaterial color="#354754" metalness={.82} roughness={.12} transparent opacity={.66} clearcoat={1}/></mesh>
  <mesh castShadow position={[1.63,.37,0]} rotation={[0,0,-.06]} scale={[.42,.08,.9]}><boxGeometry args={[1,1,1]}/><meshStandardMaterial color="#0b0e11" metalness={.7} roughness={.23}/></mesh>
  <mesh position={[-2.05,.4,0]} scale={[.12,.06,.72]}><boxGeometry/><meshBasicMaterial color="#dfeaf2"/></mesh>
  <mesh position={[2.06,.43,0]} scale={[.06,.055,.7]}><boxGeometry/><meshBasicMaterial color="#a8c4d8"/></mesh>
  {[-1.48,1.45].map(x=>[-.82,.82].map(z=><Wheel key={x+':'+z} position={[x,.12,z]}/>))}
  <mesh position={[0,.2,0]} scale={[2.12,.035,.84]}><boxGeometry/><meshStandardMaterial color="#080b0e" metalness={.5} roughness={.32}/></mesh>
  <mesh position={[0,.77,0]} rotation={[0,0,.04]} scale={[.85,.018,.63]}><boxGeometry/><meshBasicMaterial color="#c8d7e3" transparent opacity={.8}/></mesh>
 </group>;
}
function Studio() {
 return <>
  <color attach="background" args={['#0a0e12']}/>
  <fog attach="fog" args={['#0a0e12',8,21]}/>
  <ambientLight intensity={.55}/>
  <spotLight position={[-4,7,4]} angle={.48} penumbra={.9} intensity={115} color="#e3edf5" castShadow/>
  <spotLight position={[5,5,-3]} angle={.42} penumbra={1} intensity={95} color="#9eb9cc"/>
  <pointLight position={[0,2,5]} intensity={15} color="#f2f7fa"/>
  <pointLight position={[-4,1,-2]} intensity={9} color="#6f8da3"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.3,0]} receiveShadow><planeGeometry args={[200,200]}/><MeshReflectorMaterial blur={[350,80]} resolution={512} mixBlur={1} mixStrength={.42} roughness={.42} metalness={.65} color="#10161b" mirror={.35}/></mesh>
  <Float speed={.65} rotationIntensity={0} floatIntensity={.09}><SculpturalForm/></Float>
  <ContactShadows position={[0,-.27,0]} opacity={.58} scale={10} blur={2.8} far={3.5}/>
  <Environment preset="warehouse"/>
 </>;
}
export default function VehicleScene() {
 const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 return <div className="scene-canvas" aria-label="Interactive real-time 3D sculptural grand tourer">
  <Canvas shadows dpr={[1,1.5]} camera={{position:[0,2.2,7.6],fov:36}} frameloop="always" gl={{antialias:true,alpha:false,powerPreference:'high-performance'}}>
   <Suspense fallback={null}><Studio/></Suspense>
  </Canvas>
  <span className="scene-caption">{reduced ? 'STUDIO STUDY / STATIC MOTION' : 'REAL-TIME 3D / MOVE TO EXPLORE'}</span>
 </div>;
}
