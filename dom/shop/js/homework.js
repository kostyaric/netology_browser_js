'use strict'

let totalCount = 0;
let totalPrice = 0;

function addGoods() {

	let elemTotalCount = document.querySelector('span#cart-count');
	let elemTotalPrice = document.querySelector('span#cart-total-price');

	let currentPrice = +this.dataset.price;
	totalPrice += currentPrice;
	totalCount++;

	elemTotalPrice.innerHTML = getPriceFormatted(totalPrice);
	elemTotalCount.innerHTML = getPriceFormatted(totalCount);

}

function createEventAdd() {

	let buttonSet = document.querySelectorAll('.add');

	console.log(buttonSet);

	for (var i = 0; i < buttonSet.length; i++) {
		
		console.log(buttonSet[i]);
		buttonSet[i].addEventListener('click', addGoods);
	}
}

document.addEventListener('DOMContentLoaded', createEventAdd);