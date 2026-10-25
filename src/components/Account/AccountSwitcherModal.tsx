import React from 'react';
import { X, Check, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAccountContext } from '../../context/AccountContext';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './AccountSwitcherModal.module.css';

interface AccountSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNewProfile: () => void;
}

export const AccountSwitcherModal: React.FC<AccountSwitcherModalProps> = ({
  isOpen,
  onClose,
  onCreateNewProfile
}) => {
  const { accounts, activeAccountId, switchAccount } = useAccountContext();
  const { navigateTo } = useCareContext();

  if (!isOpen) return null;

  const handleSelectAccount = (id: string) => {
    switchAccount(id);
    onClose();
    navigateTo('my_circle');
  };

  const handleCreateNew = () => {
    onClose();
    onCreateNewProfile();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="switcher-title">
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>UJAAS · ACCOUNT SWITCHER</div>
            <h2 id="switcher-title" className={styles.title}>
              Choose how you'd like to continue.
            </h2>
            <p className={styles.subtitle}>
              Switch between demonstration profiles or create a new profile. Task assignments and progress remain preserved.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close account switcher"
          >
            <X size={20} />
          </button>
        </div>

        {/* Account Cards List */}
        <div className={styles.accountList}>
          {accounts.map(acc => {
            const isActive = acc.id === activeAccountId;
            const isAarav = acc.id === 'aarav';

            return (
              <div
                key={acc.id}
                className={`${styles.accountCard} ${isActive ? styles.activeCard : ''}`}
                onClick={() => handleSelectAccount(acc.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectAccount(acc.id);
                  }
                }}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.avatarWrap}>
                    <img
                      src={getAssetUrl(acc.avatar || '/images/contacts/aarav.png')}
                      alt={acc.firstName}
                      className={styles.avatar}
                    />
                    {isActive && (
                      <span className={styles.activeBadge} title="Currently active profile">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <div className={styles.info}>
                    <div className={styles.nameRow}>
                      <span className={styles.name}>
                        {acc.firstName} {acc.lastName}
                      </span>
                      {isAarav ? (
                        <span className={styles.demoTag}>Main demo account</span>
                      ) : acc.id === 'nisha' ? (
                        <span className={styles.demoTag}>Seeded requester</span>
                      ) : (
                        <span className={styles.customTag}>Custom profile</span>
                      )}
                    </div>
                    <div className={styles.metaRow}>
                      <span>{acc.neighbourhood || 'Indiranagar'}, {acc.city || 'Bengaluru'}</span>
                      <span>•</span>
                      <span>
                        {acc.id === 'nisha'
                          ? 'Household requester (Food & water)'
                          : acc.primaryIntent === 'want_to_help'
                          ? 'Volunteer / Helper'
                          : acc.primaryIntent === 'need_help'
                          ? 'Seeking support'
                          : 'Concerned for family'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  {isActive ? (
                    <span className={styles.currentPill}>Active Profile</span>
                  ) : (
                    <span className={styles.switchAction}>
                      <span>Switch</span>
                      <ArrowRight size={14} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add Another Profile Card */}
          <div
            className={styles.addAccountCard}
            onClick={handleCreateNew}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCreateNew();
              }
            }}
          >
            <div className={styles.addIconCircle}>
              <UserPlus size={20} />
            </div>
            <div className={styles.addInfo}>
              <span className={styles.addTitle}>Create another demo profile</span>
              <span className={styles.addSub}>
                Set up an additional fictional profile to test another perspective (seeker, helper, or concerned relative).
              </span>
            </div>
            <ArrowRight size={16} className={styles.addArrow} />
          </div>
        </div>

        {/* Footer info */}
        <div className={styles.footer}>
          <div className={styles.privacyNote}>
            <ShieldCheck size={15} />
            <span>Profiles and tasks are saved locally on this browser.</span>
          </div>
          <button type="button" className={styles.doneBtn} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
