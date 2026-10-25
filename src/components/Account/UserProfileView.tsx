import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  MapPin,
  Heart,
  Users,
  Eye,
  ShoppingBag,
  Phone,
  Car,
  Home,
  Truck,
  Sparkles
} from 'lucide-react';
import { useAccountContext } from '../../context/AccountContext';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import {
  OnboardingIntent,
  LanguageCode,
  CommunicationPreference,
  HelperAvailability,
  HelperCapability,
  TravelMode
} from '../../types/account';
import {
  BENGALURU_NEIGHBOURHOODS,
  INDIAN_CITIES,
  SUPPORTED_LANGUAGES
} from '../../data/seedAccounts';
import styles from './UserProfileView.module.css';

export const UserProfileView: React.FC = () => {
  const { activeUser, updateAccount, isAarav } = useAccountContext();
  const { navigateTo } = useCareContext();

  // Local form state initialized from activeUser
  const [firstName, setFirstName] = useState(activeUser?.firstName || 'Aarav');
  const [lastName, setLastName] = useState(activeUser?.lastName || '');
  const [phone, setPhone] = useState(activeUser?.phone || '+91 98765 43210');
  const [email, setEmail] = useState(activeUser?.email || '');
  const [city, setCity] = useState(activeUser?.city || 'Bengaluru');
  const [neighbourhood, setNeighbourhood] = useState(activeUser?.neighbourhood || 'Indiranagar');
  const [language, setLanguage] = useState<LanguageCode>(activeUser?.preferredLanguage || 'en');
  const [commPref, setCommPref] = useState<CommunicationPreference>(
    activeUser?.communicationPreference || 'whatsapp'
  );
  const [intents, setIntents] = useState<OnboardingIntent[]>(
    activeUser?.participationIntents || ['want_to_help']
  );
  const [availability, setAvailability] = useState<HelperAvailability>(
    activeUser?.helperAvailability || 'available_now'
  );
  const [radiusKm, setRadiusKm] = useState<number>(activeUser?.preferredRadiusKm || 3);
  const [travelModes, setTravelModes] = useState<TravelMode[]>(
    activeUser?.travelModes || ['two_wheeler', 'walking']
  );
  const [capabilities, setCapabilities] = useState<HelperCapability[]>(
    activeUser?.helperCapabilities || ['groceries_essentials', 'welfare_check_ins']
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleIntent = (intent: OnboardingIntent) => {
    if (intents.includes(intent)) {
      if (intents.length > 1) {
        setIntents(intents.filter(i => i !== intent));
      }
    } else {
      setIntents([...intents, intent]);
    }
  };

  const toggleCapability = (cap: HelperCapability) => {
    if (capabilities.includes(cap)) {
      setCapabilities(capabilities.filter(c => c !== cap));
    } else {
      setCapabilities([...capabilities, cap]);
    }
  };

  const toggleTravelMode = (mode: TravelMode) => {
    if (travelModes.includes(mode)) {
      if (travelModes.length > 1) {
        setTravelModes(travelModes.filter(m => m !== mode));
      }
    } else {
      setTravelModes([...travelModes, mode]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAccount({
      firstName,
      lastName,
      phone,
      email,
      city,
      neighbourhood,
      preferredLanguage: language,
      communicationPreference: commPref,
      participationIntents: intents,
      primaryIntent: intents[0] || 'want_to_help',
      helperAvailability: availability,
      preferredRadiusKm: radiusKm,
      travelModes,
      helperCapabilities: capabilities
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Navigation row */}
        <div className={styles.navRow}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigateTo('my_circle')}
          >
            <ArrowLeft size={16} />
            <span>Back to My Circle</span>
          </button>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span>Profile settings live · Updates local state</span>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className={styles.profileHeaderCard}>
          <div className={styles.headerLeft}>
            <img
              src={getAssetUrl(activeUser?.avatar || '/images/contacts/aarav.png')}
              alt={firstName}
              className={styles.largeAvatar}
            />
            <div className={styles.headerMeta}>
              <div className={styles.titleRow}>
                <h1 className={styles.profileName}>
                  {firstName} {lastName}
                </h1>
                {isAarav ? (
                  <span className={styles.seededPill}>Seeded Demo Account</span>
                ) : (
                  <span className={styles.customPill}>Custom User Profile</span>
                )}
              </div>
              <div className={styles.locationRow}>
                <MapPin size={15} className={styles.pinIcon} />
                <span>{neighbourhood}, {city}</span>
                <span className={styles.dotSeparator}>•</span>
                <ShieldCheck size={15} className={styles.verifiedIcon} />
                <span>Simulated Demo Contact Verified</span>
              </div>
              <div className={styles.intentChips}>
                {intents.map(i => (
                  <span key={i} className={styles.intentChip}>
                    {i === 'want_to_help' ? '🤝 Can Help' : i === 'need_help' ? '❤️ Needs Support' : '👁️ Concern Reporter'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Success Notice */}
        {savedSuccess && (
          <div className={styles.saveAlert} role="status">
            <Check size={18} />
            <span>Profile and availability changes saved! My Circle map reflects your updated status.</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className={styles.formLayout}>
          {/* Section 1: Personal Details */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>1. Personal Information</h2>
            <p className={styles.sectionSub}>Fictional details used for community coordination.</p>

            <div className={styles.fieldGrid2}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>First name *</label>
                <input
                  id="firstName"
                  type="text"
                  className={styles.input}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>Last name</label>
                <input
                  id="lastName"
                  type="text"
                  className={styles.input}
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Contact number (simulated)</label>
                <input
                  id="phone"
                  type="text"
                  className={styles.input}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email address (optional)</label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Participation Intentions */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>2. Participation Intentions</h2>
            <p className={styles.sectionSub}>One person can both offer help and seek support over time.</p>

            <div className={styles.intentGrid}>
              <div
                className={`${styles.intentCard} ${intents.includes('want_to_help') ? styles.intentSelected : ''}`}
                onClick={() => toggleIntent('want_to_help')}
              >
                <div className={styles.intentCheck}>
                  {intents.includes('want_to_help') && <Check size={14} strokeWidth={3} />}
                </div>
                <Users size={20} className={styles.intentIcon} />
                <div>
                  <div className={styles.intentTitle}>I want to help</div>
                  <div className={styles.intentDesc}>Support family, friends, or local neighbours with errands.</div>
                </div>
              </div>

              <div
                className={`${styles.intentCard} ${intents.includes('need_help') ? styles.intentSelected : ''}`}
                onClick={() => toggleIntent('need_help')}
              >
                <div className={styles.intentCheck}>
                  {intents.includes('need_help') && <Check size={14} strokeWidth={3} />}
                </div>
                <Heart size={20} className={styles.intentIcon} />
                <div>
                  <div className={styles.intentTitle}>I need help</div>
                  <div className={styles.intentDesc}>Request essential groceries, check-ins, or transport support.</div>
                </div>
              </div>

              <div
                className={`${styles.intentCard} ${intents.includes('concerned_about_someone') ? styles.intentSelected : ''}`}
                onClick={() => toggleIntent('concerned_about_someone')}
              >
                <div className={styles.intentCheck}>
                  {intents.includes('concerned_about_someone') && <Check size={14} strokeWidth={3} />}
                </div>
                <Eye size={20} className={styles.intentIcon} />
                <div>
                  <div className={styles.intentTitle}>I'm concerned about someone</div>
                  <div className={styles.intentDesc}>Flag an overdue caregiver check-in or potential care gap.</div>
                </div>
              </div>
            </div>

            {intents.includes('need_help') && (
              <div
                style={{
                  marginTop: '1.25rem',
                  backgroundColor: '#FFF2ED',
                  border: '1.5px solid #FCD4C5',
                  borderRadius: '1rem',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: '#102744', marginBottom: '0.2rem' }}>
                    Need immediate community assistance?
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#526072' }}>
                    Create an immediate grocery, medical or transit request in the Help Now portal.
                  </span>
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#F45124',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '0.65rem',
                    padding: '0.65rem 1.15rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => navigateTo('help_now_landing')}
                >
                  <span>Open Help Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* Child Safe Safeguarded Reporting Link */}
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem 1.25rem',
                backgroundColor: '#FAF7F0',
                borderRadius: '0.75rem',
                border: '1px solid #DDD8CE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: '#102744', marginBottom: '0.2rem' }}>
                  Child Protection & Safeguarded Concerns
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#526072' }}>
                  Report an unaccompanied child or vulnerable person with restricted specialist coordination.
                </span>
              </div>
              <button
                type="button"
                style={{
                  backgroundColor: '#102744',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '0.65rem',
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => navigateTo('child_safe_entry')}
              >
                <span>Child Safe Portal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </section>

          {/* Section 3: Neighbourhood & Language */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>3. Location & Language Preferences</h2>
            <div className={styles.fieldGrid2}>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>City</label>
                <select
                  id="city"
                  className={styles.select}
                  value={city}
                  onChange={e => setCity(e.target.value)}
                >
                  {INDIAN_CITIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.state})</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="neighbourhood" className={styles.label}>Locality / Neighbourhood</label>
                <select
                  id="neighbourhood"
                  className={styles.select}
                  value={neighbourhood}
                  onChange={e => setNeighbourhood(e.target.value)}
                >
                  {BENGALURU_NEIGHBOURHOODS.map(n => (
                    <option key={n.id} value={n.name}>{n.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="language" className={styles.label}>Preferred language</label>
                <select
                  id="language"
                  className={styles.select}
                  value={language}
                  onChange={e => setLanguage(e.target.value as LanguageCode)}
                >
                  {SUPPORTED_LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.native} — {l.sub}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="commPref" className={styles.label}>Preferred contact method</label>
                <select
                  id="commPref"
                  className={styles.select}
                  value={commPref}
                  onChange={e => setCommPref(e.target.value as CommunicationPreference)}
                >
                  <option value="whatsapp">WhatsApp (only when permitted)</option>
                  <option value="sms">SMS text updates</option>
                  <option value="phone_call">Phone call</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 4: Helper Availability & Distance */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>4. Helper Availability & Mobility</h2>
            <p className={styles.sectionSub}>Controls how you appear on the My Circle Care Map and in helper searches.</p>

            <div className={styles.formGroup}>
              <label className={styles.label}>Current volunteer availability</label>
              <div className={styles.radioGrid3}>
                <button
                  type="button"
                  className={`${styles.choiceBtn} ${availability === 'available_now' ? styles.choiceBtnActive : ''}`}
                  onClick={() => setAvailability('available_now')}
                >
                  <span className={styles.dotGreen} />
                  <span>Available now</span>
                </button>
                <button
                  type="button"
                  className={`${styles.choiceBtn} ${availability === 'later_or_selected_days' ? styles.choiceBtnActive : ''}`}
                  onClick={() => setAvailability('later_or_selected_days')}
                >
                  <span className={styles.dotAmber} />
                  <span>Later / Selected days</span>
                </button>
                <button
                  type="button"
                  className={`${styles.choiceBtn} ${availability === 'unavailable_for_now' ? styles.choiceBtnActive : ''}`}
                  onClick={() => setAvailability('unavailable_for_now')}
                >
                  <span className={styles.dotRed} />
                  <span>Unavailable for now</span>
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Preferred operating distance</label>
              <div className={styles.radiusRow}>
                {[1, 3, 5, 10].map(r => (
                  <button
                    key={r}
                    type="button"
                    className={`${styles.pillBtn} ${radiusKm === r ? styles.pillBtnActive : ''}`}
                    onClick={() => setRadiusKm(r)}
                  >
                    Within {r} km
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Travel modes</label>
              <div className={styles.travelGrid}>
                {[
                  { id: 'walking', label: 'Walking' },
                  { id: 'two_wheeler', label: 'Two-wheeler' },
                  { id: 'car', label: 'Car' },
                  { id: 'remote_only', label: 'Remote coordination only' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.pillBtn} ${travelModes.includes(t.id as TravelMode) ? styles.pillBtnActive : ''}`}
                    onClick={() => toggleTravelMode(t.id as TravelMode)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Helper capabilities</label>
              <div className={styles.capabilitiesGrid}>
                {[
                  { id: 'groceries_essentials', label: 'Groceries & essentials', icon: ShoppingBag },
                  { id: 'welfare_check_ins', label: 'Welfare check-ins', icon: Heart },
                  { id: 'transport_support', label: 'Transport support', icon: Car },
                  { id: 'calls_coordination', label: 'Calls & coordination', icon: Phone },
                  { id: 'temporary_shelter', label: 'Temporary shelter', icon: Home },
                  { id: 'logistics_help', label: 'Logistics help', icon: Truck }
                ].map(c => {
                  const Icon = c.icon;
                  const isSelected = capabilities.includes(c.id as HelperCapability);
                  return (
                    <div
                      key={c.id}
                      className={`${styles.capabilityCard} ${isSelected ? styles.capSelected : ''}`}
                      onClick={() => toggleCapability(c.id as HelperCapability)}
                    >
                      <div className={styles.capIconWrap}>
                        <Icon size={18} />
                      </div>
                      <span className={styles.capLabel}>{c.label}</span>
                      <div className={styles.capCheck}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Save Bar */}
          <div className={styles.saveBar}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigateTo('my_circle')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
            >
              <Sparkles size={16} />
              <span>Save changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
