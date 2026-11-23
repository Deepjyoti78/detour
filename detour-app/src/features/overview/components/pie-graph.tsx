'use client';

import React, { useState } from 'react';
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

// 48 individual fleet vehicles representing the exact Detour fleet
const FLEET_VEHICLES: VehicleBlock[] = [
  // Classic & Vintage (15)
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

  // City Compact (13)
  { id: 'ct1', name: 'Mini Cooper S Heritage', plate: 'MH-02-MC-2024', category: 'city', status: 'rented', location: 'Mumbai South', rate: 85 },
  { id: 'ct2', name: 'Volkswagen Golf GTI Club', plate: 'DL-01-GT-2023', category: 'city', status: 'rented', location: 'Delhi Aerocity', rate: 90 },
  { id: 'ct3', name: 'Abarth 595 Competizione', plate: 'GA-02-AB-2024', category: 'city', status: 'rented', location: 'Goa Panaji', rate: 88 },
  { id: 'ct4', name: 'Honda Civic Si Sport', plate: 'KA-03-HC-2024', category: 'city', status: 'rented', location: 'Bengaluru Tech', rate: 78 },
  { id: 'ct5', name: 'Mini John Cooper Works', plate: 'MH-03-JC-2024', category: 'city', status: 'rented', location: 'Mumbai Bandra', rate: 95 },
  { id: 'ct6', name: 'BMW 128ti Hatch', plate: 'DL-04-BW-2023', category: 'city', status: 'rented', location: 'Gurugram', rate: 92 },
  { id: 'ct7', name: 'Mazda 3 Turbo AWD', plate: 'KA-02-MZ-2024', category: 'city', status: 'rented', location: 'Bengaluru City', rate: 82 },
  { id: 'ct8', name: 'Hyundai i20 N Line', plate: 'RJ-14-HY-2024', category: 'city', status: 'ready', location: 'Jaipur Hub', rate: 65 },
  { id: 'ct9', name: 'Suzuki Jimny 5-Door City', plate: 'GA-04-SJ-2024', category: 'city', status: 'rented', location: 'Goa North', rate: 72 },
  { id: 'ct10', name: 'Audi A1 Sportback S-line', plate: 'MH-01-AU-2023', category: 'city', status: 'rented', location: 'Mumbai Marine Dr', rate: 89 },
  { id: 'ct11', name: 'Toyota GR Yaris Sprint', plate: 'DL-02-GR-2024', category: 'city', status: 'rented', location: 'Noida Expressway', rate: 105 },
  { id: 'ct12', name: 'Peugeot 208 GT Edition', plate: 'KA-05-PG-2023', category: 'city', status: 'ready', location: 'Bengaluru Hub', rate: 70 },
  { id: 'ct13', name: 'Fiat 500e Sport Electric', plate: 'MH-02-FT-2024', category: 'city', status: 'rented', location: 'Mumbai Worli', rate: 80 },

  // Touring & 4x4 (12)
  { id: 't1', name: 'Land Rover Defender 90', plate: 'DL-01-LR-2024', category: 'touring', status: 'rented', location: 'Leh Highway', rate: 160 },
  { id: 't2', name: 'Ford Bronco Wildtrak', plate: 'MH-01-FB-2024', category: 'touring', status: 'rented', location: 'Western Ghats', rate: 150 },
  { id: 't3', name: 'Jeep Wrangler Rubicon', plate: 'RJ-14-JW-2023', category: 'touring', status: 'rented', location: 'Thar Dunes', rate: 145 },
  { id: 't4', name: 'Toyota Land Cruiser 70', plate: 'DL-05-LC-2023', category: 'touring', status: 'rented', location: 'Shimla Route', rate: 155 },
  { id: 't5', name: 'Audi Q5 Sportback Quattro', plate: 'KA-01-AQ-2024', category: 'touring', status: 'rented', location: 'Ooty Pass', rate: 135 },
  { id: 't6', name: 'Porsche Macan GTS', plate: 'MH-03-PM-2024', category: 'touring', status: 'rented', location: 'Goa Expressway', rate: 175 },
  { id: 't7', name: 'BMW X3 M40i AWD', plate: 'DL-03-BX-2024', category: 'touring', status: 'rented', location: 'Delhi Ring Rd', rate: 140 },
  { id: 't8', name: 'Mercedes-Benz G 400d', plate: 'MH-01-GW-2024', category: 'touring', status: 'rented', location: 'Mahabaleshwar', rate: 210 },
  { id: 't9', name: 'Subaru Outback Wilderness', plate: 'KA-04-SO-2023', category: 'touring', status: 'ready', location: 'Bengaluru Depot', rate: 110 },
  { id: 't10', name: 'Volvo XC60 Recharge B6', plate: 'RJ-01-VX-2024', category: 'touring', status: 'rented', location: 'Udaipur Lakes', rate: 130 },
  { id: 't11', name: 'Land Rover Defender 110', plate: 'GA-01-LD-2024', category: 'touring', status: 'rented', location: 'Dudhsagar Fall', rate: 170 },
  { id: 't12', name: 'Ineos Grenadier Trialmaster', plate: 'DL-09-IG-2024', category: 'touring', status: 'maintenance', location: 'Delhi Depot', rate: 165 },

  // Electric EV (8)
  { id: 'e1', name: 'Porsche Taycan 4S Cross', plate: 'MH-01-PT-2024', category: 'electric', status: 'rented', location: 'Mumbai-Pune Exp', rate: 190 },
  { id: 'e2', name: 'Hyundai Ioniq 5 AWD', plate: 'KA-01-HI-2024', category: 'electric', status: 'rented', location: 'Bengaluru EV Hub', rate: 115 },
  { id: 'e3', name: 'Kia EV6 GT-Line AWD', plate: 'DL-01-KE-2024', category: 'electric', status: 'rented', location: 'Delhi Express', rate: 120 },
  { id: 'e4', name: 'BMW i4 M50 Gran Coupe', plate: 'MH-04-BI-2024', category: 'electric', status: 'rented', location: 'Thane Highway', rate: 150 },
  { id: 'e5', name: 'Audi e-tron GT Quattro', plate: 'GA-01-AG-2024', category: 'electric', status: 'rented', location: 'Goa Coastal Loop', rate: 185 },
  { id: 'e6', name: 'Mercedes-Benz EQE 500', plate: 'DL-06-ME-2024', category: 'electric', status: 'ready', location: 'Delhi Aerocity', rate: 160 },
  { id: 'e7', name: 'Polestar 2 Performance', plate: 'KA-02-P2-2024', category: 'electric', status: 'rented', location: 'Bengaluru Airport', rate: 110 },
  { id: 'e8', name: 'Volvo EX30 Twin Motor', plate: 'RJ-14-VE-2024', category: 'electric', status: 'ready', location: 'Jaipur Supercharge', rate: 95 }
];

