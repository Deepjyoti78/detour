(() => {
  const cars = [
    { id: 'classic', name: 'The Classic', rate: 89, seats: 4, luggage: 2, closedDay: 3, transmission: 'Manual', image: 'assets/sunset.jpg', alt: 'Red classic car parked by a field at sunset', description: 'A red classic for a drive with time to spare.', bestFor: 'Slow scenic drives and weekends with a couple of soft-sided bags.' },
    { id: 'city', name: 'The City', rate: 59, seats: 4, luggage: 1, closedDay: 5, transmission: 'Automatic', image: 'assets/city-car.jpg', alt: 'Sage green compact hatchback', description: 'A compact hatchback for getting around town.', bestFor: 'City errands, short trips, and light packing for two.' },
    { id: 'touring', name: 'The Touring', rate: 75, seats: 5, luggage: 3, closedDay: 2, transmission: 'Automatic', image: 'assets/touring-car.jpg', alt: 'Slate blue touring crossover', description: 'A five-seat crossover for longer drives.', bestFor: 'Longer coastal or mountain drives with friends and extra bags.' }
  ];

  const locations = [
    { id: 'portland-downtown', name: 'Portland Downtown', description: 'Sample city pick-up location.' },
    { id: 'portland-airport', name: 'Portland Airport', description: 'Sample airport pick-up location.' }
  ];

  const drives = [
    { id: 'gorge', name: 'Columbia River Gorge', stops: ['Portland', 'Vista House', 'Multnomah Falls', 'Hood River'] },
    { id: 'coast', name: 'North Oregon Coast', stops: ['Portland', 'Cannon Beach', 'Manzanita'] },
    { id: 'hood', name: 'Mount Hood', stops: ['Portland', 'Government Camp', 'Trillium Lake'] }
  ];
  const pickupChecklist = [
    'Save your booking reference and pick-up date.',
    'Check which licence, ID, and payment card the operator requires.',
    'Ask where to return the car and how to report its condition.'
  ];

  const oneDay = 86_400_000;
  const keyPrefix = 'detour-rental-demo.v1.';
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(keyPrefix + key));
    } catch {
      return null;
    }
  }

  function write(key, value) {
    localStorage.setItem(keyPrefix + key, JSON.stringify(value));
    return value;
  }

  function localDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function dateTime(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
    const timestamp = Date.parse(`${value}T00:00:00Z`);
    return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value ? timestamp : NaN;
  }

  function nextDate(value) {
    const time = dateTime(value);
    return Number.isFinite(time) ? new Date(time + oneDay).toISOString().slice(0, 10) : '';
  }

  function defaultTrip() {
    const pickup = new Date();
    pickup.setDate(pickup.getDate() + (5 - pickup.getDay() + 7) % 7);
    const returned = new Date(pickup);
    returned.setDate(returned.getDate() + 2);
    return { location: locations[0].id, pickup: localDate(pickup), return: localDate(returned) };
  }

  function validTrip(trip) {
    return Boolean(trip && locations.some(({ id }) => id === trip.location)
      && dateTime(trip.pickup) >= dateTime(localDate(new Date()))
      && dateTime(trip.return) > dateTime(trip.pickup));
  }

  function quote(car, trip) {
    if (!car || !validTrip(trip)) return null;
    const days = (dateTime(trip.return) - dateTime(trip.pickup)) / oneDay;
    const subtotal = days * car.rate;
    const fees = Math.round(subtotal * 0.125);
    return { days, subtotal, fees, total: subtotal + fees };
  }

  function available(car, trip) {
    return Boolean(car && validTrip(trip) && new Date(dateTime(trip.pickup)).getUTCDay() !== car.closedDay);
  }

  function nearbyTrip(car, trip) {
    if (!car || !validTrip(trip)) return null;
    const later = { ...trip, pickup: nextDate(trip.pickup), return: nextDate(trip.return) };
    return available(car, later) ? later : null;
  }

  window.Detour = {
    cars, locations, pickupChecklist, defaultTrip, nextDate, validTrip, quote, available, nearbyTrip,
    getDrive: (driveId) => drives.find(({ id }) => id === driveId),
    today: () => localDate(new Date()),
    money: (number) => currency.format(number),
    formatDate: (iso) => Number.isFinite(dateTime(iso)) ? dateFormat.format(dateTime(iso)) : '—',
    getTrip: () => read('trip'), saveTrip: (trip) => write('trip', trip),
    getBooking: () => read('booking'), saveBooking: (booking) => write('booking', booking),
    getUser: () => read('profile'), saveUser: (user) => write('profile', user), clearUser: () => write('profile', null)
  };

  const mark = `<svg viewBox="0 0 46 35" fill="none" aria-hidden="true"><path d="M4 32V17C4 12.6 7.6 9 12 9H40M32 2L41 9L32 16M13 32V21C13 18.8 14.8 17 17 17H26" stroke="currentColor" stroke-width="4" stroke-linejoin="miter"/></svg>`;
  const brand = `<a class="site-brand" href="index.html" aria-label="Detour home">${mark}DETOUR</a>`;
  const current = location.pathname.split('/').pop() || 'index.html';
  const groups = [
    ['Explore', 'explore.html', ['explore.html', 'route.html']],
    ['Fleet', 'fleet.html', ['fleet.html', 'car.html', 'compare.html']],
    ['Locations', 'locations.html', ['locations.html', 'pickup-guide.html']],
    ['My booking', 'my-booking.html', ['my-booking.html']]
  ];
  const navigation = groups.map(([label, path, activePages]) => `<a href="${path}"${activePages.includes(current) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const profile = read('profile');
  const account = profile ? '<button class="account-link" type="button" data-sign-out>Sign out</button>'
    : `<a class="account-link" href="sign-in.html"${['sign-in.html', 'sign-up.html'].includes(current) ? ' aria-current="page"' : ''}>Sign in <span aria-hidden="true">↗</span></a>`;

  for (const header of document.querySelectorAll('[data-site-header]')) {
    header.innerHTML = `<div class="site-header-inner">${brand}<nav class="site-navigation" aria-label="Main navigation">${navigation}${account}</nav></div>`;
  }

  for (const footer of document.querySelectorAll('[data-site-footer]')) {
    const faq = `<a href="faq.html"${current === 'faq.html' ? ' aria-current="page"' : ''}>Rental FAQ</a>`;
    footer.innerHTML = `<div class="site-footer-inner">${brand}<nav class="site-footer-navigation" aria-label="Footer navigation">${navigation}${faq}</nav><span>Local rental demo</span></div>`;
  }

  for (const signOut of document.querySelectorAll('[data-sign-out]')) {
    signOut.addEventListener('click', () => {
      window.Detour.clearUser();
      location.href = 'sign-in.html';
    });
  }
})();
