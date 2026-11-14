import { Car, LocationDepot, ScenicDrive } from '@/types';

export const CARS: Car[] = [
  // Classic Category
  {
    id: 'classic',
    name: 'The Classic',
    category: 'classic',
    rate: 89,
    seats: 4,
    luggage: 2,
    closedDay: 3, // Wednesday
    transmission: 'Manual',
    image: '/assets/sunset.jpg',
    alt: 'Red classic car parked by a field at sunset',
    description: 'A red classic for a drive with time to spare.',
    bestFor: 'Slow scenic drives and weekends with a couple of soft-sided bags.',
  },
  {
    id: 'roadster',
    name: 'The Roadster',
    category: 'classic',
    rate: 99,
    seats: 2,
    luggage: 1,
    closedDay: 2, // Tuesday
    transmission: 'Manual',
    image: '/assets/roadster.jpg',
    alt: 'Vintage roadster with open-top cockpit',
    description: 'Pure vintage open-air motoring for winding backroads and coastal cliffs.',
    bestFor: 'Romantic weekend getaways, coastal highways, and sunset ridge drives.',
  },
  {
    id: 'cabriolet',
    name: 'The Cabriolet',
    category: 'classic',
    rate: 95,
    seats: 4,
    luggage: 2,
    closedDay: 4, // Thursday
    transmission: 'Manual',
    image: '/assets/cabriolet.jpg',
    alt: 'Classic drop-top touring cabriolet',
    description: 'Timeless drop-top silhouette with effortless cruiser charm and chrome accents.',
    bestFor: 'Sunny summer road trips and heritage routes with friends.',
  },
  // City Category
  {
    id: 'city',
    name: 'The City',
    category: 'city',
    rate: 59,
    seats: 4,
    luggage: 1,
    closedDay: 5, // Friday
    transmission: 'Automatic',
    image: '/assets/city-car.jpg',
    alt: 'Sage green compact hatchback',
    description: 'A compact hatchback for getting around town.',
    bestFor: 'City errands, short trips, and light packing for two.',
  },
  {
    id: 'metro',
    name: 'The Metro',
    category: 'city',
    rate: 52,
    seats: 4,
    luggage: 2,
    closedDay: 1, // Monday
    transmission: 'Automatic',
    image: '/assets/metro.jpg',
    alt: 'Nimble modern urban runabout',
    description: 'Ultra-nimble city cruiser designed for tight parking and narrow streets.',
    bestFor: 'Navigating bustling downtown streets, metro hops, and weekend market runs.',
  },
  {
    id: 'sprint',
    name: 'The Sprint EV',
    category: 'city',
    rate: 65,
    seats: 5,
    luggage: 2,
    closedDay: 0, // Sunday
    transmission: 'Automatic',
    image: '/assets/sprint.jpg',
    alt: 'Modern agile electric city hatchback',
    description: 'Quiet, zero-emission urban sprint with instant electric torque.',
    bestFor: 'Eco-friendly daily commutes, city hopping, and smooth quiet drives.',
  },
  {
    id: 'urbanist',
    name: 'The Urbanist',
    category: 'city',
    rate: 55,
    seats: 4,
    luggage: 2,
    closedDay: 2, // Tuesday
    transmission: 'Manual',
    image: '/assets/metro.jpg',
    alt: 'Retro-styled nimble city runabout',
    description: 'Brisk city hatchback with tight turning circle and effortless street parking.',
    bestFor: 'Downtown coffee runs, historic city districts, and daily errands.',
  },
  // Touring Category
  {
    id: 'touring',
    name: 'The Touring',
    category: 'touring',
    rate: 75,
    seats: 5,
    luggage: 3,
    closedDay: 2, // Tuesday
    transmission: 'Automatic',
    image: '/assets/touring-car.jpg',
    alt: 'Slate blue touring crossover',
    description: 'A five-seat crossover for longer drives.',
    bestFor: 'Longer coastal or mountain drives with friends and extra bags.',
  },
  {
    id: 'overland',
    name: 'The Overland',
    category: 'touring',
    rate: 115,
    seats: 5,
    luggage: 4,
    closedDay: 4, // Thursday
    transmission: 'Automatic',
    image: '/assets/overland.jpg',
    alt: 'Rugged all-terrain 4x4 expedition vehicle',
    description: 'High-clearance expedition 4x4 engineered for mountain passes and wild trails.',
    bestFor: 'Ghat climbs, national park expeditions, and backcountry adventures.',
  },
  {
    id: 'grand-tourer',
    name: 'The Grand Tourer',
    category: 'touring',
    rate: 105,
    seats: 5,
    luggage: 4,
    closedDay: 3, // Wednesday
    transmission: 'Automatic',
    image: '/assets/grand-tourer.jpg',
    alt: 'Sleek luxury touring estate wagon',
    description: 'Smooth cross-country performance with expansive cargo volume.',
    bestFor: 'Multi-day state highway touring and family luggage.',
  },
];

