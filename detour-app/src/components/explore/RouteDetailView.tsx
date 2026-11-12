'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ScenicDrive } from '@/types';
import { useTripStore } from '@/stores/tripStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface RouteDetailViewProps {
  drive: ScenicDrive;
}

export default function RouteDetailView({ drive }: RouteDetailViewProps) {
  const router = useRouter();
  const { setDrive } = useTripStore();

  const handlePlanDrive = () => {
    setDrive(drive.id);
    router.push('/#trip-planner');
  };

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-12 md:py-16">
      {/* Back button */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Explore</span>
      </Link>

      <div className="border-b border-[#a9aa9c] pb-6 mb-8 sm:mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#47516a] block mb-2">
          Curated Scenic Road Trip
        </span>
        <h1 className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-7xl text-[#18274b] tracking-tight">
          {drive.name.toUpperCase()}.
        </h1>
        <p className="text-sm sm:text-base text-[#47516a] mt-3 max-w-2xl font-medium">
          {drive.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Landscape Photo */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <figure className="relative h-64 sm:h-80 md:h-[420px] w-full border-2 border-[#18274b] shadow-[8px_8px_0px_#18274b] overflow-hidden bg-[#203a78]">
            <Image
              src={drive.image}
              alt={drive.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-[#18274b]/90 p-3 text-xs flex justify-between border-t border-[#faf2db]/30 text-[#d8e3fb]">
              <strong className="text-[#faf2db]">{drive.name}</strong>
              <span>Curated Landscape</span>
            </figcaption>
          </figure>
        </div>

        {/* Itinerary Waypoints & CTA */}
        <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
          <div className="border-2 border-[#18274b] p-5 sm:p-8 bg-[#faf2db] shadow-[6px_6px_0px_#18274b]">
            <h2 className="font-['Anton',sans-serif] text-3xl text-[#18274b] tracking-wide mb-6 border-b border-[#a9aa9c] pb-3">
              THE ROUTE STOPS
            </h2>

            <ol className="flex flex-col gap-6">
              {drive.stops.map(([stopName, description], index) => (
                <motion.li
                  key={stopName}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="w-8 h-8 rounded-none border-2 border-[#18274b] bg-[#fce466] text-[#18274b] font-bold text-sm flex items-center justify-center shrink-0">
                    {index === 0 ? '●' : index}
                  </span>
                  <div>
                    <strong className="text-base text-[#18274b] block font-bold">
                      {stopName}
                    </strong>
                    <p className="text-xs text-[#47516a] mt-0.5 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Plan This Drive Card */}
          <div className="p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-sm font-bold text-[#18274b] block">
                Take this drive on your rental
              </strong>
              <p className="text-xs text-[#47516a] mt-0.5">
                Lock this itinerary to your trip ticket and choose a car.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePlanDrive}
              className="btn-tactile-yellow py-3 px-6 text-xs uppercase tracking-wider font-bold flex items-center gap-2 group whitespace-nowrap cursor-pointer"
            >
              <span>Plan this drive</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
