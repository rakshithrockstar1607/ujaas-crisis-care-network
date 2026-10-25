import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  ViewType,
  Contact,
  CareTask,
  CheckInRecord,
  CareAppState
} from '../types/care';
import {
  AssistanceRequest,
  HelpCategory,
  SafeguardingConcern,
  MatchedHelper,
  ResourceListing
} from '../types/helpNow';
import {
  ChildSafeguardingCase,
  ReferralCategory,
  ChildHandoffRecord
} from '../types/childSafe';
import { INITIAL_CARE_STATE, INITIAL_CONTACTS, INITIAL_TASKS } from '../data/careDemoData';
import { MATCHED_HELPERS, DEMO_RESOURCES, CANONICAL_NISHA_REQUEST } from '../data/helpNowDemoData';
import {
  CANONICAL_CHILD_SAFE_DRAFT,
  CANONICAL_RECORDED_CHILD_CASE,
  REFERRAL_CATEGORIES,
  FICTIONAL_COORDINATOR_PROFILE
} from '../data/childSafeDemoData';
import { useAccountContext } from './AccountContext';
import { getAssetUrl } from '../utils/assets';

const STORAGE_KEY = 'ujaas_phase2_care_state_v1';

interface CareContextValue {
  state: CareAppState;
  currentView: ViewType;
  contacts: Record<string, Contact>;
  tasks: Record<string, CareTask>;
  selectedContact: Contact | null;
  selectedTask: CareTask | null;
  isDrawerOpen: boolean;
  isCommitmentModalOpen: boolean;
  isRecipientConfirmModalOpen: boolean;
  isAlternativeHelperModalOpen: boolean;
  isAlternativeContactModalOpen: boolean;
  isEscalationModalOpen: boolean;
  circleLayoutMode: 'map' | 'circle' | 'list';
  searchQuery: string;
  checkInRecord: CheckInRecord | null;
  hasRecognitionShown: boolean;
  needsAttentionCount: number;
  noConcernCount: number;
  upcomingCheckInsCount: number;

  // Phase 04 Help Now State & Collections
  assistanceRequests: Record<string, AssistanceRequest>;
  activeAssistanceRequest: AssistanceRequest | null;
  activeAssistanceRequestId: string | null;
  safeguardingConcerns: SafeguardingConcern[];
  helpCategoryDraft: HelpCategory[];
  matchedHelpers: MatchedHelper[];
  resources: ResourceListing[];

  // Phase 04 Help Now Actions
  setHelpCategoryDraft: (categories: HelpCategory[]) => void;
  createAssistanceRequest: (req: Partial<AssistanceRequest>) => string;
  updateAssistanceRequest: (id: string, updates: Partial<AssistanceRequest>) => void;
  setActiveAssistanceRequest: (id: string | null) => void;
  inviteHelperToRequest: (requestId: string, helperId: string) => void;
  acceptHelperInvitation: (requestId: string, helperId: string) => void;
  declineHelperInvitation: (requestId: string, helperId: string) => void;
  advanceAssistanceProgress: (requestId: string, toStage: 'picked_up' | 'delivered') => void;
  confirmAssistanceDelivery: (requestId: string, received: boolean, note?: string) => void;
  reopenAssistanceRequest: (requestId: string) => void;
  submitSafeguardingConcern: (concern: Omit<SafeguardingConcern, 'id' | 'createdAt' | 'status' | 'caseReference'>) => string;
  resetHelpNowScenario: () => void;

  // Phase 05 Child Safe State & Actions
  childSafeCase: ChildSafeguardingCase | null;
  isCoordinatorDemoMode: boolean;
  childSafeDraft: Partial<ChildSafeguardingCase>;
  startChildSafeReport: (initialData?: Partial<ChildSafeguardingCase>) => void;
  updateChildSafeDraft: (patch: Partial<ChildSafeguardingCase>) => void;
  submitChildSafeCase: () => string;
  toggleCoordinatorDemoMode: (enabled?: boolean) => void;
  beginCoordinatorReview: () => void;
  prepareCoordinatorReferral: (category: ReferralCategory, notes: string) => void;
  simulateReferralAcknowledgement: (notes: string) => void;
  documentSimulatedHandoff: (record: ChildHandoffRecord) => void;
  resolveChildSafeFollowUp: (notes: string) => void;
  resetChildSafeScenario: () => void;

  // Actions
  navigateTo: (view: ViewType) => void;
  goBack: () => void;
  openContactDrawer: (contactId: string) => void;
  closeContactDrawer: () => void;
  performCheckIn: (method: 'call' | 'manual' | 'alternative', customNotes?: string) => void;
  openTaskDetails: (taskId: string) => void;
  openCommitmentModal: () => void;
  closeCommitmentModal: () => void;
  confirmCommitment: () => void;
  assignHelperToTask: (helperId: string, helperName: string) => void;
  advanceTaskProgress: (toStage: 'picked_up' | 'delivered') => void;
  openRecipientConfirmModal: () => void;
  closeRecipientConfirmModal: () => void;
  confirmRecipientReceipt: (received: boolean) => void;
  openAlternativeHelperModal: () => void;
  closeAlternativeHelperModal: () => void;
  openAlternativeContactModal: () => void;
  closeAlternativeContactModal: () => void;
  openEscalationModal: () => void;
  closeEscalationModal: () => void;
  setCircleLayoutMode: (mode: 'map' | 'circle' | 'list') => void;
  setSearchQuery: (query: string) => void;
  resetDemo: () => void;
}

const CareContext = createContext<CareContextValue | null>(null);

