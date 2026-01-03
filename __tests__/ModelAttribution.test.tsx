import { render, screen, fireEvent } from '@testing-library/react';
import ModelAttribution from '@/components/ui/ModelAttribution';
import '@testing-library/jest-dom';

describe('ModelAttribution', () => {
  describe('Rendering', () => {
    it('should render collapsed by default', () => {
      render(<ModelAttribution />);
      const button = screen.getByRole('button', { name: /show model attribution/i });
      expect(button).toBeInTheDocument();
    });

    it('should display info button with icon', () => {
      render(<ModelAttribution />);
      const button = screen.getByText(/ⓘ Model Info/i);
      expect(button).toBeInTheDocument();
    });

    it('should be positioned in bottom-right corner', () => {
      const { container } = render(<ModelAttribution />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('fixed', 'bottom-4', 'right-4');
    });
  });

  describe('Interaction', () => {
    it('should expand when info button is clicked', () => {
      render(<ModelAttribution />);
      const button = screen.getByRole('button', { name: /show model attribution/i });
      fireEvent.click(button);
      
      expect(screen.getByText('3D Model Attribution')).toBeInTheDocument();
    });

    it('should collapse when close button is clicked', () => {
      render(<ModelAttribution />);
      
      // Expand
      const infoButton = screen.getByRole('button', { name: /show model attribution/i });
      fireEvent.click(infoButton);
      
      // Collapse
      const closeButton = screen.getByRole('button', { name: /collapse/i });
      fireEvent.click(closeButton);
      
      expect(screen.queryByText('3D Model Attribution')).not.toBeInTheDocument();
    });

    it('should toggle between expanded and collapsed states', () => {
      render(<ModelAttribution />);
      
      // Initial state: collapsed
      expect(screen.queryByText('3D Model Attribution')).not.toBeInTheDocument();
      
      // Expand
      fireEvent.click(screen.getByRole('button', { name: /show model attribution/i }));
      expect(screen.getByText('3D Model Attribution')).toBeInTheDocument();
      
      // Collapse
      fireEvent.click(screen.getByRole('button', { name: /collapse/i }));
      expect(screen.queryByText('3D Model Attribution')).not.toBeInTheDocument();
    });
  });

  describe('Attribution Content', () => {
    beforeEach(() => {
      render(<ModelAttribution />);
      const button = screen.getByRole('button', { name: /show model attribution/i });
      fireEvent.click(button);
    });

    it('should display author name', () => {
      expect(screen.getByText(/Yash_Dandavate/i)).toBeInTheDocument();
    });

    it('should display model name', () => {
      expect(screen.getByText(/human-brain/i)).toBeInTheDocument();
    });

    it('should display license type', () => {
      expect(screen.getByText(/CC-BY-4.0/i)).toBeInTheDocument();
    });

    it('should have link to Sketchfab model', () => {
      const link = screen.getByRole('link', { name: /human-brain/i });
      expect(link).toHaveAttribute(
        'href',
        'https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784'
      );
    });

    it('should have link to author profile', () => {
      const link = screen.getByRole('link', { name: /Yash_Dandavate/i });
      expect(link).toHaveAttribute(
        'href',
        'https://sketchfab.com/Yash_Dandavate'
      );
    });

    it('should have link to CC-BY-4.0 license', () => {
      const link = screen.getByRole('link', { name: /CC-BY-4.0/i });
      expect(link).toHaveAttribute(
        'href',
        'http://creativecommons.org/licenses/by/4.0/'
      );
    });

    it('should open links in new tab', () => {
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Styling', () => {
    it('should have proper z-index for overlay', () => {
      const { container } = render(<ModelAttribution />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('z-50');
    });

    it('should have backdrop blur when expanded', () => {
      render(<ModelAttribution />);
      const button = screen.getByRole('button', { name: /show model attribution/i });
      fireEvent.click(button);
      
      const expandedPanel = screen.getByText('3D Model Attribution').closest('div.backdrop-blur-sm');
      expect(expandedPanel).toBeInTheDocument();
    });

    it('should be responsive with max-width', () => {
      render(<ModelAttribution />);
      fireEvent.click(screen.getByRole('button', { name: /show model attribution/i }));
      
      const expandedPanel = screen.getByText('3D Model Attribution').closest('.max-w-md');
      expect(expandedPanel).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<ModelAttribution />);
      expect(screen.getByLabelText('Show model attribution')).toBeInTheDocument();
    });

    it('should have proper ARIA label for close button', () => {
      render(<ModelAttribution />);
      fireEvent.click(screen.getByRole('button', { name: /show model attribution/i }));
      expect(screen.getByLabelText('Collapse')).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(<ModelAttribution />);
      const button = screen.getByRole('button', { name: /show model attribution/i });
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicking', () => {
      render(<ModelAttribution />);
      let infoButton = screen.getByRole('button', { name: /show model attribution/i });
      
      fireEvent.click(infoButton);
      const closeButton = screen.getByRole('button', { name: /collapse/i });
      fireEvent.click(closeButton);
      infoButton = screen.getByRole('button', { name: /show model attribution/i });
      fireEvent.click(infoButton);
      
      expect(screen.getByText('3D Model Attribution')).toBeInTheDocument();
    });

    it('should maintain state across re-renders', () => {
      const { rerender } = render(<ModelAttribution />);
      
      fireEvent.click(screen.getByRole('button', { name: /show model attribution/i }));
      expect(screen.getByText('3D Model Attribution')).toBeInTheDocument();
      
      rerender(<ModelAttribution />);
      expect(screen.getByText('3D Model Attribution')).toBeInTheDocument();
    });
  });
});
