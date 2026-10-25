import React from 'react';
import { Heart, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_CONTENT } from '../data/content';
import { IntentType } from '../types';
import { useAccountContext } from '../context/AccountContext';
import { useCareContext } from '../context/CareContext';
import styles from './HeroCopy.module.css';

interface HeroCopyProps {
  onSelectIntent: (intent: IntentType) => void;
}

export const HeroCopy: React.FC<HeroCopyProps> = ({ onSelectIntent }) => {
  const { switchAccount } = useAccountContext();
  const { navigateTo } = useCareContext();

  const handleTryAarav = () => {
    switchAccount('aarav');
    navigateTo('my_circle');
  };

  return (
    <div className={styles.copyContainer}>
      {/* Eyebrow */}
      <div className={styles.eyebrowWrapper}>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <p className={styles.eyebrow}>{HERO_CONTENT.eyebrow}</p>
      </div>

      {/* Main Headline in Canela */}
      <h1 className={styles.headline}>
        <span className={styles.headlineNavy}>{HERO_CONTENT.headline.line1}</span>
        <span className={styles.headlineOrange}>{HERO_CONTENT.headline.line2}</span>
      </h1>

      {/* Supporting Paragraph in Inter */}
      <p className={styles.paragraph}>
        {HERO_CONTENT.paragraph}
      </p>

      {/* Primary User Intention Action Buttons */}
      <div className={styles.buttonGroup} role="group" aria-label="Choose your crisis response action">
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => onSelectIntent('need-help')}
          aria-label="I need help - Request community care or essential supplies"
        >
          <span className={styles.btnIconWrapper}>
            <Heart size={19} className={styles.btnIcon} strokeWidth={2.4} fill="currentColor" />
          </span>
          <span className={styles.btnLabel}>{HERO_CONTENT.ctas.primary}</span>
          <ArrowRight size={18} className={styles.btnArrow} strokeWidth={2.4} />
        </button>

        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => onSelectIntent('can-help')}
          aria-label="I can help - Volunteer care, time, or assistance for survivors"
        >
          <span className={styles.btnIconWrapper}>
            <Users size={19} className={styles.btnIcon} strokeWidth={2.2} />
          </span>
          <span className={styles.btnLabel}>{HERO_CONTENT.ctas.secondary}</span>
          <ArrowRight size={18} className={styles.btnArrow} strokeWidth={2.4} />
        </button>
      </div>

      {/* Evaluator Demo Shortcut */}
      <div style={{ marginTop: '14px', marginBottom: '14px' }}>
        <button
          type="button"
          onClick={handleTryAarav}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FFFFFF',
            border: '1.5px solid #091C33',
            boxShadow: '2px 2px 0px #091C33',
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#091C33',
            cursor: 'pointer'
          }}
          title="Directly enter the canonical Aarav demo"
        >
          <Sparkles size={13} color="#F45124" />
          <span>Demo shortcut: Continue as Aarav (Indiranagar) →</span>
        </button>
      </div>

      {/* Humanist Support / Trust Indicators */}
      <div className={styles.trustStrip}>
        <div className={styles.trustItem}>
          <ShieldCheck size={16} className={styles.trustIcon} />
          <span>Verified Local Neighbors</span>
        </div>
        <span className={styles.trustDivider}>•</span>
        <div className={styles.trustItem}>
          <span>No Bureaucracy</span>
        </div>
        <span className={styles.trustDivider}>•</span>
        <div className={styles.trustItem}>
          <span>100% Free & Community-Led</span>
        </div>
      </div>
    </div>
  );
};
