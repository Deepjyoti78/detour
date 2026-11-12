(() => {
  const { cars, locations, getTrip, validTrip, quote, formatDate, money, getDrive, available, nearbyTrip } = window.Detour;
  const trip = getTrip();
  const activeTrip = validTrip(trip) ? trip : null;
  const strip = document.querySelector('#catalog-trip');
  const grid = document.querySelector('#catalog-grid');
  const detail = document.querySelector('#vehicle-detail-content');
  const compareChoices = document.querySelector('#compare-choices');

  if (strip && activeTrip) {
    const branch = locations.find(({ id }) => id === activeTrip.location);
    const drive = getDrive?.(activeTrip.drive);
    strip.innerHTML = `<div><span><strong>${branch.name}</strong> · ${formatDate(activeTrip.pickup)} to ${formatDate(activeTrip.return)}</span>${drive ? `<span class="trip-strip-drive">Scenic drive · ${drive.name}</span>` : ''}</div><a href="index.html#trip-planner">Edit trip</a>`;
    strip.hidden = false;
  }

  function photo(car) {
    return car.id === 'classic'
      ? `<div class="catalog-photo catalog-photo--classic" role="img" aria-label="${car.alt}"></div>`
      : `<img class="catalog-photo" src="${car.image}" alt="${car.alt}">`;
  }

  function specs(car) {
    return `<ul class="catalog-specs"><li>${car.seats} seats</li><li>${car.transmission}</li></ul>`;
  }

  function estimatedTotal(car) {
    const estimate = quote(car, activeTrip);
    return estimate && available(car, activeTrip) ? `<p class="catalog-total">${money(estimate.total)} estimated total · ${estimate.days} ${estimate.days === 1 ? 'day' : 'days'}</p>` : '';
  }

  function availabilityNote(car) {
    if (!activeTrip) return '';
    return available(car, activeTrip)
      ? '<p class="catalog-availability">Available · demo</p>'
      : '<p class="catalog-availability catalog-unavailable">Unavailable on your pick-up date · demo</p>';
  }

  function bookingLink(car) {
    if (activeTrip && !available(car, activeTrip)) {
      const later = nearbyTrip(car, activeTrip);
      if (!later) return '<a class="catalog-action" href="index.html#trip-planner">Change rental dates</a>';
      const dates = new URLSearchParams({ car: car.id, pickup: later.pickup, return: later.return });
      return `<a class="catalog-action" href="booking.html?${dates.toString().replaceAll('&', '&amp;')}">Try ${formatDate(later.pickup)} <span aria-hidden="true">→</span></a>`;
    }
    return `<a class="catalog-action" href="booking.html?car=${car.id}">${activeTrip ? 'Continue to booking' : 'Choose dates and book'} <span aria-hidden="true">→</span></a>`;
  }

  if (grid) {
    grid.innerHTML = cars.map((car) => `<article class="catalog-card" data-transmission="${car.transmission.toLowerCase()}">
      ${photo(car)}
      <div class="catalog-card-content">
        <div class="catalog-model-rate"><h2>${car.name}</h2><p><strong>${money(car.rate)}</strong> / day</p></div>
        ${specs(car)}${availabilityNote(car)}${estimatedTotal(car)}
        <a class="catalog-action" href="car.html?id=${car.id}" aria-label="View ${car.name} details">View car <span aria-hidden="true">→</span></a>
      </div>
    </article>`).join('');

    const options = [...document.querySelectorAll('[data-filter]')];
    const count = document.querySelector('#catalog-count');
    function filter(selected) {
      options.forEach((button) => button.setAttribute('aria-pressed', String(button === selected)));
      const cards = [...grid.children];
      for (const card of cards) {
        card.hidden = selected.dataset.filter !== 'all' && card.dataset.transmission !== selected.dataset.filter;
      }
      const visible = cards.filter((card) => !card.hidden).length;
      count.textContent = `${visible} ${visible === 1 ? 'car' : 'cars'}`;
    }
    options.forEach((button) => button.addEventListener('click', () => filter(button)));
    filter(options[0]);
  }

  if (detail) {
    const requested = new URLSearchParams(location.search).get('id');
    const car = cars.find(({ id }) => id === requested);
    if (!car) {
      detail.innerHTML = '<h1>CAR NOT FOUND.</h1><p><a href="fleet.html">See the fleet</a> to choose a car.</p>';
      return;
    }
    document.title = `${car.name} | Detour Car Rental`;
    detail.innerHTML = `<div class="vehicle-layout">
      <figure>${photo(car)}<figcaption>${car.name} · Illustrative fleet</figcaption></figure>
      <section class="vehicle-details">
        <h1>${car.name.toUpperCase()}.</h1><p class="vehicle-copy">${car.description}</p>
        ${specs(car)}${availabilityNote(car)}
        <div class="vehicle-fit"><h2>Good for</h2><p>${car.bestFor}</p><p>Sample luggage capacity · ${car.luggage} ${car.luggage === 1 ? 'bag' : 'bags'}</p></div>
        <div class="vehicle-pricing"><p><strong>${money(car.rate)}</strong> <span>per day</span></p>${estimatedTotal(car)}</div>
        ${bookingLink(car)}
        ${activeTrip && !available(car, activeTrip) ? '<a class="compare-link vehicle-compare" href="fleet.html#catalog-grid">See other cars for these dates</a>' : ''}
        <a class="compare-link vehicle-compare" href="compare.html?cars=${car.id}">Compare this car <span aria-hidden="true">→</span></a>
      </section>
    </div>
    <section class="vehicle-gallery" aria-labelledby="gallery-heading">
      <div class="catalog-intro"><h2 id="gallery-heading">A CLOSER LOOK.</h2><p>Illustrative cabin and luggage views.</p></div>
      <div class="vehicle-gallery-grid" data-car="${car.id}">
        <figure><div class="vehicle-gallery-photo" role="img" aria-label="Illustrative cabin of ${car.name}"></div><figcaption>Cabin · ${car.seats} seats</figcaption></figure>
        <figure><div class="vehicle-gallery-photo vehicle-gallery-photo--luggage" role="img" aria-label="Illustrative luggage area of ${car.name} with ${car.luggage} ${car.luggage === 1 ? 'bag' : 'bags'}"></div><figcaption>Luggage area · ${car.luggage} ${car.luggage === 1 ? 'bag' : 'bags'}</figcaption></figure>
      </div>
    </section>`;
  }

  if (compareChoices) {
    const requested = (new URLSearchParams(location.search).get('cars') || '').split(',');
    const initial = cars.filter(({ id }) => requested.includes(id));
    if (initial.length === 1) initial.push(cars.find(({ id }) => id !== initial[0].id));
    const selectedIds = new Set((initial.length ? initial : cars).map(({ id }) => id));
    const results = document.querySelector('#compare-results');
    const status = document.querySelector('#compare-selection-status');
    document.querySelector('#compare-no-trip').hidden = Boolean(activeTrip);

    compareChoices.innerHTML = cars.map((car) => `<label class="compare-option">
      <input type="checkbox" value="${car.id}"${selectedIds.has(car.id) ? ' checked' : ''}>
      <span>${car.name}</span>
    </label>`).join('');

    const rows = [
      ['Seats', (car) => `${car.seats}`],
      ['Luggage', (car) => `${car.luggage} ${car.luggage === 1 ? 'bag' : 'bags'}`],
      ['Transmission', (car) => car.transmission],
      ['Daily rate', (car) => money(car.rate)],
      ['Availability', (car) => activeTrip ? (available(car, activeTrip) ? 'Available · demo' : 'Unavailable · demo') : 'Choose dates'],
      ['Estimated trip total', (car) => {
        const estimate = quote(car, activeTrip);
        return estimate && available(car, activeTrip) ? money(estimate.total) : '—';
      }]
    ];

    function renderComparison() {
      const selected = cars.filter(({ id }) => compareChoices.querySelector(`[value="${id}"]`).checked);
      if (selected.length < 2) {
        status.textContent = 'Choose at least two cars to see the comparison.';
        results.replaceChildren();
        return;
      }

      status.textContent = `Comparing ${selected.length} cars`;
      results.innerHTML = `<p class="compare-scroll-hint">Swipe or scroll sideways to see every car.</p>
        <div class="compare-table-region" role="region" tabindex="0" aria-label="Car comparison table">
          <table class="compare-table" data-count="${selected.length}">
            <thead><tr><th scope="col">Feature</th>${selected.map((car) => `<th scope="col"><div aria-hidden="true">${photo(car)}</div><span>${car.name}</span></th>`).join('')}</tr></thead>
            <tbody>${rows.map(([label, value]) => `<tr><th scope="row">${label}</th>${selected.map((car) => `<td>${value(car)}</td>`).join('')}</tr>`).join('')}
              <tr class="compare-actions"><th scope="row">Book</th>${selected.map((car) => `<td>${bookingLink(car)}</td>`).join('')}</tr>
            </tbody>
          </table>
        </div>
        <p class="compare-footnote">Luggage capacity and rates are illustrative. Trip estimates include sample taxes and fees.</p>`;
    }

    compareChoices.addEventListener('change', renderComparison);
    renderComparison();
  }
})();
