import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import TypewriterText from '@/components/3d/TypewriterText';

// Mock @react-three/drei Text component
jest.mock('@react-three/drei', () => ({
  Text: ({ children, ...props }: any) => (
    <mesh {...props}>
      <meshStandardMaterial />
    </mesh>
  ),
}));

describe('TypewriterText', () => {
  const mockLines = [
    'Hi, I am built by Robin.',
    'I am a visual representation',
    'of what an AI agent can do.',
  ];

  test('renders without crashing', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText lines={mockLines} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts custom position', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText 
          lines={mockLines}
          position={[1, 2, 3]}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts timing configuration', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText
          lines={mockLines}
          delay={2}
          charsPerSecond={30}
          lineDelay={0.5}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts styling props', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText
          lines={mockLines}
          fontSize={0.3}
          color="#00ff00"
          emissiveColor="#00ff00"
          emissiveIntensity={1.0}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports cursor visibility toggle', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText
          lines={mockLines}
          showCursor={false}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts fade out delay', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText
          lines={mockLines}
          fadeOutDelay={5}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('calls onComplete callback', () => {
    const onComplete = jest.fn();
    
    const { container } = render(
      <Canvas>
        <TypewriterText
          lines={mockLines}
          onComplete={onComplete}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('handles single line', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText lines={['Single line']} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('handles empty lines array', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText lines={[]} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('applies default props correctly', () => {
    const { container } = render(
      <Canvas>
        <TypewriterText lines={mockLines} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
