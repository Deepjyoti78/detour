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
