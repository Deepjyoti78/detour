'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBookingStore } from '@/stores/bookingStore';
import { CARS, LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import { formatMoney, formatDate } from '@/lib/pricing';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  AlertTriangle,
  X,
  ShieldCheck,
  Clock,
  Fuel,
  FileText,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function MyBookingPage() {
  const { booking, cancelBooking } = useBookingStore();
  const [cancelOpen, setCancelOpen] = useState(false);

  if (!booking) {
    return (
      <div className="w-[90%] max-w-3xl mx-auto pt-8 pb-20 text-center">
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight mb-4">
          MY BOOKING.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mb-8 font-medium">
          Your confirmed reservation will appear here on this browser.
        </p>
        <Link href="/fleet" className="btn-tactile-yellow py-3.5 px-6 font-bold text-sm uppercase tracking-wider inline-block text-[#18274b]">
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
    <div className="w-[90%] max-w-5xl mx-auto pt-4 sm:pt-6 md:pt-8 pb-12 md:pb-16">
      {/* Top Bar / Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#47516a]">
            REF:
          </span>
          <span className="font-['Anton',sans-serif] text-sm tracking-wider text-[#18274b] bg-[#fce466] px-2.5 py-0.5 border border-[#18274b] shadow-[2px_2px_0px_#18274b]">
            {booking.reference}
          </span>
        </div>
      </div>

      {/* Header Banner - Cleaned up without the demo badge and enriched with passport overview strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-[#a9aa9c] pb-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
              MY BOOKING.
            </h1>
            <p className="text-sm md:text-base text-[#47516a] mt-1.5 font-medium">
              {isCancelled
                ? 'This reservation was marked as cancelled. Historical details are shown below.'
                : 'Manage your active reservation or make changes to your travel dates.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1.5 border-2 border-[#18274b] text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#18274b] ${
                isCancelled ? 'bg-red-100 text-red-900' : 'bg-[#faf2db] text-[#18274b]'
              }`}
            >
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  isCancelled ? 'bg-red-600' : 'bg-[#2B580C]'
                }`}
              />
              {isCancelled ? 'Cancelled' : 'Confirmed · Active'}
            </div>
          </div>
        </div>

        {/* Quick Travel Overview Strip - Fills upper space with high-utility travel info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#a9aa9c]/50">
          <div className="bg-[#faf2db] p-3 border border-[#a9aa9c]">
            <span className="text-[10px] uppercase font-bold text-[#47516a] block">Vehicle</span>
            <strong className="font-['Anton',sans-serif] text-base text-[#18274b] tracking-wide block mt-0.5">{car.name}</strong>
            <span className="text-[11px] text-[#47516a] font-medium">{car.transmission}</span>
          </div>
          <div className="bg-[#faf2db] p-3 border border-[#a9aa9c]">
            <span className="text-[10px] uppercase font-bold text-[#47516a] block">Collection Depot</span>
            <strong className="font-['Anton',sans-serif] text-base text-[#18274b] tracking-wide block mt-0.5 truncate">{location.name}</strong>
            <span className="text-[11px] text-[#47516a] font-medium">Station Check-in</span>
          </div>
          <div className="bg-[#faf2db] p-3 border border-[#a9aa9c]">
            <span className="text-[10px] uppercase font-bold text-[#47516a] block">Pick-up Date</span>
            <strong className="font-['Anton',sans-serif] text-base text-[#18274b] tracking-wide block mt-0.5">{formatDate(booking.trip.pickup)}</strong>
            <span className="text-[11px] text-[#47516a] font-medium">08:00 AM onwards</span>
          </div>
          <div className="bg-[#faf2db] p-3 border border-[#a9aa9c]">
            <span className="text-[10px] uppercase font-bold text-[#47516a] block">Return Date</span>
            <strong className="font-['Anton',sans-serif] text-base text-[#18274b] tracking-wide block mt-0.5">{formatDate(booking.trip.return)}</strong>
            <span className="text-[11px] text-[#47516a] font-medium">{booking.days} {booking.days === 1 ? 'day rental' : 'days rental'}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Driver Info, Actions & Trip Essentials */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          {/* Driver Summary Card */}
          <div className="p-5 sm:p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
            <div className="flex items-center justify-between mb-4 border-b border-[#a9aa9c] pb-2">
              <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide">
                RESERVATION HOLDER
              </h2>
              <span className="text-xs uppercase font-bold tracking-wider text-[#2B580C] bg-[#eef7e6] px-2 py-0.5 border border-[#2B580C]/30">
                Verified Driver
              </span>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              <div>
                <dt className="text-[#47516a] uppercase">Driver Name</dt>
                <dd className="text-sm text-[#18274b] mt-0.5">{booking.driver.name}</dd>
              </div>
              <div>
                <dt className="text-[#47516a] uppercase">Contact Email</dt>
                <dd className="text-sm text-[#18274b] mt-0.5 truncate">{booking.driver.email}</dd>
              </div>
              <div>
                <dt className="text-[#47516a] uppercase">Collection Hub</dt>
                <dd className="text-sm text-[#18274b] mt-0.5">{location.name}</dd>
              </div>
              <div>
                <dt className="text-[#47516a] uppercase">Booking Code</dt>
                <dd className="font-['Anton',sans-serif] text-base text-[#18274b] mt-0.5 tracking-wider">{booking.reference}</dd>
              </div>
            </dl>
          </div>

          {/* Action Buttons with Anton Font */}
          {!isCancelled ? (
            <div className="flex flex-col gap-3">
              <Link
                href={`/booking?edit=${encodeURIComponent(booking.reference)}`}
                className="btn-tactile-yellow py-3.5 px-6 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 group text-[#18274b]"
              >
                <span>Edit reservation dates / depot</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={`/pickup-guide?location=${location.id}`}
                  className="btn-tactile-outline py-3 px-4 font-bold text-xs uppercase tracking-wider text-center text-[#18274b]"
                >
                  Pick-up guide
                </Link>
                <Link
                  href="/trip-pack"
                  className="btn-tactile-outline py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#18274b]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Trip pack</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-red-100/60 border border-red-300 text-xs text-red-950 font-bold">
                This reservation has been cancelled.
              </div>
              <Link
                href="/fleet"
                className="btn-tactile-yellow py-3.5 px-6 font-bold text-sm uppercase tracking-wider text-center text-[#18274b]"
              >
                Browse fleet to make a new booking →
              </Link>
            </div>
          )}

          {/* Trip Checklist & Depot Instructions Card - Fills vertical space, balances right column */}
          <div className="p-5 sm:p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
            <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-3 border-b border-[#a9aa9c] pb-2">
              PICK-UP CHECKLIST & RULES
            </h2>
            <ul className="flex flex-col gap-3 text-xs font-bold text-[#47516a]">
              <li className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-[#18274b] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#18274b]">Valid Driver&apos;s License:</strong> Bring your original physical license and government photo ID to collection.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#18274b] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#18274b]">Depot Hours:</strong> Open daily 08:00 AM – 08:00 PM. Call ahead if arriving after 07:30 PM.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Fuel className="w-4 h-4 text-[#18274b] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#18274b]">Fuel Policy:</strong> Pick up full, return full. Nearest fuel pump located within 2 km of depot.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2B580C] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#18274b]">24/7 Roadside Assistance:</strong> Mechanical dispatch included on all regional scenic drives.
                </span>
              </li>
            </ul>
          </div>

          {!isCancelled && (
            <button
              type="button"
              onClick={() => setCancelOpen(true)}
              className="text-xs font-bold uppercase tracking-wider text-red-900 hover:bg-red-200/60 px-3 py-1.5 border border-transparent hover:border-red-400 self-start cursor-pointer transition-colors"
            >
              Cancel this reservation
            </button>
          )}
        </motion.div>

        {/* Right Column: Ticket Stub */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
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
        </motion.div>
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
              Are you sure you want to cancel booking <strong>{booking.reference}</strong> for {car.name}? The reservation will be marked as cancelled in your profile.
            </Dialog.Description>

            <div className="flex items-center justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="btn-tactile-outline py-2.5 px-4 font-bold text-xs uppercase tracking-wider cursor-pointer text-[#18274b]"
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
