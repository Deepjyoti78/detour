(() => {
  const form = document.querySelector('[data-account-form]');
  const app = window.Detour;
  if (!form || !app) return;

  const allowedDestinations = new Set(['index.html', 'my-booking.html', 'booking.html', 'fleet.html']);
  const requestedDestination = new URLSearchParams(window.location.search).get('next');
  const next = allowedDestinations.has(requestedDestination) ? requestedDestination : 'my-booking.html';
  const switchLink = document.querySelector('[data-account-switch]');
  if (switchLink && allowedDestinations.has(requestedDestination)) {
    switchLink.setAttribute('href', `${switchLink.getAttribute('href')}?${new URLSearchParams({ next })}`);
  }

  const nameInput = form.elements.namedItem('name');
  const emailInput = form.elements.namedItem('email');
  const submitButton = form.querySelector('button[type="submit"]');
  const error = form.querySelector('[data-account-error]');
  const existingProfile = app.getUser();

  function nameFromEmail(email) {
    const words = email.split('@')[0].replace(/[^\p{L}\p{N}]+/gu, ' ').trim().slice(0, 48);
    return words.replace(/(^|\s)\p{L}/gu, (letter) => letter.toUpperCase()) || 'Detour driver';
  }

  if (!nameInput && existingProfile) emailInput.value = existingProfile.email;
  if (nameInput) nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
  submitButton.disabled = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    error.hidden = true;
    const email = emailInput.value.trim().toLowerCase();
    const name = nameInput
      ? nameInput.value.trim().replace(/\s+/g, ' ')
      : existingProfile?.email === email ? existingProfile.name : nameFromEmail(email);

    if (!name && nameInput) {
      nameInput.setCustomValidity('Enter your name.');
      nameInput.reportValidity();
      return;
    }

    try {
      app.saveUser({ name, email });
      window.location.assign(next);
    } catch {
      error.textContent = 'Your browser could not save the demo profile. Check that local storage is enabled and try again.';
      error.hidden = false;
    }
  });
})();
