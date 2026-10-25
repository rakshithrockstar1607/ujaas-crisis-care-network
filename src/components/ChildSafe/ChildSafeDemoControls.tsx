import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, ArrowRight, UserCheck, Eye, X } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './ChildSafeDemoControls.module.css';

export const ChildSafeDemoControls: React.FC = () => {
  const {
    currentView,
    navigateTo,
    toggleCoordinatorDemoMode,
    resetChildSafeScenario
  } = useCareContext();

  const [isOpen, setIsOpen] = useState(false);

  // Show only when in Child Safe or Help Now contexts
  const isChildSafeContext =
    currentView.startsWith('child_safe_') ||
    currentView === 'help_safeguard_concern' ||
    currentView === 'help_now_landing';

  if (!isChildSafeContext) return null;

  return (
    <div className={styles.toolbarWrap}>
      {!isOpen ? (
        <button
          type="button"
          className={styles.triggerBtn}
          onClick={() => setIsOpen(true)}
          aria-label="Open Child Safe Demo Controls"
        >
          <ShieldCheck size={16} />
          <span>Child Safe Scenario</span>
          <span className={styles.pillBadge}>DEMO</span>
        </button>
      ) : (
        <div className={styles.popover}>
          <div className={styles.popoverHeader}>
            <div className={styles.popoverTitle}>
              <ShieldCheck size={16} color="#F45124" />
              <span>Explore Child Safe</span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          <p className={styles.popoverDesc}>
            Quickly jump between canonical fictional scenario stages for evaluation:
          </p>

          <div className={styles.actionsList}>
            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                navigateTo('child_safe_entry');
                setIsOpen(false);
              }}
            >
              <span>1. Start as reporter (Aarav)</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                navigateTo('child_safe_observation');
                setIsOpen(false);
              }}
            >
              <span>2. Observation Form</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                navigateTo('child_safe_review');
                setIsOpen(false);
              }}
            >
              <span>3. Review Concern</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                toggleCoordinatorDemoMode(true);
                setIsOpen(false);
              }}
            >
              <span>4. Coordinator Simulation</span>
              <UserCheck size={13} />
            </button>

            <button
              type="button"
              className={styles.actionItem}
              onClick={() => {
                navigateTo('child_safe_status');
                setIsOpen(false);
              }}
            >
              <span>5. Reporter Case Status</span>
              <Eye size={13} />
            </button>

            <button
              type="button"
              className={`${styles.actionItem} ${styles.actionItemReset}`}
              onClick={() => {
                resetChildSafeScenario();
                setIsOpen(false);
              }}
            >
              <span>Reset Child Safe Scenario</span>
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
