import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  Navigation,
  AlertTriangle,
  Clock,
  Users,
  Home,
  ArrowRight
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './ContactDetailDrawer.module.css';

export const ContactDetailDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    closeContactDrawer,
    selectedContact,
    navigateTo
  } = useCareContext();

  const [activeTab, setActiveTab] = useState<'overview' | 'needs' | 'contacts' | 'location'>('overview');

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeContactDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeContactDrawer]);

  if (!selectedContact) return null;

  const isSavitri = selectedContact.id === 'savitri';

  const handleReviewConcern = () => {
    closeContactDrawer();
    navigateTo('care_concern');
  };

  const handleViewCareChain = () => {
    closeContactDrawer();
    navigateTo('care_chain');
  };

  return (
    <>
      {/* Dimmed Backdrop */}
      <div
        className={`${styles.backdrop} ${isDrawerOpen ? styles.backdropOpen : ''}`}
        onClick={closeContactDrawer}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <aside
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Contact profile for ${selectedContact.name}`}
      >
        {/* Top Close Button */}
        <div className={styles.topCloseRow}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeContactDrawer}
            aria-label="Close contact drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.contentBody}>
          {/* Header Section: Square Photo + Info + Actions */}
          <div className={styles.profileHeader}>
            <img
              src={selectedContact.avatar}
              alt={selectedContact.name}
              className={styles.squarePortrait}
            />

            <div className={styles.headerTextCol}>
              {selectedContact.concernStatus === 'needs_review' ? (
                <div className={styles.statusPillAlert}>
                  <span>●</span>
                  <span>Needs review</span>
                </div>
              ) : (
                <div className={styles.statusPillSafe}>
                  <span>●</span>
                  <span>Safe &amp; Connected</span>
                </div>
              )}

              <h2 className={styles.nameHeading}>{selectedContact.name}</h2>
              <div className={styles.relationshipText}>
                {selectedContact.relationship} {selectedContact.age ? `· ${selectedContact.age} years` : ''}
              </div>
              <div className={styles.locationText}>{selectedContact.location}</div>

              {/* Quick Actions Row: Call, Message, Directions */}
              <div className={styles.quickActionsRow}>
                <button
                  type="button"
                  className={styles.actionIconBtn}
                  onClick={() => alert(`Calling ${selectedContact.name} (+91 98450 •••••)...`)}
                  title={`Call ${selectedContact.name}`}
                >
                  <div className={styles.iconCircle}>
                    <Phone size={16} />
                  </div>
                  <span className={styles.actionLabel}>Call</span>
                </button>

                <button
                  type="button"
                  className={styles.actionIconBtn}
                  onClick={() => alert(`Opening secure SMS / radio dispatch for ${selectedContact.name}...`)}
                  title={`Message ${selectedContact.name}`}
                >
                  <div className={styles.iconCircle}>
                    <MessageSquare size={16} />
                  </div>
                  <span className={styles.actionLabel}>Message</span>
                </button>

                <button
                  type="button"
                  className={styles.actionIconBtn}
                  onClick={() => alert(`Location: ${selectedContact.location}. Coordinates pinned in Indiranagar.`)}
                  title="Get directions"
                >
                  <div className={styles.iconCircle}>
                    <Navigation size={16} />
                  </div>
                  <span className={styles.actionLabel}>Get directions</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={styles.tabsBar} role="tablist">
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('overview')}
              role="tab"
              aria-selected={activeTab === 'overview'}
            >
              Overview
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'needs' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('needs')}
              role="tab"
              aria-selected={activeTab === 'needs'}
            >
              Care Needs
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'contacts' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('contacts')}
              role="tab"
              aria-selected={activeTab === 'contacts'}
            >
              Contacts
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'location' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('location')}
              role="tab"
              aria-selected={activeTab === 'location'}
            >
              Location
            </button>
          </div>

          {/* Tab Content: Overview */}
          {activeTab === 'overview' && (
            <>
              {/* Possible care gap alert card */}
              {isSavitri && selectedContact.concernStatus === 'needs_review' && (
                <div className={styles.alertCard} role="alert">
                  <div className={styles.alertIconWrap}>
                    <AlertTriangle size={16} />
                  </div>
                  <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>Possible care gap</div>
                    <div className={styles.alertText}>
                      Meera hasn't been in touch since the Snap. Aarav is a trusted contact and can help check on Savitri Amma.
                    </div>
                  </div>
                </div>
              )}

              {/* 3 Key metadata cards */}
              <div className={styles.metaCardsRow}>
                <div className={styles.metaCard}>
                  <div className={styles.metaCardIconRow}>
                    <Clock size={15} />
                    <span className={styles.metaCardLabel}>Last confirmed safe</span>
                  </div>
                  <span className={styles.metaCardValue}>Day 0 (2018)</span>
                </div>

                <div className={styles.metaCard}>
                  <div className={styles.metaCardIconRow}>
                    <Users size={15} />
                    <span className={styles.metaCardLabel}>Primary caregiver</span>
                  </div>
                  <span className={styles.metaCardValue}>
                    {selectedContact.usualCaregiver || 'Family member'}
                  </span>
                </div>

                <div className={styles.metaCard}>
                  <div className={styles.metaCardIconRow}>
                    <Home size={15} />
                    <span className={styles.metaCardLabel}>Lives in</span>
                  </div>
                  <span className={styles.metaCardValue}>{selectedContact.location}</span>
                </div>
              </div>

              {/* About Section */}
              <div className={styles.aboutBox}>
                <div className={styles.aboutTitle}>About</div>
                <p className={styles.aboutText}>
                  {selectedContact.notes ||
                    `${selectedContact.name} is a member of your trusted circle living in ${selectedContact.location}.`}
                </p>
              </div>
            </>
          )}

          {activeTab === 'needs' && (
            <div className={styles.aboutBox}>
              <div className={styles.aboutTitle}>Known Care Needs</div>
              <p className={styles.aboutText}>
                Requires assistance with weekly fresh ration delivery, hypertensive medication refills, and escorted hospital transit.
              </p>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className={styles.aboutBox}>
              <div className={styles.aboutTitle}>Circle Connections</div>
              <p className={styles.aboutText}>
                Connected to Aarav (Grandson), Meera (Daughter), Vikram (Neighbour), and Priya (Cousin).
              </p>
            </div>
          )}

          {activeTab === 'location' && (
            <div className={styles.aboutBox}>
              <div className={styles.aboutTitle}>Neighborhood Context</div>
              <p className={styles.aboutText}>
                Indiranagar 12th Main, close to CMH Road and 100 Feet Road corridor. Local pharmacy within 600m.
              </p>
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className={styles.footerButtons}>
            {isSavitri && selectedContact.concernStatus === 'needs_review' && (
              <button
                type="button"
                className={styles.reviewConcernBtn}
                onClick={handleReviewConcern}
              >
                <span>Review concern</span>
                <ArrowRight size={17} />
              </button>
            )}

            <button
              type="button"
              className={styles.viewCareChainBtn}
              onClick={handleViewCareChain}
            >
              <span>View care chain</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};