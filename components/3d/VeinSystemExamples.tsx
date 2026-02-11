/**
 * Example: Using BrainModel with Pulsing Vein System
 * 
 * This example demonstrates various configurations of the vein system
 * that can be used in your portfolio.
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import BrainModel from '@/components/3d/BrainModel';

/**
 * Example 1: Electric Blue - Tech/AI Portfolio
 * Perfect for: Software developers, AI researchers, tech startups
 */
export function ElectricBlueBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="thinking"
        enableVeins={true}
        veinColor="#00ffff"
        veinIntensity={0.8}
        veinPulseSpeed={1.5}
        glowIntensity={0.4}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="city" />
    </Canvas>
  );
}

/**
 * Example 2: Neon Purple - Creative/Artistic Portfolio
 * Perfect for: Designers, artists, creative agencies
 */
export function NeonPurpleBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="pulsing"
        enableVeins={true}
        veinColor="#ff00ff"
        veinIntensity={1.0}
        veinPulseSpeed={2.0}
        glowIntensity={0.5}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="sunset" />
    </Canvas>
  );
}

/**
 * Example 3: Medical Red - Healthcare/Science Portfolio
 * Perfect for: Medical professionals, biotech, neuroscience
 */
export function MedicalRedBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="scanning"
        enableVeins={true}
        veinColor="#ff0033"
        veinIntensity={0.9}
        veinPulseSpeed={1.2}
        glowIntensity={0.3}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="studio" />
    </Canvas>
  );
}

/**
 * Example 4: Matrix Green - Hacker/Cyberpunk Portfolio
 * Perfect for: Cybersecurity, ethical hackers, sci-fi themes
 */
export function MatrixGreenBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="thinking"
        enableVeins={true}
        veinColor="#00ff00"
        veinIntensity={1.2}
        veinPulseSpeed={1.8}
        glowIntensity={0.6}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="night" />
    </Canvas>
  );
}

/**
 * Example 5: Subtle Professional - Corporate/Business Portfolio
 * Perfect for: Consultants, business professionals, corporate sites
 */
export function SubtleProfessionalBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="idle"
        enableVeins={true}
        veinColor="#6699ff"
        veinIntensity={0.5}
        veinPulseSpeed={0.8}
        glowIntensity={0.2}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="apartment" />
    </Canvas>
  );
}

/**
 * Example 6: No Veins - Original Clean Look
 * Perfect for: Minimalist portfolios, scientific accuracy
 */
export function CleanBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="idle"
        enableVeins={false}
        glowIntensity={0.3}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="studio" />
    </Canvas>
  );
}

/**
 * Example 7: Dramatic Scanning Effect
 * Perfect for: Tech demos, interactive presentations
 */
export function DramaticScanningBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#00ffff" />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="scanning"
        enableVeins={true}
        veinColor="#00ffff"
        veinIntensity={1.5}
        veinPulseSpeed={2.5}
        glowIntensity={0.6}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="city" />
    </Canvas>
  );
}

/**
 * Example 8: Slow Breathing Effect
 * Perfect for: Meditation apps, wellness sites, calm aesthetics
 */
export function BreathingBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="pulsing"
        enableVeins={true}
        veinColor="#99ccff"
        veinIntensity={0.6}
        veinPulseSpeed={0.5}
        glowIntensity={0.3}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="dawn" />
    </Canvas>
  );
}

/**
 * Example 9: Multi-Color Chromatic Effect
 * Perfect for: Art installations, experimental portfolios
 */
export function ChromaticBrain() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 0, 2]} intensity={0.4} color="#ff00ff" />
      <pointLight position={[3, 0, 2]} intensity={0.4} color="#00ffff" />
      
      <BrainModel
        position={[0, 0, 0]}
        scale={1.5}
        variant="thinking"
        enableVeins={true}
        veinColor="#ff00ff"
        veinIntensity={1.0}
        veinPulseSpeed={1.5}
        glowIntensity={0.5}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="sunset" />
    </Canvas>
  );
}

/**
 * Example Usage in a Page Component:
 * 
 * import { ElectricBlueBrain } from './examples/VeinSystemExamples';
 * 
 * export default function HeroSection() {
 *   return (
 *     <div className="w-full h-screen">
 *       <ElectricBlueBrain />
 *     </div>
 *   );
 * }
 */
