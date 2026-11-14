'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types';
import { useTripStore } from '@/stores/tripStore';
import { CARS, LOCATIONS } from '@/lib/data';
import {
  formatMoney,
  calculateQuote,
  formatDate,
} from '@/lib/pricing';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Briefcase,
  Cog,
  CheckCircle2,
  ShieldCheck,
  Fuel,
  Compass,
} from 'lucide-react';
import VehicleCard from './VehicleCard';

interface CarDetailViewProps {
  car: Car;
}

export default function CarDetailView({ car }: CarDetailViewProps) {
  const { trip, setLocation } = useTripStore();
  const quote = calculateQuote(car, trip);
  const selectedLocation = LOCATIONS.find((l) => l.id === trip.location) || LOCATIONS[0];

  // Similar cars in same category or fleet
  const similarCars = CARS.filter((c) => c.id !== car.id && (c.category === car.category || !c.category)).slice(0, 3);

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-10 md:py-16">
      {/* Back button */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/fleet"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to fleet</span>
        </Link>
        <span className="text-xs uppercase font-bold tracking-widest text-[#47516a]">
          Fleet Model / {car.id.toUpperCase()}
        </span>
      </div>

      {/* Main Vehicle Showcase & Interactive Booking Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#a9aa9c] pb-16">
        {/* Left Column: Image Showcase & Deep Mechanical Specs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative h-80 sm:h-[440px] w-full border-2 border-[#18274b] shadow-[8px_8px_0px_#18274b] overflow-hidden bg-[#203a78]">
            <Image
              src={car.image}
              alt={car.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {car.category && (
              <div className="absolute top-4 left-4 bg-[#fce466] text-[#18274b] text-xs font-bold px-3 py-1 tracking-wider uppercase border border-[#18274b] shadow-[2px_2px_0px_#18274b]">
                {car.category} Series
              </div>
            )}
            <div className="absolute top-4 right-4 bg-[#18274b] text-[#faf2db] text-xs font-bold px-3 py-1 tracking-wider uppercase border border-[#a9aa9c]">
              {car.transmission}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#47516a] font-bold">
            <span className="flex items-center gap-1.5 text-[#2B580C]">
              <CheckCircle2 className="w-4 h-4" /> Sanitized & Ready for Departure
            </span>
            <span>Detour Verified Collection Model</span>
          </div>

          {/* Detailed Mechanical Spec Card */}
          <div className="p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
            <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-4 border-b border-[#a9aa9c] pb-2">
              VEHICLE SPECIFICATIONS & CAPABILITIES
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold">
              <div className="border border-[#a9aa9c]/60 p-3 bg-[#fdf8ee]">
                <span className="text-[#47516a] block uppercase text-[10px]">Passenger Capacity</span>
                <span className="text-base text-[#18274b] font-['Anton',sans-serif] flex items-center gap-1 mt-1">
                  <Users className="w-4 h-4 text-[#18274b]" /> {car.seats} Passengers
                </span>
              </div>
              <div className="border border-[#a9aa9c]/60 p-3 bg-[#fdf8ee]">
                <span className="text-[#47516a] block uppercase text-[10px]">Cargo Volume</span>
                <span className="text-base text-[#18274b] font-['Anton',sans-serif] flex items-center gap-1 mt-1">
                  <Briefcase className="w-4 h-4 text-[#18274b]" /> {car.luggage} Standard Bags
                </span>
              </div>
              <div className="border border-[#a9aa9c]/60 p-3 bg-[#fdf8ee]">
                <span className="text-[#47516a] block uppercase text-[10px]">Transmission</span>
                <span className="text-base text-[#18274b] font-['Anton',sans-serif] flex items-center gap-1 mt-1">
                  <Cog className="w-4 h-4 text-[#18274b]" /> {car.transmission}
                </span>
              </div>
              <div className="border border-[#a9aa9c]/60 p-3 bg-[#fdf8ee]">
                <span className="text-[#47516a] block uppercase text-[10px]">Fuel Policy</span>
                <span className="text-base text-[#18274b] font-['Anton',sans-serif] flex items-center gap-1 mt-1">
                  <Fuel className="w-4 h-4 text-[#18274b]" /> Full to Full
                </span>
              </div>
              <div className="border border-[#a9aa9c]/60 p-3 bg-[#fdf8ee]">
                <span className="text-[#47516a] block uppercase text-[10px]">Route Pairing</span>
                <span className="text-base text-[#18274b] font-['Anton',sans-serif] flex items-center gap-1 mt-1">
                  <Compass className="w-4 h-4 text-[#18274b]" /> Scenic & City
                </span>
              </div>
              <div className="border border-[#a9aa9c]/60 p-3 bg-[#fdf8ee]">
                <span className="text-[#47516a] block uppercase text-[10px]">Breakdown Coverage</span>
                <span className="text-base text-[#2B580C] font-['Anton',sans-serif] flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-4 h-4" /> 24/7 Roadside
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Vehicle Title, Details & Interactive Booking Widget */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#47516a]">
                {car.transmission} · {car.seats} SEATER · {car.category?.toUpperCase() || 'HERITAGE'}
              </span>
              <span className="text-xs font-bold text-[#203a78] bg-[#d8e3fb] px-2.5 py-0.5 border border-[#203a78]/30">
                Ready for collection
              </span>
            </div>
            <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
              {car.name.toUpperCase()}.
            </h1>
            <p className="text-base text-[#47516a] mt-2.5 leading-relaxed font-medium">
              {car.description}
            </p>
          </div>

          {/* Best Suited For Box */}
          <div className="p-4 bg-[#faf2db] border-2 border-[#18274b]">
            <h2 className="text-xs uppercase font-bold tracking-wider text-[#47516a] mb-1">
              Curator Notes & Recommended Drives
            </h2>
            <p className="text-xs sm:text-sm font-medium text-[#18274b] leading-relaxed">
              {car.bestFor}
            </p>
          </div>

          {/* Comprehensive Interactive Booking Box */}
          <div className="p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
            <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-3 border-b border-[#a9aa9c] pb-2">
              RESERVE {car.name.toUpperCase()}
            </h2>

            {/* Pricing Header: / day on the left side of the rate */}
            <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[#a9aa9c]/50">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs uppercase font-bold text-[#47516a]">/ day</span>
                <span className="font-['Anton',sans-serif] text-4xl text-[#18274b]">
                  {formatMoney(car.rate)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#47516a] font-bold block">Estimated Total</span>
                <strong className="text-xl font-['Anton',sans-serif] text-[#18274b]">
                  {quote ? formatMoney(quote.total) : formatMoney(car.rate * 2)}
                </strong>
              </div>
            </div>

            {/* Depot Selector Dropdown */}
            <div className="mb-4">
              <label htmlFor="depot-select" className="text-xs font-bold uppercase tracking-wider text-[#47516a] block mb-1.5">
                Pick-up & Return Depot
              </label>
              <select
                id="depot-select"
                value={trip.location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-[#faf2db] border-2 border-[#18274b] text-xs font-bold text-[#18274b] cursor-pointer outline-none shadow-[2px_2px_0px_#18274b]"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Selected Dates */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs font-bold">
              <div className="p-2.5 bg-[#fdf8ee] border border-[#a9aa9c]">
                <span className="text-[10px] uppercase text-[#47516a] block">Pick-up Date</span>
                <strong className="text-xs text-[#18274b]">{formatDate(trip.pickup)}</strong>
              </div>
              <div className="p-2.5 bg-[#fdf8ee] border border-[#a9aa9c]">
                <span className="text-[10px] uppercase text-[#47516a] block">Return Date</span>
                <strong className="text-xs text-[#18274b]">{formatDate(trip.return)}</strong>
              </div>
            </div>

            {/* Itemized Price Quote */}
            <dl className="flex flex-col gap-1.5 text-xs font-bold text-[#47516a] py-3 border-y border-[#a9aa9c]/60">
              <div className="flex justify-between">
                <dt>Daily Rental Rate</dt>
                <dd className="text-[#18274b]">{formatMoney(car.rate)} / day</dd>
              </div>
              <div className="flex justify-between">
                <dt>Trip Duration</dt>
                <dd className="text-[#18274b]">{quote ? quote.days : 2} days</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes, Airport Fees & Waiver (12.5%)</dt>
                <dd className="text-[#18274b]">{quote ? formatMoney(quote.fees) : formatMoney(Math.round(car.rate * 2 * 0.125))}</dd>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#a9aa9c]/40 font-['Anton',sans-serif] text-base text-[#18274b]">
                <dt className="text-lg">TOTAL ESTIMATE</dt>
                <dd className="text-2xl text-[#203a78]">
                  {quote ? formatMoney(quote.total) : formatMoney(Math.round(car.rate * 2 * 1.125))}
                </dd>
              </div>
            </dl>

            {/* Direct Booking Action Button */}
            <Link
              href={`/booking?car=${car.id}`}
              className="btn-tactile-yellow w-full py-3.5 px-6 flex items-center justify-center gap-2 font-bold text-sm tracking-wider uppercase group text-[#18274b] mt-5"
            >
              <span>Continue to booking</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-4 pt-3 border-t border-[#a9aa9c]/60 flex items-center justify-between text-xs font-bold">
              <Link
                href={`/compare?cars=${car.id}`}
                className="text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 -ml-2 transition-colors"
              >
                Compare with other fleet cars →
              </Link>
              <Link
                href="/locations"
                className="text-[#47516a] hover:text-[#18274b] px-2 py-1 transition-colors"
              >
                Depot directions ({selectedLocation.name.split(' ')[0]})
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section ("A CLOSER LOOK") */}
      <section className="py-16 border-b border-[#a9aa9c]">
        <div className="mb-8">
          <h2 className="font-['Anton',sans-serif] text-4xl text-[#18274b] tracking-wide">
            A CLOSER LOOK.
          </h2>
          <p className="text-sm text-[#47516a] mt-1 font-medium">
            Interior cabin and road handling impressions for {car.name}.
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

      {/* Similar Fleet Recommendations */}
      {similarCars.length > 0 && (
        <section className="pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-['Anton',sans-serif] text-3xl md:text-4xl text-[#18274b] tracking-wide">
                OTHER {car.category?.toUpperCase() || 'FEATURED'} MODELS TO CONSIDER.
              </h2>
              <p className="text-xs sm:text-sm text-[#47516a] mt-1 font-medium">
                Compare with related vehicles in the Detour rental fleet.
              </p>
            </div>
            <Link
              href="/fleet"
              className="text-xs font-bold uppercase tracking-wider text-[#203a78] hover:text-[#18274b] flex items-center gap-1"
            >
              <span>View all cars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarCars.map((similar) => (
              <VehicleCard key={similar.id} car={similar} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
