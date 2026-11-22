export interface FleetVehicle {
  id: string;
  name: string;
  category: 'classic' | 'city' | 'touring' | 'electric';
  rate: number;
  seats: number;
  luggage: number;
  transmission: 'Automatic' | 'Manual';
  image: string;
  alt: string;
  description: string;
  bestFor: string;
  licensePlate: string;
  status: 'available' | 'rented' | 'maintenance' | 'inspection';
  fuelLevel: number; // percentage (or battery)
  isElectric?: boolean;
  mileage: number; // in km
  depotId: string;
  depotName: string;
  lastServiced: string;
  nextServiceDue: string;
}

export interface DepotHub {
  id: string;
  name: string;
  city: string;
  stateCountry: string;
  description: string;
  address: string;
  phone: string;
  manager: string;
  totalFleet: number;
  activeRentals: number;
  availableVehicles: number;
  utilizationRate: number;
  badge: string;
}

export interface RentalBooking {
  id: string;
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAvatar?: string;
  driverLicense: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  vehicleCategory: string;
  licensePlate: string;
  depotId: string;
  depotName: string;
  returnDepotName: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  dailyRate: number;
  subtotal: number;
  serviceFee: number;
  totalAmount: number;
  status: 'on_road' | 'pickup_today' | 'return_pending' | 'confirmed' | 'completed' | 'cancelled';
  scenicRoute?: string;
  notes?: string;
  depositStatus: 'authorized' | 'captured' | 'refunded';
}

export interface ScenicDriveRoute {
  id: string;
  name: string;
  region: string;
  distanceKm: number;
  durationHours: string;
  highlight: string;
  image: string;
  recommendedCar: string;
  stops: { name: string; desc: string }[];
}

