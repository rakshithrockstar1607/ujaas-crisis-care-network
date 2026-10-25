import React from 'react';
import { X, Heart, Shield, ArrowRight } from 'lucide-react';
import styles from './HowItWorksModal.module.css';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestHelp: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onRequestHelp
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Specify your essential need',
      desc: 'Tell us what would make today easier — food rations, drinking water, medicines, safe transport, or a welfare visit.'
    },
    {
      num: '02',
      title: 'Matched with local trusted helpers',
      desc: 'Our network maps nearby verified volunteers and active community relief points within your neighbourhood radius.'
    },
    {
      num: '03',
      title: 'Helper accepts responsibility',
      desc: 'A dedicated helper like Aarav commits to your task. You receive live status updates as items are collected and dispatched.'
    },
    {
      num: '04',
      title: 'Confirmed care, closed loop',
      desc: 'Delivery is never considered complete until you, the recipient, confirm receipt. A promise kept for our community.'
    }
  ];

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="hiw-title">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>HOW UJAAS HELP NOW WORKS</span>
            <h2 id="hiw-title" className={styles.title}>
              Care that closes the loop.
            </h2>
            <p className={styles.subtitle}>
              Designed for the crisis aftermath of the Snap, where human connections restore reliability.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close explainer"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((s, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepNum}>{s.num}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.guaranteeBox}>
          <Shield size={20} className={styles.shieldIcon} />
          <div>
            <strong>Dignified and private assistance</strong>
            <p>
              Your exact address is never published publicly. Only matched, accepted helpers receive necessary handoff instructions.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.secondaryBtn} onClick={onClose}>
            Close preview
          </button>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => {
              onClose();
              onRequestHelp();
            }}
          >
            <Heart size={16} fill="currentColor" />
            <span>Request help now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
