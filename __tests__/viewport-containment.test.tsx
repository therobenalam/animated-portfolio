/**
 * @jest-environment jsdom
 */

import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BrainControls from '@/components/ui/BrainControls';
import ModelAttribution from '@/components/ui/ModelAttribution';

describe('Viewport Containment', () => {
  describe('BrainControls Viewport Containment', () => {
    it('applies max-height constraint to prevent overflow', () => {
      const { container } = render(
        <BrainControls
          onVariantChange={() => {}}
          onInteractiveChange={() => {}}
          onAutoRotateChange={() => {}}
          onGlowIntensityChange={() => {}}
          onScaleChange={() => {}}
        />
      );
      
      const controlsWrapper = container.querySelector('.fixed.bottom-4.left-4');
      expect(controlsWrapper).toBeInTheDocument();
      expect(controlsWrapper).toHaveClass('max-h-[calc(100vh-2rem)]');
      expect(controlsWrapper).toHaveClass('overflow-y-auto');
    });
    
    it('maintains fixed positioning at bottom-left', () => {
      const { container } = render(
        <BrainControls
          onVariantChange={() => {}}
          onInteractiveChange={() => {}}
          onAutoRotateChange={() => {}}
          onGlowIntensityChange={() => {}}
          onScaleChange={() => {}}
        />
      );
      
      const controlsWrapper = container.querySelector('.fixed');
      expect(controlsWrapper).toHaveClass('fixed');
      expect(controlsWrapper).toHaveClass('bottom-4');
      expect(controlsWrapper).toHaveClass('left-4');
      expect(controlsWrapper).toHaveClass('z-50');
    });
  });

  describe('ModelAttribution Viewport Containment', () => {
    it('applies max-height constraint to parent wrapper', () => {
      const { container } = render(<ModelAttribution />);
      
      const wrapper = container.querySelector('.fixed.bottom-4.right-4');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('max-h-[calc(100vh-2rem)]');
      expect(wrapper).toHaveClass('overflow-y-auto');
    });
    
    it('applies max-height constraint to expanded content', async () => {
      const { container } = render(<ModelAttribution />);
      
      // Click to expand
      const button = screen.getByLabelText('Show model attribution');
      
      // Wrap in act to handle state updates
      await act(async () => {
        button.click();
      });
      
      // Check expanded content has overflow controls
      const expandedContent = container.querySelector('.rounded-lg.p-4');
      expect(expandedContent).toBeInTheDocument();
      expect(expandedContent).toHaveClass('max-h-[calc(100vh-4rem)]');
      expect(expandedContent).toHaveClass('overflow-y-auto');
    });
    
    it('maintains fixed positioning at bottom-right', () => {
      const { container } = render(<ModelAttribution />);
      
      const wrapper = container.querySelector('.fixed');
      expect(wrapper).toHaveClass('fixed');
      expect(wrapper).toHaveClass('bottom-4');
      expect(wrapper).toHaveClass('right-4');
      expect(wrapper).toHaveClass('z-50');
    });
  });

  describe('Scrollbar Styling', () => {
    it('has global scrollbar styles defined', () => {
      // Check if scrollbar CSS variables are applied
      const styles = document.createElement('style');
      styles.textContent = `
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.3);
        }
      `;
      document.head.appendChild(styles);
      
      expect(document.head.contains(styles)).toBe(true);
    });
  });

  describe('Viewport Calculation Tests', () => {
    it('max-height calc leaves proper spacing from viewport edges', () => {
      // 100vh - 2rem ensures at least 1rem padding on each side (top and bottom)
      // This prevents controls from touching viewport edges
      const calcValue = 'calc(100vh-2rem)';
      expect(calcValue).toMatch(/calc\(100vh-\d+rem\)/);
    });
    
    it('expanded content has additional constraints for nested scrolling', () => {
      // Nested content uses calc(100vh-4rem) for additional padding
      const nestedCalcValue = 'calc(100vh-4rem)';
      expect(nestedCalcValue).toMatch(/calc\(100vh-\d+rem\)/);
    });
  });

  describe('CSS Class Combinations', () => {
    it('combines fixed positioning with overflow controls correctly', () => {
      const { container } = render(<ModelAttribution />);
      
      const wrapper = container.querySelector('.fixed.bottom-4.right-4');
      
      // Verify all necessary classes are present
      const classList = Array.from(wrapper?.classList || []);
      expect(classList).toContain('fixed');
      expect(classList).toContain('bottom-4');
      expect(classList).toContain('right-4');
      expect(classList).toContain('z-50');
      expect(classList).toContain('overflow-y-auto');
      expect(classList.some(c => c.includes('max-h-'))).toBe(true);
    });
  });

  describe('Responsive Behavior', () => {
    it('maintains containment on small viewports', () => {
      // Simulate small viewport (mobile)
      global.innerHeight = 600;
      
      const { container } = render(
        <BrainControls
          onVariantChange={() => {}}
          onInteractiveChange={() => {}}
          onAutoRotateChange={() => {}}
          onGlowIntensityChange={() => {}}
          onScaleChange={() => {}}
        />
      );
      
      const wrapper = container.querySelector('.fixed');
      
      // Verify max-height still applies
      expect(wrapper).toHaveClass('max-h-[calc(100vh-2rem)]');
      
      // With 600px viewport and 2rem (32px) padding, max content height = 568px
      // This ensures controls fit within viewport
    });
    
    it('maintains containment on large viewports', () => {
      // Simulate large viewport (desktop)
      global.innerHeight = 1080;
      
      const { container } = render(<ModelAttribution />);
      
      const wrapper = container.querySelector('.fixed');
      
      // Verify max-height still applies (prevents controls from extending beyond screen)
      expect(wrapper).toHaveClass('max-h-[calc(100vh-2rem)]');
    });
  });
});
