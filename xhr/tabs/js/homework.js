'use strict';

let content;
let tabs;
let preloader;

function onLoad(event) {
	content.innerHTML = event.target.responseText;
}

function onLoadStart() {
	preloader.classList.remove('hidden');
}

function onLoadEnd() {

	preloader.classList.add('hidden');
	preloader.innerHTML = 'Загрузка...';;

}

function onProgress(event) {

	let percent = Math.round(event.loaded / event.total * 100);
	preloader.innerHTML = `Загружено ${percent}%`;

}

function getTabContent(href) {

	const xhr = new XMLHttpRequest();

	xhr.addEventListener('load', onLoad);
	xhr.addEventListener('loadstart', onLoadStart);
	xhr.addEventListener('loadend', onLoadEnd);
	xhr.addEventListener('progress', onProgress);

	xhr.open('GET', href);
	xhr.send();

}

function tabClick(event) {

	event.preventDefault();

	const currentTab = event.target;
	const href = currentTab.getAttribute('href');

	getTabContent(href);

	currentTab.classList.add('active');

	for (let i = 0; i < tabs.length; i++) {
		if (tabs[i] !== currentTab) {
			tabs[i].classList.remove('active');
		}
	}
	
}

function init() {

	content = document.querySelector('#content');
	preloader = document.querySelector('#preloader');
	tabs = document.querySelectorAll('nav a');

	getTabContent(tabs[0].getAttribute('href'));

	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', tabClick);
	}

}

document.addEventListener('DOMContentLoaded', init);