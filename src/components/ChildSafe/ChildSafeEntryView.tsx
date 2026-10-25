import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  PhoneCall,
  Lock,
  HeartHandshake,
  Baby,
  UserCheck
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { ChildConcernType } from '../../types/childSafe';
import { getAssetUrl } from '../../utils/assets';
import styles from './ChildSafeEntryView.module.css';

export const ChildSafeEntryView: React.FC = () => {
  const { childSafeDraft, updateChildSafeDraft, navigateTo, goBack } = useCareContext();

  const [selectedConcern, setSelectedConcern] = useState<ChildConcernType>(
    (childSafeDraft?.concernType as ChildConcernType) || 'child_unattended'
  );
  const [immediateDangerState, setImmediateDangerState] = useState<'yes' | 'no' | 'unsure'>('no');

  const handleSelectConcern = (type: ChildConcernType) => {
    setSelectedConcern(type);
    updateChildSafeDraft({ concernType: type });
    if (type === 'vulnerable_adult') {
      navigateTo('help_category_select');
    }
  };

  const handleContinue = () => {
    if (selectedConcern === 'immediate_danger' || immediateDangerState === 'yes') {
      navigateTo('emergency_info');
      return;
    }
    if (selectedConcern === 'vulnerable_adult') {
      navigateTo('help_category_select');
      return;
    }
    // Proceed to observation report form
    updateChildSafeDraft({ concernType: selectedConcern });
    navigateTo('child_safe_observation');
  };

  return (
    <div className={styles.container}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.contentWrap}>
        {/* Back Link */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => goBack()}
          aria-label="Return to Help Now"
        >
          <ArrowLeft size={16} />
          <span>Return to Help Now</span>
        </button>

        <div className={styles.layoutGrid}>
          {/* Left Column: Editorial Intro & Concern Options */}
          <div className={styles.leftCol}>
            <div className={styles.eyebrow}>— SAFEGUARDED PATHWAY</div>
            <h1 className={styles.title}>
              A child may <span className={styles.highlight}>need protection.</span>
            </h1>
            <p className={styles.subtitle}>
              When a child may be without a caregiver, every detail matters. UJAAS helps you record
              what you've observed and understand the appropriate next steps.
            </p>

            {/* Emergency-First Behaviour Check */}
            <div className={styles.emergencyQuestionBox}>
              <div className={styles.emergencyQHeader}>
                <AlertTriangle size={20} className={styles.emergencyQIcon} />
                <span className={styles.emergencyQTitle}>Is anyone in immediate danger?</span>
              </div>
              <div className={styles.emergencyOptions}>
                <button
                  type="button"
                  className={`${styles.emergencyOptionBtn} ${
                    immediateDangerState === 'yes' ? styles.emergencyOptionActive : ''
                  }`}
                  onClick={() => setImmediateDangerState('yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`${styles.emergencyOptionBtn} ${
                    immediateDangerState === 'no' ? styles.emergencyOptionActive : ''
                  }`}
                  onClick={() => setImmediateDangerState('no')}
                >
                  No
                </button>
                <button
                  type="button"
                  className={`${styles.emergencyOptionBtn} ${
                    immediateDangerState === 'unsure' ? styles.emergencyOptionActive : ''
                  }`}
                  onClick={() => setImmediateDangerState('unsure')}
                >
                  I'm not sure
                </button>
              </div>

              {immediateDangerState === 'yes' && (
                <div className={styles.emergencyGuidanceNotice}>
                  <strong>If anyone is in immediate physical harm, contact emergency services directly now:</strong>
                  <div className={styles.emergencyCallRow}>
                    <div className={styles.emergencyCallBadge}>
                      <PhoneCall size={14} />
                      <span>100 — Bengaluru Police Emergency (2018)</span>
                    </div>
                    <div className={styles.emergencyCallBadge}>
                      <PhoneCall size={14} />
                      <span>1098 — Childline India (24/7)</span>
                    </div>
                  </div>
                  <span>
                    Do not rely on online reporting when an urgent on-ground emergency response is required. <em>(Present-day all-India emergency notice: dial 112).</em>
                  </span>
                </div>
              )}

              {immediateDangerState === 'unsure' && (
                <div className={styles.emergencyGuidanceNotice}>
                  <span>
                    Keep the child in your line of sight from a respectful distance. Do not attempt to take custody or move the child to private premises. If unsure, call <strong>1098 Childline</strong> for immediate professional telephone advice.
                  </span>
                </div>
              )}
            </div>

            {/* Concern Pathway Selection */}
            <div className={styles.concernSectionTitle}>Select the nature of your observation</div>
            <div className={styles.concernStack}>
              {/* Option A: Canonical Demo Child */}
              <div
                className={`${styles.concernCard} ${
                  selectedConcern === 'child_unattended' ? styles.concernCardActive : ''
                }`}
                onClick={() => handleSelectConcern('child_unattended')}
                role="radio"
                aria-checked={selectedConcern === 'child_unattended'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectConcern('child_unattended');
                  }
                }}
              >
                <div className={styles.concernIconWrap}>
                  <Baby size={22} />
                </div>
                <div className={styles.concernBody}>
                  <h2 className={styles.concernHeading}>Child without an available caregiver</h2>
                  <p className={styles.concernDesc}>
                    A child may be alone, separated from family, or without an adult able to care for them.
                  </p>
                  <span className={styles.concernBadge}>Canonical Demo Pathway</span>
                </div>
                <div className={styles.radioCircle}>
                  {selectedConcern === 'child_unattended' && <div className={styles.radioDot} />}
                </div>
              </div>

              {/* Option B: Vulnerable Older Adult */}
              <div
                className={`${styles.concernCard} ${
                  selectedConcern === 'vulnerable_adult' ? styles.concernCardActive : ''
                }`}
                onClick={() => handleSelectConcern('vulnerable_adult')}
                role="radio"
                aria-checked={selectedConcern === 'vulnerable_adult'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectConcern('vulnerable_adult');
                  }
                }}
              >
                <div className={styles.concernIconWrap}>
                  <HeartHandshake size={22} />
                </div>
                <div className={styles.concernBody}>
                  <h2 className={styles.concernHeading}>Vulnerable older adult</h2>
                  <p className={styles.concernDesc}>
                    An older person living alone who may need grocery, medicine, or welfare check-in support.
                  </p>
                </div>
                <div className={styles.radioCircle}>
                  {selectedConcern === 'vulnerable_adult' && <div className={styles.radioDot} />}
                </div>
              </div>

              {/* Option C: Immediate Danger */}
              <div
                className={`${styles.concernCard} ${
                  selectedConcern === 'immediate_danger' ? styles.concernCardActive : ''
                }`}
                onClick={() => handleSelectConcern('immediate_danger')}
                role="radio"
                aria-checked={selectedConcern === 'immediate_danger'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectConcern('immediate_danger');
                  }
                }}
              >
                <div className={styles.concernIconWrap}>
                  <ShieldAlert size={22} />
                </div>
                <div className={styles.concernBody}>
                  <h2 className={styles.concernHeading}>Immediate danger</h2>
                  <p className={styles.concernDesc}>
                    A person or child is at immediate risk of harm, violence, or severe physical crisis.
                  </p>
                </div>
                <div className={styles.radioCircle}>
                  {selectedConcern === 'immediate_danger' && <div className={styles.radioDot} />}
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.primaryCta}
                onClick={handleContinue}
              >
                <span>Continue safely</span>
                <ArrowRight size={18} />
              </button>
              <div className={styles.privacyHint}>
                <Lock size={15} />
                <span>Restricted pathway · Never published on community map</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage with Child Photo & Protective Principles */}
          <div className={styles.rightCol}>
            {/* Real Photographic Visual Stage */}
            <div className={styles.photoFrame}>
              <img
                src={getAssetUrl('/images/child-with-doll.png')}
                alt="Young Indian child holding a doll in an illustrative portrait"
                className={styles.photoImg}
              />
              <div className={styles.photoCaptionOverlay}>
                <span className={styles.photoCaptionText}>
                  Thematic illustrative imagery · Not the reported child
                </span>
                <span className={styles.photoCivicTag}>UJAAS SAFEGUARD</span>
              </div>
            </div>

            {/* Protective Protocol Card */}
            <div className={styles.policyCard}>
              <div className={styles.policyTitle}>
                <UserCheck size={18} color="#F45124" />
                <span>Non-Negotiable Child Safeguarding Principles</span>
              </div>

              <ul className={styles.policyList}>
                <li className={styles.policyItem}>
                  <span className={styles.policyBullet} />
                  <span>
                    <strong className={styles.policyHighlight}>A child is not a volunteer-matching task.</strong>{' '}
                    Unattended children are never shown on public maps or assigned to ordinary volunteers.
                  </span>
                </li>
                <li className={styles.policyItem}>
                  <span className={styles.policyBullet} />
                  <span>
                    <strong className={styles.policyHighlight}>Strict Need-to-Know.</strong> Public coordinates, full names, and identifiable photos are restricted from public feeds.
                  </span>
                </li>
                <li className={styles.policyItem}>
                  <span className={styles.policyBullet} />
                  <span>
                    <strong className={styles.policyHighlight}>Responsible Statutory Referral.</strong> Cases route only to designated child welfare coordinators and verified child protection services.
                  </span>
                </li>
              </ul>

              <div className={styles.statutoryNotice}>
                Scenario emergency contacts (April 2018): <strong>1098</strong> (Childline India) & <strong>100</strong> (Bengaluru Police). <em>(Present-day all-India emergency notice: dial 112).</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
