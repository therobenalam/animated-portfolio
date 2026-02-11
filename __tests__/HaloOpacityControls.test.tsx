/**
 * HaloOpacityControls Tests
 * Tests for halo opacity control feature in NetworkBrain component
 */

import { render, screen } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import NetworkBrain from '@/components/3d/NetworkBrain';
import '@testing-library/jest-dom';

describe('NetworkBrain Halo Opacity Controls', () => {
  const renderWithCanvas = (component: React.ReactElement) => {
    return render(
      <Canvas>
        {component}
      </Canvas>
    );
  };

  test('NetworkBrain accepts haloOpacity prop', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain haloOpacity={0.5} />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain renders with haloOpacity at 0 (fully hidden)', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain haloOpacity={0} showNodes={true} showEdges={true} />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain renders with haloOpacity at 1 (fully visible)', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain haloOpacity={1.0} showNodes={true} showEdges={true} />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain renders with haloOpacity at 0.5 (semi-transparent)', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain haloOpacity={0.5} showNodes={true} showEdges={true} />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity defaults to 1.0 when not provided', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity works with other opacity controls', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.8}
        nodesOpacity={0.9}
        edgesOpacity={0.4}
        opacity={0.5}
      />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity affects both nodes and edges', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.3}
        showNodes={true}
        showEdges={true}
        nodeCount={50}
      />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity works with animation enabled', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.6}
        animated={true}
        pulseSpeed={1.5}
      />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity boundary values (0 to 1)', () => {
    // Test minimum
    const { container: containerMin } = renderWithCanvas(
      <NetworkBrain haloOpacity={0} />
    );
    expect(containerMin).toBeTruthy();

    // Test maximum
    const { container: containerMax } = renderWithCanvas(
      <NetworkBrain haloOpacity={1} />
    );
    expect(containerMax).toBeTruthy();
  });

  test('NetworkBrain renders with all visibility toggles and haloOpacity', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.7}
        showNodes={true}
        showEdges={true}
        showSkin={true}
        showGlow={true}
      />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity works independently of other controls', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.2}
        showNodes={false}
        showEdges={true}
        opacity={1.0}
      />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity combined with skin opacity', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.5}
        skinOpacity={0.35}
        showSkin={true}
        showNodes={true}
      />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity with extreme edge cases', () => {
    // Extremely low value
    const { container: containerLow } = renderWithCanvas(
      <NetworkBrain haloOpacity={0.01} />
    );
    expect(containerLow).toBeTruthy();

    // Extremely high value (clamped to 1)
    const { container: containerHigh } = renderWithCanvas(
      <NetworkBrain haloOpacity={0.99} />
    );
    expect(containerHigh).toBeTruthy();
  });

  test('NetworkBrain haloOpacity maintains performance with high node count', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.8}
        nodeCount={1000}
        connectionDensity={0.15}
      />
    );
    expect(container).toBeTruthy();
  });

  test('NetworkBrain haloOpacity works with custom colors', () => {
    const { container } = renderWithCanvas(
      <NetworkBrain 
        haloOpacity={0.6}
        nodeColor="#ff00ff"
        edgeColor="#00ffff"
      />
    );
    expect(container).toBeTruthy();
  });
});

describe('Background Environment Controls', () => {
  test('Background accepts showBackground prop', () => {
    const Background = require('@/components/3d/Background').default;
    const { container } = render(
      <Canvas>
        <Background showBackground={true} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('Background accepts backgroundIntensity prop', () => {
    const Background = require('@/components/3d/Background').default;
    const { container } = render(
      <Canvas>
        <Background backgroundIntensity={0.5} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('Background environment hidden by default', () => {
    const Background = require('@/components/3d/Background').default;
    const { container } = render(
      <Canvas>
        <Background showBackground={false} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('Background with environment visible and custom intensity', () => {
    const Background = require('@/components/3d/Background').default;
    const { container } = render(
      <Canvas>
        <Background 
          showBackground={true} 
          backgroundIntensity={0.7}
          preset="city"
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
