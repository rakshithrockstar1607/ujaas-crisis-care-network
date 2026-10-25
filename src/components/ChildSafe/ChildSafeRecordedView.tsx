import React from 'react';
import {
  FileCheck,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './ChildSafeRecordedView.module.css';

export const ChildSafeRecordedView: React.FC = () => {
  const { childSafeCase, navigateTo, toggleCoordinatorDemoMode } = useCareContext();

  const caseId = childSafeCase?.id || 'UJAAS-CS-2018-001';

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        <div className={styles.card}>
          {/* Header Row */}
          <div className={styles.iconRow}>
            <div className={styles.iconWrap}>
              <FileCheck size={28} />
            </div>
            <div className={styles.statusPill}>
              <span className={styles.dot} />
              <span>Recorded in Demo · Restricted Boundary</span>
            </div>
          </div>

          <div>
            <h1 className={styles.title}>Your concern has been recorded.</h1>
            <p className={styles.subtitle}>
              The details have been saved in this interactive demonstration. If the child needs
              immediate help, contact the appropriate emergency or child-protection service
              directly.
            </p>
          </div>

          {/* Fictional Case Summary Box */}
          <div className={styles.detailsBox}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Case Reference ID</span>
              <span className={`${styles.detailValue} ${styles.caseRefBadge}`}>{caseId}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Concern Category</span>
              <span className={styles.detailValue}>
                {childSafeCase?.concernType === 'child_unattended'
                  ? 'Child without an available caregiver'
                  : 'Vulnerable person concern'}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Approximate Area</span>
              <span className={styles.detailValue}>
                {childSafeCase?.approximateArea || 'Indiranagar, Bengaluru'}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Simulation Record Date</span>
              <span className={styles.detailValue}>
                {childSafeCase?.createdAt || 'April 24, 2018, 14:30 IST'}
              </span>
            </div>
          </div>

          {/* Emergency Advisory Strip */}
          <div className={styles.emergencyStrip}>
            <PhoneCall size={20} className={styles.stripIcon} />
            <div>
              <strong>Immediate Safety Advisory:</strong>
              <br />
              If you or the child are in immediate danger, please do not wait for online case review. Contact <strong>1098</strong> (Childline India 24/7) or <strong>100</strong> (Bengaluru Police Emergency, 2018) immediately. <em>(Present-day all-India emergency notice: dial 112).</em>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className={styles.btnGrid}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => navigateTo('child_safe_status')}
            >
              <span>View demo case status (Reporter view)</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => navigateTo('emergency_info')}
            >
              <span>Emergency contact guidance</span>
              <ExternalLink size={16} />
            </button>
          </div>

          {/* Coordinator Switcher Banner (Evaluator Simulation Control) */}
          <div className={styles.coordinatorBox}>
            <div className={styles.coordMeta}>
              <span className={styles.coordTitle}>Coordinator Demo Simulation</span>
              <span className={styles.coordDesc}>
                Experience how a designated UJAAS specialist reviews referrals and documents safe handoffs.
              </span>
            </div>
            <button
              type="button"
              className={styles.coordBtn}
              onClick={() => toggleCoordinatorDemoMode(true)}
            >
              <UserCheck size={16} />
              <span>Enter coordinator demo mode →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
