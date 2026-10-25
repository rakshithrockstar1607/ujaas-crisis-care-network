import React from 'react';
import {
  Check,
  Shield,
  ArrowLeft,
  AlertTriangle,
  Lock,
  UserCheck
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './ChildSafeStatusFollowUpView.module.css';

export const ChildSafeStatusFollowUpView: React.FC = () => {
  const { childSafeCase, toggleCoordinatorDemoMode, navigateTo } = useCareContext();

  const currentStatus = childSafeCase?.status || 'recorded_local';

  const isHandoffDone =
    currentStatus === 'demo_handoff_documented' ||
    currentStatus === 'follow_up_open' ||
    currentStatus === 'closed_in_demo';

  const isAckDone = isHandoffDone || currentStatus === 'demo_referral_acknowledged';
  const isReferralDone = isAckDone || currentStatus === 'demo_referral_prepared';
  const isReviewDone = isReferralDone || currentStatus === 'demo_review_in_progress';

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Back Link */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigateTo('help_now_landing')}
        >
          <ArrowLeft size={16} />
          <span>Return to Help Now</span>
        </button>

        {/* Dynamic Heading based on case progress */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— SENSITIVE CASE TRACKER · REPORTER VIEW</div>
          <h1 className={styles.title}>
            {isHandoffDone
              ? 'A safeguarded handoff has been documented.'
              : 'The concern needs further follow-up.'}
          </h1>
          <p className={styles.subtitle}>
            {isHandoffDone
              ? 'The fictional coordinator has recorded the next stage of statutory support. Active follow-up responsibilities remain visible.'
              : 'Your report is held within the protected demonstration boundary. Fictional child coordinators are arranging appropriate statutory referral.'}
          </p>
        </div>

        <div className={styles.layoutGrid}>
          {/* Left Column: Reporter Milestones Timeline */}
          <div className={styles.timelineCard}>
            <div className={styles.caseIdHeader}>
              <div className={styles.caseIdWrap}>
                <span className={styles.caseIdLabel}>Fictional Case Reference</span>
                <span className={styles.caseIdVal}>{childSafeCase?.id || 'UJAAS-CS-2018-001'}</span>
              </div>

              <div
                className={`${styles.statusBadge} ${
                  isHandoffDone ? styles.statusBadgeGreen : ''
                }`}
              >
                <Lock size={13} />
                <span>
                  {isHandoffDone
                    ? 'Safe Handoff Documented'
                    : isAckDone
                    ? 'Referral Acknowledged in Demo'
                    : isReferralDone
                    ? 'Referral Prepared in Demo'
                    : isReviewDone
                    ? 'Review in Progress'
                    : 'Recorded Locally'}
                </span>
              </div>
            </div>

            <div className={styles.timelineTrack}>
              {/* Stage 1: Concern Recorded */}
              <div className={styles.timelineItem}>
                <div className={`${styles.iconCircle} ${styles.iconDone}`}>
                  <Check size={18} strokeWidth={3} />
                </div>
                <div
                  className={`${styles.connectorLine} ${
                    isReviewDone ? styles.connectorLineDone : ''
                  }`}
                />
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>1. Concern Recorded Locally</span>
                    <span className={styles.itemTime}>April 24, 2018, 14:30 IST</span>
                  </div>
                  <p className={styles.itemDesc}>
                    Factual observation recorded for an unattended child holding a doll near 100ft Road Bus Stop, Indiranagar.
                  </p>
                </div>
              </div>

              {/* Stage 2: Specialist Review */}
              <div className={styles.timelineItem}>
                <div
                  className={`${styles.iconCircle} ${
                    isReviewDone
                      ? styles.iconDone
                      : currentStatus === 'recorded_local'
                      ? styles.iconActive
                      : styles.iconPending
                  }`}
                >
                  {isReviewDone ? <Check size={18} strokeWidth={3} /> : '2'}
                </div>
                <div
                  className={`${styles.connectorLine} ${
                    isReferralDone ? styles.connectorLineDone : ''
                  }`}
                />
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>2. Specialist Review Initiated</span>
                    <span className={styles.itemTime}>
                      {isReviewDone ? 'April 24, 2018, 14:45 IST' : 'Awaiting review'}
                    </span>
                  </div>
                  <p className={styles.itemDesc}>
                    Designated UJAAS coordinator verified initial facts and ensured location coordinates remain restricted from public volunteer matching.
                  </p>
                </div>
              </div>

              {/* Stage 3: Referral Prepared */}
              <div className={styles.timelineItem}>
                <div
                  className={`${styles.iconCircle} ${
                    isReferralDone
                      ? styles.iconDone
                      : currentStatus === 'demo_review_in_progress'
                      ? styles.iconActive
                      : styles.iconPending
                  }`}
                >
                  {isReferralDone ? <Check size={18} strokeWidth={3} /> : '3'}
                </div>
                <div
                  className={`${styles.connectorLine} ${
                    isAckDone ? styles.connectorLineDone : ''
                  }`}
                />
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>3. Statutory Referral Prepared</span>
                    <span className={styles.itemTime}>
                      {isReferralDone ? 'April 24, 2018, 15:10 IST' : 'Pending'}
                    </span>
                  </div>
                  <p className={styles.itemDesc}>
                    Safeguarded briefing dossier prepared for District Child Welfare Committee (CWC) emergency intake.
                  </p>
                </div>
              </div>

              {/* Stage 4: Statutory Acknowledgement */}
              <div className={styles.timelineItem}>
                <div
                  className={`${styles.iconCircle} ${
                    isAckDone
                      ? styles.iconDone
                      : currentStatus === 'demo_referral_prepared'
                      ? styles.iconActive
                      : styles.iconPending
                  }`}
                >
                  {isAckDone ? <Check size={18} strokeWidth={3} /> : '4'}
                </div>
                <div
                  className={`${styles.connectorLine} ${
                    isHandoffDone ? styles.connectorLineDone : ''
                  }`}
                />
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>4. Statutory Referral Acknowledged</span>
                    <span className={styles.itemTime}>
                      {isAckDone ? 'April 24, 2018, 15:35 IST' : 'Pending'}
                    </span>
                  </div>
                  <p className={styles.itemDesc}>
                    Duty officer acknowledged intake under statutory emergency protocol and dispatched protection staff.
                  </p>
                </div>
              </div>

              {/* Stage 5: Safe Handoff Documented */}
              <div className={styles.timelineItem}>
                <div
                  className={`${styles.iconCircle} ${
                    isHandoffDone ? styles.iconDone : styles.iconPending
                  }`}
                >
                  {isHandoffDone ? <Check size={18} strokeWidth={3} /> : '5'}
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>5. Authorised Safe Handoff</span>
                    <span className={styles.itemTime}>
                      {isHandoffDone ? 'April 24, 2018, 16:15 IST' : 'Pending'}
                    </span>
                  </div>
                  <p className={styles.itemDesc}>
                    Physical care responsibly transferred to designated Child Welfare Protection Officer.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Follow-up Responsibilities Card */}
            {childSafeCase?.followUpState?.isOpen && (
              <div className={styles.followUpCard}>
                <div className={styles.followUpHeader}>
                  <AlertTriangle size={18} />
                  <span>Follow-Up Responsibility Active</span>
                </div>
                <p className={styles.followUpText}>
                  <strong>Action in progress:</strong> {childSafeCase.followUpState.requiredAction}
                  <br />
                  <strong>Target window:</strong> {childSafeCase.followUpState.targetDue}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Actions & Guidance */}
          <div className={styles.rightCol}>
            {/* Guidance Card */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>
                <Shield size={18} color="#F45124" />
                <span>What you can do next</span>
              </div>

              <ul className={styles.sideList}>
                <li className={styles.sideListItem}>
                  <span className={styles.bullet} />
                  <span>
                    <strong>Save your reference code:</strong> Keep{' '}
                    <code>{childSafeCase?.id || 'UJAAS-CS-2018-001'}</code> if calling external helplines.
                  </span>
                </li>

                <li className={styles.sideListItem}>
                  <span className={styles.bullet} />
                  <span>
                    <strong>Direct Emergency Contacts:</strong> Call <strong>1098</strong> (Childline India) or{' '}
                    <strong>100</strong> (Bengaluru Police, 2018) if urgent on-ground escalation is needed. <em>(Present-day emergency notice: dial 112).</em>
                  </span>
                </li>

                <li className={styles.sideListItem}>
                  <span className={styles.bullet} />
                  <span>
                    <strong>Strict Privacy:</strong> Public map matching is completely disabled for this child.
                  </span>
                </li>
              </ul>

              <button
                type="button"
                className={styles.returnHelpBtn}
                onClick={() => navigateTo('help_now_landing')}
              >
                <span>Return to Help Now</span>
              </button>
            </div>

            {/* Evaluator Simulation Control */}
            <div className={styles.sideCard} style={{ backgroundColor: '#FAF7F0' }}>
              <div className={styles.sideCardTitle}>
                <UserCheck size={18} color="#102744" />
                <span>Evaluator Simulation Shortcut</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#526072', lineHeight: '1.5' }}>
                Toggle into the restricted Coordinator Simulation to review internal case notes, prepare referrals, and document statutory handoffs.
              </p>
              <button
                type="button"
                className={styles.coordSwitchBtn}
                onClick={() => toggleCoordinatorDemoMode(true)}
              >
                <span>Enter coordinator demo mode →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
