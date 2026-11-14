'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types';
import { formatMoney, calculateQuote } from '@/lib/pricing';
import { useTripStore } from '@/stores/tripStore';
import { motion } from 'motion/react';
import { ArrowRight, Users, Briefcase, Cog } from 'lucide-react';

interface VehicleCardProps {
  car: Car;
}

export default function VehicleCard({ car }: VehicleCardProps) {
  const { trip } = useTripStore();
  const quote = calculateQuote(car, trip);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{
        y: -6,
        boxShadow: '6px 6px 0px #18274b',
        borderColor: '#18274b',
        transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{
        scale: 0.99,
        y: 1,
        boxShadow: '2px 2px 0px #18274b',
        transition: { duration: 0.1 },
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      className="flex flex-col justify-between border border-[#a9aa9c] bg-[#faf2db] overflow-hidden shadow-[2px_2px_0px_#18274b]/15"
    >
      <div>
        {/* Photo Header - Clickable to single car view */}
        <Link
          href={`/car/${car.id}`}
          className="group block relative h-56 w-full overflow-hidden border-b border-[#a9aa9c] bg-[#203a78]"
        >
          <Image
            src={car.image}
            alt={car.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-[#18274b] text-[#faf2db] text-xs font-bold px-2.5 py-1 tracking-wider uppercase border border-[#a9aa9c]">
            {car.transmission}
          </div>
          {car.category && (
            <div className="absolute top-3 left-3 bg-[#fce466] text-[#18274b] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase border border-[#18274b]">
              {car.category}
            </div>
          )}
        </Link>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <Link href={`/car/${car.id}`} className="hover:opacity-85 transition-opacity">
                <h2 className="font-['Anton',sans-serif] text-2xl tracking-wide text-[#18274b]">
                  {car.name}
                </h2>
              </Link>
              <p className="text-xs text-[#47516a] line-clamp-1 mt-0.5 font-medium">
                {car.description}
              </p>
            </div>
            {/* Price section: day text is beside and on the left side of the rate */}
            <div className="flex items-baseline gap-1.5 justify-end text-right shrink-0">
              <span className="text-xs uppercase font-bold text-[#47516a]">
                / day
              </span>
              <span className="font-['Anton',sans-serif] text-2xl sm:text-3xl text-[#18274b]">
                {formatMoney(car.rate)}
              </span>
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

          {/* Estimated Total / Rental Note */}
          <div className="mb-4 min-h-[22px]">
            {quote && (
              <p className="text-xs font-bold text-[#18274b]">
                Estimated total: <strong className="text-sm">{formatMoney(quote.total)}</strong> ({quote.days} {quote.days === 1 ? 'day' : 'days'})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions - Direct booking & view, no change rental dates */}
      <div className="p-6 pt-0 flex flex-col gap-2">
        <Link
          href={`/car/${car.id}`}
          className="btn-tactile-yellow py-2.5 px-4 text-center font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 group text-[#18274b]"
        >
          <span>Select & Book car</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="flex items-center justify-between text-xs font-bold pt-2">
          <Link
            href={`/car/${car.id}`}
            className="px-2 py-1 -ml-2 text-[#47516a] hover:text-[#18274b] hover:bg-[#18274b]/10 transition-colors"
          >
            View details →
          </Link>
          <Link
            href={`/compare?cars=${car.id}`}
            className="px-2 py-1 -mr-2 text-[#203a78] hover:text-[#18274b] hover:bg-[#18274b]/10 transition-colors"
          >
            Compare car →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
