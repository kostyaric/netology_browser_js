'use strict';

const counter = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

if (!localStorage.counter) {
    localStorage.counter = 0;
}
counter.textContent = localStorage.counter;

incrementBtn.addEventListener('click', () => {
    localStorage.counter++;
    counter.textContent = localStorage.counter;
});

decrementBtn.addEventListener('click', () => {
    localStorage.counter--;
    counter.textContent = localStorage.counter;
});

resetBtn.addEventListener('click', () => {
    localStorage.counter = 0;
    counter.textContent = localStorage.counter;
});