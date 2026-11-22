const menu = document.querySelector('.menu');
export const getMenu = () =>  document.querySelector('.menu');
const closeButton = document.querySelector('.close-button');
export const exptCloseButton = () => document.querySelector('.close-button');
const hamButton = document.querySelector('.ham-button');
export const exptHamButton = ()  => document.querySelector('.ham-button');
const menuLinks = document.querySelectorAll('.menu-link');
export const getMenuLinks = () => document.querySelectorAll('.menu-link');

document.querySelectorAll('.video[data-id]').forEach(box => {
  box.addEventListener('click', () => loadVideo(box), { once: true });
});




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


