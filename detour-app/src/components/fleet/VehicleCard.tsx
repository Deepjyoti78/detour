'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types';
import { formatMoney, calculateQuote, isCarAvailable, getNearbyAvailableTrip, formatDate } from '@/lib/pricing';
import { useTripStore } from '@/stores/tripStore';
import { motion } from 'motion/react';
import { ArrowRight, Users, Briefcase, Cog } from 'lucide-react';

interface VehicleCardProps {
  car: Car;
}

export default function VehicleCard({ car }: VehicleCardProps) {
  const { trip, setPickup, setReturn } = useTripStore();
  const quote = calculateQuote(car, trip);
  const available = isCarAvailable(car, trip);
  const nearbyTrip = !available ? getNearbyAvailableTrip(car, trip) : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.985, y: 1 }}
      transition={{ duration: 0.25 }}
      className="card-tactile flex flex-col justify-between border border-[#a9aa9c] bg-[#faf2db] overflow-hidden cursor-pointer"
    >
      <div>
        {/* Photo Header */}
        <div className="relative h-56 w-full overflow-hidden border-b border-[#a9aa9c] bg-[#203a78]">
          <Image
            src={car.image}
            alt={car.alt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-[#18274b] text-[#faf2db] text-xs font-bold px-2.5 py-1 tracking-wider uppercase border border-[#a9aa9c]">
            {car.transmission}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h2 className="font-['Anton',sans-serif] text-2xl tracking-wide text-[#18274b]">
                {car.name}
              </h2>
              <p className="text-xs text-[#47516a] line-clamp-1 mt-0.5">
                {car.description}
              </p>
            </div>
            <div className="text-right">
              <span className="font-['Anton',sans-serif] text-2xl text-[#18274b]">
                {formatMoney(car.rate)}
              </span>
              <span className="text-xs text-[#47516a] block">/ day</span>
            </div>
          </div>

          {/* Specs List */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:gap-4 py-3 border-y border-[#a9aa9c]/40 text-xs font-bold text-[#47516a] mb-4">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> {car.seats} seats
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> {car.luggage} bags
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Cog className="w-3.5 h-3.5" /> {car.transmission}
            </span>
          </div>

          {/* Availability Status & Pricing */}
          <div className="mb-4">
            {!available && (
              <span className="inline-block text-xs font-bold text-red-800 bg-red-100 px-2 py-0.5 border border-red-300">
                Unavailable on pick-up date
              </span>
            )}

            {/* Estimated Total */}
            {quote && available && (
              <p className="text-xs font-bold text-[#18274b] mt-1">
                Estimated total: <strong className="text-sm">{formatMoney(quote.total)}</strong> ({quote.days} {quote.days === 1 ? 'day' : 'days'})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 flex flex-col gap-2">
        {available ? (
          <Link
            href={`/booking?car=${car.id}`}
            className="btn-tactile-yellow py-2.5 px-4 text-center text-sm tracking-wider flex items-center justify-center gap-2 group"
          >
            <span>Continue to booking</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : nearbyTrip ? (
          <button
            type="button"
            onClick={() => {
              setPickup(nearbyTrip.pickup);
              setReturn(nearbyTrip.return);
            }}
            className="btn-tactile-outline py-2.5 px-4 text-center text-xs tracking-wider"
          >
            Try {formatDate(nearbyTrip.pickup)} →
          </button>
        ) : (
          <Link
            href="/#trip-planner"
            className="btn-tactile-outline py-2.5 px-4 text-center text-xs tracking-wider"
          >
            Change rental dates
          </Link>
        )}

        <div className="flex items-center justify-between text-xs font-bold pt-2">
          <Link href={`/car/${car.id}`} className="px-2 py-1 -ml-2 text-[#47516a] hover:text-[#18274b] hover:bg-[#18274b]/10 transition-colors">
            View details
          </Link>
          <Link href={`/compare?cars=${car.id}`} className="px-2 py-1 -mr-2 text-[#203a78] hover:text-[#18274b] hover:bg-[#18274b]/10 transition-colors">
            Compare car →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
