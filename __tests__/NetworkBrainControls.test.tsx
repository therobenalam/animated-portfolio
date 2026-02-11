import { render, screen, fireEvent } from '@testing-library/react';
import NetworkBrainControls from '@/components/ui/NetworkBrainControls';

describe('NetworkBrainControls', () => {
  const mockCallbacks = {
    onSkinOpacityChange: jest.fn(),
    onSurfaceDetailChange: jest.fn(),
    onFoldDepthChange: jest.fn(),
    onSurfaceRoughnessChange: jest.fn(),
    onSkinColorChange: jest.fn(),
    onShowSkinChange: jest.fn(),
    onGlowIntensityChange: jest.fn(),
    onGlowColorChange: jest.fn(),
    onShowGlowChange: jest.fn(),
    onNodesOpacityChange: jest.fn(),
    onEdgesOpacityChange: jest.fn(),
    onNodeColorChange: jest.fn(),
    onEdgeColorChange: jest.fn(),
    onShowNodesChange: jest.fn(),
    onShowEdgesChange: jest.fn(),
    onPulseSpeedChange: jest.fn(),
    onAnimatedChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders collapsed button initially', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    expect(screen.getByText('Network Controls')).toBeInTheDocument();
  });

  test('expands to show full controls when clicked', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    
    const expandButton = screen.getByLabelText('Show NetworkBrain controls');
    fireEvent.click(expandButton);

    expect(screen.getByText('NetworkBrain Controls')).toBeInTheDocument();
  });

  test('collapses when close button is clicked', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    
    // Expand
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    expect(screen.getByText('NetworkBrain Controls')).toBeInTheDocument();

    // Collapse
    fireEvent.click(screen.getByLabelText('Collapse controls'));
    expect(screen.queryByText('NetworkBrain Controls')).not.toBeInTheDocument();
  });

  test('displays all tabs', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    expect(screen.getByText('Skin')).toBeInTheDocument();
    expect(screen.getByText('Glow')).toBeInTheDocument();
    expect(screen.getByText('Network')).toBeInTheDocument();
    expect(screen.getByText('Animation')).toBeInTheDocument();
  });

  test('switches between tabs', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    // Default is skin tab
    expect(screen.getByText('Show Skin')).toBeInTheDocument();

    // Click glow tab
    fireEvent.click(screen.getByText('Glow'));
    expect(screen.getByText('Show Glow')).toBeInTheDocument();

    // Click network tab
    fireEvent.click(screen.getByText('Network'));
    expect(screen.getByText('Nodes (Dots)')).toBeInTheDocument();

    // Click animation tab
    fireEvent.click(screen.getByText('Animation'));
    expect(screen.getByText('Enable Animation')).toBeInTheDocument();
  });

  test('skin opacity slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} initialSkinOpacity={0.35} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const slider = screen.getByLabelText('Opacity');
    expect(slider).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: '0.7' } });
    expect(mockCallbacks.onSkinOpacityChange).toHaveBeenCalledWith(0.7);
  });

  test('surface detail slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const slider = screen.getByLabelText('Surface Detail');
    fireEvent.change(slider, { target: { value: '1.5' } });
    expect(mockCallbacks.onSurfaceDetailChange).toHaveBeenCalledWith(1.5);
  });

  test('fold depth slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const slider = screen.getByLabelText('Fold Depth');
    fireEvent.change(slider, { target: { value: '0.8' } });
    expect(mockCallbacks.onFoldDepthChange).toHaveBeenCalledWith(0.8);
  });

  test('surface roughness slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const slider = screen.getByLabelText('Surface Roughness');
    fireEvent.change(slider, { target: { value: '1.2' } });
    expect(mockCallbacks.onSurfaceRoughnessChange).toHaveBeenCalledWith(1.2);
  });

  test('skin color picker calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const colorInput = screen.getByLabelText('Skin Color');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
    expect(mockCallbacks.onSkinColorChange).toHaveBeenCalledWith('#ff0000');
  });

  test('show skin toggle calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} initialShowSkin={true} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const toggle = screen.getByText('Show Skin').closest('div')?.querySelector('button');
    fireEvent.click(toggle!);
    expect(mockCallbacks.onShowSkinChange).toHaveBeenCalledWith(false);
  });

  test('glow intensity slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    fireEvent.click(screen.getByText('Glow'));

    const slider = screen.getByLabelText('Glow Intensity');
    fireEvent.change(slider, { target: { value: '1.5' } });
    expect(mockCallbacks.onGlowIntensityChange).toHaveBeenCalledWith(1.5);
  });

  test('glow color picker calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    fireEvent.click(screen.getByText('Glow'));

    const colorInput = screen.getByLabelText('Glow Color');
    fireEvent.change(colorInput, { target: { value: '#00ff00' } });
    expect(mockCallbacks.onGlowColorChange).toHaveBeenCalledWith('#00ff00');
  });

  test('show glow toggle calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} initialShowGlow={true} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    fireEvent.click(screen.getByText('Glow'));

    const toggle = screen.getByText('Show Glow').closest('div')?.querySelector('button');
    fireEvent.click(toggle!);
    expect(mockCallbacks.onShowGlowChange).toHaveBeenCalledWith(false);
  });

  test('nodes opacity slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    fireEvent.click(screen.getByText('Network'));

    const slider = screen.getByLabelText('Nodes Opacity');
    fireEvent.change(slider, { target: { value: '0.5' } });
    expect(mockCallbacks.onNodesOpacityChange).toHaveBeenCalledWith(0.5);
  });

  test('edges opacity slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    fireEvent.click(screen.getByText('Network'));

    const slider = screen.getByLabelText('Edges Opacity');
    fireEvent.change(slider, { target: { value: '0.6' } });
    expect(mockCallbacks.onEdgesOpacityChange).toHaveBeenCalledWith(0.6);
  });

  test('pulse speed slider calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    fireEvent.click(screen.getByText('Animation'));

    const slider = screen.getByLabelText('Pulse Speed');
    fireEvent.change(slider, { target: { value: '2.5' } });
    expect(mockCallbacks.onPulseSpeedChange).toHaveBeenCalledWith(2.5);
  });

  test('animated toggle calls callback', () => {
    render(<NetworkBrainControls {...mockCallbacks} initialAnimated={true} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));
    fireEvent.click(screen.getByText('Animation'));

    const toggle = screen.getByText('Enable Animation').closest('div')?.querySelector('button');
    fireEvent.click(toggle!);
    expect(mockCallbacks.onAnimatedChange).toHaveBeenCalledWith(false);
  });

  test('displays all presets', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    expect(screen.getByText('default')).toBeInTheDocument();
    expect(screen.getByText('ghost')).toBeInTheDocument();
    expect(screen.getByText('neon')).toBeInTheDocument();
    expect(screen.getByText('medical')).toBeInTheDocument();
  });

  test('applies preset when clicked', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const neonPreset = screen.getByText('neon');
    fireEvent.click(neonPreset);

    // Verify neon preset values are applied
    expect(mockCallbacks.onSkinOpacityChange).toHaveBeenCalledWith(0.6);
    expect(mockCallbacks.onGlowIntensityChange).toHaveBeenCalledWith(1.5);
    expect(mockCallbacks.onSkinColorChange).toHaveBeenCalledWith('#ff00ff');
    expect(mockCallbacks.onPulseSpeedChange).toHaveBeenCalledWith(2.0);
  });

  test('reset button applies default preset', () => {
    render(<NetworkBrainControls {...mockCallbacks} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const resetButton = screen.getByText('Reset to Defaults');
    fireEvent.click(resetButton);

    expect(mockCallbacks.onSkinOpacityChange).toHaveBeenCalledWith(0.35);
    expect(mockCallbacks.onGlowIntensityChange).toHaveBeenCalledWith(0.5);
    expect(mockCallbacks.onPulseSpeedChange).toHaveBeenCalledWith(1.0);
  });

  test('disables controls when layer is hidden', () => {
    render(<NetworkBrainControls {...mockCallbacks} initialShowSkin={false} />);
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    const opacitySlider = screen.getByLabelText('Opacity');
    expect(opacitySlider).toBeDisabled();

    const colorInput = screen.getByLabelText('Skin Color');
    expect(colorInput).toBeDisabled();
  });

  test('uses initial values from props', () => {
    render(
      <NetworkBrainControls
        {...mockCallbacks}
        initialSkinOpacity={0.8}
        initialGlowIntensity={1.2}
        initialPulseSpeed={2.0}
      />
    );
    fireEvent.click(screen.getByLabelText('Show NetworkBrain controls'));

    expect(screen.getByText('0.80')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Glow'));
    expect(screen.getByText('1.20')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Animation'));
    expect(screen.getByText('2.00x')).toBeInTheDocument();
  });
});
