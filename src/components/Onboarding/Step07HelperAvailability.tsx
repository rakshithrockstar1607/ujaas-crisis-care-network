import React from 'react';
import { ShoppingBag, Heart, Phone, Car, Home, Truck } from 'lucide-react';
import { HelperAvailability, TravelMode, HelperCapability } from '../../types/account';
import { getAssetUrl } from '../../utils/assets';
import styles from './Step07HelperAvailability.module.css';

interface Step07HelperAvailabilityProps {
  firstName: string;
  neighbourhood: string;
  city: string;
  avatar?: string;
  availability: HelperAvailability;
  onAvailabilityChange: (av: HelperAvailability) => void;
  radiusKm: number;
  onRadiusChange: (r: number) => void;
  travelModes: TravelMode[];
  onToggleTravelMode: (mode: TravelMode) => void;
  capabilities: HelperCapability[];
}

export const Step07HelperAvailability: React.FC<Step07HelperAvailabilityProps> = ({
  firstName,
  neighbourhood,
  city,
  avatar,
  availability,
  onAvailabilityChange,
  radiusKm,
  onRadiusChange,
  travelModes,
  onToggleTravelMode,
  capabilities
}) => {
  const capLabelMap: Record<HelperCapability, { label: string; icon: any }> = {
    groceries_essentials: { label: 'Groceries & essentials', icon: ShoppingBag },
    welfare_check_ins: { label: 'Welfare check-ins', icon: Heart },
    transport_support: { label: 'Transport support', icon: Car },
    calls_coordination: { label: 'Calls & coordination', icon: Phone },
    temporary_shelter: { label: 'Temporary shelter', icon: Home },
    logistics_help: { label: 'Logistics help', icon: Truck }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Help on your terms.</h1>
      <p className={styles.subtitle}>
        Your time, comfort, travel capacity and trust boundaries should determine your matches.
      </p>

      <div className={styles.splitContent}>
        {/* Left Controls */}
        <div className={styles.controlsSide}>
          {/* Availability Options */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.blockTitle}>When are you usually available?</h2>
            <div className={styles.availList}>
              {/* Option 1: Available now */}
              <div
                className={`${styles.availCard} ${availability === 'available_now' ? styles.cardSelected : ''}`}
                onClick={() => onAvailabilityChange('available_now')}
              >
                <div className={styles.radioDot}>
                  {availability === 'available_now' && <span className={styles.dotInner} />}
                </div>
                <div className={styles.availText}>
                  <div className={styles.availTitle}>Available now</div>
                  <div className={styles.availSub}>Open to eligible new requests.</div>
                </div>
                <span className={styles.availBadge}>● Available</span>
              </div>

              {/* Option 2: Later today or selected days */}
              <div
                className={`${styles.availCard} ${availability === 'later_or_selected_days' ? styles.cardSelected : ''}`}
                onClick={() => onAvailabilityChange('later_or_selected_days')}
              >
                <div className={styles.radioDot}>
                  {availability === 'later_or_selected_days' && <span className={styles.dotInner} />}
                </div>
                <div className={styles.availText}>
                  <div className={styles.availTitle}>Later today or selected days</div>
                  <div className={styles.availSub}>We'll show the next available window.</div>
                </div>
              </div>

              {/* Option 3: Unavailable for now */}
              <div
                className={`${styles.availCard} ${availability === 'unavailable_for_now' ? styles.cardSelected : ''}`}
                onClick={() => onAvailabilityChange('unavailable_for_now')}
              >
                <div className={styles.radioDot}>
                  {availability === 'unavailable_for_now' && <span className={styles.dotInner} />}
                </div>
                <div className={styles.availText}>
                  <div className={styles.availTitle}>Unavailable for now</div>
                  <div className={styles.availSub}>You can switch back anytime.</div>
                </div>
              </div>
            </div>
          </div>

          {/* How far can you comfortably help? */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.blockTitle}>How far can you comfortably help?</h2>
            <div className={styles.pillsRow}>
              {[1, 3, 5, 10].map(r => (
                <button
                  key={r}
                  type="button"
                  className={`${styles.pillBtn} ${radiusKm === r ? styles.pillSelected : ''}`}
                  onClick={() => onRadiusChange(r)}
                >
                  {radiusKm === r ? `✓ Within ${r} km` : `Within ${r} km`}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Mode */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.blockTitle}>Travel mode</h2>
            <div className={styles.pillsRow}>
              {[
                { id: 'walking', label: 'Walking' },
                { id: 'two_wheeler', label: 'Two-wheeler' },
                { id: 'car', label: 'Car' },
                { id: 'remote_only', label: 'Remote only' }
              ].map(t => {
                const isSelected = travelModes.includes(t.id as TravelMode);
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.pillBtn} ${isSelected ? styles.pillSelected : ''}`}
                    onClick={() => onToggleTravelMode(t.id as TravelMode)}
                  >
                    {isSelected ? `✓ ${t.label}` : t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Live Helper Profile Preview Card (Ref 07) */}
        <aside className={styles.previewCard} aria-label="Live helper preview">
          <div className={styles.previewTag}>Your helper profile</div>

          <div className={styles.avatarRow}>
            <img
              src={getAssetUrl(avatar || '/images/contacts/aarav.png')}
              alt={firstName || 'Helper'}
              className={styles.previewAvatar}
            />
            <h2 className={styles.previewName}>{firstName || 'Aarav'}</h2>
            <span className={styles.previewLocation}>
              {neighbourhood || 'Indiranagar'}, {city || 'Bengaluru'}
            </span>

            <span className={styles.liveStatusPill}>
              {availability === 'available_now'
                ? '● Available'
                : availability === 'later_or_selected_days'
                ? '◐ Scheduled'
                : '○ Busy'}
            </span>
          </div>

          <div className={styles.capsList}>
            {capabilities.slice(0, 3).map(cap => {
              const item = capLabelMap[cap];
              if (!item) return null;
              const Icon = item.icon;
              return (
                <div key={cap} className={styles.capItem}>
                  <Icon size={15} className={styles.capItemIcon} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.previewDisclaimer}>
            Capabilities are self-declared, not professional qualifications.
          </div>
        </aside>
      </div>
    </div>
  );
};
