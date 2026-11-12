(() => {
  const { cars, locations, defaultTrip, getTrip, saveTrip, validTrip, nextDate, today, money, getDrive } = window.Detour;
  const form = document.querySelector('#rental-form');
  const locationField = document.querySelector('#pickup-location');
  const pickup = document.querySelector('#pickup-date');
  const returned = document.querySelector('#return-date');
  const error = document.querySelector('#trip-error');
  const params = new URLSearchParams(location.search);
  const requestedLocation = params.get('location');
  const savedTrip = getTrip();
  const trip = validTrip(savedTrip) ? savedTrip : defaultTrip();
  const driveSummary = document.querySelector('#planner-drive');
  let drive = getDrive(params.get('drive')) ?? getDrive(savedTrip?.drive);

  if (drive) {
    document.querySelector('#planner-drive-name').textContent = drive.name;
    driveSummary.hidden = false;
  }
  document.querySelector('#remove-drive').addEventListener('click', () => {
    drive = undefined;
    driveSummary.hidden = true;
    locationField.focus();
  });

  locationField.replaceChildren(...locations.map(({ id, name }) => new Option(name, id)));
  locationField.value = locations.some(({ id }) => id === requestedLocation) ? requestedLocation : trip.location;
  pickup.min = today();
  pickup.value = trip.pickup;
  returned.value = trip.return;
  returned.min = nextDate(trip.pickup);
  pickup.addEventListener('change', () => {
    returned.min = nextDate(pickup.value);
    if (returned.min && returned.value < returned.min) returned.value = returned.min;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    error.hidden = true;
    const selectedTrip = { location: locationField.value, pickup: pickup.value, return: returned.value };
    if (drive) selectedTrip.drive = drive.id;
    if (!validTrip(selectedTrip)) {
      returned.min = nextDate(pickup.value);
      form.reportValidity();
      return;
    }
    try {
      saveTrip(selectedTrip);
      location.href = 'fleet.html';
    } catch {
      error.textContent = 'The demo could not save your trip. Allow local storage in your browser and try again.';
      error.hidden = false;
    }
  });

  document.querySelector('[data-preview-fleet]').innerHTML = cars.map((car) => `
    <a class="vehicle-card" href="car.html?id=${car.id}">
      ${car.id === 'classic' ? `<div class="classic-frame" role="img" aria-label="${car.alt}"></div>` : `<img class="vehicle-image" src="${car.image}" alt="${car.alt}" loading="lazy">`}
      <div class="vehicle-meta"><div><h3>${car.name}</h3><p>${car.seats} seats · ${car.transmission}</p></div><p class="rate"><strong>${money(car.rate)}</strong> / day</p></div>
    </a>
  `).join('');
})();
