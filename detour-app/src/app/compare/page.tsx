'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CARS } from '@/lib/data';
import { useTripStore } from '@/stores/tripStore';
import { formatMoney, calculateQuote, isCarAvailable } from '@/lib/pricing';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const requested = (searchParams.get('cars') || '').split(',').filter(Boolean);
  const { trip } = useTripStore();

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (requested.length >= 2) return requested;
    if (requested.length === 1) {
      const other = CARS.find((c) => c.id !== requested[0]);
      return other ? [requested[0], other.id] : [requested[0]];
    }
    return CARS.map((c) => c.id);
  });

  const toggleCar = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const comparedCars = CARS.filter((c) => selectedIds.includes(c.id));

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-12 md:py-16">
      {/* Back button */}
      <Link
        href="/fleet"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] hover:text-[#18274b] mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to fleet</span>
      </Link>

      <div className="border-b border-[#a9aa9c] pb-6 mb-8">
        <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl text-[#18274b] tracking-tight">
          COMPARE CARS.
        </h1>
        <p className="text-sm md:text-base text-[#47516a] mt-2 font-medium">
          Check space, transmission, and estimated prices side by side.
        </p>
      </div>

      {/* Car Selection Checkbox Group */}
      <fieldset className="p-6 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b] mb-10">
        <legend className="font-bold text-xs uppercase tracking-wider text-[#47516a] px-2 bg-[#faf2db] border border-[#18274b]">
          Select cars to compare (minimum 2)
        </legend>
        <div className="flex flex-wrap gap-4 mt-2">
          {CARS.map((car) => {
            const isChecked = selectedIds.includes(car.id);
            return (
              <label
                key={car.id}
                className={`flex items-center gap-2.5 px-4 py-2 border cursor-pointer font-bold text-sm transition-colors ${
                  isChecked
                    ? 'border-[#18274b] bg-[#fce466] text-[#18274b]'
                    : 'border-[#a9aa9c] bg-[#faf2db] text-[#47516a] hover:border-[#18274b]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCar(car.id)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border border-[#18274b] flex items-center justify-center ${
                    isChecked ? 'bg-[#18274b] text-[#faf2db]' : 'bg-[#faf2db]'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
                <span>{car.name}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Comparison Table */}
      {comparedCars.length < 2 ? (
        <div className="p-8 sm:p-12 text-center border-2 border-dashed border-[#a9aa9c] bg-[#faf2db]">
          <p className="font-bold text-base text-[#47516a]">
            Please select at least two cars to view the comparison matrix.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-xs text-[#47516a] font-bold md:hidden mb-2.5">
            ← Scroll horizontally to compare models →
          </p>
          <div className="overflow-x-auto border-2 border-[#18274b] shadow-[6px_6px_0px_#18274b] bg-[#faf2db]">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b-2 border-[#18274b] bg-[#faf2db]">
                  <th className="p-3.5 sm:p-4 md:p-6 font-['Anton',sans-serif] text-lg sm:text-xl text-[#18274b] w-36 sm:w-48 border-r border-[#a9aa9c] sticky left-0 bg-[#faf2db] z-10 shadow-[2px_0_0_#18274b]">
                    FEATURE
                  </th>
                  {comparedCars.map((car) => (
                    <th key={car.id} className="p-3.5 sm:p-4 md:p-6 border-r border-[#a9aa9c] last:border-r-0 min-w-[190px] sm:min-w-[220px]">
                      <div className="relative h-24 sm:h-28 w-full mb-3 border border-[#18274b] overflow-hidden bg-[#203a78]">
                        <Image
                          src={car.image}
                          alt={car.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-['Anton',sans-serif] text-xl sm:text-2xl text-[#18274b] block">
                        {car.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#a9aa9c]">
                <tr>
                  <th className="p-3.5 sm:p-4 md:p-6 font-bold text-xs uppercase tracking-wider text-[#47516a] border-r border-[#a9aa9c] bg-[#faf2db] sticky left-0 z-10 shadow-[2px_0_0_#18274b]">
                    Passenger Seats
                  </th>
                  {comparedCars.map((car) => (
                    <td key={car.id} className="p-3.5 sm:p-4 md:p-6 font-bold text-sm sm:text-base text-[#18274b] border-r border-[#a9aa9c] last:border-r-0">
                      {car.seats} Adults
                    </td>
                  ))}
                </tr>

                <tr>
                  <th className="p-3.5 sm:p-4 md:p-6 font-bold text-xs uppercase tracking-wider text-[#47516a] border-r border-[#a9aa9c] bg-[#faf2db] sticky left-0 z-10 shadow-[2px_0_0_#18274b]">
                    Luggage Capacity
                  </th>
                  {comparedCars.map((car) => (
                    <td key={car.id} className="p-3.5 sm:p-4 md:p-6 font-bold text-sm sm:text-base text-[#18274b] border-r border-[#a9aa9c] last:border-r-0">
                      {car.luggage} Standard {car.luggage === 1 ? 'bag' : 'bags'}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th className="p-3.5 sm:p-4 md:p-6 font-bold text-xs uppercase tracking-wider text-[#47516a] border-r border-[#a9aa9c] bg-[#faf2db] sticky left-0 z-10 shadow-[2px_0_0_#18274b]">
                    Transmission
                  </th>
                  {comparedCars.map((car) => (
                    <td key={car.id} className="p-3.5 sm:p-4 md:p-6 font-bold text-sm sm:text-base text-[#18274b] border-r border-[#a9aa9c] last:border-r-0">
                      {car.transmission}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th className="p-3.5 sm:p-4 md:p-6 font-bold text-xs uppercase tracking-wider text-[#47516a] border-r border-[#a9aa9c] bg-[#faf2db] sticky left-0 z-10 shadow-[2px_0_0_#18274b]">
                    Daily Rental Rate
                  </th>
                  {comparedCars.map((car) => (
                    <td key={car.id} className="p-3.5 sm:p-4 md:p-6 font-['Anton',sans-serif] text-xl sm:text-2xl text-[#18274b] border-r border-[#a9aa9c] last:border-r-0">
                      {formatMoney(car.rate)} <span className="text-xs font-sans text-[#47516a]">/ day</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <th className="p-3.5 sm:p-4 md:p-6 font-bold text-xs uppercase tracking-wider text-[#47516a] border-r border-[#a9aa9c] bg-[#faf2db] sticky left-0 z-10 shadow-[2px_0_0_#18274b]">
                    Live Availability
                  </th>
                  {comparedCars.map((car) => {
                    const available = isCarAvailable(car, trip);
                    return (
                      <td key={car.id} className="p-3.5 sm:p-4 md:p-6 border-r border-[#a9aa9c] last:border-r-0">
                        {available ? (
                          <span className="text-xs font-bold text-[#203a78] bg-[#d8e3fb] px-2 py-0.5 border border-[#203a78]/30">
                            Available
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-red-800 bg-red-100 px-2 py-0.5 border border-red-300">
                            Unavailable on pickup date
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <th className="p-3.5 sm:p-4 md:p-6 font-bold text-xs uppercase tracking-wider text-[#47516a] border-r border-[#a9aa9c] bg-[#faf2db] sticky left-0 z-10 shadow-[2px_0_0_#18274b]">
                    Estimated Trip Total
                  </th>
                  {comparedCars.map((car) => {
                    const quote = calculateQuote(car, trip);
                    const available = isCarAvailable(car, trip);
                    return (
                      <td key={car.id} className="p-3.5 sm:p-4 md:p-6 border-r border-[#a9aa9c] last:border-r-0">
                        {quote && available ? (
                          <div>
                            <strong className="text-lg sm:text-xl font-bold text-[#18274b] block">
                              {formatMoney(quote.total)}
                            </strong>
                            <span className="text-xs text-[#47516a]">
                              Includes taxes & fees ({quote.days} days)
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#a9aa9c] font-bold">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Action Buttons */}
                <tr className="bg-[#faf2db]/20">
                  <th className="p-3.5 sm:p-4 md:p-6 font-bold text-xs uppercase tracking-wider text-[#47516a] border-r border-[#a9aa9c] bg-[#faf2db] sticky left-0 z-10 shadow-[2px_0_0_#18274b]">
                    Action
                  </th>
                {comparedCars.map((car) => {
                  const available = isCarAvailable(car, trip);
                  return (
                    <td key={car.id} className="p-4 md:p-6 border-r border-[#a9aa9c] last:border-r-0">
                      {available ? (
                        <Link
                          href={`/booking?car=${car.id}`}
                          className="btn-tactile-yellow py-2.5 px-4 text-xs tracking-wider flex items-center justify-center gap-1.5 uppercase w-full group"
                        >
                          <span>Book {car.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <Link
                          href={`/car/${car.id}`}
                          className="btn-tactile-outline py-2.5 px-4 text-xs tracking-wider text-center block w-full"
                        >
                          View car details
                        </Link>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading car comparison...</div>}>
      <CompareContent />
    </Suspense>
  );
}
