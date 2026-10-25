import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, Users, ArrowRight, CheckCircle2, ShieldAlert, ArrowLeft } from 'lucide-react';
import { IntentType } from '../types';
import styles from './IntentSelectionPanel.module.css';

interface IntentSelectionPanelProps {
  intent: IntentType;
  onClose: () => void;
  onSwitchIntent: (intent: IntentType) => void;
}

export const IntentSelectionPanel: React.FC<IntentSelectionPanelProps> = ({
  intent,
  onClose,
  onSwitchIntent
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelectedCategory(null);
    setSubmitted(false);
    if (intent) {
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [intent, onClose]);

  if (!intent) return null;

  const isNeedHelp = intent === 'need-help';

  const needHelpCategories = [
    { id: 'elder', title: 'Elder Care & Mobility', desc: 'Lost personal caregiver, medication assistance, or mobility support.' },
    { id: 'child', title: 'Child & Infant Care', desc: 'Infants or children missing parents/guardians needing emergency shelter or foster care.' },
    { id: 'supplies', title: 'Food & Essential Rations', desc: 'Neighborhood supply drops for drinking water, infant formula, or warm meals.' },
    { id: 'medical', title: 'First Aid & Mental Wellness', desc: 'Trauma support, nursing triage, or basic medical assistance.' }
  ];

  const canHelpCategories = [
    { id: 'caregiver', title: 'Elder Companion & Caregiver', desc: 'Provide daily visits, meal preparation, and comfort for older adults.' },
    { id: 'guardian', title: 'Emergency Child Support', desc: 'Nursery experience, supervision, and daytime care for children.' },
    { id: 'driver', title: 'Transport & Logistics', desc: 'Vehicle available for delivery of rations, medicines, and medical escorts.' },
    { id: 'organizer', title: 'Community Sector Volunteer', desc: 'Help coordinate local supply hubs and neighborhood check-in points.' }
  ];

  const currentCategories = isNeedHelp ? needHelpCategories : canHelpCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      setSelectedCategory(currentCategories[0].id);
    }
    setSubmitted(true);
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intent-panel-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        {/* Header Bar */}
        <div className={styles.header}>
          <div className={styles.intentBadge}>
            {isNeedHelp ? (
              <>
                <Heart size={14} className={styles.badgeIcon} fill="currentColor" />
                <span>INTENTION: SEEKING SUPPORT</span>
              </>
            ) : (
              <>
                <Users size={14} className={styles.badgeIcon} />
                <span>INTENTION: OFFERING VOLUNTEER CARE</span>
              </>
            )}
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close intent selection dialog"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        <div className={styles.content}>
          <h2 id="intent-panel-title" className={styles.title}>
            {isNeedHelp
              ? 'Tell us what kind of support is urgently needed.'
              : 'Thank you for standing up. How can you help?'}
          </h2>

          <p className={styles.desc}>
            {isNeedHelp
              ? 'When the Snap dissolved caregivers and parents, ordinary routines broke down. UJAAS pairs you with verified neighbors ready to help immediately.'
              : 'Half our people are gone, but our duty to care for the vulnerable remains. Choose the areas where you can lend hands or time.'}
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.categoryGrid}>
                {currentCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`${styles.categoryCard} ${isSelected ? styles.selected : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <div className={styles.cardRadio}>
                        {isSelected && <span className={styles.radioDot} />}
                      </div>
                      <div className={styles.cardText}>
                        <div className={styles.cardTitle}>{cat.title}</div>
                        <div className={styles.cardDesc}>{cat.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Prototype Disclaimer */}
              <div className={styles.disclaimer}>
                <ShieldAlert size={16} className={styles.disclaimerIcon} />
                <span>
                  <strong>Phase 01 Prototype Flow:</strong> This prototype captures your simulated intent. Live backend dispatch and volunteer verification will be connected in Phase 02.
                </span>
              </div>

              {/* Form Actions */}
              <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn}>
                  <span>Continue Intention</span>
                  <ArrowRight size={16} strokeWidth={2.4} />
                </button>

                <button
                  type="button"
                  className={styles.switchBtn}
                  onClick={() => onSwitchIntent(isNeedHelp ? 'can-help' : 'need-help')}
                >
                  <span>Switch to "{isNeedHelp ? 'I can help' : 'I need help'}"</span>
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.confirmationState}>
              <div className={styles.checkCircle}>
                <CheckCircle2 size={36} className={styles.checkIcon} />
              </div>
              <h3 className={styles.confirmTitle}>
                {isNeedHelp ? 'Intention Recorded' : 'Volunteer Pledge Recorded'}
              </h3>
              <p className={styles.confirmText}>
                {isNeedHelp
                  ? 'Your request for urgent assistance has been simulated in the Phase 01 prototype environment. No live emergency request has been sent.'
                  : 'Your readiness to assist your community has been logged in the Phase 01 design prototype.'}
              </p>

              <div className={styles.confirmActions}>
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={onClose}
                >
                  <ArrowLeft size={16} />
                  <span>Return to Hero</span>
                </button>

                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedCategory(null);
                  }}
                >
                  Select another category
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
