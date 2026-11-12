'use client';

import { useState } from 'react';
import Link from 'next/link';
import VehicleCard from '@/components/fleet/VehicleCard';
import { CARS, LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import { useTripStore } from '@/stores/tripStore';
import { formatDate } from '@/lib/pricing';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';

export default function FleetPage() {
  const { trip } = useTripStore();
  const [transmissionFilter, setTransmissionFilter] = useState<'all' | 'Automatic' | 'Manual'>('all');

  const selectedBranch = LOCATIONS.find((loc) => loc.id === trip.location);
  const selectedDrive = trip.drive ? SCENIC_DRIVES.find((d) => d.id === trip.drive) : null;

  const filteredCars = CARS.filter((car) => {
    if (transmissionFilter === 'all') return true;
    return car.transmission === transmissionFilter;
  });

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-12 md:py-16">
      {/* Page Title */}
      <div className="border-b border-[#a9aa9c] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
            MEET THE FLEET.
          </h1>
          <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
            Compare our curated cars, then choose the right one for your journey.
          </p>
        </div>
      </div>

      {/* Active Trip Strip */}
      {selectedBranch && (
        <div className="mb-10 p-4 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-[#47516a] font-bold block uppercase tracking-wider">
              Current Rental Plan
            </span>
            <strong className="text-sm text-[#18274b]">
              {selectedBranch.name} · {formatDate(trip.pickup)} to {formatDate(trip.return)}
            </strong>
            {selectedDrive && (
              <span className="ml-2 text-xs bg-[#fce466] text-[#18274b] font-bold px-2 py-0.5 border border-[#18274b]">
                Drive: {selectedDrive.name}
              </span>
            )}
          </div>
          <Link
            href="/#trip-planner"
            className="text-xs font-bold text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 -mr-2 uppercase tracking-wider self-start sm:self-auto transition-colors"
          >
            Edit dates / location →
          </Link>
        </div>
      )}

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#a9aa9c]/60">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#47516a] mr-1 hidden sm:block" />
          {(['all', 'Automatic', 'Manual'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setTransmissionFilter(filter)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border border-[#18274b] transition-all cursor-pointer ${
                transmissionFilter === filter
                  ? 'bg-[#18274b] text-[#faf2db] shadow-[2px_2px_0px_#18274b]'
                  : 'bg-[#faf2db] text-[#18274b] hover:bg-[#fce466]'
              }`}
            >
              {filter === 'all' ? 'All cars' : filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-xs font-bold">
          <span className="text-[#47516a]">
            {filteredCars.length} {filteredCars.length === 1 ? 'car available' : 'cars available'}
          </span>
          <Link
            href="/compare"
            className="text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 -mr-2 border border-transparent hover:border-[#18274b] transition-colors flex items-center gap-1"
          >
            <span>Compare cars side-by-side</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid of Vehicles with Layout Animation */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredCars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Explore More Callout */}
      <div className="mt-20 p-8 border border-[#a9aa9c] bg-[#eae6ca] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide">
            STILL DECIDING WHERE TO GO?
          </h2>
          <p className="text-xs text-[#47516a] mt-1">
            Browse our three signature road trips through the Gorge, Coast, and Mount Hood.
          </p>
        </div>
        <Link
          href="/explore"
          className="btn-tactile-yellow py-2.5 px-5 text-xs tracking-wider flex items-center gap-2 group whitespace-nowrap"
        >
          <span>Explore scenic drives</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
