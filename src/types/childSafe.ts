/**
 * CHILD SAFE DOMAIN TYPES
 * Phase 05: Safeguarded Reporting, Responsible Referral & Confirmed Handoff
 * UJAAS Crisis Care Network (Post-Snap Bengaluru, 2018)
 *
 * Core Tenet: "A CHILD IS NOT A VOLUNTEER-MATCHING TASK"
 */

export type ChildConcernType =
  | 'child_unattended' // Child without an available caregiver
  | 'vulnerable_adult' // Vulnerable older adult
  | 'immediate_danger'; // Immediate danger / critical harm

export type ChildAgeGroup =
  | 'infant' // 0 - 1 year
  | 'toddler' // 1 - 3 years
  | 'young_child' // 4 - 6 years (Canonical demo child)
  | 'older_child' // 7 - 12 years
  | 'teen' // 13 - 17 years
  | 'unknown';

export type ChildPresenceState =
  | 'with_reporter' // Yes, the child is currently with me
  | 'not_with_reporter' // No, observed nearby but not in my custody
  | 'unsure_location'; // I'm not sure where the child is now

export type ChildConditionObservation =
  | 'appears_responsive' // Appears awake and responsive
  | 'appears_injured' // Appears visibly injured
  | 'appears_distressed' // Appears distressed or crying
  | 'unknown_condition'; // Immediate condition unknown

export type ServiceContactStatus =
  | 'contacted' // Yes, contacted emergency/childline
  | 'not_contacted' // No, have not contacted
  | 'unsure'; // Unsure if others contacted

export type ChildCaseStatus =
  | 'draft' // Initial in-progress form
  | 'recorded_local' // Saved locally in prototype
  | 'external_contact_reported' // Reporter indicated external service was contacted
  | 'demo_review_in_progress' // Simulated coordinator begun review
  | 'demo_referral_prepared' // Fictional referral prepared
  | 'demo_referral_acknowledged' // Simulated referral acknowledged
  | 'demo_handoff_documented' // Safe handoff documented in demo
  | 'follow_up_open' // Follow-up responsibility active
  | 'closed_in_demo'; // Closed within demo

export type ReferralCategory =
  | 'child_protection' // District Child Welfare Committee / Child Protection Unit
  | 'emergency_response' // Specialist Police Child Protection Unit / Bengaluru Emergency (100 in 2018)
  | 'district_welfare' // Social Welfare & Community Guardianship
  | 'specialist_medical'; // Medical / Pediatric Evaluation

export interface ChildCaseActivity {
  id: string;
  caseId: string;
  timestamp: string; // Fictional 2018 scenario time, e.g. "April 24, 2018, 14:30 IST"
  action: string;
  actorRole: 'reporter' | 'coordinator' | 'system' | 'external_referral';
  actorName: string;
  previousStatus?: ChildCaseStatus;
  newStatus?: ChildCaseStatus;
  safeNote?: string;
  isRestrictedToCoordinator?: boolean;
}

export interface ChildHandoffRecord {
  handoffCategory: string; // e.g. "Authorised District Child Welfare Unit"
  recipientRole: string; // e.g. "Designated Child Welfare Protection Officer"
  recipientOrganization: string; // e.g. "Fictional Demo Child Protection Unit, East Bengaluru"
  handoffTimestamp: string; // e.g. "April 24, 2018, 16:15 IST"
  notes: string;
  followUpRequired: boolean;
  followUpNote?: string;
}

export type NeedAssessmentAnswer = 'yes' | 'no' | 'not_sure';

export type NeedStatus =
  | 'not_addressed'
  | 'needs_assessment'
  | 'pending'
  | 'not_confirmed'
  | 'under_review'
  | 'in_place'
  | 'support_coordinated'
  | 'addressed_in_demo';

export interface ImmediateNeedsAssessment {
  supervision: NeedAssessmentAnswer;
  supervisionStatus: NeedStatus;
  foodAndWater: NeedAssessmentAnswer;
  foodStatus: NeedStatus;
  medicalAttention: NeedAssessmentAnswer;
  medicalStatus: NeedStatus;
  safeTemporaryShelter: NeedAssessmentAnswer;
  shelterStatus: NeedStatus;
}

export interface CareArrangementRecord {
  status: 'not_assessed' | 'under_professional_review' | 'in_place' | 'follow_up_required';
  placementName: string;
  notes: string;
  updatedAt: string;
}

export interface AssignedCoordinatorRecord {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  badge: string;
}

export interface ReferralItemRecord {
  id: string;
  serviceName: string;
  status: 'acknowledged' | 'in_progress' | 'pending' | 'not_yet_referred';
  date: string;
  notes?: string;
}

export interface ChildSafeguardingCase {
  id: string; // Stable canonical: "UJAAS-CS-2018-001"
  caseReference: string; // "UJAAS-CS-2018-001"
  reporterId: string;
  reporterName: string;
  reporterRole: string;
  reporterPhone: string;
  concernType: ChildConcernType;
  observedAgeGroup: ChildAgeGroup;
  city: string; // "Bengaluru"
  neighbourhood: string; // "Indiranagar"
  landmark: string; // "Near 100ft Road Bus Stop"
  approximateArea: string; // "Indiranagar, Bengaluru"
  factualObservations: string;
  observedCondition: ChildConditionObservation[];
  presenceState: ChildPresenceState;
  servicesContacted: ServiceContactStatus;
  servicesContactedDetails?: string;
  contactPreference: 'phone' | 'sms' | 'in_person' | 'callback';
  status: ChildCaseStatus;
  createdAt: string; // "April 24, 2018, 14:30 IST"
  updatedAt: string;

  // Child Care Continuity Extensions (Phase 07)
  childName?: string; // Optional, "Not known" or child's first name
  observedDateTime?: string; // e.g. "April 24, 2018, 14:00 IST"
  caregiverPresent?: 'yes' | 'no' | 'not_sure';
  immediateNeeds?: ImmediateNeedsAssessment;
  careArrangement?: CareArrangementRecord;
  assignedCoordinator?: AssignedCoordinatorRecord;
  nextReviewDue?: string; // e.g. "April 26, 2018"
  referralsList?: ReferralItemRecord[];

  // Coordinator Simulation & Safeguarded Boundary
  fictionalCoordinatorId?: string;
  fictionalCoordinatorName?: string;
  referralCategory?: ReferralCategory;
  referralNotes?: string;
  referralPreparedAt?: string;
  acknowledgementTimestamp?: string;
  acknowledgementNotes?: string;
  handoffRecord?: ChildHandoffRecord;
  followUpState?: {
    isOpen: boolean;
    requiredAction: string;
    targetDue: string;
    assignedRole: string;
  };

  activityHistory: ChildCaseActivity[];
}
