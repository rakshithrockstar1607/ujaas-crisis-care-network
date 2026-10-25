import { Contact, CareTask, CareAppState } from '../types/care';
import { CANONICAL_NISHA_REQUEST } from './helpNowDemoData';
import { CANONICAL_RECORDED_CHILD_CASE, CANONICAL_CHILD_SAFE_DRAFT } from './childSafeDemoData';
import { getAssetUrl } from '../utils/assets';

export const INITIAL_CONTACTS: Record<string, Contact> = {
  savitri: {
    id: 'savitri',
    name: 'Savitri Amma',
    age: 78,
    relationship: 'Grandmother',
    avatar: getAssetUrl('/images/contacts/savitri_amma.png'),
    location: 'Indiranagar, Bengaluru',
    neighborhood: 'Indiranagar',
    checkInStatus: 'unconfirmed',
    concernStatus: 'needs_review',
    volunteerStatus: 'needs_attention',
    distanceKm: 0.8,
    travelTimeText: '~3 min (Walk / Local)',
    usualCaregiver: 'Meera (Daughter)',
    phone: '+91 98450 •••••',
    notes: 'Lives independently. Relies on daily visits for groceries and medication schedule.',
    coordinates: { xPct: 50, yPct: 18 },
    geoCoordinates: { lat: 12.9795, lng: 77.6405 }
  },
  aarav: {
    id: 'aarav',
    name: 'Aarav (You)',
    age: 26,
    relationship: 'Grandson',
    avatar: getAssetUrl('/images/contacts/aarav.png'),
    location: 'Indiranagar, Bengaluru',
    neighborhood: 'Indiranagar',
    checkInStatus: 'confirmed',
    concernStatus: 'no_concern',
    volunteerStatus: 'available',
    isUser: true,
    capabilities: ['Groceries', 'Transport', 'Coordination'],
    notes: 'Signed-in volunteer and primary family coordinator.',
    coordinates: { xPct: 50, yPct: 52 },
    geoCoordinates: { lat: 12.9719, lng: 77.6412 }
  },
  meera: {
    id: 'meera',
    name: 'Meera',
    age: 51,
    relationship: 'Mother',
    avatar: getAssetUrl('/images/contacts/meera.png'),
    location: 'Indiranagar, Bengaluru',
    neighborhood: 'Indiranagar',
    checkInStatus: 'unconfirmed',
    concernStatus: 'no_concern',
    volunteerStatus: 'unknown',
    notes: 'Scheduled morning check-in has not been confirmed. Whereabouts currently unverified.',
    coordinates: { xPct: 22, yPct: 36 },
    geoCoordinates: { lat: 12.9730, lng: 77.6250 }
  },
  priya: {
    id: 'priya',
    name: 'Priya',
    age: 29,
    relationship: 'Cousin',
    avatar: getAssetUrl('/images/contacts/priya.png'),
    location: 'Domlur, Bengaluru',
    neighborhood: 'Domlur',
    checkInStatus: 'confirmed',
    concernStatus: 'no_concern',
    volunteerStatus: 'available',
    distanceKm: 5.1,
    travelTimeText: '~14 min (Scooter)',
    capabilities: ['Transport', 'Coordination'],
    notes: 'Reported safe at home. Available for vehicle transport support.',
    coordinates: { xPct: 78, yPct: 36 },
    geoCoordinates: { lat: 12.9610, lng: 77.6320 }
  },
  rohan: {
    id: 'rohan',
    name: 'Rohan',
    age: 31,
    relationship: 'Friend',
    avatar: getAssetUrl('/images/contacts/rohan.png'),
    location: 'HAL 2nd Stage, Bengaluru',
    neighborhood: 'HAL 2nd Stage',
    checkInStatus: 'confirmed',
    concernStatus: 'no_concern',
    volunteerStatus: 'available',
    distanceKm: 4.6,
    travelTimeText: '~12 min (Bike)',
    capabilities: ['Groceries', 'Transport'],
    notes: 'Reported safe. Can assist with heavy lifting or ration pickup.',
    coordinates: { xPct: 25, yPct: 68 },
    geoCoordinates: { lat: 12.9650, lng: 77.6550 }
  },
  neha: {
    id: 'neha',
    name: 'Neha',
    age: 24,
    relationship: 'Sister',
    avatar: getAssetUrl('/images/contacts/neha.png'),
    location: 'Koramangala, Bengaluru',
    neighborhood: 'Koramangala',
    checkInStatus: 'confirmed',
    concernStatus: 'no_concern',
    volunteerStatus: 'busy',
    distanceKm: 6.8,
    travelTimeText: '~18 min (Cab)',
    capabilities: ['Remote support'],
    notes: 'Safe at home with family. Remote phone coordinator.',
    coordinates: { xPct: 75, yPct: 68 },
    geoCoordinates: { lat: 12.9460, lng: 77.6390 }
  },
  vikram: {
    id: 'vikram',
    name: 'Vikram',
    age: 62,
    relationship: 'Neighbour',
    avatar: getAssetUrl('/images/contacts/vikram.png'),
    location: 'Indiranagar, Bengaluru',
    neighborhood: 'Indiranagar',
    checkInStatus: 'confirmed',
    concernStatus: 'no_concern',
    volunteerStatus: 'available',
    distanceKm: 1.2,
    travelTimeText: '~4 min (Walk / Scooter)',
    capabilities: ['Groceries', 'Local errands', 'Welfare check-ins'],
    notes: 'Next-door neighbour. Has spare keys and can provide on-ground observation.',
    coordinates: { xPct: 50, yPct: 84 },
    geoCoordinates: { lat: 12.9750, lng: 77.6520 }
  }
};

