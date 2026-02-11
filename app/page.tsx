'use client';

import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import * as THREE from 'three';
import Scene from '@/components/3d/Scene';
import BrainModel from '@/components/3d/BrainModel';
import NetworkBrain from '@/components/3d/NetworkBrain';
import Background from '@/components/3d/Background';
import AnimatedText from '@/components/3d/AnimatedText';
import TypewriterText from '@/components/3d/TypewriterText';
import StreamOfThoughtText from '@/components/3d/StreamOfThoughtText';
import AISystemConnector from '@/components/3d/AISystemConnector';
import IntroSequence from '@/components/3d/IntroSequence';
import ModelAttribution from '@/components/ui/ModelAttribution';
import BrainControls from '@/components/ui/BrainControls';
import Loader from '@/components/ui/Loader';
import IntroOverlay from '@/components/ui/IntroOverlay';
import TerminalPanel from '@/components/ui/TerminalPanel';
import { brainZones } from '@/data/brainZones';
import { useIsMobile } from '@/utils/useMediaQuery';
import { NAV_SECTIONS } from '@/components/3d/AISystemConnector';
import { useFrame, useThree } from '@react-three/fiber';

// Lazy-loaded section content (code-split per section)
const TerminalAbout = lazy(() => import('@/components/sections/TerminalAbout'));
const TerminalProjects = lazy(() => import('@/components/sections/TerminalProjects'));
const TerminalBlog = lazy(() => import('@/components/sections/TerminalBlog'));
const TerminalContact = lazy(() => import('@/components/sections/TerminalContact'));
const TerminalSkills = lazy(() => import('@/components/sections/TerminalSkills'));

// App states
type AppState = 'LOADING' | 'INTRO' | 'HUB' | 'SECTION_OPEN';

/** Camera offset when panel is open — smoothly lerps */
function CameraController({ panelOpen, isMobile }: { panelOpen: boolean; isMobile: boolean }) {
  const { camera } = useThree();
  const targetX = panelOpen && !isMobile ? -1.2 : 0;
  useFrame(() => {
    camera.position.x += (targetX - camera.position.x) * 0.06;
  });
  return null;
}

/** Maps section IDs to display metadata */
const SECTION_META: Record<string, { title: string; color: string }> = {
  about:    { title: 'NEURAL CORE // About Me',    color: '#00ff88' },
  projects: { title: 'PROJECT MATRIX // Work',     color: '#ff8800' },
  blog:     { title: 'DATA FEED // Blog',           color: '#ff00ff' },
  contact:  { title: 'COMM LINK // Contact',        color: '#00ffff' },
  skills:   { title: 'SKILL VECTORS // Tech Stack', color: '#ffff00' },
};

