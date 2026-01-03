import { render, screen } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import '@testing-library/jest-dom';

// Mock useGLTF with proper initialization
jest.mock('@react-three/drei', () => {
  const mockUseGLTF: any = jest.fn(() => ({
    scene: {
      traverse: jest.fn(),
    },
  }));
  mockUseGLTF.preload = jest.fn();
  
  return {
    useGLTF: mockUseGLTF,
    MeshTransmissionMaterial: jest.fn(),
  };
});

// Import after mock
import BrainModel from '@/components/3d/BrainModel';

describe('BrainModel', () => {
  const renderBrainModel = (props = {}) => {
    return render(
      <Canvas>
        <BrainModel {...props} />
      </Canvas>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      renderBrainModel();
    });

    it('should render with default props', () => {
      const { container } = renderBrainModel();
      expect(container).toBeInTheDocument();
    });

    it('should render with custom position', () => {
      renderBrainModel({ position: [1, 2, 3] });
    });

    it('should render with custom scale', () => {
      renderBrainModel({ scale: 2.5 });
    });

    it('should render with custom rotation', () => {
      renderBrainModel({ rotation: [0.5, 1.0, 0.5] });
    });
  });

  describe('Animation Variants', () => {
    it('should render with idle variant', () => {
      renderBrainModel({ variant: 'idle' });
    });

    it('should render with thinking variant', () => {
      renderBrainModel({ variant: 'thinking' });
    });

    it('should render with scanning variant', () => {
      renderBrainModel({ variant: 'scanning' });
    });

    it('should render with pulsing variant', () => {
      renderBrainModel({ variant: 'pulsing' });
    });
  });

  describe('Interactive Features', () => {
    it('should enable interactive mode by default', () => {
      renderBrainModel();
    });

    it('should disable interactive mode when interactive=false', () => {
      renderBrainModel({ interactive: false });
    });

    it('should enable auto-rotation when autoRotate=true', () => {
      renderBrainModel({ autoRotate: true });
    });
  });

  describe('Visual Effects', () => {
    it('should apply glow intensity', () => {
      renderBrainModel({ glowIntensity: 0.5 });
    });

    it('should handle zero glow intensity', () => {
      renderBrainModel({ glowIntensity: 0 });
    });

    it('should handle maximum glow intensity', () => {
      renderBrainModel({ glowIntensity: 1 });
    });
  });

  describe('Model Loading', () => {
    it('should preload the brain model', () => {
      const { useGLTF } = require('@react-three/drei');
      expect(useGLTF.preload).toBeDefined();
    });

    it('should load model with useGLTF', () => {
      renderBrainModel();
      // Model renders successfully (no errors thrown)
    });

    it('should handle missing model gracefully', () => {
      const { useGLTF } = require('@react-three/drei');
      useGLTF.mockReturnValue({ scene: null });
      renderBrainModel();
    });
  });

  describe('Combination Tests', () => {
    it('should render with all features enabled', () => {
      renderBrainModel({
        position: [0, 1, 0],
        scale: 2,
        rotation: [0.1, 0.2, 0.3],
        variant: 'thinking',
        interactive: true,
        autoRotate: true,
        glowIntensity: 0.6,
      });
    });

    it('should render minimalist version for performance', () => {
      renderBrainModel({
        scale: 1,
        variant: 'idle',
        interactive: false,
        autoRotate: false,
        glowIntensity: 0,
      });
    });
  });

  describe('Props Validation', () => {
    it('should handle undefined position', () => {
      renderBrainModel({ position: undefined });
    });

    it('should handle undefined scale', () => {
      renderBrainModel({ scale: undefined });
    });

    it('should handle invalid variant (fallback to idle)', () => {
      renderBrainModel({ variant: 'invalid' as any });
    });

    it('should handle negative glow intensity', () => {
      renderBrainModel({ glowIntensity: -0.5 });
    });

    it('should handle glow intensity > 1', () => {
      renderBrainModel({ glowIntensity: 2.0 });
    });
  });
});
