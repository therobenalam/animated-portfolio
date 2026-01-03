'use client';

import Scene from '../3d/Scene';
import Model from '../3d/Model';
import Camera from '../3d/Camera';
import Background from '../3d/Background';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero text elements with stagger
      gsap.from([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Parallax effect on scroll
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0.3,
        y: -100,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Scene className="h-full w-full">
          <Background preset="city" blur={0.7} />
          <Model position={[0, 0, 0]} scale={1.5} />
          <Camera autoRotate autoRotateSpeed={0.5} />
        </Scene>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1
          ref={titleRef}
          className="mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-6xl font-bold text-transparent md:text-8xl"
        >
          Welcome to My Portfolio
        </h1>
        <p
          ref={subtitleRef}
          className="mb-8 max-w-2xl text-xl text-gray-300 md:text-2xl"
        >
          Explore interactive 3D experiences and creative web development
        </p>
        <button
          ref={buttonRef}
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Projects
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-8 rounded-full border-2 border-white/30">
          <div className="mx-auto mt-2 h-3 w-1 animate-pulse rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
