(() => {
  const gallery = document.querySelector('.x-men-gallery');
  if (!gallery) return;

  const xmgItems = [...gallery.querySelectorAll('.xmg-item')];
  const n = xmgItems.length;
  gallery.style.setProperty('--n', n);

  const HOLD = 0.2;            // pause on each image (in transition lengths)
  const MOBILE_MAX = 768;      // px
  const STEP_VH_DESKTOP = 100; // scroll needed per step on desktop
  const STEP_VH_MOBILE = 50;   // scroll needed per step on mobile
  const SNAP_DELAY = 120;      // ms of no scrolling before it snaps

  const cycle = 1 + HOLD;
  const total = (n - 1) + n * HOLD;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

  let currentP = 0;

  function setHeight() {
    const stepVh = window.innerWidth <= MOBILE_MAX ? STEP_VH_MOBILE : STEP_VH_DESKTOP;
    gallery.style.height = `${total * stepVh + 100}dvh`;
  }

  function xmgUpdate() {
    const rect = gallery.getBoundingClientRect();
    const progress = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1);

    const s = progress * total;
    const k = Math.min(Math.floor(s / cycle), n - 1);
    const local = s - k * cycle;
    const p = (k === n - 1 || local < HOLD) ? k : k + (local - HOLD);

    currentP = p;
    gallery.style.setProperty('--p', p.toFixed(4));

    xmgItems.forEach((el, i) => {
      const v = clamp(1 - Math.abs(p - i), 0, 1);
      el.style.setProperty('--v', v.toFixed(4));
    });
  }

  function xmgSnap() {
    const rect = gallery.getBoundingClientRect();
    // only snap while the stage is pinned, so normal page scrolling is untouched
    if (rect.top > 0 || rect.bottom < window.innerHeight) return;

    // nearest image: past the halfway point of a handoff it advances, otherwise it snaps back
    const target = Math.round(currentP);

    // scroll position in the middle of that image's hold
    const targetProgress = (target * cycle + HOLD / 2) / total;
    const scrollable = rect.height - window.innerHeight;
    const sectionTop = rect.top + window.scrollY;
    const targetY = sectionTop + targetProgress * scrollable;

    if (Math.abs(targetY - window.scrollY) < 2) return; // already there

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  let ticking = false;
  let snapTimer;

  window.addEventListener('scroll', () => {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(xmgSnap, SNAP_DELAY);

    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { xmgUpdate(); ticking = false; });
  }, { passive: true });

  window.addEventListener('resize', () => {
    setHeight();
    xmgUpdate();
  });

  setHeight();
  xmgUpdate();
})();