export const LOCATIONS: LocationDepot[] = [
  {
    id: 'mumbai',
    name: 'Mumbai (South / Bandra)',
    description: 'Central hub covering South Mumbai, Bandra Kurla Complex, and Airport.',
  },
  {
    id: 'delhi',
    name: 'Delhi NCR (Connaught Place)',
    description: 'Central depot serving New Delhi, Aerocity, and Gurgaon business districts.',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru (Indiranagar / Airport)',
    description: 'Pickup depot in Indiranagar with dedicated expressway link to Kempegowda Airport.',
  },
  {
    id: 'goa',
    name: 'Goa (Panaji Coastal Hub)',
    description: 'Coastal pickup hub convenient for North and South Goa beach touring.',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad (Hitec City)',
    description: 'Tech corridor hub with swift Outer Ring Road access.',
  },
  {
    id: 'kolkata',
    name: 'Kolkata (Park Street)',
    description: 'City center depot close to heritage landmarks and Eastern Metropolitan Bypass.',
  },
  {
    id: 'jaipur',
    name: 'Jaipur (Pink City Hub)',
    description: 'Gateway depot for Rajasthan desert circuits and heritage palace drives.',
  },
];

export const SCENIC_DRIVES: ScenicDrive[] = [
  {
    id: 'gorge',
    name: 'Columbia River Gorge',
    category: 'waterfalls',
    intro: 'Follow the river east from Portland, past cliffside viewpoints and waterfalls.',
    image: '/assets/gorge-landscape.jpg',
    alt: 'Illustration of evergreen bluffs above the Columbia River',
    stops: [
      ['Portland', 'Pick up your rental in the city.'],
      ['Vista House', 'Take in the river from Crown Point.'],
      ['Multnomah Falls', 'See the two-tiered waterfall.'],
      ['Hood River', 'Finish with a walk along the waterfront.'],
    ],
  },
  {
    id: 'coast',
    name: 'North Oregon Coast',
    category: 'coast',
    intro: 'Head west from Portland for sea stacks, wide beaches, and small coastal towns.',
    image: '/assets/coast-landscape.jpg',
    alt: 'Illustration of a sea stack off Cannon Beach',
    stops: [
      ['Portland', 'Pick up your rental in the city.'],
      ['Cannon Beach', 'Look for Haystack Rock along the shore.'],
      ['Manzanita', 'Finish with a stroll along the beach.'],
    ],
  },
  {
    id: 'hood',
    name: 'Mount Hood',
    category: 'mountains',
    intro: 'Drive from Portland toward Mount Hood for forest roads, mountain views, and a lakeside stop.',
    image: '/assets/hood-landscape.jpg',
    alt: 'Illustration of Mount Hood reflected in Trillium Lake',
    stops: [
      ['Portland', 'Pick up your rental in the city.'],
      ['Government Camp', 'Pause in the mountain village.'],
      ['Trillium Lake', 'Look for Mount Hood reflected in the lake on a clear day.'],
    ],
  },
];

export const PICKUP_CHECKLIST = [
  'Save your booking reference and pick-up date.',
  'Check which licence, ID, and payment card the operator requires.',
  'Ask where to return the car and how to report its condition.',
];

