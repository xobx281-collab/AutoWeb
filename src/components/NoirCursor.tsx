'use client';
import { useEffect, useRef } from 'react';

export default function NoirCursor(){
 const cursor=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=cursor.current;if(!node||window.matchMedia('(hover: none), (pointer: coarse)').matches)return;
  let x=-100,y=-100,tx=-100,ty=-100,frame=0;
  const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY;node.classList.add('is-visible')};
  const over=(e:Event)=>{const t=e.target;if(t instanceof Element&&t.closest('a,button,[role="button"],input,textarea,select,.vehicle-card,.feature'))node.classList.add('is-hovering');else node.classList.remove('is-hovering')};
  const tick=()=>{x+=(tx-x)*.22;y+=(ty-y)*.22;node.style.transform='translate3d('+(x-7)+'px,'+(y-7)+'px,0)';frame=requestAnimationFrame(tick)};
  window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerover',over,{passive:true});frame=requestAnimationFrame(tick);
  return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerover',over);cancelAnimationFrame(frame)};
 },[]);
 return <div className="noir-cursor" ref={cursor} aria-hidden="true"/>;
}
