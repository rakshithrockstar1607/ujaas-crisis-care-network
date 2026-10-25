import React, { useState } from 'react';
import { Heart, Users, Utensils, Calendar, MessageCircle } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './InvisibleImpactSection.module.css';

interface InvisibleImpactSectionProps {
  reducedMotion?: boolean;
}

export const InvisibleImpactSection: React.FC<InvisibleImpactSectionProps> = ({
  reducedMotion = false
}) => {
  const { navigateTo } = useCareContext();
  const { isAuthenticated, updateDraft } = useAccountContext();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handlePrimaryCTA = () => {
    if (isAuthenticated) {
      navigateTo('offer_help');
    } else {
      updateDraft({ intent: 'want_to_help' });
      navigateTo('account_access');
    }
  };

  const handleSecondaryCTA = () => {
    if (isAuthenticated) {
      navigateTo('user_profile');
    } else {
      updateDraft({ intent: 'want_to_help' });
      navigateTo('onboarding');
    }
  };

  return (
    <section
      id="invisible-impact"
      className={`${styles.section} ${reducedMotion ? styles.reducedMotion : ''}`}
      aria-labelledby="invisible-impact-heading"
    >
      <div className={styles.container}>
        {/* Main Two-Column Editorial Grid */}
        <div className={styles.mainGrid}>
          {/* Left Column: Editorial Typography & Humanist Narrative */}
          <div className={styles.leftCol}>
            {/* Small Editorial Eyebrow with Orange Line */}
            <div className={styles.eyebrowContainer}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrowText}>01 / THE INVISIBLE IMPACT</span>
            </div>

            {/* Oversized Canela Headline */}
            <h2 id="invisible-impact-heading" className={styles.headline}>
              The smallest routines can{' '}
              <span className={styles.headlineHighlight}>mean everything.</span>
            </h2>

            {/* Thoughtful Supporting Paragraph (Strictly No Em Dashes) */}
            <p className={styles.supportingCopy}>
              A timely meal, a gentle reminder, a helping hand to the doctor... these ordinary acts of care keep lives steady. We only see their value when they stop happening.
            </p>

            {/* Neo-Brutalist Dual CTAs */}
            <div className={styles.ctaButtonGroup}>
              <button
                type="button"
                className={styles.primaryCta}
                onClick={handlePrimaryCTA}
                aria-label="Help someone like Savitri Amma"
              >
                <Heart className={styles.btnIcon} size={18} fill="currentColor" strokeWidth={0} />
                <span>Help someone like Savitri Amma</span>
              </button>

              <button
                type="button"
                className={styles.secondaryCta}
                onClick={handleSecondaryCTA}
                aria-label="Become a caregiver"
              >
                <Users className={styles.btnIcon} size={18} strokeWidth={2.2} />
                <span>Become a caregiver</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage with Portrait and Overlapping Care Cards */}
          <div className={styles.rightCol}>
            <div className={styles.visualStage}>
              {/* Decorative Accent Ray 1 (Top right spark) */}
              <svg
                className={styles.accentSparkTop}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill="var(--color-action-orange, #F45124)"
                />
              </svg>

              {/* Decorative Accent Ray 2 (Bottom center spark) */}
              <svg
                className={styles.accentSparkBottom}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill="var(--color-action-orange, #F45124)"
                />
              </svg>

              {/* Savitri Amma Portrait Frame */}
              <div className={styles.portraitFrame}>
                <picture>
                  <source srcSet={getAssetUrl('/images/savitri_portrait_clean.webp')} type="image/webp" />
                  <source srcSet={getAssetUrl('/images/savitri_portrait_clean.png')} type="image/png" />
                  <img
                    src={getAssetUrl('/images/savitri_portrait_clean.jpg')}
                    alt="Savitri Amma sitting with a warm cup of tea by the morning window"
                    className={styles.portraitImg}
                    loading="lazy"
                  />
                </picture>
                <div className={styles.portraitGlow} aria-hidden="true" />
              </div>

              {/* Floating Care Card 01: Warm Peach (Top-Right) */}
              <div
                className={`${styles.careCard} ${styles.careCardPeach} ${activeCard === 1 ? styles.cardActive : ''}`}
                onMouseEnter={() => setActiveCard(1)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => navigateTo('care_chain')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateTo('care_chain');
                  }
                }}
                aria-label="Care routine: A warm meal. Status: Ongoing"
              >
                <div className={styles.cardHeader}>
                  <div className={`${styles.cardIconBox} ${styles.iconBoxPeach}`}>
                    <Utensils size={18} strokeWidth={2.4} />
                  </div>
                  <span className={`${styles.statusPill} ${styles.statusOngoing}`}>
                    <span className={styles.statusDotGreen} />
                    <span>Ongoing</span>
                  </span>
                </div>
                <h3 className={styles.cardTitle}>A warm meal</h3>
                <p className={styles.cardDescription}>
                  Nutritious meals keep Savitri Amma healthy and independent.
                </p>
              </div>

              {/* Floating Care Card 02: Powder Blue (Middle-Right) */}
              <div
                className={`${styles.careCard} ${styles.careCardBlue} ${activeCard === 2 ? styles.cardActive : ''}`}
                onMouseEnter={() => setActiveCard(2)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => navigateTo('care_chain')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateTo('care_chain');
                  }
                }}
                aria-label="Care routine: Doctor visits. Status: Needs support"
              >
                <div className={styles.cardHeader}>
                  <div className={`${styles.cardIconBox} ${styles.iconBoxBlue}`}>
                    <Calendar size={18} strokeWidth={2.4} />
                  </div>
                  <span className={`${styles.statusPill} ${styles.statusNeedsSupport}`}>
                    <span className={styles.statusDotAmber} />
                    <span>Needs support</span>
                  </span>
                </div>
                <h3 className={styles.cardTitle}>Doctor visits</h3>
                <p className={styles.cardDescription}>
                  Regular check-ups help catch health issues early and keep her safe.
                </p>
              </div>

              {/* Floating Care Card 03: Warm Cream / Apricot (Bottom-Right) */}
              <div
                className={`${styles.careCard} ${styles.careCardCream} ${activeCard === 3 ? styles.cardActive : ''}`}
                onMouseEnter={() => setActiveCard(3)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => navigateTo('my_circle')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateTo('my_circle');
                  }
                }}
                aria-label="Care routine: Simple company. Status: Ongoing"
              >
                <div className={styles.cardHeader}>
                  <div className={`${styles.cardIconBox} ${styles.iconBoxCream}`}>
                    <MessageCircle size={18} strokeWidth={2.4} />
                  </div>
                  <span className={`${styles.statusPill} ${styles.statusOngoing}`}>
                    <span className={styles.statusDotGreen} />
                    <span>Ongoing</span>
                  </span>
                </div>
                <h3 className={styles.cardTitle}>Simple company</h3>
                <p className={styles.cardDescription}>
                  A conversation, a walk, a familiar face... it keeps her spirits alive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Editorial Quote Strip */}
        <div className={styles.quoteStrip}>
          {/* Left: Circular Neo-Brutalist Quote Icon */}
          <div className={styles.quoteBadge} aria-hidden="true">
            <span className={styles.quoteMark}>“</span>
          </div>

          {/* Center: Canela Editorial Statement with UJAAS Orange Emphasis */}
          <blockquote className={styles.quoteStatement}>
            Not every responsibility needs a new system.{' '}
            <span className={styles.quoteHighlight}>
              Sometimes, it just needs someone to show up.
            </span>
          </blockquote>

          {/* Right: Connected Circle Motif + Three-Line Humanist Cadence */}
          <div className={styles.cadenceBlock}>
            <svg
              className={styles.connectedCirclesSvg}
              width="44"
              height="44"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Three interconnected rings representing reciprocal community care */}
              <circle cx="14" cy="14" r="8" stroke="var(--color-primary-navy, #102744)" strokeWidth="1.85" />
              <circle cx="22" cy="14" r="8" stroke="var(--color-action-orange, #F45124)" strokeWidth="1.85" />
              <circle cx="18" cy="22" r="8" stroke="var(--color-primary-navy, #102744)" strokeWidth="1.85" />
            </svg>
            <div className={styles.cadenceLines}>
              <span>Real people.</span>
              <span>Stronger circles.</span>
              <span>Brighter tomorrows.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
