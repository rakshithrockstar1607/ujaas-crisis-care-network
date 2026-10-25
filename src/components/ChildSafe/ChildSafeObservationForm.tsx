import React, { useState } from 'react';
import {
  MapPin,
  FileText,
  Clock,
  UserCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Phone,
  AlertCircle
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { getAssetUrl } from '../../utils/assets';
import {
  ChildAgeGroup,
  ChildPresenceState,
  ChildConditionObservation,
  ServiceContactStatus
} from '../../types/childSafe';
import styles from './ChildSafeObservationForm.module.css';

export const ChildSafeObservationForm: React.FC = () => {
  const { childSafeDraft, updateChildSafeDraft, navigateTo, goBack } = useCareContext();
  const { activeUser, isAarav } = useAccountContext();

  // Controlled form state initialized from draft
  const [city] = useState(childSafeDraft?.city || 'Bengaluru');
  const [neighbourhood, setNeighbourhood] = useState(childSafeDraft?.neighbourhood || 'Indiranagar');
  const [landmark, setLandmark] = useState(
    childSafeDraft?.landmark || 'Near 100ft Road Bus Stop, 4th Cross'
  );
  const [factualObservations, setFactualObservations] = useState(
    childSafeDraft?.factualObservations ||
      'I noticed a young child (approx 4–6 years old) alone near the bus stop holding a doll. I waited nearby for 30 minutes, but no familiar caregiver or adult was visibly present. The child appears awake, alert, and responsive, but quiet.'
  );
  const [ageGroup, setAgeGroup] = useState<ChildAgeGroup>(
    childSafeDraft?.observedAgeGroup || 'young_child'
  );
  const [presenceState, setPresenceState] = useState<ChildPresenceState>(
    childSafeDraft?.presenceState || 'with_reporter'
  );
  const [conditionObs, setConditionObs] = useState<ChildConditionObservation[]>(
    childSafeDraft?.observedCondition || ['appears_responsive']
  );
  const [servicesContacted, setServicesContacted] = useState<ServiceContactStatus>(
    childSafeDraft?.servicesContacted || 'not_contacted'
  );
  const [servicesDetails, setServicesDetails] = useState(
    childSafeDraft?.servicesContactedDetails || ''
  );
  const [contactPreference, setContactPreference] = useState<'phone' | 'sms' | 'in_person'>(
    (childSafeDraft?.contactPreference as 'phone' | 'sms' | 'in_person') || 'phone'
  );

  const toggleCondition = (item: ChildConditionObservation) => {
    setConditionObs(prev =>
      prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item]
    );
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    updateChildSafeDraft({
      city,
      neighbourhood,
      landmark,
      approximateArea: `${neighbourhood}, ${city}`,
      factualObservations,
      observedAgeGroup: ageGroup,
      presenceState,
      observedCondition: conditionObs,
      servicesContacted,
      servicesContactedDetails: servicesDetails,
      contactPreference
    });
    navigateTo('child_safe_review');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Stepper Progress */}
        <div className={styles.stepperBar} aria-label="Step indicator">
          <span className={`${styles.stepPill} ${styles.stepPillActive}`}>
            Step 1 of 2: Factual Observation
          </span>
          <div className={styles.stepperDivider} />
          <span className={styles.stepPill}>Step 2: Review & Record</span>
        </div>

        {/* Heading */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— SENSITIVE CASE OBSERVATION</div>
          <h1 className={styles.title}>Tell us what you observed.</h1>
          <p className={styles.subtitle}>
            Share only what you know. You can leave uncertain details unanswered. Everything
            recorded here is kept within the safeguarded case boundary.
          </p>
        </div>

        <form onSubmit={handleReview} className={styles.form}>
          {/* Section A: General Location */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <MapPin size={20} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Section A — General Location</h2>
              <span className={styles.cardSubtitle}>Approximate area only</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Neighbourhood / Locality <span className={styles.requiredAsterisk}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={neighbourhood}
                  onChange={e => setNeighbourhood(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Nearby Public Landmark</label>
                <input
                  type="text"
                  className={styles.input}
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="e.g. Near 100ft Road Bus Stop, 4th Cross"
                />
              </div>
            </div>

            <div className={styles.inputHint} style={{ marginTop: '0.75rem' }}>
              We do not ask for exact residential addresses. Only designated demonstration coordinators and statutory child protection units can see general location coordinates.
            </div>
          </div>

          {/* Section B: Factual Observations */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <FileText size={20} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Section B — What did you observe?</h2>
              <span className={styles.cardSubtitle}>Factual notes</span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Describe the situation <span className={styles.requiredAsterisk}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                value={factualObservations}
                onChange={e => setFactualObservations(e.target.value)}
                maxLength={600}
                required
                rows={4}
              />
              <div className={styles.charCount}>
                {factualObservations.length}/600 characters
              </div>
              <div className={styles.inputHint}>
                Record facts you observed directly. Avoid speculations about disappearance, abandonment, or caregiver intent.
              </div>
            </div>
          </div>

          {/* Section C: Approximate Age */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <Clock size={20} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Section C — Approximate Age Group</h2>
            </div>

            <div className={styles.pillGrid}>
              {[
                { id: 'infant', label: 'Infant (0–1 yr)' },
                { id: 'toddler', label: 'Toddler (1–3 yrs)' },
                { id: 'young_child', label: 'Young child (4–6 yrs) · Demo' },
                { id: 'older_child', label: 'Older child (7–12 yrs)' },
                { id: 'unknown', label: 'Age unknown' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.choiceBtn} ${
                    ageGroup === opt.id ? styles.choiceBtnActive : ''
                  }`}
                  onClick={() => setAgeGroup(opt.id as ChildAgeGroup)}
                >
                  <span>{opt.label}</span>
                  {ageGroup === opt.id && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Section D: Is child currently with you? */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <ShieldAlert size={20} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Section D — Is the child currently with you?</h2>
            </div>

            <div className={styles.pillGrid}>
              {[
                {
                  id: 'with_reporter',
                  label: 'Yes, child is in my immediate safe presence'
                },
                {
                  id: 'not_with_reporter',
                  label: 'No, observed nearby in public area'
                },
                {
                  id: 'unsure_location',
                  label: "I'm not sure where child is now"
                }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.choiceBtn} ${
                    presenceState === opt.id ? styles.choiceBtnActive : ''
                  }`}
                  onClick={() => setPresenceState(opt.id as ChildPresenceState)}
                >
                  <span>{opt.label}</span>
                  {presenceState === opt.id && <Check size={16} />}
                </button>
              ))}
            </div>

            <div className={styles.contextNotice}>
              <strong>Safety guidance:</strong> Never take an unaccompanied child to a private residence or change their clothes. Remain in a visible public landmark and wait for authorised child protection or emergency responders.
            </div>
          </div>

          {/* Section E: Observed Condition */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <UserCheck size={20} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Section E — Observed Condition (Select all that apply)</h2>
            </div>

            <div className={styles.checkboxStack}>
              {[
                { id: 'appears_responsive', label: 'Appears awake, alert, and responsive' },
                { id: 'appears_injured', label: 'Appears visibly injured or requiring first aid' },
                { id: 'appears_distressed', label: 'Appears visibly distressed, crying, or anxious' },
                { id: 'unknown_condition', label: 'Immediate physical condition is unknown' }
              ].map(item => {
                const active = conditionObs.includes(item.id as ChildConditionObservation);
                return (
                  <div
                    key={item.id}
                    className={`${styles.checkboxItem} ${active ? styles.checkboxItemActive : ''}`}
                    onClick={() => toggleCondition(item.id as ChildConditionObservation)}
                    role="checkbox"
                    aria-checked={active}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleCondition(item.id as ChildConditionObservation);
                      }
                    }}
                  >
                    <div className={styles.checkSquare}>
                      {active && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className={styles.checkboxLabel}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section F: Services Contacted */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <Phone size={20} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Section F — Have relevant services already been contacted?</h2>
            </div>

            <div className={styles.pillGrid}>
              {[
                { id: 'not_contacted', label: 'No, not contacted yet' },
                { id: 'contacted', label: 'Yes, emergency or 1098 contacted' },
                { id: 'unsure', label: 'Unsure if others called' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.choiceBtn} ${
                    servicesContacted === opt.id ? styles.choiceBtnActive : ''
                  }`}
                  onClick={() => setServicesContacted(opt.id as ServiceContactStatus)}
                >
                  <span>{opt.label}</span>
                  {servicesContacted === opt.id && <Check size={16} />}
                </button>
              ))}
            </div>

            {servicesContacted === 'contacted' && (
              <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                <label className={styles.label}>Which service did you contact? (Optional)</label>
                <input
                  type="text"
                  className={styles.input}
                  value={servicesDetails}
                  onChange={e => setServicesDetails(e.target.value)}
                  placeholder="e.g. 1098 Childline reported at 14:15"
                />
              </div>
            )}
          </div>

          {/* Section G: Reporter Contact */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <AlertCircle size={20} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Section G — Reporter Contact & Follow-up</h2>
            </div>

            <div className={styles.reporterIdentityBox}>
              <img
                src={getAssetUrl(activeUser?.avatar || '/images/contacts/aarav.png')}
                alt={activeUser?.firstName || 'Aarav'}
                className={styles.reporterAvatar}
              />
              <div className={styles.reporterMeta}>
                <span className={styles.reporterName}>
                  {activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Aarav Sharma'}
                </span>
                <span className={styles.reporterSub}>
                  {isAarav ? 'Signed in as Aarav Sharma · Volunteer · Indiranagar' : 'Signed in UJAAS Member'} · {activeUser?.phone || '+91 98450 23891'}
                </span>
              </div>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '1.25rem' }}>
              <label className={styles.label}>Preferred Callback Method</label>
              <div className={styles.pillGrid}>
                {[
                  { id: 'phone', label: 'Phone call' },
                  { id: 'sms', label: 'SMS text message' },
                  { id: 'in_person', label: 'In-person check-in by coordinator' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    className={`${styles.choiceBtn} ${
                      contactPreference === m.id ? styles.choiceBtnActive : ''
                    }`}
                    onClick={() => setContactPreference(m.id as 'phone' | 'sms' | 'in_person')}
                  >
                    <span>{m.label}</span>
                    {contactPreference === m.id && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.backSecondaryBtn}
              onClick={() => goBack()}
            >
              <ArrowLeft size={16} />
              <span>Back to Selection</span>
            </button>

            <button type="submit" className={styles.submitBtn}>
              <span>Review concern</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
