import React, { useState } from 'react';
import {
  Check,
  Lock,
  User,
  Users,
  Clock,
  Calendar,
  ArrowRight,
  GitBranch,
  X
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './ChildSafeStatusFollowUpView.module.css';

export const ChildSafeStatusFollowUpView: React.FC = () => {
  const {
    childSafeCase,
    toggleCoordinatorDemoMode,
    navigateTo
  } = useCareContext();

  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const caseId = childSafeCase?.id || 'UJAAS-CS-2018-001';
  const reporterName = childSafeCase?.reporterName || 'Aarav Sharma';
  const area = childSafeCase?.approximateArea || 'Indiranagar, Bengaluru';

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Top Bar Row: Eyebrow on left, Mode Switchers on right matching Reference 04 */}
        <div className={styles.topBarRow}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDash} aria-hidden="true" />
            <span className={styles.eyebrowText}>CARE CONTINUITY</span>
          </div>

          <div className={styles.modeCardsGroup}>
            {/* Active Mode: For you */}
            <div className={styles.modeCardActive}>
              <div className={styles.modeIconCircle}>
                <User size={18} />
              </div>
              <div className={styles.modeTextCol}>
                <span className={styles.modeTitle}>For you</span>
                <span className={styles.modeSubtitle}>A simple, reassuring update</span>
              </div>
            </div>

            {/* Clickable Mode: For coordinators */}
            <button
              type="button"
              className={styles.modeCardCoord}
              onClick={() => toggleCoordinatorDemoMode(true)}
              aria-label="Switch to coordinator simulation mode"
            >
              <div className={styles.modeIconCircle}>
                <Users size={18} />
              </div>
              <div className={styles.modeTextCol}>
                <span className={styles.modeTitle}>For coordinators</span>
                <span className={styles.modeSubtitle}>Detailed follow-up information</span>
              </div>
            </button>
          </div>
        </div>

        {/* 3-Column Editorial Grid matching Reference 04 */}
        <div className={styles.mainGrid}>
          {/* Left Column: Headline + Child Portrait Arch */}
          <div className={styles.leftEditorialCol}>
            <h1 className={styles.grandHeadline}>
              The next chapter is <span className={styles.highlight}>within reach.</span>
            </h1>

            <p className={styles.leadNarrative}>
              Your report has been recorded. Our network is coordinating support, and follow-up is
              in progress. Thank you for showing up.
            </p>

            <div className={styles.childArchCard}>
              <div className={styles.archBackground} aria-hidden="true" />

              <div className={styles.portraitWrapper}>
                <img
                  src={getAssetUrl('/images/child-with-doll.png')}
                  alt="Young child with cloth doll in warm sunlight"
                  className={styles.portraitImg}
                  width={360}
                  height={420}
                />
              </div>

              <span className={styles.illustrativeCaption}>
                Illustrative depiction: not the reported child
              </span>
            </div>
          </div>

          {/* Center Column: Main Case Status Card matching Reference 04 */}
          <div className={styles.centerStatusCard}>
            <div className={styles.activeStatusRow}>
              <span className={styles.activeDotPill}>
                <span className={styles.greenDot} />
                <span>Active</span>
              </span>
            </div>

            <div>
              <h2 className={styles.centerCardHeading}>
                Your report has been recorded.{' '}
                <span className={styles.highlight}>Support is being coordinated.</span>
              </h2>

              <p className={styles.centerCardDesc} style={{ marginTop: '0.65rem' }}>
                This is a simulated case for demonstration purposes. UJAAS is showing how support
                moves from concern to care through a safe and coordinated process.
              </p>
            </div>

            {/* 2x2 Milestones Grid matching Reference 04 */}
            <div className={styles.milestonesGrid}>
              {/* Milestone 1: Case recorded */}
              <div className={styles.milestoneCard}>
                <div className={styles.milestoneIconRow}>
                  <div className={`${styles.milestoneIconWrap} ${styles.iconGreen}`}>
                    <Check size={18} strokeWidth={3} />
                  </div>
                </div>
                <h3 className={styles.milestoneTitle}>Case recorded</h3>
                <p className={styles.milestoneDesc}>
                  Your information has been securely received in the demo system.
                </p>
                <span className={styles.milestoneTimestamp}>24 Apr 2018, 10:32 AM</span>
              </div>

              {/* Milestone 2: Referral acknowledged */}
              <div className={styles.milestoneCard}>
                <div className={styles.milestoneIconRow}>
                  <div className={`${styles.milestoneIconWrap} ${styles.iconPeach}`}>
                    <Users size={18} />
                  </div>
                </div>
                <h3 className={styles.milestoneTitle}>Referral acknowledged in demo</h3>
                <p className={styles.milestoneDesc}>
                  The case has been routed to the appropriate child safety team (demo).
                </p>
                <span className={styles.milestoneTimestamp}>24 Apr 2018, 10:35 AM</span>
              </div>

              {/* Milestone 3: Temporary support in review */}
              <div className={styles.milestoneCard}>
                <div className={styles.milestoneIconRow}>
                  <div className={`${styles.milestoneIconWrap} ${styles.iconBlue}`}>
                    <Clock size={18} />
                  </div>
                </div>
                <h3 className={styles.milestoneTitle}>Temporary support in review</h3>
                <p className={styles.milestoneDesc}>
                  Interim support options are being assessed for the child (demo).
                </p>
                <span className={styles.milestoneTimestamp}>24 Apr 2018, 11:10 AM</span>
              </div>

              {/* Milestone 4: Next follow-up scheduled */}
              <div className={styles.milestoneCard}>
                <div className={styles.milestoneIconRow}>
                  <div className={`${styles.milestoneIconWrap} ${styles.iconPurple}`}>
                    <Calendar size={18} />
                  </div>
                </div>
                <h3 className={styles.milestoneTitle}>Next follow-up scheduled</h3>
                <p className={styles.milestoneDesc}>
                  A follow-up check-in is planned to monitor progress (demo).
                </p>
                <span className={styles.milestoneTimestamp}>25 Apr 2018, 10:00 AM</span>
              </div>
            </div>

            {/* Privacy Protection Banner matching Reference 04 */}
            <div className={styles.privacyNoticeBanner}>
              <div className={styles.lockIconCircle}>
                <Lock size={16} />
              </div>
              <div className={styles.privacyTextWrap}>
                <span className={styles.privacyTitle}>
                  The child's identity and sensitive information are protected.
                </span>
                <span className={styles.privacyDesc}>
                  Only authorised child protection professionals and trusted organisations can
                  access case details on a need-to-know basis.
                </span>
              </div>
            </div>

            {/* Action Buttons Row matching Reference 04 */}
            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.returnCircleBtn}
                onClick={() => navigateTo('my_circle')}
                aria-label="Return to My Circle"
              >
                <span>Return to My Circle</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className={styles.viewSummaryBtn}
                onClick={() => setShowSummaryModal(true)}
                aria-label="View case summary"
              >
                <span>View case summary</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: Care Journey Vertical Stepper matching Reference 04 */}
          <div className={styles.careJourneyCard}>
            <div className={styles.journeyHeader}>
              <GitBranch size={20} className={styles.journeyHeaderIcon} />
              <div>
                <h3 className={styles.journeyTitleText}>Care journey</h3>
                <p className={styles.journeySubText}>
                  From concern to care, every step matters.
                </p>
              </div>
            </div>

            <div className={styles.journeyStepsList}>
              {/* Step 1: Concern identified */}
              <div className={styles.journeyStepItem}>
                <div className={`${styles.stepTrackLine} ${styles.stepTrackLineDone}`} />
                <div className={`${styles.stepIconCircle} ${styles.stepDone}`}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <div className={styles.stepContentCol}>
                  <span className={styles.stepLabel}>1. Concern identified</span>
                  <p className={styles.stepDesc}>You shared your observation.</p>
                  <span className={styles.stepTimestamp}>24 Apr 2018, 10:32 AM</span>
                </div>
              </div>

              {/* Step 2: Case recorded */}
              <div className={styles.journeyStepItem}>
                <div className={`${styles.stepTrackLine} ${styles.stepTrackLineDone}`} />
                <div className={`${styles.stepIconCircle} ${styles.stepDone}`}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <div className={styles.stepContentCol}>
                  <span className={styles.stepLabel}>2. Case recorded</span>
                  <p className={styles.stepDesc}>Your report was securely received.</p>
                  <span className={styles.stepTimestamp}>24 Apr 2018, 10:32 AM</span>
                </div>
              </div>

              {/* Step 3: Referral acknowledged */}
              <div className={styles.journeyStepItem}>
                <div className={`${styles.stepTrackLine} ${styles.stepTrackLineDone}`} />
                <div className={`${styles.stepIconCircle} ${styles.stepDone}`}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <div className={styles.stepContentCol}>
                  <span className={styles.stepLabel}>3. Referral acknowledged</span>
                  <p className={styles.stepDesc}>Routed to the right team (demo).</p>
                  <span className={styles.stepTimestamp}>24 Apr 2018, 10:35 AM</span>
                </div>
              </div>

              {/* Step 4: Support in progress (Active) */}
              <div className={styles.journeyStepItem}>
                <div className={styles.stepTrackLine} />
                <div className={`${styles.stepIconCircle} ${styles.stepActivePulse}`}>
                  <Clock size={13} />
                </div>
                <div className={styles.stepContentCol}>
                  <span className={styles.stepLabel} style={{ color: '#F45124' }}>
                    4. Support in progress
                  </span>
                  <p className={styles.stepDesc}>
                    Temporary support options are being reviewed (demo).
                  </p>
                  <span className={styles.stepTimestamp}>24 Apr 2018, 11:10 AM</span>
                </div>
              </div>

              {/* Step 5: Follow-up check-in (Pending) */}
              <div className={styles.journeyStepItem}>
                <div className={styles.stepTrackLine} />
                <div className={`${styles.stepIconCircle} ${styles.stepPending}`}>
                  <Calendar size={13} />
                </div>
                <div className={styles.stepContentCol}>
                  <span className={styles.stepLabel} style={{ color: '#64748B' }}>
                    5. Follow-up check-in
                  </span>
                  <p className={styles.stepDesc}>Next check-in scheduled.</p>
                  <span className={styles.stepTimestamp}>25 Apr 2018, 10:00 AM</span>
                </div>
              </div>

              {/* Step 6: Care confirmed (Pending) */}
              <div className={styles.journeyStepItem}>
                <div className={`${styles.stepIconCircle} ${styles.stepPending}`}>
                  <Check size={13} />
                </div>
                <div className={styles.stepContentCol}>
                  <span className={styles.stepLabel} style={{ color: '#64748B' }}>
                    6. Care confirmed
                  </span>
                  <p className={styles.stepDesc}>
                    Support outcomes will be confirmed and shared (demo).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safe Case Summary Modal */}
        {showSummaryModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Reported Case Summary</h2>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setShowSummaryModal(false)}
                  aria-label="Close summary modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Case ID</span>
                <span className={styles.summaryRowVal}>{caseId}</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Reported By</span>
                <span className={styles.summaryRowVal}>{reporterName}</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Location</span>
                <span className={styles.summaryRowVal}>{area}</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Observed Child</span>
                <span className={styles.summaryRowVal}>Young child (approx 4-6 years)</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Caregiver Present</span>
                <span className={styles.summaryRowVal}>No visible caregiver</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Current Status</span>
                <span className={styles.summaryRowVal} style={{ color: '#166534' }}>
                  Support Being Coordinated
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className={styles.returnCircleBtn}
                  onClick={() => setShowSummaryModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
