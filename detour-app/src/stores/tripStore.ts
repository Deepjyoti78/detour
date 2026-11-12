import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Trip } from '@/types';
import { getDefaultTrip, isValidTrip } from '@/lib/pricing';

interface TripState {
  trip: Trip;
  setTrip: (trip: Trip) => void;
  setLocation: (location: string) => void;
  setPickup: (pickup: string) => void;
  setReturn: (returnDate: string) => void;
  setDrive: (driveId?: string) => void;
  removeDrive: () => void;
  resetTrip: () => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      trip: getDefaultTrip(),
      setTrip: (trip) => set({ trip: isValidTrip(trip) ? trip : getDefaultTrip() }),
      setLocation: (location) =>
        set((state) => ({ trip: { ...state.trip, location } })),
      setPickup: (pickup) =>
        set((state) => ({ trip: { ...state.trip, pickup } })),
      setReturn: (returnDate) =>
        set((state) => ({ trip: { ...state.trip, return: returnDate } })),
      setDrive: (driveId) =>
        set((state) => ({ trip: { ...state.trip, drive: driveId } })),
      removeDrive: () =>
        set((state) => {
          const next = { ...state.trip };
          delete next.drive;
          return { trip: next };
        }),
      resetTrip: () => set({ trip: getDefaultTrip() }),
    }),
    {
      name: 'detour.v2.trip',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
      })),
    }
  )
);
