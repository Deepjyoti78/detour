'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CARS, LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import { useTripStore } from '@/stores/tripStore';
import { useBookingStore } from '@/stores/bookingStore';
import {
  formatMoney,
  formatDate,
  calculateQuote,
  isCarAvailable,
  getNearbyAvailableTrip,
  generateBookingReference,
} from '@/lib/pricing';
import RetroDatePicker from '@/components/planner/RetroDatePicker';
import { ArrowLeft, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editRef = searchParams.get('edit');
  const queryCar = searchParams.get('car');

  const { trip, setLocation, setPickup, setReturn } = useTripStore();
  const { booking, profile, saveBooking } = useBookingStore();

  const isEditing = Boolean(editRef && booking && booking.reference === editRef);

  // Selected car
  const [selectedCarId, setSelectedCarId] = useState<string>(() => {
    if (isEditing && booking) return booking.carId;
    if (queryCar && CARS.some((c) => c.id === queryCar)) return queryCar;
    return CARS[0].id;
  });

  // Driver details
  const [driverName, setDriverName] = useState(
    isEditing && booking ? booking.driver.name : profile?.name || ''
  );
  const [driverEmail, setDriverEmail] = useState(
    isEditing && booking ? booking.driver.email : profile?.email || ''
  );
  const [errorMsg, setErrorMsg] = useState('');

  const currentCar = CARS.find((c) => c.id === selectedCarId) || CARS[0];
  const currentLocation = LOCATIONS.find((l) => l.id === trip.location) || LOCATIONS[0];
  const currentDrive = trip.drive ? SCENIC_DRIVES.find((d) => d.id === trip.drive) : null;

  const quote = calculateQuote(currentCar, trip);
  const available = isCarAvailable(currentCar, trip);
  const nearbySuggestion = !available ? getNearbyAvailableTrip(currentCar, trip) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!available || !quote) {
      setErrorMsg('Please select valid rental dates when this car is available.');
      return;
    }

    if (!driverName.trim() || !driverEmail.trim()) {
      setErrorMsg('Please provide your name and email address.');
      return;
    }

    const timestamp = new Date().toISOString();
    const reference = isEditing && booking ? booking.reference : generateBookingReference();

    const newBooking = {
      reference,
      carId: currentCar.id,
      trip: { ...trip },
      driver: {
        name: driverName.trim(),
        email: driverEmail.trim(),
      },
      ...quote,
      status: 'confirmed' as const,
      createdAt: isEditing && booking ? booking.createdAt : timestamp,
      updatedAt: isEditing ? timestamp : undefined,
    };

    saveBooking(newBooking);

    if (isEditing) {
      router.push(`/confirmation?updated=${encodeURIComponent(reference)}`);
    } else {
      router.push('/confirmation');
    }
  };

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-8 md:py-10">
      {/* Back button (Single arrow icon + text) */}
      <Link
        href={isEditing ? '/my-booking' : '/fleet'}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>{isEditing ? 'Back to My booking' : 'Back to fleet'}</span>
      </Link>

      <div className="border-b border-[#a9aa9c] pb-5 mb-8">
        <h1 className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-6xl text-[#18274b] tracking-tight">
          {isEditing ? 'EDIT RESERVATION.' : 'REVIEW & BOOK.'}
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
          {isEditing
            ? `Update your dates or depot for booking ${booking?.reference}.`
            : 'Check your dates and rental quote, then confirm your demo reservation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
            {/* Trip Details Section */}
            <section className="p-5 sm:p-8 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
              <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-6 border-b border-[#a9aa9c] pb-3">
                1. TRIP DETAILS
              </h2>

              <div className="flex flex-col gap-5">
                {/* Car select */}
                <div>
                  <label htmlFor="car-select" className="block text-xs uppercase font-bold text-[#47516a] mb-1.5">
                    Vehicle Selection
                  </label>
                  <select
                    id="car-select"
                    disabled={isEditing}
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    className="w-full bg-[#faf2db] border border-[#18274b] p-3 font-bold text-sm text-[#18274b] rounded-none disabled:bg-[#a9aa9c]/20 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {CARS.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#faf2db]">
                        {c.name} · {formatMoney(c.rate)} / day ({c.transmission})
                      </option>
                    ))}
                  </select>
                  {isEditing && (
                    <span className="text-[11px] text-[#47516a] mt-1 block">
                      Vehicle model is locked for this booking. You can modify dates and pickup depot below.
                    </span>
                  )}
                </div>

                {/* Location select */}
                <div>
                  <label htmlFor="location-select" className="block text-xs uppercase font-bold text-[#47516a] mb-1.5">
                    Pick-up and Return Depot
                  </label>
                  <select
                    id="location-select"
                    value={trip.location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#faf2db] border border-[#18274b] p-3 font-bold text-sm text-[#18274b] rounded-none cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} className="bg-[#faf2db]">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date range picker */}
                <div>
                  <span className="block text-xs uppercase font-bold text-[#47516a] mb-1.5">
                    Rental Dates
                  </span>
                  <RetroDatePicker
                    pickup={trip.pickup}
                    returnDate={trip.return}
                    closedDay={currentCar.closedDay}
                    onSelect={(p, r) => {
                      setPickup(p);
                      setReturn(r);
                    }}
                  />
                </div>

                {/* Availability Alert */}
                {!available && (
                  <div className="p-4 bg-red-100/60 border border-red-400 text-red-950 text-xs flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle className="w-4 h-4 text-red-800" />
                      <span>{currentCar.name} is unavailable on your selected pick-up date.</span>
                    </div>
                    {nearbySuggestion && (
                      <button
                        type="button"
                        onClick={() => {
                          setPickup(nearbySuggestion.pickup);
                          setReturn(nearbySuggestion.return);
                        }}
                        className="text-xs font-bold text-red-950 bg-red-200/80 px-2.5 py-1.5 border border-red-400 hover:bg-red-300 transition-colors text-left cursor-pointer inline-block w-fit"
                      >
                        Reschedule to next available slot ({formatDate(nearbySuggestion.pickup)}) →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Driver Details Section */}
            <section className="p-5 sm:p-8 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
              <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-6 border-b border-[#a9aa9c] pb-3">
                2. DRIVER DETAILS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="driver-name" className="block text-xs uppercase font-bold text-[#47516a] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="driver-name"
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Maya Chen"
                    className="w-full bg-[#faf2db] border border-[#18274b] p-3 text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
                  />
                </div>

                <div>
                  <label htmlFor="driver-email" className="block text-xs uppercase font-bold text-[#47516a] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="driver-email"
                    type="email"
                    required
                    value={driverEmail}
                    onChange={(e) => setDriverEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full bg-[#faf2db] border border-[#18274b] p-3 text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
                  />
                </div>
              </div>

              <p className="text-xs text-[#47516a] mt-4 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#203a78]" />
                <span>Demo mode: No actual credit card or payment is collected.</span>
              </p>
            </section>

            {errorMsg && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-900 text-xs font-bold">
                {errorMsg}
              </div>
            )}

            {/* Confirm Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!available}
              className="w-full py-4 btn-tactile-yellow flex items-center justify-center gap-3 text-sm uppercase tracking-wider font-bold disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              <span>{isEditing ? 'Save reservation changes' : 'Confirm demo booking'}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </motion.button>
          </form>
        </div>

        {/* Right Column: Ticket Stub Summary */}
        <div className="lg:col-span-5">
          <div className="border-2 border-[#18274b] bg-[#faf2db] shadow-[8px_8px_0px_#18274b] overflow-hidden static lg:sticky top-8">
            {/* Image Header */}
            <div className="relative h-48 w-full border-b-2 border-[#18274b] bg-[#203a78]">
              <Image
                src={currentCar.image}
                alt={currentCar.alt}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#18274b] text-[#faf2db] text-xs font-bold px-2.5 py-1 tracking-wider uppercase border border-[#a9aa9c]">
                Rental Summary
              </div>
            </div>

            {/* Body */}
            <div className="p-6 relative ticket-perforation">
              <h3 className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide mb-1">
                {currentCar.name}
              </h3>
              <p className="text-xs text-[#47516a] font-bold mb-4">
                Depot: {currentLocation.name}
              </p>

              {currentDrive && (
                <div className="p-3 bg-[#d8e3fb] border border-[#18274b] text-xs font-bold text-[#18274b] mb-4">
                  Planned Itinerary: {currentDrive.name}
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 border-y border-[#a9aa9c] py-3 text-xs mb-4">
                <div>
                  <span className="text-[#47516a] uppercase font-bold block">Pick-up</span>
                  <strong className="text-sm text-[#18274b]">{formatDate(trip.pickup)}</strong>
                </div>
                <div>
                  <span className="text-[#47516a] uppercase font-bold block">Return</span>
                  <strong className="text-sm text-[#18274b]">{formatDate(trip.return)}</strong>
                </div>
              </div>

              {/* Quote Breakdown */}
              {quote && (
                <dl className="flex flex-col gap-2 text-xs font-bold text-[#18274b]">
                  <div className="flex justify-between">
                    <dt className="text-[#47516a]">
                      Rental ({quote.days} {quote.days === 1 ? 'day' : 'days'} × {formatMoney(currentCar.rate)})
                    </dt>
                    <dd>{formatMoney(quote.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#47516a]">Sample taxes and fees (12.5%)</dt>
                    <dd>{formatMoney(quote.fees)}</dd>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[#18274b] text-base font-['Anton',sans-serif]">
                    <dt className="tracking-wide text-lg">
                      {isEditing ? 'REVISED TOTAL' : 'ESTIMATED TOTAL'}
                    </dt>
                    <dd className="text-2xl text-[#203a78]">{formatMoney(quote.total)}</dd>
                  </div>

                  {isEditing && booking && (
                    <div className="flex justify-between text-xs text-[#47516a] pt-1">
                      <dt>Previous booking total:</dt>
                      <dd>{formatMoney(booking.total)}</dd>
                    </div>
                  )}
                </dl>
              )}

              <p className="text-[11px] text-[#47516a] mt-6 italic text-center">
                Detour is a local demonstration. No real payments are collected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading checkout...</div>}>
      <BookingContent />
    </Suspense>
  );
}
