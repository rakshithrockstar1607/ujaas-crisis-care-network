import React from 'react';
import { ShoppingBag, Pill, Home, Car, PhoneCall, MessageCircle, AlertTriangle, Check, Heart } from 'lucide-react';
import { NeedCategory, NeedUrgency, NeedBeneficiary } from '../../types/account';
import styles from './Step08NeedsHelp.module.css';

interface Step08NeedsHelpProps {
  needs: NeedCategory[];
  onToggleNeed: (need: NeedCategory) => void;
  urgency: NeedUrgency;
  onUrgencyChange: (u: NeedUrgency) => void;
  beneficiary: NeedBeneficiary;
  onBeneficiaryChange: (b: NeedBeneficiary) => void;
}

export const Step08NeedsHelp: React.FC<Step08NeedsHelpProps> = ({
  needs,
  onToggleNeed,
  urgency,
  onUrgencyChange,
  beneficiary,
  onBeneficiaryChange
}) => {
  const needOptions: { id: NeedCategory; title: string; desc: string; icon: any }[] = [
    {
      id: 'food_water',
      title: 'Food & water',
      desc: 'Groceries and essential supplies.',
      icon: ShoppingBag
    },
    {
      id: 'medication_access',
      title: 'Medication access',
      desc: 'Collecting or arranging prescriptions.',
      icon: Pill
    },
    {
      id: 'a_safe_place',
      title: 'A safe place',
      desc: 'Shelter or temporary accommodation.',
      icon: Home
    },
    {
      id: 'transport',
      title: 'Transport',
      desc: 'Getting to an essential appointment.',
      icon: Car
    },
    {
      id: 'a_check_in',
      title: 'A check-in',
      desc: 'Someone trusted to reach out.',
      icon: PhoneCall
    },
    {
      id: 'something_else',
      title: 'Something else',
      desc: 'Tell us in your own words.',
      icon: MessageCircle
    }
  ];

  return (
    <div className={styles.container}>
      {/* Selected Intention Bar */}
      <div className={styles.intentBar}>
        <div className={styles.intentLeft}>
          <Heart size={16} className={styles.intentIcon} />
          <span>Selected intention: <strong>I need help</strong></span>
        </div>
        <span className={styles.intentHint}>No account needed for emergency guidance.</span>
      </div>

      <h1 className={styles.headline}>What would make today easier?</h1>
      <p className={styles.subtitle}>
        Tell us what you need. You can select multiple categories and request on someone's behalf.
      </p>

      {/* 2x3 Needs Grid */}
      <div className={styles.needsGrid} role="group" aria-label="Support categories">
        {needOptions.map(opt => {
          const Icon = opt.icon;
          const isSelected = needs.includes(opt.id);

          return (
            <div
              key={opt.id}
              className={`${styles.needCard} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => onToggleNeed(opt.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onToggleNeed(opt.id);
              }}
            >
              <div className={styles.iconCircle}>
                <Icon size={20} />
              </div>
              <div className={styles.needText}>
                <h2 className={styles.needTitle}>{opt.title}</h2>
                <p className={styles.needDesc}>{opt.desc}</p>
              </div>
              <div className={styles.checkIndicator}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Urgency and Beneficiary Controls */}
      <div className={styles.metaSelectorsGrid}>
        <div className={styles.selectorBlock}>
          <span className={styles.selectorLabel}>How soon do you need this?</span>
          <div className={styles.pillsRow}>
            {[
              { id: 'as_soon_as_possible', label: 'As soon as possible' },
              { id: 'within_1_2_days', label: 'Within 1–2 days' },
              { id: 'this_week', label: 'This week' }
            ].map(u => {
              const isSelected = urgency === u.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  className={`${styles.pillBtn} ${isSelected ? styles.pillSelected : ''}`}
                  onClick={() => onUrgencyChange(u.id as NeedUrgency)}
                >
                  {isSelected ? `✓ ${u.label}` : u.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.selectorBlock}>
          <span className={styles.selectorLabel}>Who needs this help?</span>
          <div className={styles.pillsRow}>
            {[
              { id: 'for_myself', label: 'For myself' },
              { id: 'for_someone_else', label: 'For someone else' }
            ].map(b => {
              const isSelected = beneficiary === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  className={`${styles.pillBtn} ${isSelected ? styles.pillSelected : ''}`}
                  onClick={() => onBeneficiaryChange(b.id as NeedBeneficiary)}
                >
                  {isSelected ? `✓ ${b.label}` : b.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Immediate Danger Warning */}
      <div className={styles.warningBox}>
        <AlertTriangle size={18} className={styles.warningIcon} />
        <span>Immediate danger? Contact emergency services directly (Police 100 or Childline 1098). UJAAS does not replace emergency responders.</span>
      </div>
    </div>
  );
};
