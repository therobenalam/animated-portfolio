'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './AIBrain.module.css'

export default function AIBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Brain configuration - anatomically accurate proportions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const brainScale = 120
    
    // Anatomical proportions: width:length:height ≈ 1.5:1.8:1
    const brainWidth = brainScale * 1.5  // 180
    const brainLength = brainScale * 1.8 // 216
    const brainHeight = brainScale * 1.0 // 120
    
    type Node = {
      x: number
      y: number
      z: number // Added for 3D projection
      vx: number
      vy: number
      baseX: number
      baseY: number
      baseZ: number
      hemisphere: 'left' | 'right' // Brain has two hemispheres
      region: 'frontal' | 'temporal' | 'parietal' | 'occipital' // Anatomical lobes
    }
    
    const nodes: Node[] = []
    const connections: { from: number; to: number; strength: number }[] = []
    const numNodes = 150 // More nodes for detailed brain shape
    
    // Natural interaction physics
    const mouseInfluence = 0.06
    const maxDisplacement = 20
    const influenceRadius = 220
    const smoothing = 0.06
    const deadZone = 5

    // Optimal cinematic viewing angles (from research)
    const viewYaw = 45 * (Math.PI / 180)    // 45° three-quarter view
    const viewPitch = 20 * (Math.PI / 180)  // 20° elevated view
    
    // 3D rotation matrices for cinematic angle
    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: x * cos + z * sin,
        y: y,
        z: -x * sin + z * cos
      }
    }
    
    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: x,
        y: y * cos - z * sin,
        z: y * sin + z * cos
      }
    }

    // Helper function: Create brain-shaped distribution with gyri/sulci (wrinkles)
    const getBrainPosition = (theta: number, phi: number, hemisphere: 'left' | 'right') => {
      // Ellipsoidal base shape
      let x = Math.sin(phi) * Math.cos(theta) * brainWidth
      let y = Math.sin(phi) * Math.sin(theta) * brainLength
      let z = Math.cos(phi) * brainHeight
      
      // Add hemisphere separation (longitudinal fissure)
      const hemisphereOffset = hemisphere === 'left' ? -brainWidth * 0.15 : brainWidth * 0.15
      x += hemisphereOffset
      
      // Add cortical folding (gyri/sulci) using Perlin-like noise approximation
      // Multiple frequencies create hierarchical folding
      const fold1 = Math.sin(theta * 4 + phi * 3) * 0.1
      const fold2 = Math.sin(theta * 7 + phi * 5) * 0.06
      const fold3 = Math.sin(theta * 12 + phi * 8) * 0.03
      const totalFolding = (fold1 + fold2 + fold3) * brainScale * 0.3
      
      // Apply folding along surface normal
      const radius = Math.sqrt(x * x + y * y + z * z)
      if (radius > 0) {
        const normalizedX = x / radius
        const normalizedY = y / radius
        const normalizedZ = z / radius
        
        x += normalizedX * totalFolding
        y += normalizedY * totalFolding
        z += normalizedZ * totalFolding
      }
      
      // Apply cinematic rotation for three-quarter view
      let rotated = rotateY(x, y, z, viewYaw)
      rotated = rotateX(rotated.x, rotated.y, rotated.z, viewPitch)
      
      return { x: rotated.x, y: rotated.y, z: rotated.z }
    }
    
    // Determine anatomical region based on position
    const getRegion = (theta: number, phi: number): Node['region'] => {
      // Frontal lobe: anterior (41% of cortex)
      if (theta > -Math.PI * 0.4 && theta < Math.PI * 0.4 && phi < Math.PI * 0.6) {
        return 'frontal'
      }
      // Temporal lobe: lateral/inferior (22%)
      if (phi > Math.PI * 0.5 && phi < Math.PI * 0.8) {
        return 'temporal'
      }
      // Occipital lobe: posterior (18%)
      if (Math.abs(theta) > Math.PI * 0.6) {
        return 'occipital'
      }
      // Parietal lobe: superior/posterior (19%)
      return 'parietal'
    }

    // Create neural nodes in anatomically accurate brain shape
    for (let i = 0; i < numNodes; i++) {
      // Spherical coordinates for even distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / numNodes) // Polar angle
      const theta = Math.PI * (1 + Math.sqrt(5)) * i // Azimuthal angle (golden angle)
      
      // Determine hemisphere (50/50 split)
      const hemisphere: 'left' | 'right' = i < numNodes / 2 ? 'left' : 'right'
      
      // Get 3D position on brain surface (already rotated for three-quarter view)
      const pos3D = getBrainPosition(theta, phi, hemisphere)
      
      // Improved perspective projection (FOV ~50 degrees for realistic depth)
      const focalLength = 400
      const perspective = focalLength / (focalLength + pos3D.z)
      const x = centerX + pos3D.x * perspective
      const y = centerY + pos3D.y * perspective
      
      nodes.push({
        x,
        y,
        z: pos3D.z,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseX: x,
        baseY: y,
        baseZ: pos3D.z,
        hemisphere,
        region: getRegion(theta, phi),
      })
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node1 = nodes[i]
        const node2 = nodes[j]
        
        // 3D distance calculation
        const dx = node1.baseX - node2.baseX
        const dy = node1.baseY - node2.baseY
        const dz = node1.baseZ - node2.baseZ
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        // Connect nodes within same hemisphere and close proximity
        // More connections within same anatomical region
        const sameHemisphere = node1.hemisphere === node2.hemisphere
        const sameRegion = node1.region === node2.region
        const maxConnectionDist = sameHemisphere ? 80 : 40 // Fewer inter-hemisphere connections
        
        if (distance < maxConnectionDist) {
          const strengthBoost = sameRegion ? 1.3 : 1.0
          connections.push({
            from: i,
            to: j,
            strength: (Math.random() * strengthBoost) * (1 - distance / maxConnectionDist),
          })
        }
      }
    }

    // Animation loop
    let animationId: number
    let pulsePhase = 0

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      pulsePhase += 0.02

      // Draw connections with depth-based opacity
      connections.forEach((conn, idx) => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]
        
        // Depth-based rendering: connections further back are dimmer
        const avgZ = (from.z + to.z) / 2
        const depthFactor = (avgZ + brainHeight) / (brainHeight * 2) // 0 to 1
        
        // Pulsing effect
        const pulse = Math.sin(pulsePhase + idx * 0.1) * 0.5 + 0.5
        const opacity = conn.strength * 0.25 * pulse * depthFactor

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`
        ctx.lineWidth = 1 + pulse * 0.5
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node, idx) => {
        // Calculate distance from mouse to node's base position
        const dx = mousePos.x - node.baseX
        const dy = mousePos.y - node.baseY
        const distToMouse = Math.sqrt(dx * dx + dy * dy)
        
        // Apply subtle gravitational pull toward mouse
        let targetX = node.baseX
        let targetY = node.baseY
        
        // Only apply force within influence radius and outside dead zone
        if (distToMouse > deadZone && distToMouse < influenceRadius) {
          // Inverse square falloff for natural physics feel
          const normalizedDist = distToMouse / influenceRadius
          const force = Math.pow(1 - normalizedDist, 2) * mouseInfluence
          const displacement = Math.min(force * 100, maxDisplacement)
          
          // Apply displacement in direction of mouse
          targetX += (dx / distToMouse) * displacement
          targetY += (dy / distToMouse) * displacement
        }
        
        // Very smooth interpolation (slow easing) for natural feel
        node.x += (targetX - node.x) * smoothing
        node.y += (targetY - node.y) * smoothing
        
        // Gentle ambient floating movement
        node.x += node.vx * 0.2
        node.y += node.vy * 0.2

        // Keep nodes within brain area with very soft boundaries
        const dxFromCenter = node.x - centerX
        const dyFromCenter = node.y - centerY
        const distFromCenter = Math.sqrt(dxFromCenter * dxFromCenter + dyFromCenter * dyFromCenter)
        
        // Soft boundary with gentle pushback (adjusted for larger brain)
        const maxRadius = brainWidth * 1.3
        if (distFromCenter > maxRadius) {
          const angle = Math.atan2(dyFromCenter, dxFromCenter)
          const targetBoundaryX = centerX + Math.cos(angle) * maxRadius
          const targetBoundaryY = centerY + Math.sin(angle) * maxRadius
          
          // Smooth pushback instead of hard constraint
          node.x += (targetBoundaryX - node.x) * 0.05
          node.y += (targetBoundaryY - node.y) * 0.05
        }

        // Very occasional, subtle direction changes for organic feel
        if (Math.random() < 0.01) {
          node.vx = (Math.random() - 0.5) * 0.3
          node.vy = (Math.random() - 0.5) * 0.3
        }

        // Draw node with pulsing glow and depth-based size
        const depthFactor = (node.z + brainHeight) / (brainHeight * 2) // 0 to 1
        const nodePulse = Math.sin(pulsePhase * 2 + idx * 0.2) * 0.3 + 0.7
        const nodeSize = 6 * depthFactor * nodePulse // Nodes further back are smaller
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize + 2)
        gradient.addColorStop(0, `rgba(100, 200, 255, ${0.8 * nodePulse * depthFactor})`)
        gradient.addColorStop(0.5, `rgba(100, 200, 255, ${0.4 * nodePulse * depthFactor})`)
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')

        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize + 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Inner core
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * depthFactor})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
