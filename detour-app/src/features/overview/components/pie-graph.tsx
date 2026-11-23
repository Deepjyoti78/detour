'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface VehicleBlock {
  id: string;
  name: string;
  plate: string;
  category: 'classic' | 'city' | 'touring' | 'electric';
  status: 'rented' | 'ready' | 'maintenance';
  location: string;
  rate: number;
}

// 48 exact fleet vehicles
const FLEET_VEHICLES: VehicleBlock[] = [
  // Classic & Vintage (15) - High contrast monochrome
  { id: 'c1', name: 'Porsche 356 Speedster', plate: 'MH-01-CS-1958', category: 'classic', status: 'rented', location: 'Mumbai Coastal', rate: 145 },
  { id: 'c2', name: 'Ford Mustang Fastback', plate: 'DL-03-FA-1967', category: 'classic', status: 'rented', location: 'Delhi Ridge', rate: 135 },
  { id: 'c3', name: 'Alfa Romeo Spider', plate: 'GA-02-SP-1972', category: 'classic', status: 'rented', location: 'Goa Coast', rate: 125 },
  { id: 'c4', name: 'Jaguar E-Type Series 1', plate: 'KA-04-ET-1965', category: 'classic', status: 'rented', location: 'Bengaluru Ghats', rate: 165 },
  { id: 'c5', name: 'Chevrolet Corvette C2', plate: 'RJ-14-CV-1963', category: 'classic', status: 'rented', location: 'Jaipur Desert', rate: 140 },
  { id: 'c6', name: 'Mercedes-Benz 280SL', plate: 'MH-02-SL-1969', category: 'classic', status: 'rented', location: 'Mumbai Coast', rate: 155 },
  { id: 'c7', name: 'Triumph TR6 Roadster', plate: 'GA-01-TR-1974', category: 'classic', status: 'ready', location: 'Goa Depot', rate: 110 },
  { id: 'c8', name: 'Austin-Healey 3000', plate: 'DL-01-AH-1962', category: 'classic', status: 'rented', location: 'Delhi Depot', rate: 130 },
  { id: 'c9', name: 'BMW 2002 tii', plate: 'KA-05-BM-1973', category: 'classic', status: 'rented', location: 'Bengaluru Outskirts', rate: 120 },
  { id: 'c10', name: 'Datsun 240Z Fairlady', plate: 'MH-04-DZ-1971', category: 'classic', status: 'rented', location: 'Lonavala Ridge', rate: 135 },
  { id: 'c11', name: 'Porsche 911 2.7 RS', plate: 'DL-07-RS-1973', category: 'classic', status: 'rented', location: 'Delhi NCR', rate: 195 },
  { id: 'c12', name: 'Fiat 124 Sport Spider', plate: 'GA-03-FS-1975', category: 'classic', status: 'ready', location: 'Goa Depot', rate: 95 },
  { id: 'c13', name: 'MGB GT V8 Classic', plate: 'KA-01-MG-1974', category: 'classic', status: 'rented', location: 'Coorg Foothills', rate: 115 },
  { id: 'c14', name: 'Volvo 1800S Coupe', plate: 'RJ-02-VO-1968', category: 'classic', status: 'rented', location: 'Jaipur Palace', rate: 110 },
  { id: 'c15', name: 'Ferrari 308 GTB', plate: 'MH-01-FE-1978', category: 'classic', status: 'maintenance', location: 'Mumbai Service', rate: 220 },

  // City Compact (13) - Charcoal Midtone
  { id: 'ct1', name: 'Mini Cooper S Heritage', plate: 'MH-02-MC-2024', category: 'city', status: 'rented', location: 'Mumbai South', rate: 85 },
  { id: 'ct2', name: 'Volkswagen Golf GTI Club', plate: 'DL-01-GT-2023', category: 'city', status: 'rented', location: 'Delhi Aerocity', rate: 90 },
  { id: 'ct3', name: 'Abarth 595 Competizione', plate: 'GA-02-AB-2024', category: 'city', status: 'rented', location: 'Goa Panaji', rate: 88 },
  { id: 'ct4', name: 'Honda Civic Si Sport', plate: 'KA-03-HC-2024', category: 'city', status: 'rented', location: 'Bengaluru Tech', rate: 78 },
  { id: 'ct5', name: 'Mini John Cooper Works', plate: 'MH-03-JC-2024', category: 'city', status: 'rented', location: 'Mumbai Bandra', rate: 95 },
  { id: 'ct6', name: 'BMW 128ti Hatch', plate: 'DL-04-BW-2023', category: 'city', status: 'rented', location: 'Gurugram', rate: 92 },
  { id: 'ct7', name: 'Mazda 3 Turbo AWD', plate: 'KA-02-MZ-2024', category: 'city', status: 'rented', location: 'Bengaluru City', rate: 82 },
  { id: 'ct8', name: 'Hyundai i20 N Line', plate: 'RJ-14-HY-2024', category: 'city', status: 'ready', location: 'Jaipur Hub', rate: 65 },
  { id: 'ct9', name: 'Suzuki Jimny 5-Door', plate: 'GA-04-SJ-2024', category: 'city', status: 'rented', location: 'Goa North', rate: 72 },
  { id: 'ct10', name: 'Audi A1 Sportback', plate: 'MH-01-AU-2023', category: 'city', status: 'rented', location: 'Mumbai Marine Dr', rate: 89 },
  { id: 'ct11', name: 'Toyota GR Yaris', plate: 'DL-02-GR-2024', category: 'city', status: 'rented', location: 'Noida Expressway', rate: 105 },
  { id: 'ct12', name: 'Peugeot 208 GT', plate: 'KA-05-PG-2023', category: 'city', status: 'ready', location: 'Bengaluru Hub', rate: 70 },
  { id: 'ct13', name: 'Fiat 500e Sport', plate: 'MH-02-FT-2024', category: 'city', status: 'rented', location: 'Mumbai Worli', rate: 80 },

  // Touring & 4x4 (12) - Slate / Zinc Light
  { id: 't1', name: 'Land Rover Defender 90', plate: 'DL-01-LR-2024', category: 'touring', status: 'rented', location: 'Leh Highway', rate: 160 },
  { id: 't2', name: 'Ford Bronco Wildtrak', plate: 'MH-01-FB-2024', category: 'touring', status: 'rented', location: 'Western Ghats', rate: 150 },
  { id: 't3', name: 'Jeep Wrangler Rubicon', plate: 'RJ-14-JW-2023', category: 'touring', status: 'rented', location: 'Thar Dunes', rate: 145 },
  { id: 't4', name: 'Toyota Land Cruiser 70', plate: 'DL-05-LC-2023', category: 'touring', status: 'rented', location: 'Shimla Route', rate: 155 },
  { id: 't5', name: 'Audi Q5 Sportback', plate: 'KA-01-AQ-2024', category: 'touring', status: 'rented', location: 'Ooty Pass', rate: 135 },
  { id: 't6', name: 'Porsche Macan GTS', plate: 'MH-03-PM-2024', category: 'touring', status: 'rented', location: 'Goa Expressway', rate: 175 },
  { id: 't7', name: 'BMW X3 M40i AWD', plate: 'DL-03-BX-2024', category: 'touring', status: 'rented', location: 'Delhi Ring Rd', rate: 140 },
  { id: 't8', name: 'Mercedes-Benz G 400d', plate: 'MH-01-GW-2024', category: 'touring', status: 'rented', location: 'Mahabaleshwar', rate: 210 },
  { id: 't9', name: 'Subaru Outback', plate: 'KA-04-SO-2023', category: 'touring', status: 'ready', location: 'Bengaluru Depot', rate: 110 },
  { id: 't10', name: 'Volvo XC60 Recharge', plate: 'RJ-01-VX-2024', category: 'touring', status: 'rented', location: 'Udaipur Lakes', rate: 130 },
  { id: 't11', name: 'Land Rover Defender 110', plate: 'GA-01-LD-2024', category: 'touring', status: 'rented', location: 'Dudhsagar Fall', rate: 170 },
  { id: 't12', name: 'Ineos Grenadier', plate: 'DL-09-IG-2024', category: 'touring', status: 'maintenance', location: 'Delhi Depot', rate: 165 },

  // Electric EV (8) - Signature Warm Amber Accent (like Halden)
  { id: 'e1', name: 'Porsche Taycan 4S', plate: 'MH-01-PT-2024', category: 'electric', status: 'rented', location: 'Mumbai-Pune Exp', rate: 190 },
  { id: 'e2', name: 'Hyundai Ioniq 5 AWD', plate: 'KA-01-HI-2024', category: 'electric', status: 'rented', location: 'Bengaluru EV Hub', rate: 115 },
  { id: 'e3', name: 'Kia EV6 GT-Line', plate: 'DL-01-KE-2024', category: 'electric', status: 'rented', location: 'Delhi Express', rate: 120 },
  { id: 'e4', name: 'BMW i4 M50 Gran Coupe', plate: 'MH-04-BI-2024', category: 'electric', status: 'rented', location: 'Thane Highway', rate: 150 },
  { id: 'e5', name: 'Audi e-tron GT', plate: 'GA-01-AG-2024', category: 'electric', status: 'rented', location: 'Goa Coastal Loop', rate: 185 },
  { id: 'e6', name: 'Mercedes-Benz EQE 500', plate: 'DL-06-ME-2024', category: 'electric', status: 'ready', location: 'Delhi Aerocity', rate: 160 },
  { id: 'e7', name: 'Polestar 2 Performance', plate: 'KA-02-P2-2024', category: 'electric', status: 'rented', location: 'Bengaluru Airport', rate: 110 },
  { id: 'e8', name: 'Volvo EX30 Twin Motor', plate: 'RJ-14-VE-2024', category: 'electric', status: 'ready', location: 'Jaipur Supercharge', rate: 95 }
];

