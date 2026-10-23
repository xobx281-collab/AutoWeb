'use client';
import { useState } from 'react';

export default function VehicleImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
 const [failed, setFailed] = useState(false);
 return failed ? <div className={`image-fallback ${className}`} role="img" aria-label={alt}><span>NOIR / AUTOMOTIVE</span></div> : <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
