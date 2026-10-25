import React, { useState } from 'react';
import { Search, Plus, Check, Lock, X } from 'lucide-react';
import { SAMPLE_COMMUNITY_CONTACTS } from '../../data/seedAccounts';
import styles from './Step10TrustedCircle.module.css';

interface Step10TrustedCircleProps {
  trustedIds: string[];
  onToggleContact: (id: string) => void;
  onAddManualContact: (contact: { name: string; relationship: string; location: string }) => void;
}

export const Step10TrustedCircle: React.FC<Step10TrustedCircleProps> = ({
  trustedIds,
  onToggleContact,
  onAddManualContact
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customRel, setCustomRel] = useState('');
  const [customLoc, setCustomLoc] = useState('Indiranagar');

  const filteredContacts = SAMPLE_COMMUNITY_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onAddManualContact({
      name: customName.trim(),
      relationship: customRel.trim() || 'Community member',
      location: customLoc
    });
    setCustomName('');
    setCustomRel('');
    setShowAddModal(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Start with people you know.</h1>
      <p className={styles.subtitle}>
        Invite trusted family, friends and familiar neighbours. You are always in control.
      </p>

      {/* Search & Add Bar */}
      <div className={styles.searchBarRow}>
        <div className={styles.searchInputWrap}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search fictional contacts or add someone manually"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          <span>Add someone</span>
        </button>
      </div>

      {/* 2x3 Grid of Sample Contacts */}
      <div className={styles.contactsGrid}>
        {filteredContacts.map(contact => {
          const isSelected = trustedIds.includes(contact.id);

          return (
            <div key={contact.id} className={styles.contactCard}>
              <img
                src={contact.avatar}
                alt={contact.name}
                className={styles.contactAvatar}
              />
              <div className={styles.contactMeta}>
                <h2 className={styles.contactName}>{contact.name}</h2>
                <p className={styles.contactRel}>{contact.relationship}</p>
              </div>

              <button
                type="button"
                className={`${styles.toggleBtn} ${isSelected ? styles.toggleSelected : ''}`}
                onClick={() => onToggleContact(contact.id)}
              >
                {isSelected ? (
                  <>
                    <Check size={14} strokeWidth={3} />
                    <span>Selected</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Invite</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Lock Callout Notice */}
      <div className={styles.lockNotice}>
        <Lock size={18} className={styles.lockIcon} />
        <span>
          Trusted-circle invitations require acceptance. You decide what each contact can see. Importing your whole address book is optional and disabled in this demo.
        </span>
      </div>

      {/* Add Someone Manually Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Add a trusted connection</h3>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManual}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Contact name *</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="e.g. Ramesh Uncle"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Relationship to you</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="e.g. Neighbour, Cousin"
                  value={customRel}
                  onChange={e => setCustomRel(e.target.value)}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Neighbourhood</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={customLoc}
                  onChange={e => setCustomLoc(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalCancel}
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.modalSubmit}>
                  Add to Circle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
