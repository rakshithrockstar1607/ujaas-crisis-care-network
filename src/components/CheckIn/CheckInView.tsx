import React, { useState } from 'react';
import { ArrowLeft, PhoneCall, CheckSquare, MessageSquareShare, ArrowRight } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './CheckInView.module.css';

export const CheckInView: React.FC = () => {
  const {
    contacts,
    performCheckIn,
    navigateTo,
    openAlternativeContactModal
  } = useCareContext();

  const [isSimulatingCall, setIsSimulatingCall] = useState(false);
  const savitri = contacts.savitri;

  const handleStartSimulatedCheckIn = () => {
    setIsSimulatingCall(true);
    // 1.8s authentic transition showing call connecting to Savitri Amma's landline
    setTimeout(() => {
      performCheckIn('call');
    }, 1800);
  };

  const handleManualCheckIn = () => {
    performCheckIn('manual', "I spoke with Savitri Amma in person. She is safe at home and confirmed running low on groceries.");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Navigation Breadcrumb */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigateTo('care_concern')}
          aria-label="Back to Care Concern Review"
        >
          <ArrowLeft size={16} />
          <span>Back to Evaluation</span>
        </button>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrow}>VERIFICATION STEP</span>
          </div>
          <h1 className={styles.headline}>Check on Savitri Amma</h1>
          <p className={styles.subheadline}>
            Let's confirm how she is and what everyday support she might need.
          </p>
        </div>

        {/* Recipient Profile Bar */}
        {savitri && (
          <div className={styles.recipientBar}>
            <img
              src={savitri.avatar}
              alt=""
              width={56}
              height={56}
              className={styles.avatar}
            />
            <div className={styles.recipientText}>
              <span className={styles.recipientName}>{savitri.name} (Age {savitri.age})</span>
              <span className={styles.recipientLocation}>{savitri.location} • Usual contact: {savitri.phone}</span>
            </div>
          </div>
        )}

        {/* Calling Transition State */}
        {isSimulatingCall ? (
          <div className={styles.callingOverlay} role="status" aria-live="polite">
            <div className={styles.pulseAnimationWrapper}>
              <div className={styles.pulseRing} />
              <div className={`${styles.pulseRing} ${styles.pulseRingDelay}`} />
              <div className={styles.phoneIconCenter}>
                <PhoneCall size={26} />
              </div>
            </div>
            <div>
              <h2 className={styles.callingStatus}>Connecting to Savitri Amma's landline...</h2>
              <p className={styles.callingSub}>
                Simulating verified crisis check-in protocol via Indiranagar local exchange.
              </p>
            </div>
          </div>
        ) : (
          /* Three Interaction Options */
          <div className={styles.optionsList} role="region" aria-label="Check-in options">
            {/* Option A: Simulate a check-in */}
            <div
              className={`${styles.optionCard} ${styles.primaryOption}`}
              onClick={handleStartSimulatedCheckIn}
              tabIndex={0}
              role="button"
              aria-label="Option A: Simulate a check-in - Call Savitri Amma and receive simulated voice transcript"
              onKeyDown={(e) => e.key === 'Enter' && handleStartSimulatedCheckIn()}
            >
              <div className={styles.optionLeft}>
                <div className={styles.optionIconCircle}>
                  <PhoneCall size={24} />
                </div>
                <div className={styles.optionContent}>
                  <span className={styles.optionBadge}>Recommended Demo Path</span>
                  <h3 className={styles.optionTitle}>Simulate a check-in</h3>
                  <p className={styles.optionDesc}>
                    Place a simulated call to Savitri Amma. Listen to her direct response and automatically record verified care requirements.
                  </p>
                </div>
              </div>

              <button type="button" className={styles.optionCtaBtn}>
                <span>Call Now</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Option B: I've already checked in */}
            <div
              className={styles.optionCard}
              onClick={handleManualCheckIn}
              tabIndex={0}
              role="button"
              aria-label="Option B: I have already checked in - Record notes manually"
              onKeyDown={(e) => e.key === 'Enter' && handleManualCheckIn()}
            >
              <div className={styles.optionLeft}>
                <div className={`${styles.optionIconCircle} ${styles.optionIconSecondary}`}>
                  <CheckSquare size={24} />
                </div>
                <div className={styles.optionContent}>
                  <h3 className={styles.optionTitle}>I've already checked in</h3>
                  <p className={styles.optionDesc}>
                    Record a recent direct observation or manual in-person visit you conducted with Savitri Amma today.
                  </p>
                </div>
              </div>

              <ArrowRight size={20} color="#718096" />
            </div>

            {/* Option C: Try another contact method */}
            <div
              className={styles.optionCard}
              onClick={openAlternativeContactModal}
              tabIndex={0}
              role="button"
              aria-label="Option C: Try another contact method - Reach out to neighbours or coordinator"
              onKeyDown={(e) => e.key === 'Enter' && openAlternativeContactModal()}
            >
              <div className={styles.optionLeft}>
                <div className={`${styles.optionIconCircle} ${styles.optionIconSecondary}`}>
                  <MessageSquareShare size={24} />
                </div>
                <div className={styles.optionContent}>
                  <h3 className={styles.optionTitle}>Try another contact method</h3>
                  <p className={styles.optionDesc}>
                    Ask next-door neighbour Vikram, contact another family relative, or request a coordinator-reviewed welfare check.
                  </p>
                </div>
              </div>

              <ArrowRight size={20} color="#718096" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
