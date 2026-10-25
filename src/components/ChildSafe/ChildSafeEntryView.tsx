import React, { useState } from 'react';
import {
  FileText,
  Play,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  ShieldCheck,
  HeartHandshake,
  ClipboardList,
  X,
  Lock
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './ChildSafeEntryView.module.css';

export const ChildSafeEntryView: React.FC = () => {
  const {
    childSafeCase,
    startChildSafeReport,
    navigateTo,
    goBack
  } = useCareContext();

  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const hasRecordedCase =
    childSafeCase &&
    childSafeCase.status !== 'draft';

  const handleStartCase = () => {
    startChildSafeReport();
    navigateTo('child_safe_observation');
  };

  const handleViewActiveCase = () => {
    navigateTo('child_safe_status');
  };

  return (
    <div className={styles.container}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.contentWrap}>
        {/* Navigation Back Button */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => goBack()}
          aria-label="Return to Help Now"
        >
          <ArrowLeft size={16} />
          <span>Return to Help Now</span>
        </button>

        {/* Hero Section: 2 Columns */}
        <div className={styles.heroGrid}>
          {/* Left Column: Editorial Headline & Actions */}
          <div className={styles.leftCol}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowDash} aria-hidden="true" />
              <span className={styles.eyebrowText}>
                SAFE CONTINUITY OF CARE FOR CHILDREN AT RISK
              </span>
            </div>

            <h1 className={styles.grandTitle}>
              Child <span className={styles.highlight}>Care</span>
            </h1>

            <p className={styles.leadNarrative}>
              Reporting a concern is only the first step. UJAAS helps you document a child's
              immediate needs, route the case through an authorised safeguarding pathway, and
              track follow-up until they are safe.
            </p>

            {/* Action Buttons */}
            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleStartCase}
                aria-label="Start Child Care Case"
              >
                <FileText size={18} />
                <span>Start Child Care Case</span>
                <ArrowRight size={18} className={styles.btnArrow} />
              </button>

              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setShowHowItWorks(true)}
                aria-label="Learn how Child Care works"
              >
                <Play size={15} fill="currentColor" />
                <span>How this works</span>
                <ArrowRight size={15} className={styles.btnArrow} />
              </button>

              {hasRecordedCase && (
                <button
                  type="button"
                  className={styles.tertiaryActiveCaseBtn}
                  onClick={handleViewActiveCase}
                  aria-label="View active child care case"
                >
                  <ClipboardList size={16} />
                  <span>Active Case: {childSafeCase.id}</span>
                </button>
              )}
            </div>

            {/* Calm Emergency Guidance Banner */}
            <div className={styles.emergencyCard} role="region" aria-label="Emergency guidance">
              <div className={styles.emergencyIconWrap} aria-hidden="true">
                <PhoneCall size={20} color="#FFFFFF" />
              </div>
              <div className={styles.emergencyTextWrap}>
                <p className={styles.emergencyText}>
                  If a child is in immediate danger, seek emergency help first. Call{' '}
                  <strong className={styles.emergencyNumber}>112</strong> for immediate danger or{' '}
                  <strong className={styles.emergencyNumber}>1098</strong> for child assistance guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Illustrative Child Portrait with Botanical Arch */}
          <div className={styles.rightCol}>
            <div className={styles.portraitComposition}>
              {/* Decorative Sunburst Arch */}
              <div className={styles.sunArch} aria-hidden="true" />

              {/* Decorative Leaf Branches (Left & Right) */}
              <svg
                className={`${styles.leafSprig} ${styles.leafSprigLeft}`}
                viewBox="0 0 120 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M100 270 Q40 180 80 120 Q30 80 60 10"
                  stroke="#E2A66C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path d="M72 135 C50 120 40 95 62 90 C75 105 78 125 72 135 Z" fill="#ECC89B" />
                <path d="M85 185 C65 170 52 145 74 140 C88 152 90 175 85 185 Z" fill="#ECC89B" />
                <path d="M96 230 C76 215 65 190 85 186 C98 198 102 220 96 230 Z" fill="#ECC89B" />
              </svg>

              <svg
                className={`${styles.leafSprig} ${styles.leafSprigRight}`}
                viewBox="0 0 120 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 270 Q80 180 40 120 Q90 80 60 10"
                  stroke="#E2A66C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path d="M48 135 C70 120 80 95 58 90 C45 105 42 125 48 135 Z" fill="#ECC89B" />
                <path d="M35 185 C55 170 68 145 46 140 C32 152 30 175 35 185 Z" fill="#ECC89B" />
                <path d="M24 230 C44 215 55 190 35 186 C22 198 18 220 24 230 Z" fill="#ECC89B" />
              </svg>

              {/* Portrait Frame */}
              <div className={styles.portraitFrame}>
                <picture>
                  <source srcSet={getAssetUrl('/images/child-with-doll.png')} type="image/png" />
                  <img
                    src={getAssetUrl('/images/child-with-doll.png')}
                    alt="Illustrative depiction: young child holding a handmade doll"
                    className={styles.portraitImg}
                    width={480}
                    height={600}
                  />
                </picture>
              </div>

              {/* Illustrative Notice Badge */}
              <div className={styles.illustrativeCaption}>
                <Lock size={12} />
                <span>Illustrative depiction: not an identifiable child</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Three Capability Cards */}
        <div className={styles.capabilitySection} role="region" aria-label="Core Child Care capabilities">
          <div className={styles.capabilityGrid}>
            {/* Card 1: Immediate needs */}
            <div className={styles.capabilityCard}>
              <div className={styles.cardIconWrap}>
                <FileText size={22} className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Immediate needs</h3>
                <p className={styles.cardDesc}>
                  Record the child's situation, basic needs and any immediate risks observed.
                </p>
              </div>
            </div>

            {/* Card 2: Protected case record */}
            <div className={styles.capabilityCard}>
              <div className={styles.cardIconWrap}>
                <ShieldCheck size={22} className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Protected case record</h3>
                <p className={styles.cardDesc}>
                  Information is shared only with authorised child protection professionals.
                </p>
              </div>
            </div>

            {/* Card 3: Follow-up tracking */}
            <div className={styles.capabilityCard}>
              <div className={styles.cardIconWrap}>
                <HeartHandshake size={22} className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Follow-up tracking</h3>
                <p className={styles.cardDesc}>
                  Track case progress and receive updates until the child is confirmed safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How This Works Modal */}
      {showHowItWorks && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="how-it-works-title"
          onClick={() => setShowHowItWorks(false)}
        >
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalIconWrap}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className={styles.modalEyebrow}>SAFEGUARDING CONTINUITY</span>
                  <h2 id="how-it-works-title" className={styles.modalTitle}>
                    How Child Care Works
                  </h2>
                </div>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setShowHowItWorks(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalIntro}>
                A concern recorded is not the same as a child receiving appropriate care.
                UJAAS establishes five protected milestones to ensure every child is accounted for:
              </p>

              <div className={styles.stagesList}>
                <div className={styles.stageItem}>
                  <div className={styles.stageNumber}>01</div>
                  <div className={styles.stageContent}>
                    <h4 className={styles.stageName}>Concern identified</h4>
                    <p className={styles.stageDesc}>
                      A community member spots a child without an available caregiver and records only what they directly observed.
                    </p>
                  </div>
                </div>

                <div className={styles.stageItem}>
                  <div className={styles.stageNumber}>02</div>
                  <div className={styles.stageContent}>
                    <h4 className={styles.stageName}>Immediate needs assessed</h4>
                    <p className={styles.stageDesc}>
                      Factual checks on adult supervision, food and drinking water, medical evaluation, and safe temporary shelter.
                    </p>
                  </div>
                </div>

                <div className={styles.stageItem}>
                  <div className={styles.stageNumber}>03</div>
                  <div className={styles.stageContent}>
                    <h4 className={styles.stageName}>Safeguarding referral recorded</h4>
                    <p className={styles.stageDesc}>
                      The dossier is prepared for designated statutory bodies (Child Welfare Committee, District Child Protection Unit).
                    </p>
                  </div>
                </div>

                <div className={styles.stageItem}>
                  <div className={styles.stageNumber}>04</div>
                  <div className={styles.stageContent}>
                    <h4 className={styles.stageName}>Care coordination documented</h4>
                    <p className={styles.stageDesc}>
                      Designated child protection officers review needs, schedule check-ins, and arrange interim support.
                    </p>
                  </div>
                </div>

                <div className={styles.stageItem}>
                  <div className={styles.stageNumber}>05</div>
                  <div className={styles.stageContent}>
                    <h4 className={styles.stageName}>Follow-up and continuity monitored</h4>
                    <p className={styles.stageDesc}>
                      Active follow-up responsibilities remain visible until safe kinship custody or protected care is verified.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.modalDisclaimer}>
                <strong>Demonstration Note:</strong> Set in Bengaluru immediately after April 2018. This is a fictional design prototype demonstrating humane crisis response with zero real-world emergency dispatch claims.
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.modalPrimaryBtn}
                onClick={() => {
                  setShowHowItWorks(false);
                  handleStartCase();
                }}
              >
                <span>Proceed to Report</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
