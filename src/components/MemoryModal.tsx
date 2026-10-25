import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, HeartHandshake } from 'lucide-react';
import { MemoryCardData } from '../types';
import styles from './MemoryModal.module.css';

interface MemoryModalProps {
  card: MemoryCardData | null;
  onClose: () => void;
  onActOnIntent: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({
  card,
  onClose,
  onActOnIntent
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (card) {
      // Focus close button on open
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close memory modal"
        >
          <X size={20} strokeWidth={2.2} />
        </button>

        <div className={styles.grid}>
          {/* Photograph Side */}
          <div className={styles.imageCol}>
            <picture className={styles.picture}>
              <source srcSet={card.imageWebp} type="image/webp" />
              <img
                src={card.imageSrc}
                alt={card.alt}
                className={styles.modalImage}
              />
            </picture>
            <div className={styles.illustrativeNotice}>
              UJAAS CRISIS ARCHIVE • ILLUSTRATIVE HISTORICAL RECORD • 2018
            </div>
          </div>

          {/* Context / Editorial Copy Side */}
          <div className={styles.copyCol}>
            <div className={styles.categoryBadge}>
              <HeartHandshake size={14} className={styles.badgeIcon} />
              <span>COMMUNITY RESPONSIBILITY</span>
            </div>

            <h2 id="memory-modal-title" className={styles.modalTitle}>
              {card.title}
            </h2>

            <blockquote className={styles.quote}>
              "{card.caption}"
            </blockquote>

            <p className={styles.modalText}>{card.context}</p>

            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => {
                  onClose();
                  onActOnIntent();
                }}
              >
                <span>Show Up For Them</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </button>

              <button
                type="button"
                className={styles.returnBtn}
                onClick={onClose}
              >
                Return to Overview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