// Minimal, black-and-white focused palette matching the Halden reference
const CATEGORIES = [
  {
    key: 'classic' as const,
    label: 'Classic & Vintage',
    count: 15,
    share: '31.3%',
    // High contrast black / white
    colorClass: 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-200',
    indicatorClass: 'bg-zinc-900 dark:bg-zinc-100'
  },
  {
    key: 'city' as const,
    label: 'City Compact',
    count: 13,
    share: '27.1%',
    // Dark zinc
    colorClass: 'bg-zinc-600 dark:bg-zinc-400 border-zinc-600 dark:border-zinc-400',
    indicatorClass: 'bg-zinc-600 dark:bg-zinc-400'
  },
  {
    key: 'touring' as const,
    label: 'Touring & 4x4',
    count: 12,
    share: '25.0%',
    // Mid zinc / slate
    colorClass: 'bg-zinc-400 dark:bg-zinc-600 border-zinc-400 dark:border-zinc-600',
    indicatorClass: 'bg-zinc-400 dark:bg-zinc-600'
  },
  {
    key: 'electric' as const,
    label: 'Electric EV',
    count: 8,
    share: '16.6%',
    // Refined warm amber accent (matching Halden signature)
    colorClass: 'bg-amber-500 border-amber-600 dark:bg-amber-400 dark:border-amber-500',
    indicatorClass: 'bg-amber-500 dark:bg-amber-400'
  }
];

