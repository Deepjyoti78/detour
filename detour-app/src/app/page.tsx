'use client';

import { useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TicketForm from '@/components/planner/TicketForm';
import VehicleCard from '@/components/fleet/VehicleCard';
import { CARS } from '@/lib/data';
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Exactly 4 featured cars in a single horizontally scrollable row
  const featuredCars = CARS.slice(0, 4);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollDistance = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      {/* Hero Section: Full viewport height showing complete background car picture without clipping */}
      <section
        id="trip-planner"
        className="relative z-30 min-h-screen bg-[#c59049] flex items-center pt-28 sm:pt-32 pb-28 sm:pb-36 md:pb-44 px-3 sm:px-6 md:px-12 border-b-2 border-[#18274b] overflow-visible"
      >
        {/* Background Image Wrapper - high-res golden hour cornfield picture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="/assets/golden-hour-classic-car-by-cornfields.png"
            alt="Classic vintage red car parked along cornfields at golden hour"
            fill
            priority
            className="object-cover object-[70%_center] md:object-center brightness-95"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-start overflow-visible">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[480px] overflow-visible"
          >
            <Suspense fallback={<div className="w-full max-w-[480px] h-[500px] bg-[#faf2db] border-2 border-[#18274b]" />}>
              <TicketForm />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Fleet Preview Section: Single horizontally scrollable row of 4 cars with 4th cropped */}
      <section id="fleet" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 md:px-12 w-full max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#a9aa9c]">
          <div>
            <h2 className="font-['Anton',sans-serif] text-5xl md:text-6xl tracking-tight text-[#18274b]">
              FIND YOUR RIDE.
            </h2>
            <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
              Explore vintage roadsters, nimble city hatchbacks, or all-weather touring crossovers.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Scroll Navigation Buttons for Desktop */}
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="p-2 border-2 border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] text-[#18274b] shadow-[2px_2px_0px_#18274b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="p-2 border-2 border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] text-[#18274b] shadow-[2px_2px_0px_#18274b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/fleet"
              className="btn-tactile-outline py-2.5 px-5 text-sm uppercase tracking-wider flex items-center gap-2 group text-[#18274b]"
            >
              <span>View all {CARS.length} fleet cars</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Scrollable Single Row: 3 cards fit in view, 4th card cropped in half */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            tabIndex={0}
            role="region"
            aria-label="Featured rental cars carousel"
          >
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="flex-[0_0_84%] sm:flex-[0_0_46%] md:flex-[0_0_36%] lg:flex-[0_0_30.5%] snap-start shrink-0"
              >
                <VehicleCard car={car} />
              </div>
            ))}
          </div>

          {/* Sub-strip indicator & full catalog link */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#a9aa9c]/50 text-xs font-bold text-[#47516a]">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#18274b]" />
              <span>Scroll horizontally to reveal the 4th featured vehicle</span>
            </span>
            <Link
              href="/fleet"
              className="text-xs uppercase font-bold text-[#203a78] hover:text-[#18274b] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>Explore all {CARS.length} vehicles on Fleet page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scenic Drive Banner - Detour Navy */}
      <section className="bg-[#203a78] text-[#faf2db] py-12 sm:py-16 md:py-20 border-y-2 border-[#18274b]">
        <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#d8e3fb] mb-2 sm:mb-3">
              Curated scenic drives
            </p>
            <h2 className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-tight mb-4 sm:mb-6">
              TAKE THE <span className="text-[#fce466] block">LONG WAY.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#d8e3fb] max-w-lg mb-6 sm:mb-8 leading-relaxed">
              Follow the Columbia River Gorge waterfalls, head west for the wild sea stacks of the Oregon Coast, or climb the mountain route to Mount Hood.
            </p>
            <Link
              href="/explore"
              className="btn-tactile-yellow py-3 sm:py-3.5 px-5 sm:px-6 inline-flex items-center gap-2 text-xs sm:text-sm tracking-wider group text-[#18274b]"
            >
              <span>Explore scenic drives</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>

          <figure className="relative h-64 sm:h-80 md:h-96 w-full border-2 border-[#000000] shadow-[8px_8px_0px_#000000] overflow-hidden">
            <Image
              src="/assets/gorge-landscape.jpg"
              alt="Columbia River Gorge scenic bluffs illustration"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-[#18274b]/95 p-3 text-xs flex justify-between border-t border-[#faf2db]/30 text-[#d8e3fb]">
              <strong className="text-[#faf2db]">Columbia River Gorge</strong>
              <span>Curated Route</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-[#a9aa9c] pb-6 mb-12">
          <h2 className="font-['Anton',sans-serif] text-4xl md:text-5xl text-[#18274b]">
            HOW IT WORKS.
          </h2>
          <a
            href="#trip-planner"
            className="text-xs uppercase font-bold text-[#47516a] hover:text-[#18274b] flex items-center gap-1.5"
          >
            <span>Plan your rental</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <motion.li
            whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
            whileTap={{ scale: 0.985, y: 1 }}
            className="border border-[#a9aa9c] p-6 sm:p-7 bg-[#faf2db] flex flex-col justify-between card-tactile cursor-default"
          >
            <span
              className="font-['Anton',sans-serif] text-5xl text-[#fce466] border-b border-[#a9aa9c] pb-3 mb-4 block"
              style={{ WebkitTextStroke: '1px #18274b' }}
            >
              01
            </span>
            <div>
              <h3 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-2">
                PICK DATES & DEPOT
              </h3>
              <p className="text-xs sm:text-sm text-[#47516a] leading-relaxed">
                Choose your collection station and select travel dates using our vintage calendar planner.
              </p>
            </div>
          </motion.li>

          <motion.li
            whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
            whileTap={{ scale: 0.985, y: 1 }}
            className="border border-[#a9aa9c] p-6 sm:p-7 bg-[#faf2db] flex flex-col justify-between card-tactile cursor-default"
          >
            <span
              className="font-['Anton',sans-serif] text-5xl text-[#fce466] border-b border-[#a9aa9c] pb-3 mb-4 block"
              style={{ WebkitTextStroke: '1px #18274b' }}
            >
              02
            </span>
            <div>
              <h3 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-2">
                MATCH THE DRIVE
              </h3>
              <p className="text-xs sm:text-sm text-[#47516a] leading-relaxed">
                Pair your vehicle with scenic coastal or mountain routes tailored for manual shifts or easy automatic cruising.
              </p>
            </div>
          </motion.li>

          <motion.li
            whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
            whileTap={{ scale: 0.985, y: 1 }}
            className="border border-[#a9aa9c] p-6 sm:p-7 bg-[#faf2db] flex flex-col justify-between card-tactile cursor-default"
          >
            <span
              className="font-['Anton',sans-serif] text-5xl text-[#fce466] border-b border-[#a9aa9c] pb-3 mb-4 block"
              style={{ WebkitTextStroke: '1px #18274b' }}
            >
              03
            </span>
            <div>
              <h3 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-2">
                GET OUT OF TOWN
              </h3>
              <p className="text-xs sm:text-sm text-[#47516a] leading-relaxed">
                Receive instant confirmation with a printable trip pack, route tips, and local roadside assistance.
              </p>
            </div>
          </motion.li>
        </ol>
      </section>
    </div>
  );
}
