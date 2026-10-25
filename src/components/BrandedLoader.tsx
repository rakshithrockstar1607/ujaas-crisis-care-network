import React, { useEffect, useState } from 'react';
import styles from './BrandedLoader.module.css';
import { getAssetUrl } from '../utils/assets';

interface BrandedLoaderProps {
  onComplete: () => void;
  reducedMotion: boolean;
}

export const BrandedLoader: React.FC<BrandedLoaderProps> = ({
  onComplete,
  reducedMotion
}) => {
  const [phase, setPhase] = useState<'active' | 'exiting' | 'done'>('active');

  useEffect(() => {
    // If reduced motion is requested, complete immediately
    if (reducedMotion) {
      onComplete();
      setPhase('done');
      return;
    }

    let isMounted = true;
    const startTime = Date.now();
    const MIN_LOADER_TIME = 1000; // Calibrated 1.0s calm intro on page refresh/load
    const MAX_LOADER_TIME = 1600; // Safety timeout

    // Preload & decode the critical hero photograph
    const preloadHero = new Promise<void>((resolve) => {
      const img = new Image();
      img.src = getAssetUrl('/images/hero-main.webp');
      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(() => resolve())
          .catch(() => resolve()); // Fallback gracefully if decode fails
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });

    // Ensure fonts are ready
    const preloadFonts = document.fonts ? document.fonts.ready : Promise.resolve();

    // Coordinate exit when both min time passed and critical assets ready
    Promise.all([preloadHero, preloadFonts]).then(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADER_TIME - elapsed);

      setTimeout(() => {
        if (!isMounted) return;
        setPhase('exiting');

        // Smooth exit duration
        setTimeout(() => {
          if (!isMounted) return;
          setPhase('done');
          onComplete();
        }, 450);
      }, remainingTime);
    });

    // Failsafe timeout to guarantee user is never trapped
    const safetyTimer = setTimeout(() => {
      if (isMounted && phase !== 'done') {
        setPhase('exiting');
        setTimeout(() => {
          if (isMounted) {
            setPhase('done');
            onComplete();
          }
        }, 400);
      }
    }, MAX_LOADER_TIME);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, [onComplete, reducedMotion]);

  if (phase === 'done') return null;

  return (
    <div
      className={`${styles.loaderBackdrop} ${phase === 'exiting' ? styles.exiting : ''}`}
      role="status"
      aria-label="Loading UJAAS humanitarian crisis care platform"
      aria-live="polite"
    >
      <div className={styles.centerContainer}>
        {/* Official UJAAS Logo Emblem (untouched original artwork) */}
        <div className={styles.logoWrap}>
          <picture>
            <source srcSet={getAssetUrl('/images/logo-emblem.webp')} type="image/webp" />
            <img
              src={getAssetUrl('/images/logo-emblem.png')}
              alt="UJAAS emblem: two human figures holding hands inside an enduring flame"
              className={styles.emblemImage}
              width={160}
              height={205}
            />
          </picture>
          <div className={styles.flameEmberHalo} aria-hidden="true" />
        </div>

        {/* Wordmark & Supporting Descriptor */}
        <div className={styles.textWrap}>
          <h1 className={styles.wordmark}>UJAAS</h1>
          <p className={styles.descriptor}>CRISIS CARE NETWORK</p>
        </div>
      </div>
    </div>
  );
};
