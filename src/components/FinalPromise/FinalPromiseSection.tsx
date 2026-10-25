import React from 'react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { getAssetUrl } from '../../utils/assets';
import { Heart, ArrowRight } from 'lucide-react';
import styles from './FinalPromiseSection.module.css';

interface FinalPromiseSectionProps {
  reducedMotion?: boolean;
  onOpenPrototypeModal?: (item: { label: string; description: string }) => void;
}

export const FinalPromiseSection: React.FC<FinalPromiseSectionProps> = ({
  reducedMotion = false,
  onOpenPrototypeModal
}) => {
  const { navigateTo } = useCareContext();
  const { isAuthenticated } = useAccountContext();

  const handleExploreNetwork = () => {
    if (isAuthenticated) {
      navigateTo('my_circle');
    } else {
      navigateTo('account_access');
    }
  };

  const handleSeeHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('living-circle');
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenPrototypeModal) {
      onOpenPrototypeModal({
        label: 'About UJAAS: Crisis Care Network',
        description:
          'Set in Bengaluru immediately following the Snap of April 2018, UJAAS is an India-first civic concept designed around people, trust, and everyday mutual aid.'
      });
    } else {
      const target = document.getElementById('invisible-impact');
      if (target) {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <section
      id="promise-of-care"
      className={`${styles.finalSection} ${reducedMotion ? styles.reducedMotion : ''}`}
      aria-labelledby="promise-heading"
    >
      {/* ==================================================================
          Top Transition Canopy from Section 03 (Midnight Navy into Warm Ivory)
          ================================================================== */}
      <div className={styles.canopyWrapper} aria-hidden="true">
        <svg
          className={styles.canopySvg}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved aperture rising smoothly in center to frame the beacon */}
          <path
            d="M 0 120 L 0 75 Q 360 90, 720 18 Q 1080 90, 1440 75 L 1440 120 Z"
            fill="var(--color-bg-ivory, #FAF7F0)"
          />
        </svg>
      </div>

      {/* Background Soft Dune Waves for Editorial Depth */}
      <div className={styles.dunesBackground} aria-hidden="true">
        <svg
          className={`${styles.duneWave} ${styles.duneWave1}`}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 120 Q 360 30, 720 100 T 1440 80"
            fill="none"
          />
        </svg>
        <svg
          className={`${styles.duneWave} ${styles.duneWave2}`}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 90 Q 420 150, 840 70 T 1440 110"
            fill="none"
          />
        </svg>
        <svg
          className={`${styles.duneWave} ${styles.duneWave3}`}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 60 Q 380 120, 760 50 T 1440 90"
            fill="none"
          />
        </svg>
      </div>

      {/* Central Beacon of Hope: UJAAS Logo Crest with Warm Glow */}
      <div className={styles.beaconContainer}>
        <div className={styles.beaconHalo} aria-hidden="true" />
        <div
          className={styles.beaconEmblemWrap}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
          }}
          title="Return to top of page"
        >
          <picture>
            <source srcSet={getAssetUrl('/images/logo-emblem.webp')} type="image/webp" />
            <img
              src={getAssetUrl('/images/logo-emblem.png')}
              alt="UJAAS flame emblem symbolizing community care"
              className={styles.beaconEmblemImg}
              width={54}
              height={68}
            />
          </picture>
          <div className={styles.beaconBrandText}>
            <span className={styles.beaconWordmark}>UJAAS</span>
            <span className={styles.beaconTagline}>CRISIS CARE NETWORK</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* ==================================================================
            ZONE A: The Three-Stage Care Journey Card
            ================================================================== */}
        <div className={styles.timelineCardWrapper}>
          <div
            className={styles.timelineCard}
            role="region"
            aria-label="Three-stage care journey"
          >
            {/* Milestone 01: A need noticed */}
            <div className={styles.milestone}>
              <div className={styles.milestoneIconWrap} aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Subtle radiating warmth rays */}
                  <line x1="12" y1="2" x2="12" y2="4" strokeWidth="2.2" />
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" strokeWidth="2" />
                  <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" strokeWidth="2" />
                  {/* Eye symbol */}
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>

              <div className={styles.milestoneContent}>
                <span className={styles.milestoneStepNumber}>01</span>
                <h3 className={styles.milestoneTitle}>A need noticed</h3>
                <p className={styles.milestoneDescription}>
                  A neighbour, a community member or a local partner spots someone who could use support.
                </p>
              </div>
            </div>

            {/* Connecting Line 1 to 2 */}
            <div className={styles.timelineConnector} aria-hidden="true">
              <span className={styles.connectorDot} />
            </div>

            {/* Milestone 02: A promise made */}
            <div className={styles.milestone}>
              <div className={styles.milestoneIconWrap} aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Floating heart above */}
                  <path
                    d="M12 4.2c-.8-1.2-2.1-1.7-3.2-1.2-1.4.6-1.8 2.2-1 3.4l4.2 4.6 4.2-4.6c.8-1.2.4-2.8-1-3.4-1.1-.5-2.4 0-3.2 1.2z"
                    fill="currentColor"
                    stroke="none"
                  />
                  {/* Two figures standing together */}
                  <circle cx="8" cy="14" r="2.5" />
                  <path d="M4 21v-1.5c0-1.7 1.3-3 3-3h2c1.7 0 3 1.3 3 3V21" />
                  <circle cx="16" cy="14" r="2.5" />
                  <path d="M12 21v-1.5c0-1.7 1.3-3 3-3h2c1.7 0 3 1.3 3 3V21" />
                </svg>
              </div>

              <div className={styles.milestoneContent}>
                <span className={styles.milestoneStepNumber}>02</span>
                <h3 className={styles.milestoneTitle}>A promise made</h3>
                <p className={styles.milestoneDescription}>
                  UJAAS connects them with the right people, resources and local support.
                </p>
              </div>
            </div>

            {/* Connecting Line 2 to 3 */}
            <div className={styles.timelineConnector} aria-hidden="true">
              <span className={styles.connectorDot} />
            </div>

            {/* Milestone 03: Care confirmed */}
            <div className={styles.milestone}>
              <div className={styles.milestoneIconWrap} aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Radiating rays of confirmation */}
                  <line x1="12" y1="2" x2="12" y2="4" strokeWidth="2.2" />
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" strokeWidth="2" />
                  <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" strokeWidth="2" />
                  {/* Circle check */}
                  <circle cx="12" cy="13" r="8" />
                  <path d="m9 13 2 2 4-4" strokeWidth="2.5" />
                </svg>
              </div>

              <div className={styles.milestoneContent}>
                <span className={styles.milestoneStepNumber}>03</span>
                <h3 className={styles.milestoneTitle}>Care confirmed</h3>
                <p className={styles.milestoneDescription}>
                  Help reaches them, and their well-being is checked, so no one is left to face tomorrow alone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            ZONE B: The Emotional Conclusion & Principal Call to Action
            ================================================================== */}
        <div className={styles.conclusionWrapper}>
          {/* Editorial Eyebrow with Left Dash */}
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDash} aria-hidden="true" />
            <span className={styles.eyebrowText}>THE CARE JOURNEY</span>
          </div>

          {/* Grand Headline in Canela */}
          <h2 id="promise-heading" className={styles.grandHeadline}>
            A little light <span className={styles.headlineHighlight}>goes a long way.</span>
          </h2>

          {/* Supporting Statement */}
          <p className={styles.supportingText}>
            Care is only complete when it actually reaches someone. UJAAS brings people, resources and local networks together, so that a need noticed today becomes real support tomorrow.
          </p>

          {/* Principal Call to Action Button */}
          <div className={styles.ctaButtonGroup}>
            <button
              type="button"
              className={styles.principalCtaBtn}
              onClick={handleExploreNetwork}
              aria-label="Explore the care network"
            >
              <Heart size={18} fill="#FFFFFF" color="#FFFFFF" strokeWidth={0} />
              <span>Explore the care network</span>
              <ArrowRight size={18} className={styles.btnArrowIcon} />
            </button>

            {/* Secondary Smooth Scroll Link */}
            <button
              type="button"
              className={styles.secondaryTextLink}
              onClick={handleSeeHowItWorks}
              aria-label="See how UJAAS works"
            >
              <span>See how UJAAS works</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================
          ZONE C: The Integrated Footer
          ================================================================== */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerContainer}>
          {/* Main Top Row */}
          <div className={styles.footerMainRow}>
            {/* Left: Brand Lockup */}
            <div
              className={styles.footerBrand}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
              }}
              title="Return to top of page"
            >
              <picture>
                <source srcSet={getAssetUrl('/images/logo-emblem.webp')} type="image/webp" />
                <img
                  src={getAssetUrl('/images/logo-emblem.png')}
                  alt="UJAAS flame logo"
                  className={styles.footerEmblem}
                  width={32}
                  height={42}
                />
              </picture>
              <div className={styles.footerBrandText}>
                <span className={styles.footerWordmark}>UJAAS</span>
                <span className={styles.footerTagline}>CRISIS CARE NETWORK</span>
              </div>
            </div>

            {/* Middle: Navigation Links */}
            <nav className={styles.footerNav} aria-label="Footer quick navigation">
              <button
                type="button"
                className={styles.footerNavLink}
                onClick={() => navigateTo('help_category_select')}
              >
                Find Help
              </button>
              <button
                type="button"
                className={styles.footerNavLink}
                onClick={() => navigateTo('offer_help')}
              >
                Offer Help
              </button>
              <button
                type="button"
                className={styles.footerNavLink}
                onClick={() => navigateTo('my_circle')}
              >
                My Circle
              </button>
              <button
                type="button"
                className={styles.footerNavLink}
                onClick={() => navigateTo('resources')}
              >
                Resources
              </button>
              <button
                type="button"
                className={styles.footerNavLink}
                onClick={() => navigateTo('child_safe_entry')}
              >
                Child Safe
              </button>
              <button
                type="button"
                className={styles.footerNavLink}
                onClick={handleAboutClick}
              >
                About
              </button>
            </nav>

            <div className={styles.footerDivider} aria-hidden="true" />

            {/* Right: Social Media Circles & Disclaimer */}
            <div className={styles.footerRight}>
              <div className={styles.socialIconsGroup} aria-label="Community channels">
                <a
                  href="#linkedin"
                  className={styles.socialBtn}
                  aria-label="LinkedIn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenPrototypeModal) {
                      onOpenPrototypeModal({
                        label: 'Community Channel: LinkedIn',
                        description: 'Simulated civic coordination channel for humanitarian organizations.'
                      });
                    }
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href="#instagram"
                  className={styles.socialBtn}
                  aria-label="Instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenPrototypeModal) {
                      onOpenPrototypeModal({
                        label: 'Community Channel: Instagram',
                        description: 'Simulated photojournalism updates from neighbourhood care networks.'
                      });
                    }
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="#youtube"
                  className={styles.socialBtn}
                  aria-label="YouTube"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenPrototypeModal) {
                      onOpenPrototypeModal({
                        label: 'Community Channel: YouTube',
                        description: 'Simulated caregiving tutorials and local response briefings.'
                      });
                    }
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                  </svg>
                </a>
              </div>

              <div className={styles.footerDivider} aria-hidden="true" />

              <p className={styles.footerPrototypeNote}>
                This is a fictional prototype created for design demonstration purposes only.
              </p>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Scenario Notice */}
          <div className={styles.footerBottomBar}>
            <p className={styles.footerCopyright}>
              © 2018 UJAAS Crisis Care Network. All rights reserved.
            </p>
            <p className={styles.footerDisclaimer}>
              Set in Bengaluru, April 2018. Fictional humanitarian scenario with zero real emergency claims.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};
