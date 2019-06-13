const request = new XMLHttpRequest();

request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();

function onload() {
  const response = JSON.parse(request.responseText);
  setData(response);
}

request.addEventListener('load', onload);