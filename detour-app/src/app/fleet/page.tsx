'use client';

import { useState } from 'react';
import Link from 'next/link';
import VehicleCard from '@/components/fleet/VehicleCard';
import { CARS } from '@/lib/data';
import { AnimatePresence, motion } from 'motion/react';
import { SlidersHorizontal, Sparkles, X, RotateCcw } from 'lucide-react';

export default function FleetPage() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'classic' | 'city' | 'touring'>('all');
  const [transmissionFilter, setTransmissionFilter] = useState<'all' | 'Automatic' | 'Manual'>('all');
  const [seatsFilter, setSeatsFilter] = useState<'all' | '2' | '4' | '5'>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc' | 'seats-desc'>('default');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const hasActiveFilters =
    categoryFilter !== 'all' ||
    transmissionFilter !== 'all' ||
    seatsFilter !== 'all' ||
    sortOrder !== 'default';

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setTransmissionFilter('all');
    setSeatsFilter('all');
    setSortOrder('default');
  };

  const filteredCars = CARS.filter((car) => {
    const matchCategory = categoryFilter === 'all' || car.category === categoryFilter;
    const matchTransmission = transmissionFilter === 'all' || car.transmission === transmissionFilter;
    const matchSeats = seatsFilter === 'all' || String(car.seats) === seatsFilter;
    return matchCategory && matchTransmission && matchSeats;
  }).sort((a, b) => {
    if (sortOrder === 'price-asc') return a.rate - b.rate;
    if (sortOrder === 'price-desc') return b.rate - a.rate;
    if (sortOrder === 'seats-desc') return b.seats - a.seats;
    return 0;
  });

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-10 md:py-14">
      {/* Page Title */}
      <div className="border-b border-[#a9aa9c] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
            MEET THE FLEET.
          </h1>
          <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
            Browse our curated self-drive collection across classic icons, city runabouts, and overland touring crossovers.
          </p>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="w-full flex items-center justify-between p-3.5 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b] font-bold text-xs uppercase tracking-wider text-[#18274b] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#18274b]" />
            <span>Filter & Sort Fleet ({filteredCars.length} models)</span>
          </span>
          <span className="text-[11px] underline text-[#203a78]">
            {mobileFilterOpen ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </span>
        </button>
      </div>

      {/* Main 2-Column Layout: Left Sidebar Filters + Right Vehicle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Filter Panel */}
        <aside
          className={`lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-5 sm:p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b]">
            {/* Filter Section Header */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#a9aa9c]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#18274b]" />
                <h2 className="font-['Anton',sans-serif] text-xl tracking-wider text-[#18274b]">
                  FLEET FILTERS
                </h2>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#203a78] hover:text-[#18274b] cursor-pointer underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2.5">
                Vehicle Series
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'all', label: 'All Fleet', count: CARS.length },
                  { id: 'classic', label: 'Scenic Classics', count: CARS.filter((c) => c.category === 'classic').length },
                  { id: 'city', label: 'City Runabouts', count: CARS.filter((c) => c.category === 'city').length },
                  { id: 'touring', label: 'Modern Touring', count: CARS.filter((c) => c.category === 'touring').length },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id as 'all' | 'classic' | 'city' | 'touring')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold tracking-wider uppercase border-2 transition-all cursor-pointer text-left ${
                      categoryFilter === cat.id
                        ? 'bg-[#18274b] text-[#faf2db] border-[#18274b] shadow-[2px_2px_0px_#18274b]'
                        : 'bg-[#faf2db] text-[#18274b] border-[#18274b]/30 hover:border-[#18274b] hover:bg-[#fce466]/40'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 border ${
                        categoryFilter === cat.id
                          ? 'bg-[#fce466] text-[#18274b] border-[#18274b]'
                          : 'bg-[#faf2db] text-[#47516a] border-[#a9aa9c]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transmission Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2.5">
                Gearbox
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['all', 'Automatic', 'Manual'] as const).map((trans) => (
                  <button
                    key={trans}
                    type="button"
                    onClick={() => setTransmissionFilter(trans)}
                    className={`py-2 px-1 text-center text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                      transmissionFilter === trans
                        ? 'bg-[#18274b] text-[#faf2db] border-[#18274b] shadow-[2px_2px_0px_#18274b]'
                        : 'bg-[#faf2db] text-[#18274b] border-[#18274b]/30 hover:border-[#18274b] hover:bg-[#fce466]/40'
                    }`}
                  >
                    {trans === 'all' ? 'All' : trans}
                  </button>
                ))}
              </div>
            </div>

            {/* Passenger Seats Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2.5">
                Seats Capacity
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: '2', label: '2' },
                  { id: '4', label: '4' },
                  { id: '5', label: '5' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeatsFilter(s.id as 'all' | '2' | '4' | '5')}
                    className={`py-2 px-1 text-center text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                      seatsFilter === s.id
                        ? 'bg-[#18274b] text-[#faf2db] border-[#18274b] shadow-[2px_2px_0px_#18274b]'
                        : 'bg-[#faf2db] text-[#18274b] border-[#18274b]/30 hover:border-[#18274b] hover:bg-[#fce466]/40'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="mb-6">
              <label htmlFor="fleet-sort" className="block text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2">
                Sort By
              </label>
              <select
                id="fleet-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'default' | 'price-asc' | 'price-desc' | 'seats-desc')}
                className="w-full p-2.5 bg-[#faf2db] border-2 border-[#18274b] text-xs font-bold text-[#18274b] outline-none cursor-pointer shadow-[2px_2px_0px_#18274b]"
              >
                <option value="default">Featured Fleet Order</option>
                <option value="price-asc">Daily Rate: Low to High</option>
                <option value="price-desc">Daily Rate: High to Low</option>
                <option value="seats-desc">Seating: Most Passengers</option>
              </select>
            </div>

            {/* Compare Shortcut */}
            <div className="pt-4 border-t border-[#a9aa9c]/60">
              <Link
                href="/compare"
                className="w-full py-2.5 px-3 bg-[#d8e3fb] hover:bg-[#c2d6fc] border-2 border-[#18274b] text-[#18274b] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#18274b] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#203a78]" />
                <span>Compare Vehicles</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Column: Fleet Grid */}
        <section className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
          {/* Active Filter Chips & Results Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#a9aa9c]/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#18274b]">
                {filteredCars.length} {filteredCars.length === 1 ? 'vehicle available' : 'vehicles available'}
              </span>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {categoryFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#18274b] text-[#faf2db] text-[11px] font-bold px-2 py-0.5 border border-[#18274b]">
                    {categoryFilter.toUpperCase()}
                    <button
                      type="button"
                      onClick={() => setCategoryFilter('all')}
                      aria-label="Remove category filter"
                      className="cursor-pointer hover:text-[#fce466]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {transmissionFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#18274b] text-[#faf2db] text-[11px] font-bold px-2 py-0.5 border border-[#18274b]">
                    {transmissionFilter}
                    <button
                      type="button"
                      onClick={() => setTransmissionFilter('all')}
                      aria-label="Remove transmission filter"
                      className="cursor-pointer hover:text-[#fce466]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {seatsFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#18274b] text-[#faf2db] text-[11px] font-bold px-2 py-0.5 border border-[#18274b]">
                    {seatsFilter} SEATS
                    <button
                      type="button"
                      onClick={() => setSeatsFilter('all')}
                      aria-label="Remove seats filter"
                      className="cursor-pointer hover:text-[#fce466]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-[#203a78] hover:text-[#18274b] underline ml-1 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Grid of Vehicles with Smooth Layout Animation */}
          {filteredCars.length > 0 ? (
            <motion.div
              layout
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredCars.map((car) => (
                  <VehicleCard key={car.id} car={car} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="p-12 text-center bg-[#faf2db] border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b] flex flex-col items-center gap-4">
              <h3 className="font-['Anton',sans-serif] text-3xl text-[#18274b]">
                NO MATCHING VEHICLES FOUND
              </h3>
              <p className="text-xs sm:text-sm text-[#47516a] max-w-md">
                No vehicles matched your current filter selection. Try adjusting the category, gearbox, or passenger filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-tactile-yellow py-2.5 px-6 font-bold text-xs uppercase tracking-wider text-[#18274b] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
