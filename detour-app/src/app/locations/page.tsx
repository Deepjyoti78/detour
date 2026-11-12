'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LOCATIONS } from '@/lib/data';
import { useTripStore } from '@/stores/tripStore';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function LocationsPage() {
  const router = useRouter();
  const { setLocation } = useTripStore();

  const handleSelectLocation = (id: string) => {
    setLocation(id);
    router.push('/#trip-planner');
  };

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-12 md:py-16">
      <div className="border-b border-[#a9aa9c] pb-6 mb-12">
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
          CHOOSE YOUR PICK-UP.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
          Select a collection depot across major Indian cities to begin planning your road trip.
        </p>
      </div>

      {/* Hero Banner */}
      <div className="border-2 border-[#18274b] bg-[#203a78] text-[#faf2db] shadow-[8px_8px_0px_#18274b] grid grid-cols-1 md:grid-cols-12 overflow-hidden mb-12">
        <div className="p-6 sm:p-8 md:p-12 md:col-span-6 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#d8e3fb] block mb-2">
              Pick-up and return
            </span>
            <h2 className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#faf2db] leading-none">
              MAJOR CITIES, <span className="text-[#fce466] block">INDIA.</span>
            </h2>
          </div>
          <p className="text-sm text-[#d8e3fb] mt-4 sm:mt-6 leading-relaxed max-w-md">
            Our prime depots in Mumbai, Delhi NCR, Bengaluru, Goa, Hyderabad, Kolkata, and Jaipur offer seamless access to India&apos;s finest national highways, mountain ghats, and coastal drives.
          </p>
        </div>
        <div className="relative h-56 sm:h-64 md:h-auto md:col-span-6 bg-[#18274b]">
          <Image
            src="/assets/sunset.jpg"
            alt="Classic car at sunset"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LOCATIONS.map((loc, idx) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
            whileTap={{ scale: 0.985, y: 1 }}
            className="card-tactile p-5 sm:p-8 border-2 border-[#18274b] bg-[#faf2db] flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2">
                <MapPin className="w-4 h-4 text-[#203a78]" />
                <span>Collection Depot</span>
              </div>
              <h3 className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide mb-2">
                {loc.name}
              </h3>
              <p className="text-sm text-[#47516a] leading-relaxed mb-6">
                {loc.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#a9aa9c]/60">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => handleSelectLocation(loc.id)}
                className="btn-tactile-yellow py-2.5 px-5 text-xs uppercase tracking-wider font-bold w-full sm:w-auto flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Choose this depot</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
              </motion.button>
              <Link
                href={`/pickup-guide?location=${loc.id}`}
                className="text-xs font-bold text-[#203a78] hover:bg-[#18274b]/10 border border-transparent hover:border-[#18274b] uppercase tracking-wider py-2 px-3 transition-colors"
              >
                Station guide & checklist →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
