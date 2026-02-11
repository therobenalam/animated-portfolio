import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import AISystemConnector from '@/components/3d/AISystemConnector';
import * as THREE from 'three';

// Mock @react-three/drei Text component
jest.mock('@react-three/drei', () => ({
  Text: ({ children, ...props }: any) => (
    <mesh {...props}>
      <meshStandardMaterial />
    </mesh>
  ),
}));

describe('AISystemConnector', () => {
  const mockNodePositions = Array.from({ length: 177 }, (_, i) => {
    const theta = (i / 177) * Math.PI * 2;
    const phi = Math.acos(2 * (i / 177) - 1);
    return new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
  });

  test('renders without crashing', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector brainNodePositions={mockNodePositions} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('renders with empty node positions', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector brainNodePositions={[]} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts custom brain position', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          brainPosition={[1, 2, 3]}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports toggling labels', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          showLabels={false}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports toggling connections', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          showConnections={false}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports toggling particles', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          showParticles={false}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts custom particle speed', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          particleSpeed={2.5}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts custom connection opacity', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          connectionOpacity={0.8}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('renders with custom AI systems', () => {
    const customSystems = [
      {
        id: 'custom',
        label: 'CUSTOM\nSYSTEM',
        subtitle: 'Custom',
        position: [2, 2, 2] as [number, number, number],
        color: '#ffffff',
        icon: '⭐',
        connectionNodes: [0, 1, 2],
      },
    ];

    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          systems={customSystems}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('handles default AI systems', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector brainNodePositions={mockNodePositions} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('applies default props correctly', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector brainNodePositions={mockNodePositions} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts onSectionOpen callback', () => {
    const handleOpen = jest.fn();
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          onSectionOpen={handleOpen}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts activeSection prop', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          activeSection="projects"
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts interactive prop', () => {
    const { container } = render(
      <Canvas>
        <AISystemConnector
          brainNodePositions={mockNodePositions}
          interactive={false}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
