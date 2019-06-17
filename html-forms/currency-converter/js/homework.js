let from;
let to;
let loader;
let content;
let source;
let result;

function onLoad(event) {
    
    const request = event.currentTarget;
    
    if(request.status === 200) {
    
        const currencyList = JSON.parse(request.responseText);

        currencyList.forEach(currency => {
            
            const option = `<option value="${currency.value}">${currency.code}</option>`;

            from.innerHTML += option;
            to.innerHTML += option;
        });

        convert();
    }
}

function onLoadStart() {
    loader.classList.remove('hidden');
}

function onLoadEnd() {
    loader.classList.add('hidden');
    content.classList.remove('hidden');
}

function convert() {
    result.value = Math.round(source.value * from.value / to.value * 100) / 100;
}

function init() {

    from = document.querySelector('#from');
    to = document.querySelector('#to');
    loader = document.querySelector('#loader');
    content = document.querySelector('#content');
    source = document.querySelector('#source');
    result = document.querySelector('#result');

    from.addEventListener('change',convert);
    to.addEventListener('change',convert);
    source.addEventListener('input',convert);

    const request = new XMLHttpRequest();
    request.addEventListener('load', onLoad);
    request.addEventListener('loadstart', onLoadStart);
    request.addEventListener('loadend', onLoadEnd);
    request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
    request.send();

}

document.addEventListener('DOMContentLoaded', init);
