import React from 'react';
import { UserPlus, Sparkles, UserCheck, ArrowRight, ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import { useAccountContext } from '../../context/AccountContext';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './AccountAccessView.module.css';

interface AccountAccessViewProps {
  onStartOnboarding: () => void;
  onContinueAsAarav: () => void;
  onEmergencyClick: () => void;
  onGoHome: () => void;
}

export const AccountAccessView: React.FC<AccountAccessViewProps> = ({
  onStartOnboarding,
  onContinueAsAarav,
  onEmergencyClick,
  onGoHome
}) => {
  const { accounts, switchAccount } = useAccountContext();
  const { navigateTo } = useCareContext();

  const customAccounts = accounts.filter(a => a.id !== 'aarav');

  const handleSelectAccount = (id: string) => {
    switchAccount(id);
    navigateTo('my_circle');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Navigation back */}
        <div className={styles.topRow}>
          <button type="button" className={styles.backBtn} onClick={onGoHome}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <button type="button" className={styles.emergencyBtn} onClick={onEmergencyClick}>
            <Phone size={14} />
            <span>Emergency Info</span>
          </button>
        </div>

        {/* Editorial Heading in Canela */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.flagIcon}>🇮🇳</span>
            <span>UJAAS · CRISIS CARE ACCESS</span>
          </div>
          <h1 className={styles.headline}>A little care goes a long way.</h1>
          <p className={styles.subtitle}>
            Join your circle, ask for support, or help someone you know. Choose how you would like to experience UJAAS today.
          </p>
        </div>

        {/* 3 Primary Option Cards Grid */}
        <div className={styles.cardsGrid}>
          {/* Card A: Create a profile */}
          <div className={`${styles.accessCard} ${styles.cardCreate}`}>
            <div className={styles.cardBadge}>EXPERIENCE A</div>
            <div className={styles.iconCircle}>
              <UserPlus size={24} className={styles.cardIcon} />
            </div>
            <h2 className={styles.cardTitle}>Create a profile</h2>
            <p className={styles.cardDescription}>
              Set up your UJAAS account in a few simple steps. Select your intention, set your neighbourhood, choose capabilities, and build your trusted circle.
            </p>
            <div className={styles.cardFeature}>
              <ShieldCheck size={16} className={styles.featureIcon} />
              <span>Full 7-step human-centred onboarding</span>
            </div>
            <button
              type="button"
              className={styles.primaryActionBtn}
              onClick={onStartOnboarding}
            >
              <span>Get started</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card B: Continue as Aarav (Canonical Demo) */}
          <div className={`${styles.accessCard} ${styles.cardAarav}`}>
            <div className={`${styles.cardBadge} ${styles.badgeFeatured}`}>EXPERIENCE B · RECOMMENDED</div>
            <div className={styles.aaravAvatarRow}>
              <img
                src={getAssetUrl('/images/contacts/aarav.png')}
                alt="Aarav Sharma"
                className={styles.aaravAvatar}
              />
              <div>
                <h2 className={styles.cardTitle} style={{ margin: 0 }}>Aarav Sharma</h2>
                <span className={styles.cardSub}>Grandson · Volunteer · Indiranagar</span>
              </div>
            </div>
            <p className={styles.cardDescription}>
              Explore a ready-made care network and a complete fictional assistance journey with Savitri Amma, caregiver check-ins, and the full Care Chain.
            </p>
            <div className={styles.cardFeature}>
              <Sparkles size={16} className={styles.featureIcon} />
              <span>Instant access · Fully seeded network</span>
            </div>
            <button
              type="button"
              className={`${styles.primaryActionBtn} ${styles.aaravActionBtn}`}
              onClick={onContinueAsAarav}
            >
              <span>Try Aarav's demo</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card C: Sign in to saved profile */}
          <div className={`${styles.accessCard} ${styles.cardSaved}`}>
            <div className={styles.cardBadge}>SAVED PROFILES</div>
            <div className={styles.iconCircle}>
              <UserCheck size={24} className={styles.cardIcon} />
            </div>
            <h2 className={styles.cardTitle}>Saved on this device</h2>
            <p className={styles.cardDescription}>
              Return to a profile you have created on this browser. All your preferences and contacts are safely preserved.
            </p>

            {customAccounts.length > 0 ? (
              <div className={styles.savedList}>
                {customAccounts.map(acc => (
                  <button
                    key={acc.id}
                    type="button"
                    className={styles.savedUserRow}
                    onClick={() => handleSelectAccount(acc.id)}
                  >
                    <img
                      src={getAssetUrl(acc.avatar || '/images/contacts/aarav.png')}
                      alt={acc.firstName}
                      className={styles.savedAvatar}
                    />
                    <div className={styles.savedMeta}>
                      <span className={styles.savedName}>{acc.firstName} {acc.lastName}</span>
                      <span className={styles.savedLocation}>{acc.neighbourhood || 'Bengaluru'}</span>
                    </div>
                    <ArrowRight size={15} className={styles.savedArrow} />
                  </button>
                ))}
              </div>
            ) : (
              <div className={styles.emptySaved}>
                <p>No custom profiles created yet on this device.</p>
                <span className={styles.emptyHint}>Create your profile to test custom onboarding.</span>
              </div>
            )}

            <button
              type="button"
              className={styles.secondaryActionBtn}
              onClick={onStartOnboarding}
            >
              <span>+ Create another profile</span>
            </button>
          </div>
        </div>

        {/* Bottom Attribution Notice */}
        <div className={styles.footerNote}>
          <div className={styles.civicPill}>
            <span>UJAAS · An India-first civic care concept</span>
            <span>•</span>
            <span>Fictional public-service initiative · Interactive prototype</span>
          </div>
        </div>
      </div>
    </div>
  );
};
