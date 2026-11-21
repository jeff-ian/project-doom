const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const menu = document.querySelector('.menu');
const closeButton = document.querySelector('.close-button');


const targetDate = new Date ('December 18, 2026 00:00:00').getTime();

function time () {
  const now = new Date ();

  const distance = targetDate - now;

  // 1. Get total days, and leave the leftover milliseconds in the background
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  day.innerHTML = days;
  
  // 2. Take the remainder after days (%), and extract hours from it
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  hour.innerHTML = hours;
  
  // 3. Take the remainder after hours (% ), and extract minutes from it
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  minute.innerHTML = minutes;

  // 4. Take the final remainder after minutes (% ), and convert it to seconds
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  second.innerHTML = seconds;
}

 time();
 setInterval(time,1000);



document.querySelectorAll('.video[data-id]').forEach(box => {
  box.addEventListener('click', () => loadVideo(box), { once: true });
});

closeButton.addEventListener('click', () => {
  menu.classList.remove('visible');
})

function loadVideo(el) {
  if (el.querySelector('iframe')) return;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const id = isMobile && el.dataset.idMobile ? el.dataset.idMobile : el.dataset.id;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.title = 'Video player';
  el.innerHTML = '';
  el.appendChild(iframe);
}

const videoObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadVideo(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.video[data-id]').forEach(box => {
  videoObserver.observe(box);
});


const section = document.querySelector('.scroll-section');

function getProgress() {
  const rect = section.getBoundingClientRect();
  const scrollable = section.offsetHeight - window.innerHeight;
  const progress = -rect.top / scrollable;
  return Math.min(Math.max(progress, 0), 1);
}



const items = document.querySelectorAll('.gallery-item');
const stage = document.querySelector('.viewport');
const holdLength = 0.1;
let currentPosition = 0;

let stepVh = 100;              

function updateStepVh() {         
  stepVh = window.innerWidth <= 1115 ? 50 : 100;
}
updateStepVh();  


function setSectionHeight() {
  const lastIndex = items.length - 1;
  const steps = lastIndex + holdLength;
  section.style.height = `${(steps * stepVh) + 100}vh`;
}

setSectionHeight();

function update() {
  const progress = getProgress();
  const lastIndex = items.length - 1;
  const t = progress * (lastIndex + holdLength);
  const segment = Math.min(Math.floor(t), lastIndex);
  const local = t - segment;

  let position;
  if (segment === lastIndex || local < holdLength) {
    position = segment;
  } else {
    position = segment + (local - holdLength) / (1 - holdLength);
  }

  currentPosition = position;

  items.forEach((item, i) => {
  const offset = i - position;
  const distance = Math.min(Math.abs(offset), 1);
  const scale = 1 - distance * 0.5;

  const shrunkWidth = item.offsetWidth * 0.5;
  const slotX = stage.offsetWidth / 2 + shrunkWidth / 6;

  item.style.transform =
    `translateX(${offset * slotX}px) scale(${scale})`;
  });
}

let scrollTimer;

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(snap, 120);
});

function snap() {
  const rect = section.getBoundingClientRect();
  if (rect.top > 0 || rect.bottom < window.innerHeight) return;

  const lastIndex = items.length - 1;
  const target = Math.round(currentPosition);
  const targetProgress = (target + holdLength / 2) / (lastIndex + holdLength);

  const scrollable = section.offsetHeight - window.innerHeight;
  const sectionTop = rect.top + window.scrollY;

  window.scrollTo({
    top: sectionTop + targetProgress * scrollable,
    behavior: 'smooth'
  });
}

window.addEventListener('load', update);

window.addEventListener('scroll', update);
update();

window.addEventListener('resize', () => {
  updateStepVh();
  setSectionHeight();
  update();
});


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


const menuPrimerButton = document.querySelector('.menu-primer-btn');
const menuMemoriamButton = document.querySelector('.menu-memoriam-btn');
const menuTheatersButton = document.querySelector('.menu-theaters-btn');
const menuCreatorButton = document.querySelector('.menu-creator-btn');

const firstList = document.querySelector ('.list-1');
const secondList = document.querySelector ('.list-2');
const thirdList = document.querySelector ('.list-3');
const fourthList = document.querySelector ('.list-4');

const lists = document.querySelectorAll ('.list');

function listToggle () {
  lists.forEach(list => {
    if (list.classList.contains('visible')) {
      list.classList.remove('visible');
    }
  });

}

menuPrimerButton.addEventListener ('click',() => {
  listToggle();
  firstList.classList.add('visible');
})

menuMemoriamButton.addEventListener ('click',() => {
  listToggle();
  secondList.classList.add('visible');
})

menuTheatersButton.addEventListener ('click',() => {
  listToggle();
  thirdList.classList.add('visible');
})


menuCreatorButton.addEventListener ('click',() => {
  listToggle();
  fourthList.classList.add('visible');
})



