import React from 'react';
import { ShieldCheck, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';
import styles from './OnboardingLayout.module.css';

interface OnboardingLayoutProps {
  currentStep: number; // 1 to 7
  totalSteps?: number;
  stepName?: string;
  leftQuoteHeading: string;
  leftQuoteSub: string;
  onBack?: () => void;
  onContinue?: () => void;
  continueText?: string;
  continueDisabled?: boolean;
  onSkip?: () => void;
  skipText?: string;
  centerNote?: string;
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  leftQuoteHeading,
  leftQuoteSub,
  onBack,
  onContinue,
  continueText = 'Continue',
  continueDisabled = false,
  onSkip,
  skipText,
  centerNote = 'You can change these choices later.',
  children
}) => {
  const steps = [
    { num: 1, label: 'Your goal' },
    { num: 2, label: 'Language' },
    { num: 3, label: 'Identity' },
    { num: 4, label: 'Location' },
    { num: 5, label: 'Preferences' },
    { num: 6, label: 'My Circle' },
    { num: 7, label: 'Finish' }
  ];

  return (
    <div className={styles.splitPage}>
      {/* Left Column: Humanist Editorial Photo & Canela Typography */}
      <aside className={styles.leftCol} aria-label="UJAAS care vision">
        <div className={styles.photoBackground} />
        <div className={styles.photoOverlay} />

        <div className={styles.leftContent}>
          <div className={styles.leftEyebrow}>
            <Heart size={14} fill="currentColor" />
            <span>PEOPLE SUPPORTING PEOPLE</span>
          </div>

          <div className={styles.quoteBlock}>
            <h2 className={styles.leftHeadline}>{leftQuoteHeading}</h2>
            <p className={styles.leftSubtext}>{leftQuoteSub}</p>
          </div>

          <div className={styles.leftFooter}>
            <div className={styles.savitriAttribution}>
              <img
                src={getAssetUrl('/images/contacts/savitri.png')}
                alt="Savitri Amma"
                className={styles.savitriAvatar}
              />
              <span className={styles.savitriCaption}>
                Savitri Amma · A familiar face in your circle
              </span>
            </div>
            <div className={styles.credoLine}>
              CARE KNOWS NO SINGLE ROLE · HELP · CONNECTION · CONTINUITY
            </div>
          </div>
        </div>
      </aside>

      {/* Right Column: Step Form Experience */}
      <section className={styles.rightCol} aria-label="Onboarding form">
        <div className={styles.formContainer}>
          {/* Top Meta Bar */}
          <div className={styles.topMeta}>
            <div className={styles.metaBreadcrumb}>
              UJAAS / ONBOARDING
            </div>
            <div className={styles.metaPrivacy}>
              <ShieldCheck size={14} className={styles.shieldIcon} />
              <span>Private by design • Saved in this demo</span>
            </div>
          </div>

          {/* Stepper Progress Bar (1 to 7) */}
          <div className={styles.stepperWrap} role="navigation" aria-label="Onboarding progress">
            <div className={styles.stepperLine} aria-hidden="true" />
            <div className={styles.stepsList}>
              {steps.map(s => {
                const isPast = s.num < currentStep;
                const isCurrent = s.num === currentStep;

                return (
                  <div
                    key={s.num}
                    className={`${styles.stepItem} ${
                      isCurrent ? styles.stepCurrent : isPast ? styles.stepPast : ''
                    }`}
                  >
                    <div className={styles.stepCircle}>
                      {isPast ? '✓' : s.num}
                    </div>
                    <span className={styles.stepLabel}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Step Content */}
          <div className={styles.stepContent}>
            {children}
          </div>

          {/* Bottom Action Footer */}
          <footer className={styles.bottomNav}>
            {onBack ? (
              <button
                type="button"
                className={styles.backBtn}
                onClick={onBack}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className={styles.centerNote}>
              {centerNote}
            </div>

            <div className={styles.forwardActions}>
              {onSkip && (
                <button
                  type="button"
                  className={styles.skipBtn}
                  onClick={onSkip}
                >
                  {skipText || 'Skip for now'}
                </button>
              )}

              {onContinue && (
                <button
                  type="button"
                  className={styles.continueBtn}
                  onClick={onContinue}
                  disabled={continueDisabled}
                >
                  <span>{continueText}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};
