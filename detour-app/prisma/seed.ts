import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  Role,
  VehicleCategory,
  VehicleStatus,
  BookingStatus,
  PaymentStatus,
  PaymentProvider,
  DepositStatus,
} from '../src/generated/prisma/client';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://detour_user:detour_password@localhost:5434/detour_db?schema=public';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting idempotent Detour database seed...');

  // 1. SEED REGIONAL DEPOTS
  const depotsData = [
    {
      id: 'depot-mumbai',
      code: 'BOM-01',
      name: 'Mumbai (South / Bandra)',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'IN',
      address: 'Bandra Reclamation, Near Bandra-Worli Sea Link, Mumbai 400050',
      latitude: 19.0596,
      longitude: 72.8295,
      capacity: 12,
      contactPhone: '+91 22 4590 8800',
      operatingHours: '06:00 - 23:00',
    },
    {
      id: 'depot-delhi',
      code: 'DEL-01',
      name: 'Delhi NCR (Connaught Place)',
      city: 'New Delhi',
      state: 'Delhi NCR',
      country: 'IN',
      address: 'Outer Circle, Connaught Place, New Delhi 110001',
      latitude: 28.6315,
      longitude: 77.2167,
      capacity: 10,
      contactPhone: '+91 11 4120 7700',
      operatingHours: '06:00 - 23:00',
    },
    {
      id: 'depot-bengaluru',
      code: 'BLR-01',
      name: 'Bengaluru (Indiranagar / Airport)',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'IN',
      address: '100 Feet Road, Indiranagar, Bengaluru 560038',
      latitude: 12.9716,
      longitude: 77.5946,
      capacity: 8,
      contactPhone: '+91 80 4390 1200',
      operatingHours: '06:00 - 23:00',
    },
    {
      id: 'depot-goa',
      code: 'GOA-01',
      name: 'Goa (Panaji Coastal Hub)',
      city: 'Panaji',
      state: 'Goa',
      country: 'IN',
      address: 'DB Marg, Miramar Beachfront, Panaji 403001',
      latitude: 15.4909,
      longitude: 73.8278,
      capacity: 8,
      contactPhone: '+91 832 245 9911',
      operatingHours: '07:00 - 22:00',
    },
    {
      id: 'depot-hyderabad',
      code: 'HYD-01',
      name: 'Hyderabad (Hitec City)',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'IN',
      address: 'Inorbit Mall Road, Hitec City, Hyderabad 500081',
      latitude: 17.385,
      longitude: 78.4867,
      capacity: 6,
      contactPhone: '+91 40 4820 6600',
      operatingHours: '07:00 - 22:00',
    },
    {
      id: 'depot-jaipur',
      code: 'JAI-01',
      name: 'Jaipur (Pink City Hub)',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'IN',
      address: 'MI Road, Near Ajmeri Gate, Jaipur 302001',
      latitude: 26.9124,
      longitude: 75.7873,
      capacity: 6,
      contactPhone: '+91 141 236 4410',
      operatingHours: '07:00 - 22:00',
    },
    {
      id: 'depot-portland',
      code: 'PDX-01',
      name: 'Portland Downtown',
      city: 'Portland',
      state: 'Oregon',
      country: 'US',
      address: '1020 SW Morrison St, Portland, OR 97205',
      latitude: 45.5152,
      longitude: -122.6784,
      capacity: 8,
      contactPhone: '+1 (503) 555-0144',
      operatingHours: '07:00 - 21:00',
    },
  ];

  for (const d of depotsData) {
    await prisma.depot.upsert({
      where: { code: d.code },
      update: d,
      create: d,
    });
  }
  console.log(`✅ Seeded ${depotsData.length} regional depots.`);

  // 2. SEED VEHICLE MODELS (PRESERVING EXACT SLUGS AND ASSETS)
  const modelsData = [
    {
      id: 'model-classic',
      slug: 'classic',
      name: 'The Classic',
      category: VehicleCategory.CLASSIC,
      headline: 'A red classic roadster silhouette for open roads with timeless charm.',
      shortDescription: 'A red classic for a drive with time to spare.',
      description:
        'A restored vintage roadster designed for winding backroads, sunny afternoon ridge tours, and open-top motoring. Features responsive mechanical steering, analog dials, and leather bucket seats.',
      baseDailyRate: 89,
      depositAmount: 500,
      transmission: 'Manual',
      seats: 4,
      luggage: '2 Bags',
      engine: '2.0L Inline-4 Naturally Aspirated',
      fuelType: 'Gasoline (91+ Octane)',
      topSpeed: '115 mph',
      acceleration: '8.4s (0-60)',
      heroImage: '/assets/sunset.jpg',
      gallery: ['/assets/sunset.jpg', '/assets/roadster.jpg'],
      features: ['Analog Dash Gauges', 'Soft-Top Canvas', 'Wooden Steering Wheel', 'Bluetooth Radio'],
      isAvailable: true,
    },
    {
      id: 'model-roadster',
      slug: 'roadster',
      name: 'The Roadster',
      category: VehicleCategory.CLASSIC,
      headline: 'Pure vintage open-air motoring for winding backroads and coastal cliffs.',
      shortDescription: 'Pure vintage open-air motoring for winding backroads.',
      description:
        'Two-seat open-top speedster with visceral exhaust note, lightened chassis, and precise short-throw shifter. The ultimate choice for coastal weekend escapes.',
      baseDailyRate: 99,
      depositAmount: 500,
      transmission: 'Manual',
      seats: 2,
      luggage: '1 Bag',
      engine: '2.2L Dual-Carb Boxer',
      fuelType: 'Gasoline',
      topSpeed: '128 mph',
      acceleration: '7.1s (0-60)',
      heroImage: '/assets/roadster.jpg',
      gallery: ['/assets/roadster.jpg', '/assets/sunset.jpg'],
      features: ['Removable Tonneau Cover', 'Louvered Hood', 'Wire Wheels', 'Stainless Exhaust'],
      isAvailable: true,
    },
    {
      id: 'model-cabriolet',
      slug: 'cabriolet',
      name: 'The Cabriolet',
      category: VehicleCategory.CLASSIC,
      headline: 'Timeless drop-top silhouette with effortless cruiser charm and chrome accents.',
      shortDescription: 'Timeless drop-top silhouette with effortless cruiser charm.',
      description:
        'Four-passenger cruiser cabriolet featuring power hydraulic roof, plush leather interior, and velvety suspension tuned for highway promenades.',
      baseDailyRate: 95,
      depositAmount: 500,
      transmission: 'Manual',
      seats: 4,
      luggage: '2 Bags',
      engine: '2.5L Straight-6',
      fuelType: 'Gasoline',
      topSpeed: '120 mph',
      acceleration: '8.9s (0-60)',
      heroImage: '/assets/cabriolet.jpg',
      gallery: ['/assets/cabriolet.jpg'],
      features: ['Power Soft Top', 'Burled Walnut Trim', 'Chrome Accents', 'Fog Lamps'],
      isAvailable: true,
    },
    {
      id: 'model-city',
      slug: 'city',
      name: 'The City',
      category: VehicleCategory.CITY,
      headline: 'A compact hatchback for getting around town with tight turning circle.',
      shortDescription: 'A compact hatchback for getting around town.',
      description:
        'Smart, fuel-efficient hatchback designed for narrow metropolitan streets, underground garages, and quick day trips. Easy parking and peppy low-end throttle.',
      baseDailyRate: 59,
      depositAmount: 300,
      transmission: 'Automatic',
      seats: 4,
      luggage: '1 Bag',
      engine: '1.2L Turbo 3-Cylinder',
      fuelType: 'Gasoline',
      topSpeed: '105 mph',
      acceleration: '9.6s (0-60)',
      heroImage: '/assets/city-car.jpg',
      gallery: ['/assets/city-car.jpg'],
      features: ['Apple CarPlay / Android Auto', 'Rear Parking Sensors', 'Eco Mode', 'Keyless Entry'],
      isAvailable: true,
    },
    {
      id: 'model-metro',
      slug: 'metro',
      name: 'The Metro',
      category: VehicleCategory.CITY,
      headline: 'Ultra-nimble city cruiser designed for tight parking and narrow streets.',
      shortDescription: 'Ultra-nimble city cruiser designed for tight parking.',
      description:
        'Agile subcompact car engineered for high-density traffic. Superb outward visibility, tight turning radius, and split-folding rear seats for luggage.',
      baseDailyRate: 52,
      depositAmount: 300,
      transmission: 'Automatic',
      seats: 4,
      luggage: '1 Bag',
      engine: '1.0L Turbo',
      fuelType: 'Gasoline',
      topSpeed: '100 mph',
      acceleration: '10.2s (0-60)',
      heroImage: '/assets/metro.jpg',
      gallery: ['/assets/metro.jpg'],
      features: ['Touchscreen Infotainment', 'Reverse Camera', 'Cruise Control', 'USB-C Fast Charging'],
      isAvailable: true,
    },
    {
      id: 'model-compact',
      slug: 'compact',
      name: 'The Compact',
      category: VehicleCategory.CITY,
      headline: 'Minimalist city runabout with smart cargo flexibility and modern cabin.',
      shortDescription: 'Minimalist city runabout with smart cargo flexibility.',
      description:
        'Reliable modern urban transport built for everyday agility, low fuel consumption, and comfortable seating for four passengers.',
      baseDailyRate: 49,
      depositAmount: 300,
      transmission: 'Automatic',
      seats: 4,
      luggage: '2 Bags',
      engine: '1.4L 4-Cylinder',
      fuelType: 'Gasoline',
      topSpeed: '108 mph',
      acceleration: '9.8s (0-60)',
      heroImage: '/assets/city-car.jpg',
      gallery: ['/assets/city-car.jpg'],
      features: ['Lane Departure Warning', 'Bluetooth Audio', 'Split Rear Bench', 'ISOFIX Mounts'],
      isAvailable: true,
    },
    {
      id: 'model-touring',
      slug: 'touring',
      name: 'The Touring',
      category: VehicleCategory.TOURING,
      headline: 'A five-seat crossover engineered for long coastal drives and mountain routes.',
      shortDescription: 'Five-seat crossover engineered for long scenic drives.',
      description:
        'Rugged crossover with all-wheel-drive assurance, generous legroom, roof rack capability, and advanced driver assistance. Perfect for scenic family holidays.',
      baseDailyRate: 75,
      depositAmount: 400,
      transmission: 'Automatic',
      seats: 5,
      luggage: '3 Bags',
      engine: '2.5L AWD Boxer',
      fuelType: 'Gasoline',
      topSpeed: '125 mph',
      acceleration: '7.8s (0-60)',
      heroImage: '/assets/touring-car.jpg',
      gallery: ['/assets/touring-car.jpg'],
      features: ['AWD System', 'Panoramic Moonroof', 'Adaptive Cruise', 'Harman Kardon Audio'],
      isAvailable: true,
    },
    {
      id: 'model-grand-tourer',
      slug: 'grand-tourer',
      name: 'The Grand Tourer',
      category: VehicleCategory.TOURING,
      headline: 'Smooth cross-country performance with expansive cargo volume and plush cabin.',
      shortDescription: 'Smooth cross-country performance with expansive cargo volume.',
      description:
        'Long-wheelbase luxury estate wagon offering whisper-quiet highway ride, ventilated leather upholstery, and massive rear luggage capacity.',
      baseDailyRate: 105,
      depositAmount: 500,
      transmission: 'Automatic',
      seats: 5,
      luggage: '4 Bags',
      engine: '3.0L Twin-Turbo V6',
      fuelType: 'Gasoline',
      topSpeed: '145 mph',
      acceleration: '5.9s (0-60)',
      heroImage: '/assets/grand-tourer.jpg',
      gallery: ['/assets/grand-tourer.jpg'],
      features: ['Air Suspension', 'Head-Up Display', 'Ventilated Seats', 'Wireless Phone Charger'],
      isAvailable: true,
    },
    {
      id: 'model-overland',
      slug: 'overland',
      name: 'The Overland',
      category: VehicleCategory.TOURING,
      headline: 'High-clearance expedition 4x4 engineered for mountain passes and wild trails.',
      shortDescription: 'High-clearance expedition 4x4 engineered for mountain passes.',
      description:
        'Heavy-duty 4WD expedition vehicle with low-range transfer case, all-terrain tires, roof tent mounts, and heavy recovery hooks. Built for ghats and passes.',
      baseDailyRate: 115,
      depositAmount: 600,
      transmission: 'Automatic',
      seats: 5,
      luggage: '4 Bags',
      engine: '2.8L Turbo-Diesel',
      fuelType: 'Diesel',
      topSpeed: '110 mph',
      acceleration: '9.2s (0-60)',
      heroImage: '/assets/overland.jpg',
      gallery: ['/assets/overland.jpg'],
      features: ['Locking Rear Differential', 'All-Terrain Tires', 'Underbody Skid Plates', 'Snorkel'],
      isAvailable: true,
    },
    {
      id: 'model-sprint',
      slug: 'sprint',
      name: 'The Sprint EV',
      category: VehicleCategory.ELECTRIC,
      headline: 'Quiet, zero-emission urban sprint with instant electric torque and smart nav.',
      shortDescription: 'Quiet, zero-emission urban sprint with instant electric torque.',
      description:
        'Sleek modern electric hatchback featuring rapid DC fast-charging, regenerative one-pedal drive, and a whisper-quiet panoramic glass cabin.',
      baseDailyRate: 65,
      depositAmount: 400,
      transmission: 'Automatic',
      seats: 5,
      luggage: '2 Bags',
      range: '280 miles (WLTP)',
      fuelType: '100% Electric',
      topSpeed: '112 mph',
      acceleration: '6.4s (0-60)',
      heroImage: '/assets/sprint.jpg',
      gallery: ['/assets/sprint.jpg'],
      features: ['150kW DC Fast Charge', 'One-Pedal Drive Mode', 'Heat Pump Climate', 'Smart Preconditioning'],
      isAvailable: true,
    },
    {
      id: 'model-urbanist',
      slug: 'urbanist',
      name: 'The Urbanist',
      category: VehicleCategory.CITY,
      headline: 'Brisk city hatchback with tight turning circle and effortless street parking.',
      shortDescription: 'Brisk city hatchback with tight turning circle.',
      description:
        'Retro-styled nimble city runabout built for downtown coffee runs, historic city districts, and effortless street parking.',
      baseDailyRate: 55,
      depositAmount: 300,
      transmission: 'Manual',
      seats: 4,
      luggage: '2 Bags',
      engine: '1.2L Dual-VVT',
      fuelType: 'Gasoline',
      topSpeed: '105 mph',
      acceleration: '10.5s (0-60)',
      heroImage: '/assets/metro.jpg',
      gallery: ['/assets/metro.jpg'],
      features: ['Compact Footprint', 'Digital Cluster', 'Rear Camera', 'Bluetooth'],
      isAvailable: true,
    },
  ];

  for (const m of modelsData) {
    await prisma.vehicleModel.upsert({
      where: { slug: m.slug },
      update: m,
      create: m,
    });
  }
  console.log(`✅ Seeded ${modelsData.length} vehicle models.`);

  // 3. SEED PHYSICAL FLEET VEHICLES
  const vehiclesData = [
    {
      vin: '1DETOUR1974CL001',
      licensePlate: 'MH 01 DT 1974',
      modelId: 'model-classic',
      depotId: 'depot-mumbai',
      color: 'Signal Red',
      year: 2021,
      currentMileage: 14200,
      fuelOrBatteryLevel: 92,
      status: VehicleStatus.AVAILABLE,
      conditionNotes: 'Showroom condition. Last inspected with zero flaws.',
    },
    {
      vin: '1DETOUR2021RD002',
      licensePlate: 'GA 03 RT 2021',
      modelId: 'model-roadster',
      depotId: 'depot-goa',
      color: 'Racing Blue',
      year: 2022,
      currentMileage: 18500,
      fuelOrBatteryLevel: 95,
      status: VehicleStatus.RENTED,
      conditionNotes: 'Assigned to active Goa coastal booking.',
    },
    {
      vin: '1DETOUR2022CB003',
      licensePlate: 'DL 10 CR 8832',
      modelId: 'model-cabriolet',
      depotId: 'depot-delhi',
      color: 'Champagne Silver',
      year: 2022,
      currentMileage: 22100,
      fuelOrBatteryLevel: 88,
      status: VehicleStatus.AVAILABLE,
      conditionNotes: 'Leather conditioned, top mechanism greased.',
    },
    {
      vin: '1DETOUR2023CT004',
      licensePlate: 'KA 05 CT 3321',
      modelId: 'model-city',
      depotId: 'depot-bengaluru',
      color: 'Sage Green',
      year: 2023,
      currentMileage: 16800,
      fuelOrBatteryLevel: 84,
      status: VehicleStatus.RENTED,
      conditionNotes: 'Smooth drive, tires at 80% tread.',
    },
    {
      vin: '1DETOUR2024EV005',
      licensePlate: 'MH 02 EV 9081',
      modelId: 'model-sprint',
      depotId: 'depot-mumbai',
      color: 'Crimson Red',
      year: 2024,
      currentMileage: 11200,
      fuelOrBatteryLevel: 98,
      status: VehicleStatus.RENTED,
      conditionNotes: 'High-voltage battery health 100%.',
    },
    {
      vin: '1DETOUR2023TR006',
      licensePlate: 'OR 789 TRG',
      modelId: 'model-touring',
      depotId: 'depot-portland',
      color: 'Slate Blue',
      year: 2023,
      currentMileage: 34900,
      fuelOrBatteryLevel: 88,
      status: VehicleStatus.RENTED,
      conditionNotes: 'All-weather mats installed, AWD checked.',
    },
    {
      vin: '1DETOUR2023OL007',
      licensePlate: 'RJ 14 OL 4400',
      modelId: 'model-overland',
      depotId: 'depot-jaipur',
      color: 'Desert Dune',
      year: 2023,
      currentMileage: 19450,
      fuelOrBatteryLevel: 82,
      status: VehicleStatus.RENTED,
      conditionNotes: 'Equipped with heavy expedition pack and roof rack.',
    },
    {
      vin: '1DETOUR2024GT008',
      licensePlate: 'OR 221 GTW',
      modelId: 'model-grand-tourer',
      depotId: 'depot-portland',
      color: 'Deep Forest Green',
      year: 2024,
      currentMileage: 21800,
      fuelOrBatteryLevel: 94,
      status: VehicleStatus.AVAILABLE,
      conditionNotes: 'Pre-flight safety inspection completed.',
    },
    {
      vin: '1DETOUR2023UB009',
      licensePlate: 'WB 02 UB 4410',
      modelId: 'model-urbanist',
      depotId: 'depot-mumbai',
      color: 'Classic White',
      year: 2023,
      currentMileage: 28300,
      fuelOrBatteryLevel: 65,
      status: VehicleStatus.MAINTENANCE,
      conditionNotes: 'Scheduled oil service and air filter swap.',
    },
    {
      vin: '1DETOUR2024MT010',
      licensePlate: 'TS 09 MT 5566',
      modelId: 'model-metro',
      depotId: 'depot-hyderabad',
      color: 'Electric Indigo',
      year: 2024,
      currentMileage: 9500,
      fuelOrBatteryLevel: 96,
      status: VehicleStatus.AVAILABLE,
      conditionNotes: 'Cleaned and ready for pickup at Hitec City depot.',
    },
    {
      vin: '1DETOUR2024CP011',
      licensePlate: 'DL 08 CP 7712',
      modelId: 'model-compact',
      depotId: 'depot-delhi',
      color: 'Silver Ash',
      year: 2024,
      currentMileage: 13400,
      fuelOrBatteryLevel: 90,
      status: VehicleStatus.AVAILABLE,
      conditionNotes: 'Full tank, tire pressure calibrated.',
    },
  ];

  for (const v of vehiclesData) {
    await prisma.vehicle.upsert({
      where: { vin: v.vin },
      update: v,
      create: v,
    });
  }
  console.log(`✅ Seeded ${vehiclesData.length} physical fleet vehicles.`);

  // 4. SEED SAMPLE USERS
  const usersData = [
    {
      email: 'admin@detour.com',
      firstName: 'Admin',
      lastName: 'Director',
      role: Role.ADMIN,
      phone: '+1 503 555 0100',
    },
    {
      email: 'operations@detour.com',
      firstName: 'Fleet',
      lastName: 'Operations',
      role: Role.OPERATOR,
      phone: '+91 22 4590 8801',
    },
    {
      email: 'm.vance@pacificdrives.com',
      firstName: 'Marcus',
      lastName: 'Vance',
      role: Role.CUSTOMER,
      phone: '+1 (503) 912-3841',
    },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }
  console.log(`✅ Seeded ${usersData.length} users.`);

  // 5. SEED SAMPLE ACTIVE BOOKINGS
  const marcusUser = await prisma.user.findUnique({ where: { email: 'm.vance@pacificdrives.com' } });
  const roadsterVehicle = await prisma.vehicle.findUnique({ where: { vin: '1DETOUR2021RD002' } });

  if (marcusUser && roadsterVehicle) {
    await prisma.booking.upsert({
      where: { referenceNumber: 'DT-8942' },
      update: {},
      create: {
        referenceNumber: 'DT-8942',
        customerId: marcusUser.id,
        modelId: 'model-roadster',
        vehicleId: roadsterVehicle.id,
        pickupDepotId: 'depot-goa',
        returnDepotId: 'depot-goa',
        pickupDate: new Date('2026-11-20T10:00:00Z'),
        returnDate: new Date('2026-11-24T18:00:00Z'),
        status: BookingStatus.ACTIVE,
        totalDays: 4,
        dailyRate: 99,
        optionsFee: 0,
        serviceFee: 50,
        securityDeposit: 500,
        totalAmount: 446,
        driverName: 'Marcus Vance',
        driverEmail: 'm.vance@pacificdrives.com',
        driverPhone: '+1 (503) 912-3841',
        driverLicenseNumber: 'OR-DL99214A',
        specialRequests: 'Sunset coastal loop route map requested upon arrival.',
        payments: {
          create: {
            amount: 446,
            currency: 'USD',
            status: PaymentStatus.SUCCEEDED,
            provider: PaymentProvider.DEMO,
            transactionId: 'TXN-DT-8942-01',
            paymentMethodType: 'card',
          },
        },
        depositHolds: {
          create: {
            amount: 500,
            status: DepositStatus.HELD,
            authorizationCode: 'AUTH-HOLD-8942',
          },
        },
      },
    });
  }

  // 6. SEED SCENIC ROUTES
  const routesData = [
    {
      slug: 'goa-coastal-cliff-circuit',
      name: 'Goa Coastal Cliff Circuit',
      subtitle: 'Miramar Beach to Cabo de Rama Fort along palm-fringed coastal highways',
      heroImage: '/assets/roadster.jpg',
      originDepotId: 'depot-goa',
      destinationDepotId: 'depot-goa',
      distanceMiles: 82,
      durationHours: 3.5,
      isFeatured: true,
      recommendedModelId: 'model-roadster',
      highlightStops: [
        { name: 'Miramar Point', desc: 'Starting beachfront promenade overlooking Mandovi estuary' },
        { name: 'Cabo de Rama', desc: 'Dramatic cliffside fort overlooking the Arabian Sea' },
        { name: 'Cola Beach Lagoon', desc: 'Hidden freshwater lagoon meeting emerald surf' },
      ],
    },
    {
      slug: 'columbia-river-gorge-loop',
      name: 'Columbia River Gorge Loop',
      subtitle: 'Historic highway waterfalls, canyon viewpoints, and volcanic ridge curves',
      heroImage: '/assets/touring-car.jpg',
      originDepotId: 'depot-portland',
      destinationDepotId: 'depot-portland',
      distanceMiles: 145,
      durationHours: 4.5,
      isFeatured: true,
      recommendedModelId: 'model-touring',
      highlightStops: [
        { name: 'Vista House at Crown Point', desc: 'Panoramic 733-foot gorge promontory' },
        { name: 'Multnomah Falls', desc: 'Tiered 620-foot plunge waterfall' },
        { name: 'Hood River Fruit Loop', desc: 'Orchard-lined valley with views of Mt. Hood' },
      ],
    },
  ];

  for (const r of routesData) {
    await prisma.scenicRoute.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });
  }
  console.log(`✅ Seeded ${routesData.length} scenic routes.`);

  console.log('🎉 Idempotent database seed finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