export const DETOUR_FLEET: FleetVehicle[] = [
  {
    id: 'classic',
    name: 'The Classic',
    category: 'classic',
    rate: 89,
    seats: 4,
    luggage: 2,
    transmission: 'Manual',
    image: '/assets/sunset.jpg',
    alt: 'Red classic car parked by a field at sunset',
    description: 'A red classic roadster silhouette for open roads with timeless charm.',
    bestFor: 'Slow scenic drives and weekends with soft-sided bags.',
    licensePlate: 'MH 01 DT 1974',
    status: 'available',
    fuelLevel: 92,
    mileage: 14200,
    depotId: 'mumbai',
    depotName: 'Mumbai (South / Bandra)',
    lastServiced: '2026-10-15',
    nextServiceDue: '2027-01-15'
  },
  {
    id: 'roadster',
    name: 'The Roadster',
    category: 'classic',
    rate: 99,
    seats: 2,
    luggage: 1,
    transmission: 'Manual',
    image: '/assets/roadster.jpg',
    alt: 'Vintage roadster with open-top cockpit',
    description: 'Pure vintage open-air motoring for winding backroads and coastal cliffs.',
    bestFor: 'Romantic weekend getaways, coastal highways, and sunset ridge drives.',
    licensePlate: 'GA 03 RT 2021',
    status: 'rented',
    fuelLevel: 85,
    mileage: 9840,
    depotId: 'goa',
    depotName: 'Goa (Panaji Coastal Hub)',
    lastServiced: '2026-11-01',
    nextServiceDue: '2027-02-01'
  },
  {
    id: 'cabriolet',
    name: 'The Cabriolet',
    category: 'classic',
    rate: 95,
    seats: 4,
    luggage: 2,
    transmission: 'Manual',
    image: '/assets/cabriolet.jpg',
    alt: 'Classic drop-top touring cabriolet',
    description: 'Timeless drop-top silhouette with effortless cruiser charm and chrome accents.',
    bestFor: 'Sunny summer road trips and heritage routes with friends.',
    licensePlate: 'DL 01 CB 1985',
    status: 'available',
    fuelLevel: 100,
    mileage: 18120,
    depotId: 'delhi',
    depotName: 'Delhi NCR (Connaught Place)',
    lastServiced: '2026-10-28',
    nextServiceDue: '2027-01-28'
  },
  {
    id: 'city',
    name: 'The City',
    category: 'city',
    rate: 59,
    seats: 4,
    luggage: 1,
    transmission: 'Automatic',
    image: '/assets/city-car.jpg',
    alt: 'Sage green compact hatchback',
    description: 'A compact hatchback for effortless urban maneuvering and quick hops.',
    bestFor: 'City errands, short business trips, and light packing for two.',
    licensePlate: 'KA 05 CT 3321',
    status: 'rented',
    fuelLevel: 74,
    mileage: 22400,
    depotId: 'bengaluru',
    depotName: 'Bengaluru (Indiranagar / Airport)',
    lastServiced: '2026-10-10',
    nextServiceDue: '2027-01-10'
  },
  {
    id: 'metro',
    name: 'The Metro',
    category: 'city',
    rate: 52,
    seats: 4,
    luggage: 2,
    transmission: 'Automatic',
    image: '/assets/metro.jpg',
    alt: 'Nimble modern urban runabout',
    description: 'Ultra-nimble city cruiser designed for tight parking and narrow streets.',
    bestFor: 'Navigating bustling downtown streets, metro hops, and weekend market runs.',
    licensePlate: 'TS 09 MT 5512',
    status: 'available',
    fuelLevel: 95,
    mileage: 16800,
    depotId: 'hyderabad',
    depotName: 'Hyderabad (Hitec City)',
    lastServiced: '2026-11-05',
    nextServiceDue: '2027-02-05'
  },
  {
    id: 'sprint',
    name: 'The Sprint EV',
    category: 'electric',
    rate: 65,
    seats: 5,
    luggage: 2,
    transmission: 'Automatic',
    image: '/assets/sprint.jpg',
    alt: 'Modern agile electric city hatchback',
    description: 'Quiet, zero-emission urban sprint with instant electric torque and smart nav.',
    bestFor: 'Eco-friendly daily commutes, silent city hopping, and clean getaways.',
    licensePlate: 'MH 02 EV 9081',
    status: 'rented',
    fuelLevel: 98,
    isElectric: true,
    mileage: 11200,
    depotId: 'mumbai',
    depotName: 'Mumbai (South / Bandra)',
    lastServiced: '2026-11-12',
    nextServiceDue: '2027-02-12'
  },
  {
    id: 'touring',
    name: 'The Touring',
    category: 'touring',
    rate: 75,
    seats: 5,
    luggage: 3,
    transmission: 'Automatic',
    image: '/assets/touring-car.jpg',
    alt: 'Slate blue touring crossover',
    description: 'A five-seat crossover engineered for long coastal drives and mountain routes.',
    bestFor: 'Longer coastal or mountain drives with friends and extra luggage.',
    licensePlate: 'OR 789 TRG',
    status: 'rented',
    fuelLevel: 88,
    mileage: 34900,
    depotId: 'portland-downtown',
    depotName: 'Portland Downtown',
    lastServiced: '2026-10-18',
    nextServiceDue: '2027-01-18'
  },
  {
    id: 'overland',
    name: 'The Overland',
    category: 'touring',
    rate: 115,
    seats: 5,
    luggage: 4,
    transmission: 'Automatic',
    image: '/assets/overland.jpg',
    alt: 'Rugged all-terrain 4x4 expedition vehicle',
    description: 'High-clearance expedition 4x4 engineered for mountain passes and wild trails.',
    bestFor: 'Ghat climbs, national park expeditions, and backcountry adventures.',
    licensePlate: 'RJ 14 OL 4400',
    status: 'rented',
    fuelLevel: 82,
    mileage: 19450,
    depotId: 'jaipur',
    depotName: 'Jaipur (Pink City Hub)',
    lastServiced: '2026-10-22',
    nextServiceDue: '2027-01-22'
  },
  {
    id: 'grand-tourer',
    name: 'The Grand Tourer',
    category: 'touring',
    rate: 105,
    seats: 5,
    luggage: 4,
    transmission: 'Automatic',
    image: '/assets/grand-tourer.jpg',
    alt: 'Sleek luxury touring estate wagon',
    description: 'Smooth cross-country performance with expansive cargo volume and plush cabin.',
    bestFor: 'Multi-day state highway touring and family luggage.',
    licensePlate: 'OR 221 GTW',
    status: 'available',
    fuelLevel: 94,
    mileage: 21800,
    depotId: 'portland-airport',
    depotName: 'Portland Airport',
    lastServiced: '2026-11-08',
    nextServiceDue: '2027-02-08'
  },
  {
    id: 'urbanist',
    name: 'The Urbanist',
    category: 'city',
    rate: 55,
    seats: 4,
    luggage: 2,
    transmission: 'Manual',
    image: '/assets/sprint.jpg',
    alt: 'Retro-styled nimble city runabout',
    description: 'Brisk city hatchback with tight turning circle and effortless street parking.',
    bestFor: 'Downtown coffee runs, historic city districts, and daily errands.',
    licensePlate: 'WB 02 UB 4410',
    status: 'maintenance',
    fuelLevel: 65,
    mileage: 28300,
    depotId: 'kolkata',
    depotName: 'Kolkata (Park Street)',
    lastServiced: '2026-11-19',
    nextServiceDue: '2026-11-23'
  }
];

