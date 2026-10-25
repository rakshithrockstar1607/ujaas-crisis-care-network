import React, { useState } from 'react';
import { X, UserCheck, PhoneCall, ShieldAlert } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './AlternativeContactModal.module.css';

export const AlternativeContactModal: React.FC = () => {
  const {
    isAlternativeContactModalOpen,
    closeAlternativeContactModal
  } = useCareContext();

  const [recordedAction, setRecordedAction] = useState<string | null>(null);

  if (!isAlternativeContactModalOpen) return null;

  return (
    <div
      className={`${styles.backdrop} ${styles.backdropOpen}`}
      onClick={closeAlternativeContactModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alt-contact-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="alt-contact-modal-title" className={styles.modalTitle}>
            Alternative Verification Methods
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeAlternativeContactModal}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.introText}>
            If Savitri Amma is temporarily unreachable by phone, select an authorized local verification channel:
          </p>

          <div className={styles.optionsList}>
            {/* Option 1: Neighbour Vikram Check */}
            <div
              className={styles.optionItem}
              onClick={() => setRecordedAction('vikram')}
              tabIndex={0}
              role="button"
            >
              <div className={styles.optionIconWrap}>
                <UserCheck size={20} />
              </div>
              <div>
                <div className={styles.optionTitle}>Dispatch Neighbour Check (Vikram)</div>
                <div className={styles.optionDesc}>
                  Ask next-door neighbour Vikram to knock and confirm visual safety in person.
                </div>
                {recordedAction === 'vikram' && (
                  <div style={{ color: '#287346', fontWeight: 600, fontSize: '0.8rem', marginTop: 4 }}>
                    ✓ Request logged for Vikram
                  </div>
                )}
              </div>
            </div>

            {/* Option 2: Family Chain Relay */}
            <div
              className={styles.optionItem}
              onClick={() => setRecordedAction('relay')}
              tabIndex={0}
              role="button"
            >
              <div className={styles.optionIconWrap}>
                <PhoneCall size={20} />
              </div>
              <div>
                <div className={styles.optionTitle}>Coordinate via Cousin Priya</div>
                <div className={styles.optionDesc}>
                  Call Priya to check if she spoke with Meera or Savitri Amma earlier today.
                </div>
                {recordedAction === 'relay' && (
                  <div style={{ color: '#287346', fontWeight: 600, fontSize: '0.8rem', marginTop: 4 }}>
                    ✓ Routed to Priya's contact line
                  </div>
                )}
              </div>
            </div>

            {/* Option 3: Request Coordinator Welfare Check */}
            <div
              className={styles.optionItem}
              onClick={() => setRecordedAction('welfare')}
              tabIndex={0}
              role="button"
            >
              <div className={styles.optionIconWrap}>
                <ShieldAlert size={20} />
              </div>
              <div>
                <div className={styles.optionTitle}>Request Coordinator Welfare Visit</div>
                <div className={styles.optionDesc}>
                  Submit an escalated review to the Indiranagar Community Care post for a physical visit.
                </div>
                {recordedAction === 'welfare' && (
                  <div style={{ color: '#287346', fontWeight: 600, fontSize: '0.8rem', marginTop: 4 }}>
                    ✓ Welfare ticket dispatched to Indiranagar Hub
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.closeFooterBtn}
            onClick={closeAlternativeContactModal}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
