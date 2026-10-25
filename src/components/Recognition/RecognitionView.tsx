import React from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './RecognitionView.module.css';

export const RecognitionView: React.FC = () => {
  const {
    contacts,
    navigateTo
  } = useCareContext();

  const savitri = contacts.savitri;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Recipient Photo with Success Seal */}
        <div className={styles.successBadgeWrap}>
          {savitri && (
            <img
              src={savitri.avatar}
              alt="Savitri Amma"
              width={110}
              height={110}
              className={styles.avatar}
            />
          )}
          <div className={styles.checkSeal} aria-hidden="true">
            <Check size={20} strokeWidth={3} />
          </div>
        </div>

        {/* Headline Group */}
        <div className={styles.headlineGroup}>
          <h1 className={styles.headline}>Grocery delivery confirmed!</h1>
          <p className={styles.subheadline}>
            Savitri Amma has received her groceries in Indiranagar.
          </p>
        </div>

        {/* Recognition Card */}
        <div className={styles.recognitionCard}>
          <div className={styles.cardTopAccent} aria-hidden="true" />
          
          <div>
            <span className={styles.recognitionEyebrow}>COMMITMENT FULFILLED</span>
            <h2 className={styles.recognitionTitle}>A Promise Kept</h2>
            <p className={styles.recognitionBody}>
              <strong>You showed up when it mattered.</strong> One responsibility has been completed and confirmed. A little care can make tomorrow easier.
            </p>
          </div>

          <div className={styles.quoteCard}>
            <p className={styles.quoteText}>
              "Thank you so much, Aarav beta. The vegetables and rice arrived safely. It's such a relief to have the kitchen stocked for the week."
            </p>
            <span className={styles.quoteAuthor}>— Savitri Amma, Indiranagar</span>
          </div>
        </div>

        {/* Nuanced Partial Resolution Status */}
        <div className={styles.remainingNotice} role="status">
          <ShieldCheck size={18} />
          <span>Groceries completed • 2 care responsibilities remain open</span>
        </div>

        {/* Action Navigation */}
        <div className={styles.actionFooter}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => navigateTo('my_circle')}
          >
            <span>Back to My Circle</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => navigateTo('care_chain')}
          >
            <span>View Remaining Needs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
