import React, { useState } from 'react';
import {
  Baby,
  MapPin,
  FileText,
  UserCheck,
  Check,
  Edit2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Lock,
  PhoneCall
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import styles from './ChildSafeReviewView.module.css';

export const ChildSafeReviewView: React.FC = () => {
  const { childSafeDraft, submitChildSafeCase, navigateTo, goBack } = useCareContext();
  const { activeUser } = useAccountContext();

  const [confirmedAccuracy, setConfirmedAccuracy] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = () => {
    navigateTo('child_safe_observation');
  };

  const handleRecord = () => {
    if (!confirmedAccuracy || isSubmitting) return;
    setIsSubmitting(true);
    submitChildSafeCase();
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Stepper Bar */}
        <div className={styles.stepperBar} aria-label="Step indicator">
          <span className={`${styles.stepPill} ${styles.stepPillDone}`}>
            <Check size={12} strokeWidth={3} />
            <span>Step 1: Observation</span>
          </span>
          <div className={styles.stepperDivider} />
          <span className={`${styles.stepPill} ${styles.stepPillActive}`}>
            Step 2: Review & Record
          </span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— REVIEW & ACCURACY CHECK</div>
          <h1 className={styles.title}>Review the concern carefully.</h1>
          <p className={styles.subtitle}>
            Check that your report reflects what you observed. You can make changes before saving
            it. This record is held within the safeguarded case simulation.
          </p>
        </div>

        <div className={styles.reviewGrid}>
          {/* Left Column: Quick Case Overview Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewHeader}>
              <div className={styles.overviewIconWrap}>
                <Baby size={22} />
              </div>
              <div>
                <span className={styles.overviewTitle}>Child Safe Case</span>
                <div className={styles.statusBadgeDraft}>Draft · Awaiting Record</div>
              </div>
            </div>

            <div className={styles.overviewMetaRow}>
              <span className={styles.overviewMetaLabel}>Concern Type</span>
              <span className={styles.overviewMetaValue}>
                Child without an available caregiver
              </span>
            </div>

            <div className={styles.overviewMetaRow}>
              <span className={styles.overviewMetaLabel}>Approximate Area</span>
              <span className={styles.overviewMetaValue}>
                {childSafeDraft?.neighbourhood || 'Indiranagar'}, {childSafeDraft?.city || 'Bengaluru'}
              </span>
            </div>

            <div className={styles.overviewMetaRow}>
              <span className={styles.overviewMetaLabel}>Estimated Age Group</span>
              <span className={styles.overviewMetaValue}>
                Young child (4–6 years)
              </span>
            </div>

            <div className={styles.overviewMetaRow}>
              <span className={styles.overviewMetaLabel}>Reporter</span>
              <span className={styles.overviewMetaValue}>
                {activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Aarav Sharma'}
              </span>
            </div>

            <div className={styles.simBadge}>
              <strong>Notice:</strong> This is a local demonstration record. No real external statutory authorities will be dispatched.
            </div>
          </div>

          {/* Center Column: Detailed Sections with Functional Edit buttons */}
          <div className={styles.centerCol}>
            {/* Section 1: Situation Summary */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeading}>
                  <FileText size={18} color="#F45124" />
                  <span>1. Situation Summary</span>
                </div>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={handleEdit}
                  aria-label="Edit situation summary"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              <p className={styles.sectionBodyText}>
                {childSafeDraft?.factualObservations ||
                  'I noticed a young child (approx 4–6 years old) alone near the bus stop holding a doll. I waited nearby for 30 minutes, but no familiar caregiver or adult was visibly present. The child appears awake, alert, and responsive, but quiet.'}
              </p>
            </div>

            {/* Section 2: Location and Context */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeading}>
                  <MapPin size={18} color="#F45124" />
                  <span>2. Location and Relevant Context</span>
                </div>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={handleEdit}
                  aria-label="Edit location"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              <p className={styles.sectionBodyText}>
                <strong>Neighbourhood:</strong> {childSafeDraft?.neighbourhood || 'Indiranagar'}, {childSafeDraft?.city || 'Bengaluru'}
                <br />
                <strong>Landmark:</strong> {childSafeDraft?.landmark || 'Near 100ft Road Bus Stop, 4th Cross'}
              </p>
              <div className={styles.badgeRow}>
                <span className={styles.pillTag}>
                  <Lock size={12} />
                  <span>Restricted to Coordinator & Authorized Responders</span>
                </span>
              </div>
            </div>

            {/* Section 3: Current Observations */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeading}>
                  <UserCheck size={18} color="#F45124" />
                  <span>3. Current Observations</span>
                </div>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={handleEdit}
                  aria-label="Edit observations"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              <p className={styles.sectionBodyText}>
                <strong>Presence State:</strong> Child is currently in immediate safe presence of reporter.
                <br />
                <strong>Observed Condition:</strong> Appears awake, alert, and responsive.
                <br />
                <strong>External Contact:</strong> {childSafeDraft?.servicesContacted === 'contacted' ? 'Contact reported by user' : 'No external contact confirmed yet'}
              </p>
            </div>

            {/* Section 4: Reporter Contact Preference */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeading}>
                  <PhoneCall size={18} color="#F45124" />
                  <span>4. Reporter Contact & Follow-up</span>
                </div>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={handleEdit}
                  aria-label="Edit contact preference"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              <p className={styles.sectionBodyText}>
                <strong>Name:</strong> {activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Aarav Sharma'}
                <br />
                <strong>Contact Phone:</strong> {activeUser?.phone || '+91 98450 23891'}
                <br />
                <strong>Preferred Method:</strong> Phone call for urgent follow-up
              </p>
            </div>

            {/* Section 5: Recommended Next Action */}
            <div className={styles.sectionCard} style={{ backgroundColor: '#FAF7F0' }}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeading}>
                  <Shield size={18} color="#102744" />
                  <span>5. Recommended Next Action</span>
                </div>
              </div>
              <p className={styles.sectionBodyText}>
                Sensitive child-protection observations require statutory coordination under Child Welfare Committee guidelines. In this prototype, submitting records the case locally and prepares a simulated coordinator handoff workflow.
              </p>
            </div>

            {/* Final Acknowledgement Checkbox */}
            <div
              className={styles.ackBox}
              onClick={() => setConfirmedAccuracy(!confirmedAccuracy)}
              role="checkbox"
              aria-checked={confirmedAccuracy}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setConfirmedAccuracy(!confirmedAccuracy);
                }
              }}
            >
              <div
                className={`${styles.ackCheck} ${
                  confirmedAccuracy ? styles.ackCheckActive : ''
                }`}
              >
                {confirmedAccuracy && <Check size={14} strokeWidth={3} />}
              </div>
              <label className={styles.ackLabel}>
                I confirm that this report reflects my observations to the best of my knowledge.
              </label>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionsBar}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => goBack()}
              >
                <ArrowLeft size={16} />
                <span>Back to Edit</span>
              </button>

              <button
                type="button"
                className={styles.recordBtn}
                onClick={handleRecord}
                disabled={!confirmedAccuracy || isSubmitting}
              >
                <span>Record concern in demo</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: What Happens Next */}
          <div className={styles.rightCol}>
            <div className={styles.nextStepsCard}>
              <div className={styles.nextStepsTitle}>What happens next</div>

              <ol className={styles.nextStepList}>
                <li className={styles.nextStepItem}>
                  <span className={styles.nextStepNum}>1</span>
                  <span>
                    <strong className={styles.nextStepHighlight}>Concern recorded locally:</strong>{' '}
                    The case is saved in browser memory with a stable reference ID (`UJAAS-CS-2018-001`).
                  </span>
                </li>

                <li className={styles.nextStepItem}>
                  <span className={styles.nextStepNum}>2</span>
                  <span>
                    <strong className={styles.nextStepHighlight}>Restricted handling:</strong> No
                    ordinary volunteer or community member can see this child on the map.
                  </span>
                </li>

                <li className={styles.nextStepItem}>
                  <span className={styles.nextStepNum}>3</span>
                  <span>
                    <strong className={styles.nextStepHighlight}>Simulated coordinator review:</strong>{' '}
                    A fictional specialist reviews factual details and prepares a statutory referral.
                  </span>
                </li>

                <li className={styles.nextStepItem}>
                  <span className={styles.nextStepNum}>4</span>
                  <span>
                    <strong className={styles.nextStepHighlight}>Follow-up tracking:</strong> You can
                    review non-sensitive milestone updates anytime.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
