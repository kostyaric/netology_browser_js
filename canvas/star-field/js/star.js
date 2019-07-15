'use strict'
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colorSet = ['#ffffff', '#ffe9c4', '#d4fbff'];

function getRandom(min, max, isInteger = true) {

	if (isInteger) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	else {
		return Math.random() * (max - min) + min;
	}

}

function drawSky() {
	
	let canvasWidth = canvas.width;
	let canvasHeight = canvas.height;

	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	let countStars = getRandom(200, 400);

	for (let i = 0; i <= countStars; i++) {

		let starBright	= getRandom(0.8, 1, false);
		let starSize	= getRandom(0, 1.1, false);
		let starColor	= colorSet[getRandom(0, 2)];

		let x = getRandom(0, canvasWidth);
		let y = getRandom(0, canvasHeight);

		ctx.beginPath();
		ctx.fillStyle = starColor;
		ctx.arc(x, y, starSize / 2, 0, 2 * Math.PI);
		ctx.fill();

	}

}

document.addEventListener('DOMContentLoaded', drawSky);
canvas.addEventListener('click', drawSky);
