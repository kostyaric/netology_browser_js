'use strict';
let itemList = document.querySelector('.items-list');
itemList.addEventListener('click', onClick);

function onClick(event) {

  event.preventDefault();

  if (event.target.classList.contains('add-to-cart')) {
  
  	addToCart(event.target.dataset);

  }

}