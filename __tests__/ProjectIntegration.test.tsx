import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// ─── Mocks ─────────────────────────────────────────────────────────
jest.mock('@/data/projects', () => ({
  projects: [
    {
      id: 'project-1',
      title: 'Test Project Alpha',
      description: 'Short description for Alpha',
      longDescription: 'Long detailed description for Alpha project with many words.',
      techStack: ['React', 'TypeScript'],
      category: 'ai' as const,
      brainZone: 'zone-frontal',
    },
    {
      id: 'project-2',
      title: 'Test Project Beta',
      description: 'Short description for Beta',
      longDescription: 'Long detailed description for Beta project.',
      techStack: ['Python', 'FastAPI'],
      category: 'engineering' as const,
      brainZone: 'zone-parietal',
    },
  ],
}));

jest.mock('@/data/brainZones', () => ({
  brainZones: [
    {
      id: 'zone-frontal',
      name: 'Neural Agent Framework',
      nodeIndices: [0, 1, 2],
      color: '#00ff88',
      projectId: 'project-1',
    },
    {
      id: 'zone-parietal',
      name: 'Real-Time Dashboard',
      nodeIndices: [60, 61, 62],
      color: '#00ddff',
      projectId: 'project-2',
    },
  ],
}));

// ─── Imports (after mocks) ─────────────────────────────────────────
import TerminalProjects from '@/components/sections/TerminalProjects';
import ProjectDetail from '@/components/sections/ProjectDetail';

// ─── TerminalProjects Tests ────────────────────────────────────────
describe('TerminalProjects', () => {
  it('renders all project cards in grid view', () => {
    render(<TerminalProjects />);
    expect(screen.getByText('Test Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Test Project Beta')).toBeInTheDocument();
    expect(screen.getByText('2 entries found')).toBeInTheDocument();
  });

  it('shows category badges', () => {
    render(<TerminalProjects />);
    expect(screen.getByText('AI / ML')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('shows tech stack tags for each project', () => {
    render(<TerminalProjects />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
  });

  it('shows zone color dots for projects with brainZone', () => {
    const { container } = render(<TerminalProjects />);
    // Both projects have brainZones → should have zone dots
    const dots = container.querySelectorAll('span[style*="background-color"]');
    expect(dots.length).toBeGreaterThanOrEqual(2);
  });

  it('opens detail view when a project card is clicked', () => {
    render(<TerminalProjects />);
    const card = screen.getByText('Test Project Alpha').closest('[class*="cursor-pointer"]');
    expect(card).toBeTruthy();
    fireEvent.click(card!);
    // Should now show the detail view with long description prompt
    expect(screen.getByText(/cat README.md/)).toBeInTheDocument();
  });

  it('calls onProjectHover with zone ID on card mouse enter', () => {
    const onHover = jest.fn();
    render(<TerminalProjects onProjectHover={onHover} />);
    const card = screen.getByText('Test Project Alpha').closest('[class*="cursor-pointer"]');
    fireEvent.mouseEnter(card!);
    expect(onHover).toHaveBeenCalledWith('zone-frontal');
  });

  it('calls onProjectHover with null on card mouse leave', () => {
    const onHover = jest.fn();
    render(<TerminalProjects onProjectHover={onHover} />);
    const card = screen.getByText('Test Project Alpha').closest('[class*="cursor-pointer"]');
    fireEvent.mouseEnter(card!);
    fireEvent.mouseLeave(card!);
    expect(onHover).toHaveBeenLastCalledWith(null);
  });

  it('highlights the matching card when highlightedZoneId is provided', () => {
    const { container } = render(
      <TerminalProjects highlightedZoneId="zone-frontal" />
    );
    // The highlighted card should show the BRAIN_ZONE indicator
    expect(screen.getByText(/BRAIN_ZONE: FRONTAL/)).toBeInTheDocument();
  });

  it('does NOT show zone indicator for non-highlighted cards', () => {
    render(<TerminalProjects highlightedZoneId="zone-frontal" />);
    // Only frontal should show zone indicator, not parietal
    expect(screen.queryByText(/BRAIN_ZONE: PARIETAL/)).not.toBeInTheDocument();
  });

  it('opens detail view when selectedProjectId is provided externally', () => {
    render(<TerminalProjects selectedProjectId="project-1" />);
    // Should auto-open detail view for project-1
    expect(screen.getByText(/cat README.md/)).toBeInTheDocument();
    expect(screen.getByText('Test Project Alpha')).toBeInTheDocument();
  });

  it('calls onProjectSelect when a card is clicked', () => {
    const onSelect = jest.fn();
    render(<TerminalProjects onProjectSelect={onSelect} />);
    const card = screen.getByText('Test Project Beta').closest('[class*="cursor-pointer"]');
    fireEvent.click(card!);
    expect(onSelect).toHaveBeenCalledWith('project-2');
  });
});

// ─── ProjectDetail Tests ───────────────────────────────────────────
describe('ProjectDetail', () => {
  const mockProject = {
    id: 'project-1',
    title: 'Test Project Alpha',
    description: 'Short description for Alpha',
    longDescription: 'Long detailed description for Alpha project with many words.',
    techStack: ['React', 'TypeScript'],
    category: 'ai' as const,
    brainZone: 'zone-frontal',
  };

  it('renders project title', () => {
    render(<ProjectDetail project={mockProject} onBack={jest.fn()} />);
    expect(screen.getByText('Test Project Alpha')).toBeInTheDocument();
  });

  it('renders category badge', () => {
    render(<ProjectDetail project={mockProject} onBack={jest.fn()} />);
    expect(screen.getByText('AI / ML')).toBeInTheDocument();
  });

  it('renders tech stack tags in zone color', () => {
    const { container } = render(
      <ProjectDetail project={mockProject} onBack={jest.fn()} />
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    // Tech tags should use zone color (#00ff88) — DOM converts hex to rgb
    const reactTag = screen.getByText('React');
    expect(reactTag.style.color).toBe('rgb(0, 255, 136)');
  });

  it('renders brain zone indicator', () => {
    render(<ProjectDetail project={mockProject} onBack={jest.fn()} />);
    expect(screen.getByText(/FRONTAL/)).toBeInTheDocument();
  });

  it('renders back button that calls onBack', () => {
    const onBack = jest.fn();
    render(<ProjectDetail project={mockProject} onBack={onBack} />);
    const backBtn = screen.getByText(/BACK TO PROJECTS/);
    fireEvent.click(backBtn.closest('button')!);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders the README.md terminal prompt', () => {
    render(<ProjectDetail project={mockProject} onBack={jest.fn()} />);
    expect(screen.getByText(/cat README.md/)).toBeInTheDocument();
  });

  it('renders dependencies terminal prompt', () => {
    render(<ProjectDetail project={mockProject} onBack={jest.fn()} />);
    expect(screen.getByText(/cat package.json/)).toBeInTheDocument();
  });

  it('shows project status footer', () => {
    render(<ProjectDetail project={mockProject} onBack={jest.fn()} />);
    expect(screen.getByText(/PROJECT_STATUS/)).toBeInTheDocument();
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
  });
});