const CATEGORIES = [
  {
    key: 'classic' as const,
    label: 'Classic & Vintage',
    count: 15,
    share: 31.3,
    colorClass: 'bg-amber-500 border-amber-600',
    hoverClass: 'hover:bg-amber-400',
    indicatorClass: 'bg-amber-500'
  },
  {
    key: 'city' as const,
    label: 'City Compact',
    count: 13,
    share: 27.1,
    colorClass: 'bg-emerald-500 border-emerald-600',
    hoverClass: 'hover:bg-emerald-400',
    indicatorClass: 'bg-emerald-500'
  },
  {
    key: 'touring' as const,
    label: 'Touring & 4x4',
    count: 12,
    share: 25.0,
    colorClass: 'bg-blue-500 border-blue-600',
    hoverClass: 'hover:bg-blue-400',
    indicatorClass: 'bg-blue-500'
  },
  {
    key: 'electric' as const,
    label: 'Electric EV',
    count: 8,
    share: 16.6,
    colorClass: 'bg-purple-500 border-purple-600',
    hoverClass: 'hover:bg-purple-400',
    indicatorClass: 'bg-purple-500'
  }
];

export function PieGraph() {
  const [hoveredVehicle, setHoveredVehicle] = useState<VehicleBlock | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  return (
    <Card className='flex h-full flex-col border border-border/70 bg-card shadow-xs transition-colors'>
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
          Distribution across 4 curated driving classes
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 flex flex-col justify-between pt-0 pb-4'>
        {/* Main Block Matrix Grid Layout */}
        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between'>
          {/* 10 x 5 Block Waffle Grid */}
          <div className='flex flex-col gap-1.5 w-full lg:w-auto'>
            <div className='text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 flex items-center justify-between'>
              <span>Waffle Matrix (1 block = 1 vehicle)</span>
              <span>42 Active / 6 In Depot</span>
            </div>

            <div
              className='grid grid-cols-8 sm:grid-cols-10 gap-1.5 p-2 rounded-lg bg-muted/20 border border-border/40 backdrop-blur-xs'
              onMouseLeave={() => setHoveredVehicle(null)}
            >
              {FLEET_VEHICLES.map((vehicle, index) => {
                const categoryDef = CATEGORIES.find((c) => c.key === vehicle.category);
                const isFilteredOut =
                  activeCategoryFilter !== null && activeCategoryFilter !== vehicle.category;
                const isHovered = hoveredVehicle?.id === vehicle.id;

                return (
                  <button
                    key={vehicle.id}
                    type='button'
                    onMouseEnter={() => setHoveredVehicle(vehicle)}
                    onClick={() =>
                      setActiveCategoryFilter(
                        activeCategoryFilter === vehicle.category ? null : vehicle.category
                      )
                    }
                    className={cn(
                      'size-5 sm:size-6 rounded-[3px] border transition-all duration-150 relative cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring',
                      categoryDef?.colorClass,
                      categoryDef?.hoverClass,
                      isFilteredOut && 'opacity-20 scale-90 border-transparent',
                      isHovered && 'scale-115 ring-2 ring-foreground z-10 shadow-md',
                      vehicle.status === 'ready' && 'opacity-60 saturate-75',
                      vehicle.status === 'maintenance' && 'opacity-40 line-through'
                    )}
                    aria-label={`${vehicle.name} (${vehicle.category})`}
                  >
                    {/* Status dot in bottom right */}
                    {vehicle.status === 'rented' && (
                      <span className='absolute bottom-0.5 right-0.5 size-1 rounded-full bg-white/80' />
                    )}
                  </button>
                );
              })}

              {/* 2 ghost slots to complete 50-cell grid alignment */}
              <div className='size-5 sm:size-6 rounded-[3px] border border-dashed border-border/40 bg-muted/10 opacity-30 flex items-center justify-center text-[8px] text-muted-foreground'>
                +1
              </div>
              <div className='size-5 sm:size-6 rounded-[3px] border border-dashed border-border/40 bg-muted/10 opacity-30 flex items-center justify-center text-[8px] text-muted-foreground'>
                +2
              </div>
            </div>
          </div>

          {/* Interactive Legend & Counts List (matching Halden style) */}
          <div className='flex flex-col gap-2 w-full lg:w-44 shrink-0 text-xs'>
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
                    'flex items-center justify-between p-1.5 rounded-md text-left transition-colors cursor-pointer border border-transparent',
                    isSelected
                      ? 'bg-muted/80 border-border/60 font-medium'
                      : 'hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <span
                      className={cn(
                        'size-2.5 rounded-[2px] shrink-0 shadow-xs',
                        cat.indicatorClass
                      )}
                    />
                    <span className='truncate'>{cat.label}</span>
                  </div>
                  <div className='flex items-center gap-1.5 font-mono text-[11px] tabular-nums'>
                    <span className='font-semibold text-foreground'>{cat.count}</span>
                    <span className='text-muted-foreground text-[10px]'>({cat.share}%)</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Popover / Telemetry Bar for the hovered vehicle */}
        <div className='mt-3 pt-2.5 border-t border-border/50 min-h-[44px] flex items-center justify-between text-xs'>
          {hoveredVehicle ? (
            <div className='flex items-center justify-between w-full animate-in fade-in duration-100'>
              <div className='flex items-center gap-2'>
                <span
                  className={cn(
                    'size-2 rounded-full',
                    hoveredVehicle.category === 'classic' && 'bg-amber-500',
                    hoveredVehicle.category === 'city' && 'bg-emerald-500',
                    hoveredVehicle.category === 'touring' && 'bg-blue-500',
                    hoveredVehicle.category === 'electric' && 'bg-purple-500'
                  )}
                />
                <div>
                  <span className='font-semibold text-foreground mr-1.5'>{hoveredVehicle.name}</span>
                  <span className='font-mono text-[10px] text-muted-foreground'>({hoveredVehicle.plate})</span>
                </div>
              </div>
              <div className='flex items-center gap-2 font-mono text-[11px]'>
                <span className='text-muted-foreground'>{hoveredVehicle.location}</span>
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase',
                    hoveredVehicle.status === 'rented' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
                    hoveredVehicle.status === 'ready' && 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30',
                    hoveredVehicle.status === 'maintenance' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  )}
                >
                  {hoveredVehicle.status === 'rented' ? 'On Road' : hoveredVehicle.status}
                </span>
                <span className='font-bold text-foreground'>${hoveredVehicle.rate}/d</span>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-between w-full text-muted-foreground text-[11px]'>
              <span className='flex items-center gap-1.5'>
                <Icons.info className='size-3.5 text-muted-foreground/70' />
                Hover or tap any square block to inspect vehicle telemetry & assignment
              </span>
              <span className='font-mono text-[10px]'>88.4% fleet active</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
