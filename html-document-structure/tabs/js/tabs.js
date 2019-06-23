'use strict'

const articles = document.querySelector('.tabs-content').children;
const tabsNav = document.querySelector('.tabs-nav');

Array.from(articles).forEach(article => {
    
    const newTab = tabsNav.firstElementChild.cloneNode(true);
    tabsNav.appendChild(newTab);

    newTab.firstElementChild.classList.add(article.dataset.tabIcon);
    newTab.firstElementChild.textContent = article.dataset.tabTitle;

});

tabsNav.removeChild(tabsNav.firstElementChild);

Array.from(tabsNav.children).forEach(tab => tab.addEventListener('click', onTabClick));
showArticle(tabsNav.firstElementChild);

function showArticle(tab) {

	Array.from(tabsNav.children).forEach(item => {
		item.classList.remove('ui-tabs-active');
	});

	tab.classList.add('ui-tabs-active');

	Array.from(articles).forEach(article => {
		
	    if (article.dataset.tabTitle === tab.firstElementChild.textContent) {
	        article.classList.remove('hidden');
	    } else {
	        article.classList.add('hidden');
	    }

	});

}

function onTabClick(event) {

	showArticle(event.currentTarget);

}