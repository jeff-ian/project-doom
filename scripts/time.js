
  const day = document.querySelector('.day');
  const hour = document.querySelector('.hour');
  const minute = document.querySelector('.minute');
  const second = document.querySelector('.second');

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
  // setInterval(time,1000);
