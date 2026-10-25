import React, { useState } from 'react';
import {
  Baby,
  User,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import styles from './SafeguardingView.module.css';

export const SafeguardingView: React.FC = () => {
  const { startChildSafeReport, navigateTo, goBack } = useCareContext();

  const [concernType, setConcernType] = useState<
    'infant_child' | 'vulnerable_adult' | 'immediate_danger'
  >('infant_child');
  const [approximateLocation] = useState(
    'Indiranagar 1st Stage, near CMH Road'
  );
  const [factualObservations] = useState(
    'A young child was observed alone near 100ft Road Bus Stop with no adult caregiver present.'
  );

  const handleRouteToChildSafe = () => {
    startChildSafeReport({
      factualObservations,
      approximateArea: approximateLocation
    });
    navigateTo('child_safe_entry');
  };

  const handleRouteToAdultCare = () => {
    navigateTo('help_assisted_report');
  };

  const handleRouteToEmergency = () => {
    navigateTo('emergency_info');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— SENSITIVE CONCERN ROUTING</div>
          <h1 className={styles.title}>
            Safeguarded <span className={styles.highlight}>Care Pathway</span>
          </h1>
          <p className={styles.subtitle}>
            UJAAS enforces strict non-negotiable safeguarding boundaries. To protect vulnerable individuals, sensitive reports are not treated as open volunteer tasks.
          </p>
        </div>

        {/* Child Safe Core Callout Card */}
        <div style={{
          backgroundColor: '#FFF9F1',
          border: '2px solid #F45124',
          borderRadius: '16px',
          padding: '24px 28px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: '#F45124',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#102744', margin: 0 }}>
                A Child Is Not a Volunteer-Matching Task
              </h2>
              <span style={{ fontSize: '0.86rem', color: '#B34A00', fontWeight: 600 }}>
                Phase 05 Statutory Child Safe Architecture Active
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: '#526072', lineHeight: 1.5, margin: 0 }}>
            Reports concerning unattended children, separated minors, or child welfare are routed exclusively through our restricted Child Safe pathway with verified Child Welfare Committee (CWC) referral protocols and strict confidentiality.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#F45124',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 20px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
              onClick={handleRouteToChildSafe}
            >
              <span>Continue to Child Safe Pathway</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFFFFF',
                color: '#102744',
                border: '1.5px solid #DDD8CE',
                borderRadius: '8px',
                padding: '12px 20px',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
              onClick={handleRouteToAdultCare}
            >
              <HeartHandshake size={16} />
              <span>Vulnerable Older Adult Support</span>
            </button>
          </div>
        </div>

        {/* 2-Column Pathway Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Option A: Child Safe */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: concernType === 'infant_child' ? '2px solid #F45124' : '1px solid #DDD8CE',
              borderRadius: '14px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            onClick={() => {
              setConcernType('infant_child');
              handleRouteToChildSafe();
            }}
            role="button"
            tabIndex={0}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#FFF9F1',
                color: '#F45124',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Baby size={22} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F45124', backgroundColor: 'rgba(244, 81, 36, 0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                STATUTORY SAFEGUARD
              </span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#102744', margin: 0 }}>
              Child without an available caregiver
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#526072', lineHeight: 1.45, margin: 0 }}>
              An unattended child, separated minor, or infant needing immediate statutory care and safe shelter handoff under CWC oversight.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#F45124', fontWeight: 700, fontSize: '0.88rem' }}>
              <span>Enter Child Safe</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Option B: Vulnerable Older Adult */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: concernType === 'vulnerable_adult' ? '2px solid #102744' : '1px solid #DDD8CE',
              borderRadius: '14px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            onClick={() => {
              setConcernType('vulnerable_adult');
              handleRouteToAdultCare();
            }}
            role="button"
            tabIndex={0}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#FAF7F0',
                color: '#102744',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User size={22} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#102744', backgroundColor: '#E2E8F0', padding: '3px 8px', borderRadius: '4px' }}>
                COMMUNITY CARE
              </span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#102744', margin: 0 }}>
              Vulnerable older adult
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#526072', lineHeight: 1.45, margin: 0 }}>
              An isolated elder living alone who needs groceries, medication pickup, or an urgent in-person welfare check-in.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#102744', fontWeight: 700, fontSize: '0.88rem' }}>
              <span>Enter Assisted Support</span>
              <ArrowRight size={15} />
            </div>
          </div>
        </div>

        {/* Emergency Callout */}
        <div style={{
          backgroundColor: '#FFF1F2',
          border: '1.5px solid #FECDD3',
          borderRadius: '12px',
          padding: '16px 20px',
          marginTop: '24px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start'
        }}>
          <PhoneCall size={22} color="#E11D48" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.86rem', color: '#4C0519', lineHeight: 1.45 }}>
            <strong style={{ display: 'block', marginBottom: '2px' }}>
              If anyone is in immediate physical danger, call official emergency services directly:
            </strong>
            <span>
              • <strong>100</strong> — Bengaluru Police Emergency (April 2018)
              <br />
              • <strong>1098</strong> — Childline India (24/7 child protection helpline)
              <br />
              • <em>(Present-day all-India emergency notice: dial 112)</em>
            </span>
            <div style={{ marginTop: '6px' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#E11D48',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline'
                }}
                onClick={handleRouteToEmergency}
              >
                View detailed emergency contact guidance →
              </button>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <div style={{ marginTop: '24px' }}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => goBack()}
          >
            <ArrowLeft size={16} />
            <span>Return to Help Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
