import React from 'react';
import { Heart, HandHeart, Users, ShieldCheck, Sparkles, Phone, Check } from 'lucide-react';
import { OnboardingIntent } from '../../types/account';
import styles from './Step01WelcomeIntent.module.css';

interface Step01WelcomeIntentProps {
  selectedIntent: OnboardingIntent;
  onSelectIntent: (intent: OnboardingIntent) => void;
  onContinue?: () => void;
  onPopulateAarav: () => void;
  onContinueAsAarav: () => void;
  onEmergencyClick: () => void;
}

export const Step01WelcomeIntent: React.FC<Step01WelcomeIntentProps> = ({
  selectedIntent,
  onSelectIntent,
  onPopulateAarav,
  onContinueAsAarav,
  onEmergencyClick
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.eyebrow}>01 / START WITH YOUR PURPOSE</div>
      <h1 className={styles.headline}>
        What brings you to <span className={styles.orangeWord}>UJAAS</span> today?
      </h1>
      <p className={styles.subtitle}>
        One community. Many ways to care. You can both ask for support and offer it.
      </p>

      {/* 3 Large Selectable Intention Cards */}
      <div className={styles.cardsList} role="radiogroup" aria-label="Choose your primary intention">
        {/* Option 1: I need help */}
        <div
          className={`${styles.intentCard} ${selectedIntent === 'need_help' ? styles.cardSelected : ''}`}
          onClick={() => onSelectIntent('need_help')}
          role="radio"
          aria-checked={selectedIntent === 'need_help'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelectIntent('need_help');
          }}
        >
          <div className={styles.iconCircle}>
            <Heart size={22} className={styles.cardIcon} />
          </div>
          <div className={styles.cardText}>
            <h2 className={styles.cardTitle}>I need help</h2>
            <p className={styles.cardDesc}>
              Find support for yourself, without delaying urgent care.
            </p>
          </div>
          <div className={styles.radioIndicator}>
            {selectedIntent === 'need_help' && <Check size={14} strokeWidth={3} />}
          </div>
        </div>

        {/* Option 2: I want to help (Demo Path) */}
        <div
          className={`${styles.intentCard} ${selectedIntent === 'want_to_help' ? styles.cardSelected : ''}`}
          onClick={() => onSelectIntent('want_to_help')}
          role="radio"
          aria-checked={selectedIntent === 'want_to_help'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelectIntent('want_to_help');
          }}
        >
          <span className={styles.demoBadge}>DEMO PATH</span>
          <div className={styles.iconCircle}>
            <HandHeart size={22} className={styles.cardIcon} />
          </div>
          <div className={styles.cardText}>
            <h2 className={styles.cardTitle}>I want to help</h2>
            <p className={styles.cardDesc}>
              Support people in your trusted circle or neighbourhood.
            </p>
          </div>
          <div className={styles.radioIndicator}>
            {selectedIntent === 'want_to_help' && <Check size={14} strokeWidth={3} />}
          </div>
        </div>

        {/* Option 3: I'm concerned about someone */}
        <div
          className={`${styles.intentCard} ${selectedIntent === 'concerned_about_someone' ? styles.cardSelected : ''}`}
          onClick={() => onSelectIntent('concerned_about_someone')}
          role="radio"
          aria-checked={selectedIntent === 'concerned_about_someone'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelectIntent('concerned_about_someone');
          }}
        >
          <div className={styles.iconCircle}>
            <Users size={22} className={styles.cardIcon} />
          </div>
          <div className={styles.cardText}>
            <h2 className={styles.cardTitle}>I'm concerned about someone</h2>
            <p className={styles.cardDesc}>
              Help check on a family member, friend or neighbour.
            </p>
          </div>
          <div className={styles.radioIndicator}>
            {selectedIntent === 'concerned_about_someone' && <Check size={14} strokeWidth={3} />}
          </div>
        </div>
      </div>

      {/* Helper notice & Evaluator Shortcuts */}
      <div className={styles.metaRow}>
        <div className={styles.noteLeft}>
          <ShieldCheck size={16} className={styles.shieldIcon} />
          <span>Your role can change anytime.</span>
        </div>

        <div className={styles.shortcutsGroup}>
          <button
            type="button"
            className={styles.shortcutBtn}
            onClick={onPopulateAarav}
            title="Prepopulate onboarding fields with Aarav's fictional answers"
          >
            <Sparkles size={14} />
            <span>See an example with Aarav</span>
          </button>

          <button
            type="button"
            className={styles.aaravSkipBtn}
            onClick={onContinueAsAarav}
            title="Skip onboarding and enter UJAAS as Aarav immediately"
          >
            <span>Continue as Aarav (Demo) →</span>
          </button>
        </div>
      </div>

      {/* Emergency Strip at Bottom (Ref 01) */}
      <div className={styles.emergencyStrip} onClick={onEmergencyClick} role="button" tabIndex={0}>
        <Phone size={14} className={styles.emergencyPhoneIcon} />
        <span>Need immediate help? Police 100 • Child protection 1098 • Emergency Info • No account required.</span>
      </div>
    </div>
  );
};
