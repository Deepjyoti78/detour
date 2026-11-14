'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/stores/tripStore';
import { LOCATIONS, SCENIC_DRIVES } from '@/lib/data';
import RetroDatePicker from './RetroDatePicker';
import { ArrowRight, ChevronDown, X, MapPin, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function TicketForm() {
  const router = useRouter();
  const { trip, setLocation, setPickup, setReturn, removeDrive } = useTripStore();
  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const selectedDrive = trip.drive
    ? SCENIC_DRIVES.find((d) => d.id === trip.drive)
    : null;

  const selectedLocation =
    LOCATIONS.find((loc) => loc.id === trip.location) || LOCATIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationOpen(false);
      }
    }
    if (locationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [locationOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/fleet');
  };

  return (
    <div className="w-full max-w-[480px] border-2 border-[#18274b] shadow-2xl shadow-black/50 bg-[#faf2db] relative z-20">
      {/* Header Banner - Detour Navy */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#203a78] text-[#faf2db] p-5 sm:p-7 pb-4 sm:pb-6 border-b-2 border-[#18274b]"
      >
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.2em] font-bold text-[#d8e3fb] mb-2 sm:mb-2.5">
          <span>SELF-DRIVE CAR RENTAL</span>
          <span className="flex-1 h-px bg-[#d8e3fb]/40" />
        </div>
        <h1 className="font-['Anton',sans-serif] text-4xl sm:text-6xl leading-[0.92] tracking-tight">
          GET OUT <span className="text-[#fce466] block">OF TOWN.</span>
        </h1>
      </motion.div>

      {/* Ticket Perforated Body - Paper Cream */}
      <div className="p-5 sm:p-7 relative ticket-perforation bg-[#faf2db]">
        {/* Selected Drive Pill */}
        {selectedDrive && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-5 p-3 sm:p-3.5 bg-[#d8e3fb] border border-[#18274b] flex items-center justify-between text-xs"
          >
            <div>
              <span className="text-[#47516a] block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                Selected drive
              </span>
              <strong className="text-xs sm:text-sm font-bold text-[#18274b]">
                {selectedDrive.name}
              </strong>
            </div>
            <button
              type="button"
              onClick={removeDrive}
              className="p-1 hover:bg-[#faf2db] text-[#18274b] transition-colors cursor-pointer"
              aria-label="Remove scenic drive"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          {/* Route Container with Integrated Waypoint Track & Inputs */}
          <div className="flex gap-2.5 sm:gap-3.5 items-stretch">
            {/* Waypoint Indicator Track */}
            <div
              className="flex flex-col items-center pt-2.5 pb-4 shrink-0 w-3.5 select-none"
              aria-hidden="true"
            >
              {/* Pickup Waypoint Dot: Solid Navy Circle */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#18274b] shrink-0 shadow-xs" />
              {/* Route Line: Dashed Navy Connector */}
              <div className="w-0.5 flex-1 my-2 border-l-2 border-dashed border-[#18274b]/50" />
              {/* Return Waypoint Dot: Open Navy Ring */}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#18274b] bg-[#faf2db] shrink-0" />
            </div>

            {/* Inputs Column */}
            <div className="flex-1 flex flex-col gap-3.5 sm:gap-4 min-w-0">
              {/* Location field */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
              >
                <label
                  htmlFor="location-trigger"
                  className="block font-bold text-xs uppercase tracking-wider text-[#47516a] mb-1.5"
                >
                  Pick-up and return location
                </label>
                <div ref={locationRef} className="relative">
                  <button
                    type="button"
                    id="location-trigger"
                    onClick={() => setLocationOpen(!locationOpen)}
                    className="w-full text-left bg-[#faf2db] border border-[#18274b] py-2.5 sm:py-3 px-3 sm:px-3.5 flex items-center justify-between text-[#18274b] hover:border-[#203a78] focus:outline-none focus:ring-2 focus:ring-[#203a78] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <MapPin className="w-4 h-4 text-[#47516a] shrink-0" />
                      <span className="font-bold text-xs sm:text-base tracking-wide text-[#18274b] truncate">
                        {selectedLocation.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#47516a] shrink-0 transition-transform duration-200 ${
                        locationOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {locationOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-[#faf2db] border-2 border-[#18274b] shadow-xl shadow-black/50 py-1">
                      {LOCATIONS.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setLocation(loc.id);
                            setLocationOpen(false);
                          }}
                          className={`w-full text-left px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-between cursor-pointer transition-colors ${
                            loc.id === trip.location
                              ? 'bg-[#203a78] text-[#faf2db]'
                              : 'text-[#18274b] hover:bg-[#fce466]'
                          }`}
                        >
                          <span className="truncate mr-2">{loc.name}</span>
                          {loc.id === trip.location && (
                            <Check className="w-4 h-4 text-[#fce466] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Dates field */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.48 }}
              >
                <span className="block font-bold text-xs uppercase tracking-wider text-[#47516a] mb-1.5">
                  Rental dates
                </span>
                <RetroDatePicker
                  pickup={trip.pickup}
                  returnDate={trip.return}
                  popoverClassName="-left-6 sm:-left-7 right-0"
                  onSelect={(p, r) => {
                    setPickup(p);
                    setReturn(r);
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.58 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 sm:py-3.5 mt-1 btn-tactile-yellow flex items-center justify-center gap-2 sm:gap-2.5 font-['Anton',sans-serif] text-lg sm:text-2xl tracking-wider uppercase rounded-none group cursor-pointer text-[#18274b]"
          >
            <span>Find a car</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] transition-transform group-hover:translate-x-1.5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