export const DETOUR_DEPOTS: DepotHub[] = [
  {
    id: 'mumbai',
    name: 'Mumbai (South / Bandra)',
    city: 'Mumbai',
    stateCountry: 'Maharashtra, India',
    description: 'Flagship coastal hub covering South Mumbai, Bandra Kurla Complex, and Airport.',
    address: 'Bandra Reclamation, Near Bandra-Worli Sea Link, Mumbai 400050',
    phone: '+91 22 4590 8800',
    manager: 'Rohit Kulkarni',
    totalFleet: 12,
    activeRentals: 10,
    availableVehicles: 2,
    utilizationRate: 83.3,
    badge: 'Flagship Hub'
  },
  {
    id: 'delhi',
    name: 'Delhi NCR (Connaught Place)',
    city: 'New Delhi',
    stateCountry: 'Delhi NCR, India',
    description: 'Central depot serving New Delhi, Aerocity, and Gurgaon business districts.',
    address: 'Outer Circle, Connaught Place, New Delhi 110001',
    phone: '+91 11 4120 7700',
    manager: 'Priya Sharma',
    totalFleet: 10,
    activeRentals: 9,
    availableVehicles: 1,
    utilizationRate: 90.0,
    badge: 'High Demand'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru (Indiranagar / Airport)',
    city: 'Bengaluru',
    stateCountry: 'Karnataka, India',
    description: 'Pickup depot in Indiranagar with dedicated expressway link to Kempegowda Airport.',
    address: '100 Feet Road, Indiranagar, Bengaluru 560038',
    phone: '+91 80 4390 1200',
    manager: 'Arjun Menon',
    totalFleet: 8,
    activeRentals: 7,
    availableVehicles: 1,
    utilizationRate: 87.5,
    badge: 'Express Hub'
  },
  {
    id: 'goa',
    name: 'Goa (Panaji Coastal Hub)',
    city: 'Panaji',
    stateCountry: 'Goa, India',
    description: 'Coastal pickup hub convenient for North and South Goa beach touring.',
    address: 'DB Marg, Miramar Beachfront, Panaji 403001',
    phone: '+91 832 245 9911',
    manager: 'Carlos D’Souza',
    totalFleet: 8,
    activeRentals: 8,
    availableVehicles: 0,
    utilizationRate: 100.0,
    badge: 'Sold Out'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad (Hitec City)',
    city: 'Hyderabad',
    stateCountry: 'Telangana, India',
    description: 'Tech corridor hub with swift Outer Ring Road access and Deccan route access.',
    address: 'Inorbit Mall Road, Hitec City, Hyderabad 500081',
    phone: '+91 40 4820 6600',
    manager: 'Siddharth Rao',
    totalFleet: 6,
    activeRentals: 4,
    availableVehicles: 2,
    utilizationRate: 66.7,
    badge: 'Available'
  },
  {
    id: 'jaipur',
    name: 'Jaipur (Pink City Hub)',
    city: 'Jaipur',
    stateCountry: 'Rajasthan, India',
    description: 'Gateway depot for Rajasthan desert circuits, palaces, and forts.',
    address: 'MI Road, Near Ajmeri Gate, Jaipur 302001',
    phone: '+91 141 236 4410',
    manager: 'Manish Singh',
    totalFleet: 6,
    activeRentals: 5,
    availableVehicles: 1,
    utilizationRate: 83.3,
    badge: 'Popular Route'
  },
  {
    id: 'portland-downtown',
    name: 'Portland Downtown',
    city: 'Portland',
    stateCountry: 'Oregon, USA',
    description: 'Downtown depot for Columbia River Gorge and coastal Oregon adventures.',
    address: '1020 SW Morrison St, Portland, OR 97205',
    phone: '+1 (503) 555-0144',
    manager: 'Sarah Jenkins',
    totalFleet: 8,
    activeRentals: 7,
    availableVehicles: 1,
    utilizationRate: 87.5,
    badge: 'Scenic Hub'
  }
];

