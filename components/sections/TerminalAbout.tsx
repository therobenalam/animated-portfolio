'use client';

import { useEffect, useState } from 'react';
import { aboutData } from '@/data/about';

/** Typewriter hook — reveals text character by character */
function useTypewriter(text: string, speed = 30, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function TerminalAbout() {
  const { name, title, bio, stats } = aboutData;
  const fullBio = bio.join('\n\n');
  const { displayed: bioText, done: bioDone } = useTypewriter(fullBio, 18, 300);

  return (
    <div className="font-mono text-sm leading-relaxed space-y-5">
      {/* Identity block */}
      <div>
        <p className="text-green-400 text-xs tracking-widest mb-1">{'>'} IDENTIFY</p>
        <p className="text-white text-lg font-bold tracking-wide">{name}</p>
        <p className="text-cyan-400 text-xs tracking-[0.15em]">{title}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bio with typewriter */}
      <div>
        <p className="text-green-400 text-xs tracking-widest mb-2">{'>'} cat bio.txt</p>
        <div className="text-gray-300 whitespace-pre-wrap min-h-[5rem]">
          {bioText}
          {!bioDone && (
            <span className="text-green-400 animate-pulse">▊</span>
          )}
        </div>
      </div>

      {/* Stats readout */}
      <div className="border-t border-white/10" />
      <div>
        <p className="text-green-400 text-xs tracking-widest mb-2">{'>'} system --stats</p>
        <div className="space-y-1.5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex gap-3">
              <span className="text-cyan-500 w-28 shrink-0 text-xs">[{stat.label}]</span>
              <span className="text-gray-300 text-xs">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
