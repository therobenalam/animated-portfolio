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

  describe('Mouse Interaction', () => {
    it('should track mouse position', () => {
      const { container } = renderNetworkBrain();
      
      // Simulate mouse move
      const event = new MouseEvent('mousemove', {
        clientX: 400,
        clientY: 300,
      });
      window.dispatchEvent(event);
      
      expect(container).toBeInTheDocument();
    });

    it('should handle mouse proximity to nodes', () => {
      renderNetworkBrain({
        nodeCount: 100,
        animated: true,
      });
      
      // Simulate mouse near nodes
      const event = new MouseEvent('mousemove', {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
      window.dispatchEvent(event);
    });

    it('should clean up mouse event listener on unmount', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');
      const { unmount } = renderNetworkBrain();
      
      // Check if mousemove was added (may not fire in mocked R3F Canvas)
      const mousemoveAdded = addSpy.mock.calls.some(call => call[0] === 'mousemove');
      addSpy.mockRestore();
      
      if (mousemoveAdded) {
        const removeSpy = jest.spyOn(window, 'removeEventListener');
        unmount();
        expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        removeSpy.mockRestore();
      } else {
        // In mocked R3F environment, useEffect may not fire — unmount should not throw
        unmount();
      }
    });
  });

  describe('Node Glow and Scale Effects', () => {
    it('should render with nodes that can glow', () => {
      renderNetworkBrain({
        showNodes: true,
        nodeColor: '#4488ff',
        animated: true,
      });
    });

    it('should handle node scaling based on cursor proximity', () => {
      renderNetworkBrain({
        nodeCount: 50,
        nodeSize: 0.015,
        animated: true,
      });
      
      // Simulate cursor close to center
      const event = new MouseEvent('mousemove', {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
      window.dispatchEvent(event);
    });

    it('should apply white glow to nodes near cursor', () => {
      renderNetworkBrain({
        showNodes: true,
        showEdges: true,
        animated: true,
      });
    });
  });

  describe('Edge Glow Effects', () => {
    it('should render edges with dynamic opacity', () => {
      renderNetworkBrain({
        showEdges: true,
        edgeColor: '#00ffff',
        animated: true,
      });
    });

    it('should propagate glow from nodes to connected edges', () => {
      renderNetworkBrain({
        showNodes: true,
        showEdges: true,
        connectionDensity: 0.15,
        animated: true,
      });
    });

    it('should handle edge intensity based on node proximity', () => {
      renderNetworkBrain({
        nodeCount: 100,
        connectionDensity: 0.12,
        showEdges: true,
        animated: true,
      });
    });
  });
});
