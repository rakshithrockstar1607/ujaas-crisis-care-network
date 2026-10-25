import React from 'react';
import { Globe, MessageSquare, PhoneCall, Check, Info } from 'lucide-react';
import { LanguageCode, CommunicationPreference } from '../../types/account';
import { SUPPORTED_LANGUAGES } from '../../data/seedAccounts';
import styles from './Step02LanguageComms.module.css';

interface Step02LanguageCommsProps {
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  communicationPreference: CommunicationPreference;
  onSelectCommPref: (pref: CommunicationPreference) => void;
}

export const Step02LanguageComms: React.FC<Step02LanguageCommsProps> = ({
  language,
  onSelectLanguage,
  communicationPreference,
  onSelectCommPref
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Choose your language.</h1>
      <p className={styles.subtitle}>
        UJAAS should feel familiar and welcoming from the very first screen.
      </p>

      {/* 2x2 Language Grid */}
      <div className={styles.langGrid} role="radiogroup" aria-label="Select preferred language">
        {SUPPORTED_LANGUAGES.map(l => {
          const isSelected = language === l.code;
          return (
            <div
              key={l.code}
              className={`${styles.langCard} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => onSelectLanguage(l.code as LanguageCode)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onSelectLanguage(l.code as LanguageCode);
              }}
            >
              <div className={styles.iconCircle}>
                <Globe size={20} />
              </div>
              <div className={styles.langText}>
                <span className={styles.langNative}>{l.native}</span>
                <span className={styles.langSub}>{l.sub}</span>
              </div>
              <div className={styles.checkIndicator}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Communication Preferences Section */}
      <div className={styles.commSection}>
        <h2 className={styles.sectionTitle}>How would you like us to contact you?</h2>

        <div className={styles.commGrid} role="radiogroup" aria-label="Communication preference">
          {/* WhatsApp */}
          <div
            className={`${styles.commCard} ${communicationPreference === 'whatsapp' ? styles.cardSelected : ''}`}
            onClick={() => onSelectCommPref('whatsapp')}
            role="radio"
            aria-checked={communicationPreference === 'whatsapp'}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectCommPref('whatsapp');
            }}
          >
            <div className={styles.iconCircle}>
              <MessageSquare size={18} />
            </div>
            <div className={styles.commText}>
              <span className={styles.commTitle}>WhatsApp</span>
              <span className={styles.commSub}>Only when you permit it</span>
            </div>
            <div className={styles.checkIndicator}>
              {communicationPreference === 'whatsapp' && <Check size={14} strokeWidth={3} />}
            </div>
          </div>

          {/* SMS */}
          <div
            className={`${styles.commCard} ${communicationPreference === 'sms' ? styles.cardSelected : ''}`}
            onClick={() => onSelectCommPref('sms')}
            role="radio"
            aria-checked={communicationPreference === 'sms'}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectCommPref('sms');
            }}
          >
            <div className={styles.iconCircle}>
              <MessageSquare size={18} />
            </div>
            <div className={styles.commText}>
              <span className={styles.commTitle}>SMS</span>
              <span className={styles.commSub}>Simple text updates</span>
            </div>
            <div className={styles.checkIndicator}>
              {communicationPreference === 'sms' && <Check size={14} strokeWidth={3} />}
            </div>
          </div>

          {/* Phone call */}
          <div
            className={`${styles.commCard} ${communicationPreference === 'phone_call' ? styles.cardSelected : ''}`}
            onClick={() => onSelectCommPref('phone_call')}
            role="radio"
            aria-checked={communicationPreference === 'phone_call'}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectCommPref('phone_call');
            }}
          >
            <div className={styles.iconCircle}>
              <PhoneCall size={18} />
            </div>
            <div className={styles.commText}>
              <span className={styles.commTitle}>Phone call</span>
              <span className={styles.commSub}>For users who prefer to talk</span>
            </div>
            <div className={styles.checkIndicator}>
              {communicationPreference === 'phone_call' && <Check size={14} strokeWidth={3} />}
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice Box */}
      <div className={styles.infoBox}>
        <Info size={16} className={styles.infoIcon} />
        <span>Language can be changed at any time. More Indian languages can be added as the service expands.</span>
      </div>
    </div>
  );
};
