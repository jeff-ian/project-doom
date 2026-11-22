(() => {
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
})();