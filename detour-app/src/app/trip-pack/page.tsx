'use client';

import Link from 'next/link';
import { useBookingStore } from '@/stores/bookingStore';
import { CARS, LOCATIONS, SCENIC_DRIVES, PICKUP_CHECKLIST } from '@/lib/data';
import { formatDate } from '@/lib/pricing';
import { ArrowLeft, Printer } from 'lucide-react';

export default function TripPackPage() {
  const { booking } = useBookingStore();

  if (!booking || booking.status !== 'confirmed') {
    return (
      <div className="w-[90%] max-w-3xl mx-auto py-20 text-center">
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight mb-4">
          TRIP PACK UNAVAILABLE.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mb-8 font-medium">
          Confirm a demo reservation to generate your printable trip pack and packing checklist.
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

  return (
    <div className="w-[90%] max-w-4xl mx-auto py-12 md:py-16">
      {/* Top Actions Bar (Hidden on print) */}
      <div className="flex items-center justify-between border-b border-[#a9aa9c] pb-6 mb-10 no-print">
        <Link
          href="/my-booking"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My booking</span>
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-tactile-yellow py-2.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print or Save PDF</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="border-4 border-[#18274b] bg-[#faf2db] p-5 sm:p-8 md:p-12 shadow-[8px_8px_0px_#18274b]">
        {/* Cover Header */}
        <div className="border-b-2 border-[#18274b] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#47516a] block mb-1">
              DETOUR · SCENIC ROAD TRIPS
            </span>
            <h1 className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-6xl text-[#18274b] tracking-tight">
              TRIP PACK.
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs uppercase font-bold text-[#47516a] block">Booking Reference</span>
            <strong className="font-['Anton',sans-serif] text-2xl sm:text-3xl text-[#203a78] tracking-wider">
              {booking.reference}
            </strong>
          </div>
        </div>

        {/* Fact Grid */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-[#faf2db] border-2 border-[#18274b] mb-10 text-xs font-bold">
          <div>
            <dt className="text-[#47516a] uppercase">Reserved Car</dt>
            <dd className="text-base text-[#18274b] font-['Anton',sans-serif] tracking-wide mt-1">
              {car.name}
            </dd>
          </div>
          <div>
            <dt className="text-[#47516a] uppercase">Collection Depot</dt>
            <dd className="text-sm text-[#18274b] mt-1">
              {location.name}
            </dd>
          </div>
          <div>
            <dt className="text-[#47516a] uppercase">Pick-up Date</dt>
            <dd className="text-sm text-[#18274b] mt-1">
              {formatDate(booking.trip.pickup)}
            </dd>
          </div>
          <div>
            <dt className="text-[#47516a] uppercase">Return Date</dt>
            <dd className="text-sm text-[#18274b] mt-1">
              {formatDate(booking.trip.return)}
            </dd>
          </div>
        </dl>

        {/* Two-Column Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Checklist */}
          <div>
            <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-4 border-b border-[#a9aa9c] pb-2">
              PICK-UP CHECKLIST
            </h2>
            <ul className="flex flex-col gap-3">
              {PICKUP_CHECKLIST.map((item, idx) => (
                <li key={item} className="flex items-start gap-3 text-xs leading-relaxed font-bold text-[#18274b]">
                  <span className="w-5 h-5 border border-[#18274b] flex items-center justify-center shrink-0 font-['Anton',sans-serif]">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-[#47516a] mt-4 italic">
              Confirm the exact branch address, gate instructions, and opening hours with the operator prior to collection.
            </p>
          </div>

          {/* Scenic Itinerary */}
          <div>
            <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-4 border-b border-[#a9aa9c] pb-2">
              SCENIC ITINERARY
            </h2>
            {drive ? (
              <div>
                <p className="text-sm font-bold text-[#203a78] mb-3">
                  Route: {drive.name}
                </p>
                <ol className="flex flex-col gap-3">
                  {drive.stops.map(([stop, desc], idx) => (
                    <li key={stop} className="flex items-start gap-3 text-xs">
                      <span className="w-5 h-5 border border-[#18274b] bg-[#fce466] text-[#18274b] flex items-center justify-center shrink-0 font-bold">
                        {idx === 0 ? '●' : idx}
                      </span>
                      <div>
                        <strong className="text-[#18274b] block font-bold">{stop}</strong>
                        <span className="text-[#47516a]">{desc}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="text-xs text-[#47516a] leading-relaxed">
                No scenic drive was linked to this reservation. Explore signature drives to Columbia River Gorge, Oregon Coast, or Mount Hood at any time.
              </p>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-[#a9aa9c] flex items-center justify-between text-[11px] text-[#47516a]">
          <span>Prepared from your Detour demo booking reference {booking.reference}.</span>
          <span>India Scenic Drives · Offline Trip Pack</span>
        </div>
      </div>
    </div>
  );
}
