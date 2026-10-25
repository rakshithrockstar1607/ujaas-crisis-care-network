import React, { useState } from 'react';
import {
  Heart,
  Play,
  Hand,
  Users,
  ShieldAlert,
  Shield,
  Lock,
  PhoneCall,
  ArrowRight,
  Info
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { HowItWorksModal } from './HowItWorksModal';
import { getAssetUrl } from '../../utils/assets';
import styles from './HelpNowLanding.module.css';

export const HelpNowLanding: React.FC = () => {
  const { navigateTo } = useCareContext();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleRequestHelp = () => {
    navigateTo('help_category_select');
  };

  const handleSomeoneElse = () => {
    navigateTo('help_assisted_report');
  };

  const handleSafeguarding = () => {
    navigateTo('child_safe_entry');
  };

  return (
    <div className={styles.container}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.contentGrid}>
        {/* Left Column: Editorial Headline & Intro */}
        <div className={styles.leftCol}>
          <div className={styles.eyebrow}>
            <span className={styles.dash}>—</span> IMMEDIATE SUPPORT
          </div>

          <h1 className={styles.headline}>
            Tell us what <span className={styles.highlight}>you need.</span>
          </h1>

          <p className={styles.subtext}>
            UJAAS helps people find the safest next step after a crisis. Whether it's basic
            needs, a place to stay, a check-in, or support for someone else, we'll guide
            you to the right help — with real people who care.
          </p>

          <div className={styles.prototypeNotice}>
            <Info size={16} className={styles.noticeIcon} />
            <span>
              This is an interactive prototype using fictional scenario data for demonstration purposes.
            </span>
          </div>

          {/* Action Buttons */}
          <div className={styles.ctaRow}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handleRequestHelp}
            >
              <Heart size={18} fill="currentColor" />
              <span>Request help</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setShowHowItWorks(true)}
            >
              <Play size={16} fill="currentColor" />
              <span>See how it works</span>
            </button>
          </div>

          {/* Three Feature Pillars */}
          <div className={styles.featureStrip}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <Shield size={18} />
              </div>
              <div className={styles.featureText}>
                <strong>Guided next steps</strong>
                <span>Clear, human support at every stage.</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <Users size={18} />
              </div>
              <div className={styles.featureText}>
                <strong>Community-led support</strong>
                <span>Local people and trusted networks.</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <Lock size={18} />
              </div>
              <div className={styles.featureText}>
                <strong>Sensitive cases handled separately</strong>
                <span>Extra care for children and vulnerable people.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Stage with Golden Hour Photo & Action Cards */}
        <div className={styles.rightCol}>
          <div className={styles.imageStage}>
            {/* Real Photographic Background Asset */}
            <img
              src={getAssetUrl('/images/golden-hour-caregiving.png')}
              alt="Elderly Indian man and young caregiver in a warm sunlit environment"
              className={styles.stagePhoto}
            />
            <div className={styles.photoOverlay} aria-hidden="true" />

            {/* Three Floating Action Cards */}
            <div className={styles.cardsStack}>
              {/* Card A: I need assistance */}
              <button
                type="button"
                className={`${styles.actionCard} ${styles.cardA}`}
                onClick={handleRequestHelp}
              >
                <div className={styles.iconCircleA}>
                  <Hand size={24} className={styles.cardIconA} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>I need assistance</h2>
                  <p className={styles.cardDesc}>
                    Food, medicine, transport, shelter or a check-in.
                  </p>
                </div>
                <div className={styles.arrowCircleA}>
                  <ArrowRight size={18} />
                </div>
              </button>

              {/* Card B: Someone else needs help */}
              <button
                type="button"
                className={styles.actionCard}
                onClick={handleSomeoneElse}
              >
                <div className={styles.iconCircleB}>
                  <Users size={22} className={styles.cardIconB} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Someone else needs help</h2>
                  <p className={styles.cardDesc}>
                    Request help on behalf of a family member, friend or neighbour.
                  </p>
                </div>
                <div className={styles.arrowCircleNeutral}>
                  <ArrowRight size={16} />
                </div>
              </button>

              {/* Card C: Child or vulnerable person */}
              <button
                type="button"
                className={styles.actionCard}
                onClick={handleSafeguarding}
              >
                <div className={styles.iconCircleC}>
                  <ShieldAlert size={22} className={styles.cardIconC} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>
                    A child or vulnerable person may be unsafe
                  </h2>
                  <p className={styles.cardDesc}>
                    Get the right safeguarding path and next steps.
                  </p>
                </div>
                <div className={styles.arrowCircleNeutral}>
                  <ArrowRight size={16} />
                </div>
              </button>
            </div>
          </div>

          {/* Emergency 112 Banner below */}
          <div className={styles.emergencyBanner}>
            <div className={styles.emergencyLeft}>
              <div className={styles.emergencyIconWrap}>
                <PhoneCall size={20} />
              </div>
              <div>
                <strong className={styles.emergencyTitle}>Immediate danger?</strong>
                <p className={styles.emergencyText}>
                  If someone is in immediate danger, call <strong>100</strong> (Bengaluru Police Emergency) or <strong>1098</strong> (Childline India) for urgent help. <em>(Present-day all-India emergency notice: dial 112).</em> We are not an emergency service.
                </p>
              </div>
            </div>
            <button
              type="button"
              className={styles.emergencyBtn}
              onClick={() => navigateTo('emergency_info')}
            >
              <span>See emergency guidance</span>
              <ArrowRight size={16} />
            </button>
            {/* Explainer / Resource Link */}
            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#526072',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onClick={() => navigateTo('resources')}
              >
                <span>Looking for open clinics, food kitchens, or supply points?</span>
                <span style={{ color: '#F45124', textDecoration: 'underline' }}>Browse Verified Resources →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explainer Modal */}
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
        onRequestHelp={handleRequestHelp}
      />
    </div>
  );
};
