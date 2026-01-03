import * as THREE from 'three';

/**
 * Create a custom material with standard properties
 */
export const createStandardMaterial = (
  color: string,
  metalness: number = 0.5,
  roughness: number = 0.5
): THREE.MeshStandardMaterial => {
  return new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
  });
};

/**
 * Create a gradient material
 */
export const createGradientMaterial = (
  color1: string,
  color2: string
): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
  });
};

/**
 * Calculate responsive scale based on viewport
 */
export const getResponsiveScale = (): number => {
  if (typeof window === 'undefined') return 1;
  
  const width = window.innerWidth;
  if (width < 640) return 0.6; // Mobile
  if (width < 1024) return 0.8; // Tablet
  return 1; // Desktop
};

/**
 * Detect if device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Calculate distance between two 3D points
 */
export const distance3D = (
  point1: THREE.Vector3,
  point2: THREE.Vector3
): number => {
  return point1.distanceTo(point2);
};

/**
 * Lerp (Linear interpolation) between two values
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
