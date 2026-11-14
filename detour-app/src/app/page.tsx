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

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollDistance = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  const steps = [
    {
      num: '01',
      title: 'PICK DATES & DEPOT',
      desc: 'Choose your collection station and select travel dates using our vintage calendar planner.',
    },
    {
      num: '02',
      title: 'MATCH THE DRIVE',
      desc: 'Pair your vehicle with scenic coastal or mountain routes tailored for manual shifts or easy automatic cruising.',
    },
    {
      num: '03',
      title: 'GET OUT OF TOWN',
      desc: 'Receive instant confirmation with a printable trip pack, route tips, and local roadside assistance.',
    },
  ];

  return (
    <div>
      {/* Hero Section: Full viewport height showing complete background car picture without clipping */}
      <section
        id="trip-planner"
        className="relative z-30 min-h-screen bg-[#c59049] flex items-center pt-28 sm:pt-32 pb-28 sm:pb-36 md:pb-44 px-3 sm:px-6 md:px-12 border-b-2 border-[#18274b] overflow-visible"
      >
        {/* Background Image Wrapper - high-res golden hour cornfield picture with smooth zoom entrance */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <Image
            src="/assets/golden-hour-classic-car-by-cornfields.png"
            alt="Classic vintage red car parked along cornfields at golden hour"
            fill
            priority
            className="object-cover object-[70%_center] md:object-center brightness-95"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-start overflow-visible">
          {/* "GET OUT OF TOWN" card enters smoothly on page load */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[480px] overflow-visible"
          >
            <Suspense fallback={<div className="w-full max-w-[480px] h-[500px] bg-[#faf2db] border-2 border-[#18274b]" />}>
              <TicketForm />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Fleet Preview Section: Edge-to-edge scrollable cards row extending across the screen */}
      <section id="fleet" className="relative z-10 py-12 sm:py-16 md:py-20 w-full overflow-hidden">
        {/* Section Header: Animated entrance on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-[90%] max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#a9aa9c]"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-['Anton',sans-serif] text-5xl md:text-6xl tracking-tight text-[#18274b]">
              FIND YOUR RIDE.
            </h2>
            <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
              Explore vintage roadsters, nimble city hatchbacks, or all-weather touring crossovers.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 self-start md:self-auto"
          >
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
          </motion.div>
        </motion.div>

        {/* Edge-to-edge Horizontally Scrollable Row with Staggered Entrance Animations */}
        <div className="w-full">
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory px-4 sm:px-6 md:px-12 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            tabIndex={0}
            role="region"
            aria-label="Featured rental cars carousel"
          >
            {CARS.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 45, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index * 0.08, 0.4),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-[300px] sm:w-[350px] md:w-[380px] lg:w-[400px] snap-start shrink-0"
              >
                <VehicleCard car={car} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sub-strip indicator & full catalog link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-[90%] max-w-7xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#a9aa9c]/50 text-xs font-bold text-[#47516a]"
        >
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#18274b]" />
            <span>Scroll horizontally to explore all {CARS.length} fleet vehicles</span>
          </span>
          <Link
            href="/fleet"
            className="text-xs uppercase font-bold text-[#203a78] hover:text-[#18274b] hover:underline flex items-center gap-1.5 transition-colors"
          >
            <span>Explore full catalog on Fleet page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* Scenic Drive Banner - Detour Navy: Text from left, image from right */}
      <section className="bg-[#203a78] text-[#faf2db] py-12 sm:py-16 md:py-20 border-y-2 border-[#18274b] overflow-hidden">
        <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Texts sliding smoothly from the left side */}
          <div className="overflow-visible">
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase font-bold tracking-[0.2em] text-[#d8e3fb] mb-2 sm:mb-3"
            >
              Curated scenic drives
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-tight mb-4 sm:mb-6"
            >
              TAKE THE <span className="text-[#fce466] block">LONG WAY.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-[#d8e3fb] max-w-lg mb-6 sm:mb-8 leading-relaxed"
            >
              Follow the Columbia River Gorge waterfalls, head west for the wild sea stacks of the Oregon Coast, or climb the mountain route to Mount Hood.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/explore"
                className="btn-tactile-yellow py-3 sm:py-3.5 px-5 sm:px-6 inline-flex items-center gap-2 text-xs sm:text-sm tracking-wider group text-[#18274b]"
              >
                <span>Explore scenic drives</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Image sliding smoothly from the right side */}
          <motion.figure
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-64 sm:h-80 md:h-96 w-full border-2 border-[#000000] shadow-[8px_8px_0px_#000000] overflow-hidden"
          >
            <Image
              src="/assets/gorge-landscape.jpg"
              alt="Columbia River Gorge scenic bluffs illustration"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-[#18274b]/95 p-3 text-xs flex justify-between border-t border-[#faf2db]/30 text-[#d8e3fb]">
              <strong className="text-[#faf2db]">Columbia River Gorge</strong>
              <span>Curated Route</span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* How it Works Section: Animated entrance on scroll */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-12 w-full max-w-7xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between border-b border-[#a9aa9c] pb-6 mb-12"
        >
          <h2 className="font-['Anton',sans-serif] text-4xl md:text-5xl text-[#18274b]">
            HOW IT WORKS.
          </h2>
          <a
            href="#trip-planner"
            className="text-xs uppercase font-bold text-[#47516a] hover:text-[#18274b] flex items-center gap-1.5 transition-colors"
          >
            <span>Plan your rental</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.65,
                delay: idx * 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
              whileTap={{ scale: 0.985, y: 1 }}
              className="border border-[#a9aa9c] p-6 sm:p-7 bg-[#faf2db] flex flex-col justify-between card-tactile cursor-default"
            >
              <span
                className="font-['Anton',sans-serif] text-5xl text-[#fce466] border-b border-[#a9aa9c] pb-3 mb-4 block"
                style={{ WebkitTextStroke: '1px #18274b' }}
              >
                {step.num}
              </span>
              <div>
                <h3 className="font-['Anton',sans-serif] text-2xl text-[#18274b] tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#47516a] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  );
}
