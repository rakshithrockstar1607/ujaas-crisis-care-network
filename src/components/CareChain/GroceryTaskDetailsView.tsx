import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, Users } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './GroceryTaskDetailsView.module.css';

export const GroceryTaskDetailsView: React.FC = () => {
  const {
    tasks,
    contacts,
    openCommitmentModal,
    navigateTo
  } = useCareContext();

  const task = tasks['task-groceries'];
  const savitri = contacts.savitri;

  const [items, setItems] = useState(task?.items || []);

  const handleToggleItem = (itemId: string) => {
    setItems(prev =>
      prev.map(it => (it.id === itemId ? { ...it, checked: !it.checked } : it))
    );
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>
        {/* Navigation Breadcrumb */}
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigateTo('care_chain')}
          aria-label="Back to Care Chain"
        >
          <ArrowLeft size={16} />
          <span>Back to Care Chain</span>
        </button>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrow}>RESPONSIBILITY OVERVIEW</span>
          </div>
          <h1 className={styles.headline}>Grocery Delivery</h1>
          <p className={styles.subheadline}>
            Savitri Amma needs support with essential groceries and fresh rations.
          </p>
        </div>

        {/* Task Metadata Cards */}
        <div className={styles.metadataCard}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Recipient</span>
            <span className={styles.metaValue}>{savitri?.name || 'Savitri Amma'} (Age {savitri?.age || 78})</span>
            <span className={styles.metaSub}>Grandmother • Lives independently</span>
          </div>

          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Delivery Window</span>
            <span className={styles.metaValue}>{task?.dueWindow || 'Within 1–2 days'}</span>
            <span className={styles.metaSub}>Preferred: Afternoon (1:00 PM – 4:00 PM)</span>
          </div>

          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Drop-off Location</span>
            <span className={styles.metaValue}>Indiranagar 12th Main, Bengaluru</span>
            <span className={styles.metaSub}>Full building & flat address unlocked upon task commitment</span>
          </div>

          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Coordination Status</span>
            <span className={styles.metaValue}>Confirmed Need • Unassigned</span>
            <span className={styles.metaSub}>Verified via direct check-in call</span>
          </div>
        </div>

        {/* Shopping List Card */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Requested Grocery Items</h2>
            <span className={styles.itemsCountBadge}>{items.length} items verified</span>
          </div>

          <ul className={styles.itemsList}>
            {items.map((it) => (
              <li key={it.id} className={styles.itemRow}>
                <label className={styles.itemLeft}>
                  <input
                    type="checkbox"
                    checked={it.checked}
                    onChange={() => handleToggleItem(it.id)}
                    className={styles.itemCheckbox}
                  />
                  <span className={styles.itemName}>{it.name}</span>
                </label>
                <span className={styles.itemQuantity}>{it.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recipient Preference Note */}
        <div className={styles.noteCard} role="note">
          <span className={styles.noteTitle}>Recipient Note from Savitri Amma</span>
          <p className={styles.noteText}>
            "{task?.note || 'Please call before coming. I prefer groceries to be delivered in the afternoon.'}"
          </p>
        </div>

        {/* Action Footer */}
        <div className={styles.actionFooter}>
          <button
            type="button"
            className={styles.primaryCta}
            onClick={openCommitmentModal}
          >
            <ShoppingBag size={19} />
            <span>I'll Take This Responsibility</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className={styles.secondaryCta}
            onClick={() => navigateTo('find_helper')}
          >
            <Users size={17} />
            <span>Find Someone in My Circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
