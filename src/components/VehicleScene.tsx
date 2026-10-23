'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { vehicles } from '@/data/vehicles';

export default function VehicleScene() {
 const root = useRef<HTMLDivElement>(null);
 const rear = useRef<HTMLDivElement>(null);
 const main = useRef<HTMLDivElement>(null);
 const front = useRef<HTMLDivElement>(null);
 const markings = useRef<HTMLDivElement>(null);

 useEffect(() => {
  if (!root.current) return;
  gsap.registerPlugin(ScrollTrigger);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = gsap.context(() => {
   if (reduced) return;
   gsap.fromTo(main.current,{opacity:0, y:45, scale:1.035, rotateY:-5},{opacity:1,y:0,scale:1,rotateY:0,duration:1.6,ease:'power3.out',delay:.15});
   gsap.fromTo([rear.current,front.current],{opacity:0,x:35},{opacity:1,x:0,duration:1.5,stagger:.15,ease:'power2.out',delay:.35});
   gsap.to(main.current,{yPercent:18,scale:.91,rotateY:4,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
   gsap.to(rear.current,{xPercent:-14,yPercent:9,rotateZ:-3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
   gsap.to(front.current,{xPercent:12,yPercent:-8,rotateZ:3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
   gsap.to(markings.current,{yPercent:35,opacity:.3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
   gsap.utils.toArray<HTMLElement>('.scroll-scene, .feature, .services-image, .enquiry-form').forEach((el) => {
    gsap.fromTo(el,{opacity:0.72,y:24},{opacity:1,y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 88%',end:'top 48%',scrub:.7}});
   });
  }, root);
  return () => ctx.revert();
 }, []);

 return <div className="scene-canvas photo-stage" ref={root} aria-label="Layered cinematic automotive photography with scroll-responsive depth">
  <div className="stage-grid" aria-hidden="true"/>
  <div className="stage-technical" ref={markings} aria-hidden="true"><span>U9 / ELECTRIC PERFORMANCE</span><span>DESIGN STUDY — 001</span><span className="technical-circle"/></div>
  <div className="stage-photo stage-photo-rear" ref={rear}><Image src={vehicles[2].image} alt="" fill priority sizes="(max-width: 768px) 70vw, 44vw" unoptimized/></div>
  <div className="stage-photo stage-photo-main" ref={main}><Image src={vehicles[0].image} alt="Performance car in a cinematic studio-style photographic composition" fill priority sizes="(max-width: 768px) 100vw, 68vw" unoptimized/></div>
  <div className="stage-photo stage-photo-front" ref={front}><Image src={vehicles[3].image} alt="" fill priority sizes="(max-width: 768px) 45vw, 30vw" unoptimized/></div>
  <div className="stage-light" aria-hidden="true"/>
  <span className="scene-caption"><span className="live-dot"/> IMAGE-BASED STUDIO / SCROLL-RESPONSIVE DEPTH</span>
 </div>;
}
