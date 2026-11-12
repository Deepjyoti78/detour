'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBookingStore } from '@/stores/bookingStore';
import { CARS, LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import { formatMoney, formatDate } from '@/lib/pricing';
import { ArrowLeft, ArrowRight, Printer, AlertTriangle, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function MyBookingPage() {
  const { booking, cancelBooking } = useBookingStore();
  const [cancelOpen, setCancelOpen] = useState(false);

  if (!booking) {
    return (
      <div className="w-[90%] max-w-3xl mx-auto py-20 text-center">
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight mb-4">
          MY BOOKING.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mb-8 font-medium">
          Your confirmed demo reservation will appear here on this browser.
        </p>
        <Link href="/fleet" className="btn-tactile-yellow py-3.5 px-6 text-sm uppercase tracking-wider inline-block">
          Browse the fleet →
        </Link>
      </div>
    );
  }

  const car = CARS.find((c) => c.id === booking.carId) || CARS[0];
  const location = LOCATIONS.find((l) => l.id === booking.trip.location) || LOCATIONS[0];
  const drive = booking.trip.drive ? SCENIC_DRIVES.find((d) => d.id === booking.trip.drive) : null;
  const isCancelled = booking.status === 'cancelled';

  return (
    <div className="w-[90%] max-w-5xl mx-auto py-12 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to home</span>
      </Link>

      <div className="border-b border-[#a9aa9c] pb-6 mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 border ${
              isCancelled
                ? 'bg-red-100 text-red-800 border-red-300'
                : 'bg-[#d8e3fb] text-[#203a78] border-[#203a78]/30'
            }`}
          >
            {isCancelled ? 'Demo Reservation Cancelled' : 'Demo Reservation Confirmed'}
          </span>
          <span className="text-xs text-[#47516a] font-bold">
            Ref: {booking.reference}
          </span>
        </div>
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
          MY BOOKING.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
          {isCancelled
            ? 'This reservation was marked as cancelled. Historical details are shown below.'
            : 'Manage your active demo reservation or make changes to your travel dates.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Driver Info & Action Controls */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Driver Summary */}
          <div className="p-5 sm:p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
            <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-4 border-b border-[#a9aa9c] pb-2">
              RESERVATION HOLDER
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              <div>
                <dt className="text-[#47516a] uppercase">Driver Name</dt>
                <dd className="text-sm text-[#18274b] mt-0.5">{booking.driver.name}</dd>
              </div>
              <div>
                <dt className="text-[#47516a] uppercase">Contact Email</dt>
                <dd className="text-sm text-[#18274b] mt-0.5 truncate">{booking.driver.email}</dd>
              </div>
            </dl>
          </div>

          {/* Action Buttons */}
          {!isCancelled ? (
            <div className="flex flex-col gap-3">
              <Link
                href={`/booking?edit=${encodeURIComponent(booking.reference)}`}
                className="btn-tactile-yellow py-3.5 px-6 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <span>Edit reservation dates / depot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={`/pickup-guide?location=${location.id}`}
                  className="btn-tactile-outline py-3 px-4 text-xs uppercase tracking-wider font-bold text-center"
                >
                  Pick-up guide
                </Link>
                <Link
                  href="/trip-pack"
                  className="btn-tactile-outline py-3 px-4 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Trip pack</span>
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setCancelOpen(true)}
                className="mt-3 text-xs font-bold uppercase tracking-wider text-red-900 hover:bg-red-200/60 px-2.5 py-1.5 border border-transparent hover:border-red-400 self-start cursor-pointer transition-colors"
              >
                Cancel this reservation
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-red-100/60 border border-red-300 text-xs text-red-950 font-bold">
                This demo reservation has been cancelled.
              </div>
              <Link
                href="/fleet"
                className="btn-tactile-yellow py-3.5 px-6 text-xs uppercase tracking-wider font-bold text-center"
              >
                Browse fleet to make a new booking →
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Ticket Stub */}
        <div className="lg:col-span-6">
          <div className="border-2 border-[#18274b] bg-[#faf2db] shadow-[8px_8px_0px_#18274b] overflow-hidden">
            <div className="relative h-48 w-full border-b-2 border-[#18274b] bg-[#203a78]">
              <Image
                src={car.image}
                alt={car.alt}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 bg-[#18274b] text-[#faf2db] text-xs font-bold px-2.5 py-1 tracking-wider uppercase border border-[#a9aa9c]">
                {booking.reference}
              </div>
            </div>

            <div className="p-6 relative ticket-perforation bg-[#faf2db]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-['Anton',sans-serif] text-3xl text-[#18274b]">
                    {car.name}
                  </h3>
                  <p className="text-xs text-[#47516a] font-bold">
                    Depot: {location.name}
                  </p>
                </div>
              </div>

              {drive && (
                <div className="p-3 bg-[#d8e3fb] border border-[#18274b] text-xs font-bold text-[#18274b] mb-4">
                  Planned Itinerary: {drive.name}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 border-y border-[#a9aa9c] py-3 text-xs mb-4">
                <div>
                  <span className="text-[#47516a] uppercase font-bold block">Pick-up</span>
                  <strong className="text-sm text-[#18274b]">{formatDate(booking.trip.pickup)}</strong>
                </div>
                <div>
                  <span className="text-[#47516a] uppercase font-bold block">Return</span>
                  <strong className="text-sm text-[#18274b]">{formatDate(booking.trip.return)}</strong>
                </div>
              </div>

              <dl className="flex flex-col gap-2 text-xs font-bold text-[#18274b]">
                <div className="flex justify-between">
                  <dt className="text-[#47516a]">Subtotal ({booking.days} days)</dt>
                  <dd>{formatMoney(booking.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#47516a]">Taxes and fees (12.5%)</dt>
                  <dd>{formatMoney(booking.fees)}</dd>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#18274b] text-base font-['Anton',sans-serif]">
                  <dt className="tracking-wide text-lg">TOTAL</dt>
                  <dd className="text-2xl text-[#203a78]">{formatMoney(booking.total)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Radix Cancellation Dialog Modal */}
      <Dialog.Root open={cancelOpen} onOpenChange={setCancelOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 animate-fade-in backdrop-blur-xs" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-[#faf2db] border-2 border-[#18274b] shadow-[8px_8px_0px_#18274b] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-700" />
                <span>CANCEL RESERVATION?</span>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="p-1 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] text-[#18274b] cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-[#47516a] mb-6 leading-relaxed">
              Are you sure you want to cancel booking <strong>{booking.reference}</strong> for {car.name}? The reservation will be marked as cancelled in your demo profile.
            </Dialog.Description>

            <div className="flex items-center justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="btn-tactile-outline py-2.5 px-4 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Keep reservation
                </button>
              </Dialog.Close>
              <button
                type="button"
                onClick={() => {
                  cancelBooking();
                  setCancelOpen(false);
                }}
                className="py-2.5 px-4 bg-red-800 text-[#faf2db] font-bold text-xs uppercase tracking-wider border-2 border-[#18274b] shadow-[3px_3px_0px_#18274b] hover:bg-red-900 cursor-pointer"
              >
                Yes, cancel booking
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
