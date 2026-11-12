import { Car, Quote, Trip } from '@/types';
import { CARS, LOCATIONS } from './data';

const ONE_DAY_MS = 86_400_000;

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const shortDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatMoney(amount: number): string {
  return currency.format(amount);
}

export function formatDate(isoDate: string): string {
  const time = parseIsoDate(isoDate);
  return Number.isFinite(time) ? dateFormat.format(time) : '—';
}

export function formatShortDate(isoDate: string): string {
  const time = parseIsoDate(isoDate);
  return Number.isFinite(time) ? shortDateFormat.format(time) : '—';
}

export function localIsoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function parseIsoDate(value: string | undefined): number {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value ? timestamp : NaN;
}

export function getNextDate(isoDate: string): string {
  const time = parseIsoDate(isoDate);
  return Number.isFinite(time) ? new Date(time + ONE_DAY_MS).toISOString().slice(0, 10) : '';
}

export function getDefaultTrip(): Trip {
  return {
    location: LOCATIONS[0].id,
    pickup: '2026-11-13',
    return: '2026-11-15',
  };
}

export function isValidTrip(trip: Partial<Trip> | null | undefined): trip is Trip {
  if (!trip || !trip.location || !trip.pickup || !trip.return) return false;
  const pickupTime = parseIsoDate(trip.pickup);
  const returnTime = parseIsoDate(trip.return);

  return (
    LOCATIONS.some((loc) => loc.id === trip.location) &&
    Number.isFinite(pickupTime) &&
    Number.isFinite(returnTime) &&
    returnTime > pickupTime
  );
}

export function calculateQuote(car: Car | null | undefined, trip: Trip | null | undefined): Quote | null {
  if (!car || !isValidTrip(trip)) return null;
  const pickupTime = parseIsoDate(trip.pickup);
  const returnTime = parseIsoDate(trip.return);
  const days = Math.round((returnTime - pickupTime) / ONE_DAY_MS);
  if (days <= 0) return null;

  const subtotal = days * car.rate;
  const fees = Math.round(subtotal * 0.125); // 12.5% sample taxes and fees
  return {
    days,
    subtotal,
    fees,
    total: subtotal + fees,
  };
}

export function isCarAvailable(car: Car | null | undefined, trip: Trip | null | undefined): boolean {
  if (!car || !isValidTrip(trip)) return false;
  const pickupTime = parseIsoDate(trip.pickup);
  const dayOfWeek = new Date(pickupTime).getUTCDay();
  return dayOfWeek !== car.closedDay;
}

export function getNearbyAvailableTrip(car: Car, trip: Trip): Trip | null {
  if (!isValidTrip(trip)) return null;
  const laterTrip: Trip = {
    ...trip,
    pickup: getNextDate(trip.pickup),
    return: getNextDate(trip.return),
  };
  return isCarAvailable(car, laterTrip) ? laterTrip : null;
}

export function generateBookingReference(): string {
  const array = new Uint32Array(1);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    array[0] = Math.floor(Math.random() * 0xffffffff);
  }
  const suffix = array[0].toString(36).toUpperCase().padStart(7, '0');
  return `DTR-${suffix}`;
}
