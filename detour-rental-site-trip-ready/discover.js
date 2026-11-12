(() => {
  const start = ['Portland', 'Pick up your rental in the city.'];
  const drives = new Map([
    ['gorge', {
      title: 'Columbia River Gorge',
      intro: 'Follow the river east from Portland, past cliffside viewpoints and waterfalls.',
      image: 'assets/gorge-landscape.jpg',
      alt: 'Illustration of the Columbia River winding between forested cliffs',
      stops: [
        start,
        ['Vista House', 'Take in the river from Crown Point.'],
        ['Multnomah Falls', 'See the two-tiered waterfall.'],
        ['Hood River', 'Finish with a walk along the waterfront.']
      ]
    }],
    ['coast', {
      title: 'North Oregon Coast',
      intro: 'Head west from Portland for sea stacks, wide beaches, and small coastal towns.',
      image: 'assets/coast-landscape.jpg',
      alt: 'Illustration of a sea stack off Cannon Beach',
      stops: [
        start,
        ['Cannon Beach', 'Look for Haystack Rock along the shore.'],
        ['Manzanita', 'Finish with a stroll along the beach.']
      ]
    }],
    ['hood', {
      title: 'Mount Hood',
      intro: 'Drive from Portland toward Mount Hood for forest roads, mountain views, and a lakeside stop.',
      image: 'assets/hood-landscape.jpg',
      alt: 'Illustration of Mount Hood reflected in Trillium Lake',
      stops: [
        start,
        ['Government Camp', 'Pause in the mountain village.'],
        ['Trillium Lake', 'Look for Mount Hood reflected in the lake on a clear day.']
      ]
    }]
  ]);

  function makeStop(name, index, description) {
    const item = document.createElement('li');
    const marker = document.createElement('span');
    marker.className = 'stop-number';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = index === 0 ? '●' : index;

    const label = document.createElement('strong');
    label.className = 'stop-name';
    label.textContent = name;
    item.append(marker);

    if (!description) {
      item.append(label);
      return item;
    }

    const stop = document.createElement('div');
    const note = document.createElement('p');
    note.textContent = description;
    stop.append(label, note);
    item.append(stop);
    return item;
  }

  function connectExplore() {
    const atlas = document.querySelector('[data-route-atlas]');
    if (!atlas) return;

    const buttons = Array.from(document.querySelectorAll('[data-drive-filter]'));
    const cards = Array.from(atlas.querySelectorAll('[data-drive-category]'));
    const map = atlas.querySelector('[data-gorge-map]');
    const schematic = atlas.querySelector('[data-route-schematic]');
    const schematicStops = atlas.querySelector('[data-schematic-stops]');
    const mapHeading = atlas.querySelector('#map-name');
    const mapTitle = atlas.querySelector('[data-map-title]');
    const mapKey = atlas.querySelector('[data-map-key]');
    const mapNote = atlas.querySelector('[data-map-note]');
    const alternativeDrives = new Map([['coast', 'coast'], ['mountains', 'hood']]);

    function chooseFilter(filter) {
      atlas.dataset.filter = filter;
      for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button.dataset.driveFilter === filter));
      }
      for (const card of cards) {
        card.hidden = filter !== 'all' && card.dataset.driveCategory !== filter;
      }

      const alternate = drives.get(alternativeDrives.get(filter));
      map.toggleAttribute('hidden', Boolean(alternate));
      schematic.hidden = !alternate;
      mapHeading.textContent = alternate ? 'Route overview' : 'Route map';
      mapTitle.textContent = alternate?.title ?? drives.get('gorge').title;
      mapKey.textContent = filter === 'all' ? 'Featured drive' : 'Selected drive';
      mapNote.textContent = alternate ? 'Suggested stop order' : 'Schematic map';
      if (alternate) {
        schematicStops.replaceChildren(...alternate.stops.map(([name], index) => makeStop(name, index)));
      }
    }

    for (const button of buttons) {
      button.addEventListener('click', () => chooseFilter(button.dataset.driveFilter));
    }
  }

  function showRoute() {
    const heading = document.querySelector('[data-drive-title]');
    if (!heading) return;

    const requested = new URLSearchParams(window.location.search).get('drive');
    const key = drives.has(requested) ? requested : 'gorge';
    const route = drives.get(key);
    const image = document.querySelector('[data-drive-image]');
    const stops = document.querySelector('[data-drive-stops]');

    document.title = `${route.title} | Detour Car Rental`;
    heading.textContent = `${route.title.toUpperCase()}.`;
    document.querySelector('[data-drive-intro]').textContent = route.intro;
    document.querySelector('[data-drive-caption]').textContent = `${route.title}, Oregon`;
    image.src = route.image;
    image.alt = route.alt;
    stops.replaceChildren(...route.stops.map(([name, description], index) => makeStop(name, index, description)));

    const planLink = document.querySelector('[data-plan-drive]');
    planLink.href = `index.html?drive=${encodeURIComponent(key)}#trip-planner`;
    document.querySelector('[data-plan-copy]').textContent = `Choose rental dates and keep the ${route.title} itinerary with your trip.`;
  }

  connectExplore();
  showRoute();
})();
