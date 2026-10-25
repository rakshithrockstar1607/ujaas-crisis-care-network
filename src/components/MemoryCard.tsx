import React from 'react';
import { MemoryCardData } from '../types';
import styles from './MemoryCard.module.css';

interface MemoryCardProps {
  card: MemoryCardData;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  onCardClick: (card: MemoryCardData) => void;
  isHovered?: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  x,
  y,
  opacity,
  scale,
  onCardClick
}) => {
  return (
    <div
      className={styles.cardContainer}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${card.restingRotation}deg)`,
        opacity,
        width: `${card.defaultWidth}px`,
        pointerEvents: opacity > 0.4 ? 'auto' : 'none'
      }}
      role="button"
      tabIndex={opacity > 0.4 ? 0 : -1}
      aria-label={`${card.title}: ${card.caption}. Click to read full context.`}
      onClick={() => onCardClick(card)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick(card);
        }
      }}
    >
      <div className={styles.cardFrame}>
        <picture className={styles.picture}>
          <source srcSet={card.imageWebp} type="image/webp" />
          <img
            src={card.imageSrc}
            alt={card.alt}
            className={styles.image}
            loading="lazy"
            draggable={false}
          />
        </picture>

        {/* Subtle Warm Amber Vignette / Dust Particle Accent */}
        <div className={styles.cardGlow} aria-hidden="true" />

        {/* Small Touch / Hover Pill */}
        <div className={styles.tapPill} aria-hidden="true">
          <span>Reveal Story</span>
        </div>
      </div>
    </div>
  );
};
