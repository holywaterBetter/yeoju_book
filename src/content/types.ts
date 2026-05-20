export type Locale = "ko" | "en";

export type CourseId = "sejong" | "ohak";

export interface MetaContent {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ExternalLinks {
  reservationUrl: string;
  kakaoChannelUrl: string;
  reservationLabel: string;
  kakaoLabel: string;
}

export interface MediaAsset {
  src: string;
  alt: string;
  caption?: string;
  role?: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  media: MediaAsset;
}

export interface CoursePoint {
  marker: string;
  title: string;
  description: string;
  safetyNote: string;
}

export interface CourseContent {
  id: CourseId;
  name: string;
  distance: string;
  duration: string;
  rideTime: string;
  difficulty: string;
  mapImage: MediaAsset;
  gallery: MediaAsset[];
  highlights: string[];
  cautions: string[];
  points: CoursePoint[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EmergencyContact {
  label: string;
  value: string;
  description: string;
  href: string;
}

export interface GuideSection {
  id: string;
  title: string;
  summary: string;
  items: string[];
  media: MediaAsset[];
}

export interface LocalizedContent {
  meta: MetaContent;
  navigation: NavItem[];
  externalLinks: ExternalLinks;
  hero: HeroContent;
  intro: {
    title: string;
    body: string;
  };
  courses: CourseContent[];
  faq: FaqItem[];
  emergencyContacts: EmergencyContact[];
  guide: {
    title: string;
    sections: GuideSection[];
  };
}

export type SiteContent = Record<Locale, LocalizedContent>;