export const DETOUR_BOOKINGS: RentalBooking[] = [
  {
    id: 'b-101',
    bookingRef: 'DT-8942',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@pacificdrives.com',
    customerPhone: '+1 (503) 912-3841',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    driverLicense: 'OR-DL99214A',
    vehicleId: 'roadster',
    vehicleName: 'The Roadster',
    vehicleImage: '/assets/roadster.jpg',
    vehicleCategory: 'Classic',
    licensePlate: 'GA 03 RT 2021',
    depotId: 'goa',
    depotName: 'Goa (Panaji Coastal Hub)',
    returnDepotName: 'Goa (Panaji Coastal Hub)',
    pickupDate: '2026-11-20',
    returnDate: '2026-11-24',
    days: 4,
    dailyRate: 99,
    subtotal: 396,
    serviceFee: 50,
    totalAmount: 446,
    status: 'on_road',
    scenicRoute: 'Konkan Coastline Run',
    notes: 'Requested leather driving gloves & scenic GPS package.',
    depositStatus: 'captured'
  },
  {
    id: 'b-102',
    bookingRef: 'DT-8943',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@outlook.com',
    customerPhone: '+91 98201 44510',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
    driverLicense: 'MH-0120190034',
    vehicleId: 'sprint',
    vehicleName: 'The Sprint EV',
    vehicleImage: '/assets/sprint.jpg',
    vehicleCategory: 'Electric',
    licensePlate: 'MH 02 EV 9081',
    depotId: 'mumbai',
    depotName: 'Mumbai (South / Bandra)',
    returnDepotName: 'Mumbai (South / Bandra)',
    pickupDate: '2026-11-21',
    returnDate: '2026-11-23',
    days: 2,
    dailyRate: 65,
    subtotal: 130,
    serviceFee: 16,
    totalAmount: 146,
    status: 'pickup_today',
    scenicRoute: 'South Bombay Heritage Circuit',
    notes: 'Fast charging card provided, battery topped at 100%.',
    depositStatus: 'authorized'
  },
  {
    id: 'b-103',
    bookingRef: 'DT-8944',
    customerName: 'Devraj Chauhan',
    customerEmail: 'd.chauhan@jaipurhotels.in',
    customerPhone: '+91 94140 88219',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    driverLicense: 'RJ-1420188921',
    vehicleId: 'overland',
    vehicleName: 'The Overland',
    vehicleImage: '/assets/overland.jpg',
    vehicleCategory: 'Touring 4x4',
    licensePlate: 'RJ 14 OL 4400',
    depotId: 'jaipur',
    depotName: 'Jaipur (Pink City Hub)',
    returnDepotName: 'Jaipur (Pink City Hub)',
    pickupDate: '2026-11-19',
    returnDate: '2026-11-25',
    days: 6,
    dailyRate: 115,
    subtotal: 690,
    serviceFee: 86,
    totalAmount: 776,
    status: 'on_road',
    scenicRoute: 'Rajasthan Desert Circuit',
    notes: 'Equipped with sand tracks, high-lift jack, and roof rack.',
    depositStatus: 'captured'
  },
  {
    id: 'b-104',
    bookingRef: 'DT-8945',
    customerName: 'Chloe Bennett',
    customerEmail: 'chloe.b@cascadia.org',
    customerPhone: '+1 (503) 441-9022',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    driverLicense: 'WA-DL88120X',
    vehicleId: 'touring',
    vehicleName: 'The Touring',
    vehicleImage: '/assets/touring-car.jpg',
    vehicleCategory: 'Touring Crossover',
    licensePlate: 'OR 789 TRG',
    depotId: 'portland-downtown',
    depotName: 'Portland Downtown',
    returnDepotName: 'Portland Airport',
    pickupDate: '2026-11-18',
    returnDate: '2026-11-21',
    days: 3,
    dailyRate: 75,
    subtotal: 225,
    serviceFee: 28,
    totalAmount: 253,
    status: 'return_pending',
    scenicRoute: 'Columbia River Gorge',
    notes: 'Return scheduled at Airport depot by 6:00 PM.',
    depositStatus: 'authorized'
  },
  {
    id: 'b-105',
    bookingRef: 'DT-8946',
    customerName: 'Aditya Narayan',
    customerEmail: 'aditya.n@bengalurutrips.com',
    customerPhone: '+91 99800 23145',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    driverLicense: 'KA-0520210049',
    vehicleId: 'city',
    vehicleName: 'The City',
    vehicleImage: '/assets/city-car.jpg',
    vehicleCategory: 'City Hatchback',
    licensePlate: 'KA 05 CT 3321',
    depotId: 'bengaluru',
    depotName: 'Bengaluru (Indiranagar / Airport)',
    returnDepotName: 'Bengaluru (Indiranagar / Airport)',
    pickupDate: '2026-11-20',
    returnDate: '2026-11-22',
    days: 2,
    dailyRate: 59,
    subtotal: 118,
    serviceFee: 15,
    totalAmount: 133,
    status: 'on_road',
    scenicRoute: 'Mysore Expressway Corridor',
    notes: 'Self-drive rental with Fastag auto-toll enabled.',
    depositStatus: 'captured'
  },
  {
    id: 'b-106',
    bookingRef: 'DT-8947',
    customerName: 'Maya Thorne',
    customerEmail: 'maya.thorne@vintage.co',
    customerPhone: '+1 (415) 301-8722',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
    driverLicense: 'CA-DL5519491',
    vehicleId: 'classic',
    vehicleName: 'The Classic',
    vehicleImage: '/assets/sunset.jpg',
    vehicleCategory: 'Classic',
    licensePlate: 'MH 01 DT 1974',
    depotId: 'mumbai',
    depotName: 'Mumbai (South / Bandra)',
    returnDepotName: 'Mumbai (South / Bandra)',
    pickupDate: '2026-11-22',
    returnDate: '2026-11-25',
    days: 3,
    dailyRate: 89,
    subtotal: 267,
    serviceFee: 33,
    totalAmount: 300,
    status: 'confirmed',
    scenicRoute: 'Western Ghats Sky Drive',
    notes: 'Wedding photoshoot & sunset drive to Lonavala.',
    depositStatus: 'authorized'
  }
];

