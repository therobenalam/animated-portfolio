import { render, screen, fireEvent } from '@testing-library/react'
import AIBrain from '@/components/AIBrain'

describe('AIBrain Component', () => {
  it('renders the canvas element', () => {
    render(<AIBrain />)
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('renders the AI Agent title', () => {
    render(<AIBrain />)
    const heading = screen.getByRole('heading', { name: /AI Agent/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(<AIBrain />)
    const subtitle = screen.getByText(/Neural Network Visualization/i)
    expect(subtitle).toBeInTheDocument()
  })

  it('applies the correct container class', () => {
    const { container } = render(<AIBrain />)
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('container')
  })

  it('applies the correct canvas class', () => {
    render(<AIBrain />)
    const canvas = document.querySelector('canvas')
    expect(canvas).toHaveClass('canvas')
  })

  it('tracks mouse movement', () => {
    render(<AIBrain />)
    
    // Simulate mouse move
    fireEvent.mouseMove(window, { clientX: 100, clientY: 200 })
    
    // Component should handle mouse events without errors
    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  it('handles resize events', () => {
    render(<AIBrain />)
    
    // Simulate window resize
    fireEvent.resize(window)
    
    // Component should handle resize without errors
    expect(document.querySelector('canvas')).toBeInTheDocument()
  })
})
