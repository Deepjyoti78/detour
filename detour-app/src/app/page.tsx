'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import TicketForm from '@/components/planner/TicketForm';
import VehicleCard from '@/components/fleet/VehicleCard';
import { CARS } from '@/lib/data';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section: Full viewport height showing complete background car picture without clipping */}
      <section
        id="trip-planner"
        className="relative z-30 min-h-screen bg-[#c59049] flex items-center pt-28 sm:pt-32 pb-28 sm:pb-36 md:pb-44 px-3 sm:px-6 md:px-12 border-b-2 border-[#18274b] overflow-visible"
      >
        {/* Background Image Wrapper - updated with user-provided high-res golden hour cornfield picture */}
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

        {/* Content Container - completely overflow visible and elevated z-index so calendar popover never clips */}
        <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center overflow-visible">
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

      {/* Fleet Preview Section: Appears immediately upon scrolling, stacked below hero popovers */}
      <section id="fleet" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#a9aa9c]">
          <div>
            <h2 className="font-['Anton',sans-serif] text-5xl md:text-6xl tracking-tight text-[#18274b]">
              FIND YOUR RIDE.
            </h2>
            <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
              A city runabout, a roomy tourer, or a red classic.
            </p>
          </div>
          <Link
            href="/fleet"
            className="btn-tactile-outline py-2.5 px-5 text-sm uppercase tracking-wider flex items-center gap-2 self-start md:self-auto group"
          >
            <span>View all cars</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARS.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
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
              className="btn-tactile-yellow py-3 sm:py-3.5 px-5 sm:px-6 inline-flex items-center gap-2 text-xs sm:text-sm tracking-wider group"
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
                SET YOUR DATES
              </h3>
              <p className="text-sm text-[#47516a] leading-relaxed">
                Choose where and when you’ll pick up and return your car using the retro trip ticket.
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
                CHOOSE A CAR
              </h3>
              <p className="text-sm text-[#47516a] leading-relaxed">
                Compare available vehicles in the fleet, enter driver details, and review the exact quote.
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
                PICK UP & GO
              </h3>
              <p className="text-sm text-[#47516a] leading-relaxed">
                Bring your demo booking reference and offline trip pack when you arrive at the depot.
              </p>
            </div>
          </motion.li>
        </ol>
      </section>
    </div>
  );
}
