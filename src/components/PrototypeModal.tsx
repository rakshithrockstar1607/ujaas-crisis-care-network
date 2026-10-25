import React, { useEffect, useRef } from 'react';
import { X, Construction, ArrowRight } from 'lucide-react';
import styles from './PrototypeModal.module.css';

interface PrototypeModalProps {
  item: { label: string; description: string } | null;
  onClose: () => void;
  onSelectAction?: (action: 'need-help' | 'can-help') => void;
}

export const PrototypeModal: React.FC<PrototypeModalProps> = ({
  item,
  onClose,
  onSelectAction
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (item) {
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
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proto-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal}>
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className={styles.iconWrap}>
          <Construction size={28} className={styles.icon} />
        </div>

        <div className={styles.badge}>PHASE 01 IMPLEMENTATION SCOPE</div>

        <h3 id="proto-modal-title" className={styles.title}>
          {item.label}
        </h3>

        <p className={styles.description}>{item.description}</p>

        <p className={styles.metaNote}>
          This section will be released in Phase 02 of the UJAAS initiative. For this initial phase, explore the Signature Hero Experience, 2D Parallax, and the interactive Cursor Memory Trail.
        </p>

        <div className={styles.actions}>
          {onSelectAction && (
            <button
              type="button"
              className={styles.ctaBtn}
              onClick={() => {
                onClose();
                onSelectAction('need-help');
              }}
            >
              <span>Explore Help Flow</span>
              <ArrowRight size={15} />
            </button>
          )}

          <button
            type="button"
            className={styles.closeActionBtn}
            onClick={onClose}
          >
            Back to Hero
          </button>
        </div>
      </div>
    </div>
  );
};