export const DETOUR_SCENIC_ROUTES: ScenicDriveRoute[] = [
  {
    id: 'gorge',
    name: 'Columbia River Gorge',
    region: 'Pacific Northwest',
    distanceKm: 115,
    durationHours: '3.5 hrs',
    highlight: 'Cliffside viewpoints and cascading waterfalls above the Columbia River.',
    image: '/assets/gorge-landscape.jpg',
    recommendedCar: 'The Touring',
    stops: [
      { name: 'Portland Hub', desc: 'Pick up your rental in central Portland.' },
      { name: 'Vista House', desc: 'Take in panoramic river canyon vistas from Crown Point.' },
      { name: 'Multnomah Falls', desc: 'Iconic two-tiered waterfall with mountain mist trail.' },
      { name: 'Hood River', desc: 'Finish with a riverside promenade and fruit loop orchards.' }
    ]
  },
  {
    id: 'coast',
    name: 'North Oregon Coast',
    region: 'Pacific Northwest',
    distanceKm: 142,
    durationHours: '4.0 hrs',
    highlight: 'Dramatic sea stacks, sandy dunes, and misty pine forest shoreline.',
    image: '/assets/coast-landscape.jpg',
    recommendedCar: 'The Roadster',
    stops: [
      { name: 'Portland Hub', desc: 'Depart early through the Coast Mountain Range.' },
      { name: 'Cannon Beach', desc: 'Iconic 235-foot Haystack Rock and tide pools.' },
      { name: 'Manzanita', desc: 'Idyllic coastal village with expansive ocean breezes.' }
    ]
  },
  {
    id: 'hood',
    name: 'Mount Hood Loop',
    region: 'Pacific Northwest',
    distanceKm: 168,
    durationHours: '4.5 hrs',
    highlight: 'Glacial volcanic summit reflected in alpine mountain lakes.',
    image: '/assets/hood-landscape.jpg',
    recommendedCar: 'The Overland',
    stops: [
      { name: 'Portland Hub', desc: 'Climb east into the Mount Hood National Forest.' },
      { name: 'Government Camp', desc: 'Historic alpine village at the mountain pass.' },
      { name: 'Trillium Lake', desc: 'Mirror reflection of Mount Hood on clear mornings.' }
    ]
  },
  {
    id: 'western-ghats',
    name: 'Western Ghats Sky Drive',
    region: 'Maharashtra',
    distanceKm: 185,
    durationHours: '4.5 hrs',
    highlight: 'Lush mountain cliffs, winding switchbacks, and waterfall valleys.',
    image: '/assets/sunset.jpg',
    recommendedCar: 'The Classic',
    stops: [
      { name: 'Mumbai Hub', desc: 'Cruise via the Mumbai-Pune Expressway.' },
      { name: 'Tiger Point Khandala', desc: 'Epic cliffside overlooks and misty gorges.' },
      { name: 'Pawna Lake', desc: 'Tranquil shoreline ringed by Sahyadri peaks.' }
    ]
  },
  {
    id: 'konkan-coast',
    name: 'Konkan Coastal Run',
    region: 'Goa & Konkan',
    distanceKm: 210,
    durationHours: '5.0 hrs',
    highlight: 'Coconut groves, Portuguese heritage forts, and secluded beaches.',
    image: '/assets/coast-landscape.jpg',
    recommendedCar: 'The Roadster',
    stops: [
      { name: 'Panaji Hub', desc: 'Begin along the Mandovi riverfront.' },
      { name: 'Aguada Fort', desc: '17th-century lighthouse and Arabian Sea ramparts.' },
      { name: 'Morjim & Ashwem', desc: 'Golden sands and open-air sunset cafes.' }
    ]
  }
];
