'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SCENIC_DRIVES } from '@/lib/data';
import RouteMapSvg from '@/components/explore/RouteMapSvg';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExplorePage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'waterfalls' | 'coast' | 'mountains'>('all');
  const [activeDriveId, setActiveDriveId] = useState<string>('gorge');

  const filteredDrives = SCENIC_DRIVES.filter((drive) => {
    if (selectedFilter === 'all') return true;
    return drive.category === selectedFilter;
  });

  const activeDrive = SCENIC_DRIVES.find((d) => d.id === activeDriveId) || SCENIC_DRIVES[0];

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-12 md:py-16">
      <div className="border-b border-[#a9aa9c] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
            TAKE THE LONG WAY.
          </h1>
          <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
            Three signature scenic drives, from river bluffs to wild coastal beaches.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#18274b] bg-[#faf2db] px-3 py-1.5 border border-[#18274b]">
          <MapPin className="w-3.5 h-3.5 text-[#203a78]" />
          <span>Curated Signature Routes</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-6 mb-8 border-b border-[#a9aa9c]/60 overflow-x-auto">
        {(['all', 'waterfalls', 'coast', 'mountains'] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setSelectedFilter(filter);
              if (filter === 'coast') setActiveDriveId('coast');
              else if (filter === 'mountains') setActiveDriveId('hood');
              else if (filter === 'waterfalls' || filter === 'all') setActiveDriveId('gorge');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border border-[#18274b] transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === filter
                ? 'bg-[#18274b] text-[#faf2db] shadow-[2px_2px_0px_#18274b]'
                : 'bg-[#faf2db] text-[#18274b] hover:bg-[#fce466]'
            }`}
          >
            {filter === 'all' ? 'All drives' : filter}
          </button>
        ))}
      </div>

      {/* Two-Column Atlas: Map & Route Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Route Map Showcase */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <RouteMapSvg drive={activeDrive} />
          <p className="text-xs text-[#47516a]">
            Illustrative route schematic for {activeDrive.name}. Check road conditions before travel.
          </p>
        </div>

        {/* Drive Selection Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {filteredDrives.map((drive) => {
            const isCurrent = drive.id === activeDrive.id;
            return (
              <motion.article
                key={drive.id}
                whileHover={{ x: 6, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.985, x: 2 }}
                onClick={() => setActiveDriveId(drive.id)}
                className={`card-tactile p-5 sm:p-6 border-2 cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-[#18274b] bg-[#faf2db] shadow-[6px_6px_0px_#18274b]'
                    : 'border-[#a9aa9c] bg-[#faf2db] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  <div className="relative h-36 sm:h-24 w-full sm:w-28 shrink-0 border border-[#18274b] overflow-hidden bg-[#203a78]">
                    <Image
                      src={drive.image}
                      alt={drive.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#47516a] block mb-1">
                      {drive.category}
                    </span>
                    <h2 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide">
                      {drive.name}
                    </h2>
                    <p className="text-xs text-[#47516a] line-clamp-2 mt-1">
                      {drive.intro}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#a9aa9c]/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#47516a]">
                    {drive.stops.length} Scenic Waypoints
                  </span>
                  <Link
                    href={`/route/${drive.id}`}
                    className="btn-tactile-yellow py-1.5 px-3 text-xs tracking-wider uppercase flex items-center gap-1 group"
                  >
                    <span>View route</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
