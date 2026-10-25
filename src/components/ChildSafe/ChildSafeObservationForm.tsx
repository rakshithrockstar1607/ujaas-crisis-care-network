import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Lock,
  ArrowRight,
  ArrowLeft,
  Users,
  Utensils,
  Stethoscope,
  Home,
  Check
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import {
  ChildAgeGroup,
  NeedAssessmentAnswer
} from '../../types/childSafe';
import styles from './ChildSafeObservationForm.module.css';

export const ChildSafeObservationForm: React.FC = () => {
  const { childSafeDraft, updateChildSafeDraft, navigateTo } = useCareContext();

  // Controlled Form State
  const [childName, setChildName] = useState(childSafeDraft?.childName || 'Not known');
  const [ageGroup, setAgeGroup] = useState<ChildAgeGroup>(
    childSafeDraft?.observedAgeGroup || 'young_child'
  );
  const [observationArea, setObservationArea] = useState(
    childSafeDraft?.landmark ||
      childSafeDraft?.approximateArea ||
      'Near 100ft Road Bus Stop, 4th Cross, Indiranagar, Bengaluru'
  );
  const [observedDateTime, setObservedDateTime] = useState(
    childSafeDraft?.observedDateTime || 'April 24, 2018, 14:00 IST'
  );
  const [caregiverPresent, setCaregiverPresent] = useState<'yes' | 'no' | 'not_sure'>(
    childSafeDraft?.caregiverPresent || 'no'
  );
  const [factualObservations, setFactualObservations] = useState(
    childSafeDraft?.factualObservations ||
      'I noticed a young child (approx 4-6 years old) alone near the bus stop holding a doll. I waited nearby for 30 minutes, but no familiar caregiver or adult was visibly present. The child appears awake, alert, and responsive, but quiet.'
  );

  // Immediate Needs Answers
  const [needSupervision, setNeedSupervision] = useState<NeedAssessmentAnswer>(
    childSafeDraft?.immediateNeeds?.supervision || 'yes'
  );
  const [needFood, setNeedFood] = useState<NeedAssessmentAnswer>(
    childSafeDraft?.immediateNeeds?.foodAndWater || 'yes'
  );
  const [needMedical, setNeedMedical] = useState<NeedAssessmentAnswer>(
    childSafeDraft?.immediateNeeds?.medicalAttention || 'not_sure'
  );
  const [needShelter, setNeedShelter] = useState<NeedAssessmentAnswer>(
    childSafeDraft?.immediateNeeds?.safeTemporaryShelter || 'yes'
  );

  // Accuracy Confirmation Checkbox
  const [confirmedFactual, setConfirmedFactual] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleBack = () => {
    // Save draft state
    updateChildSafeDraft({
      childName,
      observedAgeGroup: ageGroup,
      landmark: observationArea,
      observedDateTime,
      caregiverPresent,
      factualObservations,
      immediateNeeds: {
        supervision: needSupervision,
        supervisionStatus: childSafeDraft?.immediateNeeds?.supervisionStatus || 'not_addressed',
        foodAndWater: needFood,
        foodStatus: childSafeDraft?.immediateNeeds?.foodStatus || 'pending',
        medicalAttention: needMedical,
        medicalStatus: childSafeDraft?.immediateNeeds?.medicalStatus || 'not_confirmed',
        safeTemporaryShelter: needShelter,
        shelterStatus: childSafeDraft?.immediateNeeds?.shelterStatus || 'under_review'
      }
    });
    navigateTo('child_safe_entry');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedFactual) {
      setErrorMsg('Please confirm that this report is based on your direct personal observation.');
      return;
    }
    setErrorMsg('');

    updateChildSafeDraft({
      childName,
      observedAgeGroup: ageGroup,
      landmark: observationArea,
      approximateArea: observationArea.includes('Bengaluru') ? observationArea : `${observationArea}, Bengaluru`,
      neighbourhood: 'Indiranagar',
      city: 'Bengaluru',
      observedDateTime,
      caregiverPresent,
      factualObservations,
      immediateNeeds: {
        supervision: needSupervision,
        supervisionStatus: needSupervision === 'yes' ? 'not_addressed' : 'needs_assessment',
        foodAndWater: needFood,
        foodStatus: needFood === 'yes' ? 'pending' : 'needs_assessment',
        medicalAttention: needMedical,
        medicalStatus: needMedical === 'yes' ? 'needs_assessment' : 'not_confirmed',
        safeTemporaryShelter: needShelter,
        shelterStatus: needShelter === 'yes' ? 'under_review' : 'needs_assessment'
      }
    });

    navigateTo('child_safe_review');
  };

  return (
    <div className={styles.container}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.contentWrap}>
        {/* Two-Column Form Layout matching Reference 05 */}
        <div className={styles.layoutGrid}>
          {/* Left Column: Editorial Guidance & Child Portrait */}
          <div className={styles.leftCol}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowDash} aria-hidden="true" />
              <span className={styles.eyebrowText}>CHILD SAFE</span>
            </div>

            <h1 className={styles.grandHeading}>
              Record what <span className={styles.highlight}>you know.</span>
            </h1>

            <p className={styles.subtext}>
              Share the details you have observed. This helps UJAAS route the case to the right
              people while keeping the child's information safe.
            </p>

            {/* Child Portrait with Sun Arch Composition */}
            <div className={styles.portraitComposition}>
              <div className={styles.sunArch} aria-hidden="true" />

              <svg
                className={`${styles.leafSprig} ${styles.leafSprigLeft}`}
                viewBox="0 0 120 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M100 270 Q40 180 80 120 Q30 80 60 10" stroke="#E2A66C" strokeWidth="2.5" strokeLinecap="round" />
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
                <path d="M20 270 Q80 180 40 120 Q90 80 60 10" stroke="#E2A66C" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M48 135 C70 120 80 95 58 90 C45 105 42 125 48 135 Z" fill="#ECC89B" />
                <path d="M35 185 C55 170 68 145 46 140 C32 152 30 175 35 185 Z" fill="#ECC89B" />
                <path d="M24 230 C44 215 55 190 35 186 C22 198 18 220 24 230 Z" fill="#ECC89B" />
              </svg>

              <div className={styles.portraitFrame}>
                <img
                  src={getAssetUrl('/images/child-with-doll.png')}
                  alt="Illustrative depiction of child holding doll"
                  className={styles.portraitImg}
                  width={380}
                  height={480}
                />
              </div>
            </div>

            {/* Sensitive Information Protection Notice */}
            <div className={styles.protectionNoticeCard}>
              <div className={styles.lockIconWrap} aria-hidden="true">
                <Lock size={18} color="#F45124" />
              </div>
              <div className={styles.protectionNoticeContent}>
                <h4 className={styles.protectionNoticeTitle}>Sensitive information is protected</h4>
                <p className={styles.protectionNoticeDesc}>
                  Your report is handled through a secure process and shared only with authorised child protection professionals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Progressive Form */}
          <div className={styles.rightCol}>
            {/* Stepper Indicator */}
            <div className={styles.stepperWrap} aria-label="Step progress">
              <div className={styles.stepperItemActive}>
                <span className={styles.stepperBadgeActive}>1</span>
                <span className={styles.stepperLabelActive}>Your Observation</span>
              </div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}>
                <span className={styles.stepperBadge}>2</span>
                <span className={styles.stepperLabel}>Review & Confirm</span>
              </div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}>
                <span className={styles.stepperBadge}>3</span>
                <span className={styles.stepperLabel}>Submitted</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
              {/* Form Section 1: Record what you know */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIndexBadge}>1</div>
                  <div>
                    <h2 className={styles.cardHeaderTitle}>Record what you know</h2>
                    <p className={styles.cardHeaderSubtitle}>
                      Please share as many details as you can. If you are not sure, that is okay.
                    </p>
                  </div>
                </div>

                <div className={styles.fieldsGrid}>
                  {/* Child Name Field */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="child-name-input" className={styles.fieldLabel}>
                      Child's name (if known)
                    </label>
                    <input
                      id="child-name-input"
                      type="text"
                      className={styles.textInput}
                      value={childName}
                      onChange={e => setChildName(e.target.value)}
                      placeholder="Enter name or 'Not known'"
                    />
                  </div>

                  {/* Estimated Age Group */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="child-age-select" className={styles.fieldLabel}>
                      Estimated age
                    </label>
                    <select
                      id="child-age-select"
                      className={styles.selectInput}
                      value={ageGroup}
                      onChange={e => setAgeGroup(e.target.value as ChildAgeGroup)}
                    >
                      <option value="infant">Infant (0 - 1 year)</option>
                      <option value="toddler">Toddler (1 - 3 years)</option>
                      <option value="young_child">Young child (4 - 6 years)</option>
                      <option value="older_child">Older child (7 - 12 years)</option>
                      <option value="teen">Teen (13 - 17 years)</option>
                      <option value="unknown">Age unknown</option>
                    </select>
                  </div>

                  {/* Where did you observe */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="child-location-input" className={styles.fieldLabel}>
                      Where did you observe the child?
                    </label>
                    <div className={styles.inputWithIcon}>
                      <MapPin size={17} className={styles.inputIcon} />
                      <input
                        id="child-location-input"
                        type="text"
                        className={styles.textInputWithIcon}
                        value={observationArea}
                        onChange={e => setObservationArea(e.target.value)}
                        placeholder="Search for an area, landmark or address"
                        required
                      />
                    </div>
                  </div>

                  {/* When did you observe */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="child-time-input" className={styles.fieldLabel}>
                      When did you observe the child?
                    </label>
                    <div className={styles.inputWithIcon}>
                      <Calendar size={17} className={styles.inputIcon} />
                      <input
                        id="child-time-input"
                        type="text"
                        className={styles.textInputWithIcon}
                        value={observedDateTime}
                        onChange={e => setObservedDateTime(e.target.value)}
                        placeholder="Select date and time"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Was a caregiver present? */}
                <div className={styles.questionBlock}>
                  <label className={styles.fieldLabel}>Was a caregiver present?</label>
                  <div className={styles.pillGroup} role="radiogroup" aria-label="Was a caregiver present">
                    <button
                      type="button"
                      className={`${styles.pillBtn} ${caregiverPresent === 'yes' ? styles.pillBtnActive : ''}`}
                      onClick={() => setCaregiverPresent('yes')}
                      role="radio"
                      aria-checked={caregiverPresent === 'yes'}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`${styles.pillBtn} ${caregiverPresent === 'no' ? styles.pillBtnActive : ''}`}
                      onClick={() => setCaregiverPresent('no')}
                      role="radio"
                      aria-checked={caregiverPresent === 'no'}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className={`${styles.pillBtn} ${caregiverPresent === 'not_sure' ? styles.pillBtnActive : ''}`}
                      onClick={() => setCaregiverPresent('not_sure')}
                      role="radio"
                      aria-checked={caregiverPresent === 'not_sure'}
                    >
                      Not sure
                    </button>
                  </div>
                </div>

                {/* Brief Observation Notes */}
                <div className={styles.textareaBlock}>
                  <div className={styles.textareaHeader}>
                    <label htmlFor="observation-notes" className={styles.fieldLabel}>
                      Brief observation notes
                    </label>
                    <span className={styles.charCounter}>
                      {factualObservations.length}/500
                    </span>
                  </div>
                  <textarea
                    id="observation-notes"
                    className={styles.textareaInput}
                    rows={4}
                    maxLength={500}
                    value={factualObservations}
                    onChange={e => setFactualObservations(e.target.value)}
                    placeholder="Share what you observed, including the child's appearance, behaviour and any other relevant details..."
                    required
                  />
                </div>
              </div>

              {/* Form Section 2: Immediate Needs Assessment */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIndexBadge}>2</div>
                  <div>
                    <h2 className={styles.cardHeaderTitle}>Immediate needs assessment</h2>
                    <p className={styles.cardHeaderSubtitle}>
                      Based on what you observed, does the child appear to need any of the following?
                    </p>
                  </div>
                </div>

                <div className={styles.needsGrid}>
                  {/* Need 1: Adult Supervision */}
                  <div className={styles.needCard}>
                    <div className={styles.needCardTop}>
                      <div className={styles.needIconCircle}>
                        <Users size={18} />
                      </div>
                      <div className={styles.needTextWrap}>
                        <h4 className={styles.needTitle}>Adult supervision</h4>
                        <p className={styles.needQuestion}>
                          Does the child appear to need a responsible caregiver right now?
                        </p>
                      </div>
                    </div>
                    <div className={styles.needButtonGroup}>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needSupervision === 'yes' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedSupervision('yes')}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needSupervision === 'no' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedSupervision('no')}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needSupervision === 'not_sure' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedSupervision('not_sure')}
                      >
                        Not sure
                      </button>
                    </div>
                  </div>

                  {/* Need 2: Food and Water */}
                  <div className={styles.needCard}>
                    <div className={styles.needCardTop}>
                      <div className={styles.needIconCircle}>
                        <Utensils size={18} />
                      </div>
                      <div className={styles.needTextWrap}>
                        <h4 className={styles.needTitle}>Food and water</h4>
                        <p className={styles.needQuestion}>
                          Does the child appear to need food or clean water?
                        </p>
                      </div>
                    </div>
                    <div className={styles.needButtonGroup}>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needFood === 'yes' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedFood('yes')}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needFood === 'no' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedFood('no')}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needFood === 'not_sure' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedFood('not_sure')}
                      >
                        Not sure
                      </button>
                    </div>
                  </div>

                  {/* Need 3: Medical Attention */}
                  <div className={styles.needCard}>
                    <div className={styles.needCardTop}>
                      <div className={styles.needIconCircle}>
                        <Stethoscope size={18} />
                      </div>
                      <div className={styles.needTextWrap}>
                        <h4 className={styles.needTitle}>Medical attention</h4>
                        <p className={styles.needQuestion}>
                          Does the child appear to need medical care or health evaluation?
                        </p>
                      </div>
                    </div>
                    <div className={styles.needButtonGroup}>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needMedical === 'yes' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedMedical('yes')}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needMedical === 'no' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedMedical('no')}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needMedical === 'not_sure' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedMedical('not_sure')}
                      >
                        Not sure
                      </button>
                    </div>
                  </div>

                  {/* Need 4: Safe Temporary Shelter */}
                  <div className={styles.needCard}>
                    <div className={styles.needCardTop}>
                      <div className={styles.needIconCircle}>
                        <Home size={18} />
                      </div>
                      <div className={styles.needTextWrap}>
                        <h4 className={styles.needTitle}>Safe temporary shelter</h4>
                        <p className={styles.needQuestion}>
                          Does the child appear to need a safe place to stay right now?
                        </p>
                      </div>
                    </div>
                    <div className={styles.needButtonGroup}>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needShelter === 'yes' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedShelter('yes')}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needShelter === 'no' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedShelter('no')}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className={`${styles.needOptionBtn} ${needShelter === 'not_sure' ? styles.needOptionActive : ''}`}
                        onClick={() => setNeedShelter('not_sure')}
                      >
                        Not sure
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className={styles.confirmationRow}>
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={confirmedFactual}
                    onChange={e => setConfirmedFactual(e.target.checked)}
                  />
                  <span className={`${styles.customCheckbox} ${confirmedFactual ? styles.customCheckboxChecked : ''}`}>
                    {confirmedFactual && <Check size={14} strokeWidth={3} />}
                  </span>
                  <span className={styles.checkboxLabelText}>
                    I confirm that the information above is based only on what I have personally observed.
                    I understand that providing accurate information helps ensure the child receives the right support.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className={styles.formErrorNotice} role="alert">
                  {errorMsg}
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className={styles.formActionsRow}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={handleBack}
                  aria-label="Back to landing page"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className={styles.continueButton}
                  aria-label="Save and continue to review"
                >
                  <span>Save and continue</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
