 import { getMenuLinks } from "./doom.js";
 import { getMenu } from "./doom.js";
 import { exptHamButton } from "./doom.js";
 import { exptCloseButton } from "./doom.js";


 const menu = getMenu();
 const hamButton = exptHamButton();
 const closeButton = exptCloseButton();
 
 hamButton.addEventListener('click',() => {
  menu.classList.add('visible');
 })

  closeButton.addEventListener('click',() => {
  menu.classList.remove('visible');
 })


const menuPrimerButton = document.querySelector('.menu-primer-btn');
const menuMemoriamButton = document.querySelector('.menu-memoriam-btn');
const menuTheatersButton = document.querySelector('.menu-theaters-btn');
const menuCreatorButton = document.querySelector('.menu-creator-btn');
const menuPlayButton = document.querySelector ('.menu-play-btn')


const lists = document.querySelectorAll ('.list');

function listToggle () {
  lists.forEach(list => {
    if (list.classList.contains('visible')) {
      
    }
  });

}

menuPrimerButton.addEventListener ('click',() => {
  listToggle();

})

menuMemoriamButton.addEventListener ('click',() => {
  listToggle();

})

menuTheatersButton.addEventListener ('click',() => {
  listToggle();

})


menuCreatorButton.addEventListener ('click',() => {
  listToggle();
})

menuPlayButton.addEventListener ('click',() => {
  listToggle();

})


 getMenuLinks().forEach ((link) => {
  link.addEventListener('click', () => {
    console.log('click')
    menu.classList.remove('visible');
  })
})

// console.log(getMenuLinks())



 
