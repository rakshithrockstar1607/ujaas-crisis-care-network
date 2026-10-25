import React from 'react';
import { RotateCcw, UserCheck } from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './DemoBanner.module.css';

export const DemoBanner: React.FC = () => {
  const { resetDemo } = useCareContext();

  return (
    <aside className={styles.banner} aria-label="Simulated prototype disclaimer">
      <div className={styles.leftGroup}>
        <span className={styles.badge}>
          <span className={styles.pulseDot} aria-hidden="true" />
          Interactive Prototype
        </span>
        <span className={styles.contextText}>
          Simulated scenario data • <strong className={styles.strongText}>Day 1 after the Snap, 2018</strong>
        </span>
      </div>

      <div className={styles.rightGroup}>
        <div className={styles.userPill}>
          <UserCheck size={13} aria-hidden="true" />
          <span>Signed in as <strong>Aarav</strong> (Grandson / Volunteer)</span>
        </div>

        <button
          type="button"
          onClick={resetDemo}
          className={styles.resetBtn}
          title="Reset simulated scenario data to initial state"
          aria-label="Reset prototype to initial state"
        >
          <RotateCcw size={13} aria-hidden="true" />
          <span>Reset Demo</span>
        </button>
      </div>
    </aside>
  );
};
