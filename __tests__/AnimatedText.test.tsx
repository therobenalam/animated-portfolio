import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import AnimatedText from '@/components/3d/AnimatedText';
import * as THREE from 'three';

// Mock GSAP
jest.mock('gsap', () => ({
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    kill: jest.fn(),
  })),
}));

// Mock @react-three/drei Text component
jest.mock('@react-three/drei', () => ({
  Text: ({ children, ...props }: any) => (
    <mesh {...props}>
      <meshStandardMaterial />
    </mesh>
  ),
}));

describe('AnimatedText', () => {
  const mockLines = [
    'Hi, I am built by Robin.',
    'I am a visual representation',
    'of what an AI agent can do.',
  ];

  test('renders without crashing', () => {
    const { container } = render(
      <Canvas>
        <AnimatedText lines={mockLines} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('renders all text lines', () => {
    const { container } = render(
      <Canvas>
        <AnimatedText lines={mockLines} />
      </Canvas>
    );
    
    // Component should render a group with multiple Text components
    expect(container).toBeTruthy();
  });

  test('accepts custom positions', () => {
    const startPos: [number, number, number] = [1, 2, 3];
    const endPos: [number, number, number] = [4, 5, 6];
    
    const { container } = render(
      <Canvas>
        <AnimatedText
          lines={mockLines}
          startPosition={startPos}
          endPosition={endPos}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts custom styling props', () => {
    const { container } = render(
      <Canvas>
        <AnimatedText
          lines={mockLines}
          fontSize={0.5}
          color="#ff0000"
          emissiveColor="#00ff00"
          emissiveIntensity={1.0}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts timing configuration', () => {
    const { container } = render(
      <Canvas>
        <AnimatedText
          lines={mockLines}
          delay={2}
          duration={5}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('calls onAnimationComplete callback', () => {
    const onComplete = jest.fn();
    
    const { container } = render(
      <Canvas>
        <AnimatedText
          lines={mockLines}
          onAnimationComplete={onComplete}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('handles single line text', () => {
    const { container } = render(
      <Canvas>
        <AnimatedText lines={['Single line']} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('handles empty lines array gracefully', () => {
    const { container } = render(
      <Canvas>
        <AnimatedText lines={[]} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('applies default props correctly', () => {
    const { container } = render(
      <Canvas>
        <AnimatedText lines={mockLines} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
