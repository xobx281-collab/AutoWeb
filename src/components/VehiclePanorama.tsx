'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function VehiclePanorama({src,alt}:{src:string;alt:string}) {
 const frame=useRef<HTMLDivElement>(null);
 const drag=useRef({active:false,x:0,y:0,ry:0,rx:0});
 const [active,setActive]=useState(false);
 function down(e:React.PointerEvent<HTMLDivElement>){drag.current.active=true;drag.current.x=e.clientX;drag.current.y=e.clientY;setActive(true);e.currentTarget.setPointerCapture(e.pointerId)}
 function move(e:React.PointerEvent<HTMLDivElement>){if(!drag.current.active)return;drag.current.ry=Math.max(-16,Math.min(16,drag.current.ry+(e.clientX-drag.current.x)*.15));drag.current.rx=Math.max(-5,Math.min(5,drag.current.rx-(e.clientY-drag.current.y)*.08));drag.current.x=e.clientX;drag.current.y=e.clientY;if(frame.current){frame.current.style.setProperty('--rotate-y',drag.current.ry+'deg');frame.current.style.setProperty('--rotate-x',drag.current.rx+'deg');frame.current.style.setProperty('--shift',drag.current.ry*.5+'px')}}
 function up(){drag.current.active=false;setActive(false)}
 return <div className={`vehicle-panorama ${active?'is-dragging':''}`} ref={frame} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onLostPointerCapture={up} role="group" aria-label="Interactive vehicle panorama. Drag left or right to explore the image perspective.">
  <div className="panorama-halo"/>
  <div className="panorama-image panorama-image-back"><Image src={src} alt="" fill sizes="100vw" unoptimized draggable={false}/></div>
  <div className="panorama-image panorama-image-main"><Image src={src} alt={alt} fill priority sizes="100vw" unoptimized draggable={false}/></div>
  <div className="panorama-gloss"/>
  <span className="panorama-hint"><i/>{active?'EXPLORE THE ANGLE':'DRAG TO EXPLORE'}</span>
 </div>
}
