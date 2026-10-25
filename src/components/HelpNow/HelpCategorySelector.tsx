import React, { useState } from 'react';
import {
  ShoppingBag,
  Pill,
  Car,
  Home,
  HeartHandshake,
  Package,
  Check,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { HelpCategory } from '../../types/helpNow';
import styles from './HelpCategorySelector.module.css';

interface CategoryOption {
  id: HelpCategory;
  title: string;
  desc: string;
  icon: React.ReactNode;
  isPrimaryDemo?: boolean;
}

export const HelpCategorySelector: React.FC = () => {
  const { helpCategoryDraft, setHelpCategoryDraft, navigateTo, goBack } = useCareContext();
  const [selected, setSelected] = useState<HelpCategory[]>(() => {
    return helpCategoryDraft.length > 0 ? helpCategoryDraft : ['food_water'];
  });

  const categories: CategoryOption[] = [
    {
      id: 'food_water',
      title: 'Food & drinking water',
      desc: 'Rice, dal, vegetables, clean drinking water, infant formula or dry provisions.',
      icon: <ShoppingBag size={28} />,
      isPrimaryDemo: true
    },
    {
      id: 'medication_access',
      title: 'Medication access',
      desc: 'Prescription pickup, routine refills, or guidance to an operational clinic/pharmacy.',
      icon: <Pill size={28} />
    },
    {
      id: 'transport',
      title: 'Transport / safe transit',
      desc: 'Local transport for vulnerable individuals or urgent transit to a community center.',
      icon: <Car size={28} />
    },
    {
      id: 'temporary_shelter',
      title: 'Temporary shelter',
      desc: 'Safe verified community accommodation if home power or water is disrupted.',
      icon: <Home size={28} />
    },
    {
      id: 'check_in',
      title: 'A check-in or welfare visit',
      desc: 'In-person physical visit for an isolated elder or someone unable to reach a phone.',
      icon: <HeartHandshake size={28} />
    },
    {
      id: 'other',
      title: 'Other essentials',
      desc: 'Hygiene items, torches, blankets, mobile recharging, or logistical assistance.',
      icon: <Package size={28} />
    }
  ];

  const toggleCategory = (catId: HelpCategory) => {
    setSelected(prev => {
      if (prev.includes(catId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(c => c !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const handleContinue = () => {
    setHelpCategoryDraft(selected);
    navigateTo('help_request_form');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Step indicator */}
        <div className={styles.stepperWrap}>
          <div className={styles.stepItemActive}>
            <span className={styles.stepBadge}>1</span>
            <span>Need</span>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.stepItemPending}>
            <span className={styles.stepBadgePending}>2</span>
            <span>Details</span>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.stepItemPending}>
            <span className={styles.stepBadgePending}>3</span>
            <span>Review</span>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.stepItemPending}>
            <span className={styles.stepBadgePending}>4</span>
            <span>Track</span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>STEP 1 OF 4 · SELECT SUPPORT</div>
          <h1 className={styles.title}>
            What would make <span className={styles.highlight}>today easier?</span>
          </h1>
          <p className={styles.subtitle}>
            Select the support you need. You can choose more than one category.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className={styles.grid}>
          {categories.map(cat => {
            const isChecked = selected.includes(cat.id);
            return (
              <div
                key={cat.id}
                className={`${styles.card} ${isChecked ? styles.cardSelected : ''}`}
                onClick={() => toggleCategory(cat.id)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    toggleCategory(cat.id);
                  }
                }}
              >
                <div className={styles.cardTop}>
                  <div className={`${styles.iconWrap} ${isChecked ? styles.iconWrapActive : ''}`}>
                    {cat.icon}
                  </div>
                  <div className={`${styles.checkCircle} ${isChecked ? styles.checkCircleActive : ''}`}>
                    {isChecked && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>

                {cat.isPrimaryDemo && (
                  <span className={styles.demoPill}>Primary demonstration path</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Guidance Notice */}
        <div className={styles.infoBanner}>
          <Info size={18} className={styles.infoIcon} />
          <div>
            <strong>Need urgent medical or physical danger response?</strong>
            <span>
              UJAAS coordinates everyday community support. For life-threatening emergencies,
              please contact public emergency services (Police <strong>100</strong>, Childline <strong>1098</strong>, or present-day 112) immediately.
            </span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className={styles.footer}>
          <button type="button" className={styles.backBtn} onClick={() => goBack()}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <button
            type="button"
            className={styles.continueBtn}
            onClick={handleContinue}
            disabled={selected.length === 0}
          >
            <span>Continue to details</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
