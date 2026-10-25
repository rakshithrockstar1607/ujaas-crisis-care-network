import React, { useState } from 'react';
import { Phone, Users, AlertTriangle, ShieldCheck, ArrowLeft, ArrowUpRight, X, Info } from 'lucide-react';
import styles from './EmergencyView.module.css';

interface EmergencyViewProps {
  onBack: () => void;
  isModal?: boolean;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({ onBack, isModal = false }) => {
  const [expandedSection, setExpandedSection] = useState<'1098' | 'local_emergency' | null>(null);

  return (
    <div className={isModal ? styles.modalWrapper : styles.pageWrapper}>
      <div className={styles.container}>
        {/* Top bar with back button */}
        <div className={styles.topBar}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={onBack}
            aria-label="Back to previous screen"
          >
            {isModal ? <X size={20} /> : <ArrowLeft size={18} />}
            <span>{isModal ? 'Close' : 'Return to UJAAS'}</span>
          </button>
          <div className={styles.metaBadge}>
            <ShieldCheck size={14} />
            <span>Public Civic Information · No Account Required</span>
          </div>
        </div>

        {/* Editorial Heading */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>UJAAS · CRISIS EMERGENCY ACCESS (BENGALURU 2018)</div>
          <h1 className={styles.headline}>Safety comes before sign-up.</h1>
          <p className={styles.subtitle}>
            Immediate emergency guidance remains accessible to everyone, with no registration barrier.
          </p>
        </div>

        {/* Urgent Warning Banner */}
        <div className={styles.alertBanner} role="alert">
          <div className={styles.alertIconWrap}>
            <AlertTriangle size={24} className={styles.alertIcon} />
          </div>
          <div className={styles.alertContent}>
            <h2 className={styles.alertTitle}>Need immediate emergency assistance?</h2>
            <p className={styles.alertText}>
              If a person's safety or life is at imminent risk, contact official emergency services directly on your telephone. UJAAS is an interactive community care prototype and does not replace official emergency responders.
            </p>
          </div>
        </div>

        {/* Primary Emergency Cards Grid (April 2018 Bengaluru Scenario) */}
        <div className={styles.cardsGrid}>
          {/* Card 1: 1098 - Childline India */}
          <div className={`${styles.serviceCard} ${expandedSection === '1098' ? styles.cardActive : ''}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconCircle}>
                <Users size={22} className={styles.serviceIcon} />
              </div>
              <span className={styles.serviceTag}>CHILD PROTECTION HELPLINE</span>
            </div>

            <div className={styles.numberDisplay}>1098</div>

            <p className={styles.serviceDescription}>
              A 24-hour, free, emergency telephone and outreach service across India for children in need of care, safety, and protection.
            </p>

            <button
              type="button"
              className={styles.detailBtn}
              onClick={() => setExpandedSection(expandedSection === '1098' ? null : '1098')}
            >
              <span>{expandedSection === '1098' ? 'Hide details' : 'View child-safety guidance'}</span>
              <ArrowUpRight size={16} />
            </button>

            {expandedSection === '1098' && (
              <div className={styles.expandedInfo}>
                <div className={styles.infoRow}>
                  <strong>Childline India:</strong> Dedicated to unattended children, family separation, abandonment, abuse, medical crisis, or distress.
                </div>
                <div className={styles.infoRow}>
                  <strong>Post-Snap Care Protocol:</strong> In this 2018 crisis scenario, Childline coordinates with local Child Welfare Committees (CWC) and district protection units for unaccompanied minors.
                </div>
                <div className={styles.infoRow}>
                  <strong>Toll-Free & Confidential:</strong> Accessible 24/7 without cost from any mobile or landline across Bengaluru.
                </div>
              </div>
            )}
          </div>

          {/* Card 2: 100 / 108 - Bengaluru Local Emergency Contacts (2018) */}
          <div className={`${styles.serviceCard} ${expandedSection === 'local_emergency' ? styles.cardActive : ''}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconCircle}>
                <Phone size={22} className={styles.serviceIcon} />
              </div>
              <span className={styles.serviceTag}>BENGALURU EMERGENCY (2018)</span>
            </div>

            <div className={styles.numberDisplay}>100 / 108</div>

            <p className={styles.serviceDescription}>
              Direct emergency services operational across Bengaluru in April 2018 for law enforcement and medical trauma response.
            </p>

            <button
              type="button"
              className={styles.detailBtn}
              onClick={() => setExpandedSection(expandedSection === 'local_emergency' ? null : 'local_emergency')}
            >
              <span>{expandedSection === 'local_emergency' ? 'Hide details' : 'View emergency contacts'}</span>
              <ArrowUpRight size={16} />
            </button>

            {expandedSection === 'local_emergency' && (
              <div className={styles.expandedInfo}>
                <div className={styles.infoRow}>
                  <strong>Police Emergency (100):</strong> Bengaluru City Police Control Room for immediate physical safety, law enforcement, and active rescue.
                </div>
                <div className={styles.infoRow}>
                  <strong>Medical Ambulance (108 / 102):</strong> Karnataka GVK EMRI Arogya Kavacha for urgent medical evacuation, trauma care, and hospitalization.
                </div>
                <div className={styles.infoRow}>
                  <strong>Fire & Rescue (101):</strong> Karnataka State Fire and Emergency Services for structural collapse, fire, and hazardous rescue.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Present-Day Emergency Advisory Card */}
        <div style={{
          backgroundColor: '#F8FAFC',
          border: '1.5px solid #CBD5E1',
          borderRadius: '8px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <Info size={20} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.86rem', color: '#334155', lineHeight: '1.45' }}>
            <strong style={{ color: '#0F172A', display: 'block', marginBottom: '2px' }}>
              Present-Day Emergency Notice (Outside Fictional Simulation)
            </strong>
            If you are viewing this today outside the April 2018 post-Snap crisis simulation and require real-world emergency assistance anywhere in India, dial <strong>112</strong> directly (the pan-India Unified Emergency Response Support System - ERSS) or <strong>1098</strong> for Childline India.
          </div>
        </div>

        {/* Prototype Disclosure Notice */}
        <div className={styles.disclosureCard}>
          <div className={styles.disclosureIcon}>ℹ️</div>
          <div className={styles.disclosureText}>
            <strong>This is an interactive civic prototype, not a government service.</strong>
            <p>
              UJAAS is a fictional civic-care prototype designed for post-Snap community mutual aid. It does not have live government dispatch integration or official statutory emergency authority. For genuine emergencies, contact public helplines directly on your phone.
            </p>
          </div>
        </div>

        {/* Bottom Action */}
        <div className={styles.bottomBar}>
          <button
            type="button"
            className={styles.returnBtn}
            onClick={onBack}
          >
            ← Return to UJAAS Care Network
          </button>
        </div>
      </div>
    </div>
  );
};
