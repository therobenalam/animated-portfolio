import { render, screen, fireEvent } from '@testing-library/react';
import TerminalPanel from '@/components/ui/TerminalPanel';

describe('TerminalPanel', () => {
  const defaultProps = {
    sectionId: 'about',
    title: 'NEURAL CORE // About Me',
    accentColor: '#00ff88',
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders when open', () => {
    render(
      <TerminalPanel {...defaultProps}>
        <p>Test content</p>
      </TerminalPanel>
    );
    expect(screen.getByText('NEURAL CORE // About Me')).toBeTruthy();
    expect(screen.getByText('Test content')).toBeTruthy();
  });

  test('does not render when closed', () => {
    const { container } = render(
      <TerminalPanel {...defaultProps} isOpen={false}>
        <p>Hidden content</p>
      </TerminalPanel>
    );
    expect(container.textContent).toBe('');
  });

  test('shows close button', () => {
    render(
      <TerminalPanel {...defaultProps}>
        <p>Content</p>
      </TerminalPanel>
    );
    expect(screen.getByLabelText('Close NEURAL CORE // About Me')).toBeTruthy();
  });

  test('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(
      <TerminalPanel {...defaultProps} onClose={onClose}>
        <p>Content</p>
      </TerminalPanel>
    );
    fireEvent.click(screen.getByLabelText('Close NEURAL CORE // About Me'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose on Escape key', () => {
    const onClose = jest.fn();
    render(
      <TerminalPanel {...defaultProps} onClose={onClose}>
        <p>Content</p>
      </TerminalPanel>
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('renders blinking cursor', () => {
    render(
      <TerminalPanel {...defaultProps}>
        <p>Content</p>
      </TerminalPanel>
    );
    expect(screen.getByText('▊')).toBeTruthy();
  });

  test('accepts custom accent color', () => {
    render(
      <TerminalPanel {...defaultProps} accentColor="#ff00ff">
        <p>Content</p>
      </TerminalPanel>
    );
    expect(screen.getByText('NEURAL CORE // About Me')).toBeTruthy();
  });
});
