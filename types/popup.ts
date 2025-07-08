export interface PopupTrigger {
  type: "time" | "scroll" | "exit-intent" | "inactivity";
  value?: number; // en secondes pour time/inactivity, en pourcentage pour scroll
}

export interface PopupState {
  isVisible: boolean;
  hasBeenShown: boolean;
  hasBeenDismissed: boolean;
  dismissedPermanently: boolean;
  lastShownAt?: number;
}

export interface PopupConfig {
  triggers: PopupTrigger[];
  maxShowsPerSession: number;
  cooldownHours: number;
  persistDismissal: boolean;
}

export interface PopupContent {
  title: string;
  message: string;
  ctaText: string;
  ctaLink: string;
  dismissText?: string;
  permanentDismissText?: string;
  subtitle: string;
  badgeMobile: string;
  badgeDesktop: string;
  integrationTitle: string;
  integrationDescription: string;
  supportTitle: string;
  supportDescription: string;
  statsPartners: string;
  statsAvailability: string;
  statsCountries: string;
}

export interface PopupContextType {
  state: PopupState;
  config: PopupConfig;
  content: PopupContent;
  showPopup: () => void;
  hidePopup: () => void;
  dismissPopup: (permanent?: boolean) => void;
  resetPopup: () => void;
}
