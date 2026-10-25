import React, { useState, useRef, useEffect } from 'react';
import { Phone, ShieldCheck, Check } from 'lucide-react';
import styles from './Step04DemoOtp.module.css';

interface Step04DemoOtpProps {
  phone: string;
  otpCode: string;
  onOtpChange: (code: string) => void;
  isVerified?: boolean;
  onVerifySuccess: () => void;
  onChangeNumber: () => void;
}

export const Step04DemoOtp: React.FC<Step04DemoOtpProps> = ({
  phone,
  otpCode,
  onOtpChange,
  onVerifySuccess,
  onChangeNumber
}) => {
  // Deterministic demo OTP code
  const DEMO_OTP = '246810';

  const [digits, setDigits] = useState<string[]>(() => {
    if (otpCode && otpCode.length === 6) {
      return otpCode.split('');
    }
    // Default to the demo code prefilled or partial
    return DEMO_OTP.split('');
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const fullCode = digits.join('');
    onOtpChange(fullCode);
    if (fullCode === DEMO_OTP) {
      onVerifySuccess();
    }
  }, [digits, onOtpChange, onVerifySuccess]);

  const handleDigitChange = (index: number, value: string) => {
    const char = value.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const next = [...digits];
    next[index] = char || '';
    setDigits(next);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const next = [...digits];
      for (let i = 0; i < 6; i++) {
        next[i] = pasted[i] || '';
      }
      setDigits(next);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleResend = () => {
    setDigits(DEMO_OTP.split(''));
  };

  const isComplete = digits.join('') === DEMO_OTP;

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>One quick verification.</h1>
      <p className={styles.subtitle}>
        In a real deployment, UJAAS would support secure sign-in and alternatives when mobile connectivity fails.
      </p>

      {/* Verification Card */}
      <div className={styles.verifyCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconCircle}>
            <Phone size={20} />
          </div>
          <div>
            <h2 className={styles.cardTitle}>Verify your mobile number</h2>
            <p className={styles.cardSub}>A demo code for {phone || '+91 98765 43210'}</p>
          </div>
        </div>

        {/* 6 Digit Inputs */}
        <div className={styles.otpGrid} onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`${styles.otpInput} ${digit ? styles.otpFilled : ''}`}
              value={digit}
              onChange={e => handleDigitChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Status Line */}
        {isComplete && (
          <div className={styles.successMessage}>
            <Check size={16} strokeWidth={3} />
            <span>Code entered · Demo verification successful</span>
          </div>
        )}

        {/* Helper Actions */}
        <div className={styles.helperActions}>
          <div className={styles.resendBlock}>
            <span>Didn't receive a code? </span>
            <button type="button" className={styles.textLink} onClick={handleResend}>
              Resend demo code
            </button>
          </div>
          <button type="button" className={styles.textLink} onClick={onChangeNumber}>
            Change number
          </button>
        </div>
      </div>

      {/* Volunteer Distinction Disclaimer */}
      <div className={styles.disclaimerBox}>
        <div className={styles.shieldWrap}>
          <ShieldCheck size={18} />
        </div>
        <div>
          <h3 className={styles.disclaimerTitle}>A verified number is not a verified volunteer.</h3>
          <p className={styles.disclaimerText}>
            Volunteer skills, trusted-circle relationships and specialist authorisation are separate checks.
          </p>
        </div>
      </div>
    </div>
  );
};
