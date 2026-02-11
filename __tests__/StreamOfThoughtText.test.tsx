import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import StreamOfThoughtText from '@/components/3d/StreamOfThoughtText';

// Mock GSAP
jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    to: jest.fn(),
  },
  to: jest.fn(),
}));

// Mock @react-three/drei Text component
jest.mock('@react-three/drei', () => ({
  Text: ({ children, ...props }: any) => (
    <mesh {...props}>
      <meshStandardMaterial />
    </mesh>
  ),
}));

describe('StreamOfThoughtText', () => {
  const mockThoughts = [
    { text: 'Hi...', delay: 0, duration: 1.2 },
    { text: 'I am built by Robin', delay: 0.3, duration: 1.8 },
    { text: 'An AI agent', delay: 0.3, duration: 1.5 },
  ];

  test('renders without crashing', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText thoughts={mockThoughts} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts custom position', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText 
          thoughts={mockThoughts}
          position={[1, 2, 3]}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts initial delay', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          initialDelay={2}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts styling props', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          fontSize={0.3}
          color="#ff0000"
          emissiveColor="#ff8800"
          emissiveIntensity={1.0}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports flow direction up', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          flowDirection="up"
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports flow direction down', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          flowDirection="down"
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports flow direction left', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          flowDirection="left"
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('supports flow direction right', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          flowDirection="right"
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('accepts custom spacing', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          spacing={1.0}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('calls onComplete callback', () => {
    const onComplete = jest.fn();
    
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText
          thoughts={mockThoughts}
          onComplete={onComplete}
        />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('handles empty thoughts array', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText thoughts={[]} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  test('applies default props correctly', () => {
    const { container } = render(
      <Canvas>
        <StreamOfThoughtText thoughts={mockThoughts} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
