'use client';

import { useEffect } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Prevent all default browser gestures
    const preventGestures = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventGesturesPassive = (e: Event) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    // Prevent pinch-to-zoom
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
      return true;
    };

    // Prevent two-finger swipe navigation
    const preventSwipeNavigation = (e: WheelEvent) => {
      // Detect horizontal scroll (swipe gestures)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Allow only when explicitly scrolling in controlled areas
        return true;
      }
      return true;
    };

    // Block gesture events
    document.addEventListener('gesturestart', preventGestures, { passive: false });
    document.addEventListener('gesturechange', preventGestures, { passive: false });
    document.addEventListener('gestureend', preventGestures, { passive: false });
    
    // Block touch events for multi-touch gestures
    document.addEventListener('touchstart', preventPinchZoom, { passive: false });
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });
    
    // Prevent context menu on long press
    document.addEventListener('contextmenu', preventGestures);
    
    // Prevent default wheel behavior for horizontal scrolling
    document.addEventListener('wheel', preventGesturesPassive, { passive: false });

    return () => {
      document.removeEventListener('gesturestart', preventGestures);
      document.removeEventListener('gesturechange', preventGestures);
      document.removeEventListener('gestureend', preventGestures);
      document.removeEventListener('touchstart', preventPinchZoom);
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('contextmenu', preventGestures);
      document.removeEventListener('wheel', preventGesturesPassive);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
