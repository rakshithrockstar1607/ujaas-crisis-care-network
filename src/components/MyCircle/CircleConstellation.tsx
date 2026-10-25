import React, { useState } from 'react';
import { AlertCircle, Check, HelpCircle } from 'lucide-react';
import { Contact } from '../../types/care';
import { useCareContext } from '../../context/CareContext';
import styles from './CircleConstellation.module.css';

interface CircleConstellationProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export const CircleConstellation: React.FC<CircleConstellationProps> = ({
  contacts,
  onSelectContact
}) => {
  const { selectedContact } = useCareContext();
  const [hoveredContactId, setHoveredContactId] = useState<string | null>(null);

  // Center user is Aarav
  const centerContact = contacts.find(c => c.isUser) || contacts[1];
  const surroundingContacts = contacts.filter(c => !c.isUser);

  const centerCoord = centerContact ? centerContact.coordinates : { xPct: 50, yPct: 52 };

  return (
    <div
      className={styles.constellationRoot}
      role="region"
      aria-label="My Circle Relationship Constellation"
    >
      {/* Visual Radial Glow */}
      <div className={styles.centerGlow} aria-hidden="true" />

      {/* SVG Connecting Guides and Lines */}
      <svg className={styles.linesSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {/* Orbital concentric guide circles */}
        <circle cx={centerCoord.xPct} cy={centerCoord.yPct} r="22" fill="none" stroke="#DDD8CE" strokeWidth="0.3" strokeDasharray="1 2" />
        <circle cx={centerCoord.xPct} cy={centerCoord.yPct} r="35" fill="none" stroke="#DDD8CE" strokeWidth="0.3" strokeDasharray="1.5 2.5" />

        {/* Lines from center user (Aarav) to surrounding contacts */}
        {surroundingContacts.map((contact) => {
          const isSavitri = contact.id === 'savitri';
          const isHovered = hoveredContactId === contact.id;
          const isSelected = selectedContact?.id === contact.id;

          let lineClass = styles.lineNormal;
          if (isHovered || isSelected) {
            lineClass = styles.lineActive;
          } else if (isSavitri && contact.concernStatus === 'needs_review') {
            lineClass = styles.lineAttention;
          }

          return (
            <line
              key={`line-${contact.id}`}
              x1={`${centerCoord.xPct}%`}
              y1={`${centerCoord.yPct}%`}
              x2={`${contact.coordinates.xPct}%`}
              y2={`${contact.coordinates.yPct}%`}
              className={lineClass}
            />
          );
        })}
      </svg>

      {/* Center User Node (Aarav) */}
      {centerContact && (
        <button
          type="button"
          className={styles.nodeWrapper}
          style={{ left: `${centerCoord.xPct}%`, top: `${centerCoord.yPct}%` }}
          onClick={() => onSelectContact(centerContact)}
          onMouseEnter={() => setHoveredContactId(centerContact.id)}
          onMouseLeave={() => setHoveredContactId(null)}
          aria-label={`${centerContact.name}, ${centerContact.relationship}. Location: ${centerContact.location}`}
        >
          {hoveredContactId === centerContact.id && (
            <div className={styles.nodeTooltip}>
              Coordinator • Grandson
            </div>
          )}
          <div className={`${styles.avatarRing} ${styles.userRing}`}>
            <img
              src={centerContact.avatar}
              alt=""
              width={76}
              height={76}
              className={styles.avatarImg}
            />
          </div>
          <div className={styles.nodeLabelGroup}>
            <span className={styles.nodeName}>{centerContact.name}</span>
            <span className={styles.nodeRelationship}>{centerContact.relationship}</span>
          </div>
        </button>
      )}

      {/* Surrounding Contact Nodes */}
      {surroundingContacts.map((contact) => {
        const isSavitri = contact.id === 'savitri';
        const isHovered = hoveredContactId === contact.id;
        const avatarSize = isSavitri ? 72 : 56;

        let ringModifier = '';
        if (isSavitri && contact.concernStatus === 'needs_review') {
          ringModifier = styles.attentionRing;
        } else if (isSavitri && contact.concernStatus === 'partially_resolved') {
          ringModifier = styles.partiallyResolvedRing;
        }

        return (
          <button
            key={contact.id}
            type="button"
            className={styles.nodeWrapper}
            style={{ left: `${contact.coordinates.xPct}%`, top: `${contact.coordinates.yPct}%` }}
            onClick={() => onSelectContact(contact)}
            onMouseEnter={() => setHoveredContactId(contact.id)}
            onMouseLeave={() => setHoveredContactId(null)}
            aria-label={`${contact.name}, ${contact.relationship}. Status: ${
              isSavitri && contact.concernStatus === 'needs_review'
                ? 'Needs review. Possible care interruption.'
                : isSavitri && contact.concernStatus === 'partially_resolved'
                ? 'Groceries complete. 2 responsibilities remain.'
                : 'No reported concern.'
            }`}
          >
            {isHovered && (
              <div className={styles.nodeTooltip}>
                {contact.location} • Click to open details
              </div>
            )}

            <div className={`${styles.avatarRing} ${ringModifier}`}>
              <img
                src={contact.avatar}
                alt=""
                width={avatarSize}
                height={avatarSize}
                className={styles.avatarImg}
              />

              {/* Status Badge */}
              {isSavitri && contact.concernStatus === 'needs_review' && (
                <span className={`${styles.badgeIcon} ${styles.badgeAlert}`} title="Possible care gap - Needs review">
                  <AlertCircle size={13} strokeWidth={2.8} />
                </span>
              )}

              {isSavitri && contact.concernStatus === 'partially_resolved' && (
                <span className={`${styles.badgeIcon} ${styles.badgeCheck}`} title="Groceries completed - Remaining care open">
                  <Check size={13} strokeWidth={2.8} />
                </span>
              )}

              {contact.checkInStatus === 'unconfirmed' && !isSavitri && (
                <span className={`${styles.badgeIcon} ${styles.badgeUnconfirmed}`} title="Check-in pending">
                  <HelpCircle size={13} strokeWidth={2.8} />
                </span>
              )}
            </div>

            <div className={styles.nodeLabelGroup}>
              <span className={styles.nodeName}>{contact.name}</span>
              <span className={styles.nodeRelationship}>{contact.relationship}</span>

              {isSavitri && contact.concernStatus === 'needs_review' && (
                <span className={`${styles.statusPill} ${styles.statusReview}`}>
                  Needs review
                </span>
              )}

              {isSavitri && contact.concernStatus === 'partially_resolved' && (
                <span className={`${styles.statusPill} ${styles.statusPartial}`}>
                  Groceries done • 2 remain
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
