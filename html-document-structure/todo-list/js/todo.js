'use strict'

const doneList = document.querySelector('.done');
const undoneList = document.querySelector('.undone');

document.querySelectorAll('.todo-list label').forEach(
	item => item.addEventListener('click', moveItem)
)

function moveItem(event) {
    
    if(event.target.parentElement.classList.contains('done')){
        undoneList.appendChild(event.target);
    } else {
        doneList.appendChild(event.target);
    }

}
