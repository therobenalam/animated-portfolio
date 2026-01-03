import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import NetworkBrain from '@/components/3d/NetworkBrain';
import '@testing-library/jest-dom';

describe('NetworkBrain', () => {
  const renderNetworkBrain = (props = {}) => {
    return render(
      <Canvas>
        <NetworkBrain {...props} />
      </Canvas>
    );
  };

  describe('Rendering', () => {
    it('should render without crashing', () => {
      renderNetworkBrain();
    });

    it('should render with default props', () => {
      const { container } = renderNetworkBrain();
      expect(container).toBeInTheDocument();
    });

    it('should render with custom position', () => {
      renderNetworkBrain({ position: [1, 2, 3] });
    });

    it('should render with custom scale', () => {
      renderNetworkBrain({ scale: 2.5 });
    });

    it('should render with custom rotation', () => {
      renderNetworkBrain({ rotation: [0.5, 1.0, 0.5] });
    });
  });

  describe('Node Configuration', () => {
    it('should render with custom node count', () => {
      renderNetworkBrain({ nodeCount: 200 });
    });

    it('should render with custom connection density', () => {
      renderNetworkBrain({ connectionDensity: 0.25 });
    });

    it('should render with custom node size', () => {
      renderNetworkBrain({ nodeSize: 0.05 });
    });

    it('should render with custom colors', () => {
      renderNetworkBrain({
        nodeColor: '#ff0000',
        edgeColor: '#00ff00',
      });
    });
  });

  describe('Animation', () => {
    it('should render with animation enabled', () => {
      renderNetworkBrain({ animated: true });
    });

    it('should render with animation disabled', () => {
      renderNetworkBrain({ animated: false });
    });

    it('should render with custom pulse speed', () => {
      renderNetworkBrain({ pulseSpeed: 2 });
    });
  });

  describe('Edge Cases', () => {
    it('should handle very low node count', () => {
      renderNetworkBrain({ nodeCount: 10 });
    });

    it('should handle very high node count', () => {
      renderNetworkBrain({ nodeCount: 500 });
    });

    it('should handle zero connection density', () => {
      renderNetworkBrain({ connectionDensity: 0 });
    });

    it('should handle high connection density', () => {
      renderNetworkBrain({ connectionDensity: 0.5 });
    });
  });

  describe('Combination Tests', () => {
    it('should render with all custom props', () => {
      renderNetworkBrain({
        position: [1, 2, 3],
        scale: 2,
        rotation: [0.1, 0.2, 0.3],
        nodeCount: 200,
        connectionDensity: 0.2,
        nodeSize: 0.03,
        nodeColor: '#00ffff',
        edgeColor: '#ff00ff',
        animated: true,
        pulseSpeed: 1.5,
      });
    });

    it('should render minimal configuration', () => {
      renderNetworkBrain({
        nodeCount: 50,
        connectionDensity: 0.1,
        animated: false,
      });
    });
  });
});
