import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a scroll-triggered animation
 * @param target - The element or ref to animate
 * @param vars - GSAP animation variables
 * @param scrollTriggerVars - ScrollTrigger configuration
 */
export const createScrollAnimation = (
  target: gsap.TweenTarget,
  vars: gsap.TweenVars,
  scrollTriggerVars: ScrollTrigger.Vars
) => {
  return gsap.to(target, {
    ...vars,
    scrollTrigger: {
      ...scrollTriggerVars,
      scrub: scrollTriggerVars.scrub ?? true,
    },
  });
};

/**
 * Create a timeline animation
 * @param vars - Timeline configuration
 */
export const createTimeline = (vars?: gsap.TimelineVars) => {
  return gsap.timeline(vars);
};

/**
 * Smooth scroll to element
 * @param target - Element ID or selector
 * @param duration - Animation duration in seconds
 */
export const smoothScrollTo = (target: string, duration: number = 1) => {
  gsap.to(window, {
    duration,
    scrollTo: target,
    ease: 'power2.inOut',
  });
};

/**
 * Fade in animation
 * @param target - Element to animate
 * @param duration - Animation duration
 */
export const fadeIn = (target: gsap.TweenTarget, duration: number = 1) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration, ease: 'power2.out' }
  );
};

/**
 * Stagger animation for multiple elements
 * @param targets - Elements to animate
 * @param staggerAmount - Delay between each element
 */
export const staggerAnimation = (
  targets: gsap.TweenTarget,
  staggerAmount: number = 0.1
) => {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerAmount,
      ease: 'power2.out',
    }
  );
};

/**
 * Rotate 3D object on scroll
 * @param meshRef - Reference to Three.js mesh
 * @param trigger - Scroll trigger element
 * @param rotationAmount - Total rotation in radians
 */
export const rotateOnScroll = (
  meshRef: any,
  trigger: string,
  rotationAmount: number = Math.PI * 2
) => {
  return createScrollAnimation(
    meshRef.current.rotation,
    { y: rotationAmount },
    {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
    }
  );
};
