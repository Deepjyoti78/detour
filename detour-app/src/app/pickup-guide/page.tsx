'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LOCATIONS, PICKUP_GUIDES_DATA, PICKUP_CHECKLIST } from '@/lib/data';
import { useBookingStore } from '@/stores/bookingStore';
import { formatDate } from '@/lib/pricing';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

function PickupGuideContent() {
  const searchParams = useSearchParams();
  const initialLoc = searchParams.get('location') || 'mumbai';
  const [selectedLocId, setSelectedLocId] = useState(
    PICKUP_GUIDES_DATA[initialLoc] ? initialLoc : 'mumbai'
  );

  const { booking } = useBookingStore();
  const branch = LOCATIONS.find((l) => l.id === selectedLocId) || LOCATIONS[0];
  const guide = PICKUP_GUIDES_DATA[selectedLocId];

  const hasConfirmedBookingAtBranch =
    booking &&
    booking.status === 'confirmed' &&
    booking.trip.location === selectedLocId;

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-12 md:py-16">
      <Link
        href="/locations"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>All locations</span>
      </Link>

      <div className="border-b border-[#a9aa9c] pb-6 mb-8">
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
          YOUR PICK-UP GUIDE.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
          Check branch directions, collection sequence, and what to bring before departure.
        </p>
      </div>

      {/* Location Switcher Tabs */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 border-b border-[#a9aa9c]/60">
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => setSelectedLocId(loc.id)}
            className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider border border-[#18274b] transition-all cursor-pointer ${
              selectedLocId === loc.id
                ? 'bg-[#18274b] text-[#faf2db] shadow-[3px_3px_0px_#18274b]'
                : 'bg-[#faf2db] text-[#18274b] hover:bg-[#fce466]'
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* Top Overview: Station Schematic & Branch Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Schematic Sequence */}
        <div className="lg:col-span-6 bg-[#eae6ca] border-2 border-[#18274b] p-5 sm:p-8 shadow-[6px_6px_0px_#18274b]">
          <div className="flex items-center justify-between border-b border-[#a9aa9c] pb-3 mb-6">
            <span className="font-['Anton',sans-serif] text-xl tracking-wider text-[#18274b]">
              COLLECTION SEQUENCE
            </span>
            <span className="text-xs font-bold uppercase bg-[#faf2db] px-2 py-0.5 border border-[#18274b]">
              {branch.name}
            </span>
          </div>

          <ol className="flex flex-col gap-6">
            {guide.map.map((stepTitle, idx) => (
              <li key={stepTitle} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-none border-2 border-[#18274b] bg-[#fce466] text-[#18274b] font-bold text-sm flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <strong className="text-base text-[#18274b] font-bold">
                  {stepTitle}
                </strong>
              </li>
            ))}
          </ol>
        </div>

        {/* Branch Card & Active Reservation Callout */}
        <div className="lg:col-span-6 border-2 border-[#18274b] bg-[#faf2db] p-5 sm:p-8 shadow-[6px_6px_0px_#18274b] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2">
              <MapPin className="w-4 h-4 text-[#203a78]" />
              <span>Depot Overview</span>
            </div>
            <h2 className="font-['Anton',sans-serif] text-2xl sm:text-3xl text-[#18274b] tracking-wide mb-2">
              {branch.name}
            </h2>
            <p className="text-sm text-[#47516a] mb-6 leading-relaxed">
              {guide.intro}
            </p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-[#a9aa9c] py-4 text-xs font-bold mb-6">
              <div>
                <dt className="text-[#47516a] uppercase">Branch Address</dt>
                <dd className="text-[#18274b] text-sm mt-0.5">{branch.name} Depot</dd>
              </div>
              <div>
                <dt className="text-[#47516a] uppercase">Hours of Operation</dt>
                <dd className="text-[#18274b] text-sm mt-0.5">08:00 – 18:00 Daily</dd>
              </div>
            </dl>

            {hasConfirmedBookingAtBranch && (
              <div className="p-4 bg-[#d8e3fb] border border-[#18274b] mb-6 text-xs">
                <span className="text-[#203a78] font-bold uppercase tracking-wider block">
                  Active Demo Reservation
                </span>
                <strong className="text-sm text-[#18274b] block mt-0.5">
                  Ref: {booking.reference}
                </strong>
                <p className="text-[#47516a] mt-1">
                  Pick-up on {formatDate(booking.trip.pickup)}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {hasConfirmedBookingAtBranch ? (
              <Link
                href="/my-booking"
                className="btn-tactile-yellow py-3 px-6 text-xs uppercase tracking-wider font-bold flex items-center gap-2 group"
              >
                <span>View my booking</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href="/#trip-planner"
                className="btn-tactile-yellow py-3 px-6 text-xs uppercase tracking-wider font-bold flex items-center gap-2 group"
              >
                <span>Plan a rental here</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Directions & Pre-Pickup Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#a9aa9c] pt-12">
        {/* Directions */}
        <div>
          <h2 className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide mb-6">
            GETTING THERE
          </h2>
          <ol className="flex flex-col gap-6">
            {guide.directions.map(([heading, text], index) => (
              <li key={heading} className="border-l-2 border-[#18274b] pl-4">
                <strong className="text-base text-[#18274b] block font-bold">
                  {index + 1}. {heading}
                </strong>
                <p className="text-xs text-[#47516a] mt-1 leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Checklist */}
        <div>
          <h2 className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide mb-6">
            BEFORE YOU ARRIVE
          </h2>
          <ul className="flex flex-col gap-4 mb-8">
            {PICKUP_CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 p-3 bg-[#faf2db] border border-[#a9aa9c]">
                <CheckCircle2 className="w-5 h-5 text-[#203a78] shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-[#18274b] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/faq"
            className="text-xs font-bold text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 -ml-2 transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <span>Have questions? Read the rental FAQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PickupGuidePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading pick-up guide...</div>}>
      <PickupGuideContent />
    </Suspense>
  );
}
