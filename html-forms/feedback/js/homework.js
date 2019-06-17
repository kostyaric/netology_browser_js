'use strict'

let form;
let output;
let changeButton;
let submitButton;
let inputs;
let inputZip;
let previosZip;

function checkForm() {
    let validate = inputs.every(input => {
        return input.value !== '';
    });

    if(validate) {
        submitButton.disabled = false;
    }
}

function onSubmit(event) {

    event.preventDefault();
    form.classList.add('hidden');
    output.classList.remove('hidden');

    let outputSet = document.querySelectorAll('#output output');
    outputSet.forEach(elem => {

        if (elem.id === 'message') {
            elem.value = document.querySelector('textarea' + '[name="' + elem.id + '"]').value;
        }
        else {
            elem.value = document.querySelector('input' + '[name="' + elem.id + '"]').value;
        }

    });

}

function onChangeButtonClick(event) {
    
    event.preventDefault();
    output.classList.add('hidden');
    form.classList.remove('hidden');

}

function onZipKeydown(event) {
    
    previosZip = event.target.value;

}

function checkField() {
    
    let validate = inputs.every(input => {
        return input.value !== '';
    });

    if(validate) {
        submitButton.disabled = false;
    }

    if (event.target === inputZip) {

        let currentValue = event.target.value;
        let checkValue = currentValue.replace(/\s+/g, '');

        event.target.value = isFinite(checkValue) ? checkValue : previosZip;

    }

}

function init() {

    form = document.querySelector('.contentform');
    output = document.querySelector('#output');
    inputs = Array.from(document.querySelectorAll('.contentform input'));
    inputZip = document.querySelector('.contentform input[name="zip"]');

    submitButton = document.querySelector('form .button-contact');
    changeButton = document.querySelector('main .button-contact');

    inputs.forEach(input => {
        input.addEventListener('input', checkField);
    });

    inputZip.addEventListener('keydown', onZipKeydown);

    submitButton.addEventListener('click', onSubmit);
    changeButton.addEventListener('click', onChangeButtonClick);
}

document.addEventListener('DOMContentLoaded',init);