export const CareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeUser, isAarav } = useAccountContext();

  const [state, setState] = useState<CareAppState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...INITIAL_CARE_STATE,
            ...parsed,
            assistanceRequests: {
              ...INITIAL_CARE_STATE.assistanceRequests,
              ...(parsed.assistanceRequests || {})
            },
            activeAssistanceRequestId:
              parsed.activeAssistanceRequestId || INITIAL_CARE_STATE.activeAssistanceRequestId,
            safeguardingConcerns: parsed.safeguardingConcerns || [],
            helpCategoryDraft: parsed.helpCategoryDraft || ['food_water'],
            childSafeCase: parsed.childSafeCase !== undefined ? parsed.childSafeCase : INITIAL_CARE_STATE.childSafeCase,
            isCoordinatorDemoMode: false,
            childSafeDraft: parsed.childSafeDraft || INITIAL_CARE_STATE.childSafeDraft,
            // Keep modals closed on cold restore
            isDrawerOpen: false,
            isCommitmentModalOpen: false,
            isRecipientConfirmModalOpen: false,
            isAlternativeHelperModalOpen: false,
            isAlternativeContactModalOpen: false,
            isEscalationModalOpen: false
          };
        }
      } catch (err) {
        console.warn('Failed to restore care state from localStorage:', err);
      }
    }
    return INITIAL_CARE_STATE;
  });

  // Save state on mutation
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Failed to save care state to localStorage:', err);
    }
  }, [state]);

  const navigateTo = (view: ViewType) => {
    setState(prev => ({
      ...prev,
      previousView: prev.currentView,
      currentView: view
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setState(prev => {
      let target: ViewType = 'my_circle';
      if (prev.currentView === 'care_concern') target = 'my_circle';
      else if (prev.currentView === 'check_in') target = 'care_concern';
      else if (prev.currentView === 'check_in_result') target = 'care_concern';
      else if (prev.currentView === 'care_chain') target = 'my_circle';
      else if (prev.currentView === 'task_details') target = 'care_chain';
      else if (prev.currentView === 'find_helper') target = 'task_details';
      else if (prev.currentView === 'task_progress') target = 'care_chain';
      else if (prev.currentView === 'recognition') target = 'my_circle';
      else if (prev.currentView === 'help_now_landing') target = 'hero';
      else if (prev.currentView === 'help_category_select') target = 'help_now_landing';
      else if (prev.currentView === 'help_request_form') target = 'help_category_select';
      else if (prev.currentView === 'help_request_review') target = 'help_request_form';
      else if (prev.currentView === 'help_matched_discovery') target = 'help_now_landing';
      else if (prev.currentView === 'help_request_tracker') target = 'help_matched_discovery';
      else if (prev.currentView === 'help_safeguard_concern') target = 'help_now_landing';
      else if (prev.currentView === 'help_assisted_report') target = 'help_now_landing';
      else if (prev.currentView === 'child_safe_entry') target = 'help_now_landing';
      else if (prev.currentView === 'child_safe_observation') target = 'child_safe_entry';
      else if (prev.currentView === 'child_safe_review') target = 'child_safe_observation';
      else if (prev.currentView === 'child_safe_recorded') target = 'child_safe_entry';
      else if (prev.currentView === 'child_safe_coordinator') target = 'child_safe_status';
      else if (prev.currentView === 'child_safe_status') target = 'child_safe_recorded';
      else if (prev.previousView) target = prev.previousView;

      return {
        ...prev,
        previousView: prev.currentView,
        currentView: target
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactDrawer = (contactId: string) => {
    setState(prev => ({
      ...prev,
      selectedContactId: contactId,
      isDrawerOpen: true
    }));
  };

  const closeContactDrawer = () => {
    setState(prev => ({
      ...prev,
      isDrawerOpen: false
    }));
  };

  const performCheckIn = (method: 'call' | 'manual' | 'alternative', customNotes?: string) => {
    setState(prev => {
      const timestamp = 'Day 1 after Snap, 10:15 AM';
      const checkInRecord: CheckInRecord = {
        contactId: 'savitri',
        method,
        response:
          customNotes ||
          "I'm safe at home, beta. Meera hasn't been able to visit, and I'm running low on groceries, especially rice and vegetables. I could use some help this week.",
        timestamp,
        safetyConfirmed: true,
        groceriesConfirmed: true,
        medicationConfirmed: false,
        transportConfirmed: false
      };

      // Transition Savitri Amma & grocery task
      const updatedContacts = { ...prev.contacts };
      if (updatedContacts.savitri) {
        updatedContacts.savitri = {
          ...updatedContacts.savitri,
          checkInStatus: 'confirmed'
        };
      }

      const updatedTasks = { ...prev.tasks };
      if (updatedTasks['task-groceries']) {
        updatedTasks['task-groceries'] = {
          ...updatedTasks['task-groceries'],
          status: 'confirmed_unassigned'
        };
      }

      return {
        ...prev,
        checkInRecord,
        contacts: updatedContacts,
        tasks: updatedTasks,
        previousView: prev.currentView,
        currentView: 'check_in_result'
      };
    });
  };

  const openTaskDetails = (taskId: string) => {
    setState(prev => ({
      ...prev,
      selectedTaskId: taskId,
      previousView: prev.currentView,
      currentView: 'task_details'
    }));
  };

  const openCommitmentModal = () => {
    setState(prev => ({
      ...prev,
      isCommitmentModalOpen: true
    }));
  };

  const closeCommitmentModal = () => {
    setState(prev => ({
      ...prev,
      isCommitmentModalOpen: false
    }));
  };

  const confirmCommitment = () => {
    setState(prev => {
      const updatedTasks = { ...prev.tasks };
      const now = 'Today, 10:30 AM';
      if (updatedTasks['task-groceries']) {
        updatedTasks['task-groceries'] = {
          ...updatedTasks['task-groceries'],
          status: 'assigned',
          assignedHelperId: 'aarav',
          assignedHelperName: 'Aarav (You)',
          timeline: {
            ...updatedTasks['task-groceries'].timeline,
            acceptedAt: now
          }
        };
      }

      return {
        ...prev,
        tasks: updatedTasks,
        isCommitmentModalOpen: false,
        previousView: prev.currentView,
        currentView: 'task_progress'
      };
    });
  };

  const assignHelperToTask = (helperId: string, helperName: string) => {
    setState(prev => {
      const updatedTasks = { ...prev.tasks };
      const now = 'Today, 10:35 AM';
      if (updatedTasks['task-groceries']) {
        updatedTasks['task-groceries'] = {
          ...updatedTasks['task-groceries'],
          status: 'assigned',
          assignedHelperId: helperId,
          assignedHelperName: helperName,
          timeline: {
            ...updatedTasks['task-groceries'].timeline,
            acceptedAt: now
          }
        };
      }

      return {
        ...prev,
        tasks: updatedTasks,
        isCommitmentModalOpen: false,
        isAlternativeHelperModalOpen: false,
        previousView: prev.currentView,
        currentView: 'task_progress'
      };
    });
  };

  const advanceTaskProgress = (toStage: 'picked_up' | 'delivered') => {
    setState(prev => {
      const updatedTasks = { ...prev.tasks };
      const task = updatedTasks['task-groceries'];
      if (!task) return prev;

      if (toStage === 'picked_up') {
        task.status = 'in_progress';
        task.timeline.pickedUpAt = 'Today, 11:45 AM';
      } else if (toStage === 'delivered') {
        task.status = 'delivered_pending_confirmation';
        task.timeline.deliveredAt = 'Today, 1:15 PM';
      }

      return {
        ...prev,
        tasks: updatedTasks
      };
    });
  };

  const openRecipientConfirmModal = () => {
    setState(prev => ({
      ...prev,
      isRecipientConfirmModalOpen: true
    }));
  };

  const closeRecipientConfirmModal = () => {
    setState(prev => ({
      ...prev,
      isRecipientConfirmModalOpen: false
    }));
  };

  const confirmRecipientReceipt = (received: boolean) => {
    setState(prev => {
      const updatedTasks = { ...prev.tasks };
      const updatedContacts = { ...prev.contacts };
      const task = updatedTasks['task-groceries'];

      if (!task) return prev;

      if (received) {
        task.status = 'confirmed_complete';
        task.timeline.confirmedAt = 'Today, 1:20 PM';

        // Update Savitri Amma's status to partially resolved
        if (updatedContacts.savitri) {
          updatedContacts.savitri = {
            ...updatedContacts.savitri,
            concernStatus: 'partially_resolved'
          };
        }

        return {
          ...prev,
          tasks: updatedTasks,
          contacts: updatedContacts,
          isRecipientConfirmModalOpen: false,
          hasRecognitionShown: true,
          previousView: prev.currentView,
          currentView: 'recognition'
        };
      } else {
        task.status = 'follow_up_required';
        return {
          ...prev,
          tasks: updatedTasks,
          isRecipientConfirmModalOpen: false
        };
      }
    });
  };

  const openAlternativeHelperModal = () => {
    setState(prev => ({ ...prev, isAlternativeHelperModalOpen: true }));
  };

  const closeAlternativeHelperModal = () => {
    setState(prev => ({ ...prev, isAlternativeHelperModalOpen: false }));
  };

  const openAlternativeContactModal = () => {
    setState(prev => ({ ...prev, isAlternativeContactModalOpen: true }));
  };

  const closeAlternativeContactModal = () => {
    setState(prev => ({ ...prev, isAlternativeContactModalOpen: false }));
  };

  const openEscalationModal = () => {
    setState(prev => ({ ...prev, isEscalationModalOpen: true }));
  };

  const closeEscalationModal = () => {
    setState(prev => ({ ...prev, isEscalationModalOpen: false }));
  };

  const setCircleLayoutMode = (mode: 'map' | 'circle' | 'list') => {
    setState(prev => ({ ...prev, circleLayoutMode: mode }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const resetDemo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setState({
      ...INITIAL_CARE_STATE,
      contacts: { ...INITIAL_CONTACTS },
      tasks: { ...INITIAL_TASKS },
      assistanceRequests: {
        'req-nisha-food-01': CANONICAL_NISHA_REQUEST
      },
      activeAssistanceRequestId: 'req-nisha-food-01',
      safeguardingConcerns: [],
      helpCategoryDraft: ['food_water']
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Phase 04 Help Now Handlers
  const setHelpCategoryDraft = (categories: HelpCategory[]) => {
    setState(prev => ({
      ...prev,
      helpCategoryDraft: categories
    }));
  };

  const createAssistanceRequest = (req: Partial<AssistanceRequest>): string => {
    const id = req.id || `req-${Date.now().toString().slice(-6)}`;
    const now = 'Today, 10:14 AM';
    const newRequest: AssistanceRequest = {
      id,
      requesterId: req.requesterId || activeUser?.id || 'guest',
      requesterName:
        req.requesterName ||
        (activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Nisha Rao'),
      requesterPhone: req.requesterPhone || activeUser?.phone || '+91 98450 12345',
      recipientId: req.recipientId || req.requesterId || activeUser?.id || 'guest',
      recipientName:
        req.recipientName ||
        (activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Nisha Rao'),
      isSelfRecipient: req.isSelfRecipient !== undefined ? req.isSelfRecipient : true,
      recipientRelationship: req.recipientRelationship || 'Self',
      category: req.category || 'food_water',
      selectedItems:
        req.selectedItems && req.selectedItems.length > 0
          ? req.selectedItems
          : ['Rice', 'Dal', 'Vegetables', 'Drinking water'],
      urgency: req.urgency || 'today',
      generalLocation:
        req.generalLocation ||
        (activeUser ? `${activeUser.neighbourhood}, ${activeUser.city}` : 'Indiranagar, Bengaluru'),
      areaPincode: req.areaPincode || '560038',
      coordinates: req.coordinates || { lat: 12.9716, lng: 77.6412 },
      canReceiveDelivery: req.canReceiveDelivery !== undefined ? req.canReceiveDelivery : true,
      contactPreference: req.contactPreference || 'whatsapp',
      notes:
        req.notes ||
        "We are a family of 3. Need basic groceries and drinking water. Our building doesn't have a lift, please call on WhatsApp before delivery.",
      status: 'submitted',
      assignedHelperId: null,
      assignedHelperName: null,
      assignedHelperAvatar: null,
      assignedHelperPhone: null,
      assignedHelperDistance: null,
      createdAt: now,
      timeline: {
        submittedAt: now
      },
      activityHistory: [
        {
          id: `act-${Date.now()}-1`,
          timestamp: now,
          action: 'Request recorded',
          actorName: req.requesterName || (activeUser ? activeUser.firstName : 'Nisha Rao'),
          description: `Assistance request recorded for food and drinking water in Indiranagar.`
        }
      ]
    };

    setState(prev => ({
      ...prev,
      assistanceRequests: {
        ...prev.assistanceRequests,
        [id]: newRequest
      },
      activeAssistanceRequestId: id,
      previousView: prev.currentView,
      currentView: 'help_matched_discovery'
    }));

    return id;
  };

  const updateAssistanceRequest = (id: string, updates: Partial<AssistanceRequest>) => {
    setState(prev => {
      const existing = prev.assistanceRequests[id];
      if (!existing) return prev;
      return {
        ...prev,
        assistanceRequests: {
          ...prev.assistanceRequests,
          [id]: { ...existing, ...updates }
        }
      };
    });
  };

  const setActiveAssistanceRequest = (id: string | null) => {
    setState(prev => ({
      ...prev,
      activeAssistanceRequestId: id
    }));
  };

  const inviteHelperToRequest = (requestId: string, helperId: string) => {
    setState(prev => {
      const existing = prev.assistanceRequests[requestId];
      if (!existing) return prev;
      const helper = MATCHED_HELPERS.find(h => h.id === helperId) || {
        name: 'Aarav Sharma',
        avatar: getAssetUrl('/images/contacts/aarav.png'),
        phone: '+91 98765 43210',
        distanceKm: 1.2
      };
      const now = 'Today, 10:18 AM';

      const updatedRequest: AssistanceRequest = {
        ...existing,
        status: 'invitation_pending',
        assignedHelperId: helperId,
        assignedHelperName: helper.name,
        assignedHelperAvatar: helper.avatar,
        assignedHelperPhone: helper.phone,
        assignedHelperDistance: `${helper.distanceKm} km away`,
        timeline: {
          ...existing.timeline,
          invitationSentAt: now
        },
        activityHistory: [
          ...existing.activityHistory,
          {
            id: `act-${Date.now()}-inv`,
            timestamp: now,
            action: 'Invitation sent',
            actorName: existing.requesterName,
            description: `Assistance invitation sent to ${helper.name}. Waiting for helper acceptance.`
          }
        ]
      };

      return {
        ...prev,
        assistanceRequests: {
          ...prev.assistanceRequests,
          [requestId]: updatedRequest
        },
        previousView: prev.currentView,
        currentView: 'help_request_tracker'
      };
    });
  };

  const acceptHelperInvitation = (requestId: string, helperId: string) => {
    setState(prev => {
      const existing = prev.assistanceRequests[requestId];
      if (!existing) return prev;
      // Prevent acceptance if not invitation_pending, or cancelled, or confirmed
      if (existing.status !== 'invitation_pending') return prev;
      const helper = MATCHED_HELPERS.find(h => h.id === helperId) || {
        name: 'Aarav Sharma',
        avatar: getAssetUrl('/images/contacts/aarav.png'),
        phone: '+91 98765 43210',
        distanceKm: 1.2
      };
      const now = 'Today, 10:22 AM';

      const updatedRequest: AssistanceRequest = {
        ...existing,
        status: 'assigned',
        assignedHelperId: helperId,
        assignedHelperName: helper.name,
        assignedHelperAvatar: helper.avatar,
        assignedHelperPhone: helper.phone,
        assignedHelperDistance: `${helper.distanceKm} km away`,
        timeline: {
          ...existing.timeline,
          assignedAt: now
        },
        activityHistory: [
          ...existing.activityHistory,
          {
            id: `act-${Date.now()}-acc`,
            timestamp: now,
            action: 'Responsibility accepted',
            actorName: helper.name,
            description: `${helper.name} accepted responsibility to collect and deliver the requested items.`
          }
        ]
      };

      return {
        ...prev,
        assistanceRequests: {
          ...prev.assistanceRequests,
          [requestId]: updatedRequest
        },
        previousView: prev.currentView,
        currentView: 'help_request_tracker'
      };
    });
  };

  const declineHelperInvitation = (requestId: string, _helperId: string) => {
    setState(prev => {
      const existing = prev.assistanceRequests[requestId];
      if (!existing) return prev;
      const now = 'Today, 10:20 AM';

      const updatedRequest: AssistanceRequest = {
        ...existing,
        status: 'submitted',
        assignedHelperId: null,
        assignedHelperName: null,
        assignedHelperAvatar: null,
        assignedHelperPhone: null,
        assignedHelperDistance: null,
        activityHistory: [
          ...existing.activityHistory,
          {
            id: `act-${Date.now()}-dec`,
            timestamp: now,
            action: 'Helper unavailable',
            actorName: existing.assignedHelperName || 'Aarav Sharma',
            description:
              'Helper declined due to overlapping commitments. The request remains open for other community helpers.'
          }
        ]
      };

      return {
        ...prev,
        assistanceRequests: {
          ...prev.assistanceRequests,
          [requestId]: updatedRequest
        }
      };
    });
  };

  const advanceAssistanceProgress = (
    requestId: string,
    toStage: 'picked_up' | 'delivered'
  ) => {
    setState(prev => {
      const existing = prev.assistanceRequests[requestId];
      if (!existing || !existing.assignedHelperId || existing.status === 'confirmed_complete' || existing.status === 'cancelled') return prev;

      if (toStage === 'picked_up') {
        if (existing.status !== 'assigned') return prev;
        const now = 'Today, 10:36 AM';
        const updatedRequest: AssistanceRequest = {
          ...existing,
          status: 'in_progress',
          timeline: {
            ...existing.timeline,
            pickedUpAt: now
          },
          activityHistory: [
            ...existing.activityHistory,
            {
              id: `act-${Date.now()}-pick`,
              timestamp: now,
              action: 'Items collected',
              actorName: existing.assignedHelperName || 'Aarav Sharma',
              description:
                'Groceries and drinking water collected from local distribution point. En route to recipient.'
            }
          ]
        };
        return {
          ...prev,
          assistanceRequests: {
            ...prev.assistanceRequests,
            [requestId]: updatedRequest
          }
        };
      } else if (toStage === 'delivered') {
        if (existing.status !== 'in_progress') return prev;
        const now = 'Today, 10:54 AM';
        const updatedRequest: AssistanceRequest = {
          ...existing,
          status: 'delivered_pending_confirmation',
          timeline: {
            ...existing.timeline,
            deliveredAt: now
          },
          activityHistory: [
            ...existing.activityHistory,
            {
              id: `act-${Date.now()}-del`,
              timestamp: now,
              action: 'Delivery reported',
              actorName: existing.assignedHelperName || 'Aarav Sharma',
              description: 'Helper has delivered items at the location. Awaiting recipient confirmation.'
            }
          ]
        };
        return {
          ...prev,
          assistanceRequests: {
            ...prev.assistanceRequests,
            [requestId]: updatedRequest
          }
        };
      }
      return prev;
    });
  };

  const confirmAssistanceDelivery = (
    requestId: string,
    received: boolean,
    note?: string
  ) => {
    setState(prev => {
      const existing = prev.assistanceRequests[requestId];
      if (!existing) return prev;
      if (existing.status !== 'delivered_pending_confirmation' && existing.status !== 'in_progress') return prev;

      if (received) {
        const now = 'Today, 10:56 AM';
        const updatedRequest: AssistanceRequest = {
          ...existing,
          status: 'confirmed_complete',
          timeline: {
            ...existing.timeline,
            confirmedAt: now
          },
          recipientConfirmation: {
            confirmed: true,
            timestamp: now,
            notes: note || 'All items arrived safely. Thank you so much!',
            thanksMessage: 'Thank you so much! This really helps our family.'
          },
          activityHistory: [
            ...existing.activityHistory,
            {
              id: `act-${Date.now()}-conf`,
              timestamp: now,
              action: 'Confirmed and completed',
              actorName: existing.recipientName,
              description:
                'Recipient confirmed receipt of requested groceries and drinking water. A Promise Kept.'
            }
          ]
        };
        return {
          ...prev,
          assistanceRequests: {
            ...prev.assistanceRequests,
            [requestId]: updatedRequest
          }
        };
      } else {
        const now = 'Today, 10:58 AM';
        const updatedRequest: AssistanceRequest = {
          ...existing,
          status: 'follow_up_required',
          recipientConfirmation: {
            confirmed: false,
            timestamp: now,
            notes: note || 'Items have not yet arrived or there was a handoff problem.'
          },
          activityHistory: [
            ...existing.activityHistory,
            {
              id: `act-${Date.now()}-iss`,
              timestamp: now,
              action: 'Delivery problem reported',
              actorName: existing.recipientName,
              description:
                'Recipient reported that items were not received. Coordination follow-up required.'
            }
          ]
        };
        return {
          ...prev,
          assistanceRequests: {
            ...prev.assistanceRequests,
            [requestId]: updatedRequest
          }
        };
      }
    });
  };

  const reopenAssistanceRequest = (requestId: string) => {
    setState(prev => {
      const existing = prev.assistanceRequests[requestId];
      if (!existing) return prev;
      const now = 'Today, 11:05 AM';
      const updatedRequest: AssistanceRequest = {
        ...existing,
        status: 'submitted',
        assignedHelperId: null,
        assignedHelperName: null,
        assignedHelperAvatar: null,
        assignedHelperPhone: null,
        assignedHelperDistance: null,
        activityHistory: [
          ...existing.activityHistory,
          {
            id: `act-${Date.now()}-reopen`,
            timestamp: now,
            action: 'Request re-opened for nearby volunteers',
            actorName: existing.recipientName,
            description:
              'Request re-opened for community volunteers following unresolved delivery attempt.'
          }
        ]
      };
      return {
        ...prev,
        assistanceRequests: {
          ...prev.assistanceRequests,
          [requestId]: updatedRequest
        }
      };
    });
  };

  const submitSafeguardingConcern = (
    concernData: Omit<SafeguardingConcern, 'id' | 'createdAt' | 'status' | 'caseReference'>
  ): string => {
    const id = `safe-${Date.now()}`;
    const ref = `UJAAS-SAFE-2018-${Math.floor(1000 + Math.random() * 9000)}`;
    const newConcern: SafeguardingConcern = {
      ...concernData,
      id,
      createdAt: 'Today, Just now',
      status: 'recorded',
      caseReference: ref
    };
    setState(prev => ({
      ...prev,
      safeguardingConcerns: [newConcern, ...prev.safeguardingConcerns]
    }));
    return ref;
  };

  // Phase 05 Child Safe Action Handlers
  const startChildSafeReport = (initialData?: Partial<ChildSafeguardingCase>) => {
    setState(prev => ({
      ...prev,
      childSafeDraft: {
        ...CANONICAL_CHILD_SAFE_DRAFT,
        ...initialData
      },
      previousView: prev.currentView,
      currentView: 'child_safe_entry'
    }));
  };

  const updateChildSafeDraft = (patch: Partial<ChildSafeguardingCase>) => {
    setState(prev => ({
      ...prev,
      childSafeDraft: {
        ...prev.childSafeDraft,
        ...patch
      }
    }));
  };

  const submitChildSafeCase = (): string => {
    const caseId = 'UJAAS-CS-2018-001';
    const now = 'April 24, 2018, 14:30 IST';
    setState(prev => {
      const draft = prev.childSafeDraft || {};
      const newCase: ChildSafeguardingCase = {
        id: caseId,
        caseReference: caseId,
        reporterId: activeUser?.id || 'aarav',
        reporterName: activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Aarav Sharma',
        reporterRole: isAarav ? 'Community Volunteer · Indiranagar' : 'Community Member',
        reporterPhone: activeUser?.phone || '+91 98450 23891',
        concernType: draft.concernType || 'child_unattended',
        observedAgeGroup: draft.observedAgeGroup || 'young_child',
        city: draft.city || 'Bengaluru',
        neighbourhood: draft.neighbourhood || 'Indiranagar',
        landmark: draft.landmark || 'Near 100ft Road Bus Stop, 4th Cross',
        approximateArea: draft.approximateArea || 'Indiranagar, Bengaluru',
        factualObservations:
          draft.factualObservations ||
          'I noticed a young child (approx 4–6 years old) alone near the bus stop holding a doll. I waited nearby for 30 minutes, but no familiar caregiver or adult was visibly present. The child appears awake, alert, and responsive, but quiet.',
        observedCondition: draft.observedCondition || ['appears_responsive'],
        presenceState: draft.presenceState || 'with_reporter',
        servicesContacted: draft.servicesContacted || 'not_contacted',
        servicesContactedDetails: draft.servicesContactedDetails || '',
        contactPreference: draft.contactPreference || 'phone',
        status: 'recorded_local',
        createdAt: now,
        updatedAt: now,
        fictionalCoordinatorId: FICTIONAL_COORDINATOR_PROFILE.id,
        fictionalCoordinatorName: FICTIONAL_COORDINATOR_PROFILE.name,
        activityHistory: [
          {
            id: `act-cs-${Date.now()}-1`,
            caseId,
            timestamp: now,
            action: 'Concern recorded in prototype demonstration',
            actorRole: 'reporter',
            actorName: activeUser ? `${activeUser.firstName} ${activeUser.lastName || ''}`.trim() : 'Aarav Sharma',
            newStatus: 'recorded_local',
            safeNote: 'Factual observations recorded locally by community reporter. Public map sharing restricted.'
          }
        ]
      };
      return {
        ...prev,
        childSafeCase: newCase,
        previousView: prev.currentView,
        currentView: 'child_safe_recorded'
      };
    });
    return caseId;
  };

  const toggleCoordinatorDemoMode = (enabled?: boolean) => {
    setState(prev => {
      const nextMode = enabled !== undefined ? enabled : !prev.isCoordinatorDemoMode;
      return {
        ...prev,
        isCoordinatorDemoMode: nextMode,
        previousView: prev.currentView,
        currentView: nextMode ? 'child_safe_coordinator' : 'child_safe_status'
      };
    });
  };

  const beginCoordinatorReview = () => {
    setState(prev => {
      if (!prev.childSafeCase) return prev;
      const now = 'April 24, 2018, 14:45 IST';
      const updatedCase: ChildSafeguardingCase = {
        ...prev.childSafeCase,
        status: 'demo_review_in_progress',
        updatedAt: now,
        activityHistory: [
          ...prev.childSafeCase.activityHistory,
          {
            id: `act-cs-${Date.now()}-rev`,
            caseId: prev.childSafeCase.id,
            timestamp: now,
            action: 'Simulated coordinator review initiated',
            actorRole: 'coordinator',
            actorName: FICTIONAL_COORDINATOR_PROFILE.name,
            previousStatus: prev.childSafeCase.status,
            newStatus: 'demo_review_in_progress',
            safeNote: 'Sensitive details verified. Identifying information safeguarded from public community feeds.'
          }
        ]
      };
      return {
        ...prev,
        childSafeCase: updatedCase
      };
    });
  };

  const prepareCoordinatorReferral = (category: ReferralCategory, notes: string) => {
    setState(prev => {
      if (!prev.childSafeCase) return prev;
      const now = 'April 24, 2018, 15:10 IST';
      const categoryItem = REFERRAL_CATEGORIES.find(c => c.id === category);
      const updatedCase: ChildSafeguardingCase = {
        ...prev.childSafeCase,
        status: 'demo_referral_prepared',
        referralCategory: category,
        referralNotes: notes,
        referralPreparedAt: now,
        updatedAt: now,
        activityHistory: [
          ...prev.childSafeCase.activityHistory,
          {
            id: `act-cs-${Date.now()}-ref`,
            caseId: prev.childSafeCase.id,
            timestamp: now,
            action: `Referral dossier prepared: ${categoryItem?.name || category}`,
            actorRole: 'coordinator',
            actorName: FICTIONAL_COORDINATOR_PROFILE.name,
            previousStatus: prev.childSafeCase.status,
            newStatus: 'demo_referral_prepared',
            safeNote: notes || 'Standardized safeguarding briefing prepared for authorised statutory responders.'
          }
        ]
      };
      return {
        ...prev,
        childSafeCase: updatedCase
      };
    });
  };

  const simulateReferralAcknowledgement = (notes: string) => {
    setState(prev => {
      if (!prev.childSafeCase) return prev;
      const now = 'April 24, 2018, 15:35 IST';
      const updatedCase: ChildSafeguardingCase = {
        ...prev.childSafeCase,
        status: 'demo_referral_acknowledged',
        acknowledgementTimestamp: now,
        acknowledgementNotes: notes,
        updatedAt: now,
        activityHistory: [
          ...prev.childSafeCase.activityHistory,
          {
            id: `act-cs-${Date.now()}-ack`,
            caseId: prev.childSafeCase.id,
            timestamp: now,
            action: 'Simulated statutory receipt & duty officer acknowledgement',
            actorRole: 'external_referral',
            actorName: 'Designated Child Protection Duty Officer (Simulated)',
            previousStatus: prev.childSafeCase.status,
            newStatus: 'demo_referral_acknowledged',
            safeNote: notes || 'Formal statutory intake acknowledged within simulation. Designated child protection officer dispatched to area.'
          }
        ]
      };
      return {
        ...prev,
        childSafeCase: updatedCase
      };
    });
  };

  const documentSimulatedHandoff = (record: ChildHandoffRecord) => {
    setState(prev => {
      if (!prev.childSafeCase) return prev;
      const now = record.handoffTimestamp || 'April 24, 2018, 16:15 IST';
      const updatedCase: ChildSafeguardingCase = {
        ...prev.childSafeCase,
        status: 'demo_handoff_documented',
        handoffRecord: record,
        updatedAt: now,
        followUpState: record.followUpRequired
          ? {
              isOpen: true,
              requiredAction: record.followUpNote || 'Family tracing in progress with Indiranagar community point. Kinship verification pending.',
              targetDue: 'Within 24 hours (April 25, 2018)',
              assignedRole: record.recipientRole
            }
          : undefined,
        activityHistory: [
          ...prev.childSafeCase.activityHistory,
          {
            id: `act-cs-${Date.now()}-hand`,
            caseId: prev.childSafeCase.id,
            timestamp: now,
            action: `Safe handoff documented to ${record.recipientRole}`,
            actorRole: 'coordinator',
            actorName: FICTIONAL_COORDINATOR_PROFILE.name,
            previousStatus: prev.childSafeCase.status,
            newStatus: 'demo_handoff_documented',
            safeNote: `${record.notes} (Follow-up required: ${record.followUpRequired ? 'Yes' : 'No'})`
          }
        ]
      };
      return {
        ...prev,
        childSafeCase: updatedCase
      };
    });
  };

  const resolveChildSafeFollowUp = (notes: string) => {
    setState(prev => {
      if (!prev.childSafeCase) return prev;
      const now = 'April 24, 2018, 17:30 IST';
      const updatedCase: ChildSafeguardingCase = {
        ...prev.childSafeCase,
        status: 'closed_in_demo',
        updatedAt: now,
        followUpState: prev.childSafeCase.followUpState
          ? {
              ...prev.childSafeCase.followUpState,
              isOpen: false,
              requiredAction: `Follow-up resolved: ${notes}`
            }
          : undefined,
        activityHistory: [
          ...prev.childSafeCase.activityHistory,
          {
            id: `act-cs-${Date.now()}-fol`,
            caseId: prev.childSafeCase.id,
            timestamp: now,
            action: 'Follow-up actions concluded in demo simulation',
            actorRole: 'coordinator',
            actorName: FICTIONAL_COORDINATOR_PROFILE.name,
            previousStatus: prev.childSafeCase.status,
            newStatus: 'closed_in_demo',
            safeNote: notes || 'Family tracing confirmed maternal aunt in Halasuru. Custody transfer protocol completed under Child Welfare Committee oversight.'
          }
        ]
      };
      return {
        ...prev,
        childSafeCase: updatedCase
      };
    });
  };

  const resetChildSafeScenario = () => {
    setState(prev => ({
      ...prev,
      childSafeCase: CANONICAL_RECORDED_CHILD_CASE,
      isCoordinatorDemoMode: false,
      childSafeDraft: CANONICAL_CHILD_SAFE_DRAFT,
      currentView: 'child_safe_entry'
    }));
  };

  const resetHelpNowScenario = () => {
    setState(prev => ({
      ...prev,
      assistanceRequests: {
        'req-nisha-food-01': {
          ...CANONICAL_NISHA_REQUEST,
          status: 'submitted',
          assignedHelperId: null,
          assignedHelperName: null,
          assignedHelperAvatar: null,
          assignedHelperPhone: null,
          assignedHelperDistance: null,
          timeline: {
            submittedAt: 'Today, 10:14 AM'
          },
          activityHistory: [
            {
              id: 'act-01',
              timestamp: 'Today, 10:14 AM',
              action: 'Request recorded',
              actorName: 'Nisha Rao',
              description: 'Need for food and drinking water specified.'
            }
          ]
        }
      },
      activeAssistanceRequestId: 'req-nisha-food-01',
      helpCategoryDraft: ['food_water'],
      currentView: 'help_now_landing'
    }));
  };

  const effectiveMatchedHelpers = useMemo(() => {
    const nishaReq = state.assistanceRequests['req-nisha-food-01'];
    const isAaravBusyWithNisha =
      nishaReq &&
      nishaReq.assignedHelperId === 'aarav' &&
      (nishaReq.status === 'assigned' ||
        nishaReq.status === 'in_progress' ||
        nishaReq.status === 'delivered_pending_confirmation');

    return MATCHED_HELPERS.map(h => {
      if (h.id === 'aarav' && isAaravBusyWithNisha) {
        return {
          ...h,
          status: 'busy' as const,
          description: 'Fulfilling grocery delivery for Nisha Rao in Indiranagar.'
        };
      }
      return h;
    });
  }, [state.assistanceRequests]);

  // Derive counts
  const savitriConcern = state.contacts.savitri?.concernStatus;
  const needsAttentionCount = savitriConcern === 'needs_review' ? 1 : 0;
  const noConcernCount = 5 + (savitriConcern === 'partially_resolved' ? 1 : 0);
  const upcomingCheckInsCount = state.tasks['task-groceries']?.status === 'confirmed_complete' ? 1 : 2;

  const effectiveContacts = useMemo(() => {
    if (!activeUser || isAarav) {
      return state.contacts;
    }
    // Custom user active
    const customUserContact: Contact = {
      id: activeUser.id,
      name: `${activeUser.firstName} (You)`,
      relationship: 'Self',
      avatar: getAssetUrl(activeUser.avatar || '/images/contacts/aarav.png'),
      location: `${activeUser.neighbourhood}, ${activeUser.city}`,
      neighborhood: activeUser.neighbourhood,
      checkInStatus: 'confirmed',
      concernStatus: 'no_concern',
      volunteerStatus:
        activeUser.helperAvailability === 'available_now'
          ? 'available'
          : activeUser.helperAvailability === 'unavailable_for_now'
          ? 'unavailable'
          : 'busy',
      isUser: true,
      coordinates: { xPct: 50, yPct: 50 },
      geoCoordinates:
        activeUser.neighbourhood === 'Domlur'
          ? { lat: 12.9609, lng: 77.6387 }
          : activeUser.neighbourhood === 'Koramangala'
          ? { lat: 12.9352, lng: 77.6245 }
          : activeUser.neighbourhood === 'HAL 2nd Stage'
          ? { lat: 12.9654, lng: 77.6534 }
          : { lat: 12.9716, lng: 77.6412 },
      capabilities:
        activeUser.helperCapabilities?.map(c => c.replace(/_/g, ' ')) || [
          'Groceries & Essentials',
          'Check-ins'
        ]
    };

    const newMap: Record<string, Contact> = {
      ...state.contacts,
      aarav: {
        ...state.contacts.aarav,
        name: 'Aarav Sharma',
        relationship: 'Grandson · Volunteer',
        isUser: false
      },
      [activeUser.id]: customUserContact
    };
    return newMap;
  }, [state.contacts, activeUser, isAarav]);

  const selectedContact = state.selectedContactId ? effectiveContacts[state.selectedContactId] || null : null;
  const selectedTask = state.selectedTaskId ? state.tasks[state.selectedTaskId] || null : null;
  const activeAssistanceRequest = state.activeAssistanceRequestId
    ? state.assistanceRequests[state.activeAssistanceRequestId] || null
    : null;

  const value: CareContextValue = {
    state,
    currentView: state.currentView,
    contacts: effectiveContacts,
    tasks: state.tasks,
    selectedContact,
    selectedTask,
    isDrawerOpen: state.isDrawerOpen,
    isCommitmentModalOpen: state.isCommitmentModalOpen,
    isRecipientConfirmModalOpen: state.isRecipientConfirmModalOpen,
    isAlternativeHelperModalOpen: state.isAlternativeHelperModalOpen,
    isAlternativeContactModalOpen: state.isAlternativeContactModalOpen,
    isEscalationModalOpen: state.isEscalationModalOpen,
    circleLayoutMode: state.circleLayoutMode,
    searchQuery: state.searchQuery,
    checkInRecord: state.checkInRecord,
    hasRecognitionShown: state.hasRecognitionShown,
    needsAttentionCount,
    noConcernCount,
    upcomingCheckInsCount,

    // Phase 04 Help Now State & Collections
    assistanceRequests: state.assistanceRequests,
    activeAssistanceRequest,
    activeAssistanceRequestId: state.activeAssistanceRequestId,
    safeguardingConcerns: state.safeguardingConcerns,
    helpCategoryDraft: state.helpCategoryDraft,
    matchedHelpers: effectiveMatchedHelpers,
    resources: DEMO_RESOURCES,

    // Phase 04 Help Now Actions
    setHelpCategoryDraft,
    createAssistanceRequest,
    updateAssistanceRequest,
    setActiveAssistanceRequest,
    inviteHelperToRequest,
    acceptHelperInvitation,
    declineHelperInvitation,
    advanceAssistanceProgress,
    confirmAssistanceDelivery,
    reopenAssistanceRequest,
    submitSafeguardingConcern,
    resetHelpNowScenario,

    // Phase 05 Child Safe State & Actions
    childSafeCase: state.childSafeCase,
    isCoordinatorDemoMode: state.isCoordinatorDemoMode,
    childSafeDraft: state.childSafeDraft,
    startChildSafeReport,
    updateChildSafeDraft,
    submitChildSafeCase,
    toggleCoordinatorDemoMode,
    beginCoordinatorReview,
    prepareCoordinatorReferral,
    simulateReferralAcknowledgement,
    documentSimulatedHandoff,
    resolveChildSafeFollowUp,
    resetChildSafeScenario,

    navigateTo,
    goBack,
    openContactDrawer,
    closeContactDrawer,
    performCheckIn,
    openTaskDetails,
    openCommitmentModal,
    closeCommitmentModal,
    confirmCommitment,
    assignHelperToTask,
    advanceTaskProgress,
    openRecipientConfirmModal,
    closeRecipientConfirmModal,
    confirmRecipientReceipt,
    openAlternativeHelperModal,
    closeAlternativeHelperModal,
    openAlternativeContactModal,
    closeAlternativeContactModal,
    openEscalationModal,
    closeEscalationModal,
    setCircleLayoutMode,
    setSearchQuery,
    resetDemo
  };

  return <CareContext.Provider value={value}>{children}</CareContext.Provider>;
};

export const useCareContext = () => {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error('useCareContext must be used within a CareProvider');
  }
  return context;
};
