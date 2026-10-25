export type OnboardingIntent = 'need_help' | 'want_to_help' | 'concerned_about_someone';

export type LanguageCode = 'en' | 'kn' | 'hi' | 'ta';

export type CommunicationPreference = 'whatsapp' | 'sms' | 'phone_call';

export type HelperAvailability = 'available_now' | 'later_or_selected_days' | 'unavailable_for_now';

export type TravelDistance = '1km' | '3km' | '5km' | '10km';

export type TravelMode = 'walking' | 'two_wheeler' | 'car' | 'remote_only';

export type HelperCapability =
  | 'groceries_essentials'
  | 'welfare_check_ins'
  | 'transport_support'
  | 'calls_coordination'
  | 'temporary_shelter'
  | 'logistics_help';

export type NeedCategory =
  | 'food_water'
  | 'medication_access'
  | 'a_safe_place'
  | 'transport'
  | 'a_check_in'
  | 'something_else';

export type NeedUrgency = 'as_soon_as_possible' | 'within_1_2_days' | 'this_week';

export type NeedBeneficiary = 'for_myself' | 'for_someone_else';

export type ConcernObservation =
  | 'caregiver_check_in_missed'
  | 'essential_supplies_low'
  | 'cannot_reach_directly'
  | 'other';

export interface UserProfile {
  id: string; // 'aarav' or 'user_...'
  firstName: string;
  lastName?: string;
  avatar: string;
  city: string;
  neighbourhood: string;
  phone: string;
  email?: string;
  preferredLanguage: LanguageCode;
  communicationPreference: CommunicationPreference;
  contactVerificationStatus: 'verified' | 'unverified';
  primaryIntent: OnboardingIntent;
  participationIntents: OnboardingIntent[];
  onboardingCompleted: boolean;
  isSeededDemoAccount?: boolean;

  // Helper preferences
  helperCapabilities: HelperCapability[];
  helperAvailability: HelperAvailability;
  preferredRadiusKm: number;
  travelModes: TravelMode[];

  // Support seeker preferences (if applicable)
  supportNeeds?: NeedCategory[];
  supportUrgency?: NeedUrgency;
  supportBeneficiary?: NeedBeneficiary;

  // Concern preferences (if applicable)
  concernSubjectName?: string;
  concernSubjectRelationship?: string;
  concernObservations?: ConcernObservation[];

  // Trusted circle connection IDs for this user
  trustedContactIds: string[];
  
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingDraft {
  intent: OnboardingIntent;
  language: LanguageCode;
  communicationPreference: CommunicationPreference;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  otpCode: string;
  isOtpVerified: boolean;
  city: string;
  neighbourhood: string;
  coordinates?: { lat: number; lng: number };
  
  // Helper branch
  helperCapabilities: HelperCapability[];
  helperAvailability: HelperAvailability;
  preferredRadiusKm: number;
  travelModes: TravelMode[];

  // Needs help branch
  supportNeeds: NeedCategory[];
  supportUrgency: NeedUrgency;
  supportBeneficiary: NeedBeneficiary;

  // Concern branch
  concernSubjectName: string;
  concernSubjectRelationship: string;
  concernObservations: ConcernObservation[];

  // Trusted circle
  trustedContactIds: string[];

  // Current step tracker
  currentStep: number; // 1 to 7
  helperSubStep?: 'capabilities' | 'availability';
}
