import React from 'react';
import { Check, Globe, ShieldCheck, Heart, Users, MapPin, ArrowRight, Settings } from 'lucide-react';
import { OnboardingDraft } from '../../types/account';
import { SUPPORTED_LANGUAGES } from '../../data/seedAccounts';
import { getAssetUrl } from '../../utils/assets';
import styles from './Step11ReviewWelcome.module.css';

interface Step11ReviewWelcomeProps {
  draft: OnboardingDraft;
  onEnterUjaas: () => void;
  onOpenSettings: () => void;
  onEditStep?: (step: number) => void;
}

export const Step11ReviewWelcome: React.FC<Step11ReviewWelcomeProps> = ({
  draft,
  onEnterUjaas,
  onOpenSettings
}) => {
  const langObj = SUPPORTED_LANGUAGES.find(l => l.code === draft.language) || SUPPORTED_LANGUAGES[0];
  const numCapabilities = draft.helperCapabilities?.length || 2;
  const numTrusted = draft.trustedContactIds?.length || 3;

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Your circle is a little stronger now.</h1>
      <p className={styles.subtitle}>
        Review what you chose and enter UJAAS with a meaningful next step.
      </p>

      {/* Split Review Card (Ref 11) */}
      <div className={styles.reviewCard}>
        {/* Left Side: Welcome Hero */}
        <div className={styles.welcomeHero}>
          <div className={styles.checkIconBig}>
            <Check size={28} strokeWidth={3} />
          </div>

          <div className={styles.eyebrow}>YOUR CIRCLE BEGINS HERE</div>
          <h2 className={styles.welcomeTitle}>
            Welcome, <span className={styles.welcomeName}>{draft.firstName || 'Aarav'}.</span>
          </h2>

          <p className={styles.welcomeDesc}>
            You're ready to show up for the people who matter. You can still ask for help whenever you need it.
          </p>

          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.exploreBtn}
              onClick={onEnterUjaas}
            >
              <span>Explore My Circle</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={styles.settingsBtn}
              onClick={onOpenSettings}
            >
              <span>Review my settings</span>
              <Settings size={15} />
            </button>
          </div>
        </div>

        {/* Right Side: Summary Card */}
        <div className={styles.summaryCard}>
          <div className={styles.userHeader}>
            <img
              src={getAssetUrl('/images/contacts/aarav.png')}
              alt={draft.firstName}
              className={styles.userAvatar}
            />
            <div>
              <h3 className={styles.userName}>
                {draft.firstName || 'Aarav'} {draft.lastName || 'Sharma'}
              </h3>
              <p className={styles.userSub}>
                {draft.neighbourhood || 'Indiranagar'} · {draft.city || 'Bengaluru'}
              </p>
              <span className={styles.availPill}>● Available to help</span>
            </div>
          </div>

          <div className={styles.summaryRows}>
            <div className={styles.summaryRow}>
              <div className={styles.rowLabel}>
                <Globe size={14} className={styles.rowIcon} />
                <span>Language</span>
              </div>
              <span className={styles.rowValue}>{langObj.native}</span>
            </div>

            <div className={styles.summaryRow}>
              <div className={styles.rowLabel}>
                <ShieldCheck size={14} className={styles.rowIcon} />
                <span>Phone verification</span>
              </div>
              <span className={styles.rowValue}>Simulated</span>
            </div>

            <div className={styles.summaryRow}>
              <div className={styles.rowLabel}>
                <Heart size={14} className={styles.rowIcon} />
                <span>Ways to help</span>
              </div>
              <span className={styles.rowValue}>{numCapabilities} selected</span>
            </div>

            <div className={styles.summaryRow}>
              <div className={styles.rowLabel}>
                <Users size={14} className={styles.rowIcon} />
                <span>Trusted invitations</span>
              </div>
              <span className={styles.rowValue}>{numTrusted} selected · Pending consent</span>
            </div>

            <div className={styles.summaryRow}>
              <div className={styles.rowLabel}>
                <MapPin size={14} className={styles.rowIcon} />
                <span>Approximate area</span>
              </div>
              <span className={styles.rowValue}>{draft.neighbourhood || 'Indiranagar'}</span>
            </div>
          </div>

          <div className={styles.disclaimerPill}>
            ℹ️ Interactive prototype. No real invitations, verification texts or emergency requests have been sent.
          </div>
        </div>
      </div>
    </div>
  );
};
