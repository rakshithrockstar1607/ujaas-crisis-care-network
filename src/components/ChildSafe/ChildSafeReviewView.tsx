import React, { useState } from 'react';
import {
  FileText,
  Edit2,
  MapPin,
  User,
  AlertTriangle,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './ChildSafeReviewView.module.css';

export const ChildSafeReviewView: React.FC = () => {
  const { childSafeDraft, submitChildSafeCase, navigateTo } = useCareContext();
  const { activeUser } = useAccountContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stableCaseId = 'UJAAS-CS-2018-001';

  const handleEdit = () => {
    navigateTo('child_safe_observation');
  };

  const handleCreateCase = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    submitChildSafeCase();
    navigateTo('child_safe_recorded');
  };

  // Immediate Needs Summary String
  const needs = childSafeDraft?.immediateNeeds;
  const needsSummaryList: string[] = [];
  if (needs?.supervision === 'yes') needsSummaryList.push('Adult supervision needed');
  if (needs?.foodAndWater === 'yes') needsSummaryList.push('Food and drinking water needed');
  if (needs?.safeTemporaryShelter === 'yes') needsSummaryList.push('Safe temporary shelter needed');
  if (needs?.medicalAttention === 'yes') needsSummaryList.push('Medical attention required');
  else if (needs?.medicalAttention === 'not_sure') needsSummaryList.push('Medical check recommended (condition unconfirmed)');

  const reporterDisplayName = activeUser
    ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim()
    : 'Aarav Sharma';
  const reporterPhone = activeUser?.phone || '+91 98450 23891';
  const reporterEmail = activeUser?.email || 'aarav.sharma@example.com';

  return (
    <div className={styles.container}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.contentWrap}>
        {/* Editorial Heading */}
        <div className={styles.pageHeader}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDash} aria-hidden="true" />
            <span className={styles.eyebrowText}>CHILD SAFE</span>
          </div>

          <h1 className={styles.grandHeading}>
            Review and <span className={styles.highlight}>create case.</span>
          </h1>

          <p className={styles.leadNarrative}>
            Please review the details below. Once you create the case, UJAAS will securely route
            it to the right team for follow-up.
          </p>
        </div>

        {/* Two-Column Grid matching Reference 02 */}
        <div className={styles.reviewGrid}>
          {/* Left Column: Summary of your report */}
          <div className={styles.leftCol}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryCardHeader}>
                <h2 className={styles.summaryCardTitle}>Summary of your report</h2>
                <button
                  type="button"
                  className={styles.editDetailsBtn}
                  onClick={handleEdit}
                  aria-label="Edit report details"
                >
                  <Edit2 size={14} />
                  <span>Edit details</span>
                </button>
              </div>

              <div className={styles.summaryCardBody}>
                {/* Child Portrait Thumbnail */}
                <div className={styles.thumbnailWrap}>
                  <div className={styles.thumbnailFrame}>
                    <img
                      src={getAssetUrl('/images/child-with-doll.png')}
                      alt="Illustrative depiction: not the reported child"
                      className={styles.thumbnailImg}
                      width={160}
                      height={200}
                    />
                  </div>
                  <span className={styles.thumbnailCaption}>
                    Illustrative image, not the reported child
                  </span>
                </div>

                {/* Information Rows */}
                <div className={styles.infoRows}>
                  {/* Row 1: Observed Child */}
                  <div className={styles.infoRow}>
                    <div className={styles.infoIconWrap}>
                      <User size={18} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3 className={styles.infoLabel}>Observed child</h3>
                      <p className={styles.infoPrimary}>
                        {childSafeDraft?.childName && childSafeDraft.childName !== 'Not known'
                          ? childSafeDraft.childName
                          : 'Child without known name'}
                        {' · '}
                        {childSafeDraft?.observedAgeGroup === 'young_child'
                          ? 'Approximately 4-6 years old'
                          : childSafeDraft?.observedAgeGroup || 'Age unknown'}
                      </p>
                      <p className={styles.infoSecondary}>
                        {childSafeDraft?.caregiverPresent === 'no'
                          ? 'Appears to be alone and without an available caregiver.'
                          : 'Caregiver presence uncertain.'}
                      </p>
                    </div>
                  </div>

                  {/* Row 2: Location */}
                  <div className={styles.infoRow}>
                    <div className={styles.infoIconWrap}>
                      <MapPin size={18} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3 className={styles.infoLabel}>Location</h3>
                      <p className={styles.infoPrimary}>
                        {childSafeDraft?.landmark || 'Near 100ft Road Bus Stop, 4th Cross'}
                      </p>
                      <p className={styles.infoSecondary}>
                        {childSafeDraft?.neighbourhood || 'Indiranagar'}, {childSafeDraft?.city || 'Bengaluru'}, Karnataka
                      </p>
                    </div>
                  </div>

                  {/* Row 3: Immediate Needs Summary */}
                  <div className={styles.infoRow}>
                    <div className={styles.infoIconWrap}>
                      <FileText size={18} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3 className={styles.infoLabel}>Immediate needs summary</h3>
                      <p className={styles.infoPrimary}>
                        {needsSummaryList.length > 0
                          ? needsSummaryList.join('. ') + '.'
                          : 'Basic food, temporary shelter and supervision check requested.'}
                      </p>
                      <p className={styles.infoSecondary}>
                        Factual observation recorded. No commercial volunteer matching permitted.
                      </p>
                    </div>
                  </div>

                  {/* Row 4: Reporter Details */}
                  <div className={styles.infoRow}>
                    <div className={styles.infoIconWrap}>
                      <Shield size={18} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3 className={styles.infoLabel}>Reporter details</h3>
                      <p className={styles.infoPrimary}>{reporterDisplayName}</p>
                      <p className={styles.infoSecondary}>
                        {reporterPhone} · {reporterEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Creation Action & What Happens Next */}
          <div className={styles.rightCol}>
            <div className={styles.creationCard}>
              <div className={styles.caseCreationHeader}>
                <div className={styles.caseIconCircle}>
                  <FileText size={22} color="#F45124" />
                </div>
                <span className={styles.readyText}>Ready to create the case</span>
                <span className={styles.caseIdLabel}>Case ID</span>
                <span className={styles.caseIdValue}>{stableCaseId}</span>
                <p className={styles.caseNotice}>
                  A new child safety case will be created with the details you provided and
                  securely shared with our safeguarding network.
                </p>
              </div>

              <div className={styles.cardDivider} />

              {/* What Happens Next Stepper */}
              <div className={styles.nextStepsSection}>
                <h3 className={styles.nextStepsTitle}>What happens next?</h3>

                <div className={styles.stepsList}>
                  <div className={styles.stepItem}>
                    <div className={styles.stepNum}>1</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepHeading}>Immediate needs recorded</h4>
                      <p className={styles.stepDesc}>
                        Your observations will be securely saved in the system.
                      </p>
                    </div>
                  </div>

                  <div className={styles.stepItem}>
                    <div className={styles.stepNum}>2</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepHeading}>Simulated safeguarding referral prepared</h4>
                      <p className={styles.stepDesc}>
                        The case will be routed to trusted partner organisations and authorised coordinators.
                      </p>
                    </div>
                  </div>

                  <div className={styles.stepItem}>
                    <div className={styles.stepNum}>3</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepHeading}>Reporter-safe status enabled</h4>
                      <p className={styles.stepDesc}>
                        Your identity and contact details will be protected and shared only with relevant professionals.
                      </p>
                    </div>
                  </div>

                  <div className={styles.stepItem}>
                    <div className={styles.stepNum}>4</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepHeading}>Coordinator follow-up required</h4>
                      <p className={styles.stepDesc}>
                        A case coordinator will review the details and take appropriate action. You may receive a follow-up update where applicable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prototype Safety Notice */}
              <div className={styles.protoNoticeBanner}>
                <AlertTriangle size={18} className={styles.protoNoticeIcon} />
                <p className={styles.protoNoticeText}>
                  <strong>This is a fictional prototype for demonstration purposes only.</strong> UJAAS
                  is not a live emergency network. If a child is in immediate danger, please call{' '}
                  <strong>112</strong>. For child assistance guidance, call <strong>1098</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className={styles.actionButtonsGroup}>
                <button
                  type="button"
                  className={styles.createCaseBtn}
                  onClick={handleCreateCase}
                  disabled={isSubmitting}
                  aria-label="Create child care case"
                >
                  <span>{isSubmitting ? 'Recording concern...' : 'Create case'}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className={styles.editDetailsSecondaryBtn}
                  onClick={handleEdit}
                  aria-label="Edit details"
                >
                  <span>Edit details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
