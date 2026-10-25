import React, { useEffect, useRef, useState } from 'react';
import { MEMORY_CARDS } from '../data/content';
import { MemoryCardData, Coordinates } from '../types';
import { MemoryCard } from './MemoryCard';
import styles from './MemoryTrail.module.css';

interface MemoryTrailProps {
  isPointerInside: boolean;
  pointerPos: Coordinates;
  stageDimensions: { width: number; height: number };
  onCardClick: (card: MemoryCardData) => void;
  reducedMotion: boolean;
}

interface CardAnimState {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  currentOpacity: number;
  currentScale: number;
  active: boolean;
}

export const MemoryTrail: React.FC<MemoryTrailProps> = ({
  isPointerInside,
  pointerPos,
  stageDimensions,
  onCardClick,
  reducedMotion
}) => {
  // If reduced motion is requested, do not render cursor-following ribbon
  if (reducedMotion) {
    return null;
  }

  // Animation states for each of the 3 cards
  const animStatesRef = useRef<CardAnimState[]>([
    { currentX: 0, currentY: 0, targetX: 0, targetY: 0, currentOpacity: 0, currentScale: 0.92, active: false },
    { currentX: 0, currentY: 0, targetX: 0, targetY: 0, currentOpacity: 0, currentScale: 0.92, active: false },
    { currentX: 0, currentY: 0, targetX: 0, targetY: 0, currentOpacity: 0, currentScale: 0.92, active: false }
  ]);

  const [renderStates, setRenderStates] = useState<{ x: number; y: number; opacity: number; scale: number }[]>([
    { x: 0, y: 0, opacity: 0, scale: 0.92 },
    { x: 0, y: 0, opacity: 0, scale: 0.92 },
    { x: 0, y: 0, opacity: 0, scale: 0.92 }
  ]);

  const entryTimeoutsRef = useRef<number[]>([]);
  const enterTimestampRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Stagger entrance delays in ms
  const staggerDelays = [0, 95, 190];
  // Different follow responsiveness factors (chain ribbon effect)
  const lerpFactors = [0.12, 0.075, 0.048];

  // Handle pointer enter/leave state transitions
  useEffect(() => {
    // Clear any pending timeouts
    entryTimeoutsRef.current.forEach(clearTimeout);
    entryTimeoutsRef.current = [];

    if (isPointerInside) {
      enterTimestampRef.current = Date.now();
      
      // Initialize card positions near pointer on initial entry to prevent zooming across screen
      animStatesRef.current.forEach((st, idx) => {
        const card = MEMORY_CARDS[idx];
        const initialX = pointerPos.x + card.initialOffset.x - card.defaultWidth / 2;
        const initialY = pointerPos.y + card.initialOffset.y - (card.defaultWidth * 0.8) / 2;
        
        // Clamp to stage bounds
        const clampedX = Math.max(16, Math.min(initialX, stageDimensions.width - card.defaultWidth - 16));
        const clampedY = Math.max(16, Math.min(initialY, stageDimensions.height - card.defaultWidth * 0.9 - 16));

        if (st.currentOpacity <= 0.05) {
          st.currentX = clampedX;
          st.currentY = clampedY;
        }

        // Stagger activation
        const t = window.setTimeout(() => {
          animStatesRef.current[idx].active = true;
        }, staggerDelays[idx]);
        entryTimeoutsRef.current.push(t);
      });
    } else {
      // Exit gracefully
      animStatesRef.current.forEach((st) => {
        st.active = false;
      });
    }

    return () => {
      entryTimeoutsRef.current.forEach(clearTimeout);
    };
  }, [isPointerInside, stageDimensions]);

  // Main high-performance Animation Loop
  useEffect(() => {
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      let hasActiveOrVisibleCards = false;
      const nextRenderStates = [...renderStates];

      animStatesRef.current.forEach((st, idx) => {
        const card = MEMORY_CARDS[idx];
        const cardW = card.defaultWidth;
        const cardH = cardW * 0.85;

        // Target coordinates based on pointer position and card offset
        let rawTargetX = pointerPos.x + card.initialOffset.x - cardW / 2;
        let rawTargetY = pointerPos.y + card.initialOffset.y - cardH / 2;

        // Boundary constraints to keep cards nicely inside the photographic stage
        // Constrain minX so cards never drift into the left-side headline or buttons
        const minX = Math.max(24, stageDimensions.width * 0.16);
        const maxX = Math.max(minX, stageDimensions.width - cardW - 24);
        const minY = 24;
        const maxY = Math.max(minY, stageDimensions.height - cardH - 24);

        const clampedX = Math.max(minX, Math.min(rawTargetX, maxX));
        const clampedY = Math.max(minY, Math.min(rawTargetY, maxY));

        st.targetX = clampedX;
        st.targetY = clampedY;

        // Ribbon chain follower interpolation
        const factor = lerpFactors[idx];
        st.currentX += (st.targetX - st.currentX) * factor;
        st.currentY += (st.targetY - st.currentY) * factor;

        // Opacity & Scale transitions
        const targetOpacity = st.active ? 1 : 0;
        const targetScale = st.active ? 1 : 0.92;

        st.currentOpacity += (targetOpacity - st.currentOpacity) * 0.12;
        st.currentScale += (targetScale - st.currentScale) * 0.12;

        if (st.currentOpacity > 0.005) {
          hasActiveOrVisibleCards = true;
        } else {
          st.currentOpacity = 0;
        }

        nextRenderStates[idx] = {
          x: Math.round(st.currentX * 10) / 10,
          y: Math.round(st.currentY * 10) / 10,
          opacity: Math.max(0, Math.min(1, st.currentOpacity)),
          scale: Math.max(0.9, Math.min(1.05, st.currentScale))
        };
      });

      setRenderStates(nextRenderStates);

      if (hasActiveOrVisibleCards || isPointerInside) {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [pointerPos, isPointerInside, stageDimensions]);

  return (
    <div className={styles.trailContainer} aria-hidden="true">
      {MEMORY_CARDS.map((card, idx) => {
        const state = renderStates[idx];
        if (state.opacity <= 0.01) return null;
        return (
          <MemoryCard
            key={card.id}
            card={card}
            x={state.x}
            y={state.y}
            opacity={state.opacity}
            scale={state.scale}
            onCardClick={onCardClick}
            isHovered={isPointerInside}
          />
        );
      })}
    </div>
  );
};
