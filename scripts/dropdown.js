import { getMenuLinks } from "./doom.js";

(() => {
  const dropdown = document.querySelector('.dropdown');
  const categories = document.querySelectorAll('.category');
  const here = location.pathname.split('/').pop() || 'index.html';
  const SHOW_MS = 1500; // how long the dropdown stays open on arrival
  let arriving = false; // true while the arrival animation is running
  let hideTimer;

  function showPanel(name) {
    const panel = document.querySelector(`[data-panel="${name}"]`);
    if (!panel) return null;
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    panel.classList.add('active');
    dropdown.classList.add('visible');
    return panel;
  }

  // hover: open the matching panel (ignored during arrival)
  categories.forEach(category => {
    category.addEventListener('mouseenter', () => {
      if (arriving) return;
      showPanel(category.dataset.category);
    });

    // mark the header item for the page we're on
    if (category.dataset.page === here) {
      category.classList.add('current');
      category.setAttribute('aria-current', 'page');
    }
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdown.classList.remove('visible');
  });

  // on arrival: show the dropdown briefly (desktop only)
  const current = document.querySelector('.category.current');
  const isDesktop = window.matchMedia('(min-width: 1116px)').matches;

  if (current && isDesktop) {
    arriving = true;
    const panel = showPanel(current.dataset.category);

    if (panel) {
      const links = [...panel.querySelectorAll('a')];

      // the link for the section in the URL, if we arrived through a list item
      const match = location.hash && links.find(link => {
        const url = new URL(link.getAttribute('href'), location.href);
        return url.pathname === location.pathname && url.hash === location.hash;
      });

      // otherwise default to the first list item
      (match || links[0])?.classList.add('current');
    }

    hideTimer = setTimeout(() => {
      dropdown.classList.remove('visible');
      arriving = false; // hover works normally again
    }, SHOW_MS);
  }
})();