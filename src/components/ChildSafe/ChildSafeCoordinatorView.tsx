import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Check,
  Lock,
  Building,
  UserCheck,
  FileText,
  MapPin,
  EyeOff
} from 'lucide-react';
import L from 'leaflet';
import { useCareContext } from '../../context/CareContext';
import {
  ReferralCategory,
  ChildHandoffRecord
} from '../../types/childSafe';
import {
  REFERRAL_CATEGORIES,
  FICTIONAL_COORDINATOR_PROFILE
} from '../../data/childSafeDemoData';
import styles from './ChildSafeCoordinatorView.module.css';

export const ChildSafeCoordinatorView: React.FC = () => {
  const {
    childSafeCase,
    beginCoordinatorReview,
    prepareCoordinatorReferral,
    simulateReferralAcknowledgement,
    documentSimulatedHandoff,
    resolveChildSafeFollowUp,
    toggleCoordinatorDemoMode
  } = useCareContext();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Modal Dialog States
  const [showAckModal, setShowAckModal] = useState(false);
  const [showHandoffModal, setShowHandoffModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);

  // Form selections for actions
  const [selectedReferral, setSelectedReferral] = useState<ReferralCategory>('child_protection');
  const [referralNotes, setReferralNotes] = useState(
    'Factual dossier forwarded for emergency kinship tracing and statutory temporary shelter placement under Child Welfare Committee jurisdiction.'
  );

  // Handoff Form State
  const [handoffOrg, setHandoffOrg] = useState(
    'District Child Protection Unit (DCPU) — East Bengaluru'
  );
  const [recipientRole, setRecipientRole] = useState(
    'Designated Child Welfare Protection Officer'
  );
  const [handoffNotes, setHandoffNotes] = useState(
    'Physical transfer of protective responsibility completed at Indiranagar transit centre. Kinship search initiated.'
  );
  const [followUpRequired, setFollowUpRequired] = useState(true);
  const [followUpNote, setFollowUpNote] = useState(
    'Family tracing in progress with Indiranagar community point. Kinship verification pending within 24 hours.'
  );
  const [resolveNotes, setResolveNotes] = useState(
    'Caregiver tracing verified — maternal aunt identified in Halasuru. Kinship custody confirmed under Child Welfare Committee oversight.'
  );

  const currentStatus = childSafeCase?.status || 'recorded_local';

  // Initialize Coordinator-only approximate area map (no child pinpoint!)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Indiranagar approximate coordinates
    const indiranagarLat = 12.9716;
    const indiranagarLng = 77.6412;

    const map = L.map(mapContainerRef.current, {
      center: [indiranagarLat, indiranagarLng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      { maxZoom: 18 }
    ).addTo(map);

    // Approximate area circle (500m radius) without exact pinpoint to demonstrate privacy
    L.circle([indiranagarLat, indiranagarLng], {
      color: '#F45124',
      fillColor: '#F45124',
      fillOpacity: 0.12,
      weight: 2,
      dashArray: '4, 6',
      radius: 500
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleStartReview = () => {
    beginCoordinatorReview();
  };

  const handlePrepareReferral = () => {
    prepareCoordinatorReferral(selectedReferral, referralNotes);
  };

  const handleConfirmAck = () => {
    simulateReferralAcknowledgement(
      'Statutory intake acknowledged by Child Welfare duty officer. Case dossier accepted under statutory record.'
    );
    setShowAckModal(false);
  };

  const handleConfirmHandoff = () => {
    const record: ChildHandoffRecord = {
      handoffCategory: 'District Child Welfare Unit (CWC)',
      recipientRole,
      recipientOrganization: handoffOrg,
      handoffTimestamp: 'April 24, 2018, 16:15 IST',
      notes: handoffNotes,
      followUpRequired,
      followUpNote: followUpRequired ? followUpNote : undefined
    };
    documentSimulatedHandoff(record);
    setShowHandoffModal(false);
  };

  const isStep2Done =
    currentStatus !== 'draft' &&
    currentStatus !== 'recorded_local';
  const isStep3Done =
    isStep2Done &&
    currentStatus !== 'demo_review_in_progress';
  const isStep4Done =
    isStep3Done &&
    currentStatus !== 'demo_referral_prepared';
  const isStep5Done =
    currentStatus === 'demo_handoff_documented' ||
    currentStatus === 'follow_up_open' ||
    currentStatus === 'closed_in_demo';

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Simulation Notice Banner */}
        <div className={styles.simBanner}>
          <div className={styles.simLeft}>
            <span className={styles.simBadge}>RESTRICTED SIMULATION</span>
            <span className={styles.simText}>
              Child Safe cases require appropriately authorised handling. The following workflow is
              a fictional demonstration.
            </span>
          </div>

          <button
            type="button"
            className={styles.exitCoordBtn}
            onClick={() => toggleCoordinatorDemoMode(false)}
          >
            <span>Exit coordinator view (Return to reporter view)</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>— DEMONSTRATION COORDINATION WORKFLOW</div>
          <h1 className={styles.title}>Safe handoff is being arranged.</h1>
          <p className={styles.subtitle}>
            Active Case: <strong>{childSafeCase?.id || 'UJAAS-CS-2018-001'}</strong> · Acting as{' '}
            <strong>{FICTIONAL_COORDINATOR_PROFILE.name}</strong> ({FICTIONAL_COORDINATOR_PROFILE.role})
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className={styles.layoutGrid}>
          {/* Left Column: Case Record & Approximate Area Map */}
          <div className={styles.leftCol}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <ShieldAlert size={18} className={styles.cardHeaderIcon} />
                <span className={styles.cardTitle}>Restricted Case Record</span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Fictional Case ID</span>
                <span className={styles.metaValue}>{childSafeCase?.id || 'UJAAS-CS-2018-001'}</span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Observed Situation</span>
                <span className={styles.metaValue}>Child without an available caregiver</span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Approximate Age</span>
                <span className={styles.metaValue}>Young child (4–6 years)</span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Reported By</span>
                <span className={styles.metaValue}>
                  {childSafeCase?.reporterName || 'Aarav Sharma'} ({childSafeCase?.reporterPhone || '+91 98450 23891'})
                </span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Simulation Status</span>
                <div
                  className={`${styles.statusPill} ${
                    isStep5Done ? styles.statusPillGreen : ''
                  }`}
                >
                  <Lock size={12} />
                  <span>
                    {isStep5Done
                      ? 'Handoff documented in demo'
                      : isStep4Done
                      ? 'Referral acknowledged in demo'
                      : isStep3Done
                      ? 'Referral prepared in demo'
                      : isStep2Done
                      ? 'Review begun by demo coordinator'
                      : 'Recorded locally in demo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Coordinator-only Approximate Map */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <MapPin size={18} className={styles.cardHeaderIcon} />
                <span className={styles.cardTitle}>Restricted Area Visualizer</span>
              </div>

              <div className={styles.mapBox} ref={mapContainerRef}>
                <div className={styles.mapNotice}>
                  <EyeOff size={13} />
                  <span>500m general area zone · Exact pinpoint hidden</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Handoff Timeline & Interactive Actions */}
          <div className={styles.centerCol}>
            <div className={styles.timelineCard}>
              <h2 className={styles.timelineTitle}>Handoff Coordination Progression</h2>
              <p className={styles.timelineDesc}>
                Advance through the safeguarded steps below. Each transition is strictly simulated
                and audit-logged.
              </p>

              <div className={styles.timelineTrack}>
                {/* Step 1: Concern Recorded */}
                <div className={styles.timelineStep}>
                  <div className={`${styles.stepIconWrap} ${styles.stepDone}`}>
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div
                    className={`${styles.stepConnector} ${
                      isStep2Done ? styles.stepConnectorDone : ''
                    }`}
                  />
                  <div className={styles.stepContent}>
                    <div className={styles.stepHeader}>
                      <span className={styles.stepName}>1. Factual Concern Recorded</span>
                      <span className={styles.stepTimestamp}>April 24, 2018, 14:30 IST</span>
                    </div>
                    <p className={styles.stepText}>
                      Aarav Sharma submitted factual observations for an unattended child holding a
                      doll near 100ft Road Bus Stop, Indiranagar.
                    </p>
                  </div>
                </div>

                {/* Step 2: Coordinator Review */}
                <div className={styles.timelineStep}>
                  <div
                    className={`${styles.stepIconWrap} ${
                      isStep2Done
                        ? styles.stepDone
                        : currentStatus === 'recorded_local'
                        ? styles.stepActive
                        : styles.stepPending
                    }`}
                  >
                    {isStep2Done ? <Check size={18} strokeWidth={3} /> : '2'}
                  </div>
                  <div
                    className={`${styles.stepConnector} ${
                      isStep3Done ? styles.stepConnectorDone : ''
                    }`}
                  />
                  <div className={styles.stepContent}>
                    <div className={styles.stepHeader}>
                      <span className={styles.stepName}>2. Specialist Coordinator Review</span>
                      <span className={styles.stepTimestamp}>
                        {isStep2Done ? 'April 24, 2018, 14:45 IST' : 'Awaiting review'}
                      </span>
                    </div>
                    <p className={styles.stepText}>
                      Review factual details, verify presence state, and confirm that sensitive
                      information is separated from public community task feeds.
                    </p>

                    {currentStatus === 'recorded_local' && (
                      <div className={styles.actionBox}>
                        <span>Ready to examine case details as UJAAS Coordinator:</span>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          onClick={handleStartReview}
                        >
                          <UserCheck size={16} />
                          <span>Begin demo review</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 3: Prepare Referral */}
                <div className={styles.timelineStep}>
                  <div
                    className={`${styles.stepIconWrap} ${
                      isStep3Done
                        ? styles.stepDone
                        : currentStatus === 'demo_review_in_progress'
                        ? styles.stepActive
                        : styles.stepPending
                    }`}
                  >
                    {isStep3Done ? <Check size={18} strokeWidth={3} /> : '3'}
                  </div>
                  <div
                    className={`${styles.stepConnector} ${
                      isStep4Done ? styles.stepConnectorDone : ''
                    }`}
                  />
                  <div className={styles.stepContent}>
                    <div className={styles.stepHeader}>
                      <span className={styles.stepName}>3. Prepare Statutory Referral Dossier</span>
                      <span className={styles.stepTimestamp}>
                        {isStep3Done ? 'April 24, 2018, 15:10 IST' : 'Pending review completion'}
                      </span>
                    </div>
                    <p className={styles.stepText}>
                      Select the appropriate statutory or emergency authority to receive the
                      safeguarded observation briefing.
                    </p>

                    {currentStatus === 'demo_review_in_progress' && (
                      <div className={styles.actionBox}>
                        <strong>Select statutory referral category:</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {REFERRAL_CATEGORIES.map(cat => (
                            <label
                              key={cat.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                fontSize: '0.86rem',
                                color: '#102744',
                                cursor: 'pointer'
                              }}
                            >
                              <input
                                type="radio"
                                name="referralCategory"
                                checked={selectedReferral === cat.id}
                                onChange={() => setSelectedReferral(cat.id)}
                              />
                              <span>
                                <strong>{cat.name}</strong> — {cat.authority}
                              </span>
                            </label>
                          ))}
                        </div>

                        <textarea
                          className={styles.modalInput}
                          value={referralNotes}
                          onChange={e => setReferralNotes(e.target.value)}
                          rows={2}
                          style={{ marginTop: '0.4rem', fontSize: '0.84rem' }}
                          placeholder="Referral notes"
                        />

                        <button
                          type="button"
                          className={styles.actionBtn}
                          onClick={handlePrepareReferral}
                          style={{ marginTop: '0.5rem' }}
                        >
                          <FileText size={16} />
                          <span>Prepare referral dossier</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 4: Simulate Statutory Acknowledgement */}
                <div className={styles.timelineStep}>
                  <div
                    className={`${styles.stepIconWrap} ${
                      isStep4Done
                        ? styles.stepDone
                        : currentStatus === 'demo_referral_prepared'
                        ? styles.stepActive
                        : styles.stepPending
                    }`}
                  >
                    {isStep4Done ? <Check size={18} strokeWidth={3} /> : '4'}
                  </div>
                  <div
                    className={`${styles.stepConnector} ${
                      isStep5Done ? styles.stepConnectorDone : ''
                    }`}
                  />
                  <div className={styles.stepContent}>
                    <div className={styles.stepHeader}>
                      <span className={styles.stepName}>4. Simulated Statutory Receipt & Acknowledgement</span>
                      <span className={styles.stepTimestamp}>
                        {isStep4Done ? 'April 24, 2018, 15:35 IST' : 'Pending referral preparation'}
                      </span>
                    </div>
                    <p className={styles.stepText}>
                      Record an acknowledgement from the designated statutory child protection duty officer.
                    </p>

                    {currentStatus === 'demo_referral_prepared' && (
                      <div className={styles.actionBox}>
                        <span>Simulate receiving statutory confirmation from Childline / CWC:</span>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          onClick={() => setShowAckModal(true)}
                        >
                          <Building size={16} />
                          <span>Simulate referral acknowledgement</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 5: Document Safe Handoff */}
                <div className={styles.timelineStep}>
                  <div
                    className={`${styles.stepIconWrap} ${
                      isStep5Done
                        ? styles.stepDone
                        : currentStatus === 'demo_referral_acknowledged'
                        ? styles.stepActive
                        : styles.stepPending
                    }`}
                  >
                    {isStep5Done ? <Check size={18} strokeWidth={3} /> : '5'}
                  </div>
                  <div className={styles.stepContent}>
                    <div className={styles.stepHeader}>
                      <span className={styles.stepName}>5. Document Simulated Safe Handoff</span>
                      <span className={styles.stepTimestamp}>
                        {isStep5Done ? 'April 24, 2018, 16:15 IST' : 'Pending acknowledgement'}
                      </span>
                    </div>
                    <p className={styles.stepText}>
                      Formally record that protective care was handed off to authorised personnel.
                      Follow-up tracking remains open until kinship tracing concludes.
                    </p>

                    {currentStatus === 'demo_referral_acknowledged' && (
                      <div className={styles.actionBox}>
                        <span>Document transfer of custody to designated protection officer:</span>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          onClick={() => setShowHandoffModal(true)}
                        >
                          <UserCheck size={16} />
                          <span>Document simulated handoff</span>
                        </button>
                      </div>
                    )}

                    {isStep5Done && (
                      <div
                        style={{
                          backgroundColor: '#FAF7F0',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: '1px solid #DDD8CE',
                          marginTop: '0.75rem'
                        }}
                      >
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#102744' }}>
                          ✓ Safe Handoff Documented in Demo
                        </div>
                        <div style={{ fontSize: '0.84rem', color: '#526072', marginTop: '0.25rem' }}>
                          Recipient: {childSafeCase?.handoffRecord?.recipientRole} (
                          {childSafeCase?.handoffRecord?.recipientOrganization})
                          <br />
                          Notes: {childSafeCase?.handoffRecord?.notes}
                        </div>
                      </div>
                    )}

                    {isStep5Done && childSafeCase?.followUpState?.isOpen && (
                      <div
                        style={{
                          backgroundColor: '#FFF9F1',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: '1px solid #F6A53A',
                          marginTop: '0.75rem'
                        }}
                      >
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#B34A00' }}>
                          ⚡ Active Follow-Up Responsibility (Simulation)
                        </div>
                        <div style={{ fontSize: '0.84rem', color: '#526072', marginTop: '0.25rem', lineHeight: '1.45' }}>
                          <strong>Action in progress:</strong> {childSafeCase.followUpState.requiredAction}
                          <br />
                          <strong>Target due:</strong> {childSafeCase.followUpState.targetDue}
                        </div>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          style={{ marginTop: '0.75rem', width: 'auto' }}
                          onClick={() => setShowResolveModal(true)}
                        >
                          <Check size={16} />
                          <span>Simulate follow-up resolution</span>
                        </button>
                      </div>
                    )}

                    {currentStatus === 'closed_in_demo' && (
                      <div
                        style={{
                          backgroundColor: '#F0FDF4',
                          padding: '1rem',
                          borderRadius: '10px',
                          border: '1px solid #86EFAC',
                          marginTop: '0.75rem'
                        }}
                      >
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#166534' }}>
                          ✓ Follow-Up Actions Concluded in Demo
                        </div>
                        <div style={{ fontSize: '0.84rem', color: '#374151', marginTop: '0.25rem', lineHeight: '1.45' }}>
                          {childSafeCase?.followUpState?.requiredAction}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Safeguarding Principles & Activity History */}
          <div className={styles.rightCol}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Lock size={18} className={styles.cardHeaderIcon} />
                <span className={styles.cardTitle}>Coordinator Safeguards</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#526072', lineHeight: '1.5' }}>
                • <strong>Separation of Duty:</strong> Volunteers can only report observations; only designated coordinators manage referrals.
                <br /><br />
                • <strong>No Unqualified Caregiving:</strong> Community helpers are barred from claiming unaccompanied minors.
                <br /><br />
                • <strong>Simulated Activity Tracking:</strong> All timeline transitions are logged with fictional 2018 dates for prototype demonstration tracking.
              </div>
            </div>

            {/* Live Activity History */}
            <div className={styles.auditCard}>
              <span className={styles.auditTitle}>Simulated Case Activity History ({childSafeCase?.activityHistory.length || 0})</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {childSafeCase?.activityHistory.map((act) => (
                  <div key={act.id} className={styles.auditItem}>
                    <span className={styles.auditTime}>{act.timestamp}</span>
                    <span className={styles.auditActor}>{act.action}</span>
                    <span className={styles.auditNote}>{act.safeNote}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal 1: Simulate Referral Acknowledgement Confirmation Dialog */}
        {showAckModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Simulate Statutory Acknowledgement</h2>
              <p className={styles.modalDesc}>
                This will record a fictional acknowledgement in the UJAAS demonstration from the
                District Child Welfare Committee (CWC). No real-world information will be transmitted.
              </p>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.actionBtnSecondary}
                  onClick={() => setShowAckModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={handleConfirmAck}
                >
                  Record demo acknowledgement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: Document Simulated Handoff Dialog */}
        {showHandoffModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Document Simulated Handoff</h2>
              <p className={styles.modalDesc}>
                Record the authorised transfer of protective care to designated statutory personnel.
              </p>

              <div className={styles.modalField}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#102744' }}>
                  Statutory Organisation
                </label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={handoffOrg}
                  onChange={e => setHandoffOrg(e.target.value)}
                />
              </div>

              <div className={styles.modalField}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#102744' }}>
                  Recipient Professional Role
                </label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={recipientRole}
                  onChange={e => setRecipientRole(e.target.value)}
                />
              </div>

              <div className={styles.modalField}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#102744' }}>
                  Handoff Observations & Notes
                </label>
                <textarea
                  className={styles.modalInput}
                  value={handoffNotes}
                  onChange={e => setHandoffNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="checkbox"
                  id="followUpCheck"
                  checked={followUpRequired}
                  onChange={e => setFollowUpRequired(e.target.checked)}
                />
                <label
                  htmlFor="followUpCheck"
                  style={{ fontSize: '0.88rem', fontWeight: '600', color: '#102744', cursor: 'pointer' }}
                >
                  Follow-up required (e.g. Kinship tracing / Caregiver reunion)
                </label>
              </div>

              {followUpRequired && (
                <div className={styles.modalField}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: '#526072' }}>
                    Follow-up Action Details
                  </label>
                  <input
                    type="text"
                    className={styles.modalInput}
                    value={followUpNote}
                    onChange={e => setFollowUpNote(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.actionBtnSecondary}
                  onClick={() => setShowHandoffModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={handleConfirmHandoff}
                >
                  Confirm demo handoff record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 3: Simulate Follow-Up Resolution Dialog */}
        {showResolveModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Conclude Simulated Follow-Up</h2>
              <p className={styles.modalDesc}>
                Document the safe completion of follow-up tracing (e.g. verified kinship reunification under CWC supervision).
              </p>

              <div className={styles.modalField}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#102744' }}>
                  Resolution Notes
                </label>
                <textarea
                  className={styles.modalInput}
                  value={resolveNotes}
                  onChange={e => setResolveNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.actionBtnSecondary}
                  onClick={() => setShowResolveModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => {
                    resolveChildSafeFollowUp(resolveNotes);
                    setShowResolveModal(false);
                  }}
                >
                  Confirm follow-up resolution
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
