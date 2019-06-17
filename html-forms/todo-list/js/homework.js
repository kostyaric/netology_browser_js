let listBlock;
let listItems;
let output;

function updateCount() {
    
    const totalItemsCount = listItems.length;
    let doneItemsCount = 0;

    listItems.forEach(item => {doneItemsCount += item.checked;});

    if(doneItemsCount === totalItemsCount) {
        listBlock.classList.add('complete');
    } else {
        listBlock.classList.remove('complete');
    }

    output.value = `${doneItemsCount} / ${totalItemsCount}`;
}

function init() {
    
	listBlock = document.querySelector('.list-block');
	listItems = Array.from(listBlock.querySelectorAll('.list-block input'));
	output = listBlock.querySelector('output');

    listItems.forEach(item => {item.addEventListener('change', updateCount);})

    updateCount();

}

document.addEventListener('DOMContentLoaded', init);
