import React from 'react';
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle2, HelpCircle, Users, FileText } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './CareConcernView.module.css';

export const CareConcernView: React.FC = () => {
  const {
    contacts,
    navigateTo,
    openAlternativeHelperModal
  } = useCareContext();

  const savitri = contacts.savitri;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Navigation Breadcrumb */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigateTo('my_circle')}
          aria-label="Back to My Circle"
        >
          <ArrowLeft size={16} />
          <span>Back to My Circle</span>
        </button>

        {/* Section Header */}
        <div>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrow}>CARE GAP EVALUATION</span>
          </div>
          <h1 className={styles.headline}>Possible care interruption</h1>
          <p className={styles.subheadline}>
            Meera's scheduled check-in has not been confirmed. This may affect Savitri Amma's upcoming care responsibilities.
          </p>
        </div>

        {/* Savitri Amma Profile Bar */}
        {savitri && (
          <div className={styles.recipientBar}>
            <img
              src={savitri.avatar}
              alt=""
              width={60}
              height={60}
              className={styles.recipientAvatar}
            />
            <div className={styles.recipientInfo}>
              <span className={styles.recipientName}>{savitri.name}</span>
              <span className={styles.recipientMeta}>
                <span>{savitri.relationship}</span>
                <span>•</span>
                <span>Age {savitri.age}</span>
                <span>•</span>
                <span>{savitri.location}</span>
              </span>
            </div>
          </div>
        )}

        {/* Attention Summary Notice */}
        <div className={styles.attentionBanner} role="alert">
          <AlertCircle size={22} className={styles.bannerIcon} />
          <div>
            <h3 className={styles.bannerHeading}>Unconfirmed Check-in: Meera (Daughter)</h3>
            <p className={styles.bannerText}>
              Meera was scheduled to visit this morning to assist with fresh rations and routine household supplies. Her phone is unreachable, and no check-in confirmation was submitted to the network.
            </p>
          </div>
        </div>

        {/* Balanced Panels: What We Know vs What We Don't Know */}
        <div className={styles.panelsGrid}>
          {/* Panel A: What We Know */}
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <CheckCircle2 size={20} className={styles.panelHeaderIcon} />
              <h2 className={styles.panelTitle}>What we know</h2>
            </div>
            <ul className={styles.itemsList}>
              <li className={styles.itemRow}>
                <CheckCircle2 size={16} className={styles.itemIconKnown} />
                <span>Meera was expected to check in this morning for Savitri Amma's daily care.</span>
              </li>
              <li className={styles.itemRow}>
                <CheckCircle2 size={16} className={styles.itemIconKnown} />
                <span>The scheduled check-in has not been confirmed following the Snap.</span>
              </li>
              <li className={styles.itemRow}>
                <CheckCircle2 size={16} className={styles.itemIconKnown} />
                <span>Savitri Amma has an existing registered care plan in the network.</span>
              </li>
              <li className={styles.itemRow}>
                <CheckCircle2 size={16} className={styles.itemIconKnown} />
                <span>Essential grocery support is due within the next 1–2 days.</span>
              </li>
              <li className={styles.itemRow}>
                <CheckCircle2 size={16} className={styles.itemIconKnown} />
                <span>Aarav is listed as a primary trusted emergency contact.</span>
              </li>
            </ul>
          </div>

          {/* Panel B: What We Don't Know */}
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <HelpCircle size={20} className={styles.panelHeaderIcon} />
              <h2 className={styles.panelTitle}>What we don't know</h2>
            </div>
            <ul className={styles.itemsList}>
              <li className={styles.itemRow}>
                <HelpCircle size={16} className={styles.itemIconUnknown} />
                <span>Whether Meera is safe or delayed by local transit disruptions.</span>
              </li>
              <li className={styles.itemRow}>
                <HelpCircle size={16} className={styles.itemIconUnknown} />
                <span>Whether another family member or neighbour has already dropped off supplies.</span>
              </li>
              <li className={styles.itemRow}>
                <HelpCircle size={16} className={styles.itemIconUnknown} />
                <span>Whether Savitri Amma currently has sufficient rice, dal, and fresh vegetables.</span>
              </li>
              <li className={styles.itemRow}>
                <HelpCircle size={16} className={styles.itemIconUnknown} />
                <span>Whether any urgent medical or mobility issue requires specialist attention.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionFooter}>
          <button
            type="button"
            className={styles.primaryActionBtn}
            onClick={() => navigateTo('check_in')}
          >
            <span>Check on Savitri Amma</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className={styles.secondaryActionBtn}
            onClick={() => navigateTo('care_chain')}
          >
            <FileText size={17} />
            <span>View Care Plan</span>
          </button>

          <button
            type="button"
            className={styles.secondaryActionBtn}
            onClick={openAlternativeHelperModal}
          >
            <Users size={17} />
            <span>Ask another trusted contact</span>
          </button>
        </div>
      </div>
    </div>
  );
};
