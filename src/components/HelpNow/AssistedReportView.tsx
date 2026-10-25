import React, { useState } from 'react';
import {
  Users,
  ShoppingBag,
  Phone,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { HelpCategory } from '../../types/helpNow';
import styles from './AssistedReportView.module.css';

export const AssistedReportView: React.FC = () => {
  const {
    contacts,
    createAssistanceRequest,
    startChildSafeReport,
    navigateTo,
    goBack
  } = useCareContext();

  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [relationship, setRelationship] = useState('Neighbour');
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [category, setCategory] = useState<HelpCategory>('food_water');
  const [isReachable, setIsReachable] = useState(true);
  const [notes, setNotes] = useState('');

  // Circle members available to pick
  const circleList = Object.values(contacts).filter(c => !c.isUser);

  const handleSelectCircleMember = (contactId: string) => {
    setSelectedContactId(contactId);
    const member = contacts[contactId];
    if (member) {
      setCustomName(member.name);
      setRelationship(member.relationship.split('·')[0].trim());
      setLocation(member.location || `${member.neighborhood}, Bengaluru`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If Savitri Amma is selected, we can navigate directly to her Care Chain
    if (selectedContactId === 'savitri') {
      navigateTo('care_chain');
      return;
    }

    const recipientName = selectedContactId && contacts[selectedContactId]
      ? contacts[selectedContactId].name
      : customName || 'Community Member';

    createAssistanceRequest({
      isSelfRecipient: false,
      recipientName,
      recipientRelationship: relationship,
      category,
      generalLocation: location,
      notes: notes || `Request submitted on behalf of ${recipientName}. Contact preference verified.`,
      canReceiveDelivery: true
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— ASSISTED SUPPORT</div>
          <h1 className={styles.title}>
            Someone else <span className={styles.highlight}>needs help.</span>
          </h1>
          <p className={styles.subtitle}>
            Request assistance on behalf of a family member, neighbour, or isolated individual.
            You can select a connection from your trusted circle or enter their details.
          </p>
        </div>

        {/* Child Safe Routing Banner */}
        <div style={{
          backgroundColor: '#FFF9F1',
          border: '1.5px solid #F45124',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛡️</span>
            <span style={{ fontSize: '0.88rem', color: '#102744' }}>
              <strong>Reporting a child without a caregiver?</strong> Unattended children must not be submitted as volunteer tasks.
            </span>
          </div>
          <button
            type="button"
            style={{
              backgroundColor: '#F45124',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={() => {
              startChildSafeReport();
              navigateTo('child_safe_entry');
            }}
          >
            Go to Child Safe Protocol →
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.formCard}>
          {/* Section 1: Choose from circle or custom */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Users size={20} className={styles.secIcon} />
              <div>
                <h2 className={styles.sectionTitle}>1. Who needs assistance?</h2>
                <span className={styles.sectionSub}>
                  Select someone from your circle or enter someone new.
                </span>
              </div>
            </div>

            {circleList.length > 0 && (
              <div className={styles.circleGrid}>
                {circleList.map(c => {
                  const isPicked = selectedContactId === c.id;
                  return (
                    <div
                      key={c.id}
                      className={`${styles.contactPill} ${isPicked ? styles.contactPillActive : ''}`}
                      onClick={() => handleSelectCircleMember(c.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={c.avatar} alt={c.name} className={styles.pillAvatar} />
                      <div className={styles.pillInfo}>
                        <strong>{c.name}</strong>
                        <span>{c.relationship}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={styles.orDivider}>
              <span>OR ENTER DIRECTLY</span>
            </div>

            <div className={styles.fieldGrid2}>
              <div className={styles.inputGroup}>
                <label>Person's name *</label>
                <input
                  type="text"
                  value={customName}
                  onChange={e => {
                    setCustomName(e.target.value);
                    setSelectedContactId(null);
                  }}
                  placeholder="e.g. Sunita Devi"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Your relationship *</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={e => setRelationship(e.target.value)}
                  placeholder="e.g. Neighbour, Niece, Family Friend"
                  required
                />
              </div>
            </div>
          </div>

          {/* Special Savitri Amma Callout if selected */}
          {selectedContactId === 'savitri' && (
            <div className={styles.savitriCallout}>
              <Info size={18} />
              <div>
                <strong>Savitri Amma already has an established Care Chain!</strong>
                <p>
                  Her ongoing care coordination and grocery task are active. Continuing will connect
                  directly to her existing Care Chain without creating duplicate competing tasks.
                </p>
              </div>
            </div>
          )}

          {/* Section 2: Need & Location */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <ShoppingBag size={20} className={styles.secIcon} />
              <div>
                <h2 className={styles.sectionTitle}>2. What type of support is needed?</h2>
              </div>
            </div>

            <div className={styles.categoryPillsRow}>
              <button
                type="button"
                className={category === 'food_water' ? styles.catPillActive : styles.catPill}
                onClick={() => setCategory('food_water')}
              >
                Food rations &amp; drinking water
              </button>
              <button
                type="button"
                className={category === 'medication_access' ? styles.catPillActive : styles.catPill}
                onClick={() => setCategory('medication_access')}
              >
                Medications &amp; Pharmacy
              </button>
              <button
                type="button"
                className={category === 'check_in' ? styles.catPillActive : styles.catPill}
                onClick={() => setCategory('check_in')}
              >
                Welfare visit / Check-in
              </button>
              <button
                type="button"
                className={category === 'transport' ? styles.catPillActive : styles.catPill}
                onClick={() => setCategory('transport')}
              >
                Emergency transit
              </button>
            </div>

            <div className={styles.inputGroup}>
              <label>General neighbourhood or area *</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Indiranagar, Domlur, Koramangala"
                required
              />
            </div>
          </div>

          {/* Section 3: Contactability & Consent */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Phone size={20} className={styles.secIcon} />
              <div>
                <h2 className={styles.sectionTitle}>3. Contact &amp; Consent</h2>
              </div>
            </div>

            <div className={styles.toggleRow}>
              <span>Can the recipient be reached directly via phone or WhatsApp?</span>
              <div className={styles.btnGroup}>
                <button
                  type="button"
                  className={isReachable ? styles.btnActive : styles.btn}
                  onClick={() => setIsReachable(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={!isReachable ? styles.btnActive : styles.btn}
                  onClick={() => setIsReachable(false)}
                >
                  No (Unreachable)
                </button>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Additional coordination notes (optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any special access instructions, elderly mobility constraints, or building landmarks..."
                rows={3}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className={styles.formFooter}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => goBack()}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button type="submit" className={styles.submitBtn}>
              <span>
                {selectedContactId === 'savitri'
                  ? 'Connect to Savitri Amma’s Care Chain'
                  : 'Review assisted request'}
              </span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