export const INITIAL_TASKS: Record<string, CareTask> = {
  'task-groceries': {
    id: 'task-groceries',
    recipientId: 'savitri',
    title: 'Grocery Delivery',
    category: 'groceries',
    description: 'Essential groceries and household supplies needed for the week.',
    priority: 'high',
    dueWindow: 'Within 1–2 days',
    status: 'potential_need',
    assignedHelperId: null,
    assignedHelperName: null,
    items: [
      { id: 'item-1', name: 'Sona Masoori Rice', quantity: '5 kg', checked: true },
      { id: 'item-2', name: 'Toor Dal', quantity: '2 kg', checked: true },
      { id: 'item-3', name: 'Fresh Vegetables (Onions, Potatoes, Spinach)', quantity: '3 kg', checked: true },
      { id: 'item-4', name: 'Seasonal Fruit (Bananas, Papaya)', quantity: '1.5 kg', checked: true },
      { id: 'item-5', name: 'Sunflower Cooking Oil', quantity: '1 L', checked: true },
      { id: 'item-6', name: 'Household Essentials (Milk, Salt, Tea Leaves)', quantity: 'Daily pack', checked: true }
    ],
    note: 'Please call before coming. I prefer groceries to be delivered in the afternoon.',
    timeline: {}
  },
  'task-meds': {
    id: 'task-meds',
    recipientId: 'savitri',
    title: 'Medication Refill Coordination',
    category: 'medication',
    description: 'Review whether regular blood pressure maintenance medicines require collection.',
    priority: 'medium',
    dueWindow: 'Upcoming / in 3 days',
    status: 'potential_need',
    assignedHelperId: null,
    assignedHelperName: null,
    items: [
      { id: 'med-1', name: 'Amlodipine 5mg (Monthly Refill Check)', quantity: '1 strip', checked: false },
      { id: 'med-2', name: 'Telmisartan 40mg', quantity: '1 strip', checked: false }
    ],
    note: 'Requires confirmation with pharmacy coordinator before dispensing.',
    timeline: {}
  },
  'task-transport': {
    id: 'task-transport',
    recipientId: 'savitri',
    title: 'Routine Hospital Transport',
    category: 'transport',
    description: 'Check whether transport is required for her next scheduled ophthalmology visit.',
    priority: 'low',
    dueWindow: 'Upcoming / in 5 days',
    status: 'potential_need',
    assignedHelperId: null,
    assignedHelperName: null,
    items: [
      { id: 'trans-1', name: 'Return Cab / Local Auto Ride', quantity: 'Round-trip', checked: false }
    ],
    note: 'Appointment pending re-verification with Manipal Hospital triage.',
    timeline: {}
  }
};

export const INITIAL_CARE_STATE: CareAppState = {
  currentView: 'hero',
  previousView: null,
  selectedContactId: null,
  selectedTaskId: null,
  isDrawerOpen: false,
  isCommitmentModalOpen: false,
  isRecipientConfirmModalOpen: false,
  isAlternativeHelperModalOpen: false,
  isAlternativeContactModalOpen: false,
  isEscalationModalOpen: false,
  circleLayoutMode: 'map',
  searchQuery: '',
  contacts: INITIAL_CONTACTS,
  tasks: INITIAL_TASKS,
  checkInRecord: null,
  hasRecognitionShown: false,
  assistanceRequests: {
    'req-nisha-food-01': CANONICAL_NISHA_REQUEST
  },
  activeAssistanceRequestId: 'req-nisha-food-01',
  safeguardingConcerns: [],
  helpCategoryDraft: ['food_water'],
  childSafeCase: CANONICAL_RECORDED_CHILD_CASE,
  isCoordinatorDemoMode: false,
  childSafeDraft: CANONICAL_CHILD_SAFE_DRAFT
};
