import React from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './RecipientConfirmationModal.module.css';

export const RecipientConfirmationModal: React.FC = () => {
  const {
    isRecipientConfirmModalOpen,
    closeRecipientConfirmModal,
    confirmRecipientReceipt,
    contacts
  } = useCareContext();

  const savitri = contacts.savitri;

  if (!isRecipientConfirmModalOpen) return null;

  return (
    <div
      className={`${styles.backdrop} ${styles.backdropOpen}`}
      onClick={closeRecipientConfirmModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipient-confirm-title"
    >
      <div className={`${styles.modal} ${styles.modalOpen}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.badge}>
            <ShieldCheck size={14} />
            Simulated Recipient Verification
          </span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeRecipientConfirmModal}
            aria-label="Close verification modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          {savitri && (
            <img
              src={savitri.avatar}
              alt=""
              width={76}
              height={76}
              className={styles.avatar}
            />
          )}

          <h2 id="recipient-confirm-title" className={styles.modalTitle}>
            Did you receive your groceries?
          </h2>

          <p className={styles.modalText}>
            Aarav reported delivering your requested groceries to your residence in Indiranagar.
          </p>

          <div className={styles.itemsSummaryPill}>
            <span>Rice (5kg) • Toor Dal (2kg) • Vegetables • Fresh Fruit • Cooking Oil</span>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.confirmYesBtn}
            onClick={() => confirmRecipientReceipt(true)}
          >
            <Check size={18} />
            <span>Yes, I received them</span>
          </button>

          <button
            type="button"
            className={styles.confirmNoBtn}
            onClick={() => confirmRecipientReceipt(false)}
          >
            <span>No, I haven't received them</span>
          </button>
        </div>
      </div>
    </div>
  );
};