export function PieGraph() {
  const [hoveredVehicle, setHoveredVehicle] = useState<VehicleBlock | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (vehicle: VehicleBlock, e: React.MouseEvent<HTMLButtonElement>) => {
    setHoveredVehicle(vehicle);
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = e.currentTarget.getBoundingClientRect();
      setTooltipPos({
        x: targetRect.left - containerRect.left + targetRect.width / 2,
        y: targetRect.top - containerRect.top
      });
    }
  };

  return (
    <Card className='flex h-full flex-col border border-border/70 bg-card shadow-xs transition-colors relative' ref={containerRef}>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-foreground text-sm font-semibold tracking-tight'>
            <Icons.layers className='size-4 text-foreground/80' />
            Fleet Category Share
          </CardTitle>
          <span className='text-[11px] font-mono font-medium text-muted-foreground bg-muted/60 border border-border/50 px-2 py-0.5 rounded'>
            48 Vehicles
          </span>
        </div>
        <CardDescription className='text-xs text-muted-foreground'>
          Discrete block distribution across 4 curated driving classes
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 flex flex-col justify-between pt-0 pb-3'>
        {/* Subtitle labels with clear spacing */}
        <div className='flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 mb-2'>
          <span>Waffle Grid (1 block = 1 vehicle)</span>
          <span className='font-semibold text-foreground'>42 on road · 6 in depot</span>
        </div>

        {/* Floating Tooltip Card matching Halden popup */}
        {hoveredVehicle && tooltipPos && (
          <div
            className='absolute z-50 pointer-events-none transition-all duration-75 -translate-x-1/2 -translate-y-full mb-2'
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
          >
            <div className='bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl rounded-lg p-2.5 min-w-[200px] text-xs animate-in fade-in zoom-in-95'>
              <div className='flex items-center justify-between gap-2 border-b border-zinc-800 pb-1.5 mb-1.5'>
                <span className='font-bold text-white truncate'>{hoveredVehicle.name}</span>
                <span className='font-mono text-[10px] text-zinc-400 shrink-0'>{hoveredVehicle.plate}</span>
              </div>
              <div className='flex items-center justify-between text-[11px] text-zinc-300'>
                <span className='capitalize font-medium text-zinc-400'>
                  {CATEGORIES.find((c) => c.key === hoveredVehicle.category)?.label}
                </span>
                <span className='font-mono font-semibold text-white'>${hoveredVehicle.rate}/day</span>
              </div>
              <div className='mt-1 flex items-center justify-between text-[10px] pt-1 border-t border-zinc-800/80'>
                <span className='text-zinc-400'>{hoveredVehicle.location}</span>
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded font-semibold uppercase text-[9px]',
                    hoveredVehicle.status === 'rented' && 'text-emerald-400 bg-emerald-950/60 border border-emerald-800',
                    hoveredVehicle.status === 'ready' && 'text-blue-400 bg-blue-950/60 border border-blue-800',
                    hoveredVehicle.status === 'maintenance' && 'text-amber-400 bg-amber-950/60 border border-amber-800'
                  )}
                >
                  {hoveredVehicle.status === 'rented' ? 'On Road' : hoveredVehicle.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid and Legend Container */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          {/* 10 x 5 TRUE SQUARE Waffle Grid */}
          <div className='flex justify-center p-2.5 rounded-lg bg-muted/20 border border-border/40 backdrop-blur-xs'>
            <div
              className='grid grid-cols-10 gap-1.5'
              onMouseLeave={() => setHoveredVehicle(null)}
            >
              {FLEET_VEHICLES.map((vehicle) => {
                const categoryDef = CATEGORIES.find((c) => c.key === vehicle.category);
                const isFilteredOut =
                  activeCategoryFilter !== null && activeCategoryFilter !== vehicle.category;
                const isHovered = hoveredVehicle?.id === vehicle.id;

                return (
                  <button
                    key={vehicle.id}
                    type='button'
                    onMouseEnter={(e) => handleMouseEnter(vehicle, e)}
                    onClick={() =>
                      setActiveCategoryFilter(
                        activeCategoryFilter === vehicle.category ? null : vehicle.category
                      )
                    }
                    className={cn(
                      // STRICT TRUE SQUARES: w-4 h-4 sm:w-5 sm:h-5 aspect-square
                      'size-4 sm:size-5 aspect-square rounded-[2px] border transition-all duration-150 cursor-pointer focus:outline-none',
                      categoryDef?.colorClass,
                      isFilteredOut && 'opacity-20 scale-90 border-transparent',
                      isHovered && 'scale-125 ring-2 ring-foreground z-20 shadow-lg',
                      vehicle.status === 'ready' && 'opacity-65',
                      vehicle.status === 'maintenance' && 'opacity-30'
                    )}
                    aria-label={`${vehicle.name} (${vehicle.category})`}
                  />
                );
              })}

              {/* 2 ghost slots for 50-cell grid alignment */}
              <div className='size-4 sm:size-5 aspect-square rounded-[2px] border border-dashed border-border/30 bg-muted/10 opacity-20' />
              <div className='size-4 sm:size-5 aspect-square rounded-[2px] border border-dashed border-border/30 bg-muted/10 opacity-20' />
            </div>
          </div>

          {/* Clean Monochrome Legend with Wide Spacing */}
          <div className='flex flex-col gap-1.5 w-full sm:w-48 shrink-0 text-xs'>
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategoryFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  type='button'
                  onClick={() => setActiveCategoryFilter(isSelected ? null : cat.key)}
                  onMouseEnter={() => {
                    const firstMatch = FLEET_VEHICLES.find((v) => v.category === cat.key);
                    if (firstMatch) setHoveredVehicle(firstMatch);
                  }}
                  onMouseLeave={() => setHoveredVehicle(null)}
                  className={cn(
                    'flex items-center justify-between p-2 rounded-md text-left transition-colors cursor-pointer border border-transparent',
                    isSelected
                      ? 'bg-muted/80 border-border/60 font-semibold text-foreground'
                      : 'hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <div className='flex items-center gap-2.5 min-w-0'>
                    <span
                      className={cn(
                        'size-2.5 aspect-square rounded-[2px] shrink-0',
                        cat.indicatorClass
                      )}
                    />
                    <span className='truncate text-xs font-medium'>{cat.label}</span>
                  </div>
                  <div className='flex items-center gap-2 pl-2 font-mono text-[11px] shrink-0'>
                    <span className='font-bold text-foreground'>{cat.count}</span>
                    <span className='text-muted-foreground text-[10px]'>({cat.share})</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom persistent info text */}
        <div className='mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground'>
          <span className='flex items-center gap-1.5'>
            <Icons.info className='size-3 text-muted-foreground/70' />
            Hover any square block to inspect car telemetry card
          </span>
          <span className='font-mono text-[10px] font-semibold text-foreground'>
            88.4% fleet active
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
