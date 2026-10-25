import React, { useEffect, useState } from 'react';
import { HeroCopy } from './HeroCopy';
import { HeroVisualStage } from './HeroVisualStage';
import { IntentType, MemoryCardData } from '../types';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onSelectIntent: (intent: IntentType) => void;
  onCardClick: (card: MemoryCardData) => void;
  reducedMotion: boolean;
  isReady?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectIntent,
  onCardClick,
  reducedMotion,
  isReady = true
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <section
      className={`${styles.heroSection} ${loaded ? styles.revealed : ''}`}
      aria-label="UJAAS Humanitarian Hero"
    >
      {/* 
        Full-Viewport Edge-to-Edge Cinematic Visual Stage
        On desktop, fills the entire right canvas from beneath the nav to the section bottom.
      */}
      <div className={styles.stageLayer}>
        <HeroVisualStage
          onCardClick={onCardClick}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* 
        Editorial Typography & Action Controls 
        Sits on the left, floating over the warm ivory canvas and overlapping the cloud fade.
      */}
      <div className={styles.container}>
        <div className={styles.leftCol}>
          <HeroCopy onSelectIntent={onSelectIntent} />
        </div>
      </div>
    </section>
  );
};
