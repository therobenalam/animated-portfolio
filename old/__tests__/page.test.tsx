import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock Three.js WebGLRenderer to avoid WebGL context issues in tests
jest.mock('three', () => {
  const actualThree = jest.requireActual('three');
  return {
    ...actualThree,
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      setPixelRatio: jest.fn(),
      setClearColor: jest.fn(),
      render: jest.fn(),
      dispose: jest.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

describe('Home Page', () => {
  it('renders the main container', () => {
    render(<Home />)
    const main = document.querySelector('.main-container')
    expect(main).toBeInTheDocument()
  })

  it('renders the AIBrain component', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /AI Agent/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays neural network visualization text', () => {
    render(<Home />)
    const description = screen.getByText(/Neural Network Visualization/i)
    expect(description).toBeInTheDocument()
  })
})
