/**
 * CHILD SAFE CANONICAL DEMO DATA
 * UJAAS Crisis Care Network — Day 1 after the Snap (April 24, 2018)
 *
 * Case ID: UJAAS-CS-2018-001
 * Reporter: Aarav Sharma (Indiranagar, Bengaluru)
 */

import { ChildSafeguardingCase, ReferralCategory } from '../types/childSafe';

export const CANONICAL_CHILD_SAFE_DRAFT: Partial<ChildSafeguardingCase> = {
  concernType: 'child_unattended',
  observedAgeGroup: 'young_child',
  city: 'Bengaluru',
  neighbourhood: 'Indiranagar',
  landmark: 'Near 100ft Road Bus Stop, 4th Cross',
  approximateArea: 'Indiranagar, Bengaluru',
  factualObservations:
    'I noticed a young child (approx 4–6 years old) alone near the bus stop holding a doll. I waited nearby for 30 minutes, but no familiar caregiver or adult was visibly present. The child appears awake, alert, and responsive, but quiet.',
  observedCondition: ['appears_responsive'],
  presenceState: 'with_reporter',
  servicesContacted: 'not_contacted',
  servicesContactedDetails: '',
  contactPreference: 'phone'
};

export const CANONICAL_RECORDED_CHILD_CASE: ChildSafeguardingCase = {
  id: 'UJAAS-CS-2018-001',
  caseReference: 'UJAAS-CS-2018-001',
  reporterId: 'aarav',
  reporterName: 'Aarav Sharma',
  reporterRole: 'Community Volunteer · Indiranagar',
  reporterPhone: '+91 98450 23891',
  concernType: 'child_unattended',
  observedAgeGroup: 'young_child',
  city: 'Bengaluru',
  neighbourhood: 'Indiranagar',
  landmark: 'Near 100ft Road Bus Stop, 4th Cross',
  approximateArea: 'Indiranagar, Bengaluru',
  factualObservations:
    'I noticed a young child (approx 4–6 years old) alone near the bus stop holding a doll. I waited nearby for 30 minutes, but no familiar caregiver or adult was visibly present. The child appears awake, alert, and responsive, but quiet.',
  observedCondition: ['appears_responsive'],
  presenceState: 'with_reporter',
  servicesContacted: 'not_contacted',
  servicesContactedDetails: '',
  contactPreference: 'phone',
  status: 'recorded_local',
  createdAt: 'April 24, 2018, 14:30 IST',
  updatedAt: 'April 24, 2018, 14:30 IST',
  fictionalCoordinatorId: 'coord-ujaas-01',
  fictionalCoordinatorName: 'UJAAS Demonstration Coordinator',
  activityHistory: [
    {
      id: 'act-cs-01',
      caseId: 'UJAAS-CS-2018-001',
      timestamp: 'April 24, 2018, 14:30 IST',
      action: 'Concern recorded in prototype demonstration',
      actorRole: 'reporter',
      actorName: 'Aarav Sharma',
      newStatus: 'recorded_local',
      safeNote: 'Factual observations recorded locally by community reporter. Public map sharing restricted.'
    }
  ]
};

export const REFERRAL_CATEGORIES: {
  id: ReferralCategory;
  name: string;
  authority: string;
  description: string;
  safeguardScope: string;
}[] = [
  {
    id: 'child_protection',
    name: 'District Child Welfare Committee (CWC)',
    authority: 'Authorised Child Protection & Guardianship Unit',
    description: 'Statutory emergency body responsible for children in need of care, guardianship determination, and safe shelter placement.',
    safeguardScope: 'Immediate statutory safeguarding & emergency custody protocol.'
  },
  {
    id: 'emergency_response',
    name: 'Specialist Police Child Protection Unit / 100',
    authority: 'Bengaluru City Police Emergency Response (2018)',
    description: 'For immediate security, emergency rescue, or situations where urgent police presence is needed alongside child protection (Dial 100 in Bengaluru 2018).',
    safeguardScope: 'Active field response & physical security.'
  },
  {
    id: 'district_welfare',
    name: 'Department of Women & Child Development',
    authority: 'District Child Protection Unit (DCPU)',
    description: 'Community-level welfare tracking, family tracing, kinship searches, and temporary transit care home coordination.',
    safeguardScope: 'Family reunification & long-term welfare monitoring.'
  },
  {
    id: 'specialist_medical',
    name: 'Designated Pediatric Health Centre',
    authority: 'Government Health / Pediatric Facility',
    description: 'For pediatric evaluation, nutritional support, hydration check, or treatment of minor injuries in a safe clinical setting.',
    safeguardScope: 'Clinical assessment & medical clearance.'
  }
];

export const FICTIONAL_COORDINATOR_PROFILE = {
  id: 'coord-ujaas-01',
  name: 'UJAAS Demonstration Coordinator',
  role: 'Safeguarded Case Coordinator (Simulated)',
  division: 'East Bengaluru Crisis Coordination Team',
  badge: 'Restricted Demo Mode'
};
