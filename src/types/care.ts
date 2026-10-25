import { AssistanceRequest, HelpCategory, SafeguardingConcern } from './helpNow';
import { ChildSafeguardingCase } from './childSafe';

export type ViewType =
  | 'hero'
  | 'my_circle'
  | 'offer_help'
  | 'my_activity'
  | 'resources'
  | 'care_concern'
  | 'check_in'
  | 'check_in_result'
  | 'care_chain'
  | 'task_details'
  | 'task_progress'
  | 'recognition'
  | 'find_helper'
  | 'account_access'
  | 'onboarding'
  | 'user_profile'
  | 'emergency_info'
  | 'help_now_landing'
  | 'help_category_select'
  | 'help_request_form'
  | 'help_request_review'
  | 'help_matched_discovery'
  | 'help_request_tracker'
  | 'help_safeguard_concern'
  | 'help_assisted_report'
  | 'child_safe_entry'
  | 'child_safe_observation'
  | 'child_safe_review'
  | 'child_safe_recorded'
  | 'child_safe_coordinator'
  | 'child_safe_status';

export type ContactConcernStatus =
  | 'needs_review'
  | 'no_concern'
  | 'partially_resolved'
  | 'resolved';

export type ContactCheckInStatus =
  | 'unconfirmed'
  | 'pending'
  | 'confirmed';

export type VolunteerStatus =
  | 'available'
  | 'busy'
  | 'unavailable'
  | 'unknown'
  | 'needs_attention';

export interface Contact {
  id: string;
  name: string;
  age?: number;
  relationship: string;
  avatar: string;
  location: string;
  neighborhood?: string;
  checkInStatus: ContactCheckInStatus;
  concernStatus: ContactConcernStatus;
  volunteerStatus?: VolunteerStatus;
  distanceKm?: number;
  travelTimeText?: string;
  capabilities?: string[];
  usualCaregiver?: string;
  isUser?: boolean;
  notes?: string;
  phone?: string;
  coordinates: { xPct: number; yPct: number };
  geoCoordinates?: { lat: number; lng: number };
}

export type TaskStatus =
  | 'potential_need'
  | 'confirmed_unassigned'
  | 'assigned'
  | 'in_progress'
  | 'delivered_pending_confirmation'
  | 'confirmed_complete'
  | 'follow_up_required'
  | 'cancelled';

export interface TaskItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

export interface TaskTimeline {
  acceptedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  confirmedAt?: string;
}

export interface CareTask {
  id: string;
  recipientId: string;
  title: string;
  category: 'groceries' | 'medication' | 'transport';
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueWindow: string;
  status: TaskStatus;
  assignedHelperId: string | null;
  assignedHelperName: string | null;
  items?: TaskItem[];
  note?: string;
  timeline: TaskTimeline;
}

export interface CheckInRecord {
  contactId: string;
  method: 'call' | 'manual' | 'alternative';
  response: string;
  timestamp: string;
  safetyConfirmed: boolean;
  groceriesConfirmed: boolean;
  medicationConfirmed: boolean;
  transportConfirmed: boolean;
}

export interface CareAppState {
  currentView: ViewType;
  previousView: ViewType | null;
  selectedContactId: string | null;
  selectedTaskId: string | null;
  isDrawerOpen: boolean;
  isCommitmentModalOpen: boolean;
  isRecipientConfirmModalOpen: boolean;
  isAlternativeHelperModalOpen: boolean;
  isAlternativeContactModalOpen: boolean;
  isEscalationModalOpen: boolean;
  circleLayoutMode: 'map' | 'circle' | 'list';
  searchQuery: string;
  contacts: Record<string, Contact>;
  tasks: Record<string, CareTask>;
  checkInRecord: CheckInRecord | null;
  hasRecognitionShown: boolean;

  // Phase 04 Help Now State
  assistanceRequests: Record<string, AssistanceRequest>;
  activeAssistanceRequestId: string | null;
  safeguardingConcerns: SafeguardingConcern[];
  helpCategoryDraft: HelpCategory[];

  // Phase 05 Child Safe State
  childSafeCase: ChildSafeguardingCase | null;
  isCoordinatorDemoMode: boolean;
  childSafeDraft: Partial<ChildSafeguardingCase>;
}
