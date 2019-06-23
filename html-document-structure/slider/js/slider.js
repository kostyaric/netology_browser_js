'use strict'

let prevBtn;
let nextBtn;
let firstBtn;
let lastBtn;

function setBtnVisibility () {

	const currentSlide = document.querySelector('.slide-current');
	
	if (currentSlide.nextElementSibling) {

		nextBtn.classList.remove('disabled');
		lastBtn.classList.remove('disabled');

	}
	else {

		nextBtn.classList.add('disabled');
		lastBtn.classList.add('disabled');

	}

	if (currentSlide.previousElementSibling) {

		prevBtn.classList.remove('disabled');
		firstBtn.classList.remove('disabled');

	}
	else {

		prevBtn.classList.add('disabled');
		firstBtn.classList.add('disabled');

	}

}

function onBtnClick(event) {
	
	if (event.currentTarget.classList.contains('disabled')) {
		return;
	}

	let newSlide;
	const action = event.currentTarget.dataset.action;
	const currentSlide = document.querySelector('.slide-current');

	currentSlide.classList.remove('slide-current');

	switch (action) {
		case 'prev':
			newSlide = currentSlide.previousElementSibling;
			break;
		case 'next':
			newSlide = currentSlide.nextElementSibling;
			break;
		case 'first':
			newSlide = document.querySelector('.slides').firstElementChild;
			break;
		case 'last':
			newSlide = document.querySelector('.slides').lastElementChild;
			break;
	}

	newSlide.classList.add('slide-current');
	setBtnVisibility();

}

function init() {

	prevBtn = document.querySelector('a[data-action="prev"]');
	nextBtn = document.querySelector('a[data-action="next"]');
	firstBtn = document.querySelector('a[data-action="first"]');
	lastBtn = document.querySelector('a[data-action="last"]');

	document.querySelector('.slides').firstElementChild.classList.add('slide-current');
	setBtnVisibility();
	
	document.querySelectorAll('.slider-nav a').forEach(
		elem => elem.addEventListener('click', onBtnClick)
	);

}

document.addEventListener('DOMContentLoaded', init);