export const PICKUP_GUIDES_DATA: Record<string, {
  intro: string;
  map: string[];
  directions: [string, string][];
}> = {
  mumbai: {
    intro: 'Use the Mumbai depot for scenic Western Ghats and coastal Konkan self-drives.',
    map: ['Bandra Hub', 'Meeting point', 'Car collection'],
    directions: [
      ['Reach South/Bandra Depot', 'Conveniently connected via the Sea Link and Western Express Highway.'],
      ['Verify documents', 'Have your driving license and booking reference ready for instant pickup.'],
      ['Vehicle handover', 'Walk through the pre-drive checklist with your depot concierge and set off.'],
    ],
  },
  delhi: {
    intro: 'Use the Delhi NCR depot for heritage Rajasthan road trips and Himalayan weekend escapes.',
    map: ['Connaught Place', 'Ground transport', 'Car collection'],
    directions: [
      ['Arrive at CP Central Depot', 'Easily accessible via Rajiv Chowk or airport express link.'],
      ['Check documentation', 'Complete swift digital ID check at the lounge desk.'],
      ['Collect vehicle keys', 'Inspect your car and head toward the expressway.'],
    ],
  },
  bengaluru: {
    intro: 'Start your journey from Bengaluru toward Coorg, Ooty, or the Western Ghats.',
    map: ['Indiranagar Hub', 'Key handoff', 'Expressway exit'],
    directions: [
      ['Reach Indiranagar Depot', 'Located right on 100 Feet Road with valet access.'],
      ['Pickup verification', 'Complete fast smartphone confirmation with depot staff.'],
      ['Hit the highway', 'Direct access to Bangalore-Mysore Expressway and NH44.'],
    ],
  },
  goa: {
    intro: 'Pick up your rental in Goa for sun-drenched coastal cruising and spice plantation tours.',
    map: ['Panaji Waterfront', 'Vehicle bay', 'Coast highway'],
    directions: [
      ['Reach Panaji Coastal Depot', 'Located by the Mandovi riverfront promenade.'],
      ['Digital check-in', 'Sign digital agreement on your device.'],
      ['Start your beach drive', 'Cruise toward North or South Goa with unlimited scenic mileage.'],
    ],
  },
  hyderabad: {
    intro: 'Depart from Hyderabad toward historical forts, Nagarjuna Sagar, and Deccan drives.',
    map: ['Hitec City', 'Collection point', 'Ring Road'],
    directions: [
      ['Reach Hitec City Depot', 'Close to Cyber Towers and Outer Ring Road entrance.'],
      ['Document verification', 'Show your booking QR code at the desk.'],
      ['Start driving', 'Fast track access onto the Hyderabad ORR.'],
    ],
  },
  kolkata: {
    intro: 'City center collection depot for cultural city tours and drives to the Sunderbans or Digha.',
    map: ['Park Street', 'Depot lounge', 'EM Bypass link'],
    directions: [
      ['Arrive at Park Street Hub', 'Prime location in central Kolkata.'],
      ['Quick verification', 'Confirm your reservation and driver details.'],
      ['Drive away', 'Connect easily to Maa Flyover and Vidyasagar Setu.'],
    ],
  },
  jaipur: {
    intro: 'Gateway hub for exploring Jaipur palaces, Ranthambore, and desert forts.',
    map: ['Pink City Hub', 'Vehicle bay', 'Delhi-Jaipur Highway'],
    directions: [
      ['Reach Pink City Depot', 'Conveniently situated near MI Road.'],
      ['Check in', 'Complete security verification and handover.'],
      ['Begin your royal drive', 'Set off toward Amber Fort and scenic Rajasthan routes.'],
    ],
  },
  'portland-downtown': {
    intro: 'Use the downtown option for a rental starting in central Portland.',
    map: ['Downtown area', 'Meeting point', 'Car collection'],
    directions: [
      ['Travel into central Portland', 'Use your preferred transit or driving route into the downtown area.'],
      ['Check the meeting point', 'Use the address and entrance instructions from your rental operator.'],
      ['Check in for collection', 'Have your reference and the operator’s required documents ready.'],
    ],
  },
  'portland-airport': {
    intro: 'Use the airport option when your rental starts near Portland International Airport.',
    map: ['Airport terminal', 'Ground transport', 'Car collection'],
    directions: [
      ['Start at the terminal', 'From arrivals, follow the airport’s posted ground transportation information.'],
      ['Confirm where to collect the car', 'Ask your rental operator which meeting point to use and whether transport is needed.'],
      ['Check in for collection', 'Have your reference and the operator’s required documents ready.'],
    ],
  },
};
