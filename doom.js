const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const menu = document.querySelector('.menu');
const closeButton = document.querySelector('.close-button');
const dropdown = document.querySelector('.dropdown');
const categories = document.querySelectorAll('.category');

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
//  setInterval(time,1000);

 const hamButton = document.querySelector('.ham-button');
 const headerRight = document.querySelector('header-right');

 
 hamButton.addEventListener('click',() => {
  menu.classList.add('visible')
 })

document.querySelectorAll('.video[data-id]').forEach(box => {
  box.addEventListener('click', () => loadVideo(box), { once: true });
});

closeButton.addEventListener('click', () => {
  menu.classList.remove('visible');
})

dropdown.addEventListener('mouseleave', () => {
  dropdown.classList.remove('visible')
})

categories.forEach(category => {
  handleEnter(category);
  
})

function handleEnter (category) {
  category.addEventListener('mouseenter', () => {
    const name = category.dataset.category;
    const panel = document.querySelector(`[data-panel="${name}"]`);
    panel.classList.add('active')
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.remove('active')
    })
    panel.classList.add('active')
    dropdown.classList.add('visible')
  });
}

// function handleLeave (category) {
//   category.addEventListener('mouseleave', () => {
//     const name = category.dataset.category;
//     const panel = document.querySelector(`[data-panel="${name}"]`);
//     panel.classList.remove('active')
//     console.log('left');
    
//   });
// }

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


function setSectionHeight() {
  const lastIndex = items.length - 1;
  const steps = lastIndex + holdLength;
  section.style.height = `${(steps * 100) + 100}vh`;
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

window.addEventListener('resize', update);