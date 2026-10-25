import React, { useRef, useState, useEffect } from 'react';
import { ParallaxImage } from './ParallaxImage';
import { MemoryTrail } from './MemoryTrail';
import { MEMORY_CARDS } from '../data/content';
import { MemoryCardData, Coordinates } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import styles from './HeroVisualStage.module.css';

interface HeroVisualStageProps {
  onCardClick: (card: MemoryCardData) => void;
  reducedMotion: boolean;
}

export const HeroVisualStage: React.FC<HeroVisualStageProps> = ({
  onCardClick,
  reducedMotion
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pointerPos, setPointerPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [stageDimensions, setStageDimensions] = useState({ width: 680, height: 600 });

  // Parallax offsets for main image
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0, scale: 1 });

  // Smooth lerp ref for parallax
  const currentParallaxRef = useRef({ x: 0, y: 0, scale: 1 });
  const targetParallaxRef = useRef({ x: 0, y: 0, scale: 1 });
  const parallaxRafRef = useRef<number | null>(null);

  // Measure stage size on mount & resize
  useEffect(() => {
    const updateSize = () => {
      if (stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        setStageDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && stageRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(stageRef.current);
    } else {
      window.addEventListener('resize', updateSize);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', updateSize);
      }
    };
  }, []);

  // Parallax animation loop with smooth lerping
  useEffect(() => {
    if (reducedMotion) return;

    let isRunning = true;
    const animateParallax = () => {
      if (!isRunning) return;

      const curr = currentParallaxRef.current;
      const target = targetParallaxRef.current;

      curr.x += (target.x - curr.x) * 0.08;
      curr.y += (target.y - curr.y) * 0.08;
      curr.scale += (target.scale - curr.scale) * 0.08;

      setParallaxOffset({
        x: Math.round(curr.x * 100) / 100,
        y: Math.round(curr.y * 100) / 100,
        scale: Math.round(curr.scale * 1000) / 1000
      });

      parallaxRafRef.current = requestAnimationFrame(animateParallax);
    };

    parallaxRafRef.current = requestAnimationFrame(animateParallax);

    return () => {
      isRunning = false;
      if (parallaxRafRef.current) {
        cancelAnimationFrame(parallaxRafRef.current);
      }
    };
  }, [reducedMotion]);

  // Pointer event handlers
  // Determine if cursor is within the visible photographic stage
  const isInteractivePhotoZone =
    isPointerInside &&
    (stageDimensions.width < 992 || pointerPos.x >= stageDimensions.width * 0.38);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only engage interactive trail for mouse/pen devices (not touch screens)
    if (e.pointerType === 'touch') return;

    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPointerPos({ x, y });
      if (x >= rect.width * 0.38) {
        setHasInteracted(true);
      }
    }
    setIsPointerInside(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;

    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPointerPos({ x, y });

      if (x >= rect.width * 0.38 && !hasInteracted) {
        setHasInteracted(true);
      }

      if (!reducedMotion) {
        // Compute subtle 2D displacement
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const normX = (x - centerX) / centerX; // -1 to 1
        const normY = (y - centerY) / centerY; // -1 to 1

        // Parallax displacement: Subtle calibrated displacement (max 6px horizontal, 4px vertical)
        targetParallaxRef.current = {
          x: normX * -6,
          y: normY * -4,
          scale: 1.012
        };
      }
    }
  };

  const handlePointerLeave = () => {
    setIsPointerInside(false);
    targetParallaxRef.current = { x: 0, y: 0, scale: 1.0 };
  };

  return (
    <div className={styles.stageWrapper}>
      {/* Dedicated Interactive Visual Stage */}
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label="Interactive photographic stage depicting the immediate aftermath of the Snap. Hover with cursor to discover memories of children, elders, and departed loved ones."
      >
        {/* Main 2D Parallax Photograph */}
        <ParallaxImage
          offsetX={parallaxOffset.x}
          offsetY={parallaxOffset.y}
          scale={parallaxOffset.scale}
        />

        {/* Floating Photographic Memory Trail (3 cards) */}
        <MemoryTrail
          isPointerInside={isInteractivePhotoZone}
          pointerPos={pointerPos}
          stageDimensions={stageDimensions}
          onCardClick={onCardClick}
          reducedMotion={reducedMotion}
        />

        {/* Ambient Editorial Discovery Cue */}
        {!hasInteracted && !reducedMotion && (
          <div className={styles.interactiveCue} aria-hidden="true">
            <span className={styles.cueDot} />
            <Sparkles size={13} className={styles.cueIcon} />
            <span className={styles.cueText}>Explore memories with cursor</span>
          </div>
        )}
      </div>

      {/* Mobile & Touch Supportive Memory Collage */}
      <div className={styles.mobileMemoryStrip}>
        <div className={styles.mobileStripHeader}>
          <span className={styles.mobileStripEyebrow}>VOICES & RESPONSIBILITIES</span>
          <span className={styles.mobileStripSub}>Tap to view context</span>
        </div>
        <div className={styles.mobileCardsRow}>
          {MEMORY_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              className={styles.mobileCardBtn}
              onClick={() => onCardClick(card)}
              aria-label={`Open story: ${card.title}`}
            >
              <div className={styles.mobileCardImgWrap}>
                <picture>
                  <source srcSet={card.imageWebp} type="image/webp" />
                  <img
                    src={card.imageSrc}
                    alt={card.alt}
                    className={styles.mobileCardImg}
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className={styles.mobileCardMeta}>
                <span className={styles.mobileCardTitle}>{card.title}</span>
                <span className={styles.mobileCardCaption}>"{card.caption}"</span>
              </div>
              <ArrowRight size={14} className={styles.mobileCardArrow} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
