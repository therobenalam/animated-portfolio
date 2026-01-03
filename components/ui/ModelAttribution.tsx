'use client';

import { useState } from 'react';

/**
 * ModelAttribution - Displays CC-BY-4.0 license attribution
 * Required for the human brain model by Yash_Dandavate
 */
export default function ModelAttribution() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {expanded ? (
        <div className="rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm max-w-md">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm">3D Model Attribution</h3>
            <button
              onClick={() => setExpanded(false)}
              className="ml-2 text-gray-400 hover:text-white"
              aria-label="Collapse"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-gray-300 mb-2">
            This work is based on{' '}
            <a
              href="https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              "human-brain"
            </a>{' '}
            by{' '}
            <a
              href="https://sketchfab.com/Yash_Dandavate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Yash_Dandavate
            </a>{' '}
            licensed under{' '}
            <a
              href="http://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              CC-BY-4.0
            </a>
          </p>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="rounded-full bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
          aria-label="Show model attribution"
        >
          ⓘ Model Info
        </button>
      )}
    </div>
  );
}
