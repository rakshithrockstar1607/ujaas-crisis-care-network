export type HelpCategory =
  | 'food_water'
  | 'medication_access'
  | 'transport'
  | 'temporary_shelter'
  | 'check_in'
  | 'other';

export type HelpUrgency = 'today' | 'within_24_hours' | 'within_3_days';

export type HelpDeliveryCapability = 'can_receive' | 'needs_assistance';

export type HelpContactMethod = 'whatsapp' | 'phone_call' | 'sms';

export type HelpRequestStatus =
  | 'draft'
  | 'submitted'
  | 'invitation_pending'
  | 'assigned'
  | 'in_progress'
  | 'delivered_pending_confirmation'
  | 'confirmed_complete'
  | 'follow_up_required'
  | 'cancelled';

export interface AssistanceActivity {
  id: string;
  timestamp: string;
  action: string;
  actorName: string;
  description: string;
}

export interface AssistanceRecipientConfirmation {
  confirmed: boolean;
  timestamp: string;
  notes?: string;
  thanksMessage?: string;
}

export interface AssistanceRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterPhone: string;
  recipientId: string;
  recipientName: string;
  isSelfRecipient: boolean;
  recipientRelationship?: string;
  category: HelpCategory;
  selectedItems: string[];
  urgency: HelpUrgency;
  generalLocation: string;
  areaPincode: string;
  coordinates: { lat: number; lng: number };
  canReceiveDelivery: boolean;
  contactPreference: HelpContactMethod;
  notes: string;
  status: HelpRequestStatus;
  assignedHelperId: string | null;
  assignedHelperName: string | null;
  assignedHelperAvatar: string | null;
  assignedHelperPhone: string | null;
  assignedHelperDistance: string | null;
  createdAt: string;
  timeline: {
    submittedAt?: string;
    invitationSentAt?: string;
    assignedAt?: string;
    pickedUpAt?: string;
    deliveredAt?: string;
    confirmedAt?: string;
  };
  activityHistory: AssistanceActivity[];
  recipientConfirmation?: AssistanceRecipientConfirmation;
}

export interface ResourceListing {
  id: string;
  name: string;
  category: 'food' | 'medical' | 'shelter' | 'supplies';
  area: string;
  distanceKm: number;
  informationStatus: 'reported_open' | 'confirmation_pending' | 'outdated' | 'unknown';
  description: string;
  tags: string[];
  lat: number;
  lng: number;
  lastReportedAt: string;
  contactInfo?: string;
}

export interface MatchedHelper {
  id: string;
  name: string;
  avatar: string;
  neighbourhood: string;
  distanceKm: number;
  status: 'available_now' | 'busy' | 'unavailable';
  capabilities: string[];
  description: string;
  lat: number;
  lng: number;
  phone: string;
  isVerifiedVolunteer: boolean;
  isTrustedCircle: boolean;
}

export interface SafeguardingConcern {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterContact: string;
  concernType: 'infant_child' | 'vulnerable_adult' | 'immediate_danger' | 'other';
  approximateLocation: string;
  factualObservations: string;
  isPersonWithReporter: boolean;
  emergencyServicesContacted: boolean;
  createdAt: string;
  status: 'recorded' | 'referred' | 'in_review';
  caseReference: string;
}
