'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types';
import { useTripStore } from '@/stores/tripStore';
import {
  formatMoney,
  calculateQuote,
  isCarAvailable,
  getNearbyAvailableTrip,
  formatDate,
} from '@/lib/pricing';
import { ArrowLeft, ArrowRight, Users, Briefcase, Cog } from 'lucide-react';

interface CarDetailViewProps {
  car: Car;
}

export default function CarDetailView({ car }: CarDetailViewProps) {
  const { trip, setPickup, setReturn } = useTripStore();

  const quote = calculateQuote(car, trip);
  const available = isCarAvailable(car, trip);
  const nearbyTrip = !available ? getNearbyAvailableTrip(car, trip) : null;

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-12 md:py-16">
      {/* Back button */}
      <Link
        href="/fleet"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to fleet</span>
      </Link>

      {/* Main Vehicle Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[#a9aa9c] pb-16">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative h-80 sm:h-[420px] w-full border-2 border-[#18274b] shadow-[8px_8px_0px_#18274b] overflow-hidden bg-[#203a78]">
            <Image
              src={car.image}
              alt={car.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <p className="text-xs text-[#47516a] italic">
            {car.name} · Detour fleet showcase model
          </p>
        </div>

        {/* Right Column: Vehicle Details & Booking Widget */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#47516a]">
                {car.transmission} · {car.seats} SEATER
              </span>
              <span className="text-xs font-bold text-[#203a78] bg-[#d8e3fb] px-2.5 py-0.5 border border-[#203a78]/30">
                {available ? 'Available' : 'Unavailable on date'}
              </span>
            </div>
            <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
              {car.name.toUpperCase()}.
            </h1>
            <p className="text-base text-[#47516a] mt-3 leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-2 border-y border-[#a9aa9c] py-4 text-center">
            <div className="border-r border-[#a9aa9c]/60 pr-2">
              <span className="text-xs text-[#47516a] block uppercase font-bold">Seats</span>
              <strong className="text-xl font-['Anton',sans-serif] text-[#18274b] flex items-center justify-center gap-1 mt-1">
                <Users className="w-4 h-4" /> {car.seats}
              </strong>
            </div>
            <div className="border-r border-[#a9aa9c]/60 pr-2">
              <span className="text-xs text-[#47516a] block uppercase font-bold">Luggage</span>
              <strong className="text-xl font-['Anton',sans-serif] text-[#18274b] flex items-center justify-center gap-1 mt-1">
                <Briefcase className="w-4 h-4" /> {car.luggage} bags
              </strong>
            </div>
            <div>
              <span className="text-xs text-[#47516a] block uppercase font-bold">Gearbox</span>
              <strong className="text-xl font-['Anton',sans-serif] text-[#18274b] flex items-center justify-center gap-1 mt-1">
                <Cog className="w-4 h-4" /> {car.transmission}
              </strong>
            </div>
          </div>

          {/* Best For */}
          <div className="p-4 bg-[#faf2db] border-2 border-[#18274b]">
            <h2 className="text-xs uppercase font-bold tracking-wider text-[#47516a] mb-1">
              Best suited for
            </h2>
            <p className="text-sm font-medium text-[#18274b]">
              {car.bestFor}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b]">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="font-['Anton',sans-serif] text-4xl text-[#18274b]">
                  {formatMoney(car.rate)}
                </span>
                <span className="text-xs text-[#47516a] ml-1">/ day</span>
              </div>
              {quote && available && (
                <div className="text-right">
                  <span className="text-xs text-[#47516a] block">Estimated Trip Total</span>
                  <strong className="text-lg font-bold text-[#18274b]">
                    {formatMoney(quote.total)}
                  </strong>
                </div>
              )}
            </div>

            {/* Action Button */}
            {available ? (
              <Link
                href={`/booking?car=${car.id}`}
                className="btn-tactile-yellow w-full py-3.5 px-6 flex items-center justify-center gap-2 text-sm tracking-wider uppercase group"
              >
                <span>Continue to booking</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : nearbyTrip ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-red-800 font-bold">
                  This car is unavailable on your selected pick-up day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPickup(nearbyTrip.pickup);
                    setReturn(nearbyTrip.return);
                  }}
                  className="btn-tactile-outline w-full py-3 px-4 text-xs font-bold"
                >
                  Reschedule to {formatDate(nearbyTrip.pickup)} →
                </button>
              </div>
            ) : (
              <Link
                href="/#trip-planner"
                className="btn-tactile-outline w-full py-3 px-4 text-center text-xs font-bold"
              >
                Change rental dates
              </Link>
            )}

            <div className="mt-4 pt-3 border-t border-[#a9aa9c]/60 flex items-center justify-between text-xs font-bold">
              <Link href={`/compare?cars=${car.id}`} className="text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 -ml-2 transition-colors">
                Compare with other cars →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="mb-8">
          <h2 className="font-['Anton',sans-serif] text-4xl text-[#18274b] tracking-wide">
            A CLOSER LOOK.
          </h2>
          <p className="text-sm text-[#47516a] mt-1 font-medium">
            Illustrative interior cabin and luggage capacity views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <figure className="border border-[#a9aa9c] bg-[#faf2db] overflow-hidden shadow-[4px_4px_0px_#18274b]">
            <div className="relative h-64 w-full bg-[#18274b]">
              <Image
                src="/assets/car-gallery.jpg"
                alt={`Interior cabin view of ${car.name}`}
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="p-4 border-t border-[#a9aa9c] text-xs font-bold flex justify-between text-[#18274b]">
              <span>Interior Cabin View</span>
              <span className="text-[#47516a]">{car.seats} Passenger Seating</span>
            </figcaption>
          </figure>

          <figure className="border border-[#a9aa9c] bg-[#faf2db] overflow-hidden shadow-[4px_4px_0px_#18274b]">
            <div className="relative h-64 w-full bg-[#18274b]">
              <Image
                src={car.image}
                alt={`Luggage and exterior view of ${car.name}`}
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="p-4 border-t border-[#a9aa9c] text-xs font-bold flex justify-between text-[#18274b]">
              <span>Luggage Capacity</span>
              <span className="text-[#47516a]">Accommodates {car.luggage} Standard Bags</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
