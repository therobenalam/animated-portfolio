'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });

      // Form animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Social links animation
      const socialLinks = socialRef.current?.querySelectorAll('.social-link');
      if (socialLinks) {
        gsap.from(socialLinks, {
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 90%',
          },
          opacity: 0,
          scale: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="mb-16 text-center text-5xl font-bold text-white md:text-6xl"
        >
          Get In Touch
        </h2>

        <div ref={formRef} className="mb-12 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-lg bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-lg bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>

        <div ref={socialRef} className="flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-2xl transition-all hover:scale-110 hover:from-blue-500 hover:to-purple-600"
          >
            🐙
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-2xl transition-all hover:scale-110 hover:from-blue-500 hover:to-purple-600"
          >
            💼
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-2xl transition-all hover:scale-110 hover:from-blue-500 hover:to-purple-600"
          >
            🐦
          </a>
          <a
            href="mailto:hello@example.com"
            className="social-link flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-2xl transition-all hover:scale-110 hover:from-blue-500 hover:to-purple-600"
          >
            ✉️
          </a>
        </div>
      </div>
    </section>
  );
}