export default function Home() {
  // Responsive
  const isMobile = useIsMobile();

  // Dev mode: only show controls when ?dev=true is in the URL
  const [isDevMode, setIsDevMode] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsDevMode(params.get('dev') === 'true');
  }, []);

  // ==================== STATE MACHINE ====================
  const [appState, setAppState] = useState<AppState>('LOADING');
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Check if intro should be skipped (repeat visit within session)
  const shouldSkipIntro = useCallback(() => {
    try {
      return sessionStorage.getItem('portfolio-intro-seen') === 'true';
    } catch {
      return false;
    }
  }, []);

  // Transition from LOADING → INTRO (or skip to HUB)
  const handleLoadComplete = useCallback(() => {
    if (shouldSkipIntro()) {
      setAppState('HUB');
    } else {
      setAppState('INTRO');
    }
  }, [shouldSkipIntro]);

  // Transition from INTRO → HUB
  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem('portfolio-intro-seen', 'true');
    } catch {}
    setAppState('HUB');
  }, []);

  // Skip intro immediately
  const handleSkipIntro = useCallback(() => {
    try {
      sessionStorage.setItem('portfolio-intro-seen', 'true');
    } catch {}
    setAppState('HUB');
  }, []);

  // Open a section (for future Phase 3/4)
  const handleSectionOpen = useCallback((sectionId: string) => {
    setOpenSection(sectionId);
    setAppState('SECTION_OPEN');
  }, []);

  // Close section → return to HUB
  const handleSectionClose = useCallback(() => {
    setOpenSection(null);
    setHoveredProjectZone(null);
    setSelectedProjectId(null);
    setAppState('HUB');
  }, []);

  // ── Phase 5: Bidirectional brain↔project sync ──
  // Zone hovered in the 3D brain (from NetworkBrain onZoneHover)
  const [hoveredBrainZone, setHoveredBrainZone] = useState<string | null>(null);
  // Zone to highlight on brain (from hovering a project card)
  const [hoveredProjectZone, setHoveredProjectZone] = useState<string | null>(null);
  // Project selected from a brain zone click (pre-opens detail view)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Handle brain zone click → open projects section + select project
  const handleZoneClick = useCallback((zoneId: string) => {
    const zone = brainZones.find((z) => z.id === zoneId);
    if (zone?.projectId) {
      setSelectedProjectId(zone.projectId);
      // If projects panel isn't open, open it
      if (openSection !== 'projects') {
        setOpenSection('projects');
        setAppState('SECTION_OPEN');
      }
    }
  }, [openSection]);

  // Is the intro currently playing?
  const isIntroPlaying = appState === 'INTRO';

  const [variant, setVariant] = useState<'idle' | 'thinking' | 'scanning' | 'pulsing'>('thinking');
  const [interactive, setInteractive] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(0.4);
  const [scale, setScale] = useState(1.3);
  const [useNetwork, setUseNetwork] = useState(true); // Network mode by default
  
  // Store brain node positions for AI connector
  const [brainNodePositions, setBrainNodePositions] = useState<THREE.Vector3[]>([]);
  
  // Shared rotation state for synchronized rotation
  const [sharedRotation, setSharedRotation] = useState({ 
    x: (0 * Math.PI) / 180,     // 0 degrees
    y: (-450 * Math.PI) / 180   // -450 degrees
  });
  
  // Layer visibility toggles
  const [showNodes, setShowNodes] = useState(true);
  const [showEdges, setShowEdges] = useState(true);
  const [showSkin, setShowSkin] = useState(false);
  const [showGlow, setShowGlow] = useState(true);
  
  // Texture/surface detail controls
  const [surfaceDetail, setSurfaceDetail] = useState(1.0);
  const [foldDepth, setFoldDepth] = useState(1.0);
  const [surfaceRoughness, setSurfaceRoughness] = useState(1.0);
  const [skinOpacity, setSkinOpacity] = useState(0.35);
  
  // NetworkBrain element opacity controls
  const [nodesOpacity, setNodesOpacity] = useState(0.9);
  const [edgesOpacity, setEdgesOpacity] = useState(0.4);
  const [networkGlowIntensity, setNetworkGlowIntensity] = useState(0.5);
  const [haloOpacity, setHaloOpacity] = useState(1.0); // NEW: Halo control
  
  // Model opacity controls
  const [networkOpacity, setNetworkOpacity] = useState(1.0);
  const [originalOpacity, setOriginalOpacity] = useState(1.0);
  
  // Environment background controls
  const [showEnvironment, setShowEnvironment] = useState(false);
  const [environmentIntensity, setEnvironmentIntensity] = useState(0.3);
  
  // Text animation style control
  const [textAnimationStyle, setTextAnimationStyle] = useState<'float' | 'typewriter' | 'stream'>('typewriter');
  
  // AI System Connector controls
  const [showAIConnectors, setShowAIConnectors] = useState(true);
  const [showAILabels, setShowAILabels] = useState(true);
  const [showAIConnections, setShowAIConnections] = useState(true);
  const [showAIParticles, setShowAIParticles] = useState(true);

  // Drag handler for synchronized rotation
  useEffect(() => {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      
      const rotationSpeed = 0.005;
      setSharedRotation(prev => ({
        x: prev.x + deltaY * rotationSpeed,
        y: prev.y + deltaX * rotationSpeed
      }));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Scope gesture prevention to canvas container
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = canvasContainerRef.current;
    if (!el) return;

    const prevent = (e: Event) => { e.preventDefault(); };
    const preventTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    el.addEventListener('gesturestart', prevent, { passive: false });
    el.addEventListener('gesturechange', prevent, { passive: false });
    el.addEventListener('gestureend', prevent, { passive: false });
    el.addEventListener('touchstart', preventTouch, { passive: false });
    el.addEventListener('touchmove', preventTouch, { passive: false });
    el.addEventListener('contextmenu', prevent);

    return () => {
      el.removeEventListener('gesturestart', prevent);
      el.removeEventListener('gesturechange', prevent);
      el.removeEventListener('gestureend', prevent);
      el.removeEventListener('touchstart', preventTouch);
      el.removeEventListener('touchmove', preventTouch);
      el.removeEventListener('contextmenu', prevent);
    };
  }, []);

  return (
    <main className="fixed inset-0 h-screen w-screen bg-black m-0 p-0">
      {/* Loading screen — triggers state transition when done */}
      <Loader onLoadComplete={handleLoadComplete} />

      {/* Intro overlay (cursor blink + skip button) — only during INTRO state */}
      <IntroOverlay
        appState={appState}
        onSkip={handleSkipIntro}
      />

      {/* Overlay view - both brains in same scene */}
      <div ref={canvasContainerRef} className="canvas-container relative h-full w-full">
        <Scene className="h-full w-full">
          {/* Camera offset when terminal panel is open */}
          <CameraController panelOpen={appState === 'SECTION_OPEN'} isMobile={isMobile} />

          {/* Optional Environment Background */}
          <Background 
            preset="city" 
            blur={0.7} 
            showBackground={showEnvironment}
            backgroundIntensity={environmentIntensity}
          />
          
          {/* NetworkBrain layer */}
          <NetworkBrain
            rotation={[sharedRotation.x, sharedRotation.y, 0]}
            disableScrollRotation={true}
            scale={isMobile ? 1.0 : 1.65}
            nodeCount={isMobile ? 100 : 177}
            pulseSpeed={variant === 'thinking' ? 1.5 : variant === 'scanning' ? 2 : variant === 'pulsing' ? 1 : 0.5}
            showNodes={showNodes}
            showEdges={showEdges}
            showSkin={showSkin}
            showGlow={showGlow}
            surfaceDetail={surfaceDetail}
            foldDepth={foldDepth}
            surfaceRoughness={surfaceRoughness}
            skinOpacity={skinOpacity}
            nodesOpacity={nodesOpacity}
            edgesOpacity={edgesOpacity}
            glowIntensity={networkGlowIntensity}
            opacity={networkOpacity}
            haloOpacity={haloOpacity}
            onNodePositionsUpdate={setBrainNodePositions}
            zoneInteractive={appState === 'HUB' || appState === 'SECTION_OPEN'}
            highlightedZone={hoveredProjectZone}
            onZoneHover={setHoveredBrainZone}
            onZoneClick={handleZoneClick}
          />
          
          {/* AI System Connectors — Navigation Hub */}
          {showAIConnectors && brainNodePositions.length > 0 && (
            <AISystemConnector
              brainNodePositions={brainNodePositions}
              showLabels={showAILabels}
              showConnections={showAIConnections}
              showParticles={showAIParticles}
              particleSpeed={1.5}
              connectionOpacity={0.3}
              onSectionOpen={handleSectionOpen}
              activeSection={openSection}
              interactive={appState === 'HUB' || appState === 'SECTION_OPEN'}
            />
          )}

          {/* Intro Sequence — plays inside the R3F scene */}
          <IntroSequence
            isPlaying={isIntroPlaying}
            onComplete={handleIntroComplete}
          />
          
          {/* Original BrainModel layer */}
          <BrainModel 
            position={[0, 0, 0]} 
            scale={scale} 
            variant={variant}
            interactive={false}
            autoRotate={autoRotate}
            glowIntensity={glowIntensity}
            rotation={[sharedRotation.x, sharedRotation.y, 0]}
            disableScrollRotation={true}
            opacity={originalOpacity}
          />
          
          {/* Text Animation - Dynamic style selection (only in HUB state) */}
          {!isIntroPlaying && textAnimationStyle === 'float' && (
            <AnimatedText
              lines={[
                "Hi, I am built by Robin.",
                "I am a visual representation",
                "of what an AI agent can do."
              ]}
              startPosition={[0, -0.5, 0]}
              endPosition={[0, 4.5, 0]}
              delay={1.5}
              duration={5}
              fontSize={0.22}
              color="#ffffff"
              emissiveColor="#4488ff"
              emissiveIntensity={0.8}
            />
          )}
          
          {!isIntroPlaying && textAnimationStyle === 'typewriter' && (
            <TypewriterText
              lines={[
                "Hi, I am built by Robin.",
                "I am a visual representation",
                "of what an AI agent can do."
              ]}
              position={[0, 1.5, 0]}
              delay={1.5}
              charsPerSecond={25}
              lineDelay={0.4}
              fontSize={0.2}
              color="#00ff00"
              emissiveColor="#00ff00"
              emissiveIntensity={0.9}
              showCursor={true}
              fadeOutDelay={3}
            />
          )}
          
          {!isIntroPlaying && textAnimationStyle === 'stream' && (
            <StreamOfThoughtText
              thoughts={[
                { text: "Hi...", delay: 0, duration: 1.2 },
                { text: "I am built by Robin", delay: 0.3, duration: 1.8 },
                { text: "An AI agent", delay: 0.3, duration: 1.5 },
                { text: "Learning", delay: 0.2, duration: 1.2 },
                { text: "Creating", delay: 0.2, duration: 1.2 },
                { text: "Demonstrating capabilities", delay: 0.2, duration: 2 },
                { text: "This is what I can do", delay: 0.3, duration: 2.5 },
              ]}
              position={[0, 1.5, 0]}
              initialDelay={1.5}
              fontSize={0.22}
              color="#ffffff"
              emissiveColor="#ff8844"
              emissiveIntensity={1.0}
              flowDirection="up"
              spacing={0.5}
            />
          )}
        </Scene>
        
        </div>
      
      {/* Dev-only controls - only visible with ?dev=true */}
      {isDevMode && (
        <>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/80 px-4 py-2 text-xs text-white backdrop-blur-sm shadow-lg">
            🔗 Network + 🧠 Original (Overlay)
          </div>
          
          {/* Toggle comparison mode */}
          <button
            onClick={() => setUseNetwork(!useNetwork)}
            className="fixed top-4 right-4 z-50 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-black/80 transition-colors shadow-lg"
          >
            {useNetwork ? '👁️ Comparison' : '🔄 Single View'}
          </button>
          
          {/* Text Animation Style Toggle */}
          <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 rounded-lg bg-black/60 p-3 backdrop-blur-sm max-h-[calc(100vh-5rem)] overflow-y-auto">
            <h3 className="text-xs font-semibold text-white mb-1">Text Style</h3>
            <button
              onClick={() => setTextAnimationStyle('typewriter')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                textAnimationStyle === 'typewriter'
                  ? 'bg-green-500/80 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              ⌨️ Typewriter
            </button>
            <button
              onClick={() => setTextAnimationStyle('stream')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                textAnimationStyle === 'stream'
                  ? 'bg-orange-500/80 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              💭 Stream of Thought
            </button>
            <button
              onClick={() => setTextAnimationStyle('float')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                textAnimationStyle === 'float'
                  ? 'bg-blue-500/80 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🎈 Float Up
            </button>
          </div>
        </>
      )}
      
      {/* Layer visibility toggles (dev mode only) */}
      {isDevMode && useNetwork && (
        <div className="fixed top-4 left-4 z-50 flex flex-col gap-2 rounded-lg bg-black/60 p-4 backdrop-blur-sm max-h-[calc(100vh-2rem)] overflow-y-auto">
          <h3 className="text-xs font-semibold text-white mb-1">Layer Visibility</h3>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showNodes}
              onChange={(e) => setShowNodes(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Nodes (Spheres)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showEdges}
              onChange={(e) => setShowEdges(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Edges (Lines)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showSkin}
              onChange={(e) => setShowSkin(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Skin (Surface)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showGlow}
              onChange={(e) => setShowGlow(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Glow (Light)</span>
          </label>
          
          <hr className="border-white/20 my-2" />
          
          <h3 className="text-xs font-semibold text-white mb-1">AI Systems</h3>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showAIConnectors}
              onChange={(e) => setShowAIConnectors(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Show AI Systems</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showAILabels}
              onChange={(e) => setShowAILabels(e.target.checked)}
              className="w-4 h-4"
              disabled={!showAIConnectors}
            />
            <span>System Labels</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showAIConnections}
              onChange={(e) => setShowAIConnections(e.target.checked)}
              className="w-4 h-4"
              disabled={!showAIConnectors}
            />
            <span>Connection Lines</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showAIParticles}
              onChange={(e) => setShowAIParticles(e.target.checked)}
              className="w-4 h-4"
              disabled={!showAIConnectors}
            />
            <span>Data Flow Particles</span>
          </label>
          
          <hr className="border-white/20 my-2" />
          
          <h3 className="text-xs font-semibold text-white mb-1">Environment</h3>
          <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showEnvironment}
              onChange={(e) => setShowEnvironment(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Show Environment Background</span>
          </label>
          {showEnvironment && (
            <label className="flex flex-col gap-1 text-xs text-white mt-2">
              <span>Background Intensity: {(environmentIntensity * 100).toFixed(0)}%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={environmentIntensity}
                onChange={(e) => setEnvironmentIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
            </label>
          )}
          
          <hr className="border-white/20 my-2" />
          
          <h3 className="text-xs font-semibold text-white mb-1">Element Opacity</h3>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>🔵 Halo (Outer Shell): {(haloOpacity * 100).toFixed(0)}%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={haloOpacity}
              onChange={(e) => setHaloOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>Nodes: {nodesOpacity.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={nodesOpacity}
              onChange={(e) => setNodesOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>Edges: {edgesOpacity.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={edgesOpacity}
              onChange={(e) => setEdgesOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>Glow Intensity: {networkGlowIntensity.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={networkGlowIntensity}
              onChange={(e) => setNetworkGlowIntensity(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>
          
          <hr className="border-white/20 my-2" />
          
          <h3 className="text-xs font-semibold text-white mb-1">Model Opacity</h3>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>Network Brain: {(networkOpacity * 100).toFixed(0)}%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={networkOpacity}
              onChange={(e) => setNetworkOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>Original Model: {(originalOpacity * 100).toFixed(0)}%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={originalOpacity}
              onChange={(e) => setOriginalOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>
          
          <hr className="border-white/20 my-2" />
          
          <h3 className="text-xs font-semibold text-white mb-1">Rotation Control</h3>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>X-Axis (Tilt): {(sharedRotation.x * 180 / Math.PI).toFixed(0)}°</span>
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step="0.05"
              value={sharedRotation.x}
              onChange={(e) => setSharedRotation(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-white">
            <span>Y-Axis (Spin): {(sharedRotation.y * 180 / Math.PI).toFixed(0)}°</span>
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step="0.05"
              value={sharedRotation.y}
              onChange={(e) => setSharedRotation(prev => ({ ...prev, y: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </label>
          <button
            onClick={() => setSharedRotation({ x: (0 * Math.PI) / 180, y: (-450 * Math.PI) / 180 })}
            className="mt-2 w-full rounded bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      )}
      
      {/* Dev-only brain controls */}
      {isDevMode && (
        <BrainControls
          onVariantChange={setVariant}
          onInteractiveChange={setInteractive}
          onAutoRotateChange={setAutoRotate}
          onGlowIntensityChange={setGlowIntensity}
          onScaleChange={setScale}
          initialVariant={variant}
          initialInteractive={interactive}
          initialAutoRotate={autoRotate}
          initialGlowIntensity={glowIntensity}
          initialScale={scale}
        />
      )}
      <ModelAttribution />

      {/* ── Terminal Panel (section content) ── */}
      {openSection && (
        <TerminalPanel
          sectionId={openSection}
          title={SECTION_META[openSection]?.title ?? openSection.toUpperCase()}
          accentColor={SECTION_META[openSection]?.color ?? '#00ffcc'}
          isOpen={appState === 'SECTION_OPEN'}
          onClose={handleSectionClose}
          fullScreen={isMobile}
        >
          <Suspense fallback={<div className="font-mono text-xs text-gray-500 animate-pulse p-4">{'>'} Loading module...</div>}>
            {openSection === 'about' && <TerminalAbout />}
            {openSection === 'projects' && (
              <TerminalProjects
                highlightedZoneId={hoveredBrainZone}
                onProjectHover={setHoveredProjectZone}
                selectedProjectId={selectedProjectId}
                onProjectSelect={setSelectedProjectId}
              />
            )}
            {openSection === 'blog' && <TerminalBlog />}
            {openSection === 'contact' && <TerminalContact />}
            {openSection === 'skills' && <TerminalSkills />}
          </Suspense>
        </TerminalPanel>
      )}

      {/* ── Mobile Navigation Bar ── */}
      {isMobile && (appState === 'HUB' || appState === 'SECTION_OPEN') && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 px-1"
          style={{
            background: 'rgba(0, 2, 8, 0.92)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}
          aria-label="Section navigation"
        >
          {NAV_SECTIONS.map((section) => {
            const isActive = openSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionOpen(section.id)}
                className="flex flex-col items-center gap-0.5 px-2 py-1 rounded transition-colors"
                style={{
                  color: isActive ? section.color : 'rgba(255,255,255,0.45)',
                }}
                aria-label={section.subtitle}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-base">{section.icon}</span>
                <span className="text-[9px] font-mono tracking-wider uppercase">
                  {section.subtitle}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </main>
  );
}
