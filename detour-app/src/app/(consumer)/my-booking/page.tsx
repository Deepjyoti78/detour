'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBookingStore } from '@/stores/bookingStore';
import { CARS, LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import { formatMoney, formatDate } from '@/lib/pricing';
import { motion, AnimatePresence } from 'motion/react';
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
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  User,
  Sparkles,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function MyBookingPage() {
  const { booking, cancelBooking } = useBookingStore();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!booking) {
    return (
      <div className="w-[90%] max-w-3xl mx-auto pt-12 pb-24 text-center">
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight mb-4">
          MY BOOKING.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mb-8 font-medium">
          You do not have an active confirmed reservation on this device yet.
        </p>
        <Link
          href="/fleet"
          className="btn-tactile-yellow py-3.5 px-6 font-bold text-sm uppercase tracking-wider inline-block text-[#18274b] rounded-lg border-2 border-black shadow-[3px_3px_0px_#000000]"
        >
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
    <div className="w-[90%] max-w-5xl mx-auto pt-6 sm:pt-8 md:pt-10 pb-16 md:pb-20">
      {/* Top Bar / Navigation */}
      <div className="flex items-center justify-between mb-6">
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
          <span className="font-['Anton',sans-serif] text-sm tracking-wider text-[#18274b] bg-[#fce466] px-2.5 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_#000000]">
            {booking.reference}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="border-b-2 border-black/20 pb-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
              MY BOOKING.
            </h1>
            <p className="text-sm md:text-base text-[#47516a] mt-1.5 font-medium">
              {isCancelled
                ? 'This reservation was marked as cancelled. View details below.'
                : 'Click your reservation card to view complete itinerary, pricing breakdown, and collection checklist.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1.5 border-2 border-black rounded-lg text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000000] ${
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
      </div>

      {/* Single Elongated Horizontal Booking Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#faf2db] border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000000] overflow-hidden"
      >
        {/* Elongated Main Card Banner - Fully Clickable */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
          className="w-full flex flex-col md:flex-row items-stretch cursor-pointer hover:bg-[#faf4e5] transition-colors group select-none"
        >
          {/* Car Image Preview */}
          <div className="relative w-full md:w-64 lg:w-72 h-48 md:h-auto min-h-[180px] bg-[#203a78] shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden">
            <Image
              src={car.image}
              alt={car.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolute top-3 left-3 bg-[#18274b] text-[#faf2db] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase border border-[#a9aa9c] rounded">
              {car.transmission}
            </div>
          </div>

          {/* Elongated Card Core Details */}
          <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4">
            <div>
              {/* Reference & Category Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#18274b] text-[#faf2db] px-2.5 py-0.5 rounded">
                  {booking.reference}
                </span>
                <span className="text-xs uppercase font-bold text-[#47516a]">
                  {car.seats} SEATER · {car.category?.toUpperCase() || 'HERITAGE'}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-['Anton',sans-serif] text-3xl sm:text-4xl text-[#18274b] tracking-wide">
                {car.name.toUpperCase()}
              </h2>

              {/* High Utility Highlights Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-black/15 text-xs font-bold text-[#47516a]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#18274b] shrink-0" />
                  <span className="truncate">{location.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#18274b] shrink-0" />
                  <span>
                    {formatDate(booking.trip.pickup)} → {formatDate(booking.trip.return)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#18274b] shrink-0" />
                  <span className="truncate">{booking.driver.name}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Price & Interactive Chevron Action */}
            <div className="flex items-center justify-between pt-3 border-t border-black/15">
              <div className="flex items-baseline gap-2">
                <span className="font-['Anton',sans-serif] text-2xl sm:text-3xl text-[#18274b]">
                  {formatMoney(booking.total)}
                </span>
                <span className="text-xs font-bold text-[#47516a]">
                  total · {formatMoney(car.rate)} / day
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#18274b] text-[#faf2db] rounded-lg text-xs font-bold uppercase tracking-wider group-hover:bg-[#203a78] transition-colors shadow-[2px_2px_0px_#000000]">
                <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Full Details Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t-2 border-black bg-[#fdf8ee]"
            >
              <div className="p-6 sm:p-8 space-y-6">
                {/* 2-Column Details: Left Driver & Pricing Breakdown, Right Checklist & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Driver & Trip Specifics */}
                  <div className="p-5 bg-[#faf2db] border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000]">
                    <h3 className="font-['Anton',sans-serif] text-xl text-[#18274b] tracking-wide mb-3 pb-2 border-b border-black/20">
                      RESERVATION HOLDER & ITINERARY
                    </h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                      <div>
                        <dt className="text-[#47516a] uppercase">Driver Name</dt>
                        <dd className="text-sm text-[#18274b] mt-0.5">{booking.driver.name}</dd>
                      </div>
                      <div>
                        <dt className="text-[#47516a] uppercase">Contact Email</dt>
                        <dd className="text-sm text-[#18274b] mt-0.5 truncate">{booking.driver.email}</dd>
                      </div>
                      <div>
                        <dt className="text-[#47516a] uppercase">Depot Location</dt>
                        <dd className="text-sm text-[#18274b] mt-0.5">{location.name}</dd>
                      </div>
                      <div>
                        <dt className="text-[#47516a] uppercase">Duration</dt>
                        <dd className="text-sm text-[#18274b] mt-0.5">{booking.days} {booking.days === 1 ? 'day' : 'days'}</dd>
                      </div>
                    </dl>

                    {drive && (
                      <div className="mt-4 p-3 bg-[#d8e3fb] border border-black rounded-lg text-xs font-bold text-[#18274b] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#203a78]" />
                        <span>Scenic Pairing: {drive.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown Card */}
                  <div className="p-5 bg-[#faf2db] border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000]">
                    <h3 className="font-['Anton',sans-serif] text-xl text-[#18274b] tracking-wide mb-3 pb-2 border-b border-black/20">
                      PRICING BREAKDOWN
                    </h3>
                    <dl className="flex flex-col gap-2.5 text-xs font-bold text-[#18274b]">
                      <div className="flex justify-between">
                        <dt className="text-[#47516a]">Daily Rental Rate</dt>
                        <dd>{formatMoney(car.rate)} / day</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#47516a]">Subtotal ({booking.days} {booking.days === 1 ? 'day' : 'days'})</dt>
                        <dd>{formatMoney(booking.subtotal)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#47516a]">Taxes & Waiver (12.5%)</dt>
                        <dd>{formatMoney(booking.fees)}</dd>
                      </div>
                      <div className="flex justify-between pt-3 border-t-2 border-black font-['Anton',sans-serif] text-base">
                        <dt className="text-lg">TOTAL ESTIMATE</dt>
                        <dd className="text-2xl text-[#203a78]">{formatMoney(booking.total)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Pick-Up Rules & Checklist */}
                <div className="p-5 bg-[#faf2db] border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000]">
                  <h3 className="font-['Anton',sans-serif] text-xl text-[#18274b] tracking-wide mb-3 pb-2 border-b border-black/20">
                    DEPOT CHECK-IN CHECKLIST
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold text-[#47516a]">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#18274b] shrink-0 mt-0.5" />
                      <span><strong>Driving License:</strong> Original physical photo license required.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#18274b] shrink-0 mt-0.5" />
                      <span><strong>Hours:</strong> Open daily 08:00 AM – 08:00 PM.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Fuel className="w-4 h-4 text-[#18274b] shrink-0 mt-0.5" />
                      <span><strong>Fuel Policy:</strong> Pick up full, return full.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2B580C] shrink-0 mt-0.5" />
                      <span><strong>Roadside:</strong> 24/7 breakdown assistance included.</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                {!isCancelled ? (
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/booking?edit=${encodeURIComponent(booking.reference)}`}
                        className="btn-tactile-yellow py-2.5 px-4 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#18274b] shadow-[2px_2px_0px_#000000]"
                      >
                        <span>Edit dates / depot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/pickup-guide?location=${location.id}`}
                        className="btn-tactile-outline py-2.5 px-4 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider text-[#18274b] shadow-[2px_2px_0px_#000000]"
                      >
                        Pick-up guide
                      </Link>
                      <Link
                        href="/trip-pack"
                        className="btn-tactile-outline py-2.5 px-4 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#18274b] shadow-[2px_2px_0px_#000000]"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Trip pack</span>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCancelOpen(true)}
                      className="text-xs font-bold uppercase tracking-wider text-red-900 hover:bg-red-100 px-3 py-2 border border-red-400 rounded-lg cursor-pointer transition-colors"
                    >
                      Cancel reservation
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-red-900 bg-red-100 px-3 py-1.5 border border-red-300 rounded-lg">
                      This reservation is cancelled.
                    </span>
                    <Link
                      href="/fleet"
                      className="btn-tactile-yellow py-2.5 px-5 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider text-[#18274b] shadow-[2px_2px_0px_#000000]"
                    >
                      Book another vehicle →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Accessible Radix Cancellation Dialog Modal */}
      <Dialog.Root open={cancelOpen} onOpenChange={setCancelOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 animate-fade-in backdrop-blur-xs" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-[#faf2db] border-2 border-black rounded-xl shadow-[8px_8px_0px_#000000] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-700" />
                <span>CANCEL RESERVATION?</span>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="p-1 border border-black bg-[#faf2db] hover:bg-[#fce466] text-[#18274b] rounded cursor-pointer"
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
                  className="btn-tactile-outline py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer text-[#18274b]"
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
                className="py-2.5 px-4 bg-red-800 text-[#faf2db] font-bold text-xs uppercase tracking-wider border-2 border-black rounded-lg shadow-[3px_3px_0px_#000000] hover:bg-red-900 cursor-pointer"
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
