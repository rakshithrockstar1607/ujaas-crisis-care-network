import { MemoryCardData, NavItem } from '../types';
import { getAssetUrl } from '../utils/assets';

export const HERO_CONTENT = {
  eyebrow: 'THE DAY AFTER, WE SHOW UP.',
  headline: {
    line1: 'We still have',
    line2: 'each other.'
  },
  paragraph:
    'When half the world disappeared, everyday care disappeared with it. UJAAS connects those who need support with people who can help, so no one is left to face tomorrow alone.',
  ctas: {
    primary: 'I need help',
    secondary: 'I can help',
    nav: 'Get Involved'
  },
  trustPills: [
    { label: 'Care for Elders', description: 'Immediate assistance for older adults' },
    { label: 'Child Continuity', description: 'Guardianship & youth safety' },
    { label: 'Verified Volunteers', description: 'Neighbors showing up for neighbors' }
  ],
  statusNotice: 'POST-EVENT RAPID RELIEF DIRECTORY • EARTH RESILIENCE NETWORK • 2018'
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'find-help',
    label: 'Find Help',
    href: '#find-help',
    description: 'Request urgent care, groceries, medical attention, or shelter support.'
  },
  {
    id: 'offer-help',
    label: 'Offer Help',
    href: '#offer-help',
    description: 'Discover responsibilities you can take on, starting with people you know.'
  },
  {
    id: 'my-circle',
    label: 'My Circle',
    href: '#my-circle',
    description: 'Who do I know, and who may need my attention? Relationship network.'
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '#resources',
    description: 'Find verified essential clinics, food centers, and emergency services.'
  }
];

export const ABOUT_INFO = {
  title: 'About UJAAS Crisis Care Network',
  subtitle: 'Humanitarian Care Continuity in Post-Snap Bengaluru, April 2018',
  description:
    'When half the population vanished without warning, everyday care vanished with them. UJAAS is a decentralized, community-led care coordination network created to ensure that unattended children, elderly relatives, isolated neighbours, and disrupted families receive immediate, accountable assistance from verified community members.'
};

export const MEMORY_CARDS: MemoryCardData[] = [
  {
    id: 'infant',
    title: 'Protecting the Vulnerable',
    caption: 'Every child deserves someone to show up.',
    context:
      'Infants and young children who lost parents or guardians immediately need warmth, nursery supplies, and dedicated emergency foster circles.',
    imageSrc: getAssetUrl('/images/memory-infant.png'),
    imageWebp: getAssetUrl('/images/memory-infant.webp'),
    alt: 'A smiling infant wrapped in a soft blanket, representing the children who need continuous care and protection.',
    defaultWidth: 160,
    aspectRatio: '1.19/1',
    initialOffset: { x: 80, y: -90 },
    restingRotation: -2.2,
    staggerIndex: 0
  },
  {
    id: 'hands',
    title: 'Restoring Direct Care',
    caption: 'Care begins with a simple connection.',
    context:
      'Older adults whose daily caregivers suddenly dissolved in the Snap require immediate physical care, daily meals, medication, and steady companionship.',
    imageSrc: getAssetUrl('/images/memory-hands.png'),
    imageWebp: getAssetUrl('/images/memory-hands.webp'),
    alt: 'An adult hand gently and firmly clasping the wrinkled hands of an elderly person, symbolizing compassion and solidarity.',
    defaultWidth: 188,
    aspectRatio: '1.25/1',
    initialOffset: { x: -110, y: 35 },
    restingRotation: 1.8,
    staggerIndex: 1
  },
  {
    id: 'man',
    title: 'Honoring What Was Lost',
    caption: 'When someone disappears, responsibilities remain.',
    context:
      'Across the globe, billions of partners, brothers, and daughters disintegrated into dust. We honor their absence by stepping in to carry the people they loved.',
    imageSrc: getAssetUrl('/images/memory-man.png'),
    imageWebp: getAssetUrl('/images/memory-man.webp'),
    alt: 'A man looking toward the horizon as his body begins dissolving into dust from the Snap.',
    defaultWidth: 165,
    aspectRatio: '1.1/1',
    initialOffset: { x: 60, y: 115 },
    restingRotation: -1.5,
    staggerIndex: 2
  }
];
