import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  User,
  ShoppingBag,
  Clock,
  Truck,
  Phone,
  FileText,
  MapPin,
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
  Edit2
} from 'lucide-react';
import { useCareContext } from '../../context/CareContext';
import { useAccountContext } from '../../context/AccountContext';
import { HelpUrgency, HelpContactMethod } from '../../types/helpNow';
import { getAssetUrl } from '../../utils/assets';
import styles from './HelpRequestForm.module.css';

export const HelpRequestForm: React.FC = () => {
  const {
    activeAssistanceRequest,
    updateAssistanceRequest,
    navigateTo,
    goBack
  } = useCareContext();
  const { activeUser } = useAccountContext();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Form states initialized with canonical Nisha request or active user
  const [isSelf, setIsSelf] = useState(
    activeAssistanceRequest ? activeAssistanceRequest.isSelfRecipient : true
  );
  const [recipientName, setRecipientName] = useState(
    activeAssistanceRequest?.recipientName ||
      (activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Nisha Rao')
  );
  const [recipientRelationship, setRecipientRelationship] = useState(
    activeAssistanceRequest?.recipientRelationship || 'Self'
  );

  const defaultItems = activeAssistanceRequest?.selectedItems || [
    'Rice',
    'Dal',
    'Vegetables',
    'Drinking water'
  ];
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultItems);

  const [urgency, setUrgency] = useState<HelpUrgency>(
    activeAssistanceRequest?.urgency || 'today'
  );
  const [canReceiveDelivery, setCanReceiveDelivery] = useState(
    activeAssistanceRequest ? activeAssistanceRequest.canReceiveDelivery : true
  );
  const [contactPreference, setContactPreference] = useState<HelpContactMethod>(
    activeAssistanceRequest?.contactPreference || 'whatsapp'
  );
  const [notes, setNotes] = useState(
    activeAssistanceRequest?.notes ||
      "We are a family of 3. Need basic groceries and drinking water. Our building doesn't have a lift, please call on WhatsApp before delivery."
  );

  // Items checklist definition
  const itemOptions = [
    { id: 'Rice', label: 'Rice', icon: '🍚' },
    { id: 'Dal', label: 'Dal', icon: '🍲' },
    { id: 'Vegetables', label: 'Vegetables', icon: '🥕' },
    { id: 'Milk', label: 'Milk', icon: '🥛' },
    { id: 'Drinking water', label: 'Drinking water', icon: '💧' },
    { id: 'Baby supplies', label: 'Baby supplies', icon: '🍼' },
    { id: 'Medicines', label: 'Medicines', icon: '💊' }
  ];

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        if (prev.length === 1) return prev;
        return prev.filter(i => i !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Mini Map effect for Indiranagar location
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const lat = 12.9716;
    const lng = 77.6412;

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    const pinIcon = L.divIcon({
      className: 'custom-leaflet-pin',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #F45124;
          border: 2.5px solid #FFFFFF;
          box-shadow: 0 4px 12px rgba(244, 81, 36, 0.45);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    L.marker([lat, lng], { icon: pinIcon }).addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleReview = () => {
    const requestId = activeAssistanceRequest?.id || 'req-nisha-food-01';
    updateAssistanceRequest(requestId, {
      isSelfRecipient: isSelf,
      recipientName: isSelf
        ? activeUser
          ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim()
          : 'Nisha Rao'
        : recipientName,
      recipientRelationship: isSelf ? 'Self' : recipientRelationship,
      selectedItems,
      urgency,
      canReceiveDelivery,
      contactPreference,
      notes
    });
    navigateTo('help_request_review');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Stepper Progress Tracker */}
        <div className={styles.stepperWrap}>
          <div className={styles.stepItemDone}>
            <span className={styles.stepBadgeDone}>
              <Check size={12} strokeWidth={3} />
            </span>
            <span>Need</span>
          </div>
          <div className={styles.stepDividerDone} />
          <div className={styles.stepItemActive}>
            <span className={styles.stepBadgeActive}>2</span>
            <span>Details</span>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.stepItemPending}>
            <span className={styles.stepBadgePending}>3</span>
            <span>Review</span>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.stepItemPending}>
            <span className={styles.stepBadgePending}>4</span>
            <span>Track</span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— HELP NOW</div>
          <h1 className={styles.title}>
            Food &amp; <span className={styles.highlight}>essentials</span>
          </h1>
          <p className={styles.subtitle}>
            Tell us a little more so we can find the right help.
          </p>
        </div>

        <div className={styles.layoutGrid}>
          {/* Left Column: Structured Form */}
          <div className={styles.formCol}>
            {/* Section A: Who is this request for? */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <User size={18} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Who is this request for?</h2>
                </div>
              </div>

              <div className={styles.radioGrid2}>
                <div
                  className={`${styles.radioCard} ${isSelf ? styles.radioCardSelected : ''}`}
                  onClick={() => setIsSelf(true)}
                  role="radio"
                  aria-checked={isSelf}
                  tabIndex={0}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${isSelf ? styles.radioCircleActive : ''}`}>
                      {isSelf && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>Myself</strong>
                      <span>I need these items</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.radioCard} ${!isSelf ? styles.radioCardSelected : ''}`}
                  onClick={() => setIsSelf(false)}
                  role="radio"
                  aria-checked={!isSelf}
                  tabIndex={0}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${!isSelf ? styles.radioCircleActive : ''}`}>
                      {!isSelf && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>Someone else</strong>
                      <span>A family member, friend or neighbour</span>
                    </div>
                  </div>
                </div>
              </div>

              {!isSelf && (
                <div className={styles.assistedRecipientBox}>
                  <div className={styles.inputGroup}>
                    <label>Recipient's name *</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      placeholder="e.g. Ramesh Uncle"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Your relationship *</label>
                    <input
                      type="text"
                      value={recipientRelationship}
                      onChange={e => setRecipientRelationship(e.target.value)}
                      placeholder="e.g. Neighbour, Niece"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section B: What do you need? */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>What do you need?</h2>
                  <span className={styles.sectionSubtitle}>Select all that apply.</span>
                </div>
              </div>

              <div className={styles.itemsGrid}>
                {itemOptions.map(item => {
                  const isChecked = selectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`${styles.itemCard} ${isChecked ? styles.itemCardSelected : ''}`}
                      onClick={() => toggleItem(item.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                    >
                      <div className={`${styles.itemCheckbox} ${isChecked ? styles.itemCheckboxActive : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className={styles.itemEmoji}>{item.icon}</span>
                      <span className={styles.itemLabel}>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {selectedItems.includes('Medicines') && (
                <div className={styles.medicineNotice}>
                  <Info size={16} />
                  <span>
                    Medical pickup notice: Volunteers collect pre-packaged prescriptions from licensed pharmacies. Volunteers do not prescribe, diagnose, or administer treatments.
                  </span>
                </div>
              )}
            </div>

            {/* Section C: How soon? */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <Clock size={18} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>How urgent is this?</h2>
                </div>
              </div>

              <div className={styles.radioGrid3}>
                <div
                  className={`${styles.radioCard} ${urgency === 'today' ? styles.radioCardSelected : ''}`}
                  onClick={() => setUrgency('today')}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${urgency === 'today' ? styles.radioCircleActive : ''}`}>
                      {urgency === 'today' && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>Today</strong>
                      <span>Desired window (not guaranteed)</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.radioCard} ${urgency === 'within_24_hours' ? styles.radioCardSelected : ''}`}
                  onClick={() => setUrgency('within_24_hours')}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${urgency === 'within_24_hours' ? styles.radioCircleActive : ''}`}>
                      {urgency === 'within_24_hours' && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>Within 24 hours</strong>
                      <span>Later today or tomorrow</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.radioCard} ${urgency === 'within_3_days' ? styles.radioCardSelected : ''}`}
                  onClick={() => setUrgency('within_3_days')}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${urgency === 'within_3_days' ? styles.radioCircleActive : ''}`}>
                      {urgency === 'within_3_days' && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>Within 3 days</strong>
                      <span>I can wait a few days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section D: Can someone receive the delivery? */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <Truck size={18} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Can someone receive the delivery?</h2>
                </div>
              </div>

              <div className={styles.radioGrid2}>
                <div
                  className={`${styles.radioCard} ${canReceiveDelivery ? styles.radioCardSelected : ''}`}
                  onClick={() => setCanReceiveDelivery(true)}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${canReceiveDelivery ? styles.radioCircleActive : ''}`}>
                      {canReceiveDelivery && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>Yes</strong>
                      <span>Someone will be available at the location</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.radioCard} ${!canReceiveDelivery ? styles.radioCardSelected : ''}`}
                  onClick={() => setCanReceiveDelivery(false)}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${!canReceiveDelivery ? styles.radioCircleActive : ''}`}>
                      {!canReceiveDelivery && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>No</strong>
                      <span>I may need help with delivery arrangements</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section E: Preferred contact */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <Phone size={18} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Preferred contact</h2>
                </div>
              </div>

              <div className={styles.radioGrid3}>
                <div
                  className={`${styles.radioCard} ${contactPreference === 'whatsapp' ? styles.radioCardSelected : ''}`}
                  onClick={() => setContactPreference('whatsapp')}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${contactPreference === 'whatsapp' ? styles.radioCircleActive : ''}`}>
                      {contactPreference === 'whatsapp' && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>WhatsApp</strong>
                      <span>Fastest way to reach me</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.radioCard} ${contactPreference === 'phone_call' ? styles.radioCardSelected : ''}`}
                  onClick={() => setContactPreference('phone_call')}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${contactPreference === 'phone_call' ? styles.radioCircleActive : ''}`}>
                      {contactPreference === 'phone_call' && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>Phone call</strong>
                      <span>Call my mobile number</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.radioCard} ${contactPreference === 'sms' ? styles.radioCardSelected : ''}`}
                  onClick={() => setContactPreference('sms')}
                >
                  <div className={styles.radioTop}>
                    <div className={`${styles.radioCircle} ${contactPreference === 'sms' ? styles.radioCircleActive : ''}`}>
                      {contactPreference === 'sms' && <div className={styles.radioInnerDot} />}
                    </div>
                    <div>
                      <strong>SMS</strong>
                      <span>Text message</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section F: Additional notes */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <FileText size={18} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Additional notes (optional)</h2>
                  <span className={styles.sectionSubtitle}>
                    Tell us anything else that might help (e.g. specific brands, allergies, access instructions).
                  </span>
                </div>
              </div>

              <div className={styles.textareaWrap}>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value.slice(0, 500))}
                  placeholder="Enter details..."
                  rows={3}
                  className={styles.textarea}
                />
                <span className={styles.charCount}>{notes.length}/500</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className={styles.formFooter}>
              <button type="button" className={styles.backBtn} onClick={() => goBack()}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                className={styles.reviewBtn}
                onClick={handleReview}
                disabled={selectedItems.length === 0}
              >
                <span>Review request</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Location Summary & Assurance Cards */}
          <div className={styles.sideCol}>
            {/* Card 1: Your Location */}
            <div className={styles.locationCard}>
              <div className={styles.locationHeader}>
                <div className={styles.locIconWrap}>
                  <MapPin size={20} />
                </div>
                <div className={styles.locInfo}>
                  <span className={styles.locLabel}>Your location</span>
                  <strong className={styles.locName}>Indiranagar, Bengaluru</strong>
                  <span className={styles.locPincode}>Bengaluru, Karnataka 560038</span>
                </div>
                <button
                  type="button"
                  className={styles.editLocBtn}
                  onClick={() => navigateTo('help_category_select')}
                >
                  <Edit2 size={13} />
                  <span>Edit location</span>
                </button>
              </div>

              {/* Leaflet Mini Map Preview */}
              <div className={styles.miniMapWrap}>
                <div ref={mapContainerRef} className={styles.miniMap} />
                <div className={styles.mapPinOverlay}>
                  <span>Indiranagar Metro Station · 100 Feet Rd</span>
                </div>
              </div>

              <div className={styles.approxFooter}>
                <Info size={14} />
                <span>Approximate area · Indiranagar, Bengaluru</span>
              </div>
            </div>

            {/* Card 2: Safe Community */}
            <div className={styles.safeCard}>
              <div className={styles.safeIconWrap}>
                <Shield size={22} />
              </div>
              <div>
                <h3 className={styles.safeTitle}>You're in a safe community</h3>
                <p className={styles.safeDesc}>
                  Helpers are matched by distance, availability and circle trust.
                  We share only the information needed to complete the help safely.
                </p>
                <button
                  type="button"
                  className={styles.learnMoreBtn}
                  onClick={() => navigateTo('help_now_landing')}
                >
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 3: Approved Caregiving Photograph Card */}
            <div className={styles.caregiverCard}>
              <img
                src={getAssetUrl('/images/golden-hour-caregiving.png')}
                alt="Caregiver and elder smiling warmly"
                className={styles.caregiverImg}
              />
              <div className={styles.caregiverOverlay} />
              <div className={styles.caregiverText}>
                <span>Real people.</span>
                <span>Real care.</span>
                <strong className={styles.scriptQuote}>Stronger tomorrows.</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
