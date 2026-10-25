import React, { useState } from 'react';
import { Eye, Clock, Phone, ShieldCheck, Check, Edit2 } from 'lucide-react';
import { ConcernObservation } from '../../types/account';
import { getAssetUrl } from '../../utils/assets';
import styles from './Step09ConcernPath.module.css';

interface Step09ConcernPathProps {
  subjectName: string;
  onSubjectNameChange: (val: string) => void;
  relationship: string;
  onRelationshipChange: (val: string) => void;
  observations: ConcernObservation[];
  onToggleObservation: (obs: ConcernObservation) => void;
}

export const Step09ConcernPath: React.FC<Step09ConcernPathProps> = ({
  subjectName,
  onSubjectNameChange,
  relationship,
  onRelationshipChange,
  observations,
  onToggleObservation
}) => {
  const [isEditingPerson, setIsEditingPerson] = useState(false);

  return (
    <div className={styles.container}>
      {/* Selected Intention Bar */}
      <div className={styles.intentBar}>
        <div className={styles.intentLeft}>
          <Eye size={16} className={styles.intentIcon} />
          <span>Selected intention: <strong>I'm concerned about someone</strong></span>
        </div>
        <span className={styles.intentHint}>A concern is not a confirmed emergency.</span>
      </div>

      <h1 className={styles.headline}>Who might need a check-in?</h1>
      <p className={styles.subtitle}>
        Start with facts, not assumptions. We can help you reach a familiar person responsibly.
      </p>

      {/* Person Summary Card */}
      <div className={styles.personCard}>
        <img
          src={getAssetUrl('/images/contacts/savitri.png')}
          alt={subjectName}
          className={styles.personAvatar}
        />
        <div className={styles.personMeta}>
          {isEditingPerson ? (
            <div className={styles.editRow}>
              <input
                type="text"
                className={styles.editInput}
                value={subjectName}
                onChange={e => onSubjectNameChange(e.target.value)}
                placeholder="Person's name"
              />
              <input
                type="text"
                className={styles.editInput}
                value={relationship}
                onChange={e => onRelationshipChange(e.target.value)}
                placeholder="Relationship (e.g. Grandmother)"
              />
              <button
                type="button"
                className={styles.doneEditBtn}
                onClick={() => setIsEditingPerson(false)}
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              <h2 className={styles.personName}>{subjectName || 'Savitri Amma'}</h2>
              <p className={styles.personSub}>{relationship || 'My grandmother'} · Indiranagar</p>
            </div>
          )}
        </div>
        {!isEditingPerson && (
          <button
            type="button"
            className={styles.changePersonBtn}
            onClick={() => setIsEditingPerson(true)}
          >
            <span>Change person</span>
            <Edit2 size={13} />
          </button>
        )}
      </div>

      <div className={styles.contentSplit}>
        {/* Left: Observations List */}
        <div className={styles.leftObs}>
          <span className={styles.obsSectionTitle}>What have you actually observed?</span>

          <div className={styles.obsList}>
            {/* Observation 1 */}
            <div
              className={`${styles.obsCard} ${observations.includes('caregiver_check_in_missed') ? styles.obsSelected : ''}`}
              onClick={() => onToggleObservation('caregiver_check_in_missed')}
            >
              <div className={styles.checkSquare}>
                {observations.includes('caregiver_check_in_missed') && <Check size={14} strokeWidth={3} />}
              </div>
              <span className={styles.obsText}>A usual caregiver check-in was missed</span>
            </div>

            {/* Observation 2 */}
            <div
              className={`${styles.obsCard} ${observations.includes('essential_supplies_low') ? styles.obsSelected : ''}`}
              onClick={() => onToggleObservation('essential_supplies_low')}
            >
              <div className={styles.clockIcon}>
                <Clock size={16} />
              </div>
              <span className={styles.obsText}>Essential supplies may be running low</span>
              <div className={styles.checkIndicator}>
                {observations.includes('essential_supplies_low') && <Check size={12} strokeWidth={3} />}
              </div>
            </div>

            {/* Observation 3 */}
            <div
              className={`${styles.obsCard} ${observations.includes('cannot_reach_directly') ? styles.obsSelected : ''}`}
              onClick={() => onToggleObservation('cannot_reach_directly')}
            >
              <div className={styles.phoneIcon}>
                <Phone size={16} />
              </div>
              <span className={styles.obsText}>I can't reach the person directly</span>
              <div className={styles.checkIndicator}>
                {observations.includes('cannot_reach_directly') && <Check size={12} strokeWidth={3} />}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Facts vs Assumptions Distinction (Ref 09) */}
        <div className={styles.rightFactsCard}>
          <div className={styles.factItem}>
            <span className={styles.knownBadge}>KNOWN</span>
            <p className={styles.factText}>
              Meera's scheduled check-in has not been confirmed.
            </p>
          </div>

          <div className={styles.factItem}>
            <span className={styles.unknownBadge}>NOT YET KNOWN</span>
            <p className={styles.factText}>
              Whether Meera has disappeared or another relative is providing care.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Notice Box */}
      <div className={styles.shieldNotice}>
        <ShieldCheck size={18} className={styles.shieldIcon} />
        <span>UJAAS will open a possible care concern, not label Meera missing or create a confirmed emergency.</span>
      </div>
    </div>
  );
};
