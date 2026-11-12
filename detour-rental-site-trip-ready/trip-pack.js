(() => {
  const { cars, locations, getBooking, getDrive, formatDate, pickupChecklist } = window.Detour;
  const setText = (id, value) => { document.getElementById(id).textContent = value; };
  const print = document.getElementById('print-pack');

  function fillList(id, items) {
    document.getElementById(id).replaceChildren(...items.map((text) => {
      const entry = document.createElement('li');
      entry.textContent = text;
      return entry;
    }));
  }

  function render() {
    const booking = getBooking();
    const car = cars.find(({ id }) => id === booking?.carId);
    const branch = locations.find(({ id }) => id === booking?.trip?.location);
    const confirmed = booking?.status === 'confirmed' && Boolean(car && branch);
    document.getElementById('pack-sheet').hidden = !confirmed;
    document.getElementById('pack-empty').hidden = confirmed;
    print.hidden = !confirmed;
    if (!confirmed) return;
    const drive = getDrive(booking.trip.drive);
    setText('pack-reference', booking.reference);
    setText('pack-car', car.name);
    setText('pack-location', branch.name);
    setText('pack-pickup', formatDate(booking.trip.pickup));
    setText('pack-return', formatDate(booking.trip.return));
    setText('pack-drive', drive?.name ?? 'Choose a scenic drive on Explore for your next rental.');
    fillList('pack-stops', drive?.stops ?? []);
    fillList('pack-checklist', pickupChecklist);
  }

  print.addEventListener('click', () => window.print());
  window.addEventListener('pageshow', render);
  window.addEventListener('storage', render);
  render();
})();
