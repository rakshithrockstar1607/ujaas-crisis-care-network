import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './CommitmentModal.module.css';

export const CommitmentModal: React.FC = () => {
  const {
    isCommitmentModalOpen,
    closeCommitmentModal,
    confirmCommitment
  } = useCareContext();

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  // Reset checkboxes on open
  useEffect(() => {
    if (isCommitmentModalOpen) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
    }
  }, [isCommitmentModalOpen]);

  const allChecked = check1 && check2 && check3;

  if (!isCommitmentModalOpen) return null;

  return (
    <div
      className={`${styles.backdrop} ${styles.backdropOpen}`}
      onClick={closeCommitmentModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="commitment-dialog-title"
    >
      <div className={`${styles.modal} ${styles.modalOpen}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="commitment-dialog-title" className={styles.modalTitle}>
            Can you take this responsibility?
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeCommitmentModal}
            aria-label="Cancel and close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Task:</span>
              <span className={styles.summaryVal}>Essential Grocery Delivery</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Recipient:</span>
              <span className={styles.summaryVal}>Savitri Amma (Indiranagar)</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Delivery Window:</span>
              <span className={styles.summaryVal}>Within 1–2 days</span>
            </div>
          </div>

          <div className={styles.checkboxGroup} role="group" aria-label="Commitment confirmations">
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
                className={styles.checkboxInput}
              />
              <span>I can complete this task within the requested timeframe (1–2 days).</span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
                className={styles.checkboxInput}
              />
              <span>I understand what needs to be delivered and will coordinate directly with Savitri Amma.</span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={check3}
                onChange={(e) => setCheck3(e.target.checked)}
                className={styles.checkboxInput}
              />
              <span>I will update the task or notify the network if I encounter any delays or cannot complete it.</span>
            </label>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={closeCommitmentModal}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.confirmBtn}
            disabled={!allChecked}
            onClick={confirmCommitment}
          >
            <Check size={18} />
            <span>Confirm Commitment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
