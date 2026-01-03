import { render, screen, fireEvent } from '@testing-library/react';
import BrainControls from '@/components/ui/BrainControls';
import '@testing-library/jest-dom';

describe('BrainControls', () => {
  const mockCallbacks = {
    onVariantChange: jest.fn(),
    onInteractiveChange: jest.fn(),
    onAutoRotateChange: jest.fn(),
    onGlowIntensityChange: jest.fn(),
    onScaleChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render collapsed by default', () => {
      render(<BrainControls {...mockCallbacks} />);
      expect(screen.getByText('Controls')).toBeInTheDocument();
    });

    it('should expand when controls button is clicked', () => {
      render(<BrainControls {...mockCallbacks} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
      expect(screen.getByText('Brain Controls')).toBeInTheDocument();
    });

    it('should collapse when close button is clicked', () => {
      render(<BrainControls {...mockCallbacks} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
      fireEvent.click(screen.getByRole('button', { name: /collapse controls/i }));
      expect(screen.queryByText('Brain Controls')).not.toBeInTheDocument();
    });
  });

  describe('Variant Selection', () => {
    beforeEach(() => {
      render(<BrainControls {...mockCallbacks} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
    });

    it('should display all 4 variant options', () => {
      expect(screen.getByText('Idle')).toBeInTheDocument();
      expect(screen.getByText('Thinking')).toBeInTheDocument();
      expect(screen.getByText('Scanning')).toBeInTheDocument();
      expect(screen.getByText('Pulsing')).toBeInTheDocument();
    });

    it('should call onVariantChange when idle is clicked', () => {
      fireEvent.click(screen.getByText('Idle'));
      expect(mockCallbacks.onVariantChange).toHaveBeenCalledWith('idle');
    });

    it('should call onVariantChange when thinking is clicked', () => {
      fireEvent.click(screen.getByText('Thinking'));
      expect(mockCallbacks.onVariantChange).toHaveBeenCalledWith('thinking');
    });

    it('should call onVariantChange when scanning is clicked', () => {
      fireEvent.click(screen.getByText('Scanning'));
      expect(mockCallbacks.onVariantChange).toHaveBeenCalledWith('scanning');
    });

    it('should call onVariantChange when pulsing is clicked', () => {
      fireEvent.click(screen.getByText('Pulsing'));
      expect(mockCallbacks.onVariantChange).toHaveBeenCalledWith('pulsing');
    });
  });

  describe('Toggle Switches', () => {
    beforeEach(() => {
      render(<BrainControls {...mockCallbacks} initialInteractive={true} initialAutoRotate={true} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
    });

    it('should toggle interactive mode', () => {
      const toggle = screen.getByRole('button', { name: /toggle interactive mode/i });
      fireEvent.click(toggle);
      expect(mockCallbacks.onInteractiveChange).toHaveBeenCalledWith(false);
    });

    it('should toggle auto-rotate', () => {
      const toggle = screen.getByRole('button', { name: /toggle auto-rotation/i });
      fireEvent.click(toggle);
      expect(mockCallbacks.onAutoRotateChange).toHaveBeenCalledWith(false);
    });

    it('should toggle interactive mode back on', () => {
      const toggle = screen.getByRole('button', { name: /toggle interactive mode/i });
      fireEvent.click(toggle); // Turn off
      fireEvent.click(toggle); // Turn back on
      expect(mockCallbacks.onInteractiveChange).toHaveBeenLastCalledWith(true);
    });
  });

  describe('Sliders', () => {
    beforeEach(() => {
      render(<BrainControls {...mockCallbacks} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
    });

    it('should update glow intensity', () => {
      const slider = screen.getByDisplayValue('0.4');
      fireEvent.change(slider, { target: { value: '0.7' } });
      expect(mockCallbacks.onGlowIntensityChange).toHaveBeenCalledWith(0.7);
    });

    it('should update scale', () => {
      const sliders = screen.getAllByRole('slider');
      const scaleSlider = sliders[1]; // Second slider is scale
      fireEvent.change(scaleSlider, { target: { value: '2.5' } });
      expect(mockCallbacks.onScaleChange).toHaveBeenCalledWith(2.5);
    });

    it('should display current glow intensity value', () => {
      expect(screen.getByText('0.4')).toBeInTheDocument();
    });

    it('should display current scale value', () => {
      expect(screen.getByText('1.5x')).toBeInTheDocument();
    });
  });

  describe('Reset Button', () => {
    it('should reset all values to defaults', () => {
      render(<BrainControls {...mockCallbacks} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));

      // Change values
      fireEvent.click(screen.getByText('Idle'));
      const interactiveToggle = screen.getByRole('button', { name: /toggle interactive mode/i });
      fireEvent.click(interactiveToggle);

      // Reset
      fireEvent.click(screen.getByText('Reset to Defaults'));

      // Check all defaults were called
      expect(mockCallbacks.onVariantChange).toHaveBeenCalledWith('thinking');
      expect(mockCallbacks.onInteractiveChange).toHaveBeenCalledWith(true);
      expect(mockCallbacks.onAutoRotateChange).toHaveBeenCalledWith(true);
      expect(mockCallbacks.onGlowIntensityChange).toHaveBeenCalledWith(0.4);
      expect(mockCallbacks.onScaleChange).toHaveBeenCalledWith(1.5);
    });
  });

  describe('Initial Values', () => {
    it('should use provided initial values', () => {
      render(
        <BrainControls
          {...mockCallbacks}
          initialVariant="scanning"
          initialInteractive={false}
          initialAutoRotate={false}
          initialGlowIntensity={0.8}
          initialScale={2.0}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));

      expect(screen.getByText('0.8')).toBeInTheDocument();
      expect(screen.getByText('2.0x')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<BrainControls {...mockCallbacks} />);
      expect(screen.getByLabelText('Show brain controls')).toBeInTheDocument();
    });

    it('should have ARIA labels for toggles', () => {
      render(<BrainControls {...mockCallbacks} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
      
      expect(screen.getByLabelText('Toggle interactive mode')).toBeInTheDocument();
      expect(screen.getByLabelText('Toggle auto-rotation')).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(<BrainControls {...mockCallbacks} />);
      const button = screen.getByRole('button', { name: /show brain controls/i });
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Visual Feedback', () => {
    it('should highlight selected variant', () => {
      render(<BrainControls {...mockCallbacks} initialVariant="thinking" />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
      
      const thinkingButton = screen.getByText('Thinking').closest('button');
      expect(thinkingButton).toHaveClass('bg-blue-500');
    });

    it('should show emojis for each variant', () => {
      render(<BrainControls {...mockCallbacks} />);
      fireEvent.click(screen.getByRole('button', { name: /show brain controls/i }));
      
      expect(screen.getByText('💤')).toBeInTheDocument(); // Idle
      expect(screen.getByText('🧠')).toBeInTheDocument(); // Thinking
      expect(screen.getByText('🔍')).toBeInTheDocument(); // Scanning
      expect(screen.getByText('💓')).toBeInTheDocument(); // Pulsing
    });
  });
});
