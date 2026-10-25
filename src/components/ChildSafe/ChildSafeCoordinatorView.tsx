import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  CheckCircle2,
  Building,
  UserCheck,
  UserPlus,
  FileText,
  MapPin,
  EyeOff,
  AlertTriangle,
  Clock,
  Calendar,
  Utensils,
  Heart,
  Home,
  Link2,
  Phone,
  Mail,
  LayoutDashboard,
  Users,
  FileCheck,
  MessageSquare,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import L from 'leaflet';
import { useCareContext } from '../../context/CareContext';
import { getAssetUrl } from '../../utils/assets';
import { NeedStatus } from '../../types/childSafe';
import styles from './ChildSafeCoordinatorView.module.css';

export const ChildSafeCoordinatorView: React.FC = () => {
  const {
    childSafeCase,
    toggleCoordinatorDemoMode,
    navigateTo,
    simulateReferralAcknowledgement,
    assignCoordinatorFollowUp,
    updateCareArrangement,
    updateNeedStatus
  } = useCareContext();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Active Sidebar Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'referrals' | 'followup' | 'documents' | 'notes' | 'team'>('overview');

  // Modals for Top Actions
  const [showAckModal, setShowAckModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showNeedsModal, setShowNeedsModal] = useState(false);

  // Form states for modals
  const [ackNotes, setAckNotes] = useState(
    'Statutory intake acknowledged by District Child Welfare Committee (CWC) duty officer. Case file registered for emergency review.'
  );

  const [assignName, setAssignName] = useState('Priya Sharma');
  const [assignRole, setAssignRole] = useState('Child Protection Officer');
  const [assignReason, setAssignReason] = useState(
    'Conduct on-ground kinship verification and monitor temporary shelter welfare.'
  );
  const [assignReviewDate, setAssignReviewDate] = useState('April 26, 2018');

  // Need status form states
  const [supervisionStatus, setSupervisionStatus] = useState<NeedStatus>(
    childSafeCase?.immediateNeeds?.supervisionStatus || 'in_place'
  );
  const [foodStatus, setFoodStatus] = useState<NeedStatus>(
    childSafeCase?.immediateNeeds?.foodStatus || 'support_coordinated'
  );
  const [medicalStatus, setMedicalStatus] = useState<NeedStatus>(
    childSafeCase?.immediateNeeds?.medicalStatus || 'not_confirmed'
  );
  const [shelterStatus, setShelterStatus] = useState<NeedStatus>(
    childSafeCase?.immediateNeeds?.shelterStatus || 'in_place'
  );
  const [shelterName, setShelterName] = useState(
    childSafeCase?.careArrangement?.placementName || 'UJAAS Partner Shelter, Indiranagar'
  );
  const [shelterNotes, setShelterNotes] = useState(
    childSafeCase?.careArrangement?.notes || 'Arranged on April 24, 2018 by Child Safety Team.'
  );

  // Initialize Coordinator-only approximate area map (no child pinpoint!)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const indiranagarLat = 12.9716;
    const indiranagarLng = 77.6412;

    const map = L.map(mapContainerRef.current, {
      center: [indiranagarLat, indiranagarLng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 18, attribution: '' }
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

  const handleAcknowledgeReferral = () => {
    simulateReferralAcknowledgement(ackNotes);
    setShowAckModal(false);
  };

  const handleAssignFollowUp = () => {
    assignCoordinatorFollowUp(
      assignName,
      assignRole,
      assignReason,
      assignReviewDate,
      ['Adult supervision in temporary shelter', 'Kinship tracing verification']
    );
    setShowAssignModal(false);
  };

  const handleSaveNeedsAndArrangement = () => {
    updateNeedStatus('supervisionStatus', supervisionStatus);
    updateNeedStatus('foodStatus', foodStatus);
    updateNeedStatus('medicalStatus', medicalStatus);
    updateNeedStatus('shelterStatus', shelterStatus);

    const arrangementStatus =
      shelterStatus === 'in_place' ? 'in_place' : 'under_professional_review';
    updateCareArrangement(arrangementStatus, shelterName, shelterNotes);

    setShowNeedsModal(false);
  };

  const caseId = childSafeCase?.id || 'UJAAS-CS-2018-001';
  const reporterName = childSafeCase?.reporterName || 'Aarav Sharma';
  const reporterRole = childSafeCase?.reporterRole || 'Community Volunteer · Indiranagar';
  const coordinator = childSafeCase?.assignedCoordinator || {
    name: 'Priya Sharma',
    role: 'Child Protection Officer',
    phone: '+91 98765 43210',
    email: 'priya.sharma@ujaas.org'
  };

  // Helper for status pill presentation
  const renderStatusPill = (status?: NeedStatus) => {
    switch (status) {
      case 'in_place':
      case 'support_coordinated':
      case 'addressed_in_demo':
        return <span className={`${styles.statusPill} ${styles.pillGreen}`}>In place</span>;
      case 'pending':
      case 'under_review':
      case 'needs_assessment':
        return <span className={`${styles.statusPill} ${styles.pillAmber}`}>Pending</span>;
      case 'not_addressed':
        return <span className={`${styles.statusPill} ${styles.pillRed}`}>Not addressed</span>;
      case 'not_confirmed':
      default:
        return <span className={`${styles.statusPill} ${styles.pillRed}`}>Not confirmed</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrap}>
        {/* Simulation Notice Top Banner */}
        <div className={styles.simBanner}>
          <div className={styles.simLeft}>
            <span className={styles.simBadge}>RESTRICTED SIMULATION</span>
            <span className={styles.simText}>
              Restricted Coordinator Workspace: Authorised Child Protection Simulation.
            </span>
          </div>

          <button
            type="button"
            className={styles.exitCoordBtn}
            onClick={() => toggleCoordinatorDemoMode(false)}
            aria-label="Exit coordinator view and return to reporter tracking"
          >
            <span>Exit coordinator view</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Top Header with Action Buttons matching Reference 03 */}
        <div className={styles.topHeaderRow}>
          <div className={styles.headerTextCol}>
            <div className={styles.eyebrow}>CHILD PROTECTION CASE</div>
            <h1 className={styles.title}>Child Care Coordination</h1>
            <p className={styles.subtitle}>
              Coordinate support, track progress, and ensure the child receives timely and
              appropriate care.
            </p>
          </div>

          <div className={styles.headerActionsGroup}>
            <button
              type="button"
              className={styles.primaryActionBtn}
              onClick={() => setShowAckModal(true)}
              aria-label="Acknowledge referral"
            >
              <CheckCircle2 size={16} />
              <span>Acknowledge referral</span>
            </button>

            <button
              type="button"
              className={styles.secondaryActionBtn}
              onClick={() => setShowAssignModal(true)}
              aria-label="Assign follow-up"
            >
              <UserPlus size={16} />
              <span>Assign follow-up</span>
            </button>

            <button
              type="button"
              className={styles.secondaryActionBtn}
              onClick={() => setShowNeedsModal(true)}
              aria-label="Mark need addressed"
            >
              <CheckCircle size={16} />
              <span>Mark need addressed</span>
            </button>
          </div>
        </div>

        {/* Master 2-Column Dashboard Layout (Sidebar + Body) */}
        <div className={styles.dashboardLayout}>
          {/* Left Sidebar Navigation matching Reference 03 */}
          <aside className={styles.sidebarNav}>
            <button
              type="button"
              className={styles.backToCasesBtn}
              onClick={() => navigateTo('child_safe_status')}
              aria-label="Back to cases"
            >
              <ArrowLeft size={15} />
              <span>Back to Cases</span>
            </button>

            <nav className={styles.navItemList} aria-label="Coordinator Views">
              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'overview' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard size={16} />
                <span>Case Overview</span>
              </button>

              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'details' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <UserCheck size={16} />
                <span>Child Details</span>
              </button>

              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'referrals' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('referrals')}
              >
                <Link2 size={16} />
                <span>Referrals</span>
              </button>

              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'followup' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('followup')}
              >
                <CheckCircle2 size={16} />
                <span>Follow-up</span>
              </button>

              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'documents' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('documents')}
              >
                <FileCheck size={16} />
                <span>Documents</span>
              </button>

              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'notes' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                <MessageSquare size={16} />
                <span>Notes</span>
              </button>

              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'team' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('team')}
              >
                <Users size={16} />
                <span>Team & Access</span>
              </button>
            </nav>
          </aside>

          {/* Main Dashboard Body */}
          <main className={styles.dashboardBody}>
            {/* Top Case Header Card matching Reference 03 */}
            <div className={styles.caseHeaderCard}>
              <div className={styles.caseHeaderTop}>
                {/* Child Portrait Thumbnail */}
                <div className={styles.childThumbnailWrap}>
                  <img
                    src={getAssetUrl('/images/child-with-doll.png')}
                    alt="Observed child with doll"
                    className={styles.childThumbnailImg}
                    width={140}
                    height={140}
                  />
                </div>

                {/* Case Info Details & Status Badges */}
                <div className={styles.caseHeaderDetails}>
                  <div className={styles.caseIdRow}>
                    <div>
                      <span className={styles.caseIdLabel}>Case ID</span>
                      <h2 className={styles.caseIdNumber}>{caseId}</h2>
                      <p className={styles.reportedByMeta}>
                        Reported on 24 Apr 2018 · via Community Volunteer ({reporterName})
                      </p>
                    </div>

                    <div className={styles.headerBadgesRow}>
                      {/* Severity Badge */}
                      <div className={`${styles.headerBadge} ${styles.badgeAlert}`}>
                        <AlertTriangle size={18} />
                        <div className={styles.badgeContent}>
                          <span className={styles.badgeTitle}>High Concern</span>
                          <span className={styles.badgeSub}>Severity</span>
                        </div>
                      </div>

                      {/* Current Status Badge */}
                      <div className={`${styles.headerBadge} ${styles.badgeStatus}`}>
                        <Clock size={18} />
                        <div className={styles.badgeContent}>
                          <span className={styles.badgeTitle}>
                            {childSafeCase?.status === 'demo_referral_acknowledged'
                              ? 'Referral Acknowledged'
                              : childSafeCase?.status === 'follow_up_open'
                              ? 'Follow-up Active'
                              : 'Under Review'}
                          </span>
                          <span className={styles.badgeSub}>Current Status</span>
                        </div>
                      </div>

                      {/* Next Review Badge */}
                      <div className={`${styles.headerBadge} ${styles.badgeReview}`}>
                        <Calendar size={18} />
                        <div className={styles.badgeContent}>
                          <span className={styles.badgeTitle}>
                            {childSafeCase?.nextReviewDue || '26 Apr 2018'}
                          </span>
                          <span className={styles.badgeSub}>Next Review Due</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 4-Column Metadata Grid matching Reference 03 */}
              <div className={styles.caseMetaStrip}>
                <div className={styles.metaCol}>
                  <span className={styles.metaColLabel}>Child (Approx. age)</span>
                  <span className={styles.metaColPrimary}>6 years</span>
                  <span className={styles.metaColSecondary}>Female · Young child</span>
                </div>

                <div className={styles.metaCol}>
                  <span className={styles.metaColLabel}>Location</span>
                  <span className={styles.metaColPrimary}>Indiranagar, Bengaluru</span>
                  <span className={styles.metaColSecondary}>Karnataka</span>
                </div>

                <div className={styles.metaCol}>
                  <span className={styles.metaColLabel}>Reported by</span>
                  <span className={styles.metaColPrimary}>{reporterName}</span>
                  <span className={styles.metaColSecondary}>ID: CV-1045 · {reporterRole}</span>
                </div>

                <div className={styles.metaCol}>
                  <span className={styles.metaColLabel}>Case type</span>
                  <span className={styles.metaColPrimary}>Child without available caregiver</span>
                  <span className={styles.metaColSecondary}>May be alone or without responsible caregiver</span>
                </div>
              </div>
            </div>

            {/* Lower 3-Column Grid matching Reference 03 */}
            <div className={styles.lowerThreeGrid}>
              {/* Column 1: Immediate Needs & Care Arrangement */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Immediate Needs Card */}
                <div className={styles.sectionCard}>
                  <div className={styles.cardTopHeader}>
                    <div className={styles.cardHeaderInfo}>
                      <div className={`${styles.headerIconCircle} ${styles.iconRed}`}>
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitleText}>Immediate needs</h3>
                        <p className={styles.cardSubText}>
                          Critical needs identified for the child. Update as each need is addressed.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.cardActionLink}
                      onClick={() => setShowNeedsModal(true)}
                    >
                      <span>Update</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className={styles.needsList}>
                    {/* Need 1: Supervision */}
                    <div className={styles.needItemRow}>
                      <div className={styles.needItemLeft}>
                        <div className={`${styles.needIconBadge} ${styles.iconRed}`}>
                          <AlertTriangle size={14} />
                        </div>
                        <span className={styles.needTitle}>Supervision needed</span>
                      </div>
                      {renderStatusPill(childSafeCase?.immediateNeeds?.supervisionStatus || 'not_addressed')}
                    </div>

                    {/* Need 2: Food & Water */}
                    <div className={styles.needItemRow}>
                      <div className={styles.needItemLeft}>
                        <div className={`${styles.needIconBadge} ${styles.iconAmber}`}>
                          <Utensils size={14} />
                        </div>
                        <span className={styles.needTitle}>Food and water</span>
                      </div>
                      {renderStatusPill(childSafeCase?.immediateNeeds?.foodStatus || 'pending')}
                    </div>

                    {/* Need 3: Medical Attention */}
                    <div className={styles.needItemRow}>
                      <div className={styles.needItemLeft}>
                        <div className={`${styles.needIconBadge} ${styles.iconRed}`}>
                          <Heart size={14} />
                        </div>
                        <span className={styles.needTitle}>Medical attention</span>
                      </div>
                      {renderStatusPill(childSafeCase?.immediateNeeds?.medicalStatus || 'not_confirmed')}
                    </div>
                  </div>
                </div>

                {/* Temporary Care Arrangement Card matching Reference 03 */}
                <div className={styles.sectionCard}>
                  <div className={styles.cardTopHeader}>
                    <div className={styles.cardHeaderInfo}>
                      <div className={`${styles.headerIconCircle} ${styles.iconOrange}`}>
                        <Home size={18} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitleText}>Temporary care arrangement</h3>
                        <p className={styles.cardSubText}>
                          Current safe arrangement for the child.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.cardActionLink}
                      onClick={() => setShowNeedsModal(true)}
                    >
                      <span>Update</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className={styles.careArrangementBox}>
                    <div className={styles.homeIconCircle}>
                      <Home size={18} />
                    </div>

                    <div className={styles.arrangementContent}>
                      <div className={styles.arrangementTitleRow}>
                        <span className={styles.arrangementTitle}>
                          {childSafeCase?.careArrangement?.status === 'in_place'
                            ? 'At emergency shelter'
                            : 'Interim shelter review'}
                        </span>
                        <span
                          className={`${styles.statusPill} ${
                            childSafeCase?.careArrangement?.status === 'in_place'
                              ? styles.pillGreen
                              : styles.pillAmber
                          }`}
                        >
                          {childSafeCase?.careArrangement?.status === 'in_place'
                            ? 'In place'
                            : 'Under review'}
                        </span>
                      </div>

                      <span className={styles.arrangementLocation}>
                        {childSafeCase?.careArrangement?.placementName ||
                          'UJAAS Partner Shelter, Indiranagar'}
                        <br />
                        Bengaluru, Karnataka
                      </span>

                      <span className={styles.arrangementTimestamp}>
                        {childSafeCase?.careArrangement?.notes ||
                          'Arranged on 24 Apr 2018 by Child Safety Team.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Case Activity Timeline matching Reference 03 */}
              <div className={styles.sectionCard}>
                <div className={styles.cardTopHeader}>
                  <div className={styles.cardHeaderInfo}>
                    <div className={`${styles.headerIconCircle} ${styles.iconAmber}`}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <h3 className={styles.cardTitleText}>Case activity timeline</h3>
                      <p className={styles.cardSubText}>
                        Key events and updates in chronological order.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.cardActionLink}
                    onClick={() => setShowAssignModal(true)}
                  >
                    <span>Add event</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className={styles.timelineTrack}>
                  {/* Event 1: Concern reported */}
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineConnector} />
                    <div className={`${styles.timelineIconWrap} ${styles.timelineDone}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineHeader}>
                        <span className={styles.timelineEventTitle}>Concern reported</span>
                        <span className={styles.timelineEventTime}>24 Apr 2018 10:15 AM</span>
                      </div>
                      <p className={styles.timelineEventDesc}>
                        Community volunteer submitted a concern about a child without an available caregiver.
                      </p>
                    </div>
                  </div>

                  {/* Event 2: Case created */}
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineConnector} />
                    <div className={`${styles.timelineIconWrap} ${styles.timelineDone}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineHeader}>
                        <span className={styles.timelineEventTitle}>Case created</span>
                        <span className={styles.timelineEventTime}>24 Apr 2018 10:32 AM</span>
                      </div>
                      <p className={styles.timelineEventDesc}>
                        Case registered and assigned to Child Safety team for review.
                      </p>
                    </div>
                  </div>

                  {/* Event 3: Referral acknowledged */}
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineConnector} />
                    <div
                      className={`${styles.timelineIconWrap} ${
                        childSafeCase?.status === 'demo_referral_acknowledged' ||
                        childSafeCase?.status === 'demo_handoff_documented' ||
                        childSafeCase?.status === 'follow_up_open' ||
                        childSafeCase?.status === 'closed_in_demo'
                          ? styles.timelineDone
                          : styles.timelineActive
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineHeader}>
                        <span className={styles.timelineEventTitle}>Referral acknowledged</span>
                        <span className={styles.timelineEventTime}>24 Apr 2018 01:20 PM</span>
                      </div>
                      <p className={styles.timelineEventDesc}>
                        Referral received and acknowledged by District Child Protection Unit.
                      </p>
                    </div>
                  </div>

                  {/* Event 4: Follow-up assigned */}
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineConnector} />
                    <div className={`${styles.timelineIconWrap} ${styles.timelineActive}`}>
                      <Clock size={14} />
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineHeader}>
                        <span className={styles.timelineEventTitle}>Follow-up assigned</span>
                        <span className={styles.timelineEventTime}>25 Apr 2018 11:45 AM</span>
                      </div>
                      <p className={styles.timelineEventDesc}>
                        Follow-up visit assigned to Priya Sharma (Child Protection Officer).
                      </p>
                    </div>
                  </div>

                  {/* Event 5: Review pending */}
                  <div className={styles.timelineItem}>
                    <div className={`${styles.timelineIconWrap} ${styles.timelinePending}`}>
                      <Calendar size={13} />
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineHeader}>
                        <span className={styles.timelineEventTitle}>Review pending</span>
                        <span className={styles.timelineEventTime}>26 Apr 2018</span>
                      </div>
                      <p className={styles.timelineEventDesc}>
                        Next review due. Assess current status and update care plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Coordinator Profile, Referrals & Approximate Location */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Assigned Coordinator Card */}
                <div className={styles.coordinatorCard}>
                  <div className={styles.cardTopHeader}>
                    <div className={styles.cardHeaderInfo}>
                      <div className={`${styles.headerIconCircle} ${styles.iconOrange}`}>
                        <UserCheck size={18} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitleText}>Assigned coordinator</h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.cardActionLink}
                      onClick={() => setShowAssignModal(true)}
                    >
                      <span>Update</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className={styles.coordProfileRow}>
                    <div className={styles.coordAvatarCircle}>P</div>
                    <div className={styles.coordInfoCol}>
                      <span className={styles.coordName}>{coordinator.name}</span>
                      <span className={styles.coordRole}>{coordinator.role}</span>
                    </div>
                  </div>

                  <div className={styles.coordContactGrid}>
                    <div className={styles.coordContactItem}>
                      <Phone size={14} color="#8C8479" />
                      <span>{coordinator.phone}</span>
                    </div>
                    <div className={styles.coordContactItem}>
                      <Mail size={14} color="#8C8479" />
                      <span>{coordinator.email}</span>
                    </div>
                  </div>
                </div>

                {/* Referral Status Card matching Reference 03 */}
                <div className={styles.sectionCard}>
                  <div className={styles.cardTopHeader}>
                    <div className={styles.cardHeaderInfo}>
                      <div className={`${styles.headerIconCircle} ${styles.iconOrange}`}>
                        <Link2 size={18} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitleText}>Referral status</h3>
                        <p className={styles.cardSubText}>
                          Current status of referrals to relevant services.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.cardActionLink}
                      onClick={() => setShowAckModal(true)}
                    >
                      <span>View referral</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className={styles.referralsList}>
                    {/* Item 1: CWC */}
                    <div className={styles.referralItemRow}>
                      <div className={styles.referralItemLeft}>
                        <Building size={14} color="#F45124" />
                        <span className={styles.referralName}>Child Welfare Committee</span>
                      </div>
                      <div className={styles.referralItemRight}>
                        <span className={`${styles.statusPill} ${styles.pillGreen}`}>
                          Acknowledged
                        </span>
                        <span className={styles.referralDate}>24 Apr 2018</span>
                      </div>
                    </div>

                    {/* Item 2: Medical Assessment */}
                    <div className={styles.referralItemRow}>
                      <div className={styles.referralItemLeft}>
                        <Heart size={14} color="#D97706" />
                        <span className={styles.referralName}>Medical Assessment</span>
                      </div>
                      <div className={styles.referralItemRight}>
                        <span className={`${styles.statusPill} ${styles.pillAmber}`}>
                          In Progress
                        </span>
                        <span className={styles.referralDate}>25 Apr 2018</span>
                      </div>
                    </div>

                    {/* Item 3: Counselling Support */}
                    <div className={styles.referralItemRow}>
                      <div className={styles.referralItemLeft}>
                        <HelpCircle size={14} color="#64748B" />
                        <span className={styles.referralName}>Counselling Support</span>
                      </div>
                      <div className={styles.referralItemRight}>
                        <span className={`${styles.statusPill} ${styles.pillGray}`}>Pending</span>
                        <span className={styles.referralDate}>-</span>
                      </div>
                    </div>

                    {/* Item 4: Education Support */}
                    <div className={styles.referralItemRow}>
                      <div className={styles.referralItemLeft}>
                        <FileText size={14} color="#64748B" />
                        <span className={styles.referralName}>Education Support</span>
                      </div>
                      <div className={styles.referralItemRight}>
                        <span className={`${styles.statusPill} ${styles.pillGray}`}>
                          Not yet referred
                        </span>
                        <span className={styles.referralDate}>-</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Approximate Area Visualizer (Map) Card matching Reference 03 */}
                <div className={styles.sectionCard}>
                  <div className={styles.cardTopHeader}>
                    <div className={styles.cardHeaderInfo}>
                      <div className={`${styles.headerIconCircle} ${styles.iconSlate}`}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitleText}>Location</h3>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.78rem', color: '#8C8479' }}>
                      Broad Sector Only
                    </span>
                  </div>

                  <div className={styles.mapBoxWrap}>
                    <div className={styles.mapContainer} ref={mapContainerRef} />

                    <div className={styles.mapLocationBadge}>
                      <span className={styles.mapBadgeTitle}>Indiranagar, Bengaluru</span>
                      <span className={styles.mapBadgeSubtitle}>Karnataka</span>
                    </div>

                    <div className={styles.mapSafeDisclaimer}>
                      <EyeOff size={11} />
                      <span>500m general zone · Child pinpoint restricted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Modal 1: Acknowledge Referral */}
        {showAckModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Acknowledge Referral</h2>
              <p className={styles.modalDesc}>
                Record statutory acknowledgement in the simulation from the District Child Welfare
                Committee (CWC). No external authority is contacted in this interactive prototype.
              </p>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Statutory Intake Notes</label>
                <textarea
                  className={styles.modalTextarea}
                  rows={3}
                  value={ackNotes}
                  onChange={e => setAckNotes(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.secondaryActionBtn}
                  onClick={() => setShowAckModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.primaryActionBtn}
                  onClick={handleAcknowledgeReferral}
                >
                  Confirm acknowledgement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: Assign Follow-up */}
        {showAssignModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Assign Follow-up Responsibility</h2>
              <p className={styles.modalDesc}>
                Designate a trained fictional child coordinator for on-ground verification and
                schedule the next statutory review window.
              </p>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Coordinator Name</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={assignName}
                  onChange={e => setAssignName(e.target.value)}
                />
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Role</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={assignRole}
                  onChange={e => setAssignRole(e.target.value)}
                />
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Follow-up Objective</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={assignReason}
                  onChange={e => setAssignReason(e.target.value)}
                />
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Next Review Due Date</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={assignReviewDate}
                  onChange={e => setAssignReviewDate(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.secondaryActionBtn}
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.primaryActionBtn}
                  onClick={handleAssignFollowUp}
                >
                  Save assignment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 3: Mark Need Addressed & Update Care Arrangement */}
        {showNeedsModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Update Immediate Needs & Care Arrangement</h2>
              <p className={styles.modalDesc}>
                Review and update individual need statuses and document temporary care arrangement
                progress in the prototype demo.
              </p>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Adult Supervision Status</label>
                <select
                  className={styles.modalSelect}
                  value={supervisionStatus}
                  onChange={e => setSupervisionStatus(e.target.value as NeedStatus)}
                >
                  <option value="in_place">In place (Supervised at partner shelter)</option>
                  <option value="needs_assessment">Needs assessment</option>
                  <option value="not_addressed">Not addressed</option>
                </select>
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Food and Drinking Water Status</label>
                <select
                  className={styles.modalSelect}
                  value={foodStatus}
                  onChange={e => setFoodStatus(e.target.value as NeedStatus)}
                >
                  <option value="support_coordinated">Support coordinated (Rations provided)</option>
                  <option value="pending">Pending</option>
                  <option value="not_addressed">Not addressed</option>
                </select>
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Medical Attention Status</label>
                <select
                  className={styles.modalSelect}
                  value={medicalStatus}
                  onChange={e => setMedicalStatus(e.target.value as NeedStatus)}
                >
                  <option value="not_confirmed">Not confirmed (Check recommended)</option>
                  <option value="addressed_in_demo">Addressed in demo (Checked by doctor)</option>
                  <option value="pending">Pending review</option>
                </select>
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Temporary Shelter Placement Status</label>
                <select
                  className={styles.modalSelect}
                  value={shelterStatus}
                  onChange={e => setShelterStatus(e.target.value as NeedStatus)}
                >
                  <option value="in_place">In place (Transit shelter confirmed)</option>
                  <option value="under_review">Under professional review</option>
                  <option value="needs_assessment">Needs assessment</option>
                  <option value="not_addressed">Not addressed</option>
                </select>
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Temporary Care Facility Name</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={shelterName}
                  onChange={e => setShelterName(e.target.value)}
                />
              </div>

              <div className={styles.modalFormGroup}>
                <label className={styles.modalLabel}>Care Arrangement Notes</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  value={shelterNotes}
                  onChange={e => setShelterNotes(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.secondaryActionBtn}
                  onClick={() => setShowNeedsModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.primaryActionBtn}
                  onClick={handleSaveNeedsAndArrangement}
                >
                  Save updates
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
