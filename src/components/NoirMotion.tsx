'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function NoirMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.intro-strip, .section-heading, .philosophy, .services-copy, .enquiry-copy, .page-intro').forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 34 }, {
          autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      gsap.utils.toArray<HTMLElement>('.feature, .vehicle-card, .service-list > div, .enquiry-form').forEach((el, index) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 28, scale: 0.985 }, {
          autoAlpha: 1, y: 0, scale: 1, duration: 0.9,
          delay: (index % 3) * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 91%', once: true }
        });
      });

      const header = document.querySelector<HTMLElement>('.site-header');
      if (header) {
        ScrollTrigger.create({
          start: 24,
          onUpdate: (self) => header.classList.toggle('is-scrolled', self.scroll() > 24)
        });
      }

      gsap.utils.toArray<HTMLElement>('.button, .circle-link, .header-contact').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
        const move = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.09);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.12);
        };
        const reset = () => { xTo(0); yTo(0); };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', reset);
        ctx.add(() => {
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', reset);
        });
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
