'use strict'

function onLoad(event) {
	
	let content = document.querySelector('#content');
	let bookList = JSON.parse(event.target.responseText);

	let contentText = '';

	for (var i = 0; i < bookList.length; i++) {
		
		let book = bookList[i];

		contentText +=
	    `<li 
	        data-title="${book.title}" 
	        data-author="${book.author.name}" 
	        data-info="${book.info}" 
	        data-price="${book.price}"> 
	       <img src="${book.cover.small}"> 
	    </li>`
	}

	content.innerHTML = contentText;

}

document.addEventListener('DOMContentLoaded', () => {

	let xhr = new XMLHttpRequest();
	xhr.addEventListener('load', onLoad);
	xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
	xhr.send();

});