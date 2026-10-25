import { AssistanceRequest, MatchedHelper, ResourceListing } from '../types/helpNow';
import { getAssetUrl } from '../utils/assets';

export const CANONICAL_NISHA_REQUEST: AssistanceRequest = {
  id: 'req-nisha-food-01',
  requesterId: 'nisha',
  requesterName: 'Nisha Rao',
  requesterPhone: '+91 98450 12345',
  recipientId: 'nisha',
  recipientName: 'Nisha Rao',
  isSelfRecipient: true,
  category: 'food_water',
  selectedItems: ['Rice', 'Dal', 'Vegetables', 'Drinking water'],
  urgency: 'today',
  generalLocation: 'Indiranagar, Bengaluru',
  areaPincode: '560038',
  coordinates: { lat: 12.9716, lng: 77.6412 },
  canReceiveDelivery: true,
  contactPreference: 'whatsapp',
  notes: "We are a family of 3. Need basic groceries and drinking water. Our building doesn't have a lift, please call on WhatsApp before delivery.",
  status: 'draft',
  assignedHelperId: null,
  assignedHelperName: null,
  assignedHelperAvatar: null,
  assignedHelperPhone: null,
  assignedHelperDistance: null,
  createdAt: 'Today, 10:14 AM',
  timeline: {
    submittedAt: 'Today, 10:14 AM'
  },
  activityHistory: [
    {
      id: 'act-01',
      timestamp: 'Today, 10:14 AM',
      action: 'Request drafted',
      actorName: 'Nisha Rao',
      description: 'Need for food and drinking water specified.'
    }
  ]
};

export const MATCHED_HELPERS: MatchedHelper[] = [
  {
    id: 'aarav',
    name: 'Aarav Sharma',
    avatar: getAssetUrl('/images/contacts/aarav.png'),
    neighbourhood: 'Indiranagar',
    distanceKm: 1.2,
    status: 'available_now',
    capabilities: ['Groceries & Essentials', 'Check-ins'],
    description: 'Can help with groceries, medicine pickup or a friendly check-in.',
    lat: 12.9750,
    lng: 77.6480,
    phone: '+91 98765 43210',
    isVerifiedVolunteer: true,
    isTrustedCircle: true
  },
  {
    id: 'vikram',
    name: 'Vikram',
    avatar: getAssetUrl('/images/contacts/vikram.png'),
    neighbourhood: 'Indiranagar',
    distanceKm: 1.9,
    status: 'available_now',
    capabilities: ['Local errands', 'Transport support'],
    description: 'Available for local deliveries and errands within Indiranagar.',
    lat: 12.9660,
    lng: 77.6390,
    phone: '+91 98765 22222',
    isVerifiedVolunteer: true,
    isTrustedCircle: true
  },
  {
    id: 'rohan',
    name: 'Rohan',
    avatar: getAssetUrl('/images/contacts/rohan.png'),
    neighbourhood: 'HAL 2nd Stage',
    distanceKm: 2.5,
    status: 'busy',
    capabilities: ['Groceries & Essentials'],
    description: 'Assisting another family until 2:00 PM today.',
    lat: 12.9654,
    lng: 77.6534,
    phone: '+91 98765 33333',
    isVerifiedVolunteer: true,
    isTrustedCircle: false
  },
  {
    id: 'priya',
    name: 'Priya',
    avatar: getAssetUrl('/images/contacts/priya.png'),
    neighbourhood: 'Domlur',
    distanceKm: 3.1,
    status: 'available_now',
    capabilities: ['Transport support', 'Vehicle available'],
    description: 'Has two-wheeler for emergency supplies coordination.',
    lat: 12.9609,
    lng: 77.6387,
    phone: '+91 98765 44444',
    isVerifiedVolunteer: true,
    isTrustedCircle: true
  }
];

export const DEMO_RESOURCES: ResourceListing[] = [
  {
    id: 'res-food-point',
    name: 'Community food point',
    category: 'food',
    area: 'Indiranagar',
    distanceKm: 1.5,
    informationStatus: 'reported_open',
    description: 'Free meals and essentials for anyone in need. Run by local volunteers.',
    tags: ['Food', 'Essential supplies'],
    lat: 12.9780,
    lng: 77.6450,
    lastReportedAt: '35 mins ago',
    contactInfo: 'Near BDA Complex, Indiranagar'
  },
  {
    id: 'res-supermarket',
    name: 'More Supermarket',
    category: 'supplies',
    area: '100 Feet Road, Indiranagar',
    distanceKm: 0.8,
    informationStatus: 'reported_open',
    description: 'Essential dry rations and drinking water supply. Token system active.',
    tags: ['Dry rations', 'Drinking water'],
    lat: 12.9680,
    lng: 77.6360,
    lastReportedAt: '1 hour ago',
    contactInfo: '100 Feet Rd, Opp Metro Pillar 84'
  },
  {
    id: 'res-clinic',
    name: 'Neighbourhood clinic',
    category: 'medical',
    area: 'Indiranagar',
    distanceKm: 1.8,
    informationStatus: 'confirmation_pending',
    description: 'General care, basic medicines and tele-consultation support available.',
    tags: ['Basic care', 'Medicines'],
    lat: 12.9640,
    lng: 77.6490,
    lastReportedAt: '2 hours ago',
    contactInfo: '12th Main Road, Indiranagar'
  },
  {
    id: 'res-hospital',
    name: 'Manipal Hospital Indiranagar',
    category: 'medical',
    area: 'Old Airport Road',
    distanceKm: 2.4,
    informationStatus: 'reported_open',
    description: 'Urgent casualty and ambulance dispatch. Emergency care open 24/7.',
    tags: ['Emergency', 'Ambulance'],
    lat: 12.9580,
    lng: 77.6480,
    lastReportedAt: '15 mins ago',
    contactInfo: '98, HAL Old Airport Rd'
  }
];
