import { UserProfile, OnboardingDraft } from '../types/account';
import { getAssetUrl } from '../utils/assets';

export const SEEDED_AARAV_PROFILE: UserProfile = {
  id: 'aarav',
  firstName: 'Aarav',
  lastName: 'Sharma',
  avatar: getAssetUrl('/images/contacts/aarav.png'),
  city: 'Bengaluru',
  neighbourhood: 'Indiranagar',
  phone: '+91 98765 43210',
  email: 'aarav.sharma@example.com',
  preferredLanguage: 'en',
  communicationPreference: 'whatsapp',
  contactVerificationStatus: 'verified',
  primaryIntent: 'want_to_help',
  participationIntents: ['want_to_help', 'need_help', 'concerned_about_someone'],
  onboardingCompleted: true,
  isSeededDemoAccount: true,
  helperCapabilities: [
    'groceries_essentials',
    'welfare_check_ins',
    'calls_coordination'
  ],
  helperAvailability: 'available_now',
  preferredRadiusKm: 3,
  travelModes: ['two_wheeler', 'walking'],
  trustedContactIds: ['savitri', 'meera', 'priya', 'rohan', 'neha', 'vikram'],
  createdAt: '2018-05-01T08:00:00Z',
  updatedAt: '2018-05-01T08:00:00Z'
};

export const SEEDED_NISHA_PROFILE: UserProfile = {
  id: 'nisha',
  firstName: 'Nisha',
  lastName: 'Rao',
  avatar: getAssetUrl('/images/contacts/nisha.png'),
  city: 'Bengaluru',
  neighbourhood: 'Indiranagar',
  phone: '+91 98450 12345',
  email: 'nisha.rao@example.com',
  preferredLanguage: 'en',
  communicationPreference: 'whatsapp',
  contactVerificationStatus: 'verified',
  primaryIntent: 'need_help',
  participationIntents: ['need_help'],
  onboardingCompleted: true,
  isSeededDemoAccount: true,
  helperCapabilities: [],
  helperAvailability: 'unavailable_for_now',
  preferredRadiusKm: 1,
  travelModes: ['walking'],
  supportNeeds: ['food_water'],
  supportUrgency: 'as_soon_as_possible',
  supportBeneficiary: 'for_myself',
  trustedContactIds: [],
  createdAt: '2018-05-02T10:00:00Z',
  updatedAt: '2018-05-02T10:00:00Z'
};

export const DEFAULT_ONBOARDING_DRAFT: OnboardingDraft = {
  intent: 'want_to_help',
  language: 'en',
  communicationPreference: 'whatsapp',
  firstName: '',
  lastName: '',
  phone: '+91 ',
  email: '',
  otpCode: '',
  isOtpVerified: false,
  city: 'Bengaluru',
  neighbourhood: 'Indiranagar',
  coordinates: { lat: 12.9716, lng: 77.6412 },
  helperCapabilities: ['groceries_essentials', 'welfare_check_ins'],
  helperAvailability: 'available_now',
  preferredRadiusKm: 3,
  travelModes: ['two_wheeler'],
  supportNeeds: ['food_water'],
  supportUrgency: 'as_soon_as_possible',
  supportBeneficiary: 'for_myself',
  concernSubjectName: 'Savitri Amma',
  concernSubjectRelationship: 'My grandmother',
  concernObservations: ['caregiver_check_in_missed'],
  trustedContactIds: ['savitri', 'priya', 'vikram'],
  currentStep: 1,
  helperSubStep: 'capabilities'
};

export interface SampleContactSeed {
  id: string;
  name: string;
  relationship: string;
  location: string;
  avatar: string;
  defaultSelected: boolean;
}

export const SAMPLE_COMMUNITY_CONTACTS: SampleContactSeed[] = [
  {
    id: 'savitri',
    name: 'Savitri Amma',
    relationship: 'Grandmother · Indiranagar',
    location: 'Indiranagar',
    avatar: getAssetUrl('/images/contacts/savitri.png'),
    defaultSelected: true
  },
  {
    id: 'meera',
    name: 'Meera',
    relationship: 'Mother · Status not confirmed',
    location: 'Domlur',
    avatar: getAssetUrl('/images/contacts/meera.png'),
    defaultSelected: false
  },
  {
    id: 'priya',
    name: 'Priya',
    relationship: 'Cousin · Domlur',
    location: 'Domlur',
    avatar: getAssetUrl('/images/contacts/priya.png'),
    defaultSelected: true
  },
  {
    id: 'rohan',
    name: 'Rohan',
    relationship: 'Friend · HAL 2nd Stage',
    location: 'HAL 2nd Stage',
    avatar: getAssetUrl('/images/contacts/rohan.png'),
    defaultSelected: false
  },
  {
    id: 'neha',
    name: 'Neha',
    relationship: 'Sister · Koramangala',
    location: 'Koramangala',
    avatar: getAssetUrl('/images/contacts/neha.png'),
    defaultSelected: false
  },
  {
    id: 'vikram',
    name: 'Vikram',
    relationship: 'Neighbour · Indiranagar',
    location: 'Indiranagar',
    avatar: getAssetUrl('/images/contacts/vikram.png'),
    defaultSelected: true
  }
];

export const INDIAN_CITIES = [
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', defaultNeighbourhood: 'Indiranagar' },
  { id: 'mysuru', name: 'Mysuru', state: 'Karnataka', defaultNeighbourhood: 'Gokulam' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', defaultNeighbourhood: 'Hazratganj' },
  { id: 'delhi', name: 'Delhi', state: 'National Capital Territory', defaultNeighbourhood: 'Lajpat Nagar' }
];

export const BENGALURU_NEIGHBOURHOODS = [
  { id: 'indiranagar', name: 'Indiranagar', lat: 12.9716, lng: 77.6412 },
  { id: 'domlur', name: 'Domlur', lat: 12.9609, lng: 77.6387 },
  { id: 'hal_2nd_stage', name: 'HAL 2nd Stage', lat: 12.9654, lng: 77.6534 },
  { id: 'koramangala', name: 'Koramangala', lat: 12.9352, lng: 77.6245 },
  { id: 'malleshwaram', name: 'Malleshwaram', lat: 13.0031, lng: 77.5643 },
  { id: 'jayanagar', name: 'Jayanagar', lat: 12.9308, lng: 77.5838 }
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', native: 'English', sub: 'Continue in English', available: true },
  { code: 'kn', native: 'ಕನ್ನಡ', sub: 'ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಸಿ', available: true },
  { code: 'hi', native: 'हिन्दी', sub: 'हिन्दी में जारी रखें', available: true },
  { code: 'ta', native: 'தமிழ்', sub: 'தமிழில் தொடரவும்', available: true }
];
