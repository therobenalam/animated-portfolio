import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BrainLayerControls from '@/components/ui/BrainLayerControls';

describe('BrainLayerControls', () => {
  const mockLayerOpacityChange = jest.fn();
  const mockVariantChange = jest.fn();
  const mockGlobalOpacityChange = jest.fn();

  const defaultProps = {
    availableLayers: ['Cortex', 'Cerebellum', 'BrainStem', 'WhiteMatter'],
    onLayerOpacityChange: mockLayerOpacityChange,
    onVariantChange: mockVariantChange,
    onGlobalOpacityChange: mockGlobalOpacityChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders collapsed button by default', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    expect(expandButton).toBeInTheDocument();
    expect(expandButton).toHaveTextContent('Layers');
  });

  it('expands to show layer controls when clicked', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    expect(screen.getByText('Brain Layers')).toBeInTheDocument();
    expect(screen.getByLabelText('Collapse controls')).toBeInTheDocument();
  });

  it('displays all available layers', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    expect(screen.getByText('Cortex')).toBeInTheDocument();
    expect(screen.getByText('Cerebellum')).toBeInTheDocument();
    expect(screen.getByText('Brainstem')).toBeInTheDocument(); // Note: cleaned up name
    expect(screen.getByText('Whitematter')).toBeInTheDocument();
  });

  it('shows correct layer count', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    expect(screen.getByText('4 layers')).toBeInTheDocument();
  });

  it('handles layer opacity changes', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    const sliders = screen.getAllByRole('slider');
    // First slider is global, rest are layer-specific
    const cortexSlider = sliders[1];
    
    fireEvent.change(cortexSlider, { target: { value: '0.5' } });
    
    expect(mockLayerOpacityChange).toHaveBeenCalledWith(
      expect.objectContaining({ Cortex: 0.5 })
    );
  });

  it('handles global opacity changes', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    const sliders = screen.getAllByRole('slider');
    const globalSlider = sliders[0]; // First slider is global opacity
    
    fireEvent.change(globalSlider, { target: { value: '0.7' } });
    
    expect(mockGlobalOpacityChange).toHaveBeenCalledWith(0.7);
  });

  it('handles animation variant changes', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    const scanButton = screen.getByText('Scan');
    fireEvent.click(scanButton);
    
    expect(mockVariantChange).toHaveBeenCalledWith('scanning');
  });

  it('resets individual layer opacity', () => {
    render(
      <BrainLayerControls
        {...defaultProps}
        initialLayerOpacities={{ Cortex: 0.3 }}
      />
    );
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    const resetButtons = screen.getAllByTitle('Reset to 100%');
    fireEvent.click(resetButtons[0]); // Reset Cortex
    
    expect(mockLayerOpacityChange).toHaveBeenCalledWith(
      expect.objectContaining({ Cortex: 1.0 })
    );
  });

  it('resets all layers to 100%', () => {
    render(
      <BrainLayerControls
        {...defaultProps}
        initialLayerOpacities={{
          Cortex: 0.5,
          Cerebellum: 0.3,
          BrainStem: 0.7,
          WhiteMatter: 0.2,
        }}
      />
    );
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    const resetAllButton = screen.getByText('Reset All Layers to 100%');
    fireEvent.click(resetAllButton);
    
    expect(mockLayerOpacityChange).toHaveBeenCalledWith({
      Cortex: 1.0,
      Cerebellum: 1.0,
      BrainStem: 1.0,
      WhiteMatter: 1.0,
    });
    expect(mockGlobalOpacityChange).toHaveBeenCalledWith(1.0);
  });

  it('initializes new layers to 100% opacity', () => {
    const { rerender } = render(<BrainLayerControls {...defaultProps} />);
    
    expect(mockLayerOpacityChange).toHaveBeenCalledWith({
      Cortex: 1.0,
      Cerebellum: 1.0,
      BrainStem: 1.0,
      WhiteMatter: 1.0,
    });
    
    // Add new layer
    rerender(
      <BrainLayerControls
        {...defaultProps}
        availableLayers={[...defaultProps.availableLayers, 'CorpusCallosum']}
      />
    );
    
    expect(mockLayerOpacityChange).toHaveBeenCalledWith(
      expect.objectContaining({ CorpusCallosum: 1.0 })
    );
  });

  it('displays loading state when no layers available', () => {
    render(
      <BrainLayerControls
        {...defaultProps}
        availableLayers={[]}
      />
    );
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    expect(screen.getByText('Loading layers...')).toBeInTheDocument();
    expect(screen.getByText('0 layers')).toBeInTheDocument();
  });

  it('displays opacity percentage correctly', () => {
    render(
      <BrainLayerControls
        {...defaultProps}
        initialLayerOpacities={{ Cortex: 0.75 }}
      />
    );
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    // Should show 75% for Cortex
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('collapses when close button is clicked', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    expect(screen.getByText('Brain Layers')).toBeInTheDocument();
    
    const collapseButton = screen.getByLabelText('Collapse controls');
    fireEvent.click(collapseButton);
    
    expect(screen.queryByText('Brain Layers')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Show layer controls')).toBeInTheDocument();
  });

  it('assigns appropriate icons to layers', () => {
    render(<BrainLayerControls {...defaultProps} />);
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    // Icons are rendered as text content, verify they exist
    const layerElements = screen.getAllByText(/🧠|🎯|🌿|⚪/);
    expect(layerElements.length).toBeGreaterThan(0);
  });

  it('cleans up layer display names', () => {
    render(
      <BrainLayerControls
        {...defaultProps}
        availableLayers={['Object_Cortex', 'Mesh_Cerebellum', 'brain_stem_lower']}
      />
    );
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    // Should clean up prefixes and underscores
    expect(screen.getByText('Cortex')).toBeInTheDocument();
    expect(screen.getByText('Cerebellum')).toBeInTheDocument();
    expect(screen.getByText('Brain Stem Lower')).toBeInTheDocument();
  });

  it('works without optional callbacks', () => {
    render(
      <BrainLayerControls
        availableLayers={defaultProps.availableLayers}
        onLayerOpacityChange={mockLayerOpacityChange}
      />
    );
    
    const expandButton = screen.getByLabelText('Show layer controls');
    fireEvent.click(expandButton);
    
    // Should not show animation or global opacity controls
    expect(screen.queryByText('Animation')).not.toBeInTheDocument();
    expect(screen.queryByText('Global Opacity')).not.toBeInTheDocument();
  });
});
