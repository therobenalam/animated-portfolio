'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
        opacity: 0,
        y: 50,
      });

      // Stagger animation for cards
      const cards = cardsRef.current?.querySelectorAll('.card');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'top 50%',
          },
          opacity: 0,
          y: 60,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          ref={headingRef}
          className="mb-16 text-center text-5xl font-bold text-white md:text-6xl"
        >
          About Me
        </h2>
        
        <div ref={cardsRef} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="card rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-8 backdrop-blur-sm">
            <div className="mb-4 text-5xl">💻</div>
            <h3 className="mb-3 text-2xl font-bold text-white">3D Development</h3>
            <p className="text-gray-300">
              Creating immersive 3D experiences using Three.js, React Three Fiber, and modern WebGL techniques.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-600/10 p-8 backdrop-blur-sm">
            <div className="mb-4 text-5xl">🎨</div>
            <h3 className="mb-3 text-2xl font-bold text-white">UI/UX Design</h3>
            <p className="text-gray-300">
              Crafting beautiful, intuitive interfaces with attention to detail and user experience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card rounded-2xl bg-gradient-to-br from-pink-500/10 to-orange-600/10 p-8 backdrop-blur-sm">
            <div className="mb-4 text-5xl">⚡</div>
            <h3 className="mb-3 text-2xl font-bold text-white">Performance</h3>
            <p className="text-gray-300">
              Optimizing web applications for speed, accessibility, and smooth user interactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
