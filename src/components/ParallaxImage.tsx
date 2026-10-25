import React from 'react';
import { getAssetUrl } from '../utils/assets';
import styles from './ParallaxImage.module.css';

interface ParallaxImageProps {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  offsetX,
  offsetY,
  scale
}) => {
  return (
    <div className={styles.imageStageContainer} aria-hidden="true">
      {/* 
        Layer 0: Moving Cinematic Photograph with Overscan 
        Overscan ensures parallax displacement never exposes white edges.
      */}
      <div className={styles.parallaxMover}>
        <picture className={styles.picture}>
          <source srcSet={getAssetUrl('/images/hero-main.webp')} type="image/webp" />
          <img
            src={getAssetUrl('/images/hero-main.png')}
            alt="Young woman dissolving into dust while holding the hands of an elderly man seated in a wheelchair at sunset"
            className={styles.mainImg}
            style={{
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`
            }}
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* 
        Layer 1: Continuous Progressive Ivory Overlay
        Extends smoothly across the entire width:
        - 90-95% opacity on the left allowing subtle warmth/particles to show through
        - Smooth organic transition in the middle
        - 0-5% on the right keeping the subjects sharp, vibrant and visible
      */}
      <div className={styles.cloudFadeMask}>
        <div className={styles.horizontalFeather} />
        <div className={styles.mobileTopMist} />
      </div>

      {/* 
        Layer 3: Subtle Lower-Edge Ground Mist
        Softly transitions the bottom edge of the photo to the hero canvas base 
        without washing out the subjects' clasped hands or the wheelchair.
      */}
      <div className={styles.lowerGroundMist} />

      {/* 
        Layer 4: Warm Sunset Ambient Hue Unification
        Gentle golden-amber ambient glow harmonizing the photograph with the brand palette.
      */}
      <div className={styles.warmSunsetGaze} />
    </div>
  );
};
