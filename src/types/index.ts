export interface MemoryCardData {
  id: 'infant' | 'hands' | 'man';
  title: string;
  caption: string;
  context: string;
  imageSrc: string;
  imageWebp: string;
  alt: string;
  defaultWidth: number;
  aspectRatio: string;
  initialOffset: { x: number; y: number };
  restingRotation: number;
  staggerIndex: number;
}

export type IntentType = 'need-help' | 'can-help' | 'get-involved' | null;

export interface NavItem {
  id: string;
  label: string;
  href: string;
  description: string;
  badge?: string;
}

export interface Coordinates {
  x: number;
  y: number;
}
