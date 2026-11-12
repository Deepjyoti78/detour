(() => {
  const { locations, getBooking, getTrip, formatDate, pickupChecklist } = window.Detour;
  const guides = new Map([
    ['portland-downtown', {
      intro: 'Use the downtown option for a rental starting in central Portland.',
      map: ['Downtown area', 'Meeting point', 'Car collection'],
      directions: [
        ['Travel into central Portland', 'Use your preferred transit or driving route into the downtown area.'],
        ['Check the meeting point', 'Use the address and entrance instructions from your rental operator.'],
        ['Check in for collection', 'Have your reference and the operator’s required documents ready.']
      ]
    }],
    ['portland-airport', {
      intro: 'Use the airport option when your rental starts near Portland International Airport.',
      map: ['Airport terminal', 'Ground transport', 'Car collection'],
      directions: [
        ['Start at the terminal', 'From arrivals, follow the airport’s posted ground transportation information.'],
        ['Confirm where to collect the car', 'Ask your rental operator which meeting point to use and whether transport is needed.'],
        ['Check in for collection', 'Have your reference and the operator’s required documents ready.']
      ]
    }]
  ]);

  const booking = getBooking();
  const confirmed = booking?.status === 'confirmed' ? booking : null;
  const requested = new URLSearchParams(window.location.search).get('location');
  const locationId = [requested, confirmed?.trip?.location, getTrip()?.location, 'portland-downtown']
    .find((id) => guides.has(id));
  const branch = locations.find(({ id }) => id === locationId);
  const guide = guides.get(locationId);

  document.title = `${branch.name} pick-up guide | Detour Car Rental`;
  document.querySelector('[data-guide-name]').textContent = branch.name;
  document.querySelector('[data-guide-intro]').textContent = guide.intro;
  document.querySelector('[data-guide-map]').dataset.layout = locationId;
  document.querySelector('[data-guide-map-caption]').textContent = branch.name;

  const locationLinks = locations.map(({ id, name }) => {
    const link = document.createElement('a');
    link.href = `pickup-guide.html?location=${encodeURIComponent(id)}`;
    link.textContent = name;
    if (id === locationId) link.setAttribute('aria-current', 'page');
    return link;
  });
  document.querySelector('[data-guide-locations]').replaceChildren(...locationLinks);

  const markers = guide.map.map((name, index) => {
    const step = document.createElement('li');
    const marker = document.createElement('span');
    marker.className = 'pickup-map-marker';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = index + 1;
    const label = document.createElement('strong');
    label.textContent = name;
    step.append(marker, label);
    return step;
  });
  document.querySelector('[data-guide-map-route]').replaceChildren(...markers);

  const directions = guide.directions.map(([name, description]) => {
    const step = document.createElement('li');
    const heading = document.createElement('strong');
    const body = document.createElement('p');
    heading.textContent = name;
    body.textContent = description;
    step.append(heading, body);
    return step;
  });
  document.querySelector('[data-guide-directions]').replaceChildren(...directions);
  for (const item of pickupChecklist) {
    const step = document.createElement('li');
    step.textContent = item;
    document.querySelector('.pickup-checklist').append(step);
  }

  const action = document.querySelector('[data-guide-action]');
  action.href = `index.html?location=${encodeURIComponent(locationId)}#trip-planner`;
  if (confirmed?.trip?.location === locationId) {
    document.querySelector('[data-guide-reference]').textContent = confirmed.reference;
    document.querySelector('[data-guide-date]').textContent = formatDate(confirmed.trip.pickup);
    document.querySelector('[data-guide-reservation]').hidden = false;
    action.href = 'my-booking.html';
    action.firstChild.textContent = 'View my booking ';
  }
})();
