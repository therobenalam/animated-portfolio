'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: '3D Portfolio Website',
      description: 'Interactive 3D portfolio showcasing web development skills with Three.js and React Three Fiber.',
      tech: ['Next.js', 'Three.js', 'GSAP', 'Tailwind CSS'],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory and payment processing.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'AI Dashboard',
      description: 'Data visualization dashboard with machine learning insights and predictive analytics.',
      tech: ['TypeScript', 'Python', 'TensorFlow', 'D3.js'],
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
      });

      // Project cards animation with horizontal scroll effect
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        projectCards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotation: index % 2 === 0 ? -5 : 5,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          ref={headingRef}
          className="mb-16 text-5xl font-bold text-white md:text-6xl"
        >
          Featured Projects
        </h2>

        <div ref={projectsRef} className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 transition-all hover:scale-105 md:p-12"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 transition-opacity group-hover:opacity-10`} />
              
              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mb-6 text-lg text-gray-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`rounded-full bg-gradient-to-r ${project.gradient} px-4 py-2 text-sm font-semibold text-white`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
