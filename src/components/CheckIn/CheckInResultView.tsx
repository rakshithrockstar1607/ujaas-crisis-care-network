import React from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, Pill, Bus, ShieldCheck } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './CheckInResultView.module.css';

export const CheckInResultView: React.FC = () => {
  const {
    contacts,
    checkInRecord,
    navigateTo
  } = useCareContext();

  const savitri = contacts.savitri;
  const quoteText =
    checkInRecord?.response ||
    "I'm safe at home, beta. Meera hasn't been able to visit, and I'm running low on groceries, especially rice and vegetables. I could use some help this week.";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Navigation Breadcrumb */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigateTo('my_circle')}
          aria-label="Back to My Circle"
        >
          <ArrowLeft size={16} />
          <span>Back to My Circle</span>
        </button>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrow}>CHECK-IN VERIFIED</span>
          </div>
          <h1 className={styles.headline}>Direct Check-in Recorded</h1>
          <p className={styles.subheadline}>
            Savitri Amma's situation has been updated in the crisis network. Her immediate care needs are clarified below.
          </p>
        </div>

        {/* Simulated Transcript Card */}
        <div className={styles.transcriptCard}>
          <div className={styles.transcriptMetaBar}>
            {savitri && (
              <div className={styles.speakerProfile}>
                <img
                  src={savitri.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className={styles.speakerAvatar}
                />
                <div>
                  <span className={styles.speakerName}>{savitri.name}</span>
                  <div className={styles.speakerRole}>Recipient • Recorded via Phone Check-in</div>
                </div>
              </div>
            )}
            <span className={styles.simulatedPill}>Simulated Transcript</span>
          </div>

          <blockquote className={styles.quoteBubble}>
            "{quoteText}"
          </blockquote>
        </div>

        {/* Derived Results Grid */}
        <div className={styles.resultsSection}>
          <h2 className={styles.resultsHeading}>Derived Care Assessment</h2>

          <div className={styles.resultsGrid}>
            {/* 1. Immediate Safety */}
            <div className={`${styles.resultCard} ${styles.cardSafe}`}>
              <div className={`${styles.resultIconCircle} ${styles.iconSafe}`}>
                <ShieldCheck size={20} />
              </div>
              <div className={styles.resultCardBody}>
                <span className={styles.resultCategory}>Immediate Safety</span>
                <h3 className={styles.resultTitle}>Safe at Home</h3>
                <p className={styles.resultStatusText}>
                  Confirmed present and secure inside her residence in Indiranagar.
                </p>
              </div>
            </div>

            {/* 2. Groceries - Confirmed Need */}
            <div className={`${styles.resultCard} ${styles.cardConfirmed}`}>
              <div className={`${styles.resultIconCircle} ${styles.iconConfirmed}`}>
                <ShoppingBag size={20} />
              </div>
              <div className={styles.resultCardBody}>
                <span className={styles.resultCategory}>Essential Supplies</span>
                <h3 className={styles.resultTitle}>Groceries: Confirmed Need</h3>
                <p className={styles.resultStatusText}>
                  Running low on staples (rice, toor dal, fresh vegetables). Delivery required within 1–2 days.
                </p>
              </div>
            </div>

            {/* 3. Medication Refill */}
            <div className={styles.resultCard}>
              <div className={`${styles.resultIconCircle} ${styles.iconPending}`}>
                <Pill size={20} />
              </div>
              <div className={styles.resultCardBody}>
                <span className={styles.resultCategory}>Healthcare</span>
                <h3 className={styles.resultTitle}>Medication: Upcoming Refill</h3>
                <p className={styles.resultStatusText}>
                  Current stock has ~3 days remaining. Refill needs review before weekend.
                </p>
              </div>
            </div>

            {/* 4. Routine Hospital Transport */}
            <div className={styles.resultCard}>
              <div className={`${styles.resultIconCircle} ${styles.iconPending}`}>
                <Bus size={20} />
              </div>
              <div className={styles.resultCardBody}>
                <span className={styles.resultCategory}>Mobility</span>
                <h3 className={styles.resultTitle}>Hospital Transport: Pending</h3>
                <p className={styles.resultStatusText}>
                  Ophthalmology visit scheduled in 5 days. Driver coordination unassigned.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className={styles.actionFooter}>
          <button
            type="button"
            className={styles.primaryActionBtn}
            onClick={() => navigateTo('care_chain')}
          >
            <span>View Full Care Plan</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className={styles.secondaryActionBtn}
            onClick={() => navigateTo('my_circle')}
          >
            <span>Return to My Circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
