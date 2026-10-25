import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './FindAnotherHelperModal.module.css';

export const FindAnotherHelperModal: React.FC = () => {
  const {
    isAlternativeHelperModalOpen,
    closeAlternativeHelperModal,
    contacts,
    navigateTo
  } = useCareContext();

  const [requestedMap, setRequestedMap] = useState<Record<string, boolean>>({});

  if (!isAlternativeHelperModalOpen) return null;

  const trustedHelpers = [
    contacts.rohan,
    contacts.priya,
    contacts.vikram
  ].filter(Boolean);

  const handleRequest = (id: string) => {
    setRequestedMap(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div
      className={`${styles.backdrop} ${styles.backdropOpen}`}
      onClick={closeAlternativeHelperModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="helper-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="helper-modal-title" className={styles.modalTitle}>
            Request Another Helper
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeAlternativeHelperModal}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.introText}>
            If you cannot complete this task, you can request support from other verified contacts in Savitri Amma's circle:
          </p>

          <div className={styles.helpersList}>
            {trustedHelpers.map((helper) => {
              const isRequested = requestedMap[helper.id];

              return (
                <div key={helper.id} className={styles.helperCard}>
                  <div className={styles.helperLeft}>
                    <img
                      src={helper.avatar}
                      alt=""
                      width={46}
                      height={46}
                      className={styles.avatar}
                    />
                    <div>
                      <div className={styles.helperName}>{helper.name}</div>
                      <div className={styles.helperMeta}>
                        {helper.relationship} • {helper.location}
                      </div>
                    </div>
                  </div>

                  {isRequested ? (
                    <span className={styles.requestedBadge}>
                      <Check size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                      Request Sent
                    </span>
                  ) : (
                    <button
                      type="button"
                      className={styles.requestBtn}
                      onClick={() => handleRequest(helper.id)}
                    >
                      Request Help
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.doneBtn}
            onClick={() => {
              closeAlternativeHelperModal();
              navigateTo('find_helper');
            }}
            style={{ backgroundColor: '#1A56DB', color: '#FFFFFF', marginRight: 'auto' }}
          >
            Open Helper Care Map &amp; Routes
          </button>
          <button
            type="button"
            className={styles.doneBtn}
            onClick={closeAlternativeHelperModal}
          >
            Back to Task
          </button>
        </div>
      </div>
    </div>
  );
};
