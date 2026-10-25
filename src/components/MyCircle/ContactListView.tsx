import React from 'react';
import { AlertCircle, Check, ChevronRight, HelpCircle } from 'lucide-react';
import { Contact } from '../../types/care';
import styles from './ContactListView.module.css';

interface ContactListViewProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export const ContactListView: React.FC<ContactListViewProps> = ({
  contacts,
  onSelectContact
}) => {
  if (contacts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No contacts matched your search query.</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer} role="list" aria-label="Contact list">
      {contacts.map((contact) => {
        const isSavitri = contact.id === 'savitri';
        const isAttention = isSavitri && contact.concernStatus === 'needs_review';
        const isPartial = isSavitri && contact.concernStatus === 'partially_resolved';

        return (
          <button
            key={contact.id}
            type="button"
            className={`${styles.contactCard} ${isAttention ? styles.attentionCard : ''}`}
            onClick={() => onSelectContact(contact)}
            aria-label={`View details for ${contact.name}, ${contact.relationship}`}
          >
            <div className={styles.leftGroup}>
              <div className={styles.avatarWrapper}>
                <img
                  src={contact.avatar}
                  alt=""
                  width={52}
                  height={52}
                  className={styles.avatar}
                />
              </div>

              <div className={styles.infoGroup}>
                <div className={styles.nameRow}>
                  <span className={styles.contactName}>{contact.name}</span>
                  <span className={styles.relationshipBadge}>{contact.relationship}</span>
                </div>
                <span className={styles.locationText}>{contact.location}</span>
              </div>
            </div>

            <div className={styles.rightGroup}>
              {isAttention && (
                <span className={`${styles.statusPill} ${styles.statusAttention}`}>
                  <AlertCircle size={14} />
                  Needs review
                </span>
              )}

              {isPartial && (
                <span className={`${styles.statusPill} ${styles.statusPartial}`}>
                  <Check size={14} />
                  Groceries done • 2 remain
                </span>
              )}

              {!isAttention && !isPartial && contact.checkInStatus === 'unconfirmed' && (
                <span className={`${styles.statusPill} ${styles.statusOk}`}>
                  <HelpCircle size={14} />
                  Check-in unconfirmed
                </span>
              )}

              {!isAttention && !isPartial && contact.checkInStatus !== 'unconfirmed' && (
                <span className={`${styles.statusPill} ${styles.statusOk}`}>
                  No reported concern
                </span>
              )}

              <ChevronRight size={18} className={styles.arrowIcon} />
            </div>
          </button>
        );
      })}
    </div>
  );
};
