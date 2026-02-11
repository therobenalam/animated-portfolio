/**
 * Brain Zone Definitions
 * 
 * Maps groups of NetworkBrain nodes to project zones.
 * Each zone has a spatial region (node index range), a display color,
 * and a linked project ID.
 */

export interface BrainZone {
  id: string;
  name: string;
  /** Node indices in this zone (from the 177-node NetworkBrain) */
  nodeIndices: number[];
  /** Display color when zone is highlighted */
  color: string;
  /** Linked project ID (from data/projects.ts) */
  projectId?: string;
}

/**
 * Partition the 177 brain nodes into spatial zones.
 * Indices are grouped ~by generation order which maps roughly
 * to spatial clusters due to the ellipsoid generation algorithm.
 */
export const brainZones: BrainZone[] = [
  {
    id: 'zone-frontal',
    name: 'Neural Agent Framework',
    nodeIndices: Array.from({ length: 30 }, (_, i) => i), // 0-29
    color: '#00ff88',
    projectId: 'project-1',
  },
  {
    id: 'zone-temporal-left',
    name: 'RAG Knowledge Engine',
    nodeIndices: Array.from({ length: 30 }, (_, i) => i + 30), // 30-59
    color: '#ff8800',
    projectId: 'project-2',
  },
  {
    id: 'zone-parietal',
    name: 'Real-Time Dashboard',
    nodeIndices: Array.from({ length: 30 }, (_, i) => i + 60), // 60-89
    color: '#00ddff',
    projectId: 'project-3',
  },
  {
    id: 'zone-temporal-right',
    name: 'Fine-Tuning Pipeline',
    nodeIndices: Array.from({ length: 30 }, (_, i) => i + 90), // 90-119
    color: '#ff00ff',
    projectId: 'project-4',
  },
  {
    id: 'zone-occipital',
    name: 'AI Portfolio',
    nodeIndices: Array.from({ length: 30 }, (_, i) => i + 120), // 120-149
    color: '#ffff00',
    projectId: 'project-5',
  },
  {
    id: 'zone-cerebellum',
    name: 'MCP Server Toolkit',
    nodeIndices: Array.from({ length: 27 }, (_, i) => i + 150), // 150-176
    color: '#ff4466',
    projectId: 'project-6',
  },
];

/**
 * Find which zone a node belongs to.
 * Returns null if node is not in any zone.
 */
export function getZoneForNode(nodeIndex: number): BrainZone | null {
  return brainZones.find(zone => zone.nodeIndices.includes(nodeIndex)) ?? null;
}

/**
 * Get all node indices that belong to a specific zone.
 */
export function getNodesForZone(zoneId: string): number[] {
  const zone = brainZones.find(z => z.id === zoneId);
  return zone?.nodeIndices ?? [];
}
