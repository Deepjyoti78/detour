'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/stores/bookingStore';
import { CARS, LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import { formatMoney, formatDate } from '@/lib/pricing';
import { ArrowRight, Printer, MapPin, Compass } from 'lucide-react';
import { motion } from 'motion/react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const isUpdated = Boolean(searchParams.get('updated'));
  const { booking } = useBookingStore();

  if (!booking || booking.status !== 'confirmed') {
    return (
      <div className="w-[90%] max-w-3xl mx-auto py-20 text-center">
        <h1 className="font-['Anton',sans-serif] text-5xl text-[#18274b] tracking-tight mb-4">
          NO CONFIRMED BOOKING FOUND.
        </h1>
        <p className="text-sm text-[#47516a] mb-8 font-medium">
          You don&apos;t have an active demo booking on this browser yet.
        </p>
        <Link href="/fleet" className="btn-tactile-yellow py-3 px-6 text-sm uppercase tracking-wider inline-block">
          Browse the fleet →
        </Link>
      </div>
    );
  }

  const car = CARS.find((c) => c.id === booking.carId) || CARS[0];
  const location = LOCATIONS.find((l) => l.id === booking.trip.location) || LOCATIONS[0];
  const drive = booking.trip.drive ? SCENIC_DRIVES.find((d) => d.id === booking.trip.drive) : null;

  return (
    <div className="w-[90%] max-w-5xl mx-auto pt-4 sm:pt-6 md:pt-8 pb-12 md:pb-16">
      {/* Top Banner - Moved upward without the demo badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 sm:mb-8 text-center sm:text-left border-b border-[#a9aa9c] pb-4 sm:pb-6"
      >
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-7xl text-[#18274b] tracking-tight">
          {isUpdated ? 'BOOKING UPDATED.' : 'YOU’RE BOOKED.'}
        </h1>
        <p className="text-sm sm:text-base text-[#47516a] mt-1.5 font-medium">
          {car.name} is reserved in this local demo. Keep your reference handy for pick-up.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Next Steps & Quick Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Reference Card with Smooth Sliding Interaction */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, x: 2, transition: { duration: 0.2, ease: 'easeOut' } }}
            whileTap={{ scale: 0.985, y: 1 }}
            className="p-5 sm:p-6 bg-[#fce466] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b] hover:shadow-[9px_9px_0px_#18274b] transition-shadow cursor-default"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#18274b] block mb-1">
              Booking Reference
            </span>
            <strong className="font-['Anton',sans-serif] text-4xl text-[#18274b] tracking-wider block">
              {booking.reference}
            </strong>
            <p className="text-xs text-[#18274b]/80 mt-2 font-medium">
              Save this reference number for station check-in and managing your booking.
            </p>
          </motion.div>

          {/* Collection Guidance Card with Smooth Sliding Interaction */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, x: 2, transition: { duration: 0.2, ease: 'easeOut' } }}
            whileTap={{ scale: 0.985, y: 1 }}
            className="p-5 sm:p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b] hover:shadow-[7px_7px_0px_#18274b] transition-shadow cursor-default"
          >
            <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#203a78]" />
              <span>COLLECTION DEPOT</span>
            </h2>
            <p className="text-sm font-bold text-[#18274b] mb-1">
              {location.name}
            </p>
            <p className="text-xs text-[#47516a] mb-5 leading-relaxed">
              Arrive on {formatDate(booking.trip.pickup)} with your driver&apos;s license and booking reference.
            </p>
            <Link
              href={`/pickup-guide?location=${location.id}`}
              className="text-xs font-bold text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 -ml-2 transition-colors uppercase tracking-wider inline-flex items-center gap-1 group"
            >
              <span>View depot directions & checklist</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </motion.div>

          {/* Actions with Smooth Tactile Physics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97, y: 2 }} className="flex-1">
              <Link
                href="/trip-pack"
                className="btn-tactile-yellow py-3.5 px-6 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 text-center w-full"
              >
                <Printer className="w-4 h-4" />
                <span>Printable trip pack</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97, y: 2 }} className="flex-1">
              <Link
                href="/my-booking"
                className="btn-tactile-outline py-3.5 px-6 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 text-center w-full group"
              >
                <span>Manage reservation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Ticket Stub Receipt with Smooth Sliding Entrance & Lift */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
          whileTap={{ scale: 0.99, y: 1 }}
          className="lg:col-span-6 border-2 border-[#18274b] bg-[#faf2db] shadow-[8px_8px_0px_#18274b] hover:shadow-[12px_12px_0px_#18274b] transition-shadow overflow-hidden cursor-default"
        >
          {/* Header image */}
          <div className="relative h-48 w-full border-b-2 border-[#18274b] bg-[#203a78]">
            <Image
              src={car.image}
              alt={car.alt}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 right-3 bg-[#fce466] text-[#18274b] text-xs font-bold px-2.5 py-1 tracking-wider uppercase border border-[#18274b]">
              Confirmed Receipt
            </div>
          </div>

          {/* Receipt details */}
          <div className="p-6 relative ticket-perforation bg-[#faf2db]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-['Anton',sans-serif] text-3xl text-[#18274b]">
                  {car.name}
                </h3>
                <p className="text-xs text-[#47516a] font-bold">
                  {car.seats} seats · {car.transmission}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#47516a] block uppercase font-bold">Driver</span>
                <strong className="text-xs text-[#18274b] block">{booking.driver.name}</strong>
                <span className="text-[11px] text-[#47516a]">{booking.driver.email}</span>
              </div>
            </div>

            {drive && (
              <div className="p-3 bg-[#d8e3fb] border border-[#18274b] text-xs font-bold text-[#18274b] mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#203a78]" />
                <span>Planned Drive: {drive.name}</span>
              </div>
            )}

            {/* Dates */}
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

            {/* Cost table */}
            <dl className="flex flex-col gap-2 text-xs font-bold text-[#18274b]">
              <div className="flex justify-between">
                <dt className="text-[#47516a]">
                  Rental ({booking.days} days × {formatMoney(car.rate)})
                </dt>
                <dd>{formatMoney(booking.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#47516a]">Sample taxes and fees (12.5%)</dt>
                <dd>{formatMoney(booking.fees)}</dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#18274b] text-base font-['Anton',sans-serif]">
                <dt className="tracking-wide text-lg">TOTAL DEMO COST</dt>
                <dd className="text-2xl text-[#203a78]">{formatMoney(booking.total)}</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
