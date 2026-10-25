import React from 'react';
import { ShoppingBag, Heart, Car, Phone, Home, Truck, Check, ShieldCheck, Users } from 'lucide-react';
import { HelperCapability } from '../../types/account';
import styles from './Step06HelperCapabilities.module.css';

interface Step06HelperCapabilitiesProps {
  capabilities: HelperCapability[];
  onToggleCapability: (cap: HelperCapability) => void;
}

export const Step06HelperCapabilities: React.FC<Step06HelperCapabilitiesProps> = ({
  capabilities,
  onToggleCapability
}) => {
  const capabilityItems: { id: HelperCapability; title: string; desc: string; icon: any }[] = [
    {
      id: 'groceries_essentials',
      title: 'Groceries & essentials',
      desc: 'Food, water and daily supplies.',
      icon: ShoppingBag
    },
    {
      id: 'welfare_check_ins',
      title: 'Welfare check-ins',
      desc: 'Calls and familiar-person visits.',
      icon: Heart
    },
    {
      id: 'transport_support',
      title: 'Transport support',
      desc: 'Local travel or accompanied journeys.',
      icon: Car
    },
    {
      id: 'calls_coordination',
      title: 'Calls & coordination',
      desc: 'Organise helpers from anywhere.',
      icon: Phone
    },
    {
      id: 'temporary_shelter',
      title: 'Temporary shelter',
      desc: 'Only when appropriate and authorised.',
      icon: Home
    },
    {
      id: 'logistics_help',
      title: 'Logistics help',
      desc: 'Moving essential items and supplies.',
      icon: Truck
    }
  ];

  return (
    <div className={styles.container}>
      {/* Selected Intention Bar */}
      <div className={styles.intentBar}>
        <div className={styles.intentLeft}>
          <Users size={16} className={styles.intentIcon} />
          <span>Selected intention: <strong>I want to help</strong></span>
        </div>
        <span className={styles.intentHint}>You can also request help later.</span>
      </div>

      <h1 className={styles.headline}>What could you help with?</h1>
      <p className={styles.subtitle}>
        Choose as many as you like. Your capabilities are yours to update.
      </p>

      {/* 2x3 Grid of Capabilities */}
      <div className={styles.capsGrid} role="group" aria-label="Volunteer capabilities">
        {capabilityItems.map(item => {
          const Icon = item.icon;
          const isSelected = capabilities.includes(item.id);

          return (
            <div
              key={item.id}
              className={`${styles.capCard} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => onToggleCapability(item.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onToggleCapability(item.id);
              }}
            >
              <div className={styles.iconCircle}>
                <Icon size={20} />
              </div>
              <div className={styles.capText}>
                <h2 className={styles.capTitle}>{item.title}</h2>
                <p className={styles.capDesc}>{item.desc}</p>
              </div>
              <div className={styles.checkIndicator}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice Box */}
      <div className={styles.safetyBox}>
        <ShieldCheck size={18} className={styles.shieldIcon} />
        <div>
          <h3 className={styles.safetyTitle}>Choose only activities you're comfortable performing.</h3>
          <p className={styles.safetyDesc}>
            Medical, clinical and child-protection activities require separate authorised procedures.
          </p>
        </div>
      </div>
    </div>
  );
};
