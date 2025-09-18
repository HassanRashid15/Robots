// Navigation types
export interface NavLink {
  href: string;
  label: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterSection {
  [key: string]: FooterLink[];
}

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

// Component props types
export interface NavbarProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

// Feature card types
export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
}
