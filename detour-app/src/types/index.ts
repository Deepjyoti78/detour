import { Icons } from '@/components/icons';

export interface Car {
  id: string;
  name: string;
  category: 'classic' | 'city' | 'touring';
  rate: number;
  seats: number;
  luggage: number;
  closedDay: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  transmission: 'Automatic' | 'Manual';
  image: string;
  alt: string;
  description: string;
  bestFor: string;
}

export interface LocationDepot {
  id: string;
  name: string;
  description: string;
}

export interface ScenicDrive {
  id: string;
  name: string;
  category: 'waterfalls' | 'coast' | 'mountains';
  intro: string;
  image: string;
  alt: string;
  stops: [string, string][];
}

export interface Trip {
  location: string;
  pickup: string; // YYYY-MM-DD
  return: string; // YYYY-MM-DD
  drive?: string;
}

export interface Driver {
  name: string;
  email: string;
}

export interface Quote {
  days: number;
  subtotal: number;
  fees: number;
  total: number;
}

export interface Booking extends Quote {
  reference: string;
  carId: string;
  trip: Trip;
  driver: Driver;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface PermissionCheck {
  permission?: string;
  plan?: string;
  feature?: string;
  role?: string;
  requireOrg?: boolean;
}

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
  access?: PermissionCheck;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
