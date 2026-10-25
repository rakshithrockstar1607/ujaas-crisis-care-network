import React from 'react';
import { Lock, ShieldCheck, ChevronDown } from 'lucide-react';
import { CommunicationPreference } from '../../types/account';
import styles from './Step03BasicIdentity.module.css';

interface Step03BasicIdentityProps {
  firstName: string;
  onFirstNameChange: (val: string) => void;
  lastName: string;
  onLastNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  commPref: CommunicationPreference;
  onCommPrefChange: (val: CommunicationPreference) => void;
}

export const Step03BasicIdentity: React.FC<Step03BasicIdentityProps> = ({
  firstName,
  onFirstNameChange,
  lastName,
  onLastNameChange,
  phone,
  onPhoneChange,
  commPref,
  onCommPrefChange
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Let's get to know you.</h1>
      <p className={styles.subtitle}>
        A few basic details help trusted people reach you.
      </p>

      {/* Form Fields Grid */}
      <div className={styles.formGrid}>
        {/* First Name */}
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First name *
          </label>
          <input
            id="firstName"
            type="text"
            className={styles.input}
            placeholder="e.g. Aarav"
            value={firstName}
            onChange={e => onFirstNameChange(e.target.value)}
            required
            autoFocus
          />
        </div>

        {/* Last Name */}
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last name (optional)
          </label>
          <input
            id="lastName"
            type="text"
            className={styles.input}
            placeholder="e.g. Sharma"
            value={lastName}
            onChange={e => onLastNameChange(e.target.value)}
          />
        </div>

        {/* Indian Mobile Number */}
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Indian mobile number *
          </label>
          <div className={styles.phoneInputWrap}>
            <span className={styles.flagBadge}>🇮🇳</span>
            <input
              id="phone"
              type="tel"
              className={styles.phoneInput}
              value={phone}
              onChange={e => onPhoneChange(e.target.value)}
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <span className={styles.fieldHint}>Used for account access and important updates.</span>
        </div>

        {/* Preferred Contact */}
        <div className={styles.formGroup}>
          <label htmlFor="preferredContact" className={styles.label}>
            Preferred contact
          </label>
          <div className={styles.selectWrap}>
            <select
              id="preferredContact"
              className={styles.select}
              value={commPref}
              onChange={e => onCommPrefChange(e.target.value as CommunicationPreference)}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS Text</option>
              <option value="phone_call">Phone call</option>
            </select>
            <ChevronDown size={16} className={styles.selectArrow} />
          </div>
          <span className={styles.fieldHint}>You can change this later.</span>
        </div>
      </div>

      {/* Privacy Notice Box */}
      <div className={styles.privacyCard}>
        <div className={styles.lockCircle}>
          <Lock size={18} />
        </div>
        <div>
          <h2 className={styles.privacyTitle}>Only ask for what is necessary.</h2>
          <p className={styles.privacyDesc}>
            No Aadhaar upload, photograph, precise GPS location or full contact-list access is needed to join.
          </p>
        </div>
      </div>

      {/* Simulated Verification Callout */}
      <div className={styles.demoNotice}>
        <ShieldCheck size={16} className={styles.shieldIcon} />
        <span>We'll demonstrate verification locally. No real SMS, call or external service will be triggered.</span>
      </div>
    </div>
  );
};
