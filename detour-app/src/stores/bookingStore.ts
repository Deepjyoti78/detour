import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Booking, UserProfile } from '@/types';

interface BookingState {
  booking: Booking | null;
  profile: UserProfile | null;
  saveBooking: (booking: Booking) => void;
  updateBooking: (updated: Partial<Booking>) => void;
  cancelBooking: () => void;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      booking: null,
      profile: null,
      saveBooking: (booking) => set({ booking }),
      updateBooking: (updated) =>
        set((state) => ({
          booking: state.booking ? { ...state.booking, ...updated, updatedAt: new Date().toISOString() } : null,
        })),
      cancelBooking: () =>
        set((state) => ({
          booking: state.booking ? { ...state.booking, status: 'cancelled', updatedAt: new Date().toISOString() } : null,
        })),
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'detour.v2.booking',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
      })),
    }
  )
);
