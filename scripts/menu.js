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


 getMenuLinks().forEach ((link) => {
  link.addEventListener('click', () => {
    console.log('click')
    menu.classList.remove('visible');
  })
})

// console.log(getMenuLinks())



 
