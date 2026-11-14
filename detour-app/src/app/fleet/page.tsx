'use client';

import { useState } from 'react';
import Link from 'next/link';
import VehicleCard from '@/components/fleet/VehicleCard';
import { CARS, LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import { useTripStore } from '@/stores/tripStore';
import { formatDate } from '@/lib/pricing';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function FleetPage() {
  const { trip } = useTripStore();
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'classic' | 'city' | 'touring'>('all');
  const [transmissionFilter, setTransmissionFilter] = useState<'all' | 'Automatic' | 'Manual'>('all');

  const selectedBranch = LOCATIONS.find((loc) => loc.id === trip.location);
  const selectedDrive = trip.drive ? SCENIC_DRIVES.find((d) => d.id === trip.drive) : null;

  const filteredCars = CARS.filter((car) => {
    const matchCategory = categoryFilter === 'all' || car.category === categoryFilter;
    const matchTransmission = transmissionFilter === 'all' || car.transmission === transmissionFilter;
    return matchCategory && matchTransmission;
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
            Browse our expanded 9-vehicle lineup across classic icons, city runners, and overland touring crossovers.
          </p>
        </div>
      </div>

      {/* Active Trip Strip */}
      {selectedBranch && (
        <div className="mb-8 p-4 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        {[
          { id: 'all', label: 'All Fleet', count: CARS.length },
          { id: 'classic', label: 'Scenic Classics', count: CARS.filter(c => c.category === 'classic').length },
          { id: 'city', label: 'City Runabouts', count: CARS.filter(c => c.category === 'city').length },
          { id: 'touring', label: 'Modern Touring', count: CARS.filter(c => c.category === 'touring').length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategoryFilter(tab.id as 'all' | 'classic' | 'city' | 'touring')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-[#18274b] transition-all cursor-pointer ${
              categoryFilter === tab.id
                ? 'bg-[#18274b] text-[#faf2db] shadow-[3px_3px_0px_#18274b]'
                : 'bg-[#faf2db] text-[#18274b] hover:bg-[#fce466] shadow-[2px_2px_0px_#18274b]'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Toolbar & Transmission Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#a9aa9c]/60">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#47516a] mr-1 hidden sm:block" />
          <span className="text-xs font-bold text-[#47516a] uppercase mr-1 hidden md:inline">Gearbox:</span>
          {(['all', 'Automatic', 'Manual'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setTransmissionFilter(filter)}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border border-[#18274b] transition-all cursor-pointer ${
                transmissionFilter === filter
                  ? 'bg-[#203a78] text-[#faf2db] shadow-[2px_2px_0px_#18274b]'
                  : 'bg-[#faf2db] text-[#18274b] hover:bg-[#fce466]'
              }`}
            >
              {filter === 'all' ? 'All gearboxes' : filter}
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
            <Sparkles className="w-3.5 h-3.5 text-[#203a78]" />
            <span>Compare side-by-side</span>
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
            LOOKING FOR SCENIC ROUTE INSPIRATION?
          </h2>
          <p className="text-xs text-[#47516a] mt-1 font-medium">
            Browse our curated drives with mileage, waypoints, and recommended vehicle pairings.
          </p>
        </div>
        <Link
          href="/explore"
          className="btn-tactile-yellow py-2.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 group whitespace-nowrap text-[#18274b]"
        >
          <span>Explore scenic drives</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
