(() => {
  'use strict';

  const detour = window.Detour;
  const page = document.body.dataset.bookingPage;
  if (!detour || !page) return;

  const byId = (id) => document.getElementById(id);
  const findCar = (id) => detour.cars.find((car) => car.id === id);
  const findLocation = (id) => detour.locations.find((location) => location.id === id);

  function setText(id, value) {
    const element = byId(id);
    if (element) element.textContent = value;
  }

  function showDrive(id, drive) {
    const element = byId(id);
    const link = element.querySelector('a');
    element.hidden = !drive;
    if (link && drive) {
      link.href = `route.html?drive=${encodeURIComponent(drive.id)}`;
      link.textContent = drive.name;
    } else if (!link) {
      element.textContent = drive ? `Planned drive · ${drive.name}` : '';
    }
  }

  function setPhoto(selector, car) {
    const frame = document.querySelector(selector);
    frame.hidden = !car;
    if (!car) return;

    const image = frame.querySelector('img');
    frame.dataset.car = car.id;
    if (image.getAttribute('src') !== car.image) image.src = car.image;
    image.alt = car.alt || car.name;
  }

  function showError(message) {
    const error = byId('booking-error');
    error.textContent = message;
    error.hidden = !message;
  }

  function setupCheckout() {
    const form = byId('booking-form');
    const carField = byId('booking-car');
    const locationField = byId('booking-location');
    const pickupField = byId('booking-pickup');
    const returnField = byId('booking-return');
    const nameField = byId('driver-name');
    const emailField = byId('driver-email');
    const confirm = byId('confirm-booking');
    const query = new URLSearchParams(window.location.search);
    const editReference = query.get('edit');
    const editing = query.has('edit');
    const reservation = editing ? detour.getBooking() : null;
    const originalRecord = JSON.stringify(reservation);
    const savedTrip = detour.getTrip();
    const user = detour.getUser();

    function showEditUnavailable(message) {
      byId('checkout-layout').hidden = true;
      byId('mobile-booking-bar').hidden = true;
      byId('booking-edit-unavailable').hidden = false;
      setText('booking-edit-unavailable-message', message);
      byId('booking-edit-unavailable-title').focus();
    }

    function checkCurrentReservation() {
      if (!editing || JSON.stringify(detour.getBooking()) === originalRecord) return true;
      showEditUnavailable('This reservation changed after you opened the form. Open My Booking to review its latest details.');
      return false;
    }

    if (editing) {
      byId('booking-back').href = 'my-booking.html';
      setText('booking-back', '← Back to My Booking');
      byId('checkout-steps').hidden = true;
      document.title = 'Edit reservation | Detour';
      if (!reservation || reservation.reference !== editReference || reservation.status !== 'confirmed' ||
          !findCar(reservation.carId) || !findLocation(reservation.trip?.location)) {
        showEditUnavailable('This booking reference is unavailable for editing. Open My Booking to see your current reservation.');
        return;
      }

      setText('booking-title', 'EDIT RESERVATION.');
      setText('checkout-intro', 'Change your location or dates, then review the new total.');
      setText('checkout-reference', `Booking ${reservation.reference}`);
      byId('checkout-reference').hidden = false;
      setText('checkout-note', 'Your confirmed reservation stays in place until you save these changes.');
      setText('checkout-submit-label', 'Save booking changes');
      setText('summary-total-label', 'Revised estimated total');
      setText('summary-previous-total', detour.money(reservation.total));
      carField.disabled = true;
      nameField.readOnly = true;
      emailField.readOnly = true;
      window.addEventListener('storage', checkCurrentReservation);
    }

    for (const car of detour.cars) {
      carField.add(new Option(`${car.name} · ${detour.money(car.rate)} / day`, car.id));
    }
    for (const location of detour.locations) {
      locationField.add(new Option(location.name, location.id));
    }

    const chosenCar = findCar(editing ? reservation.carId : query.get('car'));
    const chosenLocation = editing ? findLocation(reservation.trip.location)
      : findLocation(query.get('location')) || findLocation(savedTrip?.location);
    if (chosenCar) carField.value = chosenCar.id;
    if (chosenLocation) locationField.value = chosenLocation.id;
    const defaultDates = detour.validTrip(savedTrip) ? savedTrip : detour.defaultTrip();
    const proposed = { ...defaultDates, pickup: query.get('pickup'), return: query.get('return') };
    const dates = editing ? reservation.trip : (detour.validTrip(proposed) ? proposed : defaultDates);
    const drive = detour.getDrive?.(editing ? reservation.trip.drive : savedTrip?.drive);
    pickupField.value = dates.pickup;
    returnField.value = dates.return;
    pickupField.min = detour.today();
    nameField.value = editing ? reservation.driver?.name || '' : user?.name || user?.displayName || '';
    emailField.value = editing ? reservation.driver?.email || '' : user?.email || '';

    function readTrip() {
      return {
        location: locationField.value,
        pickup: pickupField.value,
        return: returnField.value,
        ...(drive ? { drive: drive.id } : {}),
      };
    }

    function updateDateMinimum() {
      returnField.min = detour.nextDate(pickupField.value) || pickupField.min;
    }

    function canBook(car, trip) {
      const original = reservation?.trip;
      return detour.available(car, trip) || Boolean(editing && detour.validTrip(trip) &&
        trip.pickup === original.pickup && trip.location === original.location);
    }

    const nearbyButton = byId('booking-nearby');
    byId('booking-other-cars').addEventListener('click', (event) => {
      try {
        detour.saveTrip(readTrip());
      } catch {
        event.preventDefault();
        showError('The demo could not keep these dates. Check that local storage is enabled.');
      }
    });
    nearbyButton.addEventListener('click', () => {
      const car = findCar(carField.value);
      const suggestion = detour.nearbyTrip(car, readTrip());
      if (!suggestion) return;
      pickupField.value = suggestion.pickup;
      returnField.value = suggestion.return;
      updateSummary();
      pickupField.focus();
    });

    function updateSummary() {
      updateDateMinimum();
      const car = findCar(editing ? reservation.carId : carField.value);
      const trip = readTrip();
      const quote = car && detour.validTrip(trip) ? detour.quote(car, trip) : null;
      const selectable = Boolean(quote && canBook(car, trip));
      const suggestion = quote && !selectable ? detour.nearbyTrip(car, trip) : null;
      confirm.disabled = !selectable;
      byId('booking-availability').hidden = !quote;
      byId('booking-other-cars').hidden = editing || !quote || selectable;
      nearbyButton.hidden = !suggestion;
      if (suggestion) nearbyButton.textContent = `Try ${detour.formatDate(suggestion.pickup)}`;
      setText('booking-availability-message', selectable ? 'Available for this pick-up date · demo' : 'Unavailable on this pick-up date · demo');
      byId('mobile-booking-bar').hidden = !selectable;
      const short = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(date));
      if (quote) {
        setText('mobile-booking-total', `${car.name} · ${selectable ? detour.money(quote.total) + ' est.' : 'Unavailable'}`);
        setText('mobile-booking-dates', `${short(trip.pickup)} – ${short(trip.return)}`);
      }
      setPhoto('[data-summary-photo]', car);
      setText('summary-car', car?.name || 'Rental summary');
      setText('summary-location', quote ? findLocation(trip.location).name : 'Choose a car and valid dates for a price estimate.');
      showDrive('summary-drive', drive);
      byId('summary-route').hidden = !quote;
      byId('summary-costs').hidden = !selectable;
      byId('summary-previous-total-row').hidden = !editing;
      if (!quote) return;

      setText('summary-pickup', detour.formatDate(trip.pickup));
      setText('summary-return', detour.formatDate(trip.return));
      const rentalDays = quote.days === 1 ? 'day' : 'days';
      setText('summary-rate', `Rental · ${quote.days} ${rentalDays} × ${detour.money(car.rate)}`);
      setText('summary-subtotal', detour.money(quote.subtotal));
      setText('summary-fees', detour.money(quote.fees));
      setText('summary-total', detour.money(quote.total));
    }

    function updateNameValidity() {
      nameField.setCustomValidity(nameField.value.length && !nameField.value.trim() ? 'Enter a name for the demo reservation.' : '');
    }

    form.addEventListener('input', (event) => {
      showError('');
      if (event.target === nameField) updateNameValidity();
      if ([carField, locationField, pickupField, returnField].includes(event.target)) updateSummary();
    });
    form.addEventListener('change', (event) => {
      if ([carField, locationField, pickupField, returnField].includes(event.target)) updateSummary();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (confirm.disabled || !checkCurrentReservation()) return;
      updateDateMinimum();
      updateNameValidity();
      if (!form.reportValidity()) return;

      const trip = readTrip();
      const car = findCar(editing ? reservation.carId : carField.value);
      if (!car || !canBook(car, trip)) {
        showError('Check the car, location, and rental dates before confirming.');
        return;
      }

      const quote = detour.quote(car, trip);
      const revision = new Date().toISOString();
      const tripDetails = {
        carId: car.id,
        trip,
        driver: editing ? reservation.driver : { name: nameField.value.trim(), email: emailField.value.trim() },
        ...quote,
        status: 'confirmed',
      };
      let booking;
      if (editing) {
        booking = { ...reservation, ...tripDetails, updatedAt: revision };
      } else {
        const suffix = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(7, '0');
        booking = { ...tripDetails, reference: `DTR-${suffix}`, createdAt: revision };
      }

      confirm.disabled = true;
      try {
        detour.saveBooking(booking);
      } catch {
        updateSummary();
        showError('The demo reservation could not be saved in this browser. Check that local storage is enabled and try again.');
        return;
      }
      try {
        detour.saveTrip(trip);
      } catch {
        // The reservation is already saved. Trip-planner preferences can be set separately.
      }
      window.location.assign(editing ? `confirmation.html?updated=${encodeURIComponent(booking.reference)}` : 'confirmation.html');
    });

    updateSummary();
    window.addEventListener('pageshow', () => {
      if (checkCurrentReservation()) updateSummary();
    });
  }

  function showReservation() {
    const reservation = detour.getBooking();
    const car = findCar(reservation?.carId);
    const location = findLocation(reservation?.trip?.location);
    const hasReservation = Boolean(car && location);
    byId('booking-empty').hidden = hasReservation;
    byId('booking-record').hidden = !hasReservation;
    if (!hasReservation) return;

    const cancelled = reservation.status === 'cancelled';
    const confirmed = reservation.status === 'confirmed';
    const updated = confirmed && reservation.updatedAt && page === 'confirmation' &&
      new URLSearchParams(window.location.search).get('updated') === reservation.reference;
    const status = byId('receipt-status');
    status.dataset.status = reservation.status;
    status.textContent = cancelled ? 'Demo reservation cancelled' : (updated ? 'Demo reservation updated' : 'Demo reservation confirmed');

    setPhoto('[data-receipt-photo]', car);
    setText('receipt-reference', reservation.reference);
    setText('receipt-car', car.name);
    setText('receipt-location', location.name);
    showDrive('receipt-drive', detour.getDrive?.(reservation.trip.drive));
    setText('receipt-pickup', detour.formatDate(reservation.trip.pickup));
    setText('receipt-return', detour.formatDate(reservation.trip.return));
    setText('receipt-subtotal', detour.money(reservation.subtotal));
    setText('receipt-fees', detour.money(reservation.fees));
    setText('receipt-total', detour.money(reservation.total));
    setText('receipt-name', reservation.driver?.name || '—');
    setText('receipt-email', reservation.driver?.email || '—');
    setText('receipt-intro', cancelled
      ? 'This reservation was cancelled. Its reference and trip details are shown for your records.'
      : updated ? 'Your new dates and total are confirmed. Your booking reference stays the same.'
        : `${car.name} is reserved in the demo. Keep your booking reference handy.`);

    const guide = byId('pickup-guide-link');
    guide.href = `pickup-guide.html?location=${encodeURIComponent(location.id)}`;
    guide.hidden = !confirmed;
    byId('trip-pack-link').hidden = !confirmed;

    if (page === 'confirmation') {
      setText('receipt-title', cancelled ? 'RESERVATION CANCELLED.' : (updated ? 'BOOKING UPDATED.' : 'YOU’RE BOOKED.'));
      setText('receipt-next', `In this example, you’ll collect your car at ${location.name} on ${detour.formatDate(reservation.trip.pickup)}.`);
      document.querySelector('.booking-next').hidden = cancelled;
    }
    if (page === 'manage') {
      const edit = byId('edit-booking');
      edit.href = `booking.html?edit=${encodeURIComponent(reservation.reference)}`;
      edit.hidden = !confirmed;
      byId('open-cancel').hidden = !confirmed;
      byId('browse-after-cancel').hidden = confirmed;
    }
  }

  function setupManage() {
    const cancel = byId('open-cancel');
    const dialog = byId('cancel-dialog');
    let pendingCancellation;

    cancel.addEventListener('click', () => {
      showError('');
      const reservation = detour.getBooking();
      if (reservation?.status !== 'confirmed') {
        showReservation();
        return;
      }
      pendingCancellation = JSON.stringify(reservation);
      dialog.returnValue = '';
      dialog.showModal();
    });

    dialog.addEventListener('close', () => {
      if (dialog.returnValue !== 'cancel') return;
      const reservation = detour.getBooking();
      if (reservation?.status !== 'confirmed' || JSON.stringify(reservation) !== pendingCancellation) {
        showReservation();
        showError('This reservation changed while the cancellation was open. Review the latest booking before cancelling.');
        return;
      }

      try {
        detour.saveBooking({ ...reservation, status: 'cancelled' });
        if (detour.getBooking()?.status !== 'cancelled') throw new Error('Cancellation unavailable');
        showReservation();
        const title = byId('receipt-title');
        title.tabIndex = -1;
        title.focus();
      } catch {
        showError('The cancellation could not be saved. Check that local storage is enabled and try again.');
      }
    });
  }

  if (page === 'checkout') {
    setupCheckout();
  } else {
    showReservation();
    if (page === 'manage') setupManage();
    window.addEventListener('pageshow', showReservation);
  }
})();
