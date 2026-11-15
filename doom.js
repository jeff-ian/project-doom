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

function handleLeave (category) {
  category.addEventListener('mouseleave', () => {
    const name = category.dataset.category;
    const panel = document.querySelector(`[data-panel="${name}"]`);
    panel.classList.remove('active')
    console.log('left');
    
  });
}

function loadVideo(el) {
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